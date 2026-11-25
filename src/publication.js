import { linkedDocument } from "./feishu.js";

export function noteVersion(value) {
  if (typeof value === "string" && [...value.trim()].length > 1024) throw new Error("version 属性不能超过 1024 个字符。");
  if (value === undefined || value === null || value === "") return "1.0";
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  if (typeof value === "string" && value.trim()) return value.trim();
  throw new Error('笔记 version 属性须为文本或数字，例如 version: "1.0"。');
}

export function publicationPlan(properties, origin, forceNew = false) {
  const version = noteVersion(properties.version);
  const initialUrl = typeof properties.feishu_url === "string" ? properties.feishu_url.trim() : "";
  if (properties.feishu_url != null && typeof properties.feishu_url !== "string") throw new Error("feishu_url 须为飞书文档链接文本。");
  let url;
  if (!forceNew && initialUrl) url = linkedDocument(initialUrl, origin).url;
  else if (!forceNew && typeof properties.feishu_pending_url === "string") url = linkedDocument(properties.feishu_pending_url, origin).url;

  return { action: url ? "update" : "create", url, version, initialUrl };
}

export function recordPublication(properties, plan, url, complete = true) {
  const current = typeof properties.feishu_url === "string" ? properties.feishu_url.trim() : "";
  if (current !== plan.initialUrl) throw new Error("发布期间 feishu_url 被修改，未覆盖笔记属性，请从发布结果手动保存链接。");
  if (properties.version == null || properties.version === "") properties.version = plan.version;
  if (complete) {
    properties.feishu_url = url;
    delete properties.feishu_published_version;
    delete properties.feishu_pending_url;
    delete properties.feishu_pending_version;
    delete properties.feishu_pending_snapshot;
  } else {
    properties.feishu_pending_url = url;
    properties.feishu_pending_version = plan.version;
  }
}
