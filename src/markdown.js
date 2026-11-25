import { fromMarkdown } from "mdast-util-from-markdown";
import { gfmFromMarkdown, gfmToMarkdown } from "mdast-util-gfm";
import { toMarkdown } from "mdast-util-to-markdown";
import { gfm } from "micromark-extension-gfm";

const parserOptions = { extensions: [gfm()], mdastExtensions: [gfmFromMarkdown()] };
const imageExtensions = /\.(?:png|jpe?g|gif|webp|bmp|svg|avif|heic|tiff?)$/i;
const calloutLabels = {
  summary: "摘要", tldr: "摘要", todo: "待办", check: "完成", done: "完成",
  help: "问题", faq: "问题", attention: "注意", failure: "失败", fail: "失败",
  missing: "失败", error: "危险", bug: "缺陷", cite: "引用",
  note: "说明", info: "信息", tip: "提示", hint: "提示", important: "重要",
  warning: "注意", caution: "注意", danger: "危险", example: "示例",
  quote: "引用", abstract: "摘要", question: "问题", success: "完成",
};

const plain = (value) => ({ type: "text", value });

function walk(node, visit) {
  visit(node);
  for (const child of node.children ?? []) walk(child, visit);
}

function removeComments(source) {
  if (!source.includes("%%")) return source;

  const codeRanges = [];
  walk(fromMarkdown(source, parserOptions), (node) => {
    if (node.type === "code" || node.type === "inlineCode") {
      codeRanges.push([node.position.start.offset, node.position.end.offset]);
    }
  });

  const parts = [];
  let keptFrom = 0;
  let marker = source.indexOf("%%");
  let range = 0;
  while (marker !== -1) {
    while (codeRanges[range]?.[1] <= marker) range++;
    if (codeRanges[range]?.[0] <= marker) {
      marker = source.indexOf("%%", codeRanges[range][1]);
      continue;
    }

    const end = source.indexOf("%%", marker + 2);
    if (end === -1) throw new Error("笔记中有未闭合的 Obsidian 注释（%%）。请闭合注释后再发布。");
    parts.push(source.slice(keptFrom, marker));
    keptFrom = end + 2;
    marker = source.indexOf("%%", keptFrom);
  }
  parts.push(source.slice(keptFrom));
  return parts.join("");
}

function webLink(url) {
  if (!/^https?:\/\//i.test(url)) return false;
  try {
    const parsed = new URL(url);
    return !parsed.username && !parsed.password;
  } catch {
    return false;
  }
}

export function prepareMarkdown(source, title) {
  const body = removeComments(source);
  const tree = fromMarkdown(body, parserOptions);
  const first = tree.children[0];
  if (first?.type === "heading" && first.depth === 1 &&
      first.children.every((node) => node.type === "text") &&
      first.children.map((node) => node.value).join("").trim() === title) {
    tree.children.shift();
  }

  const definitions = new Map();
  walk(tree, (node) => {
    if (node.type === "definition" && !definitions.has(node.identifier)) {
      definitions.set(node.identifier, node);
    }
  });

  const assets = [];
  const callouts = [];
  const warnings = new Set();
  let diagramCount = 0;
  function queueImage(source, alt) {
    const placeholder = `https://feishu-publisher.invalid/image/${assets.length}.png`;
    assets.push({ ...source, placeholder });
    return { type: "image", url: placeholder, alt: alt || "" };
  }

  function image(url, alt) {
    if (webLink(url)) {
      return queueImage({ url }, alt);
    }
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(url)) {
      throw new Error("图片地址须指向当前仓库内的文件，或使用 HTTP/HTTPS 链接。");
    }

    return queueImage({ path: url }, alt);
  }

  function wikiLinks(node) {
    const { value, position } = node;
    if (!position || !value.includes("[[")) return [node];

    const raw = body.slice(position.start.offset, position.end.offset);
    const nodes = [];
    let offset = 0;
    let rawOffset = 0;
    for (const match of value.matchAll(/(!?)\[\[([^\[\]\n]+)\]\]/g)) {
      const rawIndex = raw.indexOf(match[0], rawOffset);
      if (rawIndex === -1) continue;
      rawOffset = rawIndex + match[0].length;
      let escapeStart = rawIndex;
      while (escapeStart > 0 && raw[escapeStart - 1] === "\\") escapeStart--;
      if ((rawIndex - escapeStart) % 2) continue;

      const [target, alias] = match[2].split("|");
      const path = target.split("#")[0].trim();
      if (match.index > offset) nodes.push(plain(value.slice(offset, match.index)));
      if (match[1] && imageExtensions.test(path)) {
        const caption = /^\d+(?:x\d+)?$/i.test(alias ?? "") ? "" : alias;
        nodes.push(image(path, caption || path.split("/").at(-1)));
      } else {
        warnings.add("仓库内链接和笔记嵌入已转换为文本。");
        nodes.push(plain(alias?.trim() || target.trim()));
      }
      offset = match.index + match[0].length;
    }
    if (offset < value.length) nodes.push(plain(value.slice(offset)));
    return nodes;
  }

  function normalize(node, inLink = false) {
    switch (node.type) {
      case "definition":
        return [];
      case "html":
        warnings.add("内嵌 HTML 已省略。");
        return [];
      case "image":
        return [image(node.url, node.alt)];
      case "imageReference":
        return [image(definitions.get(node.identifier).url, node.alt)];
      case "code": {
        if (node.lang?.toLowerCase() !== "mermaid") return [node];
        const number = ++diagramCount;
        const diagram = queueImage({ mermaid: node.value, number }, `Mermaid 图 ${number}`);
        return [{ type: "paragraph", children: [diagram] }];
      }
      case "text":
        return inLink ? [node] : wikiLinks(node);
      case "blockquote": {
        const paragraph = node.children[0];
        const first = paragraph?.children?.[0];
        const match = first?.type === "text" && /^\[!([\w-]+)\]([+-])?[ \t]*/.exec(first.value);
        if (!match) break;
        const kind = match[1].toLowerCase();
        const start = "feishu-callout-" + crypto.randomUUID();
        const end = start + "-end";
        callouts.push({ start, end, kind });
        if (match[2]) warnings.add("折叠 Callout 在飞书中展开显示。");
        first.value = first.value.slice(match[0].length);
        // Split the first line (title) from the remainder of its Markdown paragraph.
        const title = [];
        const remainder = [];
        let inBody = false;
        for (const child of paragraph.children) {
          if (inBody) { remainder.push(child); continue; }
          if (child.type === "break") { inBody = true; continue; }
          const newline = child.type === "text" ? child.value.indexOf("\n") : -1;
          if (newline >= 0) {
            title.push({ ...child, value: child.value.slice(0, newline) });
            remainder.push({ ...child, value: child.value.slice(newline + 1) });
            inBody = true;
          } else {
            title.push(child);
          }
        }
        if (!title.some((child) => child.type !== "text" || child.value.trim())) {
          title.splice(0, title.length, plain(Object.hasOwn(calloutLabels, kind) ? calloutLabels[kind] : kind));
        }
        const content = [
          { type: "paragraph", children: [{ type: "strong", children: title }] },
          ...(remainder.length ? [{ type: "paragraph", children: remainder }] : []),
          ...node.children.slice(1),
        ].flatMap((child) => normalize(child, inLink));
        return [
          { type: "paragraph", children: [plain(start)] },
          ...content,
          { type: "paragraph", children: [plain(end)] },
        ];
      }
      case "linkReference":
        node = { ...node, type: "link", url: definitions.get(node.identifier).url };
        break;
    }

    if (node.children) {
      node.children = node.children.flatMap((child) => normalize(child, inLink || node.type === "link"));
    }
    if (node.type === "link" && !webLink(node.url)) {
      warnings.add("仓库内链接和笔记嵌入已转换为文本。");
      return node.children;
    }
    return [node];
  }

  normalize(tree);
  const markdown = toMarkdown(tree, { extensions: [gfmToMarkdown()], fences: true }).trim();
  if (!markdown) throw new Error("这篇笔记没有可发布的正文。");
  return { markdown, assets, callouts, warnings: [...warnings] };
}
