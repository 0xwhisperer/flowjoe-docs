"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const vm = require("node:vm");
const {rewriteContent, iconPathsIn} = require("./postprocess-docs.js");
for (const [name, quote, config] of [["legacy", '"', "config.NEXT_PUBLIC"], ["current", "`", "config"]]) {
  test(`${name} export starts no reload connection or session fetch`, async () => {
    const source = `class Manager{constructor(){this._readyState="closed"}open(callback){if(~this._readyState.indexOf(${quote}open${quote}))return this;this.engine=new Engine;return this}}
      let stopped=false,connections=0;stopped||(console.warn(${quote}Connected to Socket.io${quote}),connections++);
      const config={BASE_PATH:"",NEXT_PUBLIC:{BASE_PATH:""}};
      async function user(){return await fetch(\`\${${config}.BASE_PATH}/_mintlify/api/user\`)}
      globalThis.result={manager:new Manager,user,connections};`;
    const hits=[0,0,0];
    const patched=rewriteContent(source,true,hits);
    const context=vm.createContext({console:{warn(){assert.fail("reload initialization ran");}},Engine(){assert.fail("socket engine opened");},fetch(){assert.fail("session request sent");}});
    vm.runInContext(patched,context);
    assert.equal(context.result.manager.open(),context.result.manager);
    assert.equal(context.result.connections,0);
    assert.equal(JSON.stringify(await (await context.result.user()).json()),"{}");
    assert.deepEqual(hits,[1,1,1]);
    assert.ok(!patched.includes("/_mintlify/api/user"));
    assert.ok(patched.includes('||!0||(console.warn("Connected to Socket.io")'));
  });
}
test("CDN and already exported icon references use the same local vendor paths", () => {
  const icon="/lucide/v1.16.0/puzzle.svg";
  const source=`<i style="mask-image:url(https://d3gk2c5xim1je2.cloudfront.net${icon})"></i><i style="mask-image:url(/_mintlify/export-assets/d3gk2c5xim1je2.cloudfront.net${icon})"></i>`;
  assert.deepEqual(iconPathsIn(source),[icon,icon]);
  const patched=rewriteContent(source,false);
  assert.ok(!patched.includes("cloudfront.net"));
  assert.equal((patched.match(/\/vendor-assets\/icons\/lucide/g)||[]).length,2);
});
test("quoted JavaScript icon base URLs remain absolute", () => {
  for(const quote of ['"',"`"]) {
    const patched=rewriteContent(`globalThis.url=new URL(${quote}https://d3gk2c5xim1je2.cloudfront.net${quote}+"/lucide/icon.svg").href`,true);
    const context=vm.createContext({location:{origin:"https://docs.example"},URL});
    vm.runInContext(patched,context);
    assert.equal(context.url,"https://docs.example/vendor-assets/icons/lucide/icon.svg");
  }
});
test("repeated cleanup is byte-identical", () => {
  const source='a||(console.warn(`Connected to Socket.io`),connect());';
  const once=rewriteContent(source,true);
  assert.equal(rewriteContent(once,true),once);
});
test("unrelated requests are preserved", () => {
  const source='const user=await fetch("/my-local-search-index.json");';
  assert.equal(rewriteContent(source,true),source);
});
