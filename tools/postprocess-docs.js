#!/usr/bin/env node
// Post-processes a fresh `npm run docs:export` (docs-site/) copied into this repo so the
// published site is fully self-contained. No dependencies. Needs network ONLY to download
// third-party assets that are not yet in vendor-assets/ (they are cached there afterwards).
//
// What it does (idempotent):
//  1. Vendors every Lucide/Font Awesome icon and the KaTeX stylesheet+fonts the pages load from
//     Mintlify's CDNs into /vendor-assets/ and rewrites references to the local copies.
//  2. Hides the search UI (search needs Mintlify's servers and cannot work in a static export)
//     and blocks the Cmd/Ctrl+K and "/" shortcuts, via an injected <style>/<script> in each page.
//  3. Injects a tiny pre-paint script (tools/theme-snippet.js) that sets the manual's light/dark mode:
//     ?theme= in the address, then the saved toggle choice, then the browser's preference, then DARK.
//  4. Neutralizes Mintlify-only background requests (/_mintlify/api/user and the socket.io
//     live-reload connection) with minimal patches to the bundled JS.
// Usage: node tools/postprocess-docs.js   (run from the repo root, after copying docs-site/ in)
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const VENDOR = "vendor-assets";
const ICON_HOST = "https://d3gk2c5xim1je2.cloudfront.net";
const KATEX_URL = "https://d4tuoctqmanu0.cloudfront.net/katex.min.css";
const KATEX_VER = "0.16.47"; // font files: Mintlify's CDN does not serve them, so they come from the katex npm package
const MARK = "fj-postprocess";
const {THEME_SCRIPT, THEME_ID} = require("./theme-snippet.js");
const THEME_TAG = `<script id="${THEME_ID}">${THEME_SCRIPT}</script>`;
const THEME_RE = new RegExp(`<script id="${THEME_ID}">.*?</script>`, "gs");

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, {withFileTypes: true})) {
    if (e.name === ".git" || e.name === "tools" || e.name === VENDOR || e.name === "node_modules") continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(html|js|css)$/.test(e.name)) out.push(p);
  }
  return out;
}

async function download(url, dest) {
  if (fs.existsSync(dest) && fs.statSync(dest).size > 0) return false;
  const r = await fetch(url);
  fs.mkdirSync(path.dirname(dest), {recursive: true});
  if (!r.ok) {
    // The upstream CDN does not have this icon (it is already invisible on the live Mintlify site).
    // Write an empty SVG so the page does not log a 404, and say so.
    if (!dest.endsWith(".svg")) throw new Error(`${r.status} ${url}`);
    console.warn(`WARNING: ${r.status} for ${url}; wrote an empty placeholder icon`);
    fs.writeFileSync(dest, '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"></svg>');
    return true;
  }
  fs.writeFileSync(dest, Buffer.from(await r.arrayBuffer()));
  return true;
}

const INJECT = `<style id="${MARK}">#search-bar-entry,#search-bar-entry-mobile{display:none!important}div[role="status"].fixed.cursor-grab{display:none!important}</style><script id="${MARK}-js">addEventListener("keydown",function(e){var t=e.target,typing=t&&(t.isContentEditable||/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));if(((e.metaKey||e.ctrlKey)&&(e.key==="k"||e.key==="K"))||(e.key==="/"&&!typing)){e.stopImmediatePropagation();e.preventDefault()}},true)</script>`;

// [file test on content, from, to] minimal JS patches. Each must match at least once overall.
const PATCHES = [
  {name: "socket.io manager never opens", re: /open\((\w)\)\{if\(~this\._readyState\.indexOf\("open"\)\)return this;this\.engine=new /g, to: "open($1){return this;this.engine=new "},
  {name: "live-reload socket never started", re: /a\|\|\(console\.warn\("Connected to Socket\.io"\),/g, to: 'a||!0||(console.warn("Connected to Socket.io"),'},
  {name: "user-session fetch stubbed", re: /await fetch\(`\$\{(\w+)\.NEXT_PUBLIC\.BASE_PATH\}\/_mintlify\/api\/user`\)/g, to: "await Promise.resolve({json:async()=>({})})"},
];

(async () => {
  const files = walk(ROOT);
  const iconPaths = new Set();
  let katexUsed = false;
  for (const f of files) {
    const s = fs.readFileSync(f, "utf8");
    for (const m of s.matchAll(/https:\/\/d3gk2c5xim1je2\.cloudfront\.net(\/[A-Za-z0-9._\/-]+\.svg)/g)) iconPaths.add(m[1]);
    if (s.includes(KATEX_URL)) katexUsed = true;
  }
  // Icons: mirror CDN paths under /vendor-assets/icons. Lucide (ISC) comes from Mintlify's CDN copy.
  // Mintlify's Font Awesome files are the PRO (commercial-licence) set and must not be redistributed,
  // so the same-named icons are taken from the FREE set (CC BY 4.0) on jsDelivr instead.
  let dl = 0;
  const iconSrc = p => { const m = p.match(/^\/fontawesome\/v([\d.]+)\/solid\/(.+)$/); return m ? `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@${m[1]}/svgs/solid/${m[2]}` : ICON_HOST + p; };
  for (const p of iconPaths) if (await download(iconSrc(p), path.join(ROOT, VENDOR, "icons", p))) dl++;
  // Licences (text kept next to the vendored files; see THIRD_PARTY_NOTICES.md)
  await download("https://cdn.jsdelivr.net/npm/lucide-static@latest/LICENSE", path.join(ROOT, VENDOR, "licenses", "lucide-LICENSE.txt"));
  await download("https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@7.2.0/LICENSE.txt", path.join(ROOT, VENDOR, "licenses", "fontawesome-free-LICENSE.txt"));
  await download("https://cdn.jsdelivr.net/npm/katex@" + KATEX_VER + "/LICENSE", path.join(ROOT, VENDOR, "licenses", "katex-LICENSE.txt"));
  // KaTeX stylesheet + the fonts it references
  const katexDir = path.join(ROOT, VENDOR, "katex");
  if (katexUsed || fs.existsSync(path.join(katexDir, "katex.min.css"))) {
    await download(KATEX_URL, path.join(katexDir, "katex.min.css"));
    const css = fs.readFileSync(path.join(katexDir, "katex.min.css"), "utf8");
    const rel = new Set([...css.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)].map(m => m[1]));
    for (const u of rel) {
      if (/^https?:|^\/\//.test(u)) throw new Error("katex css references external URL " + u);
      if (!u.startsWith("data:")) dl += (await download("https://cdn.jsdelivr.net/npm/katex@" + KATEX_VER + "/dist/" + u, path.join(katexDir, u))) ? 1 : 0;
    }
  }
  const patchHits = PATCHES.map(() => 0);
  let rewritten = 0, injected = 0;
  for (const f of files) {
    let s = fs.readFileSync(f, "utf8"), o = s;
    // In JS the host is a string constant that is later fed to new URL(...), so it must be absolute.
    if (f.endsWith(".js")) s = s.split('"' + ICON_HOST + '"').join('(location.origin+"/' + VENDOR + '/icons")');
    s = s.split(ICON_HOST).join("/" + VENDOR + "/icons");
    s = s.split(KATEX_URL).join("/" + VENDOR + "/katex/katex.min.css");
    if (f.endsWith(".js")) PATCHES.forEach((p, i) => { s = s.replace(p.re, (m, c1) => (patchHits[i]++, p.to.replace("$1", c1))); });
    if (f.endsWith(".html") && s.includes("</head>")) {
      s = s.replace(new RegExp(`<style id="${MARK}">.*?</style><script id="${MARK}-js">.*?</script>`, "s"), ""); s = s.replace("</head>", INJECT + "</head>");
      // Theme bootstrap goes FIRST in <head> (before any stylesheet, so no flash). Re-runs replace it, never stack it.
      s = s.replace(THEME_RE, "").replace(/<head(\s[^>]*)?>/, m => m + THEME_TAG); injected++; }
    if (s !== o) { fs.writeFileSync(f, s); rewritten++; }
  }
  // /llms.txt: every page carries a hidden link to it, but the export does not include one.
  const SITE = "https://docs.flowjoe.app";
  const lines = ["# FlowJoe Docs", "", "> User documentation for FlowJoe, a local-first visual workspace.", "", "## Pages", ""];
  for (const f of files.filter(f => f.endsWith("index.html") && path.dirname(f) !== ROOT).sort()) {
    const h = fs.readFileSync(f, "utf8");
    const t = (h.match(/<title>([^<]*)<\/title>/) || [])[1] || "";
    const d = (h.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "";
    lines.push(`- [${t.replace(/ - FlowJoe$/, "")}](${SITE}/${path.relative(ROOT, path.dirname(f)).split(path.sep).join("/")})${d ? ": " + d : ""}`);
  }
  fs.writeFileSync(path.join(ROOT, "llms.txt"), lines.join("\n") + "\n");
  PATCHES.forEach((p, i) => { if (!patchHits[i]) console.warn(`WARNING: patch "${p.name}" matched nothing (already applied, or Mintlify changed its bundle)`); });
  console.log(`icons found: ${iconPaths.size}, downloaded now: ${dl}, files rewritten: ${rewritten}, html injected: ${injected}, js patch hits: ${patchHits.join("/")}`);
})().catch(e => { console.error(e); process.exit(1); });
