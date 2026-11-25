import assert from 'node:assert/strict';
import test from 'node:test';
import { publicationPlan, recordPublication } from '../src/publication.js';
import { FeishuClient, PublishError } from '../src/feishu.js';
const origin = 'https://example.feishu.cn';
const url = origin + '/docx/existing';

test('unified link survives version changes, legacy metadata and failed initial publication', () => {
  const props = {};
  let plan = publicationPlan(props, origin);
  assert.equal(plan.action, 'create');
  assert.equal(plan.version, '1.0');
  recordPublication(props, plan, url);
  assert.deepEqual(props, { version: '1.0', feishu_url: url });
  props.version = '1.1';
  props.feishu_published_version = '1.0';
  plan = publicationPlan(props, origin);
  assert.equal(plan.action, 'update');
  assert.equal(plan.url, url);
  recordPublication(props, plan, url);
  assert.equal(props.feishu_published_version, undefined);
  assert.equal(publicationPlan(props, origin, true).action, 'create');
  const pending = { version: '1.0' };
  recordPublication(pending, publicationPlan(pending, origin), url, false);
  pending.version = '1.1';
  assert.equal(publicationPlan(pending, origin).url, url);
  assert.equal(publicationPlan({ ...props, feishu_pending_url: origin + '/docx/old-fork' }, origin).url, url);
});

test('rejects invalid versions and foreign linked documents without choosing an accidental update', () => {
  for (const version of [false, {}, [], new Date()]) assert.throws(() => publicationPlan({ version }, origin), /version/);
  for (const link of ['https://other.feishu.cn/docx/abc', 'https://example.feishu.cn.evil.com/docx/x', 'https://u:p@example.feishu.cn/docx/x', 'https://example.feishu.cn/wiki/x']) {
    assert.throws(() => publicationPlan({ feishu_url: link }, origin), /feishu_url/);
  }
  assert.equal(publicationPlan({ version: 1.1, feishu_published_version: '1.1', feishu_url: url }, origin).action, 'update');
});

test('publication recording preserves a version changed while publishing and refuses a changed link', () => {
  const props = { version: '1.0' };
  const plan = publicationPlan(props, origin);
  props.version = '2.0';
  recordPublication(props, plan, url);
  assert.equal(props.version, '2.0');
  assert.equal(props.feishu_published_version, undefined);
  assert.equal(publicationPlan(props, origin).action, 'update');
  assert.throws(() => recordPublication({ feishu_url: 'other' }, plan, url), /被修改/);
});

const image = { placeholder: 'https://feishu-publisher.invalid/image/0.png', name: 'image.png', mime: 'image/png', data: new Uint8Array([1, 2]).buffer };
function updater({ failUpload = false, concurrent = false, failDelete = false, failRead = false } = {}) {
  const requests = [];
  let roots = ['old1', 'old2'];
  let revision = 10;
  const client = new FeishuClient(async (request) => {
    requests.push(request);
    const parsed = new URL(request.url);
    const path = parsed.pathname;
    const ok = (data) => ({ status: 200, json: { code: 0, data } });
    if (path.endsWith('/token')) return { status: 200, json: { code: 0, access_token: 'test-token' } };
    if (path.endsWith('/convert')) return ok({ first_level_block_ids: ['text', 'image'], blocks: [
      { block_id: 'text', block_type: 2, text: {} }, { block_id: 'image', block_type: 27, image: { token: image.placeholder } },
    ] });
    if (request.method === 'GET' && path.endsWith('/documents/existing')) {
      if (failRead) return { status: 403, json: { code: 99991672 } };
      if (concurrent && roots.length > 2) { roots.push('other-user-content'); revision++; }
      return ok({ document: { revision_id: revision, title: '标题' } });
    }
    if (request.method === 'GET' && path.endsWith('/blocks/existing')) {
      return ok({ block: { children: [...roots] } });
    }
    if (path.endsWith('/descendant')) {
      assert.equal(parsed.searchParams.get('document_revision_id'), String(revision));
      roots.push('newtext', 'newimage'); revision++;
      return ok({ document_revision_id: revision, block_id_relations: [
        { temporary_block_id: 'text', block_id: 'newtext' }, { temporary_block_id: 'image', block_id: 'newimage' },
      ] });
    }
    if (path.endsWith('/upload_all')) {
      if (failUpload) return { status: 413, json: { code: 1770008 } };
      return ok({ file_token: 'token' });
    }
    if (path.endsWith('/blocks/newimage') && request.method === 'PATCH') {
      assert.equal(parsed.searchParams.get('document_revision_id'), String(revision));
      return ok({ document_revision_id: ++revision });
    }
    if (path.endsWith('/batch_delete')) {
      assert.equal(parsed.searchParams.get('document_revision_id'), String(revision));
      assert.deepEqual(JSON.parse(request.body), { start_index: 0, end_index: 2 });
      if (failDelete) throw new Error('connection lost');
      roots.splice(0, 2);
      return ok({ document_revision_id: ++revision });
    }
    if (path.endsWith('/members')) {
      assert.equal(JSON.parse(request.body).perm, 'full_access'); return ok({});
    }
    throw new Error('Unexpected request ' + request.method + ' ' + path);
  }, { appId: 'cli_test', appSecret: 'secret' });
  client.waitForEdit = async () => {};
  return { client, requests, roots: () => roots };
}
const updateInput = { url, title: '标题', markdown: 'new', assets: [image], origin, collaborator: { member_type: 'email', member_id: 'me@example.com' } };

test('same document update uploads new image before removing old roots; no new document or sharing scope change', async () => {
  const mock = updater();
  assert.equal(await mock.client.update(updateInput), url);
  assert.deepEqual(mock.roots(), ['newtext', 'newimage']);
  const paths = mock.requests.map((r) => new URL(r.url).pathname);
  assert.ok(paths.findIndex((p) => p.endsWith('/batch_delete')) > paths.findIndex((p) => p.endsWith('/upload_all')));
  assert.ok(!mock.requests.some((r) => r.method === 'POST' && r.url.endsWith('/documents')));
  assert.ok(!paths.some((p) => p.endsWith('/public')));
});

test('read/image/concurrent-edit failures never delete old content or create a replacement document', async () => {
  for (const options of [{ failRead: true }, { failUpload: true }, { concurrent: true }]) {
    const mock = updater(options);
    await assert.rejects(() => mock.client.update(updateInput));
    assert.ok(mock.roots().includes('old1'));
    assert.ok(!mock.requests.some((r) => r.method === 'DELETE'));
    assert.ok(!mock.requests.some((r) => r.url.endsWith('/documents')));
  }
});

test('uncertain deletion returns existing link and never retries the destructive request', async () => {
  const mock = updater({ failDelete: true });
  await assert.rejects(() => mock.client.update(updateInput), (error) => error instanceof PublishError && error.url === url);
  assert.equal(mock.requests.filter((r) => r.method === 'DELETE').length, 1);
});

function versionClient({ pages, delayed = false, creationError, pendingOnly = false } = {}) {
  const requests = [];
  let reads = 0;
  let created = false;
  const client = new FeishuClient(async (request) => {
    requests.push(request);
    const address = new URL(request.url);
    if (address.pathname.endsWith('/token')) return { status: 200, json: { code: 0, access_token: 'test-token' } };
    assert.equal(address.pathname, '/open-apis/drive/v1/files/existing/versions');
    const ok = (data) => ({ status: 200, json: { code: 0, data } });
    if (request.method === 'GET') {
      reads++;
      assert.equal(address.searchParams.get('obj_type'), 'docx');
      if (pages) return ok(pages[address.searchParams.get('page_token') ? 1 : 0]);
      const available = created && !pendingOnly && (!delayed || reads > 2);
      return ok({ items: available ? [{ name: '1.1', version: 'native-id', parent_token: 'existing', status: 0 }] : [], has_more: false });
    }
    assert.equal(request.method, 'POST');
    assert.deepEqual(JSON.parse(request.body), { name: '1.1', obj_type: 'docx' });
    if (creationError) return { status: creationError, json: { code: 99991672 } };
    created = true;
    return ok({ name: '1.1', version: 'native-id', parent_token: 'existing', status: 0 });
  }, { appId: 'cli_test', appSecret: 'secret' });
  client.versionDelay = async () => {};
  return { client, requests };
}

test('named version creation uses native API and confirms asynchronous save without changing main link', async () => {
  const { client, requests } = versionClient({ delayed: true });
  const saved = await client.ensureNamedVersion(url, origin, '1.1');
  assert.equal(saved.created, true);
  assert.equal(saved.version, 'native-id');
  assert.equal(requests.filter((r) => r.method === 'POST' && r.url.includes('/versions')).length, 1);
  assert.equal(requests.filter((r) => r.method === 'GET').length, 3);
});

test('same named version on later list page is reused, not overwritten or duplicated', async () => {
  const { client, requests } = versionClient({ pages: [
    { items: [{ name: '1.0', version: 'v0', status: '0' }], has_more: true, page_token: 'next' },
    { items: [{ name: '1.1', version: 'v1', status: '0' }], has_more: false },
  ] });
  assert.deepEqual(await client.ensureNamedVersion(url, origin, '1.1'), { created: false, version: 'v1' });
  assert.equal(requests.filter((r) => r.url.includes('/versions') && r.method === 'POST').length, 0);
});

test('unconfirmed native snapshot is recorded and retries query the returned ID without another write', async () => {
  const mock = versionClient({ pendingOnly: true });
  let snapshot;
  await assert.rejects(() => mock.client.ensureNamedVersion(url, origin, '1.1'), (error) => {
    snapshot = error.snapshot;
    return error.url === url && snapshot.id === 'native-id';
  });
  await assert.rejects(() => mock.client.ensureNamedVersion(url, origin, '1.1', snapshot));
  assert.equal(mock.requests.filter((r) => r.url.includes('/versions') && r.method === 'POST').length, 1);
});

test('definite API rejection is retryable; uncertain submission prevents an automatic duplicate', async () => {
  const denied = versionClient({ creationError: 403 });
  await assert.rejects(() => denied.client.ensureNamedVersion(url, origin, '1.1'), (error) => error.url === url && !error.snapshot);
  const uncertain = versionClient({ creationError: 503 });
  let snapshot;
  await assert.rejects(() => uncertain.client.ensureNamedVersion(url, origin, '1.1'), (error) => {
    snapshot = error.snapshot; return snapshot?.id === '';
  });
  await assert.rejects(() => uncertain.client.ensureNamedVersion(url, origin, '1.1', snapshot), /结果不明/);
  assert.equal(uncertain.requests.filter((r) => r.url.includes('/versions') && r.method === 'POST').length, 1);
});

test('rejects version names above native API limit', () => {
  assert.throws(() => publicationPlan({ version: 'a'.repeat(1025) }, origin), /1024/);
});
