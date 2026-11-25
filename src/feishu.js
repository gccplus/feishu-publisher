import { applyCallouts } from "./callouts.js";
import { planBlocks } from "./blocks.js";

const API = "https://open.feishu.cn/open-apis";
const TOKEN_URL = "https://accounts.feishu.cn/oauth/v3/token";

function requireToken(token, description) {
  if (typeof token !== "string" || !/^[\w-]+$/.test(token)) {
    throw new Error(`飞书未返回有效的${description}。`);
  }
  return token;
}

export function documentOrigin(value) {
  const input = value.trim();
  let url;
  try {
    url = new URL(input.includes("://") ? input : "https://" + input);
  } catch {
    throw new Error("请填写飞书工作区域名或该工作区内任意文档链接。");
  }
  if (url.protocol !== "https:" || !/(?:^|\.)feishu\.cn$/.test(url.hostname) ||
      url.username || url.password || url.port) {
    throw new Error("请填写 HTTPS 飞书工作区域名或文档链接（feishu.cn）。");
  }
  return url.origin;
}

export function linkedDocument(value, origin) {
  let link;
  try { link = new URL(value); } catch { throw new Error("feishu_url 须为已配置工作区内的飞书文档链接。"); }
  const match = /^\/docx\/([\w-]+)\/?$/.exec(link.pathname);
  if (!match || link.origin !== origin || link.username || link.password) throw new Error("feishu_url 须为已配置工作区内的飞书文档链接。");
  return { id: match[1], url: `${origin}/docx/${match[1]}` };
}

function revisionOf(data) {
  const revision = data?.document_revision_id;
  if (!Number.isSafeInteger(revision) || revision < 0) throw new Error("飞书未返回有效的文档版本，已停止更新，请检查原文档。");
  return revision;
}

export function collaboratorFor(value) {
  if (/^ou_[\w-]+$/.test(value)) return { member_type: "openid", member_id: value };
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return { member_type: "email", member_id: value };
  throw new Error("请在 Feishu Publisher 设置中填写飞书企业邮箱或当前应用的 Open ID。");
}

export class PublishError extends Error {
  constructor(message, url, cause) {
    super(message, { cause });
    this.url = url;
  }
}

export class FeishuClient {
  constructor(request, { appId, appSecret }) {
    this.request = request;
    this.appId = appId;
    this.appSecret = appSecret;
  }

  async send(stage, url, method, body, contentType = "application/json; charset=utf-8") {
    let response;
    try {
      response = await this.request({
        url, method, contentType, body, throw: false,
        headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
      });
    } catch {
      throw new Error(`${stage}失败，请检查网络连接。`);
    }

    let json;
    try {
      json = response.json;
    } catch {
      throw new Error(`${stage}失败，飞书返回了无法读取的响应（HTTP ${response.status}）。`);
    }
    if (response.status >= 300 || json?.code !== 0) {
      const logId = Object.entries(response.headers ?? {})
        .find(([name]) => name.toLowerCase() === "x-tt-logid")?.[1];
      const code = Number.isInteger(json?.code) ? `，飞书错误码 ${json.code}` : "";
      const trace = logId && /^[\w-]+$/.test(logId) ? `，请求 ID ${logId}` : "";
      const error = new Error(`${stage}失败（HTTP ${response.status}${code}${trace}）。请核对对应的飞书应用权限及发布状态。`);
      error.definiteFailure = response.status < 500 && Number.isInteger(json?.code) && json.code !== 0;
      throw error;
    }
    return json;
  }

  async authenticate() {
    const form = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: this.appId,
      client_secret: this.appSecret,
    });
    const response = await this.send("获取飞书访问凭证", TOKEN_URL, "POST", form.toString(),
      "application/x-www-form-urlencoded");
    const token = response.access_token;
    // Bearer tokens can contain dots and other characters that aren't valid in path IDs.
    if (typeof token !== "string" || !/^[A-Za-z0-9._~+/-]+=*$/.test(token) || /\s/.test(token)) {
      throw new Error("飞书未返回有效的访问凭证。");
    }
    this.token = token;
  }

  async waitForEdit() {
    const delay = (this.lastEditAt ?? 0) + 360 - Date.now();
    if (delay > 0) await new Promise((resolve) => setTimeout(resolve, delay));
    this.lastEditAt = Date.now();
  }

  async json(stage, path, method, body) {
    if (method !== "GET" && /\/docx\/v1\/documents\/[^/]+\/blocks\//.test(path)) await this.waitForEdit();
    const response = await this.send(stage, API + path, method, JSON.stringify(body));
    return response.data;
  }

  convert(markdown) {
    return this.json("转换 Markdown", "/docx/v1/documents/blocks/convert", "POST", {
      content_type: "markdown",
      content: markdown,
    });
  }

  async enablePublicReading(link, origin) {
    let url;
    try {
      url = new URL(link);
    } catch {
      throw new Error("请在笔记的 feishu_url 属性中填写飞书文档链接。");
    }
    const match = /^\/docx\/([\w-]+)\/?$/.exec(url.pathname);
    if (!match || url.origin !== origin || url.username || url.password) {
      throw new Error("feishu_url 必须是已配置工作区内的飞书文档链接。");
    }
    if (!this.token) await this.authenticate();
    const result = await this.json("开启互联网只读分享", `/drive/v1/permissions/${match[1]}/public?type=docx`,
      "PATCH", { external_access: true, link_share_entity: "anyone_readable" });
    if (result?.permission_public?.link_share_entity !== "anyone_readable" ||
        result.permission_public.external_access === false) {
      throw new Error("飞书未确认互联网只读权限。请在文档的分享面板检查，或用无痕窗口验证。");
    }
    return `${origin}/docx/${match[1]}`;
  }

  async uploadImage(image, documentPath, blockId, revision = -1) {
    const form = new FormData();
    form.append("file_name", image.name);
    form.append("parent_type", "docx_image");
    form.append("parent_node", blockId);
    form.append("size", String(image.data.byteLength));
    form.append("file", new Blob([image.data], { type: image.mime }), image.name);
    const multipart = new Response(form);
    const body = await multipart.arrayBuffer();
    const delay = (this.lastUploadAt ?? 0) + 220 - Date.now();
    if (delay > 0) await new Promise((resolve) => setTimeout(resolve, delay));
    this.lastUploadAt = Date.now();
    const uploaded = await this.send("上传本地图片", API + "/drive/v1/medias/upload_all",
      "POST", body, multipart.headers.get("content-type"));
    const token = requireToken(uploaded.data?.file_token, "图片素材 ID");

    return this.json("写入图片块", `${documentPath}/blocks/${blockId}?document_revision_id=${revision}`, "PATCH", {
      replace_image: { token, align: 2 },
    });
  }

  async listVersions(link, origin) {
    const { id } = linkedDocument(link, origin);
    if (!this.token) await this.authenticate();
    const versions = [];
    const cursors = new Set();
    let cursor;
    do {
      const query = new URLSearchParams({ obj_type: "docx", page_size: "100", ...(cursor ? { page_token: cursor } : {}) });
      const page = await this.json("读取飞书命名版本", `/drive/v1/files/${id}/versions?${query}`, "GET");
      if (!page || (page.items != null && !Array.isArray(page.items))) throw new Error("飞书未返回有效的版本列表，请检查版本管理权限。");
      versions.push(...(page.items ?? []));
      cursor = page.has_more ? page.page_token : null;
      if (page.has_more && (!cursor || cursors.has(cursor))) throw new Error("飞书版本列表分页异常，已停止发布。");
      if (cursor) cursors.add(cursor);
    } while (cursor);
    return versions;
  }

  async versionDelay() { await new Promise((resolve) => setTimeout(resolve, 1000)); }

  async ensureNamedVersion(link, origin, name, pending) {
    const { id, url } = linkedDocument(link, origin);
    const active = (item) => String(item.status) === "0" && item.name === name &&
      typeof item.version === "string" && item.version.length > 0;
    let versions = await this.listVersions(url, origin);
    const existing = versions.find((item) => active(item) && (!pending?.id || item.version === pending.id));
    if (existing) return { created: false, version: existing.version };
    let versionId = pending?.id;
    const incomplete = (message, cause) => {
      const error = new PublishError(message, url, cause);
      error.snapshot = { name, id: versionId || "", url };
      return error;
    };
    if (pending && !versionId) throw incomplete("上次版本保存请求结果不明，目前未查到对应命名版本。请先在飞书“查看已存版本”中核对，避免重复创建版本。");
    if (!versionId) {
      let created;
      try {
        created = await this.json("保存飞书命名版本", `/drive/v1/files/${id}/versions`, "POST", { name, obj_type: "docx" });
      } catch (error) {
        if (error.definiteFailure) throw new PublishError("正文已发布，但飞书拒绝保存命名版本。" + error.message, url, error);
        throw incomplete("正文已发布，但飞书命名版本保存未确认。" + error.message, error);
      }
      versionId = created?.version;
      if (typeof versionId !== "string" || !versionId) throw incomplete("飞书已接收版本保存请求，但未返回可核对的版本标识，请先在飞书检查。");
    }
    // Version creation is asynchronous. Confirm it through the version list before marking success.
    for (let attempt = 0; attempt < 8; attempt++) {
      try { versions = await this.listVersions(url, origin); }
      catch (error) { throw incomplete("版本保存请求已提交，但查询状态失败。" + error.message, error); }
      const confirmed = versions.find((item) => active(item) && item.version === versionId);
      if (confirmed) return { created: !pending, version: versionId };
      if (attempt < 7) await this.versionDelay();
    }
    throw incomplete("飞书版本保存仍未确认。插件已记录待完成的版本标识；再次发布会先查询该请求，不会重复提交。");
  }

  async writePlan(id, batches, assetByBlock, revision) {
    const path = `/docx/v1/documents/${id}`;
    const roots = [];
    for (const batch of batches) {
      const created = await this.json("写入文档块", `${path}/blocks/${id}/descendant?document_revision_id=${revision}&client_token=${crypto.randomUUID()}`,
        "POST", { ...batch, index: -1 });
      revision = revisionOf(created);
      const relations = new Map((created.block_id_relations ?? []).map(({ temporary_block_id, block_id }) => [temporary_block_id, block_id]));
      for (const root of batch.children_id) roots.push(requireToken(relations.get(root), "新增文档块 ID"));
      for (const block of batch.descendants) {
        const image = assetByBlock.get(block.block_id);
        if (!image) continue;
        const patched = await this.uploadImage(image, path, requireToken(relations.get(block.block_id), "图片块 ID"), revision);
        revision = revisionOf(patched);
      }
    }
    return { revision, roots };
  }

  async update({ url: link, title, markdown, assets, origin, collaborator, callouts = [], warnings = [] }) {
    const { id, url } = linkedDocument(link, origin);
    await this.authenticate();
    const { batches, assetByBlock } = planBlocks(applyCallouts(await this.convert(markdown), callouts, warnings), assets);
    const path = `/docx/v1/documents/${id}`;
    const metadata = await this.json("读取原文档版本", path, "GET");
    const revision = metadata?.document?.revision_id;
    if (!Number.isSafeInteger(revision) || revision < 0) throw new Error("无法读取飞书原文档版本，未更新正文。");
    const snapshot = await this.json("读取原文档正文", `${path}/blocks/${id}?document_revision_id=${revision}`, "GET");
    if (!snapshot?.block || typeof snapshot.block !== "object") throw new Error("无法读取原文档正文，未执行更新。");
    const oldRoots = snapshot.block.children ?? [];
    if (!Array.isArray(oldRoots) || oldRoots.some((value) => typeof value !== "string")) throw new Error("原文档块结构异常，未更新正文。");
    if (metadata.document.title !== title) warnings.push("本次保留飞书原文档标题，主链接保持不变。");
    try {
      const written = await this.writePlan(id, batches, assetByBlock, revision);
      const latestMetadata = await this.json("校验更新后的文档版本", path, "GET");
      if (latestMetadata?.document?.revision_id !== written.revision) throw new Error("发布过程中原文档版本发生变化，未删除旧正文。");
      const latest = await this.json("校验更新后的正文", `${path}/blocks/${id}?document_revision_id=${written.revision}`, "GET");
      const expected = [...oldRoots, ...written.roots];
      if (!Array.isArray(latest?.block?.children) ||
          latest.block.children.length !== expected.length || latest.block.children.some((value, index) => value !== expected[index])) {
        throw new Error("发布过程中原文档发生变化，未删除旧正文，请打开原链接检查后重试。");
      }
      if (oldRoots.length) {
        await this.json("替换旧正文", `${path}/blocks/${id}/children/batch_delete?document_revision_id=${written.revision}&client_token=${crypto.randomUUID()}`,
          "DELETE", { start_index: 0, end_index: oldRoots.length });
      }
    } catch (error) {
      throw new PublishError("原文档更新未完成，可能保留旧正文和部分新内容。" + error.message, url, error);
    }
    if (collaborator) {
      try {
        await this.json("授予飞书账号可管理权限", `/drive/v1/permissions/${id}/members?type=docx`,
          "POST", { ...collaborator, perm: "full_access" });
      } catch (error) {
        throw new PublishError("原文档正文已更新，但协作者可管理权限未确认。" + error.message, url, error);
      }
    }
    return url;
  }

  async publish({ title, markdown, assets, origin, collaborator, callouts = [], warnings = [] }) {
    await this.authenticate();
    const { batches, assetByBlock } = planBlocks(applyCallouts(await this.convert(markdown), callouts, warnings), assets);
    const document = await this.json("创建文档", "/docx/v1/documents", "POST", { title });
    const id = requireToken(document?.document?.document_id, "文档 ID");
    const path = `/docx/v1/documents/${id}`;
    const url = `${origin}/docx/${id}`;

    try {
      for (const batch of batches) {
        const created = await this.json("写入文档块", `${path}/blocks/${id}/descendant?document_revision_id=-1`,
          "POST", { ...batch, index: -1 });
        const relations = new Map((created?.block_id_relations ?? []).map(
          ({ temporary_block_id, block_id }) => [temporary_block_id, block_id],
        ));
        for (const block of batch.descendants) {
          const image = assetByBlock.get(block.block_id);
          if (!image) continue;
          const blockId = requireToken(relations.get(block.block_id), "图片块 ID");
          await this.uploadImage(image, path, blockId);
        }
      }
    } catch (error) {
      throw new PublishError("飞书已创建文档，但内容可能不完整。" + error.message, url, error);
    }

    try {
      await this.json("授予飞书账号可管理权限", `/drive/v1/permissions/${id}/members?type=docx`,
        "POST", { ...collaborator, perm: "full_access" });
    } catch (error) {
      throw new PublishError("文档内容已写入，账号授权失败，链接可能暂时无法打开。" + error.message, url, error);
    }
    return url;
  }
}
