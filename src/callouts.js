const aliases = {
  summary: "abstract", tldr: "abstract", hint: "tip", important: "tip",
  check: "success", done: "success", help: "question", faq: "question",
  caution: "warning", attention: "warning", fail: "failure", missing: "failure",
  error: "danger", cite: "quote",
};
const icons = {
  note: "memo", abstract: "clipboard", info: "information_source", todo: "ballot_box_with_check",
  tip: "bulb", success: "white_check_mark", question: "question",
  warning: "warning", failure: "x", danger: "no_entry", bug: "bug",
  example: "pushpin", quote: "speech_balloon",
};
// Callout containers accept text, headings, lists, todos and quotes.
const allowed = new Set([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 17, 34]);

export function applyCallouts(converted, callouts = [], warnings = []) {
  if (!callouts.length) return converted;
  const blocks = structuredClone(converted.blocks);
  const byId = new Map(blocks.map((block) => [block.block_id, block]));
  const starts = new Map(callouts.map((callout) => [callout.start, callout]));
  const ends = new Set(callouts.map((callout) => callout.end));
  const found = new Set();
  const removed = new Set();

  function text(block) {
    if (block.block_type !== 2) return "";
    return (block.text?.elements ?? []).map((element) => element.text_run?.content ?? "").join("");
  }

  function transform(ids) {
    const result = [];
    const stack = [];
    let active;
    function append(id) {
      if (!active) { result.push(id); return; }
      const block = byId.get(id);
      if (!allowed.has(block.block_type)) {
        active = undefined;
        warnings.push("Callout 中的图片、表格、代码或嵌套卡片按原顺序放在相邻位置。");
        result.push(id);
        return;
      }
      if (!active.id) {
        active.id = crypto.randomUUID();
        const kind = aliases[active.kind] ?? active.kind;
        const container = {
          block_id: active.id, block_type: 19,
          callout: { emoji_id: icons[kind] ?? "memo", background_color: 1, border_color: 1 },
          children: [],
        };
        blocks.push(container);
        byId.set(container.block_id, container);
        result.push(container.block_id);
      }
      byId.get(active.id).children.push(id);
    }

    for (const id of ids) {
      const block = byId.get(id);
      if (!block) throw new Error("Callout 转换缺少文档块。");
      const value = text(block);
      if (starts.has(value)) {
        removed.add(id);
        found.add(value);
        if (stack.length) warnings.push("嵌套 Callout 在飞书中按顺序展开为独立卡片。");
        stack.push({ ...starts.get(value) });
        active = stack.at(-1);
      } else if (ends.has(value)) {
        removed.add(id);
        if (stack.at(-1)?.end !== value) throw new Error("Callout 转换后的边界无法匹配。");
        stack.pop();
        active = stack.length ? { ...stack.at(-1), id: undefined } : undefined;
      } else {
        if (block.children?.length) block.children = transform(block.children);
        append(id);
        if (!active && stack.length) active = { ...stack.at(-1), id: undefined };
      }
    }
    if (stack.length) throw new Error("Callout 转换后的结束标记缺失。");
    return result;
  }

  const roots = transform(converted.first_level_block_ids);
  if (found.size !== callouts.length) throw new Error("飞书转换后未能定位全部 Callout，请检查引用格式。");
  return {
    first_level_block_ids: roots,
    blocks: blocks.filter((block) => !removed.has(block.block_id)),
  };
}
