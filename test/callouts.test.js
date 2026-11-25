import assert from "node:assert/strict";
import test from "node:test";
import { applyCallouts } from "../src/callouts.js";
import { planBlocks } from "../src/blocks.js";
import { prepareMarkdown } from "../src/markdown.js";

const text = (id, content) => ({
  block_id: id, block_type: 2, text: { elements: [{ text_run: { content } }] },
});

test("preserves custom rich titles, default titles, folding and nested callout bodies", () => {
  const result = prepareMarkdown([
    "> [!warning]- **发布前检查**", "> 请确认设置。", ">", "> - 第一步", "> - 第二步",
    ">", "> > [!success]", "> > 已完成。", "", "> 普通引用",
  ].join("\n"), "示例");
  assert.deepEqual(result.callouts.map(({ kind }) => kind), ["warning", "success"]);
  assert.match(result.markdown, /发布前检查/);
  assert.match(result.markdown, /请确认设置/);
  assert.match(result.markdown, /\*\*完成\*\*/);
  assert.match(result.markdown, /已完成/);
  assert.match(result.markdown, /> 普通引用/);
  assert.doesNotMatch(result.markdown, /\[!warning\]/);
  assert.match(result.warnings[0], /展开/);
});

test("rebuilds native cards, keeping media order, nested cards and batching valid", () => {
  const callouts = [
    { start: "outer", end: "outer-end", kind: "warning" },
    { start: "inner", end: "inner-end", kind: "check" },
  ];
  const blocks = [
    text("s", "outer"), text("title", "标题"), text("body", "正文"),
    { block_id: "img", block_type: 27, image: {} },
    text("after", "图片后正文"),
    text("ns", "inner"), text("nt", "完成"), text("ne", "inner-end"),
    text("tail", "收尾"), text("e", "outer-end"), text("outside", "卡片外"),
  ];
  const warnings = [];
  const result = applyCallouts({
    first_level_block_ids: blocks.map(({ block_id }) => block_id), blocks,
  }, callouts, warnings);
  const roots = result.first_level_block_ids.map((id) => result.blocks.find((b) => b.block_id === id));
  assert.deepEqual(roots.map((block) => block.block_type), [19, 27, 19, 19, 19, 2]);
  assert.deepEqual(roots[0].children, ["title", "body"]);
  assert.deepEqual(roots[2].children, ["after"]);
  assert.deepEqual(roots[3].children, ["nt"]);
  assert.equal(roots[3].callout.emoji_id, "white_check_mark");
  assert.deepEqual(roots[4].children, ["tail"]);
  assert.ok(warnings.length);
  assert.equal(result.blocks.filter((b) => b.block_type === 2).length, 6);
  const plan = planBlocks(result, [{ placeholder: "image" }]);
  assert.equal(plan.batches.length, 1);
  assert.equal(plan.assetByBlock.size, 1);
  assert.equal(blocks[0].text.elements[0].text_run.content, "outer");
});

test("fails before publication when callout markers disappear during conversion", () => {
  assert.throws(() => applyCallouts({
    first_level_block_ids: ["p"], blocks: [text("p", "正文")],
  }, [{ start: "missing", end: "end" }]), /全部 Callout/);
});
