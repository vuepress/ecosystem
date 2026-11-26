import{B as e,G as t,K as n,L as r,R as i,V as a,W as o,j as s,z as c}from"./app-Bi7MbPbM.js";var l=JSON.parse(`{"path":"/plugins/markdown/markdown-chart/chartjs.html","title":"Chart.js","lang":"en-US","frontmatter":{"icon":"chart-bar-increasing","description":"Chart.js Add Chart.js support to the Markdown files in your VuePress site. Installation Install Chart.js in your project: Then enable it via: .vuepress/config.ts Syntax You shou...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Chart.js\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-09-30T01:42:34.000Z\\",\\"author\\":[]}"],["meta",{"property":"og:url","content":"https://ecosystem.vuejs.press/plugins/markdown/markdown-chart/chartjs.html"}],["meta",{"property":"og:site_name","content":"VuePress Ecosystem"}],["meta",{"property":"og:title","content":"Chart.js"}],["meta",{"property":"og:description","content":"Chart.js Add Chart.js support to the Markdown files in your VuePress site. Installation Install Chart.js in your project: Then enable it via: .vuepress/config.ts Syntax You shou..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:locale:alternate","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-09-30T01:42:34.000Z"}],["meta",{"property":"article:modified_time","content":"2026-09-30T01:42:34.000Z"}],["link",{"rel":"alternate","hreflang":"zh-cn","href":"https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-chart/chartjs.html"}],["link",{"rel":"alternate","type":"application/atom+xml","href":"https://ecosystem.vuejs.press/atom.xml","title":"VuePress Ecosystem Atom Feed"}],["link",{"rel":"alternate","type":"application/json","href":"https://ecosystem.vuejs.press/feed.json","title":"VuePress Ecosystem JSON Feed"}],["link",{"rel":"alternate","type":"application/rss+xml","href":"https://ecosystem.vuejs.press/rss.xml","title":"VuePress Ecosystem RSS Feed"}]]},"git":{"updatedTime":1790732554000,"contributors":[{"name":"Mister-Hope","username":"Mister-Hope","email":"mister-hope@outlook.com","commits":3,"avatar":"https://avatars.githubusercontent.com/Mister-Hope?v=4","url":"https://github.com/Mister-Hope"}],"changelog":[{"hash":"b21f562e481e8c8dca8fabe12eab2470e51fc2dc","time":1790732554000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"test(plugin-markdown-chart): add unit tests (#966)"},{"hash":"795eeec15c9a889905a67ccac8f3fbee6089b4bd","time":1764135625000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"feat(plugin-markdown-chart)!: avoid potential XSS attack (#574)"},{"hash":"7f5fdff8c26f865b21697b3c6d29bb49d9b20ba4","time":1749285836000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"feat: add plugin-markdown-chart (#249)"}]},"autoDesc":true,"filePathRelative":"plugins/markdown/markdown-chart/chartjs.md"}`),u={name:`chartjs.md`};function d(s,l,u,d,f,p){let m=t(`VPCodeTabs`),h=t(`ChartJS`),g=t(`VPPreview`);return o(),i(`div`,null,[l[12]||=c(`<h1 id="chart-js" tabindex="-1"><a class="header-anchor" href="#chart-js"><span>Chart.js</span></a></h1><p>Add <a href="https://www.chartjs.org/docs/latest/" target="_blank" rel="noopener noreferrer">Chart.js</a> support to the Markdown files in your VuePress site.</p><h2 id="installation" tabindex="-1"><a class="header-anchor" href="#installation"><span>Installation</span></a></h2><p>Install <a href="https://www.chartjs.org/docs/latest/" target="_blank" rel="noopener noreferrer">Chart.js</a> in your project:</p>`,4),a(m,{data:[{id:`pnpm`},{id:`yarn`},{id:`npm`}],"tab-id":`shell`},{title0:n(({value:t,isActive:n})=>[...l[0]||=[e(`pnpm`,-1)]]),title1:n(({value:t,isActive:n})=>[...l[1]||=[e(`yarn`,-1)]]),title2:n(({value:t,isActive:n})=>[...l[2]||=[e(`npm`,-1)]]),tab0:n(({value:e,isActive:t})=>[...l[3]||=[r(`div`,{class:`language-bash`,"data-highlighter":`shiki`,"data-ext":`bash`,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-bash`},[r(`span`,{class:`line`},[r(`span`,{style:{"--shiki-light":`#4078F2`,"--shiki-dark":`#61AFEF`}},`pnpm`),r(`span`,{style:{"--shiki-light":`#50A14F`,"--shiki-dark":`#98C379`}},` add`),r(`span`,{style:{"--shiki-light":`#986801`,"--shiki-dark":`#D19A66`}},` -D`),r(`span`,{style:{"--shiki-light":`#50A14F`,"--shiki-dark":`#98C379`}},` chart.js`)])])])],-1)]]),tab1:n(({value:e,isActive:t})=>[...l[4]||=[r(`div`,{class:`language-bash`,"data-highlighter":`shiki`,"data-ext":`bash`,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-bash`},[r(`span`,{class:`line`},[r(`span`,{style:{"--shiki-light":`#4078F2`,"--shiki-dark":`#61AFEF`}},`yarn`),r(`span`,{style:{"--shiki-light":`#50A14F`,"--shiki-dark":`#98C379`}},` add`),r(`span`,{style:{"--shiki-light":`#986801`,"--shiki-dark":`#D19A66`}},` -D`),r(`span`,{style:{"--shiki-light":`#50A14F`,"--shiki-dark":`#98C379`}},` chart.js`)])])])],-1)]]),tab2:n(({value:e,isActive:t})=>[...l[5]||=[r(`div`,{class:`language-bash`,"data-highlighter":`shiki`,"data-ext":`bash`,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-bash`},[r(`span`,{class:`line`},[r(`span`,{style:{"--shiki-light":`#4078F2`,"--shiki-dark":`#61AFEF`}},`npm`),r(`span`,{style:{"--shiki-light":`#50A14F`,"--shiki-dark":`#98C379`}},` i`),r(`span`,{style:{"--shiki-light":`#986801`,"--shiki-dark":`#D19A66`}},` -D`),r(`span`,{style:{"--shiki-light":`#50A14F`,"--shiki-dark":`#98C379`}},` chart.js`)])])])],-1)]]),_:1}),l[13]||=c(`<p>Then enable it via:</p><div class="code-block-with-title"><div class="code-block-title-bar" data-title=".vuepress/config.ts"><span>.vuepress/config.ts</span></div><div class="language-ts line-numbers-mode" data-highlighter="shiki" data-ext="ts" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-ts"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">markdownChartPlugin</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;@vuepress/plugin-markdown-chart&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">export</span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD;"> default</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  plugins</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> [</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    markdownChartPlugin</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">({</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">      // Enable Chart.js</span></span>
<span class="line highlighted"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">      chartjs</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> true</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }),</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  ],</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><h2 id="syntax" tabindex="-1"><a class="header-anchor" href="#syntax"><span>Syntax</span></a></h2><div class="language-md" data-highlighter="shiki" data-ext="md" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-md"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">::: chartjs Chart Title</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">\`\`\`json</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">  // Your chart configuration here</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">\`\`\`</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:::</span></span></code></pre></div><p>You should use <code>json</code> code block to provide your Chart.js configuration whenever possible, however for dynamic data generation, you can also use script blocks. Both <code>js</code> and <code>javascript</code> code blocks are also supported. You should assign your chart configuration object to the <code>config</code> variable.</p><div class="hint-container warning"><p class="hint-container-title">Warning</p><p>For security reasons, you need to manually allow script blocks in certain files. Set <code>DANGEROUS_ALLOW_SCRIPT_EXECUTION: true</code> and <code>DANGEROUS_SCRIPT_EXECUTION_ALLOWLIST: [&#39;your/file/path.md&#39;]</code> in plugin options.</p></div><h2 id="demo" tabindex="-1"><a class="header-anchor" href="#demo"><span>Demo</span></a></h2>`,7),a(g,{title:`Bar Chart`},{content:n(()=>[a(h,{config:`eJyNUj1PwzAQ3fsrLLOAZKE6IYGwAQMjiAEEVQenOUKEFUeOI1Sh/HfuLLckKCkd/HH3nt/ds+57wRh32wb4NeO5slxQolBOYYJAjLTKQbcYr/gTFFwwfqs7oPMVtDZfdLu3ADVdHjvbaA8+WFWXwNekGDRbcF7HZ1jQ/61BPZww886ejYPWtxLg0NBKRoLJTLBYsEQwDOIg71m52nyW1nR1cWe0sYNKHrZlrk6jBB9mKCFjfL48j84GdXak5ALxFPEoRvYMyStFy1SwK1wzpEvkyMx3PV9OJuhHLqkeaR6qJxNsPcX2PGnPGf2CsQXYY39A/u9/kjJ2P0kZe5+k/HE+X2nvGykHXL9UhftA1zIAvT/XuPd+sE3jKlPTDIbZbjdK46jtYsxsBwHpQlnVN+4NrEHA2Q5G0rT3i37xA75CsCY=`,title:`A%20bar%20chart`})]),code:n(()=>[...l[6]||=[r(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-`},[r(`span`,{class:`line`},[r(`span`,null,`::: chartjs A bar chart`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,"```json")]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`{`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  "type": "bar",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  "data": {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    "labels": ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    "datasets": [`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        "label": "# of Votes",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        "data": [12, 19, 3, 5, 2, 3],`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        "backgroundColor": [`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`          "rgba(255, 99, 132, 0.2)",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`          "rgba(54, 162, 235, 0.2)",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`          "rgba(255, 206, 86, 0.2)",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`          "rgba(75, 192, 192, 0.2)",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`          "rgba(153, 102, 255, 0.2)",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`          "rgba(255, 159, 64, 0.2)"`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        ],`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        "borderColor": [`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`          "rgba(255, 99, 132, 1)",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`          "rgba(54, 162, 235, 1)",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`          "rgba(255, 206, 86, 1)",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`          "rgba(75, 192, 192, 1)",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`          "rgba(153, 102, 255, 1)",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`          "rgba(255, 159, 64, 1)"`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        ],`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        "borderWidth": 1`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      }`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    ]`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  },`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  "options": {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    "scales": {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      "y": {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        "beginAtZero": true`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      }`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    }`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  }`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`}`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,"```")]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`:::`)])])]),r(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`})])],-1)]]),_:1}),a(g,{title:`Bubble Chart`},{content:n(()=>[a(h,{config:`eJxNjUEOwiAURPc9xc9facKiUFnUrcZLmC7AksZIxABNbAx3FyhFN2SYeTP/0wCgX14Kj4ByllIrJMkbhRfRS3n5OeVddK7ZgZLkVAupdBq43K3zcF7hvFOIsrZ1cx/wHS3WEsAlii4JGwXlEH7VCh42kFawhVC54e+aFLfHZM38HE9Gm4SineSOcU6g7wnQju2x4OvCEN/QhOYLM1k72g==`,title:`A%20Bubble%20Chart`})]),code:n(()=>[...l[7]||=[r(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-`},[r(`span`,{class:`line`},[r(`span`,null,`::: chartjs A Bubble Chart`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,"```json")]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`{`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  "type": "bubble",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  "data": {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    "datasets": [`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        "label": "First Dataset",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        "data": [`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`          { "x": 20, "y": 30, "r": 15 },`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`          { "x": 40, "y": 10, "r": 10 }`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        ],`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        "backgroundColor": "rgb(255, 99, 132)"`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      }`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    ]`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  }`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`}`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,"```")]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`:::`)])])]),r(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`})])],-1)]]),_:1}),a(g,{title:`Line Chart`},{content:n(()=>[a(h,{config:`eJxNTssKgzAQvPsVS04tSNHS96209CD4BeIh1tgGgsomHqT4792NKfWwr9nZmf1EAMKNvRIXEEa3SsSM1NJJQnhLk5GVMpbmQmSyHSSOIgbxUBX++lzi883NtUdtZsQvsoEluZpRlKwd1K1yXtEjEJz+bvxOPsJDo3Vwn/n+tUAKDxaHfQz7cwynhCKl/kBB2C4JZp7daMOKjTRWLeCqw1rhrTMdsh++qtWRbtPz1qf10tCp1uquJV6ySQM8+VpSnqIp+gLndFA2`,title:`A%20Line%20Chart`})]),code:n(()=>[...l[8]||=[r(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-`},[r(`span`,{class:`line`},[r(`span`,null,`::: chartjs A Line Chart`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,"```json")]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`{`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  "type": "line",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  "data": {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    "labels": ["January", "February", "March", "April", "May", "June", "July"],`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    "datasets": [`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        "label": "My First Dataset",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        "data": [65, 59, 80, 81, 56, 55, 40],`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        "fill": false,`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        "borderColor": "rgb(75, 192, 192)",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        "tension": 0.1`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      }`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    ]`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  }`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`}`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,"```")]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`:::`)])])]),r(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`})])],-1)]]),_:1}),a(g,{title:`Polar Area Chart`},{content:n(()=>[a(h,{config:`eJxtTrsOwjAM3PsVlieQMrQppZSNh2BiYUOIIaUWQkQEpUWoQv13nBBBhy5+3J3P944AsGkfhHPAh9HKLiwpFA6uVKMYdhLetCpJ17wfcU8VCsCtJbq74UBam1eAWteX+kl4ci7Bp6bG33oEguff133ftbC52rqB9VfvQwRRiHJMEgHJVEAuIOVpEl54TanOt4s1z3u1MtrY3jdP20s5klkmoCj4MpXjnn+gc2aTQvoyQPtrGXOZTYfomMPJmHPJOB/gs4nLzu4yzcb4Y09h6nx3Wxd10QeFAVlO`,title:`A%20Polar%20Area%20Chart`})]),code:n(()=>[...l[9]||=[r(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-`},[r(`span`,{class:`line`},[r(`span`,null,`::: chartjs A Polar Area Chart`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,"```json")]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`{`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  "type": "polarArea",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  "data": {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    "labels": ["Red", "Green", "Yellow", "Grey", "Blue"],`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    "datasets": [`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        "label": "My First Dataset",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        "data": [11, 16, 7, 3, 14],`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        "backgroundColor": [`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`          "rgb(255, 99, 132)",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`          "rgb(75, 192, 192)",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`          "rgb(255, 205, 86)",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`          "rgb(201, 203, 207)",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`          "rgb(54, 162, 235)"`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        ]`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      }`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    ]`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  }`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`}`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,"```")]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`:::`)])])]),r(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`})])],-1)]]),_:1}),a(g,{title:`Radar Chart`},{content:n(()=>[a(h,{config:`eJy9VD1PwzAQ3fsrrLCAFKE0/aBlpAWxsNCBoWJw6kuwauzIcZAilP/O2UloLEpTCYkhlu/53t2zny6fI0ICU+UQ3JJAU0Z1EFqIUUMRsscYCZqAKDDeuhiRe2q4zFyui9eay72HbARA7udAwTPpQSvF/LjaCQ94LqVjuPi1gZ24AkxfUCP0INZe56kiD1wXhqyb/O+qh/tt57OQzJYhWUYhWYxxP8cPsWnUNnPZKRe2otEl9NCE7vaZVqVkKyWUdi+YJfQytgWWWHQ8iUMSXcdX/c6J0gx0n+ERvNxccWnujrYZIvldLtI0/ZHzqD5AH6l+InlIe0uqO/YvtmxgpyQ75Uu8QA/sh76MrT/oS3yD++gPxsymWGCOnsQTFH2GMX3C2cYMkP7LGF9GZ0wzR7g6iwKVG66kHaR20kHAO0g3Wp13AU6k/T30vGye6oUz84YHE6+4XetRPfoCDysUmg==`,title:`A%20Radar%20Chart`})]),code:n(()=>[...l[10]||=[r(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-`},[r(`span`,{class:`line`},[r(`span`,null,`::: chartjs A Radar Chart`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,"```json")]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`{`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  "type": "radar",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  "data": {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    "labels": [`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      "Eating",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      "Drinking",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      "Sleeping",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      "Designing",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      "Coding",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      "Cycling",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      "Running"`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    ],`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    "datasets": [`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        "label": "My First Dataset",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        "data": [65, 59, 90, 81, 56, 55, 40],`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        "fill": true,`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        "backgroundColor": "rgba(255, 99, 132, 0.2)",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        "borderColor": "rgb(255, 99, 132)",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        "pointBackgroundColor": "rgb(255, 99, 132)",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        "pointBorderColor": "#fff",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        "pointHoverBackgroundColor": "#fff",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        "pointHoverBorderColor": "rgb(255, 99, 132)"`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      },`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        "label": "My Second Dataset",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        "data": [28, 48, 40, 19, 96, 27, 100],`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        "fill": true,`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        "backgroundColor": "rgba(54, 162, 235, 0.2)",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        "borderColor": "rgb(54, 162, 235)",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        "pointBackgroundColor": "rgb(54, 162, 235)",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        "pointBorderColor": "#fff",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        "pointHoverBackgroundColor": "#fff",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        "pointHoverBorderColor": "rgb(54, 162, 235)"`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      }`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    ]`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  },`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  "options": {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    "elements": {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      "line": {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        "borderWidth": 3`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      }`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    }`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  }`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`}`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,"```")]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`:::`)])])]),r(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`})])],-1)]]),_:1}),a(g,{title:`Scatter Chart`},{content:n(()=>[a(h,{config:`eJxtUEsKgzAQ3XuKIasWrKjFhd22N+iyuIgaRJoa0RQqxbt3Jh+14CYk7zeT9w0AmJ56wS7AxoprLQYWElhzzREkgXuNQo+IPAwCjjGs5KWQlHC3CXCzcpPkNC7Pu00CsA9CpyQOgU14i2FeHQvv2WSfXtzZvjvKPB+hYhEUm91KXj2bQb27+qqkGugnQ1Me0gyteR5Cck6PzMltQoGnmcZUr1vVUTGuKmxRivWNCK2xacvXLdtOcNu2Y3o1tpRGbKm0Vq//qXTOwRz8AH72Yfs=`,title:`A%20Scatter%20Chart`})]),code:n(()=>[...l[11]||=[r(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-`},[r(`span`,{class:`line`},[r(`span`,null,`::: chartjs A Scatter Chart`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,"```json")]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`{`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  "type": "scatter",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  "data": {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    "datasets": [`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        "label": "Scatter Dataset",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        "data": [`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`          { "x": -10, "y": 0 },`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`          { "x": 0, "y": 10 },`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`          { "x": 10, "y": 5 },`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`          { "x": 0.5, "y": 5.5 }`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        ],`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        "backgroundColor": "rgb(255, 99, 132)"`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      }`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    ]`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  },`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  "options": {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    "scales": {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      "x": {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        "type": "linear",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        "position": "bottom"`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      }`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    }`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  }`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`}`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,"```")]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`:::`)])])]),r(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`})])],-1)]]),_:1}),l[14]||=r(`h2`,{id:`docs`,tabindex:`-1`},[r(`a`,{class:`header-anchor`,href:`#docs`},[r(`span`,null,`Docs`)])],-1),l[15]||=r(`p`,null,[e(`For details, please see `),r(`a`,{href:`https://www.chartjs.org/docs/latest/`,target:`_blank`,rel:`noopener noreferrer`},`Chart.js Docs`),e(`.`)],-1)])}var f=s(u,[[`render`,d]]);export{l as _pageData,f as default};