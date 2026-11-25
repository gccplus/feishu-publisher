import { build } from "esbuild";
import { readFile } from "node:fs/promises";
const notices = await readFile(new URL("THIRD_PARTY_NOTICES.md", import.meta.url), "utf8");
await build({ entryPoints: [new URL("src/main.js", import.meta.url).pathname], outfile: new URL("main.js", import.meta.url).pathname,
  bundle: true, format: "cjs", platform: "browser", target: "es2022", external: ["obsidian", "node:*"], minify: true,
  footer: { js: "/*\n" + notices.replaceAll("*/", "* /") + "\n*/" } });
