const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const properties = {};
const documents = new Map();
const versions = new Map();
let creates = 0, deletes = 0;
const results = [];
class Base {}
class Modal { open() { results.push(this.result); } }
class Notice { hide() {} }
const obsidian = {
  Plugin: Base, PluginSettingTab: Base, Modal, Notice,
  parseYaml: JSON.parse,
  getFrontMatterInfo(source) {
    const end = source.indexOf('\n---\n', 4);
    return { exists: true, frontmatter: source.slice(4, end), contentStart: end + 5 };
  },
  requestUrl: async ({ url, method, body }) => {
    const path = new URL(url).pathname;
    const ok = (data) => ({ status: 200, json: { code: 0, data } });
    if (path.endsWith('/oauth/v3/token')) return { status: 200, json: { code: 0, access_token: 'test-token' } };
    if (path.endsWith('/convert')) return ok({ first_level_block_ids: ['p1'], blocks: [{ block_id: 'p1', block_type: 2, text: {} }] });
    if (path.endsWith('/documents') && method === 'POST') {
      const id = 'doc' + ++creates;
      documents.set(id, { revision: 1, roots: [] });
      return ok({ document: { document_id: id } });
    }
    const versionDoc = /\/files\/(doc\d+)\/versions$/.exec(path)?.[1];
    if (versionDoc) {
      const list = versions.get(versionDoc) ?? [];
      if (method === 'GET') return ok({ items: list, has_more: false });
      const name = JSON.parse(body).name;
      const saved = { name, version: 'native' + (list.length + 1), parent_token: versionDoc, status: 0 };
      list.push(saved); versions.set(versionDoc, list); return ok(saved);
    }
    const id = /\/documents\/(doc\d+)/.exec(path)?.[1];
    const doc = documents.get(id);
    if (method === 'GET' && path.endsWith('/documents/' + id)) return ok({ document: { revision_id: doc.revision, title: 'Note' } });
    if (method === 'GET' && path.endsWith('/blocks/' + id)) return ok({ block: { children: [...doc.roots] } });
    if (path.endsWith('/descendant')) {
      const root = 'block' + ++doc.revision;
      doc.roots.push(root);
      return ok({ document_revision_id: doc.revision, block_id_relations: [{ temporary_block_id: 'p1', block_id: root }] });
    }
    if (method === 'DELETE') {
      const range = JSON.parse(body); doc.roots.splice(range.start_index, range.end_index - range.start_index); deletes++; doc.revision++;
      return ok({ document_revision_id: doc.revision });
    }
    if (path.includes('/permissions/')) {
      assert.equal(JSON.parse(body).perm, 'full_access'); return ok({});
    }
    assert.fail(path);
  },
};
const context = { module: { exports: {} }, exports: {}, require: (name) => name === 'obsidian' ? obsidian : require(name),
  document: { createElement: () => ({}) }, structuredClone, crypto: require('node:crypto').webcrypto,
  URL, URLSearchParams, TextEncoder, TextDecoder, setTimeout, clearTimeout, console, Buffer, Blob, FormData, Response };
vm.runInNewContext(fs.readFileSync(__dirname + '/../main.js', 'utf8'), context);
(async () => {
  const plugin = new context.module.exports.default();
  const file = { basename: 'Note', path: 'Note.md' };
  plugin.app = { secretStorage: { getSecret: () => 'secret' }, workspace: { getActiveViewOfType: () => null },
    vault: { read: async () => '---\n' + JSON.stringify(properties) + '\n---\nHello' },
    fileManager: { processFrontMatter: async (_, callback) => callback(properties) } };
  plugin.settings = { appId: 'cli_test', secretName: 'test-secret', workspace: 'example.feishu.cn', collaborator: 'me@example.com' };
  const connection = plugin.connection.bind(plugin);
  plugin.connection = () => { const config = connection(); config.client.waitForEdit = async () => {}; return config; };
  await plugin.publish(file);
  assert.equal(properties.version, '1.0');
  assert.equal(properties.feishu_published_version, undefined);
  const first = properties.feishu_url;
  await plugin.publish(file);
  assert.equal(properties.feishu_url, first);
  assert.equal(creates, 1);
  assert.equal(deletes, 1);
  properties.version = '1.1';
  await plugin.publish(file);
  assert.equal(creates, 1);
  assert.equal(properties.feishu_url, first);
  assert.equal(properties.feishu_published_version, undefined);
  assert.deepEqual(versions.get('doc1').map((item) => item.name), ['1.0', '1.1']);
  assert.ok(documents.has('doc1'));
  assert.equal(results.length, 3);
  assert.ok(results.every((r) => r.title === '已发布到飞书'));
  console.log('安装包完整流程通过：首次创建 → 同版本更新 → 改版本仍更新原链接，保存 1.0/1.1 原生命名版本。');
})().catch((error) => { console.error(error); process.exitCode = 1; });
