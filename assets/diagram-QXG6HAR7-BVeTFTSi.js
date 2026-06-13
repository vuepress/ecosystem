import{t as e}from"./chunk-AQ6EADP3-CZhslHi-.js";import{y as t}from"./chunk-KGYTTC2M-ec26l_sO.js";import{t as n}from"./chunk-JQRUD6KW-Dbva2Z17.js";import{q as r}from"./chunk-7W6UQGC5-KyEG0HQg.js";import{F as i,H as a,I as o,K as s,N as c,S as l,Y as u,j as d,l as f,tt as p}from"./chunk-67TQ5CYL-Dmb9yc-t.js";import{t as m}from"./chunk-LRIF4GLE-V5RhSo3E.js";import"./chunk-KNLZD3CH-BGlP6X9R.js";import{a as h}from"./chunk-QA3QBVWF-DOkBOCvT.js";var g=d.packet,_=class{constructor(){this.packet=[],this.setAccTitle=c,this.getAccTitle=p,this.setDiagramTitle=i,this.getDiagramTitle=s,this.getAccDescription=l,this.setAccDescription=a}static{e(this,`PacketDB`)}getConfig(){let e=h({...g,...f().packet});return e.showBits&&(e.paddingY+=10),e}getPacket(){return this.packet}pushWord(e){e.length>0&&this.packet.push(e)}clear(){u(),this.packet=[]}},v=1e4,y=e((e,t)=>{n(e,t);let i=-1,a=[],o=1,{bitsPerRow:s}=t.getConfig();for(let{start:n,end:c,bits:l,label:u}of e.blocks){if(n!==void 0&&c!==void 0&&c<n)throw Error(`Packet block ${n} - ${c} is invalid. End must be greater than start.`);if(n??=i+1,n!==i+1)throw Error(`Packet block ${n} - ${c??n} is not contiguous. It should start from ${i+1}.`);if(l===0)throw Error(`Packet block ${n} is invalid. Cannot have a zero bit field.`);for(c??=n+(l??1)-1,l??=c-n+1,i=c,r.debug(`Packet block ${n} - ${i} with label ${u}`);a.length<=s+1&&t.getPacket().length<v;){let[e,r]=b({start:n,end:c,bits:l,label:u},o,s);if(a.push(e),e.end+1===o*s&&(t.pushWord(a),a=[],o++),!r)break;({start:n,end:c,bits:l,label:u}=r)}}t.pushWord(a)},`populate`),b=e((e,t,n)=>{if(e.start===void 0)throw Error(`start should have been set during first phase`);if(e.end===void 0)throw Error(`end should have been set during first phase`);if(e.start>e.end)throw Error(`Block start ${e.start} is greater than block end ${e.end}.`);if(e.end+1<=t*n)return[e,void 0];let r=t*n-1,i=t*n;return[{start:e.start,end:r,label:e.label,bits:r-e.start},{start:i,end:e.end,label:e.label,bits:e.end-i}]},`getNextFittingBlock`),x={parser:{yy:void 0},parse:e(async e=>{let n=await t(`packet`,e),i=x.parser?.yy;if(!(i instanceof _))throw Error(`parser.parser?.yy was not a PacketDB. This is due to a bug within Mermaid, please report this issue at https://github.com/mermaid-js/mermaid/issues.`);r.debug(n),y(n,i)},`parse`)},S=e((e,t,n,r)=>{let i=r.db,a=i.getConfig(),{rowHeight:s,paddingY:c,bitWidth:l,bitsPerRow:u}=a,d=i.getPacket(),f=i.getDiagramTitle(),p=s+c,h=p*(d.length+1)-(f?0:s),g=l*u+2,_=m(t);_.attr(`viewBox`,`0 0 ${g} ${h}`),o(_,h,g,a.useMaxWidth);for(let[e,t]of d.entries())C(_,t,e,a);_.append(`text`).text(f).attr(`x`,g/2).attr(`y`,h-p/2).attr(`dominant-baseline`,`middle`).attr(`text-anchor`,`middle`).attr(`class`,`packetTitle`)},`draw`),C=e((e,t,n,{rowHeight:r,paddingX:i,paddingY:a,bitWidth:o,bitsPerRow:s,showBits:c})=>{let l=e.append(`g`),u=n*(r+a)+a;for(let e of t){let t=e.start%s*o+1,n=(e.end-e.start+1)*o-i;if(l.append(`rect`).attr(`x`,t).attr(`y`,u).attr(`width`,n).attr(`height`,r).attr(`class`,`packetBlock`),l.append(`text`).attr(`x`,t+n/2).attr(`y`,u+r/2).attr(`class`,`packetLabel`).attr(`dominant-baseline`,`middle`).attr(`text-anchor`,`middle`).text(e.label),!c)continue;let a=e.end===e.start,d=u-2;l.append(`text`).attr(`x`,t+(a?n/2:0)).attr(`y`,d).attr(`class`,`packetByte start`).attr(`dominant-baseline`,`auto`).attr(`text-anchor`,a?`middle`:`start`).text(e.start),a||l.append(`text`).attr(`x`,t+n).attr(`y`,d).attr(`class`,`packetByte end`).attr(`dominant-baseline`,`auto`).attr(`text-anchor`,`end`).text(e.end)}},`drawWord`),w={draw:S},T={byteFontSize:`10px`,startByteColor:`black`,endByteColor:`black`,labelColor:`black`,labelFontSize:`12px`,titleColor:`black`,titleFontSize:`14px`,blockStrokeColor:`black`,blockStrokeWidth:`1`,blockFillColor:`#efefef`},E={parser:x,get db(){return new _},renderer:w,styles:e(({packet:e}={})=>{let t=h(T,e);return`
	.packetByte {
		font-size: ${t.byteFontSize};
	}
	.packetByte.start {
		fill: ${t.startByteColor};
	}
	.packetByte.end {
		fill: ${t.endByteColor};
	}
	.packetLabel {
		fill: ${t.labelColor};
		font-size: ${t.labelFontSize};
	}
	.packetTitle {
		fill: ${t.titleColor};
		font-size: ${t.titleFontSize};
	}
	.packetBlock {
		stroke: ${t.blockStrokeColor};
		stroke-width: ${t.blockStrokeWidth};
		fill: ${t.blockFillColor};
	}
	`},`styles`)};export{E as diagram};