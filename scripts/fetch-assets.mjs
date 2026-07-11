// Fetches binary assets from the GitHub repo when they are missing.
// Direct-file deploys (e.g. the Vercel MCP connector) upload text sources
// only; this restores the images before `next build`. It is a no-op when
// the assets are already present (local dev, git-based builds).
import { existsSync } from "node:fs";
import { writeFile } from "node:fs/promises";

const RAW_BASE = "https://raw.githubusercontent.com/CodebySadhana/Nex/main/";
const ASSETS = ["public/nex-logo.jpg", "app/icon.jpg"];

for (const path of ASSETS) {
  if (existsSync(path)) {
    console.log(`[fetch-assets] ${path} already present, skipping`);
    continue;
  }
  const res = await fetch(RAW_BASE + path);
  if (!res.ok) {
    throw new Error(`[fetch-assets] failed to fetch ${path}: HTTP ${res.status}`);
  }
  await writeFile(path, Buffer.from(await res.arrayBuffer()));
  console.log(`[fetch-assets] fetched ${path}`);
}
