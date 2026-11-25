# 维护者发布说明

在公开 GitHub 仓库的默认分支提交本项目后，Build and release 工作流会运行测试、构建和安装包检查，并创建与 manifest.version 相同标签的 GitHub Release。也可在 Actions 中手动运行工作流。

该工作流需要仓库允许 Actions 执行，并允许工作流使用 contents:write。它只为默认分支发布，已有同名 Release 时不会覆盖附件。

Release 附件：main.js、manifest.json、LICENSE、THIRD_PARTY_NOTICES.md、版本安装 ZIP 和 SHA256SUMS。

发布后核对：标签指向预期源码提交；Release 中 main.js 和 manifest.json 与此次构建一致；ZIP 包可解压；源码包的 npm ci / npm run check 可运行。此后再提交社区目录。

更新版本时一并修改 manifest.json、package.json、package-lock.json、versions.json、CHANGELOG.md 和 docs/RELEASE_NOTES.md。社区版本标签使用 x.y.z，不加 v 前缀。
