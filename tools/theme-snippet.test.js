"use strict";
// Run: node --test tools/theme-snippet.test.js   (no browser: the shipped script runs against a small DOM stub)
const test = require("node:test");
const assert = require("node:assert/strict");
const vm = require("node:vm");
const {THEME_SCRIPT} = require("./theme-snippet.js");

// opts: search, saved (value or undefined), os ("dark"|"light"|"none"|"nomedia"), lsThrows, lsSetThrows, mmThrows
function run(opts = {}) {
  const store = new Map();
  if (opts.saved !== undefined) store.set("isDarkMode", opts.saved);
  const cls = new Set(opts.startClasses || ["dark"]);
  const win = {
    location: {search: opts.search || ""},
    document: {documentElement: {classList: {add: (c) => cls.add(c), remove: (...c) => c.forEach((x) => cls.delete(x))}}}
  };
  if (!opts.lsThrows) win.localStorage = {getItem: (k) => (store.has(k) ? store.get(k) : null), setItem: (k, v) => { if (opts.lsSetThrows) throw new Error("quota"); store.set(k, String(v)); }};
  else Object.defineProperty(win, "localStorage", {get() { throw new Error("denied"); }});
  if (opts.os !== "nomedia") win.matchMedia = (q) => { if (opts.mmThrows) throw new Error("mm"); return {matches: opts.os === "dark" ? q.includes("dark") : opts.os === "light" ? q.includes("light") : false}; };
  win.window = win;
  const ctx = vm.createContext({...win, window: win, document: win.document, location: win.location});
  ctx.window = win;
  vm.runInContext(THEME_SCRIPT, ctx);
  return {cls: [...cls].filter((c) => c === "dark" || c === "light"), store};
}

test("(a) ?theme beats a saved choice and the browser, and is remembered in the toggle's own key", () => {
  let r = run({search: "?theme=light", saved: "dark", os: "dark"});
  assert.deepEqual(r.cls, ["light"]);
  assert.equal(r.store.get("isDarkMode"), "light");
  r = run({search: "?x=1&theme=dark", saved: "light", os: "light"});
  assert.deepEqual(r.cls, ["dark"]);
  assert.equal(r.store.get("isDarkMode"), "dark");
});

test("a bad ?theme value is ignored and falls through", () => {
  assert.deepEqual(run({search: "?theme=purple", saved: "light"}).cls, ["light"]);
  assert.deepEqual(run({search: "?mytheme=light", os: "none"}).cls, ["dark"]);
});

test("(b) the saved toggle choice beats the browser (including the old true/false values)", () => {
  assert.deepEqual(run({saved: "light", os: "dark"}).cls, ["light"]);
  assert.deepEqual(run({saved: "dark", os: "light"}).cls, ["dark"]);
  assert.deepEqual(run({saved: "false", os: "dark"}).cls, ["light"]);
  assert.deepEqual(run({saved: "true", os: "light"}).cls, ["dark"]);
});

test("a saved 'system' (or junk) means follow the browser", () => {
  assert.deepEqual(run({saved: "system", os: "light"}).cls, ["light"]);
  assert.deepEqual(run({saved: "junk", os: "dark"}).cls, ["dark"]);
});

test("(c) the browser's preference decides when nothing is saved, and is not stored", () => {
  let r = run({os: "light", startClasses: ["dark"]});
  assert.deepEqual(r.cls, ["light"]);
  assert.equal(r.store.has("isDarkMode"), false);
  assert.deepEqual(run({os: "dark", startClasses: ["light"]}).cls, ["dark"]);
});

test("(d) with no signal at all the default is DARK (and is remembered so the toggle code agrees)", () => {
  for (const os of ["none", "nomedia"]) {
    const r = run({os, startClasses: ["light"]});
    assert.deepEqual(r.cls, ["dark"], os);
    assert.equal(r.store.get("isDarkMode"), "dark");
  }
});

test("exactly one of light/dark is left on the page", () => {
  assert.deepEqual(run({search: "?theme=light", startClasses: ["dark", "light", "dark"]}).cls, ["light"]);
});

test("it never throws: blocked storage, failing storage writes, failing matchMedia", () => {
  assert.deepEqual(run({lsThrows: true, os: "light"}).cls, ["light"]);
  assert.deepEqual(run({lsThrows: true, search: "?theme=light"}).cls, ["light"]);
  assert.deepEqual(run({lsSetThrows: true, search: "?theme=light"}).cls, ["light"]);
  assert.deepEqual(run({lsThrows: true, mmThrows: true}).cls, ["dark"]);
});

test("the script is self-contained: no network, no timers, no async", () => {
  for (const bad of ["fetch", "XMLHttpRequest", "http://", "https://", "import(", "setTimeout", "await", "async", "document.write", "src="]) assert.equal(THEME_SCRIPT.includes(bad), false, bad);
  assert.equal(THEME_SCRIPT.includes("</script"), false);
});
