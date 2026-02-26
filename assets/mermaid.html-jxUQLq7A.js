import{_ as o,c as m,d,b as e,w as a,r as p,o as h,a as s,e as n}from"./app-BLX--KpT.js";const b={};function g(k,l){const u=p("CodeTabs"),i=p("Mermaid"),c=p("VPPreview");return h(),m("div",null,[l[26]||(l[26]=d('<h1 id="mermaid" tabindex="-1"><a class="header-anchor" href="#mermaid"><span>Mermaid</span></a></h1><p>让你的 VuePress 站点中的 Markdown 文件支持 <a href="https://mermaid.js.org/" target="_blank" rel="noopener noreferrer">Mermaid</a>。</p><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装"><span>安装</span></a></h2><p>在你的项目中安装 <a href="https://mermaid.js.org/" target="_blank" rel="noopener noreferrer">Mermaid</a>：</p>',4)),e(u,{data:[{id:"pnpm"},{id:"yarn"},{id:"npm"}],"tab-id":"shell"},{title0:a(({value:r,isActive:t})=>[...l[0]||(l[0]=[n("pnpm",-1)])]),title1:a(({value:r,isActive:t})=>[...l[1]||(l[1]=[n("yarn",-1)])]),title2:a(({value:r,isActive:t})=>[...l[2]||(l[2]=[n("npm",-1)])]),tab0:a(({value:r,isActive:t})=>[...l[3]||(l[3]=[s("div",{class:"language-bash","data-highlighter":"shiki","data-ext":"bash",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[s("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[s("code",{class:"language-bash"},[s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#4078F2","--shiki-dark":"#61AFEF"}},"pnpm"),s("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}}," add"),s("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}}," -D"),s("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}}," mermaid")])])])],-1)])]),tab1:a(({value:r,isActive:t})=>[...l[4]||(l[4]=[s("div",{class:"language-bash","data-highlighter":"shiki","data-ext":"bash",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[s("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[s("code",{class:"language-bash"},[s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#4078F2","--shiki-dark":"#61AFEF"}},"yarn"),s("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}}," add"),s("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}}," -D"),s("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}}," mermaid")])])])],-1)])]),tab2:a(({value:r,isActive:t})=>[...l[5]||(l[5]=[s("div",{class:"language-bash","data-highlighter":"shiki","data-ext":"bash",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[s("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[s("code",{class:"language-bash"},[s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#4078F2","--shiki-dark":"#61AFEF"}},"npm"),s("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}}," i"),s("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}}," -D"),s("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}}," mermaid")])])])],-1)])]),_:1}),l[27]||(l[27]=d(`<p>然后通过以下方式启用：</p><div class="code-block-with-title"><div class="code-block-title-bar" data-title=".vuepress/config.ts"><span>.vuepress/config.ts</span></div><div class="language-ts line-numbers-mode" data-highlighter="shiki" data-ext="ts" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-ts"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">markdownChartPlugin</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;@vuepress/plugin-markdown-chart&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">export</span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD;"> default</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  plugins</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> [</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    markdownChartPlugin</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">({</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">      // 启用 Mermaid</span></span>
<span class="line highlighted"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">      mermaid</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> true</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }),</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  ],</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><h2 id="语法" tabindex="-1"><a class="header-anchor" href="#语法"><span>语法</span></a></h2><div class="language-md" data-highlighter="shiki" data-ext="md" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-md"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">\`\`\`mermaid</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;!-- 在此处放置 mermaid 代码 --&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">\`\`\`</span></span></code></pre></div><p>除了使用 mermaid 代码块，你也可以直接使用以下代码块：</p><ul><li>class: <code>classDiagram</code></li><li>c4c: <code>C4Context</code></li><li>er: <code>erDiagram</code></li><li>gantt: <code>gantt</code></li><li>git-graph: <code>gitGraph</code></li><li>journey: <code>journey</code></li><li>mindmap: <code>mindmap</code></li><li>kanban: <code>kanban</code></li><li>pie: <code>pie</code></li><li>quadrant: <code>quadrantChart</code></li><li>requirement: <code>requirementDiagram</code></li><li>sequence: <code>sequenceDiagram</code></li><li>state: <code>stateDiagram-v2</code></li><li>timeline: <code>timeline</code></li><li>architecture: <code>architecture-beta</code></li><li>block: <code>block-beta</code></li><li>packet: <code>packet-beta</code></li><li>radar: <code>radar-beta</code></li><li>sankey: <code>sankey-beta</code></li><li>treemap: <code>treemap-beta</code></li><li>xy: <code>xychart-beta</code></li></ul><p>你不需要再声明图表类型，也不需要缩进图表代码。</p><p>当图表支持设置标题时，你可以直接在代码块信息后添加标题:</p><div class="language-md" data-highlighter="shiki" data-ext="md" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-md"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">\`\`\`sequence 代码标题</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">顺序图代码内容</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">...</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">\`\`\`</span></span></code></pre></div><h2 id="使用" tabindex="-1"><a class="header-anchor" href="#使用"><span>使用</span></a></h2><p>详见 <a href="https://mermaid.js.org/" target="_blank" rel="noopener noreferrer">mermaid 官方文档</a>。</p><h2 id="高级" tabindex="-1"><a class="header-anchor" href="#高级"><span>高级</span></a></h2><p>你可以在<a href="https://vuejs.press/zh/guide/configuration.html#%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6" target="_blank" rel="noopener noreferrer">客户端配置文件</a>中导入并使用 <code>defineMermaidConfig</code> 来自定义 Mermaid 配置:</p><div class="code-block-with-title"><div class="code-block-title-bar" data-title=".vuepress/client.ts"><span>.vuepress/client.ts</span></div><div class="language-ts" data-highlighter="shiki" data-ext="ts" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-ts"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">defineClientConfig</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;vuepress/client&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">defineMermaidConfig</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">({</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">  // 在此设置 mermaid 选项</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">})</span></span></code></pre></div></div><h2 id="例子" tabindex="-1"><a class="header-anchor" href="#例子"><span>例子</span></a></h2>`,15)),e(c,{title:"流程图"},{content:a(()=>[e(i,{code:"eJzT1dXlKsksyUm1UnDLyS9PzkgsKuECCabBeAohTlwKQJBsqKtrl2gEZheXJqUXJRZkKOTnpYIFEpEkU/NSUBWVlOeDBZJAipJwKcooSoWYBbYoGVUZ0B4FoCjcKLBqVJHyfDAfqBEAuj83LQ=="})]),code:a(()=>[...l[6]||(l[6]=[s("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[s("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[s("code",{class:"language-"},[s("span",{class:"line"},[s("span",null,"```mermaid")]),n(`
`),s("span",{class:"line"},[s("span",null,"---")]),n(`
`),s("span",{class:"line"},[s("span",null,"title: Flowchart")]),n(`
`),s("span",{class:"line"},[s("span",null,"---")]),n(`
`),s("span",{class:"line"},[s("span",null,"flowchart TB")]),n(`
`),s("span",{class:"line"},[s("span",null,"    c1-->a2")]),n(`
`),s("span",{class:"line"},[s("span",null,"    subgraph one")]),n(`
`),s("span",{class:"line"},[s("span",null,"    a1-->a2")]),n(`
`),s("span",{class:"line"},[s("span",null,"    end")]),n(`
`),s("span",{class:"line"},[s("span",null,"    subgraph two")]),n(`
`),s("span",{class:"line"},[s("span",null,"    b1-->b2")]),n(`
`),s("span",{class:"line"},[s("span",null,"    end")]),n(`
`),s("span",{class:"line"},[s("span",null,"    subgraph three")]),n(`
`),s("span",{class:"line"},[s("span",null,"    c1-->c2")]),n(`
`),s("span",{class:"line"},[s("span",null,"    end")]),n(`
`),s("span",{class:"line"},[s("span",null,"    one --> two")]),n(`
`),s("span",{class:"line"},[s("span",null,"    three --> two")]),n(`
`),s("span",{class:"line"},[s("span",null,"    two --> c2")]),n(`
`),s("span",{class:"line"},[s("span",null,"```")])])]),s("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1)])]),_:1}),e(c,{title:"循序图"},{content:a(()=>[e(i,{code:"eJxtkL1OxDAQhPs8xdCfQx+hIH4kfgp6Sie3Z1vneIW9UcLbsw7hkBDdaubzeHeMMY0EidThKRNJSK40VWwKfcyURnoM1mU7NcBdDCPB9D3ueejwTDFyHQ/wvMBmwifPtwqqZhR7ZZ8Uq97As1QXVbsg63dkhxfYCY75CPE2ncvVTqwb/7//xkLIwXkBn3ZO3ygRlIBF5ORuhnzd1wESJjqg8K+sUaI0QWgVHJnKJicWnIKGJs3IvLTN5aJ92wdP41mLwhLEbz+3bfvTj9nPfqei6ub+6ecL4yd1lw==",title:"eJxzL0pNLcnMSy8GABGsA6k="})]),code:a(()=>[...l[7]||(l[7]=[s("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[s("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[s("code",{class:"language-"},[s("span",{class:"line"},[s("span",null,"```sequence Greetings")]),n(`
`),s("span",{class:"line"},[s("span",null,"Alice ->> Bob: Hello Bob, how are you?")]),n(`
`),s("span",{class:"line"},[s("span",null,"Bob-->>John: How about you John?")]),n(`
`),s("span",{class:"line"},[s("span",null,"Bob--x Alice: I am good thanks!")]),n(`
`),s("span",{class:"line"},[s("span",null,"Bob-x John: I am good thanks!")]),n(`
`),s("span",{class:"line"},[s("span",null,"Note right of John: Bob thinks a long<br/>long time, so long<br/>that the text does<br/>not fit on a row.")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"Bob-->Alice: Checking with John...")]),n(`
`),s("span",{class:"line"},[s("span",null,"Alice->John: Yes... John, how are you?")]),n(`
`),s("span",{class:"line"},[s("span",null,"```")])])]),s("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1)])]),_:1}),e(c,{title:"类图"},{content:a(()=>[e(i,{code:"eJxdkMtOxDAMRff9CqsrEOoPjNggZiqxYMUOISG39WSsOsmQpAzPfyePUpjubo6vr+00TVMFDkIbuDGsUWD3hvooVKVK1Qt6v2VUDnUFYGwgqFtnNWynfoTAIvBIncM6VueA66+myeXfhr11xV73aGAv708mCX9iXdTAr1TUgeQIHAl1k1Js1Dq3ZX9YoTz/j23gik0AVHTGHoKLcaDIDOSWSjL7e9RRXlz+pxoDZZJ/IK//GV+wBHWE460Vm7IiTcdkf9QvE/ZjfnwvAWnvEtCk7Tx/0J1piUJh8fYdhlVPPmye2lkrwP75xDIU4iYz+38AvwSIcw==",title:"eJxzzMvMTcxRcK1IzC3ISQUAJjwFPw=="})]),code:a(()=>[...l[8]||(l[8]=[s("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[s("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[s("code",{class:"language-"},[s("span",{class:"line"},[s("span",null,"```class Animal Example")]),n(`
`),s("span",{class:"line"},[s("span",null,'note "From Duck till Zebra"')]),n(`
`),s("span",{class:"line"},[s("span",null,"Animal <|-- Duck")]),n(`
`),s("span",{class:"line"},[s("span",null,'note for Duck "can fly\\ncan swim\\ncan dive\\ncan help in debugging"')]),n(`
`),s("span",{class:"line"},[s("span",null,"Animal <|-- Fish")]),n(`
`),s("span",{class:"line"},[s("span",null,"Animal <|-- Zebra")]),n(`
`),s("span",{class:"line"},[s("span",null,"Animal : +int age")]),n(`
`),s("span",{class:"line"},[s("span",null,"Animal : +String gender")]),n(`
`),s("span",{class:"line"},[s("span",null,"Animal: +isMammal()")]),n(`
`),s("span",{class:"line"},[s("span",null,"Animal: +mate()")]),n(`
`),s("span",{class:"line"},[s("span",null,"class Duck{")]),n(`
`),s("span",{class:"line"},[s("span",null,"  +String beakColor")]),n(`
`),s("span",{class:"line"},[s("span",null,"  +swim()")]),n(`
`),s("span",{class:"line"},[s("span",null,"  +quack()")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"class Fish{")]),n(`
`),s("span",{class:"line"},[s("span",null,"  -int sizeInFeet")]),n(`
`),s("span",{class:"line"},[s("span",null,"  -canEat()")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"class Zebra{")]),n(`
`),s("span",{class:"line"},[s("span",null,"  +bool is_wild")]),n(`
`),s("span",{class:"line"},[s("span",null,"  +run()")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"```")])])]),s("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1)])]),_:1}),e(c,{title:"状态图"},{content:a(()=>[e(i,{code:"eJxdjrEKwkAQRPv7iqmFBbGU8xpFsLOwE5HjWJPFmEBuzfe7OTWEdLvzZoYhIqeiDW+xrzk9IQ+0kIyWq6gysBsdLmtUPkis+viiYeMcUCSz37+H96nuJHEIxq6rG4gCTvncZSk1mD2F/ZNGppJRP8Ym25qyw2O9xJf+zfjhsDP+AfL5Oro=",title:"eJxzzkhNzlbITFPIU8gsVshLTU8sySxLBQBVogfL"})]),code:a(()=>[...l[9]||(l[9]=[s("div",{class:"language-","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[s("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[s("code",{class:"language-"},[s("span",{class:"line"},[s("span",null,"```state Check if n is negative")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"state if_state <<choice>>")]),n(`
`),s("span",{class:"line"},[s("span",null,"[*] --> IsPositive")]),n(`
`),s("span",{class:"line"},[s("span",null,"IsPositive --> if_state")]),n(`
`),s("span",{class:"line"},[s("span",null,"if_state --> False: if n < 0")]),n(`
`),s("span",{class:"line"},[s("span",null,"if_state --> True : if n >= 0")]),n(`
`),s("span",{class:"line"},[s("span",null,"```")])])])],-1)])]),_:1}),e(c,{title:"关系图"},{content:a(()=>[e(i,{code:"eJx1jcEKwjAMhu99irxAX2C34XrwYJUK3iPGEmxXySoK297dFnbZYIGQ5MvP/2utVeYcqAEjYH4Y34FUpYqkY/SCUQEcWgfTpHUawbYn0+nOHW/GQQMYQvoOi2Qss9aQhXsPQp7LiplTbz/xTrL+R3zRhqQHhYLm0hfjrme7E8s1clFsUp8sQ7YYN9YBV5T7DOjrNas/3tBLQA==",title:"eJxzLVJwrUjMLchJBQASlwOk"})]),code:a(()=>[...l[10]||(l[10]=[s("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[s("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[s("code",{class:"language-"},[s("span",{class:"line"},[s("span",null,"```er Er Example")]),n(`
`),s("span",{class:"line"},[s("span",null,"CAR ||--o{ NAMED-DRIVER : allows")]),n(`
`),s("span",{class:"line"},[s("span",null,"CAR {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    string registrationNumber")]),n(`
`),s("span",{class:"line"},[s("span",null,"    string make")]),n(`
`),s("span",{class:"line"},[s("span",null,"    string model")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"PERSON ||--o{ NAMED-DRIVER : is")]),n(`
`),s("span",{class:"line"},[s("span",null,"PERSON {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    string firstName")]),n(`
`),s("span",{class:"line"},[s("span",null,"    string lastName")]),n(`
`),s("span",{class:"line"},[s("span",null,"    int age")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"```")])])]),s("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1)])]),_:1}),e(c,{title:"用户日记图"},{content:a(()=>[e(i,{code:"eJxVzD0OgzAMhuG9p/gO0KWqumRtpU6ZegKrWGB+YpQYIW4PBAFifT77rXWIgacbYGItw08YNTYSShS0cuK/iQZ8FaZ5WxDw1DCMyeHl4DnbcjL0yUhicnge/NneHB4r3fEmu3Yr7Y5AoWPYE2f5J5aX3WYBdjXD"})]),code:a(()=>[...l[11]||(l[11]=[s("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[s("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[s("code",{class:"language-"},[s("span",{class:"line"},[s("span",null,"```journey")]),n(`
`),s("span",{class:"line"},[s("span",null,"title My working day")]),n(`
`),s("span",{class:"line"},[s("span",null,"section Go to work")]),n(`
`),s("span",{class:"line"},[s("span",null,"  Make tea: 5: Me")]),n(`
`),s("span",{class:"line"},[s("span",null,"  Go upstairs: 3: Me")]),n(`
`),s("span",{class:"line"},[s("span",null,"  Do work: 1: Me, Cat")]),n(`
`),s("span",{class:"line"},[s("span",null,"section Go home")]),n(`
`),s("span",{class:"line"},[s("span",null,"  Go downstairs: 5: Me")]),n(`
`),s("span",{class:"line"},[s("span",null,"  Sit down: 5: Me")]),n(`
`),s("span",{class:"line"},[s("span",null,"```")])])]),s("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1)])]),_:1}),e(c,{title:"甘特图"},{content:a(()=>[e(i,{code:"eJyVU01v2zAMvfdXEAYKtIAzxGk2dLkFCToMWHfqZbeqEp0ItaVAorfm34+UP2A3adHqJJt6j4+P5E45ogsAowjvfKgVAfzhM7u/n223HCBLFUJ71sZYt4Mf698PD2Cs2gVVQ9k4TdY7VVk6AnmokWmsYSy+6KoxGAX7D/EZnYn8+/ISrh772CMorfFAEeIBtS2tTloiWDcSAmXSlnPsGMGXQHtMlHCVxcbx3+wafICsT5Pl8NQQOE/tUx9MGxSC7Mv1BeuImITDur/xv42vDxUSGiAVn7u601kZ7zCXG6sucljMi+VsXszm3/LhessMa6b6iydwYVApxBzMsBgxfM/hRvy6a6gJ56HDjaE3OaiSMHQ0X19BF+9AlyMo0zB05MMmWLJaVYlFGvXKDO6IeKn7Z5V1CCv55L4kc8aeLPfM8FMIanQEBxUi5z1zJgyDOnFYCtsE5HEAnggeEZ6Cc0QdQ2/viZcsfCp6iksGnuQJPEYYJplWSRFvwWjMz1XEL4uJs1uvG3FBdVO2xcipnxDS+kE8cujlrWlRbMXYllSeiGjB/R6yJIO1Z392XYGrFqUKAGmN9ENgipdiL2xvAHnQ9ZCyBS9v9+NyfqnIooed+Vg1bQWJ+uMVfEK1aPwPxhRkQQ=="})]),code:a(()=>[...l[12]||(l[12]=[s("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[s("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[s("code",{class:"language-"},[s("span",{class:"line"},[s("span",null,"```gantt")]),n(`
`),s("span",{class:"line"},[s("span",null,"dateFormat  YYYY-MM-DD")]),n(`
`),s("span",{class:"line"},[s("span",null,"title       Adding GANTT diagram functionality to mermaid")]),n(`
`),s("span",{class:"line"},[s("span",null,"excludes    weekends")]),n(`
`),s("span",{class:"line"},[s("span",null,'%% (`excludes` accepts specific dates in YYYY-MM-DD format, days of the week ("sunday") or "weekends", but not the word "weekdays".)')]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"section A section")]),n(`
`),s("span",{class:"line"},[s("span",null,"Completed task            :done,    des1, 2014-01-06,2014-01-08")]),n(`
`),s("span",{class:"line"},[s("span",null,"Active task               :active,  des2, 2014-01-09, 3d")]),n(`
`),s("span",{class:"line"},[s("span",null,"Future task               :         des3, after des2, 5d")]),n(`
`),s("span",{class:"line"},[s("span",null,"Future task2              :         des4, after des3, 5d")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"section Critical tasks")]),n(`
`),s("span",{class:"line"},[s("span",null,"Completed task in the critical line :crit, done, 2014-01-06,24h")]),n(`
`),s("span",{class:"line"},[s("span",null,"Implement parser                    :crit, done, after des1, 2d")]),n(`
`),s("span",{class:"line"},[s("span",null,"Create tests for parser             :crit, active, 3d")]),n(`
`),s("span",{class:"line"},[s("span",null,"Future task in critical line        :crit, 5d")]),n(`
`),s("span",{class:"line"},[s("span",null,"Create tests for renderer           :2d")]),n(`
`),s("span",{class:"line"},[s("span",null,"Add to mermaid                      :1d")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"section Documentation")]),n(`
`),s("span",{class:"line"},[s("span",null,"Describe gantt syntax               :active, a1, after des1, 3d")]),n(`
`),s("span",{class:"line"},[s("span",null,"Add gantt diagram to demo page      :after a1  , 20h")]),n(`
`),s("span",{class:"line"},[s("span",null,"Add another diagram to demo page    :doc1, after a1  , 48h")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"section Last section")]),n(`
`),s("span",{class:"line"},[s("span",null,"Describe gantt syntax               :after doc1, 3d")]),n(`
`),s("span",{class:"line"},[s("span",null,"Add gantt diagram to demo page      :20h")]),n(`
`),s("span",{class:"line"},[s("span",null,"Add another diagram to demo page    :48h")]),n(`
`),s("span",{class:"line"},[s("span",null,"```")])])]),s("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1)])]),_:1}),e(c,{title:"饼图"},{content:a(()=>[e(i,{code:"eJwryEzlUlAoySzJSVUIz0gsUQjLz0lJzc0vKlFIyU8tzlMvUchILEu1BypSUFByC/J09XMJVlKwUjCCijj6evpEggSMIQJ+/sGuIK6JKRcA9yEXxA=="})]),code:a(()=>[...l[13]||(l[13]=[s("div",{class:"language-","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[s("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[s("code",{class:"language-"},[s("span",{class:"line"},[s("span",null,"```pie")]),n(`
`),s("span",{class:"line"},[s("span",null,"title What Voldemort doesn't have?")]),n(`
`),s("span",{class:"line"},[s("span",null,'  "FRIENDS" : 2')]),n(`
`),s("span",{class:"line"},[s("span",null,'  "FAMILY" : 3')]),n(`
`),s("span",{class:"line"},[s("span",null,'  "NOSE" : 45')]),n(`
`),s("span",{class:"line"},[s("span",null,"```")])])])],-1)])]),_:1}),e(c,{title:"Git 图表"},{content:a(()=>[e(i,{code:"eJyNUUEOgjAQvPuKhmdww4SACWqCxnspC22klJRi9Pci1bAiFg5NNrMzs5NpKUykacM3hDAlpTD9kGlaM064MoW4vxYc2FV1BiETag43qFSDuQgayETkvkdb7hFDy37KmDfqC6Cm07DFBhizDubRgB/vojjp3xlzJRW1I6hVHo7pPkicGQdeGl7C9BQ6s8wcl6BLmCnNqR0TfDcRLLAXjs3LVyax3sjpHU1DBbQFLELQv1p+F6PIXpp+3jTJh/8EoXrlcg=="})]),code:a(()=>[...l[14]||(l[14]=[s("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[s("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[s("code",{class:"language-"},[s("span",{class:"line"},[s("span",null,"```git-graph")]),n(`
`),s("span",{class:"line"},[s("span",null,"commit")]),n(`
`),s("span",{class:"line"},[s("span",null,"branch hotfix")]),n(`
`),s("span",{class:"line"},[s("span",null,"checkout hotfix")]),n(`
`),s("span",{class:"line"},[s("span",null,"commit")]),n(`
`),s("span",{class:"line"},[s("span",null,"branch develop")]),n(`
`),s("span",{class:"line"},[s("span",null,"checkout develop")]),n(`
`),s("span",{class:"line"},[s("span",null,'commit id:"ash" tag:"abc"')]),n(`
`),s("span",{class:"line"},[s("span",null,"branch featureB")]),n(`
`),s("span",{class:"line"},[s("span",null,"checkout featureB")]),n(`
`),s("span",{class:"line"},[s("span",null,"commit type:HIGHLIGHT")]),n(`
`),s("span",{class:"line"},[s("span",null,"checkout main")]),n(`
`),s("span",{class:"line"},[s("span",null,"checkout hotfix")]),n(`
`),s("span",{class:"line"},[s("span",null,"commit type:NORMAL")]),n(`
`),s("span",{class:"line"},[s("span",null,"checkout develop")]),n(`
`),s("span",{class:"line"},[s("span",null,"commit type:REVERSE")]),n(`
`),s("span",{class:"line"},[s("span",null,"checkout featureB")]),n(`
`),s("span",{class:"line"},[s("span",null,"commit")]),n(`
`),s("span",{class:"line"},[s("span",null,"checkout main")]),n(`
`),s("span",{class:"line"},[s("span",null,"merge hotfix")]),n(`
`),s("span",{class:"line"},[s("span",null,"checkout featureB")]),n(`
`),s("span",{class:"line"},[s("span",null,"commit")]),n(`
`),s("span",{class:"line"},[s("span",null,"checkout develop")]),n(`
`),s("span",{class:"line"},[s("span",null,"branch featureA")]),n(`
`),s("span",{class:"line"},[s("span",null,"commit")]),n(`
`),s("span",{class:"line"},[s("span",null,"checkout develop")]),n(`
`),s("span",{class:"line"},[s("span",null,"merge hotfix")]),n(`
`),s("span",{class:"line"},[s("span",null,"checkout featureA")]),n(`
`),s("span",{class:"line"},[s("span",null,"commit")]),n(`
`),s("span",{class:"line"},[s("span",null,"checkout featureB")]),n(`
`),s("span",{class:"line"},[s("span",null,"commit")]),n(`
`),s("span",{class:"line"},[s("span",null,"checkout develop")]),n(`
`),s("span",{class:"line"},[s("span",null,"merge featureA")]),n(`
`),s("span",{class:"line"},[s("span",null,"branch release")]),n(`
`),s("span",{class:"line"},[s("span",null,"checkout release")]),n(`
`),s("span",{class:"line"},[s("span",null,"commit")]),n(`
`),s("span",{class:"line"},[s("span",null,"checkout main")]),n(`
`),s("span",{class:"line"},[s("span",null,"commit")]),n(`
`),s("span",{class:"line"},[s("span",null,"checkout release")]),n(`
`),s("span",{class:"line"},[s("span",null,"merge main")]),n(`
`),s("span",{class:"line"},[s("span",null,"checkout develop")]),n(`
`),s("span",{class:"line"},[s("span",null,"merge release")]),n(`
`),s("span",{class:"line"},[s("span",null,"```")])])]),s("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1)])]),_:1}),e(c,{title:"C4C 图表"},{content:a(()=>[e(i,{code:"eJytlMFu2zAMhu99CiKnFMg2rN1xGBDHbrFDgG7pzgXtMIlQWwokeUkw9N1HybKtxN6Gbb3YEP2J/PmL1uLDQklLR3sFYIUtCVYnY6mCEIa1wK3GCjZKw2cOaUkWEpTPQm4De8V7H0gbJadFbayqSM9nMGmhRYjBfMLRObQMqA3YHUHO3AwOwu5g77Ng6WOARaFqac3byfWwQjJWIYnIp+xoO3oxRi883fQwbV5zJ/wXbXr1ZakOpmvBgFXwXdABhGSDKrRCScBc1da1JvR5IzNAuYYKnwn2eKoo9DZsLh2Tm/7Ovo+5fvfpTyZyocz1ttfC0FPC8TXq0zR/H8q1kck1/HBwa06aezObRcbwErlfngoasWhllSYDWJatwoIDXowDh0Z1ZrI9nVFWozRYOIxXZIugv5UUqb+5UH/j5Tv08nAjV8OUz/0IDMh4uAKZNO6bZvV3owvwcqa9N9PNZfamQlGGzK7KI2cWfgY53VIUWhm1sZAdix3KLQHFG9oK7UmFxPEEhQ5SSNFijob+uRVfqXf+9sL5W5eYz7QfotjbLzXVFOTdDeXdgQf+y+azUpHN98Ny969Q7oWf/mQT8ZXK+PKLbpNvhoznG6j/0v9OHTIGuBFZkVybcO7G/2TLx4eLHczFt+/ZFr6mmP4Juk31kg=="})]),code:a(()=>[...l[15]||(l[15]=[s("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[s("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[s("code",{class:"language-"},[s("span",{class:"line"},[s("span",null,"```c4c")]),n(`
`),s("span",{class:"line"},[s("span",null,"title System Context diagram for Internet Banking System")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,'Person(customerA, "Banking Customer A", "A customer of the bank, with personal bank accounts.")')]),n(`
`),s("span",{class:"line"},[s("span",null,'Person(customerB, "Banking Customer B")')]),n(`
`),s("span",{class:"line"},[s("span",null,'Person_Ext(customerC, "Banking Customer C")')]),n(`
`),s("span",{class:"line"},[s("span",null,'System(SystemAA, "Internet Banking System", "Allows customers to view information about their bank accounts, and make payments.")')]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,'Person(customerD, "Banking Customer D", "A customer of the bank, <br/> with personal bank accounts.")')]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,'Enterprise_Boundary(b1, "BankBoundary") {')]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,'  SystemDb_Ext(SystemE, "Mainframe Banking System", "Stores all of the core banking information about customers, accounts, transactions, etc.")')]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,'  System_Boundary(b2, "BankBoundary2") {')]),n(`
`),s("span",{class:"line"},[s("span",null,'    System(SystemA, "Banking System A")')]),n(`
`),s("span",{class:"line"},[s("span",null,'    System(SystemB, "Banking System B", "A system of the bank, with personal bank accounts.")')]),n(`
`),s("span",{class:"line"},[s("span",null,"  }")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,'  System_Ext(SystemC, "E-mail system", "The internal Microsoft Exchange e-mail system.")')]),n(`
`),s("span",{class:"line"},[s("span",null,'  SystemDb(SystemD, "Banking System D Database", "A system of the bank, with personal bank accounts.")')]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,'  Boundary(b3, "BankBoundary3", "boundary") {')]),n(`
`),s("span",{class:"line"},[s("span",null,'    SystemQueue(SystemF, "Banking System F Queue", "A system of the bank, with personal bank accounts.")')]),n(`
`),s("span",{class:"line"},[s("span",null,'    SystemQueue_Ext(SystemG, "Banking System G Queue", "A system of the bank, with personal bank accounts.")')]),n(`
`),s("span",{class:"line"},[s("span",null,"  }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,'BiRel(customerA, SystemAA, "Uses")')]),n(`
`),s("span",{class:"line"},[s("span",null,'BiRel(SystemAA, SystemE, "Uses")')]),n(`
`),s("span",{class:"line"},[s("span",null,'Rel(SystemAA, SystemC, "Sends e-mails", "SMTP")')]),n(`
`),s("span",{class:"line"},[s("span",null,'Rel(SystemC, customerA, "Sends e-mails to")')]),n(`
`),s("span",{class:"line"},[s("span",null,"```")])])]),s("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1)])]),_:1}),e(c,{title:"思维导图"},{content:a(()=>[e(i,{code:"eJxVj7sOwjAMRXe+wmM7IMTGgFjowgBUKmJ3G7eJSOIqDwR8PVUflG4+x76WbZQVBtsVgGMOSXKPlDvyPk07BXCNAbiGkl89AmRUY9QBgiRDowO44LNE98NCCfrnDN0DziymwGm7s2NZELpKzsklZlwNZl862BzKN6BuWCvsJ47RBzbqM629LW5KJLc0fAGQ69go6+dmxaZlSzb4aaSTRqzJSrRVl/sC1WpI8w=="})]),code:a(()=>[...l[16]||(l[16]=[s("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[s("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[s("code",{class:"language-"},[s("span",{class:"line"},[s("span",null,"```mindmap")]),n(`
`),s("span",{class:"line"},[s("span",null,"root((VuePress))")]),n(`
`),s("span",{class:"line"},[s("span",null,"  Out of box")]),n(`
`),s("span",{class:"line"},[s("span",null,"    Default theme")]),n(`
`),s("span",{class:"line"},[s("span",null,"      Navbar")]),n(`
`),s("span",{class:"line"},[s("span",null,"      Sidebar")]),n(`
`),s("span",{class:"line"},[s("span",null,"      Dark Mode")]),n(`
`),s("span",{class:"line"},[s("span",null,"    I18n")]),n(`
`),s("span",{class:"line"},[s("span",null,"    Search")]),n(`
`),s("span",{class:"line"},[s("span",null,"      Search")]),n(`
`),s("span",{class:"line"},[s("span",null,"      DocSearch<br />by algolia")]),n(`
`),s("span",{class:"line"},[s("span",null,"  Customize")]),n(`
`),s("span",{class:"line"},[s("span",null,"    Theme")]),n(`
`),s("span",{class:"line"},[s("span",null,"      (hope)")]),n(`
`),s("span",{class:"line"},[s("span",null,"    Plugins")]),n(`
`),s("span",{class:"line"},[s("span",null,"      (components)")]),n(`
`),s("span",{class:"line"},[s("span",null,"      (md-enhance)")]),n(`
`),s("span",{class:"line"},[s("span",null,"```")])])]),s("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1)])]),_:1}),e(c,{title:"时间线"},{content:a(()=>[e(i,{code:"eJx1kM9qwzAMxu99Cj2AN5p0YzDGoPtz6GGXrrCz46iJwLaCLW/k7ad4HYzAfBKSvp++z0IBPUXcAAiJRzhdGsBnOMS+ZElkPRzxk30R4qibGd1SQXMn41W7lREcRilp1tnyLroZmust3MObdaMS02zgwwommPgLk4F3QRvgoUuPtbEWt1X86vVYIkei8kNUeVQ7jkOnW4sJjIPCjV7JGabEfanm1rTdHxpHctnAM4epKFDLfREOdhWvbbL8l+ym4n78oBg4csdSqb+95QNPmnvIa+1t1e6T0FlzaRpSifc0YHQa5IkG6K1Ys3vRPDpTxuYb3KCNDQ=="})]),code:a(()=>[...l[17]||(l[17]=[s("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[s("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[s("code",{class:"language-"},[s("span",{class:"line"},[s("span",null,"```timeline")]),n(`
`),s("span",{class:"line"},[s("span",null,"title Timeline of Industrial Revolution")]),n(`
`),s("span",{class:"line"},[s("span",null,"section 17th-20th century")]),n(`
`),s("span",{class:"line"},[s("span",null,"    Industry 1.0 : Machinery, Water power, Steam <br>power")]),n(`
`),s("span",{class:"line"},[s("span",null,"    Industry 2.0 : Electricity, Internal combustion engine, Mass production")]),n(`
`),s("span",{class:"line"},[s("span",null,"    Industry 3.0 : Electronics, Computers, Automation")]),n(`
`),s("span",{class:"line"},[s("span",null,"section 21st century")]),n(`
`),s("span",{class:"line"},[s("span",null,"    Industry 4.0 : Internet, Robotics, Internet of Things")]),n(`
`),s("span",{class:"line"},[s("span",null,"    Industry 5.0 : Artificial intelligence, Big data,3D printing")]),n(`
`),s("span",{class:"line"},[s("span",null,"```")])])]),s("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1)])]),_:1}),e(c,{title:"桑基图"},{content:a(()=>[e(i,{code:"eJyNVsly00AQvesrdIKL0sy+HNkKKCBJseU8sQZ7Clkykhzw39OjzY4lkpyi9Ou9X/e4ceUvf7i49a1LXq7rsNoX7b52Rfr8j2ta/zx7FaqLVVXe+boJVZlRJkAzm5yJP4Xf+5BnBKTVM6xqGt9kTIFR7Bz8WhVoxwwBzmbgO9dkhgIVIiI/975Iw3ZX1W0zBuQyIlvXNBPSe0TgdYVljNL4T0YpKKJ6oPaNr+8wrw5RHKzqTQYHWoLUNHkTmha70qYb79pQrrMPZb5H0SGjBBS3c4X3/d/UlXm6qtAXfl/g13br61VA/4yBJPKphptqi0kKBdSI5G3hV9EotIcUh5VnV9iqdO1LX6NtVaYvUv+3L5gSAULyuclDYSjlOF21YMRQd5oL0ziTudLUGi4YUGznTONL5fK0rV3ZxCQzrkEjX2ZqRyL6DKug7KlVnHRZEDDSzA0HNkoFytKFDF0oTjLUyNmFHn4K600X/lnqdrsiuHLlm/vxLQFCluL/x7QfgOUgrEiQ+BNzL9e4BViNpraTT8TtAMOAcR6Bx1tCgOLmRtWhCRQEoZ3g28bXW9yKI5UyKikYbFGETwfCgFjVSad5CwPY6ne+ans32axqDYTy5D6L3rOM4ZCQAPflQ3IKmGAInZNmtDnkdTUPpMBamQzX4birjAJR6ihvfV12ZWLNzSbsdnEBKTNIilHpLCzlEgxelQF9E8fVhlXq7sLQr7hvZjnEpMQIlqX0qHXaVw5KjPLL0bBEy3VvyjkwOvk/42ncEp58dnUofeqKtfPnh1sA1zLpOBNnR/EKWcmSy/2q8K5eIoDhFqw2yRVGGsmI35nEy8KM7uQTGSNACe4z4REY77PCk2ttchWJkXYvynBecf9k9HECnCWscfdocr3f7nze3ciHLxduDsHL9bj+yUJoPOGaJZiRq9PrH3M2SewAbkivMLTokTRwvLw3iJWemC1AGPIY4YwOyHLTpYbyheEIErd5wI+LqEBonSzoz0tj+MBxuqQ7LKA2eObxYCxozN4ubfH9RtWQL22/xc1gyfePaRF7dusanNBtqKK/9WH2CwNPGnbkxt35uSdsYjwkN6HM5yAzmAVu+T+rqOo0"})]),code:a(()=>[...l[18]||(l[18]=[s("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[s("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[s("code",{class:"language-"},[s("span",{class:"line"},[s("span",null,"```sankey")]),n(`
`),s("span",{class:"line"},[s("span",null,"Agricultural 'waste',Bio-conversion,124.729")]),n(`
`),s("span",{class:"line"},[s("span",null,"Bio-conversion,Liquid,0.597")]),n(`
`),s("span",{class:"line"},[s("span",null,"Bio-conversion,Losses,26.862")]),n(`
`),s("span",{class:"line"},[s("span",null,"Bio-conversion,Solid,280.322")]),n(`
`),s("span",{class:"line"},[s("span",null,"Bio-conversion,Gas,81.144")]),n(`
`),s("span",{class:"line"},[s("span",null,"Biofuel imports,Liquid,35")]),n(`
`),s("span",{class:"line"},[s("span",null,"Biomass imports,Solid,35")]),n(`
`),s("span",{class:"line"},[s("span",null,"Coal imports,Coal,11.606")]),n(`
`),s("span",{class:"line"},[s("span",null,"Coal reserves,Coal,63.965")]),n(`
`),s("span",{class:"line"},[s("span",null,"Coal,Solid,75.571")]),n(`
`),s("span",{class:"line"},[s("span",null,"District heating,Industry,10.639")]),n(`
`),s("span",{class:"line"},[s("span",null,"District heating,Heating and cooling - commercial,22.505")]),n(`
`),s("span",{class:"line"},[s("span",null,"District heating,Heating and cooling - homes,46.184")]),n(`
`),s("span",{class:"line"},[s("span",null,"Electricity grid,Over generation / exports,104.453")]),n(`
`),s("span",{class:"line"},[s("span",null,"Electricity grid,Heating and cooling - homes,113.726")]),n(`
`),s("span",{class:"line"},[s("span",null,"Electricity grid,H2 conversion,27.14")]),n(`
`),s("span",{class:"line"},[s("span",null,"Electricity grid,Industry,342.165")]),n(`
`),s("span",{class:"line"},[s("span",null,"Electricity grid,Road transport,37.797")]),n(`
`),s("span",{class:"line"},[s("span",null,"Electricity grid,Agriculture,4.412")]),n(`
`),s("span",{class:"line"},[s("span",null,"Electricity grid,Heating and cooling - commercial,40.858")]),n(`
`),s("span",{class:"line"},[s("span",null,"Electricity grid,Losses,56.691")]),n(`
`),s("span",{class:"line"},[s("span",null,"Electricity grid,Rail transport,7.863")]),n(`
`),s("span",{class:"line"},[s("span",null,"Electricity grid,Lighting & appliances - commercial,90.008")]),n(`
`),s("span",{class:"line"},[s("span",null,"Electricity grid,Lighting & appliances - homes,93.494")]),n(`
`),s("span",{class:"line"},[s("span",null,"Gas imports,Ngas,40.719")]),n(`
`),s("span",{class:"line"},[s("span",null,"Gas reserves,Ngas,82.233")]),n(`
`),s("span",{class:"line"},[s("span",null,"Gas,Heating and cooling - commercial,0.129")]),n(`
`),s("span",{class:"line"},[s("span",null,"Gas,Losses,1.401")]),n(`
`),s("span",{class:"line"},[s("span",null,"Gas,Thermal generation,151.891")]),n(`
`),s("span",{class:"line"},[s("span",null,"Gas,Agriculture,2.096")]),n(`
`),s("span",{class:"line"},[s("span",null,"Gas,Industry,48.58")]),n(`
`),s("span",{class:"line"},[s("span",null,"Geothermal,Electricity grid,7.013")]),n(`
`),s("span",{class:"line"},[s("span",null,"H2 conversion,H2,20.897")]),n(`
`),s("span",{class:"line"},[s("span",null,"H2 conversion,Losses,6.242")]),n(`
`),s("span",{class:"line"},[s("span",null,"H2,Road transport,20.897")]),n(`
`),s("span",{class:"line"},[s("span",null,"Hydro,Electricity grid,6.995")]),n(`
`),s("span",{class:"line"},[s("span",null,"Liquid,Industry,121.066")]),n(`
`),s("span",{class:"line"},[s("span",null,"Liquid,International shipping,128.69")]),n(`
`),s("span",{class:"line"},[s("span",null,"Liquid,Road transport,135.835")]),n(`
`),s("span",{class:"line"},[s("span",null,"Liquid,Domestic aviation,14.458")]),n(`
`),s("span",{class:"line"},[s("span",null,"Liquid,International aviation,206.267")]),n(`
`),s("span",{class:"line"},[s("span",null,"Liquid,Agriculture,3.64")]),n(`
`),s("span",{class:"line"},[s("span",null,"Liquid,National navigation,33.218")]),n(`
`),s("span",{class:"line"},[s("span",null,"Liquid,Rail transport,4.413")]),n(`
`),s("span",{class:"line"},[s("span",null,"Marine algae,Bio-conversion,4.375")]),n(`
`),s("span",{class:"line"},[s("span",null,"Ngas,Gas,122.952")]),n(`
`),s("span",{class:"line"},[s("span",null,"Nuclear,Thermal generation,839.978")]),n(`
`),s("span",{class:"line"},[s("span",null,"Oil imports,Oil,504.287")]),n(`
`),s("span",{class:"line"},[s("span",null,"Oil reserves,Oil,107.703")]),n(`
`),s("span",{class:"line"},[s("span",null,"Oil,Liquid,611.99")]),n(`
`),s("span",{class:"line"},[s("span",null,"Other waste,Solid,56.587")]),n(`
`),s("span",{class:"line"},[s("span",null,"Other waste,Bio-conversion,77.81")]),n(`
`),s("span",{class:"line"},[s("span",null,"Pumped heat,Heating and cooling - homes,193.026")]),n(`
`),s("span",{class:"line"},[s("span",null,"Pumped heat,Heating and cooling - commercial,70.672")]),n(`
`),s("span",{class:"line"},[s("span",null,"Solar PV,Electricity grid,59.901")]),n(`
`),s("span",{class:"line"},[s("span",null,"Solar Thermal,Heating and cooling - homes,19.263")]),n(`
`),s("span",{class:"line"},[s("span",null,"Solar,Solar Thermal,19.263")]),n(`
`),s("span",{class:"line"},[s("span",null,"Solar,Solar PV,59.901")]),n(`
`),s("span",{class:"line"},[s("span",null,"Solid,Agriculture,0.882")]),n(`
`),s("span",{class:"line"},[s("span",null,"Solid,Thermal generation,400.12")]),n(`
`),s("span",{class:"line"},[s("span",null,"Solid,Industry,46.477")]),n(`
`),s("span",{class:"line"},[s("span",null,"Thermal generation,Electricity grid,525.531")]),n(`
`),s("span",{class:"line"},[s("span",null,"Thermal generation,Losses,787.129")]),n(`
`),s("span",{class:"line"},[s("span",null,"Thermal generation,District heating,79.329")]),n(`
`),s("span",{class:"line"},[s("span",null,"Tidal,Electricity grid,9.452")]),n(`
`),s("span",{class:"line"},[s("span",null,"UK land based bioenergy,Bio-conversion,182.01")]),n(`
`),s("span",{class:"line"},[s("span",null,"Wave,Electricity grid,19.013")]),n(`
`),s("span",{class:"line"},[s("span",null,"Wind,Electricity grid,289.366")]),n(`
`),s("span",{class:"line"},[s("span",null,"```")])])]),s("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1)])]),_:1}),e(c,{title:"依赖图"},{content:a(()=>[e(i,{code:"eJxNTjsKwzAM3X0KXSCFrh469R7F0JdYNE5aSyk1JXePYkjwIul9UcZn4YyESe8chhySI2pIUog+jKC/Cfz0dLWt+KknjahyhZc9x/LyFHmIBr7I3JcEjbOldp+Rq7OBsam2g7XUdi1veBJOyxiU5+nwt76OxDTpGULd7fzObcv+Q4w="})]),code:a(()=>[...l[19]||(l[19]=[s("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[s("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[s("code",{class:"language-"},[s("span",{class:"line"},[s("span",null,"```requirement")]),n(`
`),s("span",{class:"line"},[s("span",null,"requirement test_req {")]),n(`
`),s("span",{class:"line"},[s("span",null,"id: 1")]),n(`
`),s("span",{class:"line"},[s("span",null,"text: the test text.")]),n(`
`),s("span",{class:"line"},[s("span",null,"risk: high")]),n(`
`),s("span",{class:"line"},[s("span",null,"verifymethod: test")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"element test_entity {")]),n(`
`),s("span",{class:"line"},[s("span",null,"type: simulation")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"test_entity - satisfies -> test_req")]),n(`
`),s("span",{class:"line"},[s("span",null,"```")])])]),s("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1)])]),_:1}),e(c,{title:"象限图"},{content:a(()=>[e(i,{code:"eJxtz81ygjAUBeC9T3EeoHGoYLFddKaldrpou+imC8fFVa6QGUgQguLbG4IKzLhMvnP/9jXFJSkTpVSaCWCkyRh/TNsUpGKwSijhnJWB3mFLeUEyUZVNNoIaWeFbHy9xIV7xJZO0e9rEqU8s+za3WP9ns9c9xCP+GVWq68wObwq7w1Bn+GWOYTSKUufa8BB9O1nwgbKaxhDgh07YMGRuyw7ctowup+DtBStv6j/Amz6th/DuIJi3MvNHFDmah67oeUQfjsJFS34womXX0LtDn90Sbla4WE/OPo17Fw=="})]),code:a(()=>[...l[20]||(l[20]=[s("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[s("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[s("code",{class:"language-"},[s("span",{class:"line"},[s("span",null,"```quadrant")]),n(`
`),s("span",{class:"line"},[s("span",null,"title Reach and engagement of campaigns")]),n(`
`),s("span",{class:"line"},[s("span",null,"x-axis Low Reach --> High Reach")]),n(`
`),s("span",{class:"line"},[s("span",null,"y-axis Low Engagement --> High Engagement")]),n(`
`),s("span",{class:"line"},[s("span",null,"quadrant-1 We should expand")]),n(`
`),s("span",{class:"line"},[s("span",null,"quadrant-2 Need to promote")]),n(`
`),s("span",{class:"line"},[s("span",null,"quadrant-3 Re-evaluate")]),n(`
`),s("span",{class:"line"},[s("span",null,"quadrant-4 May be improved")]),n(`
`),s("span",{class:"line"},[s("span",null,"Campaign A: [0.3, 0.6]")]),n(`
`),s("span",{class:"line"},[s("span",null,"Campaign B: [0.45, 0.23]")]),n(`
`),s("span",{class:"line"},[s("span",null,"Campaign C: [0.57, 0.69]")]),n(`
`),s("span",{class:"line"},[s("span",null,"Campaign D: [0.78, 0.34]")]),n(`
`),s("span",{class:"line"},[s("span",null,"Campaign E: [0.40, 0.34]")]),n(`
`),s("span",{class:"line"},[s("span",null,"Campaign F: [0.35, 0.78]")]),n(`
`),s("span",{class:"line"},[s("span",null,"```")])])]),s("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1)])]),_:1}),e(c,{title:"XY 图"},{content:a(()=>[e(i,{code:"eJytjM0OgkAMhO/7FBPiQZOSgPEHLz6EHgmHglUhsBDYJfD2LovxCbx8nem0M83Fm3sT5mJYmdLUguDOtQy4ySjaSqCmkKdyQFqxJjwlJzTcE7hzaHgmVNYFla3dzr4Ig3SEtjAE3Y6EhxSZmteO4FuKbamx2QU4RFGEMLwijp1SOfdIj04RTp5nZwjJfuHF6zhax3K/uDXyTHxy/r1nqi61/LXwA9LrSs8="})]),code:a(()=>[...l[21]||(l[21]=[s("div",{class:"language-","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[s("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[s("code",{class:"language-"},[s("span",{class:"line"},[s("span",null,"```xy")]),n(`
`),s("span",{class:"line"},[s("span",null,'title "Sales Revenue"')]),n(`
`),s("span",{class:"line"},[s("span",null,"x-axis [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec]")]),n(`
`),s("span",{class:"line"},[s("span",null,'y-axis "Revenue (in $)" 4000 --> 11000')]),n(`
`),s("span",{class:"line"},[s("span",null,"bar [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]")]),n(`
`),s("span",{class:"line"},[s("span",null,"line [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]")]),n(`
`),s("span",{class:"line"},[s("span",null,"```")])])])],-1)])]),_:1}),e(c,{title:"块图"},{content:a(()=>[e(i,{code:"eJxLyslPztZNSi1J5ErOzynNzStWMOZ62tn7fPV6BbCcY1FRfrlniplNtJKCUqydRlFmekaJpsLTCX1AJVzFBYnJqVZGCin55XkwFSC2JtfzhWuez56hkJOaVgKTALE1FVwSSxKTEotTozWUnk3d8Kx33dNdk5U0Y7m4knMSi4tdUtMU0ory80oU0jJzcqyUzSzNdIpLivKzU62UjY2NrRGqkhKTs6GKLM0ssShScAOZk5qXAjEQKugE1AYU04E5A2wOFwC7sV83"})]),code:a(()=>[...l[22]||(l[22]=[s("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[s("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[s("code",{class:"language-"},[s("span",{class:"line"},[s("span",null,"```block")]),n(`
`),s("span",{class:"line"},[s("span",null,"columns 3")]),n(`
`),s("span",{class:"line"},[s("span",null,'前端 blockArrowId6<[" "]>(right) 后端')]),n(`
`),s("span",{class:"line"},[s("span",null,'space:2 down<[" "]>(down)')]),n(`
`),s("span",{class:"line"},[s("span",null,'硬盘 left<[" "]>(left) Database[("数据库")]')]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"classDef front fill:#696,stroke:#333;")]),n(`
`),s("span",{class:"line"},[s("span",null,"classDef back fill:#969,stroke:#333;")]),n(`
`),s("span",{class:"line"},[s("span",null,"class Frontend front")]),n(`
`),s("span",{class:"line"},[s("span",null,"class Backend,Database back")]),n(`
`),s("span",{class:"line"},[s("span",null,"```")])])]),s("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1)])]),_:1}),e(c,{title:"容器图"},{content:a(()=>[e(i,{code:"eJwtjTsOwjAQRPs9heUKipUINubT4pLCEuIAG2tFrAQbORvOj4ko5z3NzJviyII9C4EkmVg9fFBhpbDD7nBR+l6WGlmFUkVD59B0DXqeJWWSVPLfmD3aYzM3zk8ZNNgTOtPydeA4zstLg7N4/g16ElKbD9VEfXuc1sJWwxfndSnl"})]),code:a(()=>[...l[23]||(l[23]=[s("div",{class:"language-","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[s("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[s("code",{class:"language-"},[s("span",{class:"line"},[s("span",null,"```packet")]),n(`
`),s("span",{class:"line"},[s("span",null,"title UDP Packet")]),n(`
`),s("span",{class:"line"},[s("span",null,'0-15: "Source Port"')]),n(`
`),s("span",{class:"line"},[s("span",null,'16-31: "Destination Port"')]),n(`
`),s("span",{class:"line"},[s("span",null,'32-47: "Length"')]),n(`
`),s("span",{class:"line"},[s("span",null,'48-63: "Checksum"')]),n(`
`),s("span",{class:"line"},[s("span",null,'64-95: "Data (variable length)"')]),n(`
`),s("span",{class:"line"},[s("span",null,"```")])])])],-1)])]),_:1}),e(c,{title:"雷达图"},{content:a(()=>[e(i,{code:"eJxNzz0PwiAQBuCdX3GpKzXQ2oXNr64OGvcropLU1gAaTdP/LlCNwALPC5e7PM+J7LuzvggCYPCEJhwA8KXtXmKrapSuNwLYvKhiIh/mqQ6qs7rvAnOv7qpuSkCDVv1uRzQam1bZqZ6MxZiAbFbXzK8sYR6YsRCkXEwcgomT/r597O4otXv7PkgYhcQXeaMc+ldhBlhSWFFYU9hQ2HqM30DygdOClnRBq/GvxVB5KX3CEy2H0lvcI/kAJOhRSQ=="})]),code:a(()=>[...l[24]||(l[24]=[s("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[s("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[s("code",{class:"language-"},[s("span",{class:"line"},[s("span",null,"```radar")]),n(`
`),s("span",{class:"line"},[s("span",null,"---")]),n(`
`),s("span",{class:"line"},[s("span",null,"config:")]),n(`
`),s("span",{class:"line"},[s("span",null,"  radar:")]),n(`
`),s("span",{class:"line"},[s("span",null,"    axisScaleFactor: 0.25")]),n(`
`),s("span",{class:"line"},[s("span",null,"    curveTension: 0.1")]),n(`
`),s("span",{class:"line"},[s("span",null,"  theme: base")]),n(`
`),s("span",{class:"line"},[s("span",null,"  themeVariables:")]),n(`
`),s("span",{class:"line"},[s("span",null,'    cScale0: "#FF0000"')]),n(`
`),s("span",{class:"line"},[s("span",null,'    cScale1: "#00FF00"')]),n(`
`),s("span",{class:"line"},[s("span",null,'    cScale2: "#0000FF"')]),n(`
`),s("span",{class:"line"},[s("span",null,"    radar:")]),n(`
`),s("span",{class:"line"},[s("span",null,"      curveOpacity: 0")]),n(`
`),s("span",{class:"line"},[s("span",null,"---")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"axis A, B, C, D, E")]),n(`
`),s("span",{class:"line"},[s("span",null,"curve c1{1,2,3,4,5}")]),n(`
`),s("span",{class:"line"},[s("span",null,"curve c2{5,4,3,2,1}")]),n(`
`),s("span",{class:"line"},[s("span",null,"curve c3{3,3,3,3,3}")]),n(`
`),s("span",{class:"line"},[s("span",null,"```")])])]),s("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1)])]),_:1}),e(c,{title:"一个复杂的案例"},{content:a(()=>[e(i,{code:"eJx9UstOwzAQvPcrFiGkFBqQWoREgSAoFy4gATfEYWtvEgvXDrajUiF+iq/hc9jYgUIP+OTHzOzOjiuHTQ0PlwPg5V8e719adAS+xoaeIM8LECrLZsoJ3d8Oh4MEbueJfBGP3bKyuJWyJ+c5PCwtaGXodO4OCpIVgbCLBZkQhZ39IUr1dqVwYY2EpQo1REKkwtwRPr9Dvh8Z2Z1tjSTJgMLHVuMu9vVL7eyscHb8DWZfa1MJRkYmFzs7cGODEgShxgDGQqDXAMokNHQ8lJ1ITbxVxgdCmcDKAzYNS/Fr2brACJB2aVKF6NHKSXFHqPUKtDVVEo8W1+Y6B1wPDayH99PcLA2MK5UhyrdzDqIhJ7oxelUZn8pl2bUxjDjgwLqwOlXkeXq7IG5DdjMtfENCoQZRo0PBgn44jH2W2Wj/fGsv3/386OMVK/c4WzmltRKcZcHn8eZHOElQEBq9v6ISKkdkoGTSdPu4PBr54OwzTbcnk0m/z5dKhno6bl5PNrjWoeEfksjl8T/kw79kjndEqfTvW6l6ycEXT1TpbQ=="})]),code:a(()=>[...l[25]||(l[25]=[s("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[s("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[s("code",{class:"language-"},[s("span",{class:"line"},[s("span",null,"```mermaid")]),n(`
`),s("span",{class:"line"},[s("span",null,"graph TB")]),n(`
`),s("span",{class:"line"},[s("span",null,"    sq[Square shape] --> ci((Circle shape))")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"    subgraph A")]),n(`
`),s("span",{class:"line"},[s("span",null,"        od>Odd shape]-- Two line<br/>edge comment --> ro")]),n(`
`),s("span",{class:"line"},[s("span",null,"        di{Diamond with <br/> line break} -.-> ro(Rounded<br>square<br>shape)")]),n(`
`),s("span",{class:"line"},[s("span",null,"        di==>ro2(Rounded square shape)")]),n(`
`),s("span",{class:"line"},[s("span",null,"    end")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"    %% Notice that no text in shape are added here instead that is appended further down")]),n(`
`),s("span",{class:"line"},[s("span",null,"    e --> od3>Really long text with line break<br>in an Odd shape]")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"    %% Comments after double percent signs")]),n(`
`),s("span",{class:"line"},[s("span",null,"    e((Inner / circle<br>and some odd <br>special characters)) --> f(,.?!+-*ز)")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"    cyr[Cyrillic]-->cyr2((Circle shape));")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"     classDef green fill:#9f6,stroke:#333,stroke-width:2px;")]),n(`
`),s("span",{class:"line"},[s("span",null,"     classDef orange fill:#f96,stroke:#333,stroke-width:4px;")]),n(`
`),s("span",{class:"line"},[s("span",null,"     class sq,e green")]),n(`
`),s("span",{class:"line"},[s("span",null,"     class di orange")]),n(`
`),s("span",{class:"line"},[s("span",null,"```")])])]),s("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1)])]),_:1})])}const A=o(b,[["render",g]]),y=JSON.parse('{"path":"/zh/plugins/markdown/markdown-chart/mermaid.html","title":"Mermaid","lang":"zh-CN","frontmatter":{"icon":"chart-pie","description":"Mermaid 让你的 VuePress 站点中的 Markdown 文件支持 Mermaid。 安装 在你的项目中安装 Mermaid： 然后通过以下方式启用： .vuepress/config.ts 语法 除了使用 mermaid 代码块，你也可以直接使用以下代码块： class: classDiagram c4c: C4Context er: e...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Mermaid\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-07-08T18:38:42.000Z\\",\\"author\\":[]}"],["meta",{"property":"og:url","content":"https://ecosystem.vuejs.press/ecosystem/zh/plugins/markdown/markdown-chart/mermaid.html"}],["meta",{"property":"og:site_name","content":"VuePress 生态系统"}],["meta",{"property":"og:title","content":"Mermaid"}],["meta",{"property":"og:description","content":"Mermaid 让你的 VuePress 站点中的 Markdown 文件支持 Mermaid。 安装 在你的项目中安装 Mermaid： 然后通过以下方式启用： .vuepress/config.ts 语法 除了使用 mermaid 代码块，你也可以直接使用以下代码块： class: classDiagram c4c: C4Context er: e..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:locale:alternate","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2025-07-08T18:38:42.000Z"}],["meta",{"property":"article:modified_time","content":"2025-07-08T18:38:42.000Z"}],["link",{"rel":"alternate","hreflang":"en-us","href":"https://ecosystem.vuejs.press/ecosystem/plugins/markdown/markdown-chart/mermaid.html"}],["link",{"rel":"alternate","type":"application/atom+xml","href":"https://ecosystem.vuejs.press/ecosystem/zh/atom.xml","title":"VuePress 生态系统 Atom Feed"}],["link",{"rel":"alternate","type":"application/json","href":"https://ecosystem.vuejs.press/ecosystem/zh/feed.json","title":"VuePress 生态系统 JSON Feed"}],["link",{"rel":"alternate","type":"application/rss+xml","href":"https://ecosystem.vuejs.press/ecosystem/zh/rss.xml","title":"VuePress 生态系统 RSS Feed"}]]},"git":{"updatedTime":1751999922000,"contributors":[{"name":"Mister-Hope","username":"Mister-Hope","email":"mister-hope@outlook.com","commits":2,"avatar":"https://avatars.githubusercontent.com/Mister-Hope?v=4","url":"https://github.com/Mister-Hope"}],"changelog":[{"hash":"ba7bb2e8c053f59475f11480c3d09a60ffd47451","time":1751999922000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"feat(plugin-markdown-chart): support treemap chart (#548)"},{"hash":"7f5fdff8c26f865b21697b3c6d29bb49d9b20ba4","time":1749285836000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"feat: add plugin-markdown-chart (#249)"}]},"autoDesc":true,"filePathRelative":"zh/plugins/markdown/markdown-chart/mermaid.md"}');export{A as comp,y as data};
