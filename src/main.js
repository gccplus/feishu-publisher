import {
  getFrontMatterInfo, MarkdownView, Modal, Notice, Plugin, PluginSettingTab,
  requestUrl, SecretComponent, Setting, TFile, parseYaml,
} from "obsidian";
import { collaboratorFor, documentOrigin, FeishuClient } from "./feishu.js";
import { publicationPlan, recordPublication } from "./publication.js";
import { prepareMarkdown } from "./markdown.js";
import { downloadRemoteImage, maxImageBytes } from "./remote-image.js";

const defaults = { appId: "", secretName: "", workspace: "", collaborator: "", publicReadingByDefault: false };
const imageTypes = new Map([
  ["png", "image/png"], ["jpg", "image/jpeg"], ["jpeg", "image/jpeg"],
  ["gif", "image/gif"], ["webp", "image/webp"], ["bmp", "image/bmp"],
]);

class ResultModal extends Modal {
  constructor(app, { title, url, message, warnings = [], platform = "飞书" }) {
    super(app);
    this.result = { title, url, message, warnings, platform };
  }

  onOpen() {
    const { title, url, message, warnings, platform } = this.result;
    this.setTitle(title);
    this.contentEl.createEl("p", { text: message });
    if (warnings.length) {
      const list = this.contentEl.createEl("ul");
      for (const warning of warnings) list.createEl("li", { text: warning });
    }
    this.contentEl.createEl("a", {
      text: `打开${platform}文档`,
      href: url,
      attr: { target: "_blank", rel: "noopener noreferrer" },
    });
    new Setting(this.contentEl).addButton((button) => button.setButtonText("复制链接").onClick(async () => {
      try {
        await navigator.clipboard.writeText(url);
        new Notice("已复制文档链接。");
      } catch {
        new Notice("复制失败，可右键点击文档链接并复制。");
      }
    }));
  }

  onClose() {
    this.contentEl.empty();
  }
}

class PublisherSettings extends PluginSettingTab {
  constructor(plugin) {
    super(plugin.app, plugin);
    this.publisher = plugin;
  }

  display() {
    const { containerEl, publisher } = this;
    containerEl.empty();
    containerEl.createEl("p", {
      text: "发布使用飞书企业自建应用创建文档，并将配置的飞书账号设为可管理协作者。",
    });
    for (const [key, label, desc, placeholder] of [
      ["appId", "App ID", "飞书自建应用的 App ID。", "cli_…"],
      ["workspace", "飞书工作区", "填写工作区域名，或粘贴该工作区内任意飞书文档的链接。", "example.feishu.cn"],
      ["collaborator", "飞书协作者", "填写你的飞书企业邮箱，或当前应用下的 Open ID。每次发布会向这个账号授予可管理权限。", "name@example.com 或 ou_…"],
    ]) {
      new Setting(containerEl).setName(label).setDesc(desc).addText((field) => field
        .setPlaceholder(placeholder).setValue(publisher.settings[key])
        .onChange((value) => publisher.saveSetting(key, value.trim())));
    }
    new Setting(containerEl).setName("App Secret")
      .setDesc("在 Obsidian 密钥库中创建或选择保存了 App Secret 的密钥。")
      .addComponent((el) => new SecretComponent(this.app, el)
        .setValue(publisher.settings.secretName)
        .onChange((name) => publisher.saveSetting("secretName", name ?? "")));
    new Setting(containerEl).setName("发布后默认开启互联网只读")
      .setDesc("开启后，新发布的文档允许任何获得链接的人阅读。需要自建应用具备更新文档权限的权限。")
      .addToggle((toggle) => toggle.setValue(publisher.settings.publicReadingByDefault)
        .onChange((enabled) => publisher.saveSetting("publicReadingByDefault", enabled)));
    new Setting(containerEl).setName("测试连接")
      .setDesc("检查应用凭证和 Markdown 转换权限。")
      .addButton((button) => button.setButtonText("测试").onClick(async () => {
        button.setDisabled(true);
        try {
          const { client } = publisher.connection();
          await client.authenticate();
          await client.convert("# Feishu Publisher");
          new Notice("飞书连接与 Markdown 转换测试通过。");
        } catch (error) {
          new Notice(error.message, 12000);
        } finally {
          button.setDisabled(false);
        }
      }));
  }
}

export default class FeishuPublisher extends Plugin {
  settings = { ...defaults };
  saving = Promise.resolve();
  publishing = false;

  async onload() {
    const saved = await this.loadData();
    for (const key of Object.keys(defaults)) {
      if (typeof saved?.[key] === typeof defaults[key]) this.settings[key] = saved[key];
    }

    this.addSettingTab(new PublisherSettings(this));
    this.addCommand({
      id: "publish-active-note",
      name: "发布当前笔记到飞书（统一链接与命名版本）",
      checkCallback: (checking) => {
        const file = this.app.workspace.getActiveFile();
        if (file?.extension !== "md") return false;
        if (!checking) void this.publish(file);
        return true;
      },
    });
    this.addCommand({
      id: "publish-active-note-as-new",
      name: "将当前笔记发布为新的飞书文档",
      checkCallback: (checking) => {
        const file = this.app.workspace.getActiveFile();
        if (file?.extension !== "md") return false;
        if (!checking) void this.publish(file, true);
        return true;
      },
    });
    this.addCommand({
      id: "share-active-note-publicly",
      name: "将当前笔记关联的飞书文档设为互联网可阅读",
      checkCallback: (checking) => {
        const file = this.app.workspace.getActiveFile();
        if (file?.extension !== "md") return false;
        if (!checking) void this.sharePublicly(file);
        return true;
      },
    });
  }

  async sharePublicly(file) {
    try {
      const link = this.app.metadataCache.getFileCache(file)?.frontmatter?.feishu_url;
      if (typeof link !== "string" || !link.trim()) {
        throw new Error("当前笔记缺少 feishu_url。请将已有飞书文档的原链接填入该属性。");
      }
      const { client, origin } = this.connection();
      const url = await client.enablePublicReading(link.trim(), origin);
      new ResultModal(this.app, {
        title: "已开启互联网只读分享",
        message: "获得链接的人可阅读。可用浏览器无痕窗口验证访客访问。",
        url,
      }).open();
    } catch (error) {
      new Notice(error.message, 15000);
    }
  }

  saveSetting(key, value) {
    this.settings[key] = value;
    const snapshot = { ...this.settings };
    this.saving = this.saving.then(() => this.saveData(snapshot)).catch(() => {
      new Notice("无法保存飞书插件设置。");
    });
    return this.saving;
  }

  connection() {
    const { appId, secretName, workspace, collaborator } = this.settings;
    if (!/^cli_[\w-]+$/.test(appId)) throw new Error("请在 Feishu Publisher 设置中填写有效的 App ID。");
    const appSecret = secretName && this.app.secretStorage.getSecret(secretName)?.trim();
    if (!appSecret) throw new Error("请在 Feishu Publisher 设置中选择 App Secret。");
    const origin = documentOrigin(workspace);
    return {
      client: new FeishuClient(requestUrl, { appId, appSecret }),
      origin,
      collaborator: collaboratorFor(collaborator),
    };
  }

  async loadAssets(note, assets) {
    const cache = new Map();
    const remoteCache = new Map();
    const result = [];
    for (const image of assets) {
      if (image.url) {
        if (!remoteCache.has(image.url)) {
          try {
            remoteCache.set(image.url, await downloadRemoteImage(image.url));
          } catch (error) {
            throw new Error(`网络图片（${new URL(image.url).hostname}）下载失败。${error.message}`);
          }
        }
        result.push({ ...remoteCache.get(image.url), placeholder: image.placeholder });
        continue;
      }
      if ("mermaid" in image) {
        result.push(image);
        continue;
      }
      const link = image.path.split("#")[0];
      let linkpath = link;
      try {
        linkpath = decodeURIComponent(link);
      } catch {
        // A literal percent sign is valid in a vault filename.
      }

      const { metadataCache, vault } = this.app;
      const file = metadataCache.getFirstLinkpathDest(linkpath, note.path) ??
        (linkpath !== link ? metadataCache.getFirstLinkpathDest(link, note.path) : null);
      if (!(file instanceof TFile) || vault.getFileByPath(file.path) !== file) {
        throw new Error(`找不到仓库内的图片「${image.path}」。`);
      }
      const mime = imageTypes.get(file.extension.toLowerCase());
      if (!mime) throw new Error(`图片「${file.name}」格式暂不支持，请改用 PNG、JPEG、GIF、WebP 或 BMP。`);
      if (!cache.has(file.path)) {
        if (!file.stat.size || file.stat.size > maxImageBytes) {
          throw new Error(`图片「${file.name}」为空或超过 20 MB。`);
        }
        const data = await vault.readBinary(file);
        if (!data.byteLength || data.byteLength > maxImageBytes) {
          throw new Error(`图片「${file.name}」为空或超过 20 MB。`);
        }
        cache.set(file.path, data);
      }
      result.push({ ...image, name: file.name, mime, data: cache.get(file.path) });
    }
    return result;
  }

  async publish(file, forceNew = false) {
    if (this.publishing) {
      new Notice("已有一篇笔记正在发布。");
      return;
    }
    this.publishing = true;
    const progress = new Notice("正在准备并发布到飞书…", 0);
    let plan;
    try {
      const { publicReadingByDefault } = this.settings;
      const { client, origin, collaborator } = this.connection();
      const view = this.app.workspace.getActiveViewOfType(MarkdownView);
      const source = view?.file === file && view.getMode() === "source"
        ? view.editor.getValue()
        : await this.app.vault.read(file);
      const { exists, contentStart, frontmatter } = getFrontMatterInfo(source);
      const properties = exists ? parseYaml(frontmatter) ?? {} : {};
      if (typeof properties !== "object" || Array.isArray(properties)) throw new Error("笔记属性格式无效，请检查 YAML。");
      plan = publicationPlan(properties, origin, forceNew);
      const title = file.basename.trim();
      const prepared = prepareMarkdown(exists ? source.slice(contentStart) : source, title);
      const assets = await this.loadAssets(file, prepared.assets);
      const pendingSnapshot = properties.feishu_pending_snapshot;
      if (pendingSnapshot) {
        if (!plan.url || typeof pendingSnapshot.name !== "string" || pendingSnapshot.url !== plan.url) throw new Error("存在待确认的命名版本，请先核对 feishu_pending_snapshot 与原文档链接。");
        await client.ensureNamedVersion(plan.url, origin, pendingSnapshot.name, pendingSnapshot);
      }
      // Check version permissions before changing an existing document.
      if (plan.url) await client.listVersions(plan.url, origin);
      const url = await client[plan.action === "update" ? "update" : "publish"]({ ...prepared, assets, title, origin, collaborator, url: plan.url });
      let snapshot;
      try { snapshot = await client.ensureNamedVersion(url, origin, plan.version); }
      catch (error) {
        if (!error.url) error.url = url;
        throw error;
      }
      let message = plan.action === "update" ? "已更新原文档，主链接不变。" :
        `已创建文档，并向 ${collaborator.member_id} 授予可管理权限。`;
      message += snapshot.created ? `已保存飞书命名版本「${plan.version}」。` : `已保留命名版本「${plan.version}」。`;
      if (publicReadingByDefault && plan.action === "create") {
        try {
          await client.enablePublicReading(url, origin);
          message += "已开启互联网只读分享。";
        } catch (error) {
          prepared.warnings.push(`未能确认自动开启互联网只读分享。${error.message}`);
        }
      }
      try {
        await this.app.fileManager.processFrontMatter(file, (properties) => {
          recordPublication(properties, plan, url);
        });
      } catch {
        prepared.warnings.push("飞书文档已发布，但版本与链接未能写回原笔记。请保存本次链接及版本，避免下次重复创建。");
      }
      new ResultModal(this.app, {
        title: "已发布到飞书",
        message,
        url,
        warnings: prepared.warnings,
      }).open();
    } catch (error) {
      if (error.url) {
        try {
          await this.app.fileManager.processFrontMatter(file, (properties) => {
            recordPublication(properties, plan, error.url, false);
            if (error.snapshot) properties.feishu_pending_snapshot = error.snapshot;
          });
        } catch { /* The result still provides the link when local properties cannot be saved. */ }
        new ResultModal(this.app, { title: "飞书发布未完成", url: error.url, message: error.message }).open();
      } else {
        new Notice(error.message, 15000);
      }
    } finally {
      progress.hide();
      this.publishing = false;
    }
  }
}
