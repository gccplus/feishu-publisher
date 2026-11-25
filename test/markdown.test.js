import assert from "node:assert/strict";
import test from "node:test";
import { prepareMarkdown } from "../src/markdown.js";

test("retains native Markdown structure and converts local image references", () => {
  const note = [
    "# 测试笔记", "", "## 二级标题", "",
    "> [!TIP] 注意内容", "> 正文", "",
    "- [x] 已完成", "- [ ] 待处理", "",
    "| 名称 | 数量 |", "| --- | --- |", "| A | 2 |", "",
    "![[图片一.png|240]]", "", "![另一张][image]", "",
    "[image]: <assets/图片 二.jpg>", "",
    "~~删除线~~、[外链](https://www.feishu.cn) 和 [[目录/内部笔记|内部笔记]]。",
  ].join("\n");

  const output = prepareMarkdown(note, "测试笔记");
  assert.doesNotMatch(output.markdown, /^# 测试笔记/m);
  assert.match(output.markdown, /^## 二级标题$/m);
  assert.match(output.markdown, /\*\*注意内容\*\*/);
  assert.equal(output.callouts[0].kind, "tip");
  assert.match(output.markdown, /\[x\] 已完成/);
  assert.match(output.markdown, /\| 名称 \| 数量 \|/);
  assert.match(output.markdown, /~~删除线~~/);
  assert.match(output.markdown, /\[外链\]\(https:\/\/www\.feishu\.cn\)/);
  assert.match(output.markdown, /和 内部笔记。/);
  assert.deepEqual(output.assets.map(({ path }) => path), ["图片一.png", "assets/图片 二.jpg"]);
  assert.doesNotMatch(output.markdown, /assets\/图片 二\.jpg/);
});

test("keeps code literals while excluding private comments and inline HTML", () => {
  const source = [
    "之前 %% 行内秘密 %% 之后", "", "%%", "跨段秘密", "", "更多秘密", "%%",
    "", "行内代码 `%% ![[demo.png]]`", "", "```js", "%% ![[example.png]]", "```",
    "", "<div style=\"color:red\">HTML</div>",
  ].join("\n");
  const output = prepareMarkdown(source, "示例");
  assert.doesNotMatch(output.markdown, /秘密|<div/);
  assert.match(output.markdown, /`%% !\[\[demo\.png\]\]`/);
  assert.match(output.markdown, /^%% !\[\[example\.png\]\]$/m);
  assert.deepEqual(output.assets, []);
  assert.throws(() => prepareMarkdown("公开段落\n%% 私密内容", "示例"), /未闭合/);
});

test("queues network images and leaves regular hyperlinks intact", () => {
  const output = prepareMarkdown([
    "![外部图片](https://example.com/photo.png?key=test)", "",
    "![引用图片][remote]", "", "[remote]: https://example.com/api/image", "",
    "[普通链接](https://example.com/)",
  ].join("\n"), "示例");
  assert.deepEqual(output.assets.map(({ url }) => url), [
    "https://example.com/photo.png?key=test", "https://example.com/api/image",
  ]);
  assert.match(output.markdown, /!\[外部图片\]\(https:\/\/feishu-publisher\.invalid\/image\/0\.png\)/);
  assert.match(output.markdown, /\[普通链接\]\(https:\/\/example\.com\/\)/);
  assert.doesNotMatch(output.markdown, /key=test|api\/image/);
  assert.throws(() => prepareMarkdown("![本机文件](file:///tmp/test.png)", "示例"), /当前仓库/);
  assert.throws(() => prepareMarkdown("%%仅有注释%%", "示例"), /没有可发布/);
});

test("an escaped wiki embed remains literal", () => {
  const output = prepareMarkdown("\\![[demo.png]]", "示例");
  assert.equal(output.assets.length, 0);
  assert.match(output.markdown, /demo\.png/);
});

test("queues Mermaid diagrams in body order alongside local images", () => {
  const firstDiagram = "flowchart TD\n  A[开始] --> B{校验通过?}\n  %% Mermaid comment";
  const secondDiagram = "graph LR\n  X --> Y";
  const output = prepareMarkdown([
    "## 发布步骤", "", "```mermaid", firstDiagram, "```", "",
    "![[demo.png]]", "", "~~~Mermaid", secondDiagram, "~~~", "",
    "```js", "console.log('保留普通代码');", "```",
  ].join("\n"), "示例");
  assert.deepEqual(output.assets.map(({ mermaid, path }) => mermaid ?? path), [
    firstDiagram, "demo.png", secondDiagram,
  ]);
  assert.deepEqual(output.assets.map(({ number }) => number), [1, undefined, 2]);
  assert.doesNotMatch(output.markdown, /flowchart|校验通过|graph LR/);
  assert.match(output.markdown, /console\.log/);
  for (const { placeholder } of output.assets) assert.ok(output.markdown.includes(placeholder));
});
