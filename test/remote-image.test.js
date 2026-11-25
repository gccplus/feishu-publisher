import assert from "node:assert/strict";
import { Readable } from "node:stream";
import test from "node:test";
import { downloadRemoteImage, maxImageBytes } from "../src/remote-image.js";

const png = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGNgAAAAAgABSK+kcQAAAABJRU5ErkJggg==",
  "base64",
);

function response(statusCode, headers, chunks = []) {
  return Object.assign(Readable.from(chunks), { statusCode, headers });
}

test("follows a public redirect and detects the image from bytes with no file extension", async () => {
  const requests = [];
  const result = await downloadRemoteImage("https://example.com/redirect", async (url) => {
    requests.push(url.href);
    return requests.length === 1
      ? response(302, { location: "https://cdn.example.com/resource?token=sample" })
      : response(200, { "content-type": "application/octet-stream" }, [png.subarray(0, 3), png.subarray(3)]);
  });
  assert.deepEqual(requests, [
    "https://example.com/redirect", "https://cdn.example.com/resource?token=sample",
  ]);
  assert.equal(result.name, "web-image.png");
  assert.equal(result.mime, "image/png");
  assert.deepEqual(Buffer.from(result.data), png);
});

test("rejects private addresses, embedded credentials and redirects into local services", async () => {
  for (const url of [
    "http://127.1/test", "https://10.0.0.7/test", "http://[::ffff:192.168.0.1]/test",
    "http://[fc00::1]/test", "https://user:password@example.com/test",
  ]) {
    const never = () => assert.fail("The image host should not be contacted");
    await assert.rejects(() => downloadRemoteImage(url, never), /公网|登录凭据/);
  }
  let count = 0;
  await assert.rejects(() => downloadRemoteImage("https://example.com/redirect", async () => {
    count++;
    return response(302, { location: "https://127.0.0.1/test" });
  }), /公网/);
  assert.equal(count, 1);
});

test("rejects HTTP errors and pages that only look like images by their URL or headers", async () => {
  const url = "https://example.com/image.png";
  await assert.rejects(() => downloadRemoteImage(url, async () => response(403, {})), /HTTP 403/);
  await assert.rejects(() => downloadRemoteImage(url, async () =>
    response(200, { "content-type": "image/png" }, [Buffer.from("<html>Sign in</html>")]),
  ), /未返回受支持的图片/);
});

test("enforces the image limit with and without a content-length header", async () => {
  const url = "https://example.com/image.png";
  await assert.rejects(() => downloadRemoteImage(url, async () =>
    response(200, { "content-length": String(maxImageBytes + 1) }),
  ), /超过 20 MB/);
  const chunk = Buffer.alloc(1024 * 1024);
  await assert.rejects(() => downloadRemoteImage(url, async () =>
    response(200, {}, Array(21).fill(chunk)),
  ), /超过 20 MB/);
});
