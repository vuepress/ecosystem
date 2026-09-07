import{A as e,I as t,W as n,h as r,l as i,m as a,o,p as s}from"./runtime-core.esm-bundler-vf-dv2ij.js";import{n as c}from"./app-BMBvQ1IK.js";var l=JSON.parse(`{"path":"/plugins/markdown/markdown-chart/chartjs.html","title":"Chart.js","lang":"en-US","frontmatter":{"icon":"chart-bar-increasing","description":"Chart.js Add Chart.js support to the Markdown files in your VuePress site. Installation Install Chart.js in your project: Then enable it via: .vuepress/config.ts Syntax You shou...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Chart.js\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-11-26T05:40:25.000Z\\",\\"author\\":[]}"],["meta",{"property":"og:url","content":"https://ecosystem.vuejs.press/ecosystem/plugins/markdown/markdown-chart/chartjs.html"}],["meta",{"property":"og:site_name","content":"VuePress Ecosystem"}],["meta",{"property":"og:title","content":"Chart.js"}],["meta",{"property":"og:description","content":"Chart.js Add Chart.js support to the Markdown files in your VuePress site. Installation Install Chart.js in your project: Then enable it via: .vuepress/config.ts Syntax You shou..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:locale:alternate","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-11-26T05:40:25.000Z"}],["meta",{"property":"article:modified_time","content":"2025-11-26T05:40:25.000Z"}],["link",{"rel":"alternate","hreflang":"zh-cn","href":"https://ecosystem.vuejs.press/ecosystem/zh/plugins/markdown/markdown-chart/chartjs.html"}],["link",{"rel":"alternate","type":"application/atom+xml","href":"https://ecosystem.vuejs.press/ecosystem/atom.xml","title":"VuePress Ecosystem Atom Feed"}],["link",{"rel":"alternate","type":"application/json","href":"https://ecosystem.vuejs.press/ecosystem/feed.json","title":"VuePress Ecosystem JSON Feed"}],["link",{"rel":"alternate","type":"application/rss+xml","href":"https://ecosystem.vuejs.press/ecosystem/rss.xml","title":"VuePress Ecosystem RSS Feed"}]]},"git":{"updatedTime":1764135625000,"contributors":[{"name":"Mister-Hope","username":"Mister-Hope","email":"mister-hope@outlook.com","commits":2,"avatar":"https://avatars.githubusercontent.com/Mister-Hope?v=4","url":"https://github.com/Mister-Hope"}],"changelog":[{"hash":"795eeec15c9a889905a67ccac8f3fbee6089b4bd","time":1764135625000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"feat(plugin-markdown-chart)!: avoid potential XSS attack (#574)"},{"hash":"7f5fdff8c26f865b21697b3c6d29bb49d9b20ba4","time":1749285836000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"feat: add plugin-markdown-chart (#249)"}]},"autoDesc":true,"filePathRelative":"plugins/markdown/markdown-chart/chartjs.md"}`),u={name:`chartjs.md`};function d(c,l,u,d,f,p){let m=t(`CodeTabs`),h=t(`ChartJS`),g=t(`VPPreview`);return e(),i(`div`,null,[l[12]||=s(`<h1 id="chart-js" tabindex="-1"><a class="header-anchor" href="#chart-js"><span>Chart.js</span></a></h1><p>Add <a href="https://www.chartjs.org/docs/latest/" target="_blank" rel="noopener noreferrer">Chart.js</a> support to the Markdown files in your VuePress site.</p><h2 id="installation" tabindex="-1"><a class="header-anchor" href="#installation"><span>Installation</span></a></h2><p>Install <a href="https://www.chartjs.org/docs/latest/" target="_blank" rel="noopener noreferrer">Chart.js</a> in your project:</p>`,4),r(m,{data:[{id:`pnpm`},{id:`yarn`},{id:`npm`}],"tab-id":`shell`},{title0:n(({value:e,isActive:t})=>[...l[0]||=[a(`pnpm`,-1)]]),title1:n(({value:e,isActive:t})=>[...l[1]||=[a(`yarn`,-1)]]),title2:n(({value:e,isActive:t})=>[...l[2]||=[a(`npm`,-1)]]),tab0:n(({value:e,isActive:t})=>[...l[3]||=[o(`div`,{class:`language-bash`,"data-highlighter":`shiki`,"data-ext":`bash`,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-bash`},[o(`span`,{class:`line`},[o(`span`,{style:{"--shiki-light":`#4078F2`,"--shiki-dark":`#61AFEF`}},`pnpm`),o(`span`,{style:{"--shiki-light":`#50A14F`,"--shiki-dark":`#98C379`}},` add`),o(`span`,{style:{"--shiki-light":`#986801`,"--shiki-dark":`#D19A66`}},` -D`),o(`span`,{style:{"--shiki-light":`#50A14F`,"--shiki-dark":`#98C379`}},` chart.js`)])])])],-1)]]),tab1:n(({value:e,isActive:t})=>[...l[4]||=[o(`div`,{class:`language-bash`,"data-highlighter":`shiki`,"data-ext":`bash`,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-bash`},[o(`span`,{class:`line`},[o(`span`,{style:{"--shiki-light":`#4078F2`,"--shiki-dark":`#61AFEF`}},`yarn`),o(`span`,{style:{"--shiki-light":`#50A14F`,"--shiki-dark":`#98C379`}},` add`),o(`span`,{style:{"--shiki-light":`#986801`,"--shiki-dark":`#D19A66`}},` -D`),o(`span`,{style:{"--shiki-light":`#50A14F`,"--shiki-dark":`#98C379`}},` chart.js`)])])])],-1)]]),tab2:n(({value:e,isActive:t})=>[...l[5]||=[o(`div`,{class:`language-bash`,"data-highlighter":`shiki`,"data-ext":`bash`,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-bash`},[o(`span`,{class:`line`},[o(`span`,{style:{"--shiki-light":`#4078F2`,"--shiki-dark":`#61AFEF`}},`npm`),o(`span`,{style:{"--shiki-light":`#50A14F`,"--shiki-dark":`#98C379`}},` i`),o(`span`,{style:{"--shiki-light":`#986801`,"--shiki-dark":`#D19A66`}},` -D`),o(`span`,{style:{"--shiki-light":`#50A14F`,"--shiki-dark":`#98C379`}},` chart.js`)])])])],-1)]]),_:1}),l[13]||=s(`<p>Then enable it via:</p><div class="code-block-with-title"><div class="code-block-title-bar" data-title=".vuepress/config.ts"><span>.vuepress/config.ts</span></div><div class="language-ts line-numbers-mode" data-highlighter="shiki" data-ext="ts" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-ts"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">markdownChartPlugin</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;@vuepress/plugin-markdown-chart&#39;</span></span>
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
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:::</span></span></code></pre></div><p>You should use <code>json</code> code block to provide your Chart.js configuration whenever possible, however for dynamic data generation, you can also use script blocks. Both <code>js</code> and <code>javascript</code> code blocks are also supported. You should assign your export object to <code>module.exports</code>.</p><div class="hint-container warning"><p class="hint-container-title">Warning</p><p>For security reasons, you need to manually allow script blocks in certain files. Set <code>DANGEROUS_ALLOW_SCRIPT_EXECUTION: true</code> and <code>DANGEROUS_SCRIPT_EXECUTION_ALLOWLIST: [&#39;your/file/path.md&#39;]</code> in plugin options.</p></div><h2 id="demo" tabindex="-1"><a class="header-anchor" href="#demo"><span>Demo</span></a></h2>`,7),r(g,{title:`Bar Chart`},{content:n(()=>[r(h,{config:`eJyNUj1PwzAQ3fsrLLOAZKE6IYGwAQMjiAEEVQenOUKEFUeOI1Sh/HfuLLckKCkd/HH3nt/ds+57wRh32wb4NeO5slxQolBOYYJAjLTKQbcYr/gTFFwwfqs7oPMVtDZfdLu3ADVdHjvbaA8+WFWXwNekGDRbcF7HZ1jQ/61BPZww886ejYPWtxLg0NBKRoLJTLBYsEQwDOIg71m52nyW1nR1cWe0sYNKHrZlrk6jBB9mKCFjfL48j84GdXak5ALxFPEoRvYMyStFy1SwK1wzpEvkyMx3PV9OJuhHLqkeaR6qJxNsPcX2PGnPGf2CsQXYY39A/u9/kjJ2P0kZe5+k/HE+X2nvGykHXL9UhftA1zIAvT/XuPd+sE3jKlPTDIbZbjdK46jtYsxsBwHpQlnVN+4NrEHA2Q5G0rT3i37xA75CsCY=`,title:`A%20bar%20chart`})]),code:n(()=>[...l[6]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`::: chartjs A bar chart`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,"```json")]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`{`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  "type": "bar",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  "data": {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    "labels": ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    "datasets": [`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`      {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        "label": "# of Votes",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        "data": [12, 19, 3, 5, 2, 3],`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        "backgroundColor": [`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`          "rgba(255, 99, 132, 0.2)",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`          "rgba(54, 162, 235, 0.2)",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`          "rgba(255, 206, 86, 0.2)",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`          "rgba(75, 192, 192, 0.2)",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`          "rgba(153, 102, 255, 0.2)",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`          "rgba(255, 159, 64, 0.2)"`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        ],`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        "borderColor": [`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`          "rgba(255, 99, 132, 1)",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`          "rgba(54, 162, 235, 1)",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`          "rgba(255, 206, 86, 1)",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`          "rgba(75, 192, 192, 1)",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`          "rgba(153, 102, 255, 1)",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`          "rgba(255, 159, 64, 1)"`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        ],`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        "borderWidth": 1`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`      }`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    ]`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  },`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  "options": {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    "scales": {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`      "y": {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        "beginAtZero": true`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`      }`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    }`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  }`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,"```")]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`:::`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),r(g,{title:`Bubble Chart`},{content:n(()=>[r(h,{config:`eJxNjUEOwiAURPc9xc9facKiUFnUrcZLmC7AksZIxABNbAx3FyhFN2SYeTP/0wCgX14Kj4ByllIrJMkbhRfRS3n5OeVddK7ZgZLkVAupdBq43K3zcF7hvFOIsrZ1cx/wHS3WEsAlii4JGwXlEH7VCh42kFawhVC54e+aFLfHZM38HE9Gm4SineSOcU6g7wnQju2x4OvCEN/QhOYLM1k72g==`,title:`A%20Bubble%20Chart`})]),code:n(()=>[...l[7]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`::: chartjs A Bubble Chart`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,"```json")]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`{`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  "type": "bubble",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  "data": {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    "datasets": [`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`      {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        "label": "First Dataset",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        "data": [`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`          { "x": 20, "y": 30, "r": 15 },`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`          { "x": 40, "y": 10, "r": 10 }`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        ],`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        "backgroundColor": "rgb(255, 99, 132)"`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`      }`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    ]`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  }`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,"```")]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`:::`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),r(g,{title:`Line Chart`},{content:n(()=>[r(h,{config:`eJxNTssKgzAQvPsVS04tSNHS96209CD4BeIh1tgGgsomHqT4792NKfWwr9nZmf1EAMKNvRIXEEa3SsSM1NJJQnhLk5GVMpbmQmSyHSSOIgbxUBX++lzi883NtUdtZsQvsoEluZpRlKwd1K1yXtEjEJz+bvxOPsJDo3Vwn/n+tUAKDxaHfQz7cwynhCKl/kBB2C4JZp7daMOKjTRWLeCqw1rhrTMdsh++qtWRbtPz1qf10tCp1uquJV6ySQM8+VpSnqIp+gLndFA2`,title:`A%20Line%20Chart`})]),code:n(()=>[...l[8]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`::: chartjs A Line Chart`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,"```json")]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`{`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  "type": "line",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  "data": {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    "labels": ["January", "February", "March", "April", "May", "June", "July"],`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    "datasets": [`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`      {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        "label": "My First Dataset",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        "data": [65, 59, 80, 81, 56, 55, 40],`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        "fill": false,`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        "borderColor": "rgb(75, 192, 192)",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        "tension": 0.1`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`      }`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    ]`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  }`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,"```")]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`:::`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),r(g,{title:`Polar Area Chart`},{content:n(()=>[r(h,{config:`eJxtTrsOwjAM3PsVlieQMrQppZSNh2BiYUOIIaUWQkQEpUWoQv13nBBBhy5+3J3P944AsGkfhHPAh9HKLiwpFA6uVKMYdhLetCpJ17wfcU8VCsCtJbq74UBam1eAWteX+kl4ci7Bp6bG33oEguff133ftbC52rqB9VfvQwRRiHJMEgHJVEAuIOVpEl54TanOt4s1z3u1MtrY3jdP20s5klkmoCj4MpXjnn+gc2aTQvoyQPtrGXOZTYfomMPJmHPJOB/gs4nLzu4yzcb4Y09h6nx3Wxd10QeFAVlO`,title:`A%20Polar%20Area%20Chart`})]),code:n(()=>[...l[9]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`::: chartjs A Polar Area Chart`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,"```json")]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`{`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  "type": "polarArea",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  "data": {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    "labels": ["Red", "Green", "Yellow", "Grey", "Blue"],`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    "datasets": [`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`      {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        "label": "My First Dataset",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        "data": [11, 16, 7, 3, 14],`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        "backgroundColor": [`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`          "rgb(255, 99, 132)",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`          "rgb(75, 192, 192)",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`          "rgb(255, 205, 86)",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`          "rgb(201, 203, 207)",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`          "rgb(54, 162, 235)"`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        ]`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`      }`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    ]`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  }`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,"```")]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`:::`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),r(g,{title:`Radar Chart`},{content:n(()=>[r(h,{config:`eJy9VD1PwzAQ3fsrrLCAFKE0/aBlpAWxsNCBoWJw6kuwauzIcZAilP/O2UloLEpTCYkhlu/53t2zny6fI0ICU+UQ3JJAU0Z1EFqIUUMRsscYCZqAKDDeuhiRe2q4zFyui9eay72HbARA7udAwTPpQSvF/LjaCQ94LqVjuPi1gZ24AkxfUCP0INZe56kiD1wXhqyb/O+qh/tt57OQzJYhWUYhWYxxP8cPsWnUNnPZKRe2otEl9NCE7vaZVqVkKyWUdi+YJfQytgWWWHQ8iUMSXcdX/c6J0gx0n+ERvNxccWnujrYZIvldLtI0/ZHzqD5AH6l+InlIe0uqO/YvtmxgpyQ75Uu8QA/sh76MrT/oS3yD++gPxsymWGCOnsQTFH2GMX3C2cYMkP7LGF9GZ0wzR7g6iwKVG66kHaR20kHAO0g3Wp13AU6k/T30vGye6oUz84YHE6+4XetRPfoCDysUmg==`,title:`A%20Radar%20Chart`})]),code:n(()=>[...l[10]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`::: chartjs A Radar Chart`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,"```json")]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`{`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  "type": "radar",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  "data": {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    "labels": [`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`      "Eating",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`      "Drinking",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`      "Sleeping",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`      "Designing",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`      "Coding",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`      "Cycling",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`      "Running"`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    ],`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    "datasets": [`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`      {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        "label": "My First Dataset",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        "data": [65, 59, 90, 81, 56, 55, 40],`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        "fill": true,`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        "backgroundColor": "rgba(255, 99, 132, 0.2)",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        "borderColor": "rgb(255, 99, 132)",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        "pointBackgroundColor": "rgb(255, 99, 132)",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        "pointBorderColor": "#fff",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        "pointHoverBackgroundColor": "#fff",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        "pointHoverBorderColor": "rgb(255, 99, 132)"`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`      },`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`      {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        "label": "My Second Dataset",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        "data": [28, 48, 40, 19, 96, 27, 100],`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        "fill": true,`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        "backgroundColor": "rgba(54, 162, 235, 0.2)",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        "borderColor": "rgb(54, 162, 235)",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        "pointBackgroundColor": "rgb(54, 162, 235)",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        "pointBorderColor": "#fff",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        "pointHoverBackgroundColor": "#fff",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        "pointHoverBorderColor": "rgb(54, 162, 235)"`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`      }`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    ]`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  },`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  "options": {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    "elements": {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`      "line": {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        "borderWidth": 3`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`      }`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    }`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  }`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,"```")]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`:::`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),r(g,{title:`Scatter Chart`},{content:n(()=>[r(h,{config:`eJxtUEsKgzAQ3XuKIasWrKjFhd22N+iyuIgaRJoa0RQqxbt3Jh+14CYk7zeT9w0AmJ56wS7AxoprLQYWElhzzREkgXuNQo+IPAwCjjGs5KWQlHC3CXCzcpPkNC7Pu00CsA9CpyQOgU14i2FeHQvv2WSfXtzZvjvKPB+hYhEUm91KXj2bQb27+qqkGugnQ1Me0gyteR5Cck6PzMltQoGnmcZUr1vVUTGuKmxRivWNCK2xacvXLdtOcNu2Y3o1tpRGbKm0Vq//qXTOwRz8AH72Yfs=`,title:`A%20Scatter%20Chart`})]),code:n(()=>[...l[11]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`::: chartjs A Scatter Chart`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,"```json")]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`{`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  "type": "scatter",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  "data": {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    "datasets": [`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`      {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        "label": "Scatter Dataset",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        "data": [`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`          { "x": -10, "y": 0 },`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`          { "x": 0, "y": 10 },`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`          { "x": 10, "y": 5 },`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`          { "x": 0.5, "y": 5.5 }`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        ],`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        "backgroundColor": "rgb(255, 99, 132)"`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`      }`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    ]`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  },`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  "options": {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    "scales": {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`      "x": {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        "type": "linear",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        "position": "bottom"`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`      }`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    }`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  }`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,"```")]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`:::`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),l[14]||=o(`h2`,{id:`docs`,tabindex:`-1`},[o(`a`,{class:`header-anchor`,href:`#docs`},[o(`span`,null,`Docs`)])],-1),l[15]||=o(`p`,null,[a(`For details, please see `),o(`a`,{href:`https://www.chartjs.org/docs/latest/`,target:`_blank`,rel:`noopener noreferrer`},`Chart.js Docs`),a(`.`)],-1)])}var f=c(u,[[`render`,d]]);export{l as _pageData,f as default};