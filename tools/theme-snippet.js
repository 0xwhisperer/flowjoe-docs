// The inline script postprocess-docs.js puts at the very top of every page's <head>, so the manual's light/dark mode is
// settled BEFORE first paint. Kept in its own file so tests/theme-snippet.test.js can run exactly the text that ships.
//
// The manual's own toggle (Mintlify's next-themes) stores its choice in localStorage "isDarkMode" as dark|light|system
// (older builds: true|false). This script uses the same key, so the toggle keeps working and pages stay consistent.
// Order: (a) ?theme=dark|light in the address (remembered in that key), (b) the saved dark|light choice (a saved "system"
// means "follow the browser"), (c) the browser's prefers-color-scheme, (d) DARK. Nothing here can throw (every step is
// guarded), nothing is awaited, and there is no network access.
"use strict";

const THEME_SCRIPT = `(function(){try{var K="isDarkMode",d=document.documentElement,t=null,ls=null;function n(v){v=v==null?"":String(v).toLowerCase();return v==="true"||v==="dark"?"dark":v==="false"||v==="light"?"light":null}try{ls=window.localStorage}catch(e){}try{var m=/[?&]theme=(dark|light)(?:&|#|$)/.exec(window.location.search);if(m){t=m[1];try{ls&&ls.setItem(K,t)}catch(e){}}}catch(e){}if(!t){try{t=n(ls&&ls.getItem(K))}catch(e){}}if(!t){try{var q=window.matchMedia;if(q){if(q("(prefers-color-scheme: dark)").matches)t="dark";else if(q("(prefers-color-scheme: light)").matches)t="light"}}catch(e){}}if(!t){t="dark";try{if(ls&&ls.getItem(K)===null)ls.setItem(K,t)}catch(e){}}d.classList.remove("light","dark");d.classList.add(t)}catch(e){}})();`;

module.exports = {THEME_SCRIPT, THEME_ID: "fj-postprocess-theme"};
