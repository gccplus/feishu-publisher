import { Buffer } from "node:buffer";
import { lookup } from "node:dns";
import { get as httpGet } from "node:http";
import { get as httpsGet } from "node:https";
import { BlockList, isIP } from "node:net";
import { URL } from "node:url";

export const maxImageBytes = 20 * 1024 * 1024;
const redirects = new Set([301, 302, 303, 307, 308]);
const reserved = new BlockList();
for (const [address, prefix] of [
  ["0.0.0.0", 8], ["10.0.0.0", 8], ["100.64.0.0", 10], ["127.0.0.0", 8],
  ["169.254.0.0", 16], ["172.16.0.0", 12], ["192.0.0.0", 24], ["192.0.2.0", 24],
  ["192.88.99.0", 24], ["192.168.0.0", 16], ["198.18.0.0", 15],
  ["198.51.100.0", 24], ["203.0.113.0", 24], ["224.0.0.0", 3],
]) {
  reserved.addSubnet(address, prefix, "ipv4");
}
for (const [address, prefix] of [
  ["2001::", 23], ["2001:db8::", 32], ["2002::", 16], ["3fff::", 20],
]) {
  reserved.addSubnet(address, prefix, "ipv6");
}
const globalIPv6 = new BlockList();
globalIPv6.addSubnet("2000::", 3, "ipv6");

class DownloadError extends Error {}

function isPublicAddress(address) {
  switch (isIP(address)) {
    case 4:
      return !reserved.check(address, "ipv4");
    case 6:
      return globalIPv6.check(address, "ipv6") && !reserved.check(address, "ipv6");
    default:
      return false;
  }
}

function publicLookup(host, options, callback) {
  lookup(host, { ...options, all: true }, (error, addresses) => {
    if (error) return callback(error);
    const allowed = addresses.filter(({ address }) => isPublicAddress(address));
    if (!allowed.length) return callback(new DownloadError("图片地址须指向公网。"));
    if (options.all) return callback(null, allowed);
    return callback(null, allowed[0].address, allowed[0].family);
  });
}

function verifyUrl(url) {
  if (!["https:", "http:"].includes(url.protocol) || url.username || url.password) {
    throw new DownloadError("图片链接须使用 HTTP 或 HTTPS，且不能包含登录凭据。");
  }
  const host = url.hostname.replace(/^\[|\]$/g, "");
  if (isIP(host) && !isPublicAddress(host)) throw new DownloadError("图片地址须指向公网。");
}

function requestImage(url, signal) {
  const get = url.protocol === "https:" ? httpsGet : httpGet;
  return new Promise((resolve, reject) => {
    const request = get(url, {
      lookup: publicLookup,
      signal,
      agent: false,
      headers: { Accept: "image/*", "Accept-Encoding": "identity" },
    }, resolve);
    request.once("error", reject);
  });
}

function detectFormat(data) {
  if (data.subarray(0, 8).toString("hex") === "89504e470d0a1a0a") return ["png", "image/png"];
  if (data.subarray(0, 3).toString("hex") === "ffd8ff") return ["jpg", "image/jpeg"];
  if (["GIF87a", "GIF89a"].includes(data.toString("ascii", 0, 6))) return ["gif", "image/gif"];
  if (data.toString("ascii", 0, 4) === "RIFF" && data.toString("ascii", 8, 12) === "WEBP") {
    return ["webp", "image/webp"];
  }
  if (data.length >= 14 && data.toString("ascii", 0, 2) === "BM") return ["bmp", "image/bmp"];
  throw new DownloadError("网址未返回受支持的图片。支持 PNG、JPEG、GIF、WebP 和 BMP。");
}

async function readImage(response) {
  if (Number(response.headers["content-length"]) > maxImageBytes) {
    response.destroy();
    throw new DownloadError("图片超过 20 MB。");
  }

  let size = 0;
  const chunks = [];
  for await (const chunk of response) {
    size += chunk.length;
    if (size > maxImageBytes) throw new DownloadError("图片超过 20 MB。");
    chunks.push(chunk);
  }
  const data = Buffer.concat(chunks, size);
  const [extension, mime] = detectFormat(data);
  return {
    data: data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength),
    name: `web-image.${extension}`,
    mime,
  };
}

export async function downloadRemoteImage(source, request = requestImage) {
  const signal = AbortSignal.timeout(25000);
  try {
    let url = new URL(source);
    for (let hop = 0; hop <= 5; hop++) {
      verifyUrl(url);
      const response = await request(url, signal);
      const { statusCode: status, headers } = response;
      if (status === 200) return await readImage(response);
      response.destroy();

      if (!redirects.has(status) || !headers.location) {
        throw new DownloadError(`图片网站返回 HTTP ${status}。请确认图片链接可以直接访问。`);
      }
      const destination = new URL(headers.location, url);
      if (url.protocol === "https:" && destination.protocol === "http:") {
        throw new DownloadError("图片链接跳转到了未加密的 HTTP 地址。");
      }
      url = destination;
    }
    throw new DownloadError("图片链接跳转次数过多。");
  } catch (error) {
    if (error instanceof DownloadError) throw error;
    throw new DownloadError("下载连接失败或超时。请确认图片链接可以直接访问。", { cause: error });
  }
}
