import{f as r,h as s,r as c,c as l,o as a,b as i}from"./app-Hy3CkDjp.js";const _=r({__name:"ToggleRTLButton",setup(u){const t=s(!1),o=()=>{const{documentElement:e}=document;t.value?(e.removeAttribute("dir"),e.style.removeProperty("direction")):(e.setAttribute("dir","rtl"),e.style.setProperty("direction","rtl")),t.value=!t.value};return(e,m)=>{const n=c("VPIcon");return a(),l("button",{type:"button",class:"toggle-rtl-button",onClick:o},[i(n,{icon:`toggle-${t.value?"right":"left"}`,size:"2rem"},null,8,["icon"])])}}});export{_};
