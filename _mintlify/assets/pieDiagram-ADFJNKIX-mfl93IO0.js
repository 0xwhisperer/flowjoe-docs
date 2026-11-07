import"./Serializer-7ppJtgfZ.js";import{t as e}from"./ordinal-BDEzSJ7C.js";import{t}from"./arc-Ba3vqLbj.js";import{t as n}from"./pie-Czva8qhb.js";import{t as r}from"./mermaid-parser.core-Bv73GwiW.js";import{n as i,r as a}from"./chunk-AGHRB4JF-Bu-sSK9L.js";import{B as o,C as s,U as c,_ as l,a as u,b as d,c as f,d as p,v as m,z as h}from"./chunk-ABZYJK2D-CxrNeHc2.js";import{f as g,r as _}from"./chunk-S3R3BYOJ-BgECZCs0.js";import{t as v}from"./chunk-4BX2VUAB-_tQ8n8UB.js";import{o as y}from"./mermaid.core-Dfz0L94f.js";var b=p.pie,x={sections:new Map,showData:!1,config:b},S=x.sections,C=x.showData,w=structuredClone(b),T={getConfig:i(()=>structuredClone(w),`getConfig`),clear:i(()=>{S=new Map,C=x.showData,u()},`clear`),setDiagramTitle:c,getDiagramTitle:s,setAccTitle:o,getAccTitle:m,setAccDescription:h,getAccDescription:l,addSection:i(({label:e,value:t})=>{if(t<0)throw Error(`"${e}" has invalid value: ${t}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);S.has(e)||(S.set(e,t),a.debug(`added new section: ${e}, with value: ${t}`))},`addSection`),getSections:i(()=>S,`getSections`),setShowData:i(e=>{C=e},`setShowData`),getShowData:i(()=>C,`getShowData`)},E=i((e,t)=>{v(e,t),t.setShowData(e.showData),e.sections.map(t.addSection)},`populateDb`),D={parse:i(async e=>{let t=await r(`pie`,e);a.debug(t),E(t,T)},`parse`)},O=i(e=>`
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`,`getStyles`),k=i(e=>{let t=[...e.values()].reduce((e,t)=>e+t,0),r=[...e.entries()].map(([e,t])=>({label:e,value:t})).filter(e=>e.value/t*100>=1).sort((e,t)=>t.value-e.value);return n().value(e=>e.value)(r)},`createPieArcs`),A={parser:D,db:T,renderer:{draw:i((n,r,i,o)=>{a.debug(`rendering pie chart
`+n);let s=o.db,c=d(),l=_(s.getConfig(),c.pie),u=y(r),p=u.append(`g`);p.attr(`transform`,`translate(225,225)`);let{themeVariables:m}=c,[h]=g(m.pieOuterStrokeWidth);h??=2;let v=l.textPosition,b=t().innerRadius(0).outerRadius(185),x=t().innerRadius(185*v).outerRadius(185*v);p.append(`circle`).attr(`cx`,0).attr(`cy`,0).attr(`r`,185+h/2).attr(`class`,`pieOuterCircle`);let S=s.getSections(),C=k(S),w=[m.pie1,m.pie2,m.pie3,m.pie4,m.pie5,m.pie6,m.pie7,m.pie8,m.pie9,m.pie10,m.pie11,m.pie12],T=0;S.forEach(e=>{T+=e});let E=C.filter(e=>(e.data.value/T*100).toFixed(0)!==`0`),D=e(w);p.selectAll(`mySlices`).data(E).enter().append(`path`).attr(`d`,b).attr(`fill`,e=>D(e.data.label)).attr(`class`,`pieCircle`),p.selectAll(`mySlices`).data(E).enter().append(`text`).text(e=>(e.data.value/T*100).toFixed(0)+`%`).attr(`transform`,e=>`translate(`+x.centroid(e)+`)`).style(`text-anchor`,`middle`).attr(`class`,`slice`),p.append(`text`).text(s.getDiagramTitle()).attr(`x`,0).attr(`y`,-200).attr(`class`,`pieTitleText`);let O=[...S.entries()].map(([e,t])=>({label:e,value:t})),A=p.selectAll(`.legend`).data(O).enter().append(`g`).attr(`class`,`legend`).attr(`transform`,(e,t)=>{let n=22*O.length/2;return`translate(216,`+(t*22-n)+`)`});A.append(`rect`).attr(`width`,18).attr(`height`,18).style(`fill`,e=>D(e.label)).style(`stroke`,e=>D(e.label)),A.append(`text`).attr(`x`,22).attr(`y`,14).text(e=>s.getShowData()?`${e.label} [${e.value}]`:e.label);let j=512+Math.max(...A.selectAll(`text`).nodes().map(e=>e?.getBoundingClientRect().width??0));u.attr(`viewBox`,`0 0 ${j} 450`),f(u,450,j,l.useMaxWidth)},`draw`)},styles:O};export{A as diagram};