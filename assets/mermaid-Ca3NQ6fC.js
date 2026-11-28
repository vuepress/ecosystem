import{B as e,G as t,K as n,L as r,R as i,V as a,W as o,j as s,z as c}from"./app-U3LxVFgh.js";var l=JSON.parse(`{"path":"/zh/plugins/markdown/markdown-chart/mermaid.html","title":"Mermaid","lang":"zh-CN","frontmatter":{"icon":"chart-pie","description":"Mermaid 让你的 VuePress 站点中的 Markdown 文件支持 Mermaid。 安装 在你的项目中安装 Mermaid： 然后通过以下方式启用： .vuepress/config.ts 语法 除了使用 mermaid 代码块，你也可以直接使用以下代码块： block: block class: classDiagram c4c: C4...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Mermaid\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-09-28T04:40:43.000Z\\",\\"author\\":[]}"],["meta",{"property":"og:url","content":"https://ecosystem.vuejs.press/ecosystem/zh/plugins/markdown/markdown-chart/mermaid.html"}],["meta",{"property":"og:site_name","content":"VuePress 生态系统"}],["meta",{"property":"og:title","content":"Mermaid"}],["meta",{"property":"og:description","content":"Mermaid 让你的 VuePress 站点中的 Markdown 文件支持 Mermaid。 安装 在你的项目中安装 Mermaid： 然后通过以下方式启用： .vuepress/config.ts 语法 除了使用 mermaid 代码块，你也可以直接使用以下代码块： block: block class: classDiagram c4c: C4..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:locale:alternate","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2026-09-28T04:40:43.000Z"}],["meta",{"property":"article:modified_time","content":"2026-09-28T04:40:43.000Z"}],["link",{"rel":"alternate","hreflang":"en-us","href":"https://ecosystem.vuejs.press/ecosystem/plugins/markdown/markdown-chart/mermaid.html"}],["link",{"rel":"alternate","type":"application/atom+xml","href":"https://ecosystem.vuejs.press/ecosystem/zh/atom.xml","title":"VuePress 生态系统 Atom Feed"}],["link",{"rel":"alternate","type":"application/json","href":"https://ecosystem.vuejs.press/ecosystem/zh/feed.json","title":"VuePress 生态系统 JSON Feed"}],["link",{"rel":"alternate","type":"application/rss+xml","href":"https://ecosystem.vuejs.press/ecosystem/zh/rss.xml","title":"VuePress 生态系统 RSS Feed"}]]},"git":{"updatedTime":1790570443000,"contributors":[{"name":"Mister-Hope","username":"Mister-Hope","email":"mister-hope@outlook.com","commits":4,"avatar":"https://avatars.githubusercontent.com/Mister-Hope?v=4","url":"https://github.com/Mister-Hope"}],"changelog":[{"hash":"d715a57864b9929e2dfc5ac22f4cc956f0340dec","time":1790570443000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"docs: rebuild docs (#925)"},{"hash":"81aaaa9473762792300d45a47f98104bf78355af","time":1789043140000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"feat(plugin-markdown-chart): support mermaid v12 (#847)"},{"hash":"ba7bb2e8c053f59475f11480c3d09a60ffd47451","time":1751999922000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"feat(plugin-markdown-chart): support treemap chart (#548)"},{"hash":"7f5fdff8c26f865b21697b3c6d29bb49d9b20ba4","time":1749285836000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"feat: add plugin-markdown-chart (#249)"}]},"autoDesc":true,"filePathRelative":"zh/plugins/markdown/markdown-chart/mermaid.md"}`),u={name:`mermaid.md`};function d(s,l,u,d,f,p){let m=t(`VPCodeTabs`),h=t(`Mermaid`,!0),g=t(`VPPreview`);return o(),i(`div`,null,[l[28]||=c(`<h1 id="mermaid" tabindex="-1"><a class="header-anchor" href="#mermaid"><span>Mermaid</span></a></h1><p>让你的 VuePress 站点中的 Markdown 文件支持 <a href="https://mermaid.js.org/" target="_blank" rel="noopener noreferrer">Mermaid</a>。</p><h2 id="installation" tabindex="-1"><a class="header-anchor" href="#installation"><span>安装</span></a></h2><p>在你的项目中安装 <a href="https://mermaid.js.org/" target="_blank" rel="noopener noreferrer">Mermaid</a>：</p>`,4),a(m,{data:[{id:`pnpm`},{id:`yarn`},{id:`npm`}],"tab-id":`shell`},{title0:n(({value:t,isActive:n})=>[...l[0]||=[e(`pnpm`,-1)]]),title1:n(({value:t,isActive:n})=>[...l[1]||=[e(`yarn`,-1)]]),title2:n(({value:t,isActive:n})=>[...l[2]||=[e(`npm`,-1)]]),tab0:n(({value:e,isActive:t})=>[...l[3]||=[r(`div`,{class:`language-bash`,"data-highlighter":`shiki`,"data-ext":`bash`,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-bash`},[r(`span`,{class:`line`},[r(`span`,{style:{"--shiki-light":`#4078F2`,"--shiki-dark":`#61AFEF`}},`pnpm`),r(`span`,{style:{"--shiki-light":`#50A14F`,"--shiki-dark":`#98C379`}},` add`),r(`span`,{style:{"--shiki-light":`#986801`,"--shiki-dark":`#D19A66`}},` -D`),r(`span`,{style:{"--shiki-light":`#50A14F`,"--shiki-dark":`#98C379`}},` mermaid`)])])])],-1)]]),tab1:n(({value:e,isActive:t})=>[...l[4]||=[r(`div`,{class:`language-bash`,"data-highlighter":`shiki`,"data-ext":`bash`,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-bash`},[r(`span`,{class:`line`},[r(`span`,{style:{"--shiki-light":`#4078F2`,"--shiki-dark":`#61AFEF`}},`yarn`),r(`span`,{style:{"--shiki-light":`#50A14F`,"--shiki-dark":`#98C379`}},` add`),r(`span`,{style:{"--shiki-light":`#986801`,"--shiki-dark":`#D19A66`}},` -D`),r(`span`,{style:{"--shiki-light":`#50A14F`,"--shiki-dark":`#98C379`}},` mermaid`)])])])],-1)]]),tab2:n(({value:e,isActive:t})=>[...l[5]||=[r(`div`,{class:`language-bash`,"data-highlighter":`shiki`,"data-ext":`bash`,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-bash`},[r(`span`,{class:`line`},[r(`span`,{style:{"--shiki-light":`#4078F2`,"--shiki-dark":`#61AFEF`}},`npm`),r(`span`,{style:{"--shiki-light":`#50A14F`,"--shiki-dark":`#98C379`}},` i`),r(`span`,{style:{"--shiki-light":`#986801`,"--shiki-dark":`#D19A66`}},` -D`),r(`span`,{style:{"--shiki-light":`#50A14F`,"--shiki-dark":`#98C379`}},` mermaid`)])])])],-1)]]),_:1}),l[29]||=c(`<p>然后通过以下方式启用：</p><div class="code-block-with-title"><div class="code-block-title-bar" data-title=".vuepress/config.ts"><span>.vuepress/config.ts</span></div><div class="language-ts line-numbers-mode" data-highlighter="shiki" data-ext="ts" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-ts"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">markdownChartPlugin</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;@vuepress/plugin-markdown-chart&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">export</span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD;"> default</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  plugins</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> [</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    markdownChartPlugin</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">({</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">      // 启用 Mermaid</span></span>
<span class="line highlighted"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">      mermaid</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> true</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }),</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  ],</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><h2 id="syntax" tabindex="-1"><a class="header-anchor" href="#syntax"><span>语法</span></a></h2><div class="language-md" data-highlighter="shiki" data-ext="md" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-md"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">\`\`\`mermaid</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;!-- 在此处放置 mermaid 代码 --&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">\`\`\`</span></span></code></pre></div><p>除了使用 mermaid 代码块，你也可以直接使用以下代码块：</p><ul><li>block: <code>block</code></li><li>class: <code>classDiagram</code></li><li>c4c: <code>C4Context</code></li><li>er: <code>erDiagram</code></li><li>gantt: <code>gantt</code></li><li>git-graph: <code>gitGraph</code></li><li>journey: <code>journey</code></li><li>mindmap: <code>mindmap</code></li><li>kanban: <code>kanban</code></li><li>packet: <code>packet</code></li><li>pie: <code>pie</code></li><li>quadrant: <code>quadrantChart</code></li><li>requirement: <code>requirementDiagram</code></li><li>sankey: <code>sankey</code></li><li>sequence: <code>sequenceDiagram</code></li><li>state: <code>stateDiagram-v2</code></li><li>timeline: <code>timeline</code></li><li>agentflow: <code>agentflow-beta</code></li><li>architecture: <code>architecture-beta</code></li><li>ishikawa: <code>ishikawa-beta</code></li><li>radar: <code>radar-beta</code></li><li>treemap: <code>treemap-beta</code></li><li>treeview: <code>treeView-beta</code></li><li>usecase: <code>usecase-beta</code></li><li>venn: <code>venn-beta</code></li><li>wardley: <code>wardley-beta</code></li><li>xy: <code>xychart</code></li></ul><p>你不需要再声明图表类型，也不需要缩进图表代码。</p><p>当图表支持设置标题时，你可以直接在代码块信息后添加标题:</p><div class="language-md" data-highlighter="shiki" data-ext="md" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-md"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">\`\`\`sequence 代码标题</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">顺序图代码内容</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">...</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">\`\`\`</span></span></code></pre></div><h2 id="usage" tabindex="-1"><a class="header-anchor" href="#usage"><span>使用</span></a></h2><p>详见 <a href="https://mermaid.js.org/" target="_blank" rel="noopener noreferrer">mermaid 官方文档</a>。</p><h2 id="advanced" tabindex="-1"><a class="header-anchor" href="#advanced"><span>高级</span></a></h2><p>你可以在<a href="https://vuejs.press/zh/guide/configuration.html#%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6" target="_blank" rel="noopener noreferrer">客户端配置文件</a>中导入并使用 <code>defineMermaidConfig</code> 来自定义 Mermaid 配置:</p><div class="code-block-with-title"><div class="code-block-title-bar" data-title=".vuepress/client.ts"><span>.vuepress/client.ts</span></div><div class="language-ts" data-highlighter="shiki" data-ext="ts" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-ts"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">defineClientConfig</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;vuepress/client&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">defineMermaidConfig</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">({</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">  // 在此设置 mermaid 选项</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">})</span></span></code></pre></div></div><h2 id="demo" tabindex="-1"><a class="header-anchor" href="#demo"><span>例子</span></a></h2>`,15),a(g,{title:`流程图`},{content:n(()=>[a(h,{code:`eJzT1dXlKsksyUm1UnDLyS9PzkgsKuECCabBeAohTlwKQJBsqKtrl2gEZheXJqUXJRZkKOTnpYIFEpEkU/NSUBWVlOeDBZJAipJwKcooSoWYBbYoGVUZ0B4FoCjcKLBqVJHyfDAfqBEAuj83LQ==`})]),code:n(()=>[...l[6]||=[r(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-`},[r(`span`,{class:`line`},[r(`span`,null,"```mermaid")]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`---`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`title: Flowchart`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`---`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`flowchart TB`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    c1-->a2`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    subgraph one`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    a1-->a2`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    end`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    subgraph two`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    b1-->b2`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    end`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    subgraph three`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    c1-->c2`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    end`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    one --> two`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    three --> two`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    two --> c2`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,"```")])])]),r(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`})])],-1)]]),_:1}),a(g,{title:`循序图`},{content:n(()=>[a(h,{code:`eJxtkL1OxDAQhPs8xdCfQx+hIH4kfgp6Sie3Z1vneIW9UcLbsw7hkBDdaubzeHeMMY0EidThKRNJSK40VWwKfcyURnoM1mU7NcBdDCPB9D3ueejwTDFyHQ/wvMBmwifPtwqqZhR7ZZ8Uq97As1QXVbsg63dkhxfYCY75CPE2ncvVTqwb/7//xkLIwXkBn3ZO3ygRlIBF5ORuhnzd1wESJjqg8K+sUaI0QWgVHJnKJicWnIKGJs3IvLTN5aJ92wdP41mLwhLEbz+3bfvTj9nPfqei6ub+6ecL4yd1lw==`,title:`eJxzL0pNLcnMSy8GABGsA6k=`})]),code:n(()=>[...l[7]||=[r(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-`},[r(`span`,{class:`line`},[r(`span`,null,"```sequence Greetings")]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Alice ->> Bob: Hello Bob, how are you?`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Bob-->>John: How about you John?`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Bob--x Alice: I am good thanks!`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Bob-x John: I am good thanks!`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Note right of John: Bob thinks a long<br/>long time, so long<br/>that the text does<br/>not fit on a row.`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Bob-->Alice: Checking with John...`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Alice->John: Yes... John, how are you?`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,"```")])])]),r(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`})])],-1)]]),_:1}),a(g,{title:`类图`},{content:n(()=>[a(h,{code:`eJxdkMtOxDAMRff9CqsrEOoPjNggZiqxYMUOISG39WSsOsmQpAzPfyePUpjubo6vr+00TVMFDkIbuDGsUWD3hvooVKVK1Qt6v2VUDnUFYGwgqFtnNWynfoTAIvBIncM6VueA66+myeXfhr11xV73aGAv708mCX9iXdTAr1TUgeQIHAl1k1Js1Dq3ZX9YoTz/j23gik0AVHTGHoKLcaDIDOSWSjL7e9RRXlz+pxoDZZJ/IK//GV+wBHWE460Vm7IiTcdkf9QvE/ZjfnwvAWnvEtCk7Tx/0J1piUJh8fYdhlVPPmye2lkrwP75xDIU4iYz+38AvwSIcw==`,title:`eJxzzMvMTcxRcK1IzC3ISQUAJjwFPw==`})]),code:n(()=>[...l[8]||=[r(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-`},[r(`span`,{class:`line`},[r(`span`,null,"```class Animal Example")]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`note "From Duck till Zebra"`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Animal <|-- Duck`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`note for Duck "can fly\\ncan swim\\ncan dive\\ncan help in debugging"`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Animal <|-- Fish`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Animal <|-- Zebra`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Animal : +int age`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Animal : +String gender`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Animal: +isMammal()`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Animal: +mate()`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`class Duck{`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  +String beakColor`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  +swim()`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  +quack()`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`}`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`class Fish{`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  -int sizeInFeet`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  -canEat()`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`}`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`class Zebra{`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  +bool is_wild`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  +run()`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`}`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,"```")])])]),r(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`})])],-1)]]),_:1}),a(g,{title:`状态图`},{content:n(()=>[a(h,{code:`eJxdjrEKwkAQRPv7iqmFBbGU8xpFsLOwE5HjWJPFmEBuzfe7OTWEdLvzZoYhIqeiDW+xrzk9IQ+0kIyWq6gysBsdLmtUPkis+viiYeMcUCSz37+H96nuJHEIxq6rG4gCTvncZSk1mD2F/ZNGppJRP8Ym25qyw2O9xJf+zfjhsDP+AfL5Oro=`,title:`eJxzzkhNzlbITFPIU8gsVshLTU8sySxLBQBVogfL`})]),code:n(()=>[...l[9]||=[r(`div`,{class:`language-`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-`},[r(`span`,{class:`line`},[r(`span`,null,"```state Check if n is negative")]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`state if_state <<choice>>`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`[*] --> IsPositive`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`IsPositive --> if_state`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`if_state --> False: if n < 0`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`if_state --> True : if n >= 0`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,"```")])])])],-1)]]),_:1}),a(g,{title:`关系图`},{content:n(()=>[a(h,{code:`eJx1jcEKwjAMhu99irxAX2C34XrwYJUK3iPGEmxXySoK297dFnbZYIGQ5MvP/2utVeYcqAEjYH4Y34FUpYqkY/SCUQEcWgfTpHUawbYn0+nOHW/GQQMYQvoOi2Qss9aQhXsPQp7LiplTbz/xTrL+R3zRhqQHhYLm0hfjrme7E8s1clFsUp8sQ7YYN9YBV5T7DOjrNas/3tBLQA==`,title:`eJxzLVJwrUjMLchJBQASlwOk`})]),code:n(()=>[...l[10]||=[r(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-`},[r(`span`,{class:`line`},[r(`span`,null,"```er Er Example")]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`CAR ||--o{ NAMED-DRIVER : allows`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`CAR {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    string registrationNumber`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    string make`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    string model`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`}`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`PERSON ||--o{ NAMED-DRIVER : is`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`PERSON {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    string firstName`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    string lastName`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    int age`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`}`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,"```")])])]),r(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`})])],-1)]]),_:1}),a(g,{title:`用户日记图`},{content:n(()=>[a(h,{code:`eJxVzD0OgzAMhuG9p/gO0KWqumRtpU6ZegKrWGB+YpQYIW4PBAFifT77rXWIgacbYGItw08YNTYSShS0cuK/iQZ8FaZ5WxDw1DCMyeHl4DnbcjL0yUhicnge/NneHB4r3fEmu3Yr7Y5AoWPYE2f5J5aX3WYBdjXD`})]),code:n(()=>[...l[11]||=[r(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-`},[r(`span`,{class:`line`},[r(`span`,null,"```journey")]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`title My working day`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`section Go to work`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  Make tea: 5: Me`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  Go upstairs: 3: Me`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  Do work: 1: Me, Cat`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`section Go home`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  Go downstairs: 5: Me`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  Sit down: 5: Me`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,"```")])])]),r(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`})])],-1)]]),_:1}),a(g,{title:`甘特图`},{content:n(()=>[a(h,{code:`eJyVU01v2zAMvfdXEAYKtIAzxGk2dLkFCToMWHfqZbeqEp0ItaVAorfm34+UP2A3adHqJJt6j4+P5E45ogsAowjvfKgVAfzhM7u/n223HCBLFUJ71sZYt4Mf698PD2Cs2gVVQ9k4TdY7VVk6AnmokWmsYSy+6KoxGAX7D/EZnYn8+/ISrh772CMorfFAEeIBtS2tTloiWDcSAmXSlnPsGMGXQHtMlHCVxcbx3+wafICsT5Pl8NQQOE/tUx9MGxSC7Mv1BeuImITDur/xv42vDxUSGiAVn7u601kZ7zCXG6sucljMi+VsXszm3/LhessMa6b6iydwYVApxBzMsBgxfM/hRvy6a6gJ56HDjaE3OaiSMHQ0X19BF+9AlyMo0zB05MMmWLJaVYlFGvXKDO6IeKn7Z5V1CCv55L4kc8aeLPfM8FMIanQEBxUi5z1zJgyDOnFYCtsE5HEAnggeEZ6Cc0QdQ2/viZcsfCp6iksGnuQJPEYYJplWSRFvwWjMz1XEL4uJs1uvG3FBdVO2xcipnxDS+kE8cujlrWlRbMXYllSeiGjB/R6yJIO1Z392XYGrFqUKAGmN9ENgipdiL2xvAHnQ9ZCyBS9v9+NyfqnIooed+Vg1bQWJ+uMVfEK1aPwPxhRkQQ==`})]),code:n(()=>[...l[12]||=[r(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-`},[r(`span`,{class:`line`},[r(`span`,null,"```gantt")]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`dateFormat  YYYY-MM-DD`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`title       Adding GANTT diagram functionality to mermaid`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`excludes    weekends`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,'%% (`excludes` accepts specific dates in YYYY-MM-DD format, days of the week ("sunday") or "weekends", but not the word "weekdays".)')]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`section A section`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Completed task            :done,    des1, 2014-01-06,2014-01-08`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Active task               :active,  des2, 2014-01-09, 3d`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Future task               :         des3, after des2, 5d`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Future task2              :         des4, after des3, 5d`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`section Critical tasks`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Completed task in the critical line :crit, done, 2014-01-06,24h`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Implement parser                    :crit, done, after des1, 2d`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Create tests for parser             :crit, active, 3d`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Future task in critical line        :crit, 5d`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Create tests for renderer           :2d`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Add to mermaid                      :1d`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`section Documentation`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Describe gantt syntax               :active, a1, after des1, 3d`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Add gantt diagram to demo page      :after a1  , 20h`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Add another diagram to demo page    :doc1, after a1  , 48h`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`section Last section`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Describe gantt syntax               :after doc1, 3d`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Add gantt diagram to demo page      :20h`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Add another diagram to demo page    :48h`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,"```")])])]),r(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`})])],-1)]]),_:1}),a(g,{title:`饼图`},{content:n(()=>[a(h,{code:`eJwryEzlUlAoySzJSVUIz0gsUQjLz0lJzc0vKlFIyU8tzlMvUchILEu1BypSUFByC/J09XMJVlKwUjCCijj6evpEggSMIQJ+/sGuIK6JKRcA9yEXxA==`})]),code:n(()=>[...l[13]||=[r(`div`,{class:`language-`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-`},[r(`span`,{class:`line`},[r(`span`,null,"```pie")]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`title What Voldemort doesn't have?`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  "FRIENDS" : 2`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  "FAMILY" : 3`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  "NOSE" : 45`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,"```")])])])],-1)]]),_:1}),a(g,{title:`Git 图表`},{content:n(()=>[a(h,{code:`eJyNUUEOgjAQvPuKhmdww4SACWqCxnspC22klJRi9Pci1bAiFg5NNrMzs5NpKUykacM3hDAlpTD9kGlaM064MoW4vxYc2FV1BiETag43qFSDuQgayETkvkdb7hFDy37KmDfqC6Cm07DFBhizDubRgB/vojjp3xlzJRW1I6hVHo7pPkicGQdeGl7C9BQ6s8wcl6BLmCnNqR0TfDcRLLAXjs3LVyax3sjpHU1DBbQFLELQv1p+F6PIXpp+3jTJh/8EoXrlcg==`})]),code:n(()=>[...l[14]||=[r(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-`},[r(`span`,{class:`line`},[r(`span`,null,"```git-graph")]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`commit`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`branch hotfix`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`checkout hotfix`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`commit`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`branch develop`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`checkout develop`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`commit id:"ash" tag:"abc"`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`branch featureB`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`checkout featureB`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`commit type:HIGHLIGHT`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`checkout main`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`checkout hotfix`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`commit type:NORMAL`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`checkout develop`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`commit type:REVERSE`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`checkout featureB`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`commit`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`checkout main`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`merge hotfix`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`checkout featureB`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`commit`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`checkout develop`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`branch featureA`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`commit`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`checkout develop`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`merge hotfix`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`checkout featureA`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`commit`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`checkout featureB`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`commit`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`checkout develop`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`merge featureA`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`branch release`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`checkout release`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`commit`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`checkout main`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`commit`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`checkout release`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`merge main`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`checkout develop`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`merge release`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,"```")])])]),r(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`})])],-1)]]),_:1}),a(g,{title:`C4C 图表`},{content:n(()=>[a(h,{code:`eJytlMFu2zAMhu99CiKnFMg2rN1xGBDHbrFDgG7pzgXtMIlQWwokeUkw9N1HybKtxN6Gbb3YEP2J/PmL1uLDQklLR3sFYIUtCVYnY6mCEIa1wK3GCjZKw2cOaUkWEpTPQm4De8V7H0gbJadFbayqSM9nMGmhRYjBfMLRObQMqA3YHUHO3AwOwu5g77Ng6WOARaFqac3byfWwQjJWIYnIp+xoO3oxRi883fQwbV5zJ/wXbXr1ZakOpmvBgFXwXdABhGSDKrRCScBc1da1JvR5IzNAuYYKnwn2eKoo9DZsLh2Tm/7Ovo+5fvfpTyZyocz1ttfC0FPC8TXq0zR/H8q1kck1/HBwa06aezObRcbwErlfngoasWhllSYDWJatwoIDXowDh0Z1ZrI9nVFWozRYOIxXZIugv5UUqb+5UH/j5Tv08nAjV8OUz/0IDMh4uAKZNO6bZvV3owvwcqa9N9PNZfamQlGGzK7KI2cWfgY53VIUWhm1sZAdix3KLQHFG9oK7UmFxPEEhQ5SSNFijob+uRVfqXf+9sL5W5eYz7QfotjbLzXVFOTdDeXdgQf+y+azUpHN98Ny969Q7oWf/mQT8ZXK+PKLbpNvhoznG6j/0v9OHTIGuBFZkVybcO7G/2TLx4eLHczFt+/ZFr6mmP4Juk31kg==`})]),code:n(()=>[...l[15]||=[r(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-`},[r(`span`,{class:`line`},[r(`span`,null,"```c4c")]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`title System Context diagram for Internet Banking System`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Person(customerA, "Banking Customer A", "A customer of the bank, with personal bank accounts.")`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Person(customerB, "Banking Customer B")`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Person_Ext(customerC, "Banking Customer C")`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`System(SystemAA, "Internet Banking System", "Allows customers to view information about their bank accounts, and make payments.")`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Person(customerD, "Banking Customer D", "A customer of the bank, <br/> with personal bank accounts.")`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Enterprise_Boundary(b1, "BankBoundary") {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  SystemDb_Ext(SystemE, "Mainframe Banking System", "Stores all of the core banking information about customers, accounts, transactions, etc.")`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  System_Boundary(b2, "BankBoundary2") {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    System(SystemA, "Banking System A")`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    System(SystemB, "Banking System B", "A system of the bank, with personal bank accounts.")`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  }`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  System_Ext(SystemC, "E-mail system", "The internal Microsoft Exchange e-mail system.")`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  SystemDb(SystemD, "Banking System D Database", "A system of the bank, with personal bank accounts.")`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  Boundary(b3, "BankBoundary3", "boundary") {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    SystemQueue(SystemF, "Banking System F Queue", "A system of the bank, with personal bank accounts.")`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    SystemQueue_Ext(SystemG, "Banking System G Queue", "A system of the bank, with personal bank accounts.")`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  }`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`}`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`BiRel(customerA, SystemAA, "Uses")`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`BiRel(SystemAA, SystemE, "Uses")`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Rel(SystemAA, SystemC, "Sends e-mails", "SMTP")`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Rel(SystemC, customerA, "Sends e-mails to")`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,"```")])])]),r(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`})])],-1)]]),_:1}),a(g,{title:`思维导图`},{content:n(()=>[a(h,{code:`eJxVj7sOwjAMRXe+wmM7IMTGgFjowgBUKmJ3G7eJSOIqDwR8PVUflG4+x76WbZQVBtsVgGMOSXKPlDvyPk07BXCNAbiGkl89AmRUY9QBgiRDowO44LNE98NCCfrnDN0DziymwGm7s2NZELpKzsklZlwNZl862BzKN6BuWCvsJ47RBzbqM629LW5KJLc0fAGQ69go6+dmxaZlSzb4aaSTRqzJSrRVl/sC1WpI8w==`})]),code:n(()=>[...l[16]||=[r(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-`},[r(`span`,{class:`line`},[r(`span`,null,"```mindmap")]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`root((VuePress))`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  Out of box`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    Default theme`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      Navbar`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      Sidebar`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      Dark Mode`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    I18n`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    Search`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      Search`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      DocSearch<br />by algolia`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  Customize`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    Theme`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      (hope)`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    Plugins`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      (components)`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      (md-enhance)`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,"```")])])]),r(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`})])],-1)]]),_:1}),a(g,{title:`时间线`},{content:n(()=>[a(h,{code:`eJx1kM9qwzAMxu99Cj2AN5p0YzDGoPtz6GGXrrCz46iJwLaCLW/k7ad4HYzAfBKSvp++z0IBPUXcAAiJRzhdGsBnOMS+ZElkPRzxk30R4qibGd1SQXMn41W7lREcRilp1tnyLroZmust3MObdaMS02zgwwommPgLk4F3QRvgoUuPtbEWt1X86vVYIkei8kNUeVQ7jkOnW4sJjIPCjV7JGabEfanm1rTdHxpHctnAM4epKFDLfREOdhWvbbL8l+ym4n78oBg4csdSqb+95QNPmnvIa+1t1e6T0FlzaRpSifc0YHQa5IkG6K1Ys3vRPDpTxuYb3KCNDQ==`})]),code:n(()=>[...l[17]||=[r(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-`},[r(`span`,{class:`line`},[r(`span`,null,"```timeline")]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`title Timeline of Industrial Revolution`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`section 17th-20th century`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    Industry 1.0 : Machinery, Water power, Steam <br>power`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    Industry 2.0 : Electricity, Internal combustion engine, Mass production`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    Industry 3.0 : Electronics, Computers, Automation`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`section 21st century`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    Industry 4.0 : Internet, Robotics, Internet of Things`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    Industry 5.0 : Artificial intelligence, Big data,3D printing`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,"```")])])]),r(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`})])],-1)]]),_:1}),a(g,{title:`桑基图`},{content:n(()=>[a(h,{code:`eJyNVsly00AQvesrdIKLaGZfjmwFFCFJseU8sQZ7Clkykhzw39OjzY4lkpyi9Ou9X/e4ceUvf0hereuw2hftvnZF+vyPa1r/PHsdqherqrzzdROqMqNMgGY2ORNfhN/7kGcEpNUzrGoa32RMgVHsHPxaFWjHDAHOZuB712SGAhUiIj/3vkjDdlfVbTMG5DIiW9c0E9J7ROBNhWWM0vhPRikoonqg9o2v7zCvDlEcrOpNBgdagtQ0eRuaFrvSphvv2lCus49lvkfRIaMEFLdzhQ/939SVebqq0Bd+v8Cv7dbXq4D+GQNJ5FMNN9UWkxQKqBHJu8KvolFoDykOK8+usFXp2pe+RtuqTF+m/m9fMCUChORzk4fCUMpxumrBiKHuNBemcSZzpak1XDCg2M6ZxpfK5Wlbu7KJSWZcg0a+zNSORPQZVkHZU6s46bIgYKSZGw5slAqUpQsZulCcZKiRsws9vAjrTRf+Wep2uyK4cuWb+/EtAUKW4v/HtB+A5SCsSJD4E3Mv17gFWI2mtpNPxO0Aw4BxHoHHW0KA4uZG1aEJFAShneDbxtdb3IojlTIqKRhsUYRPB8KAWNVJp3kLA9jq975qezfZrGoNhPLkPos+sIzhkJAA9+VDcgqYYAidk2a0OeR1NQ+kwFqZDNfhuKuMAlHqKG99XXZlYs3NJux2cQEpM0iKUeksLOUSDF6VAX0bx9WGVeruwtCvuG9mOcSkxAiWpfSoddpXDkqM8svRsETLdW/KOTA6+T/jadwSnnx2dSh96oq18+eHWwDXMuk4E2dH8QpZyZLL/arwrl4igOEWrDbJFUYayYjfmcTLwozu5BMZI0AJ7jPhERjvs8KTa21yFYmRdi/KcF5x/2T0cQKcJaxx92hyvd/ufN7dyIcvF24Owcv1uP7JQmg84ZolmJGr0+sfczZJ7ABuSK8wtOiRNHC8vDeIlZ6YLUAY8hjhjA7IctOlhvKF4QgSt3nAj4uoQGidLOjPS2P4wHG6pDssoDZ45vFgLGjM3i5t8f1G1ZAvbb/FzWDJ909pEXt26xqc0G2oor/1YfYLA08aduTG3fm5J2xiPCQ3ocznIDOYBW75P+pK6Gs=`})]),code:n(()=>[...l[18]||=[r(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-`},[r(`span`,{class:`line`},[r(`span`,null,"```sankey")]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Agricultural 'waste',Bio-conversion,124.729`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Bio-conversion,Liquid,0.597`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Bio-conversion,Losses,26.862`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Bio-conversion,Solid,280.322`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Bio-conversion,Gas,81.144`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Biofuel imports,Liquid,35`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Biomass imports,Solid,35`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Coal imports,Coal,11.606`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Coal reserves,Coal,63.965`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Coal,Solid,75.571`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`District heating,Industry,10.639`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`District heating,Heating and cooling - commercial,22.505`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`District heating,Heating and cooling - homes,46.184`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Electricity grid,Over generation / exports,104.453`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Electricity grid,Heating and cooling - homes,113.726`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Electricity grid,H2 conversion,27.14`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Electricity grid,Industry,342.165`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Electricity grid,Road transport,37.797`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Electricity grid,Agriculture,4.412`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Electricity grid,Heating and cooling - commercial,40.858`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Electricity grid,Losses,56.691`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Electricity grid,Rail transport,7.863`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Electricity grid,Lighting & appliances - commercial,90.008`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Electricity grid,Lighting & appliances - homes,93.494`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Gas imports,Ngas,40.719`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Gas reserves,Ngas,82.233`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Gas,Heating and cooling - commercial,0.129`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Gas,Losses,1.401`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Gas,Thermal generation,151.891`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Gas,Agriculture,2.096`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Gas,Industry,48.58`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Geothermal,Electricity grid,7.013`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`H2 conversion,H2,20.897`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`H2 conversion,Losses,6.242`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`H2,Road transport,20.897`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Hydro,Electricity grid,6.995`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Liquid,Industry,121.066`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Liquid,International shipping,128.69`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Liquid,Road transport,135.835`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Liquid,Domestic aviation,14.458`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Liquid,International aviation,206.267`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Liquid,Agriculture,3.64`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Liquid,National navigation,33.218`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Liquid,Rail transport,4.413`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Marine algae,Bio-conversion,4.375`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Ngas,Gas,122.952`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Nuclear,Thermal generation,839.978`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Oil imports,Oil,504.287`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Oil reserves,Oil,107.703`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Oil,Liquid,611.99`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Other waste,Solid,56.587`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Other waste,Bio-conversion,77.81`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Pumped heat,Heating and cooling - homes,193.026`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Pumped heat,Heating and cooling - commercial,70.672`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Solar PV,Electricity grid,59.901`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Solar Thermal,Heating and cooling - homes,19.263`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Solar,Solar Thermal,19.263`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Solar,Solar PV,59.901`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Solid,Agriculture,0.882`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Solid,Thermal generation,400.12`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Solid,Industry,46.477`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Thermal generation,Electricity grid,525.531`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Thermal generation,Losses,787.129`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Thermal generation,District heating,79.329`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Tidal,Electricity grid,9.452`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`UK land based bioenergy,Bio-conversion,182.01`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Wave,Electricity grid,19.013`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Wind,Electricity grid,289.366`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,"```")])])]),r(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`})])],-1)]]),_:1}),a(g,{title:`依赖图`},{content:n(()=>[a(h,{code:`eJxNTjsKwzAM3X0KXSCFrh469R7F0JdYNE5aSyk1JXePYkjwIul9UcZn4YyESe8chhySI2pIUog+jKC/Cfz0dLWt+KknjahyhZc9x/LyFHmIBr7I3JcEjbOldp+Rq7OBsam2g7XUdi1veBJOyxiU5+nwt76OxDTpGULd7fzObcv+Q4w=`})]),code:n(()=>[...l[19]||=[r(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-`},[r(`span`,{class:`line`},[r(`span`,null,"```requirement")]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`requirement test_req {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`id: 1`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`text: the test text.`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`risk: high`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`verifymethod: test`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`}`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`element test_entity {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`type: simulation`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`}`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`test_entity - satisfies -> test_req`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,"```")])])]),r(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`})])],-1)]]),_:1}),a(g,{title:`象限图`},{content:n(()=>[a(h,{code:`eJxtz81ygjAUBeC9T3EeoHGoYLFddKaldrpou+imC8fFVa6QGUgQguLbG4IKzLhMvnP/9jXFJSkTpVSaCWCkyRh/TNsUpGKwSijhnJWB3mFLeUEyUZVNNoIaWeFbHy9xIV7xJZO0e9rEqU8s+za3WP9ns9c9xCP+GVWq68wObwq7w1Bn+GWOYTSKUufa8BB9O1nwgbKaxhDgh07YMGRuyw7ctowup+DtBStv6j/Amz6th/DuIJi3MvNHFDmah67oeUQfjsJFS34womXX0LtDn90Sbla4WE/OPo17Fw==`})]),code:n(()=>[...l[20]||=[r(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-`},[r(`span`,{class:`line`},[r(`span`,null,"```quadrant")]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`title Reach and engagement of campaigns`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`x-axis Low Reach --> High Reach`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`y-axis Low Engagement --> High Engagement`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`quadrant-1 We should expand`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`quadrant-2 Need to promote`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`quadrant-3 Re-evaluate`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`quadrant-4 May be improved`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Campaign A: [0.3, 0.6]`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Campaign B: [0.45, 0.23]`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Campaign C: [0.57, 0.69]`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Campaign D: [0.78, 0.34]`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Campaign E: [0.40, 0.34]`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Campaign F: [0.35, 0.78]`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,"```")])])]),r(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`})])],-1)]]),_:1}),a(g,{title:`XY 图`},{content:n(()=>[a(h,{code:`eJytjM0OgjAQhO99ignxoMmSgPEHLz6EHgmHgquWlEKgJfD2lmJ8Ai/fzuzszjRXb9lbYZXVjOguNQ+48cjGcSSmWE5qQF5LQ3hySWhkT5CdRyNnQu18UDvtd+5FGLgjtJUlmHYkPLgqxLx2RN9SbJXBZhfhkCQJ4viKNPVKlLJHfvSKcAo8e0PI9gsvQafJOpb7xa1RYBaS8++9EFoZ/mvhB7ddSQY=`})]),code:n(()=>[...l[21]||=[r(`div`,{class:`language-`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-`},[r(`span`,{class:`line`},[r(`span`,null,"```xy")]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`title "Sales Revenue"`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`x-axis [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec]`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`y-axis "Revenue (in $)" 4000 --> 11000`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`bar [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`line [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,"```")])])])],-1)]]),_:1}),a(g,{title:`块图`},{content:n(()=>[a(h,{code:`eJxLyslPzuZKzs8pzc0rVjDmetrZ+3z1egWwsGNRUX65Z4qZTbSSglKsnUZRZnpGiabC0wl9QCVcxQWJyalWRgop+eV5MBUgtibX84Vrns+eoZCTmlYCkwCxNRVcEksSkxKLU6M1lJ5N3fCsd93TXZOVNGO5uJJzEouLXVLTFNKK8vNKFNIyc3KslM0szXSKS4rys1OtlI2Nja0RqpISk7OhiizNLLEoUnADmZOalwIxECroBNQGFNOBOQNsDhcA6NFdbg==`})]),code:n(()=>[...l[22]||=[r(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-`},[r(`span`,{class:`line`},[r(`span`,null,"```block")]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`columns 3`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`前端 blockArrowId6<[" "]>(right) 后端`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`space:2 down<[" "]>(down)`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`硬盘 left<[" "]>(left) Database[("数据库")]`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`classDef front fill:#696,stroke:#333;`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`classDef back fill:#969,stroke:#333;`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`class Frontend front`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`class Backend,Database back`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,"```")])])]),r(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`})])],-1)]]),_:1}),a(g,{title:`容器图`},{content:n(()=>[a(h,{code:`eJwrSEzOTi3hKsksyUlVCHUJUAiACBjoGppaKSgF55cWJacqBOQXlShxGZrpGhsCBV1Si0sy8xJLMvPzoDLGRrom5kAZn9S89JIMJS4TC10zYyDfOSM1Obu4NFeJy8xE1xJkoEtiSaKCRlliUWZiEtDGHLAGTSUuAO4WKBw=`})]),code:n(()=>[...l[23]||=[r(`div`,{class:`language-`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-`},[r(`span`,{class:`line`},[r(`span`,null,"```packet")]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`title UDP Packet`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`0-15: "Source Port"`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`16-31: "Destination Port"`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`32-47: "Length"`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`48-63: "Checksum"`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`64-95: "Data (variable length)"`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,"```")])])])],-1)]]),_:1}),a(g,{title:`雷达图`},{content:n(()=>[a(h,{code:`eJxNzz0PwiAQBuCdX3GpKzXQ2oXNr64OGvcropLU1gAaTdP/LlCNwALPC5e7PM+J7LuzvggCYPCEJhwA8KXtXmKrapSuNwLYvKhiIh/mqQ6qs7rvAnOv7qpuSkCDVv1uRzQam1bZqZ6MxZiAbFbXzK8sYR6YsRCkXEwcgomT/r597O4otXv7PkgYhcQXeaMc+ldhBlhSWFFYU9hQ2HqM30DygdOClnRBq/GvxVB5KX3CEy2H0lvcI/kAJOhRSQ==`})]),code:n(()=>[...l[24]||=[r(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-`},[r(`span`,{class:`line`},[r(`span`,null,"```radar")]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`---`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`config:`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  radar:`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    axisScaleFactor: 0.25`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    curveTension: 0.1`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  theme: base`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  themeVariables:`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    cScale0: "#FF0000"`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    cScale1: "#00FF00"`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    cScale2: "#0000FF"`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    radar:`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      curveOpacity: 0`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`---`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`axis A, B, C, D, E`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`curve c1{1,2,3,4,5}`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`curve c2{5,4,3,2,1}`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`curve c3{3,3,3,3,3}`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,"```")])])]),r(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`})])],-1)]]),_:1}),a(g,{title:`用例图`},{content:n(()=>[a(h,{code:`eJxdj7EOwjAMRHe+wspUhvYDGDq0KxIVjIghJFapoHFkJ0L9e6I2YeiSvNydfHEUNFqwfmLQBwA7MZowkYPzNT21CcTQRwk0I1eqkDr+zVv0njhUKgPoEV1YA7JIwLmj6KzmBS5skSc33lWhnFCPFAbomL6Cldpu8Ew2miDrKID+heZNMRUVysaglzk1VmpgMigCfhNWG51NZ/k21HWba/ZqGZr0sshOLghN08IJJmc+0WKpP/wAEUxsIw==`})]),code:n(()=>[...l[25]||=[r(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-`},[r(`span`,{class:`line`},[r(`span`,null,"```usecase")]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`direction LR`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`actor Customer("Customer")`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`actor Support("Support agent")`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`systemBoundary Ordering["Ordering system"]`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  Browse("Browse products")`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  Checkout("Checkout")`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  Payment("Process payment")`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`end`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Customer --> Browse`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Customer --> Checkout`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Support --> Checkout`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Checkout ..> : include Payment`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,"```")])])]),r(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`})])],-1)]]),_:1}),a(g,{title:`智能体流程图`},{content:n(()=>[a(h,{code:`eJxVzsEOgjAMgOE7T9H0zgt4UIkH714XYioUWFg6sg2JMb67bI4Eb3/TL02pZwmdsUv54EAFQGxw/NS8sFN4SwVVZFive4BmIOnZK7xSGNhtM9bnN/iBJj6AlmkO8EmchMzLs8LqF9DqrtvjQH7M1mgJCt0s91js/pi1JjM7KrwYJjntQcuN9tpKRvktKMvj9kPqeDmFHVfH0hZftWZUtQ==`})]),code:n(()=>[...l[26]||=[r(`div`,{class:`language-`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-`},[r(`span`,{class:`line`},[r(`span`,null,"```agentflow")]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`flow reviewer["Review Agent"]`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  changes["Gather changes"]@{ shape: input }`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  analyse["Analyse diff"]@{ shape: task }`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  lint["run_linter"]@{ shape: tool }`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  ok["Clean?"]@{ shape: decision }`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  changes --> analyse --> lint --> ok`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`end`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,"```")])])])],-1)]]),_:1}),a(g,{title:`一个复杂的案例`},{content:n(()=>[a(h,{code:`eJx9UstOwzAQvPcrFiGkFBqQWoREgSAoFy4gATfEYWtvEgvXDrajUiF+iq/hc9jYgUIP+OTHzOzOjiuHTQ0PlwPg5V8e719adAS+xoaeIM8LECrLZsoJ3d8Oh4MEbueJfBGP3bKyuJWyJ+c5PCwtaGXodO4OCpIVgbCLBZkQhZ39IUr1dqVwYY2EpQo1REKkwtwRPr9Dvh8Z2Z1tjSTJgMLHVuMu9vVL7eyscHb8DWZfa1MJRkYmFzs7cGODEgShxgDGQqDXAMokNHQ8lJ1ITbxVxgdCmcDKAzYNS/Fr2brACJB2aVKF6NHKSXFHqPUKtDVVEo8W1+Y6B1wPDayH99PcLA2MK5UhyrdzDqIhJ7oxelUZn8pl2bUxjDjgwLqwOlXkeXq7IG5DdjMtfENCoQZRo0PBgn44jH2W2Wj/fGsv3/386OMVK/c4WzmltRKcZcHn8eZHOElQEBq9v6ISKkdkoGTSdPu4PBr54OwzTbcnk0m/z5dKhno6bl5PNrjWoeEfksjl8T/kw79kjndEqfTvW6l6ycEXT1TpbQ==`})]),code:n(()=>[...l[27]||=[r(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-`},[r(`span`,{class:`line`},[r(`span`,null,"```mermaid")]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`graph TB`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    sq[Square shape] --> ci((Circle shape))`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    subgraph A`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        od>Odd shape]-- Two line<br/>edge comment --> ro`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        di{Diamond with <br/> line break} -.-> ro(Rounded<br>square<br>shape)`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        di==>ro2(Rounded square shape)`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    end`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    %% Notice that no text in shape are added here instead that is appended further down`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    e --> od3>Really long text with line break<br>in an Odd shape]`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    %% Comments after double percent signs`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    e((Inner / circle<br>and some odd <br>special characters)) --> f(,.?!+-*ز)`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    cyr[Cyrillic]-->cyr2((Circle shape));`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`     classDef green fill:#9f6,stroke:#333,stroke-width:2px;`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`     classDef orange fill:#f96,stroke:#333,stroke-width:4px;`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`     class sq,e green`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`     class di orange`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,"```")])])]),r(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`})])],-1)]]),_:1})])}var f=s(u,[[`render`,d]]);export{l as _pageData,f as default};