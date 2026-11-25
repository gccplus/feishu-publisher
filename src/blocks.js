const MAX_BATCH_SIZE = 1000;
const IMAGE = 27;
const TABLE_CELL = 32;
const ADD_ON = 40;
const TEXT_DRAWING = "blk_631fefbbae02400430b8f9f4";

export function planBlocks(converted, assets) {
  const { first_level_block_ids: roots, blocks } = converted ?? {};
  if (!Array.isArray(roots) || !roots.length || !Array.isArray(blocks)) {
    throw new Error("飞书未返回可写入的文档块。");
  }

  const byId = new Map(blocks.map((block) => [block.block_id, block]));
  const seen = new Set();
  const imageBlocks = [];
  const batches = [];
  let batch = { children_id: [], descendants: [] };

  for (const root of roots) {
    const descendants = [];
    const stack = [root];
    while (stack.length) {
      const id = stack.pop();
      const block = byId.get(id);
      if (!id || !block || seen.has(id)) throw new Error("飞书返回了无效的文档块结构。");
      seen.add(id);

      const { parent_id, revision_id, ...writable } = block;
      if (writable.table?.property) {
        const { merge_info, ...property } = writable.table.property;
        writable.table = { ...writable.table, property };
      }
      if (writable.block_type === IMAGE) {
        imageBlocks.push({ id, token: writable.image?.token });
        writable.image = { token: "" };
      }
      if (writable.block_type === TABLE_CELL && !writable.children?.length) {
        // Feishu requires at least one child even in an empty table cell.
        const emptyId = crypto.randomUUID();
        writable.children = [emptyId];
        byId.set(emptyId, { block_id: emptyId, block_type: 2, text: { elements: [] } });
      }
      descendants.push(writable);
      if (descendants.length > MAX_BATCH_SIZE) {
        throw new Error("单个表格或嵌套结构超过飞书的写入上限，请拆小后再发布。");
      }
      for (const child of (writable.children ?? []).slice().reverse()) stack.push(child);
    }

    if (batch.descendants.length + descendants.length > MAX_BATCH_SIZE) {
      batches.push(batch);
      batch = { children_id: [], descendants: [] };
    }
    batch.children_id.push(root);
    batch.descendants.push(...descendants);
  }
  batches.push(batch);

  if (imageBlocks.length !== assets.length) {
    throw new Error("飞书转换后的图片数量与原笔记不同（含 Mermaid 占位）。请尝试将图片单独放在一行。");
  }

  const byPlaceholder = new Map(assets.map((image) => [image.placeholder, image]));
  // Some converter responses retain the source URL in the image token field.
  const hasUrls = imageBlocks.some(({ token }) => /^https?:\/\//i.test(token ?? ""));
  const assetByBlock = new Map(imageBlocks.map(({ id, token }, index) => [
    id, hasUrls ? byPlaceholder.get(token) : assets[index],
  ]));
  if (new Set(assetByBlock.values()).size !== assets.length ||
      [...assetByBlock.values()].some((image) => !image)) {
    throw new Error("飞书返回的图片或 Mermaid 位置无法与原笔记匹配。");
  }
  for (const batch of batches) {
    for (const [index, block] of batch.descendants.entries()) {
      const asset = assetByBlock.get(block.block_id);
      if (asset?.mermaid === undefined) continue;
      batch.descendants[index] = {
        block_id: block.block_id,
        block_type: ADD_ON,
        add_ons: {
          component_type_id: TEXT_DRAWING,
          record: JSON.stringify({ data: asset.mermaid, theme: "default", view: "chart" }),
        },
      };
      assetByBlock.delete(block.block_id);
    }
  }
  return { batches, assetByBlock };
}
