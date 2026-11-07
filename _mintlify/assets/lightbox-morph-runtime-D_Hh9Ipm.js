import{s as e}from"./rolldown-runtime-Bjp52BOI.js";import{jr as t}from"./initial-vendor-ByCBD7lK.js";import{C as n,S as r,T as i,_ as a,b as o,c as s,d as c,f as l,g as u,h as d,i as f,l as p,m,n as h,o as g,p as _,r as v,s as y,t as b,v as x,w as S,x as C,y as w}from"./zoom-image-lightbox-DT9TBYCb.js";var T=e(t(),1),E=0,D=!1,O=!1;function k(){O=!0}function A(e){e.cancelable&&e.preventDefault()}function j(e){e.touches.length>0||(O=!1,E===0&&N())}function M(){D||(D=!0,O=!1,document.addEventListener(`touchstart`,k,{capture:!0,passive:!0}),document.addEventListener(`touchmove`,A,{capture:!0,passive:!1}),document.addEventListener(`touchend`,j,{capture:!0,passive:!0}),document.addEventListener(`touchcancel`,j,{capture:!0,passive:!0}))}function N(){D&&(D=!1,document.removeEventListener(`touchstart`,k,{capture:!0}),document.removeEventListener(`touchmove`,A,{capture:!0}),document.removeEventListener(`touchend`,j,{capture:!0}),document.removeEventListener(`touchcancel`,j,{capture:!0}))}function P(){if(typeof document>`u`)return()=>{};E+=1,M();let e=!1;return()=>{e||(e=!0,--E,E===0&&!O&&N())}}var F=e=>Number(e.toFixed(4)),I=(e,t,n)=>e+(t-e)*n;function L(e){let[t=0,n=t,r=t,i=n]=e.trim().split(/\s+/).map(e=>Number.parseFloat(e)).filter(e=>Number.isFinite(e)&&e>=0);return[t,n,r,i]}function R(e,t){return t>0?e/t:0}function ee(e,t,n,r){let{w0:i,h0:a,w:o,h:s,w1:c,h1:l}=r,u=Math.min(i,a),d=Math.min(c,l),f=Math.min(o,s),p=o>0?o:1,m=s>0?s:1,h=e.map((e,r)=>I(R(e,u),R(t[r],d),n)*f),g=h.map(e=>F(e*c/p)),_=h.map(e=>F(e*l/m));return`${g.map(e=>`${e}px`).join(` `)} / ${_.map(e=>`${e}px`).join(` `)}`}var z=Symbol.for(`ramka.vt.adoptedMarkers`);function B(e){return e[z]??(e[z]=new Set)}function V(e,t,n=!1){if(typeof document<`u`){if(f()){let n=B(document);if(n.has(e))return;n.add(e),b(t())}else document.head.querySelector(`style[${e}]`)||h(t(),e,n)}}var H=`data-ramka-vt-composited`,U=`data-ramka-vt-composited-css`,te=0,ne=`inset: 0 auto auto 0 !important;`,W=`::view-transition-group(${a})`,G=`::view-transition-old(${a})`,re=`::view-transition-new(${a})`;function ie(){return typeof window<`u`&&window.__RAMKA_VT_COMPOSITED__!==!1}function ae(){return typeof window<`u`&&`GestureEvent`in window}function K(e,t,n){let r=n===`borderRadius`?`border-radius`:`transform`;return`@keyframes ${e} {
${t.map(e=>`${(e.offset*100).toFixed(3)}% { ${r}: ${String(e[n])}; }`).join(`
`)}
}`}function oe(){V(`data-ramka-vt-composited-style`,()=>`
:root[${H}]${W} {
  animation: none !important;
  transform-origin: 0 0 !important;
}
:root[${H}]:not([${_.crossfade}])${G},
:root[${H}]:not([${_.crossfade}])${re} {
  width: auto !important;
  height: auto !important;
  ${ne}
  transform-origin: 0 0 !important;
  animation: none !important;
}
`)}var q=.001;function se(e){if(typeof e!=`string`)return null;let t=e.trim(),n=/^matrix\(([^)]+)\)$/.exec(t);if(n){let e=n[1].split(`,`).map(e=>Number.parseFloat(e));if(e.length!==6||e.some(e=>!Number.isFinite(e)))return null;let[t,r,i,a,o,s]=e;return Math.abs(r)>q||Math.abs(i)>q||t<=0||a<=0?null:{sx:t,sy:a,tx:o,ty:s}}if(n=/^matrix3d\(([^)]+)\)$/.exec(t),n){let e=n[1].split(`,`).map(e=>Number.parseFloat(e));return e.length!==16||e.some(e=>!Number.isFinite(e))||[e[1],e[2],e[3],e[4],e[6],e[7],e[8],e[9],e[11],e[14]].some(e=>Math.abs(e)>q)||Math.abs(e[10]-1)>q||Math.abs(e[15]-1)>q||e[0]<=0||e[5]<=0?null:{sx:e[0],sy:e[5],tx:e[12],ty:e[13]}}return null}function J(e){if(typeof e!=`string`)return null;let t=Number.parseFloat(e);return Number.isFinite(t)&&t>0?t:null}var Y=e=>Number(e.toFixed(4));function X(e){ie()&&e.ready&&e.ready.then(()=>ce(e)).catch(()=>{})}function ce(e){let t=document.documentElement,n=t.hasAttribute(_.crossfade);if(typeof document.getAnimations!=`function`)return;let r=document.getAnimations().filter(e=>e.effect?.pseudoElement===W).find(e=>(e.animationName??``).startsWith(`-ua-view-transition-group-anim`));if(!r||!r.effect)return;let i=r.effect,a=[];try{a=i.getKeyframes()}catch{a=[]}let o=a.find(e=>(e.computedOffset??e.offset??0)===0);if(!o)return;let l=se(o.transform),u=J(o.width),d=J(o.height);if(!l||u==null||d==null)return;let f=i.getComputedTiming(),p=typeof f.duration==`number`?f.duration:NaN;if(!Number.isFinite(p)||p<=0)return;let{duration:m,ease:h}=s(),g=r.currentTime,y=typeof g==`number`&&Number.isFinite(g)?Math.max(0,Math.min(g,p)):0,b=a.find(e=>(e.computedOffset??e.offset)===1),x=b?se(b.transform):null,S=b?J(b.width):null,C=b?J(b.height):null;if(!x||S==null||C==null){r.pause(),r.currentTime=p;let e=getComputedStyle(t,W);if(x=se(e.transform),S=J(e.width),C=J(e.height),!x||S==null||C==null){r.currentTime=0,r.play();return}}let w=getComputedStyle(t,W),T=w.transformOrigin.split(` `).map(e=>Number.parseFloat(e)),E=Number.parseFloat(w.width),D=Number.parseFloat(w.height),O=Number.isFinite(T[0])&&Number.isFinite(E)&&E>0?T[0]/E:.5,k=Number.isFinite(T[1])&&Number.isFinite(D)&&D>0?T[1]/D:.5;r.cancel();let A=ae();A||(oe(),t.setAttribute(H,``));let j=getComputedStyle(t),M=L(j.getPropertyValue(c.morphBorderRadiusFrom)),N=L(j.getPropertyValue(c.morphBorderRadiusTo)),P=[...M,...N].some(e=>e>0),F=Math.min(120,Math.max(24,Math.round(m/8))),I=[],R=[],z=[],B=[],V=(e,t,n)=>e+(t-e)*n,ie=e=>{let t=V(u,S,e),n=V(d,C,e),r=V(l.sx,x.sx,e),i=V(l.sy,x.sy,e),a=V(l.tx,x.tx,e),o=V(l.ty,x.ty,e),s=t*r,c=n*i,f=a+O*t*(1-r),p=o+k*n*(1-i),m=null;P&&(m=ee(M,N,e,{w0:u,h0:d,w:t,h:n,w1:S,h1:C}));let h=(e,r)=>{let i=Math.max(t/e,n/r),a=(t-i*e)/2*S/t,o=(n-i*r)/2*C/n;return`translate(${Y(a)}px, ${Y(o)}px) scale(${Y(i*S/t)}, ${Y(i*C/n)})`};return{group:`translate(${Y(f)}px, ${Y(p)}px) scale(${Y(s/S)}, ${Y(c/C)})`,radius:m,old:h(u,d),new:h(S,C)}};for(let e=0;e<=F;e++){let t=e/F,r=ie(h(t));I.push({offset:t,transform:r.group}),P&&R.push({offset:t,borderRadius:r.radius}),n||(z.push({offset:t,transform:r.old}),B.push({offset:t,transform:r.new}))}let q=e=>({duration:m,easing:`linear`,fill:`both`,pseudoElement:e}),X=[],ce=null;if(A){let e=++te,r=`ramka-vtg-${e}`,i=`ramka-vtr-${e}`,a=`ramka-vto-${e}`,o=`ramka-vtn-${e}`,s=e=>`${e} ${m}ms linear ${-y}ms both`,c=P?`${s(r)}, ${s(i)}`:s(r),l=n?``:`
${K(a,z,`transform`)}
${K(o,B,`transform`)}
:root[${U}]${G} {
  width: ${Y(u)}px;
  height: ${Y(d)}px;
  ${ne}
  transform-origin: 0 0 !important;
  animation: ${s(a)} !important;
}
:root[${U}]${re} {
  width: ${Y(S)}px;
  height: ${Y(C)}px;
  ${ne}
  transform-origin: 0 0 !important;
  animation: ${s(o)} !important;
}
`;ce=v(`
${K(r,I,`transform`)}
${P?K(i,R,`borderRadius`):``}
:root[${U}]${W} {
  transform-origin: 0 0 !important;
  animation: ${c} !important;
}
${l}`,`data-ramka-vt-composited-css`),t.setAttribute(U,``)}else{try{X.push(t.animate(I,q(W))),P&&X.push(t.animate(R,q(W))),n||(X.push(t.animate(z,q(G))),X.push(t.animate(B,q(re))))}catch{for(let e of X)e.cancel();t.removeAttribute(H),r.currentTime=0,r.play();return}if(y>0)for(let e of X)e.currentTime=y}e.finished.finally(()=>{for(let e of X)e.cancel();t.removeAttribute(H),t.removeAttribute(U),ce?.release()})}function le(e){return document.startViewTransition(e)}var ue=8,de=1e3;function fe(){let e=typeof window<`u`?window.visualViewport:null;return{innerW:window.innerWidth,innerH:window.innerHeight,vvH:e?.height??null,scrollX:Math.round(window.scrollX),scrollY:Math.round(window.scrollY)}}function pe(e){return`${e.innerW}x${e.innerH}|vv:${e.vvH??`n`}|s:${e.scrollX},${e.scrollY}`}function me(e){return e.vvH==null||Math.abs(e.innerH-e.vvH)<=1}function he(){return typeof navigator<`u`&&/jsdom/i.test(navigator.userAgent)?Promise.resolve():new Promise(e=>{let t=performance.now(),n=pe(fe()),r=0,i=()=>{let a=fe(),o=pe(a),s=me(a),c=performance.now()-t;o===n&&s?r+=1:(n=o,r=0),r>=ue||c>=de&&s||c>=de*1.5?e():requestAnimationFrame(i)};requestAnimationFrame(i)})}function ge(){return typeof navigator<`u`&&/jsdom/i.test(navigator.userAgent)?!1:C()}function _e(e,t=200){if(!e)return Promise.resolve();let n=e.tagName===`IMG`?e:e.querySelector(`img`);return!n||!(`decode`in n)||n.complete&&n.naturalWidth>0?Promise.resolve():new Promise(e=>{let r=!1,i=()=>{r||(r=!0,e())};n.decode().then(i,i),setTimeout(i,t)})}function ve(e){if(!e)return null;let t=e.tagName===`IMG`?e:e.querySelector(`img`);return!t||!(`decode`in t)||t.complete&&t.naturalWidth>0?null:t}function ye(e){if(!e)return!1;let t=e.getBoundingClientRect();return t.width>0&&t.height>0}function be(e,t){return e===`both`?!0:t===`opening`?e===`open`:e===`close`}function xe(e){let t=[],n=``,r=0;for(let i of e)i===`(`?r+=1:i===`)`&&(r=Math.max(0,r-1)),/\s/.test(i)&&r===0?(n&&t.push(n),n=``):n+=i;return n&&t.push(n),t}var Se=1e9;function Ce(e,t,n){let r=e.trim().toLowerCase();if(!r)return 0;if(/infinity/i.test(r))return Se;if(r.endsWith(`%`)){let e=Number.parseFloat(r);return Number.isFinite(e)?Math.max(0,n*e/100):Se}let i=Number.parseFloat(r);if(!Number.isFinite(i))return Se;if(r.endsWith(`rem`)){let e=Number.parseFloat(getComputedStyle(document.documentElement).fontSize)||16;return Math.max(0,i*e)}if(r.endsWith(`em`)){let e=Number.parseFloat(getComputedStyle(t).fontSize)||16;return Math.max(0,i*e)}return Math.max(0,i)}function we(e){return Math.round(e*100)/100}function Z(e){let t=getComputedStyle(e).borderRadius.trim();if(!t)return`0px`;let{width:n,height:r}=e.getBoundingClientRect();if(!(n>0&&r>0))return`0px`;let i=xe(t.split(`/`)[0].trim());if(i.length===0)return`0px`;let[a,o=a,s=a,c=o]=i,[l,u,d,f]=[a,o,s,c].map(t=>Ce(t,e,n)),p=Math.min(1,n/(l+u),n/(f+d),r/(u+d),r/(l+f)),[m,h,g,_]=[l,u,d,f].map(e=>we(e*p)),v;return v=_===h?g===m?h===m?[m]:[m,h]:[m,h,g]:[m,h,g,_],v.map(e=>`${e}px`).join(` `)}function Te(e,t){let n=p(t);e.setAttribute(_.viewTransitionPreset,y(t)?t:`default`),e.style.setProperty(c.vtDuration,`${n.duration}ms`),e.style.setProperty(c.vtEasing,n.cssEasing),e.style.setProperty(c.vtCrossfadeCloseEasing,n.cssCrossfadeCloseEasing),e.style.setProperty(c.vtRootEasing,n.cssRootEasing)}var Ee=.5,De=1;function Oe(e){let t=e.offsetWidth,n=e.offsetHeight;if(!(t>0&&n>0))return{horizontal:!1,vertical:!1};let r=document.documentElement.clientWidth,i=document.documentElement.clientHeight;return{horizontal:t>=r-Ee,vertical:n>=i-Ee}}function ke(e){if(!r())return null;let t=Oe(e);if(!t.horizontal&&!t.vertical)return null;let n=e.closest(`[${m.slide}]`)??e,i=n.style.paddingLeft,a=n.style.paddingRight,o=n.style.paddingTop,s=n.style.paddingBottom,c=getComputedStyle(n),l=De;return t.horizontal&&(n.style.paddingLeft=`${(parseFloat(c.paddingLeft)||0)+l}px`,n.style.paddingRight=`${(parseFloat(c.paddingRight)||0)+l}px`),t.vertical&&(n.style.paddingTop=`${(parseFloat(c.paddingTop)||0)+l}px`,n.style.paddingBottom=`${(parseFloat(c.paddingBottom)||0)+l}px`),e.offsetWidth,()=>{n.style.paddingLeft=i,n.style.paddingRight=a,n.style.paddingTop=o,n.style.paddingBottom=s}}var Ae=0;function je(e,t,n){return e.setAttribute(_.viewTransition,t),Te(e,n.preset),n.useCrossfade?e.setAttribute(_.crossfade,``):(e.style.setProperty(c.morphOldOpacity,`1`),e.style.setProperty(c.morphNewOpacity,t===`opening`?`1`:`0`)),n.fromRadius&&e.style.setProperty(c.morphBorderRadiusFrom,n.fromRadius),n.toRadius&&e.style.setProperty(c.morphBorderRadiusTo,n.toRadius),++Ae}function Q(e){e.style.setProperty(`view-transition-name`,a,`important`)}function $(e){e.style.removeProperty(`view-transition-name`)}function Me(e,t){t===Ae&&(e.removeAttribute(_.viewTransition),e.removeAttribute(_.crossfade),e.removeAttribute(_.viewTransitionPreset),e.style.removeProperty(c.morphOldOpacity),e.style.removeProperty(c.morphNewOpacity),e.style.removeProperty(c.morphBorderRadiusFrom),e.style.removeProperty(c.morphBorderRadiusTo),e.style.removeProperty(c.vtDuration),e.style.removeProperty(c.vtEasing),e.style.removeProperty(c.vtCrossfadeCloseEasing),e.style.removeProperty(c.vtRootEasing))}function Ne(e){return{open:async()=>{let{decodeMaxWait:t,onBeforeOpenRef:r,beforeOpenAbortRef:a,triggerElementsRef:s,triggerMorphElementsRef:c,activeItemElementRef:l,itemMorphElementsRef:u,openingTriggerIndexRef:d,openingTriggerElementRef:f,closeGenRef:p,commitPrepare:m,commitReveal:h,commitAbortPrepare:g}=e(),_=document.documentElement,v=p.current,y=P(),b=new AbortController;a.current=b;let C=d.current,E=f.current??s.current.get(C)??void 0,D=E?o(E,c.current):null,O=be(E?.dataset.crossfade,`opening`),k=D?Z(D):null;if((0,T.flushSync)(m),t>0){let n=l.current,r=n?w(n,u.current):null;if(ve(r)&&(await _e(r,t),e().closeGenRef.current!==v)){a.current===b&&(a.current=null),y();return}}let A=r.current;if(A){let t=l.current,n=x(t,u.current,e().destinationMorphElementRef.current);try{await A({destination:n,signal:b.signal})}catch{a.current===b&&(a.current=null),e().closeGenRef.current===v&&(0,T.flushSync)(g),y();return}if(a.current===b&&(a.current=null),e().closeGenRef.current!==v){y();return}if(b.signal.aborted){(0,T.flushSync)(g),y();return}}else a.current===b&&(a.current=null);if(ge()&&(await he(),e().closeGenRef.current!==v)){(0,T.flushSync)(g),y();return}let j=l.current,M=x(j,u.current,e().destinationMorphElementRef.current),N=!!D&&ye(M),F=N?Z(M):null,I=je(_,`opening`,{useCrossfade:!N||O,fromRadius:N?k:null,toRadius:F,preset:e().transitionPreset});N&&Q(D);let L=null,R=le(()=>{N&&$(D),(0,T.flushSync)(h);let t=l.current;if(N){let n=x(t,u.current,e().destinationMorphElementRef.current);n&&(Q(n),L=ke(n))}t&&t.setAttribute(`data-skip-fade`,``)});N&&X(R),R.finished.finally(()=>{if(y(),L?.(),L=null,e().closeGenRef.current!==v)return;let t=e(),r=t.activeItemElementRef.current,a=x(r,t.itemMorphElementsRef.current,t.destinationMorphElementRef.current);a&&$(a),Me(_,I);let o=n(t.scrollTriggerIntoView,`onOpenComplete`);if(o){let e=S(t.activeIndexRef.current,t.morphTo,t.openingTriggerIndexRef.current,t.triggerElementsRef.current);i(t.triggerElementsRef.current.get(e),o)}t.onOpenComplete()})},close:()=>{let{morphTo:t,scrollTriggerIntoView:a,triggerElementsRef:s,triggerMorphElementsRef:c,activeItemElementRef:l,itemMorphElementsRef:u,destinationMorphElementRef:d,openingTriggerIndexRef:f,activeIndexRef:p,closeGenRef:m,commitClose:h}=e(),g=document.documentElement,_=m.current,v=P(),y=l.current,b=x(y,u.current,d.current),C=S(p.current,t,f.current,s.current),w=s.current.get(C),E=w?o(w,c.current):null,D=!!E&&!!b,O=je(g,`closing`,{useCrossfade:!D||be(w?.dataset.crossfade,`closing`),fromRadius:D?Z(b):null,toRadius:D?Z(E):null,preset:e().transitionPreset});if(r()){let t=e().activeZoomRef.current;t&&t.getZoom()>1&&t.reset(!0)}let k=null;D&&(k=ke(b),Q(b));let A=le(()=>{k?.(),k=null,D&&$(b),(0,T.flushSync)(h);let e=n(a,`onClose`);e&&i(w,e),D&&Q(E)});D&&X(A),A.finished.finally(()=>{v(),k?.(),k=null,D&&$(E),Me(g,O),e().closeGenRef.current===_&&e().onCloseComplete(w)})}}}var Pe=`data-ramka-lightbox-vt-styles`;function Fe(){let e=_.viewTransition,t=_.crossfade,n=u.morphTarget,r=d.slides,i=c,o=g.default,s=`::view-transition-group(${a})`,f=`::view-transition-old(${a})`,p=`::view-transition-new(${a})`,m=`var(${i.vtDuration}, ${o.duration}ms)`,h=`var(${i.vtEasing}, ${o.cssEasing})`,v=`var(${i.vtCrossfadeCloseEasing}, ${o.cssCrossfadeCloseEasing})`,y=`var(${i.vtRootEasing}, ${o.cssRootEasing})`,b=`calc(${m} * 0.48)`;return`
/* Isolate the lightbox morph from the rest of the page. startViewTransition
   captures the WHOLE document, so any consumer element carrying its own
   view-transition-name would be lifted into a separate group and painted on
   the VT layer over the backdrop. Neutralize every name while the morph runs;
   the morph target re-declares its name inline with !important, which
   outranks this author-!important rule on specificity. */
:root[${e}] * {
  view-transition-name: none !important;
}

/* Hide the live morph source while the VT layer owns its pixels (the library
   sets ${n} on the resolved morph element). Without this the
   original trigger shows doubled under the morphing snapshot. The fade-back
   covers the close handover; it is killed DURING the transition so it can't
   be captured mid-flight in the root snapshot. */
[${n}] {
  opacity: 0;
  transition: opacity 200ms cubic-bezier(0.16, 1, 0.3, 1);
}

:root[${e}] [${n}] {
  transition: none;
}

@media (prefers-reduced-motion: no-preference) {
  /* Root snapshot cross-fade \u2014 the page-behind transition. Kept as a SINGLE
     root group: WebKit rasterizes each named group on the CPU. Lightbox
     chrome (thumbnails, zoom controls) fades with this snapshot \u2014 never as
     its own fullscreen named group. */
  :root[${e}]::view-transition-old(root),
  :root[${e}]::view-transition-new(root) {
    animation-duration: ${m};
    animation-timing-function: ${y};
  }

  /* Shape morph is CSS-only: JS writes the from/to radius vars; the group
     owns clipping for the whole transition. The 'from' radius is the cascade
     base (not only a keyframe) so frame 0 can't flash the 0px fallback. */
  @keyframes ramka-morph-border-radius {
    to {
      border-radius: var(${i.morphBorderRadiusTo}, 0px);
    }
  }

  ${s} {
    overflow: hidden;
    border-radius: var(${i.morphBorderRadiusFrom}, 0px);
    animation-name: -ua-view-transition-group-anim-${a}, ramka-morph-border-radius;
    animation-duration: ${m};
    animation-timing-function: ${h};
    animation-fill-mode: both;
    z-index: 2;
  }

  /* Hard-cut default (Trigger omits crossfade). Cover keeps same-image crops
     coherent; kill the UA dissolve and drive opacity from library vars. */
  ${f},
  ${p} {
    object-fit: cover;
    width: 100%;
    height: 100%;
    animation: none !important;
    mix-blend-mode: normal;
  }

  ${f} {
    opacity: var(${i.morphOldOpacity}, 1);
  }

  ${p} {
    opacity: var(${i.morphNewOpacity}, 0);
  }

  /* Dissolve path (Trigger crossfade): restore the UA fade, plus-lighter
     blend, fill so circular triggers don't balloon under cover. Re-timed to
     the preset vars so the dissolve runs on the morph's clock (the UA
     default would end at 250ms, mid-morph). Open uses the morph ease-out so
     the destination appears promptly while the group grows; close uses a
     modest ease-out (not the morph curve \u2014 that flashes a stretched trigger
     in the first frames, and a strong ease-in holds the item too long).
     Both phases share one complementary 1\u21920 / 0\u21921 pair on a shorter window
     so the outgoing snapshot is gone before the size settle (a face or +N
     overlay must not ghost until t=1). Do not delay one snapshot relative
     to the other \u2014 that leaves a window where opacities no longer sum to 1.

     Fill-mode both: the UA fades run with fill none, so a finished fade
     snaps the old snapshot back to its base opacity of 1 \u2014 and the
     composited group replacement can outlive the fades by a frame (its
     animations attach one style flush later), which painted a fully-opaque
     trigger snapshot blended over the item for that frame. Holding the end
     state closes the gap. */
  :root[${t}]${f},
  :root[${t}]${p} {
    object-fit: fill;
    mix-blend-mode: plus-lighter;
    animation: revert !important;
    animation-duration: ${b} !important;
    animation-timing-function: ${h} !important;
    animation-fill-mode: both !important;
    opacity: revert;
  }

  :root[${e}="closing"][${t}]${f},
  :root[${e}="closing"][${t}]${p} {
    animation-timing-function: ${v} !important;
  }
}

/* Thumb-jump slides crossfade \u2014 the element-scoped view transition started by
   ThumbnailStrip's selectViewTransition. Tunable via the select-vt vars. */
[${r}]::view-transition-group(root) {
  animation-duration: var(${l.selectVtDuration}, 0.4s);
  animation-timing-function: var(${l.selectVtEasing}, cubic-bezier(0.22, 1, 0.36, 1));
}

[${r}]::view-transition-old(root),
[${r}]::view-transition-new(root) {
  mix-blend-mode: normal;
  height: 100%;
  overflow: clip;
}
`}function Ie(){V(Pe,Fe,!0)}export{Ne as createViewTransitionMorph,Ie as ensureVtStructuralStyles};