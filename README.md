# Feishu Publisher

将 Obsidian Markdown 笔记发布到飞书，保留原生排版、图片、提示卡片和 Mermaid 文本绘图。后续发布更新同一篇文档；修改笔记版本号可保存飞书原生命名版本，主链接保持不变。

Publish Markdown notes to Feishu Docs with a stable document link and native named versions. Desktop only. Requires Obsidian 1.11.4+ and your own Feishu custom application. See [setup](docs/SETUP.md) and [privacy](PRIVACY.md).

## 功能

- 单篇笔记手动发布，首次创建、后续覆盖原文档正文。
- 使用笔记 `version` 属性保存原生命名版本，主链接写入 `feishu_url`。
- 标题、列表、任务、表格、引用和代码使用飞书原生块。
- 本地图片、Markdown 图片引用与公开网络图片自动上传。
- Obsidian Callout 转为飞书原生提示卡片，Mermaid 使用飞书文本绘图组件。
- 配置的协作者获得可管理权限；可按需开启互联网只读分享。

## 安装

社区目录上架前，请使用 [GitHub Releases](https://github.com/gccplus/feishu-publisher/releases) 手动安装：

1. 在本仓库 Releases 下载 `main.js` 和 `manifest.json`，或下载整包 `feishu-publisher-0.1.18.zip`。
2. 放入仓库 `.obsidian/plugins/feishu-publisher/`。
3. 在 Obsidian 的“设置 → 第三方插件”启用 Feishu Publisher。

升级时覆盖插件文件，保留 `data.json`。桌面端支持；移动端不支持。使用插件无需安装 Node.js，只有从源码构建才需要 Node.js。

## 配置和发布

先按 [配置说明](docs/SETUP.md) 创建飞书应用、开通权限，在插件设置中填写 App ID、App Secret 密钥、工作区域名和协作者。

在笔记顶部写入：

```yaml
---
version: "1.0"
---
```

执行命令“发布当前笔记到飞书（统一链接与命名版本）”。成功后，笔记会多出 `feishu_url` 属性。

| 操作 | 结果 |
| --- | --- |
| 首次发布 | 创建主文档，并保存命名版本 1.0 |
| 修改正文，版本仍为 1.0 | 更新主文档，链接不变，保留已有 1.0 快照 |
| 版本改为 1.1 后发布 | 更新主文档，保存 1.1 快照，主链接不变 |

命名版本是保存当时的只读快照。同版本继续编辑不会改写该快照；需要保存新快照时改变 `version`。在飞书右上角“... → 查看已存版本”查看快照。

[示例笔记](examples/example-note.md) · [完整配置与迁移说明](docs/SETUP.md) · [常见问题](docs/FAQ.md) · [更新记录](CHANGELOG.md)

## 边界

更新采用本地正文覆盖飞书正文，不是双向同步；飞书内修改和块关联评论可能受覆盖影响。文档由应用创建和拥有，协作者有可管理权限。插件没有用户账号 OAuth 登录、自动后台同步、文件夹批量发布或一键回退。飞书租户的对外分享策略仍然生效。

原生命名版本保存为异步操作；插件会检查保存结果并记录待完成请求。不要在发布过程中同时编辑同一飞书文档。图片单张上限 20 MB，支持 PNG、JPEG、GIF、WebP、BMP。

## 隐私与网络

仅在手动发布时读取当前笔记和引用的仓库图片。笔记正文和图片会发送给飞书；网络图片会先从其原始地址下载。App Secret 通过 Obsidian 密钥库读取，不写入插件设置文件。本插件不收集遥测，也不需要额外中转服务器。详见 [数据与网络说明](PRIVACY.md)。

## 开发

需要 Node.js 22.12+ 和 npm：

```sh
npm ci
npm run check
```

`npm run build` 在根目录生成 `main.js`；`npm run check` 运行测试、构建并模拟完整发布流程。测试使用模拟服务，不会创建真实飞书文档。自动测试不能替代真实租户的权限、版本保存及渲染验证。

## 许可

[MIT](LICENSE)。第三方依赖许可见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。
