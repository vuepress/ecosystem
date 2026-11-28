import{t as e}from"./chunk-JWPE2WC7-BKak_x5j.js";import{Gt as t,Ht as n,J as r,Kt as i,Mt as a,Wt as o,Xt as s,Yt as c,_n as l,an as u,bn as d,in as f,qt as p,sn as m,zt as h}from"./mermaid.core-86n4k0lM.js";import{n as g}from"./mermaid-parser.core-CQowviEf.js";var _=d(()=>({domains:new Map,transitions:[]}),`createDefaultData`),v=_(),y={getDomains:d(()=>v.domains,`getDomains`),getTransitions:d(()=>v.transitions,`getTransitions`),setDomains:d(e=>{if(e)for(let t of e){let e=t.domain,n=(t.items??[]).map(e=>({label:e.label}));v.domains.set(e,{name:e,items:n})}},`setDomains`),setTransitions:d(e=>{e&&(v.transitions=e.filter(e=>e.from!==e.to||(l.warn(`Cynefin: self-loop transition on domain "${e.from}" is not meaningful and will be skipped.`),!1)).map(e=>({from:e.from,to:e.to,label:e.label||void 0})))},`setTransitions`),getConfig:d(()=>r({...o.cynefin,...p().cynefin}),`getConfig`),clear:d(()=>{h(),v=_()},`clear`),setAccTitle:u,getAccTitle:i,setDiagramTitle:m,getDiagramTitle:c,getAccDescription:t,setAccDescription:f},b=d(t=>{e(t,y),y.setDomains(t.domains),y.setTransitions(t.transitions)},`populate`),x={parse:d(async e=>{let t=await g(`cynefin`,e);l.debug(t),b(t)},`parse`)};function S(e){let t=e+0x6d2b79f5|0;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}d(S,`seededRandom`);function C(e){let t=0;for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);t=(t<<5)-t+r,t|=0}return t}d(C,`hashString`);function w(e,t){return typeof e==`number`&&Number.isFinite(e)&&e!==0?e:C(t)}d(w,`resolveSeed`);function T(e,t,n,r){let i=e/2,a=r??e*.015,o=t/7,s=[];for(let e=0;e<=7;e++){let t=S(n+e*17)*a*2-a;s.push({x:i+t,y:e*o})}let c=`M${s[0].x},${s[0].y}`;for(let e=0;e<s.length-1;e++){let t=s[e],r=s[e+1],i=(t.y+r.y)/2,o=e%2==0?1:-1,l=a*1.5*o*S(n+e*31+7),u=t.x+l,d=i,f=r.x-l;c+=` C${u},${d} ${f},${i} ${r.x},${r.y}`}return c}d(T,`generateFoldPath`);function E(e,t,n,r){let i=t/2,a=r??t*.015,o=e/7,s=[];for(let e=0;e<=7;e++){let t=S(n+e*23)*a*2-a;s.push({x:e*o,y:i+t})}let c=`M${s[0].x},${s[0].y}`;for(let e=0;e<s.length-1;e++){let t=s[e],r=s[e+1],i=(t.x+r.x)/2,o=e%2==0?1:-1,l=a*1.5*o*S(n+e*37+11),u=i,d=t.y+l,f=i,p=r.y-l;c+=` C${u},${d} ${f},${p} ${r.x},${r.y}`}return c}d(E,`generateHorizontalBoundary`);function D(e,t){let n=e/2,r=t*.5,i=t,a=e*.03;return[`M${n},${r}`,`C${n+a},${r+(i-r)*.2}`,`${n-a*1.5},${r+(i-r)*.55}`,`${n+a*.5},${r+(i-r)*.75}`,`C${n-a},${r+(i-r)*.85}`,`${n+a*.3},${r+(i-r)*.95}`,`${n},${i}`].join(` `)}d(D,`generateCliffPath`);function O(e,t,n,r){return[`M${e-n},${t}`,`A${n},${r} 0 1,1 ${e+n},${t}`,`A${n},${r} 0 1,1 ${e-n},${t}`,`Z`].join(` `)}d(O,`generateConfusionPath`);var k={complex:{model:`Probe → Sense → Respond`,practice:`Emergent Practices`},complicated:{model:`Sense → Analyse → Respond`,practice:`Good Practices`},clear:{model:`Sense → Categorise → Respond`,practice:`Best Practices`},chaotic:{model:`Act → Sense → Respond`,practice:`Novel Practices`},confusion:{model:``,practice:`Disorder`}},A=d((e,t)=>{let n=e/2,r=t/2;return{complex:{cx:n/2,cy:r/2,x:0,y:0,w:n,h:r},complicated:{cx:n+n/2,cy:r/2,x:n,y:0,w:n,h:r},chaotic:{cx:n/2,cy:r+r/2,x:0,y:r,w:n,h:r},clear:{cx:n+n/2,cy:r+r/2,x:n,y:r,w:n,h:r},confusion:{cx:n,cy:r,x:n*.7,y:r*.7,w:n*.6,h:r*.6}}},`getDomainLayouts`),j=d(()=>{let e=s(),t=p();return r(e,t.themeVariables).cynefin},`getCynefinDomainColors`),M=3,N={draw:d((e,t,r,i)=>{let o=i.db,s=o.getDomains(),c=o.getTransitions(),u=o.getDiagramTitle(),d=o.getAccTitle(),f=o.getAccDescription(),p=o.getConfig(),m=j();l.debug(`Rendering Cynefin diagram`);let h=p.width,g=p.height,_=p.padding,v=p.showDomainDescriptions,y=p.boundaryAmplitude,b=h+_*2,x=g+_*2,S={complex:m.complexBg,complicated:m.complicatedBg,clear:m.clearBg,chaotic:m.chaoticBg,confusion:m.confusionBg},C=a(t);n(C,x,b,p.useMaxWidth??!0),C.attr(`viewBox`,`0 0 ${b} ${x}`),d&&C.append(`title`).text(d),f&&C.append(`desc`).text(f);let N=C.append(`g`).attr(`transform`,`translate(${_}, ${_})`),P=A(h,g),F=w(p.seed,t),I=N.append(`g`).attr(`class`,`cynefin-backgrounds`),L=[`complex`,`complicated`,`chaotic`,`clear`];for(let e of L){let t=P[e];I.append(`rect`).attr(`class`,`cynefinDomain`).attr(`x`,t.x).attr(`y`,t.y).attr(`width`,t.w).attr(`height`,t.h).attr(`fill`,S[e]).attr(`fill-opacity`,.4).attr(`stroke`,`none`)}let R=N.append(`g`).attr(`class`,`cynefin-boundaries`);R.append(`path`).attr(`class`,`cynefinBoundary`).attr(`d`,T(h,g,F,y)).attr(`fill`,`none`),R.append(`path`).attr(`class`,`cynefinBoundary`).attr(`d`,E(h,g,F+100,y)).attr(`fill`,`none`),R.append(`path`).attr(`class`,`cynefinCliff`).attr(`d`,D(h,g)).attr(`fill`,`none`);let z=h*.15,B=g*.15;N.append(`path`).attr(`class`,`cynefinConfusion`).attr(`d`,O(h/2,g/2,z,B)).attr(`fill`,S.confusion).attr(`fill-opacity`,.5);let V=N.append(`g`).attr(`class`,`cynefin-labels`);for(let e of L){let t=P[e];V.append(`text`).attr(`class`,`cynefinDomainLabel`).attr(`x`,t.cx).attr(`y`,v?t.cy-30:t.cy).attr(`text-anchor`,`middle`).attr(`dominant-baseline`,`middle`).text(e.charAt(0).toUpperCase()+e.slice(1))}if(V.append(`text`).attr(`class`,`cynefinDomainLabel`).attr(`x`,h/2).attr(`y`,v?g/2-10:g/2).attr(`text-anchor`,`middle`).attr(`dominant-baseline`,`middle`).text(`Confusion`),v){let e=N.append(`g`).attr(`class`,`cynefin-subtitles`);for(let t of L){let n=P[t],r=k[t];e.append(`text`).attr(`class`,`cynefinSubtitle`).attr(`x`,n.cx).attr(`y`,n.cy-10).attr(`text-anchor`,`middle`).attr(`dominant-baseline`,`middle`).text(r.model),e.append(`text`).attr(`class`,`cynefinSubtitle`).attr(`x`,n.cx).attr(`y`,n.cy+5).attr(`text-anchor`,`middle`).attr(`dominant-baseline`,`middle`).text(r.practice)}e.append(`text`).attr(`class`,`cynefinSubtitle`).attr(`x`,h/2).attr(`y`,g/2+8).attr(`text-anchor`,`middle`).attr(`dominant-baseline`,`middle`).text(k.confusion.practice)}let H=N.append(`g`).attr(`class`,`cynefin-items`);for(let e of[`complex`,`complicated`,`chaotic`,`clear`,`confusion`]){let t=s.get(e);if(!t||t.items.length===0)continue;let n=P[e],r=e===`confusion`,i=t.items,a=0;r&&t.items.length>M&&(a=t.items.length-M,i=t.items.slice(0,M));let o;if(r){let e=v?22:14;o=n.cy+e}else o=n.cy+(v?25:15);if([...i].forEach((t,r)=>{let i=o+r*30,a=H.append(`g`),s=a.append(`text`).attr(`class`,`cynefinItemText`).attr(`x`,0).attr(`y`,13).attr(`text-anchor`,`middle`).attr(`dominant-baseline`,`central`).text(t.label),c=t.label.length*7,l=s.node();if(l&&typeof l.getBBox==`function`){let e=l.getBBox();e.width>0&&(c=e.width)}let u=c+20,d=n.cx-u/2;a.attr(`transform`,`translate(${d}, ${i})`),a.insert(`rect`,`text`).attr(`class`,`cynefinItem`).attr(`x`,0).attr(`y`,0).attr(`width`,u).attr(`height`,26).attr(`rx`,4).attr(`ry`,4).attr(`fill`,S[e]).attr(`fill-opacity`,.95),s.attr(`x`,u/2).attr(`y`,13)}),a>0){let t=o+i.length*30,r=`+${a} more`,s=H.append(`g`),c=s.append(`text`).attr(`class`,`cynefinItemText`).attr(`x`,0).attr(`y`,13).attr(`text-anchor`,`middle`).attr(`dominant-baseline`,`central`).text(r),l=r.length*7,u=c.node();if(u&&typeof u.getBBox==`function`){let e=u.getBBox();e.width>0&&(l=e.width)}let d=l+20,f=n.cx-d/2;s.attr(`transform`,`translate(${f}, ${t})`),s.insert(`rect`,`text`).attr(`class`,`cynefinItemOverflow`).attr(`x`,0).attr(`y`,0).attr(`width`,d).attr(`height`,26).attr(`rx`,4).attr(`ry`,4).attr(`fill`,S[e]).attr(`fill-opacity`,.6),c.attr(`x`,d/2).attr(`y`,13)}}if(c.length>0){let e=C.select(`defs`).empty()?C.append(`defs`):C.select(`defs`),n=`cynefin-arrow-${t}`;e.append(`marker`).attr(`id`,n).attr(`viewBox`,`0 0 10 10`).attr(`refX`,9).attr(`refY`,5).attr(`markerWidth`,6).attr(`markerHeight`,6).attr(`orient`,`auto-start-reverse`).append(`path`).attr(`d`,`M 0 0 L 10 5 L 0 10 z`).attr(`class`,`cynefinArrowHead`);let r=N.append(`g`).attr(`class`,`cynefin-arrows`);c.forEach(e=>{let t=P[e.from],i=P[e.to];if(!t||!i)return;if(e.from===e.to){l.warn(`Cynefin renderer: skipping self-loop on domain "${e.from}"`);return}let a=t.cx,o=t.cy,s=i.cx,c=i.cy,u=(a+s)/2,d=(o+c)/2,f=s-a,p=c-o,m=Math.sqrt(f*f+p*p),h=m*.15,g=-p/m,_=f/m,v=u+g*h,y=d+_*h;r.append(`path`).attr(`class`,`cynefinArrowLine`).attr(`d`,`M${a},${o} Q${v},${y} ${s},${c}`).attr(`fill`,`none`).attr(`marker-end`,`url(#${n})`),e.label&&r.append(`text`).attr(`class`,`cynefinArrowLabel`).attr(`x`,v).attr(`y`,y-6).attr(`text-anchor`,`middle`).attr(`dominant-baseline`,`auto`).text(e.label)})}u&&N.append(`text`).attr(`class`,`cynefinTitle`).attr(`x`,h/2).attr(`y`,-_/2).attr(`text-anchor`,`middle`).attr(`dominant-baseline`,`middle`).text(u)},`draw`)},P=d(()=>{let e=s(),t=p();return r(e,t.themeVariables).cynefin},`getCynefinTheme`),F={parser:x,db:y,renderer:N,styles:d(()=>{let e=P();return`
	.cynefinDomain {
		stroke: none;
	}
	.cynefinDomainLabel {
		font-size: ${e.domainFontSize}px;
		font-weight: bold;
		fill: ${e.labelColor};
	}
	.cynefinSubtitle {
		font-size: ${e.itemFontSize-1}px;
		fill: ${e.textColor};
		font-style: italic;
	}
	.cynefinItem {
		fill-opacity: 0.95;
		stroke: ${e.boundaryColor};
		stroke-width: 1;
	}
	.cynefinItemText {
		font-size: ${e.itemFontSize}px;
		fill: ${e.textColor};
	}
	.cynefinItemOverflow {
		fill-opacity: 0.6;
		stroke: ${e.boundaryColor};
		stroke-width: 1;
		stroke-dasharray: 3 2;
	}
	.cynefinBoundary {
		stroke: ${e.boundaryColor};
		stroke-width: ${e.boundaryWidth};
		stroke-dasharray: 6 3;
	}
	.cynefinCliff {
		stroke: ${e.cliffColor};
		stroke-width: ${e.cliffWidth};
	}
	.cynefinConfusion {
		stroke: ${e.boundaryColor};
		stroke-width: 1.5;
		stroke-dasharray: 4 2;
	}
	.cynefinArrowLine {
		stroke: ${e.arrowColor};
		stroke-width: ${e.arrowWidth};
		fill: none;
	}
	.cynefinArrowHead {
		fill: ${e.arrowColor};
		stroke: none;
	}
	.cynefinArrowLabel {
		font-size: ${e.itemFontSize-1}px;
		fill: ${e.textColor};
	}
	.cynefinTitle {
		font-size: ${e.domainFontSize+2}px;
		font-weight: bold;
		fill: ${e.labelColor};
	}
	`},`styles`)};export{F as diagram};