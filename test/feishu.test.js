import assert from "node:assert/strict";
import test from "node:test";
import { planBlocks } from "../src/blocks.js";
import { FeishuClient, PublishError, collaboratorFor, documentOrigin } from "../src/feishu.js";

const config = { appId: "cli_example", appSecret: "fake-secret" };
const tenantToken = `eyJhbGciOiJSUzI1NiJ9.${"a".repeat(2048)}.signature`;
const image = {
  placeholder: "https://feishu-publisher.invalid/image/0.png",
  name: "本地图片.png",
  mime: "image/png",
  data: new Uint8Array([1, 2, 3]).buffer,
};
const converted = {
  first_level_block_ids: ["h1", "table", "img"],
  blocks: [
    { block_id: "cell", parent_id: "table", block_type: 32, table_cell: {} },
    { block_id: "img", block_type: 27, image: { token: image.placeholder } },
    { block_id: "h1", block_type: 3, heading1: { elements: [] } },
    { block_id: "table", revision_id: 0, block_type: 31, children: ["cell"],
      table: { property: { row_size: 1, column_size: 1, merge_info: [] } } },
  ],
};
const input = {
  title: "示例",
  markdown: "# Heading\n\n![](https://feishu-publisher.invalid/image/0.png)",
  assets: [image],
  origin: "https://example.feishu.cn",
  collaborator: collaboratorFor("me@example.com"),
};

function success(data) {
  return { status: 200, json: { code: 0, data } };
}

test("validates workspace URLs", () => {
  assert.equal(documentOrigin("example.feishu.cn/docx/abc"), input.origin);
  for (const url of ["", "https://feishu.cn.example.org", "http://feishu.cn", "https://secret@feishu.cn"]) {
    assert.throws(() => documentOrigin(url), /飞书工作区/);
  }
});

test("splits long documents by root and keeps nested blocks together", () => {
  const flat = Array.from({ length: 999 }, (_, index) => ({
    block_id: `p${index}`, block_type: 2, text: {},
  }));
  const { batches } = planBlocks({
    first_level_block_ids: [...flat.map((block) => block.block_id), "table"],
    blocks: [...flat, converted.blocks[0], converted.blocks[3]],
  }, []);
  assert.equal(batches.length, 2);
  assert.equal(batches[0].descendants.length, 999);
  assert.deepEqual(batches[1].children_id, ["table"]);
  const [table, cell, empty] = batches[1].descendants;
  assert.deepEqual([table.block_id, cell.block_id], ["table", "cell"]);
  assert.deepEqual(cell.children, [empty.block_id]);
  assert.equal(empty.block_type, 2);
  assert.equal("merge_info" in batches[1].descendants[0].table.property, false);
  assert.equal("parent_id" in batches[1].descendants[1], false);
});

test("rejects missing images and malformed block trees before creating a document", async () => {
  const paths = [];
  const client = new FeishuClient(async ({ url }) => {
    paths.push(new URL(url).pathname);
    if (paths.length === 1) return { status: 200, json: { code: 0, access_token: "t-test" } };
    return success(converted);
  }, config);
  await assert.rejects(() => client.publish({ ...input, assets: [] }), /图片数/);
  assert.deepEqual(paths, ["/oauth/v3/token", "/open-apis/docx/v1/documents/blocks/convert"]);
  assert.throws(() => planBlocks({
    first_level_block_ids: ["bad"],
    blocks: [{ block_id: "bad", children: ["bad"], block_type: 2 }],
  }, []), /无效的文档块结构/);
});

function simulatedPublish(failAt = null) {
  const requests = [];
  const client = new FeishuClient(async (request) => {
    const url = new URL(request.url);
    requests.push(request);
    if (failAt && url.pathname.endsWith(failAt)) {
      return { status: 403, json: { code: 99991672, msg: "sensitive response" } };
    }
    if (url.pathname === "/oauth/v3/token") {
      return { status: 200, json: { code: 0, access_token: tenantToken } };
    }
    if (url.pathname.endsWith("/convert")) return success(converted);
    if (url.pathname.endsWith("/documents")) return success({ document: { document_id: "doc1" } });
    if (url.pathname.endsWith("/descendant")) {
      return success({ block_id_relations: [{ temporary_block_id: "img", block_id: "img1" }] });
    }
    if (url.pathname.endsWith("/upload_all")) return success({ file_token: "box1" });
    if (url.pathname.endsWith("/blocks/img1") || url.pathname.endsWith("/members")) return success({});
    throw new Error("Unexpected request");
  }, config);
  return { requests, client };
}

test("publishes native blocks, uploads the image and grants management access after success", async () => {
  const { client, requests } = simulatedPublish();
  assert.equal(await client.publish(input), "https://example.feishu.cn/docx/doc1");
  assert.equal(requests.length, 7);
  const [auth, convert, create, insert, upload, patch, share] = requests;
  assert.equal(new URLSearchParams(auth.body).get("client_secret"), config.appSecret);
  assert.equal(auth.headers.Authorization, undefined);
  assert.equal(convert.headers.Authorization, `Bearer ${tenantToken}`);
  assert.deepEqual(JSON.parse(create.body), { title: input.title });
  assert.deepEqual(JSON.parse(insert.body).children_id, ["h1", "table", "img"]);
  assert.deepEqual(JSON.parse(insert.body).descendants.at(-1).image, { token: "" });
  const form = await new Response(upload.body, {
    headers: { "content-type": upload.contentType },
  }).formData();
  assert.equal(form.get("parent_type"), "docx_image");
  assert.equal(form.get("parent_node"), "img1");
  assert.equal(form.get("file_name"), image.name);
  assert.deepEqual(await form.get("file").arrayBuffer(), image.data);
  assert.equal(JSON.parse(patch.body).replace_image.token, "box1");
  assert.deepEqual(JSON.parse(share.body), {
    member_type: "email", member_id: "me@example.com", perm: "full_access",
  });
  assert.deepEqual(collaboratorFor("ou_example"), { member_type: "openid", member_id: "ou_example" });
});

test("keeps an incomplete document private and reports its URL", async () => {
  const { client, requests } = simulatedPublish("/upload_all");
  await assert.rejects(() => client.publish(input), (error) => {
    assert.ok(error instanceof PublishError);
    assert.equal(error.url, "https://example.feishu.cn/docx/doc1");
    assert.match(error.message, /内容可能不完整.*99991672/);
    assert.doesNotMatch(error.message, /sensitive response/);
    return true;
  });
  assert.equal(requests.length, 5);
});

test("distinguishes an authorization failure from an incomplete document", async () => {
  const { client } = simulatedPublish("/members");
  await assert.rejects(() => client.publish(input), (error) => {
    assert.equal(error.url, "https://example.feishu.cn/docx/doc1");
    assert.match(error.message, /内容已写入，账号授权失败/);
    return true;
  });
});

test("rejects a missing or unsafe bearer token without including it in the error", async () => {
  for (const access_token of [undefined, "", "token\nvalue", "token\n"]) {
    const client = new FeishuClient(async () => ({
      status: 200, json: { code: 0, access_token },
    }), config);
    await assert.rejects(() => client.authenticate(), {
      message: "飞书未返回有效的访问凭证。",
    });
  }
});

test("publishes Mermaid source as native text drawing components alongside an image", async () => {
  const diagrams = [
    { placeholder: "https://feishu-publisher.invalid/image/1.png", mermaid: "flowchart TD\n  A[开始] --> B[完成]" },
    { placeholder: "https://feishu-publisher.invalid/image/2.png", mermaid: 'sequenceDiagram\n  A->>B: 说"你好"' },
  ];
  const requests = [];
  const client = new FeishuClient(async (request) => {
    const path = new URL(request.url).pathname;
    requests.push(path);
    if (path.endsWith("/oauth/v3/token")) {
      return { status: 200, json: { code: 0, access_token: tenantToken } };
    }
    if (path.endsWith("/convert")) {
      return success({
        first_level_block_ids: ["h1", "diagram0", "img", "diagram1"],
        blocks: [...converted.blocks.filter(({ block_id }) => ["h1", "img"].includes(block_id)),
          ...diagrams.map(({ placeholder }, index) => ({
            block_id: `diagram${index}`, block_type: 27, image: { token: placeholder },
          }))],
      });
    }
    if (path.endsWith("/documents")) return success({ document: { document_id: "doc1" } });
    if (path.endsWith("/descendant")) {
      const { children_id, descendants } = JSON.parse(request.body);
      assert.deepEqual(children_id, ["h1", "diagram0", "img", "diagram1"]);
      for (const [index, diagram] of diagrams.entries()) {
        const block = descendants[index * 2 + 1];
        assert.equal(block.block_type, 40);
        assert.equal(block.add_ons.component_type_id, "blk_631fefbbae02400430b8f9f4");
        assert.deepEqual(JSON.parse(block.add_ons.record), {
          data: diagram.mermaid, theme: "default", view: "chart",
        });
      }
      return success({ block_id_relations: [{ temporary_block_id: "img", block_id: "img1" }] });
    }
    if (path.endsWith("/upload_all")) return success({ file_token: "box1" });
    if (path.endsWith("/blocks/img1") || path.endsWith("/members")) return success({});
    throw new Error("Unexpected request");
  }, config);
  const assets = [diagrams[0], image, diagrams[1]];
  assert.equal(await client.publish({ ...input, assets }), "https://example.feishu.cn/docx/doc1");
  assert.equal(requests.filter((path) => path.endsWith("/upload_all")).length, 1);
  assert.ok(requests.every((path) => !path.includes("/board/")));
});

test("enables public read-only access on the existing document", async () => {
  const requests = [];
  const client = new FeishuClient(async (request) => {
    requests.push(request);
    if (requests.length === 1) {
      return { status: 200, json: { code: 0, access_token: tenantToken } };
    }
    return success({ permission_public: { external_access: true, link_share_entity: "anyone_readable" } });
  }, config);
  const url = "https://example.feishu.cn/docx/doc1";
  assert.equal(await client.enablePublicReading(url + "?from=copy", input.origin), url);
  assert.equal(requests[1].method, "PATCH");
  assert.equal(requests[1].url, "https://open.feishu.cn/open-apis/drive/v1/permissions/doc1/public?type=docx");
  assert.deepEqual(JSON.parse(requests[1].body), { external_access: true, link_share_entity: "anyone_readable" });
  await assert.rejects(client.enablePublicReading("https://other.feishu.cn/docx/doc1", input.origin), /工作区/);
  assert.equal(requests.length, 2);
});
