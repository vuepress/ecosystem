import{G as e,L as t,g as n,h as r,j as i,m as a,s as o,u as s}from"./runtime-core.esm-bundler-QpbUwO0S.js";import{n as c}from"./app-DWMFt6u5.js";var l=JSON.parse(`{"path":"/zh/plugins/markdown/markdown-chart/echarts.html","title":"ECharts","lang":"zh-CN","frontmatter":{"icon":"chart-scatter","description":"ECharts 为你 VuePress 站点中的 Markdown 文件添加 ECharts 支持。 安装 在你的项目中安装 ECharts： 然后通过以下方式启用： .vuepress/config.ts 格式 使用 JSON 如果你可以很轻松的生成数据，你可以直接通过一个 JSON 代码块来提供 ECharts 配置: 使用脚本 你应该尽可能使用 ...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"ECharts\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-11-26T05:40:25.000Z\\",\\"author\\":[]}"],["meta",{"property":"og:url","content":"https://ecosystem.vuejs.press/ecosystem/zh/plugins/markdown/markdown-chart/echarts.html"}],["meta",{"property":"og:site_name","content":"VuePress 生态系统"}],["meta",{"property":"og:title","content":"ECharts"}],["meta",{"property":"og:description","content":"ECharts 为你 VuePress 站点中的 Markdown 文件添加 ECharts 支持。 安装 在你的项目中安装 ECharts： 然后通过以下方式启用： .vuepress/config.ts 格式 使用 JSON 如果你可以很轻松的生成数据，你可以直接通过一个 JSON 代码块来提供 ECharts 配置: 使用脚本 你应该尽可能使用 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:locale:alternate","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2025-11-26T05:40:25.000Z"}],["meta",{"property":"article:modified_time","content":"2025-11-26T05:40:25.000Z"}],["link",{"rel":"alternate","hreflang":"en-us","href":"https://ecosystem.vuejs.press/ecosystem/plugins/markdown/markdown-chart/echarts.html"}],["link",{"rel":"alternate","type":"application/atom+xml","href":"https://ecosystem.vuejs.press/ecosystem/zh/atom.xml","title":"VuePress 生态系统 Atom Feed"}],["link",{"rel":"alternate","type":"application/json","href":"https://ecosystem.vuejs.press/ecosystem/zh/feed.json","title":"VuePress 生态系统 JSON Feed"}],["link",{"rel":"alternate","type":"application/rss+xml","href":"https://ecosystem.vuejs.press/ecosystem/zh/rss.xml","title":"VuePress 生态系统 RSS Feed"}]]},"git":{"updatedTime":1764135625000,"contributors":[{"name":"Mister-Hope","username":"Mister-Hope","email":"mister-hope@outlook.com","commits":3,"avatar":"https://avatars.githubusercontent.com/Mister-Hope?v=4","url":"https://github.com/Mister-Hope"}],"changelog":[{"hash":"795eeec15c9a889905a67ccac8f3fbee6089b4bd","time":1764135625000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"feat(plugin-markdown-chart)!: avoid potential XSS attack (#574)"},{"hash":"ca1ee4007bb66653de8d0944807c4b12ab92118f","time":1758449847000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"docs: fix typos, close #559"},{"hash":"7f5fdff8c26f865b21697b3c6d29bb49d9b20ba4","time":1749285836000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"feat: add plugin-markdown-chart (#249)"}]},"autoDesc":true,"filePathRelative":"zh/plugins/markdown/markdown-chart/echarts.md"}`),u={name:`echarts.md`};function d(c,l,u,d,f,p){let m=t(`CodeTabs`),h=t(`ECharts`),g=t(`VPPreview`);return i(),s(`div`,null,[l[17]||=a(`<h1 id="echarts" tabindex="-1"><a class="header-anchor" href="#echarts"><span>ECharts</span></a></h1><p>为你 VuePress 站点中的 Markdown 文件添加 <a href="https://echarts.apache.org/zh/index.html" target="_blank" rel="noopener noreferrer">ECharts</a> 支持。</p><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装"><span>安装</span></a></h2><p>在你的项目中安装 <a href="https://echarts.apache.org/zh/index.html" target="_blank" rel="noopener noreferrer">ECharts</a>：</p>`,4),n(m,{data:[{id:`pnpm`},{id:`yarn`},{id:`npm`}],"tab-id":`shell`},{title0:e(({value:e,isActive:t})=>[...l[0]||=[r(`pnpm`,-1)]]),title1:e(({value:e,isActive:t})=>[...l[1]||=[r(`yarn`,-1)]]),title2:e(({value:e,isActive:t})=>[...l[2]||=[r(`npm`,-1)]]),tab0:e(({value:e,isActive:t})=>[...l[3]||=[o(`div`,{class:`language-bash`,"data-highlighter":`shiki`,"data-ext":`bash`,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-bash`},[o(`span`,{class:`line`},[o(`span`,{style:{"--shiki-light":`#4078F2`,"--shiki-dark":`#61AFEF`}},`pnpm`),o(`span`,{style:{"--shiki-light":`#50A14F`,"--shiki-dark":`#98C379`}},` add`),o(`span`,{style:{"--shiki-light":`#986801`,"--shiki-dark":`#D19A66`}},` -D`),o(`span`,{style:{"--shiki-light":`#50A14F`,"--shiki-dark":`#98C379`}},` echarts`)])])])],-1)]]),tab1:e(({value:e,isActive:t})=>[...l[4]||=[o(`div`,{class:`language-bash`,"data-highlighter":`shiki`,"data-ext":`bash`,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-bash`},[o(`span`,{class:`line`},[o(`span`,{style:{"--shiki-light":`#4078F2`,"--shiki-dark":`#61AFEF`}},`yarn`),o(`span`,{style:{"--shiki-light":`#50A14F`,"--shiki-dark":`#98C379`}},` add`),o(`span`,{style:{"--shiki-light":`#986801`,"--shiki-dark":`#D19A66`}},` -D`),o(`span`,{style:{"--shiki-light":`#50A14F`,"--shiki-dark":`#98C379`}},` echarts`)])])])],-1)]]),tab2:e(({value:e,isActive:t})=>[...l[5]||=[o(`div`,{class:`language-bash`,"data-highlighter":`shiki`,"data-ext":`bash`,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-bash`},[o(`span`,{class:`line`},[o(`span`,{style:{"--shiki-light":`#4078F2`,"--shiki-dark":`#61AFEF`}},`npm`),o(`span`,{style:{"--shiki-light":`#50A14F`,"--shiki-dark":`#98C379`}},` i`),o(`span`,{style:{"--shiki-light":`#986801`,"--shiki-dark":`#D19A66`}},` -D`),o(`span`,{style:{"--shiki-light":`#50A14F`,"--shiki-dark":`#98C379`}},` echarts`)])])])],-1)]]),_:1}),l[18]||=a(`<p>然后通过以下方式启用：</p><div class="code-block-with-title"><div class="code-block-title-bar" data-title=".vuepress/config.ts"><span>.vuepress/config.ts</span></div><div class="language-ts line-numbers-mode" data-highlighter="shiki" data-ext="ts" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-ts"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">markdownChartPlugin</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;@vuepress/plugin-markdown-chart&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">export</span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD;"> default</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  plugins</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> [</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    markdownChartPlugin</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">({</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">      // 启用 ECharts</span></span>
<span class="line highlighted"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">      echarts</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> true</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }),</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  ],</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><h2 id="格式" tabindex="-1"><a class="header-anchor" href="#格式"><span>格式</span></a></h2><h3 id="使用-json" tabindex="-1"><a class="header-anchor" href="#使用-json"><span>使用 JSON</span></a></h3><p>如果你可以很轻松的生成数据，你可以直接通过一个 JSON 代码块来提供 ECharts 配置:</p><div class="language-md" data-highlighter="shiki" data-ext="md" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-md"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">::: echarts 标题</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">\`\`\`json</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">  // 此处为 ECharts 图表配置</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">\`\`\`</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:::</span></span></code></pre></div><h3 id="使用脚本" tabindex="-1"><a class="header-anchor" href="#使用脚本"><span>使用脚本</span></a></h3><p>你应该尽可能使用 <code>json</code> 代码块来提供你的 ECharts 配置，但如果需要动态生成数据，你也可以使用脚本块。</p><p><code>js</code> 或 <code>javascript</code> 代码块均受支持。在脚本中，我们会将 echarts 库作为 <code>echarts</code>，实例作为 <code>myChart</code> 暴露给你，你需要将 echarts 配置对象赋值给 <code>option</code> 变量。同时，你也可以通过设置 <code>width</code> 和 <code>height</code> 变量来设置图表大小。</p><div class="hint-container warning"><p class="hint-container-title">注意</p><p>出于安全考虑，你需要手动允许特定文件中的脚本块。请在插件选项中设置 <code>DANGEROUS_ALLOW_SCRIPT_EXECUTION: true</code> 和 <code>DANGEROUS_SCRIPT_EXECUTION_ALLOWLIST: [&#39;your/file/path.md&#39;]</code>。</p></div><div class="language-md" data-highlighter="shiki" data-ext="md" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-md"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">::: echarts Title</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">\`\`\`js</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B;"> option</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">  // 此处为 ECharts 图表配置</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">\`\`\`</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:::</span></span></code></pre></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>你可以使用顶级 await 和 <code>fetch</code> 来从网络请求中获取数据。</p></div><h2 id="高级" tabindex="-1"><a class="header-anchor" href="#高级"><span>高级</span></a></h2><p>你可以在<a href="https://vuejs.press/zh/guide/configuration.html#%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6" target="_blank" rel="noopener noreferrer">客户端配置文件</a>中导入并使用 <code>defineEChartsConfig</code> 来自定义 ECharts:</p><div class="code-block-with-title"><div class="code-block-title-bar" data-title=".vuepress/client.ts"><span>.vuepress/client.ts</span></div><div class="language-ts line-numbers-mode" data-highlighter="shiki" data-ext="ts" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-ts"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">defineEChartsConfig</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;@vuepress/plugin-markdown-chart/client&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">defineEChartsConfig</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">({</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  options</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">    // 全局 ECharts 配置</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  },</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">  setup</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> async</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> () </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=&gt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">    // ECharts 设置</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">    // 例如: await import(&quot;echarts-wordcloud&quot;)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  },</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">})</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><h2 id="文档" tabindex="-1"><a class="header-anchor" href="#文档"><span>文档</span></a></h2><p>相关详情，详见 <a href="https://echarts.apache.org/handbook/zh/get-started/" target="_blank" rel="noopener noreferrer">ECharts 文档</a>.</p><h2 id="案例" tabindex="-1"><a class="header-anchor" href="#案例"><span>案例</span></a></h2>`,18),n(g,{title:`线图`},{content:e(()=>[n(h,{config:`eJyVVNtu2zAMffdX6KGD5SXzkt2brQOKFR0KrOiADgOGIFjZWkm02pIhKW2NwP8+ipKd9IotD3YskueQhxQvtLKOaSUOoGF77MO7NyP/S8J5AQ7wdDpLSuGY0tf4ocQ1OwAn+Hh39/2Q7Q7Z64zMV1CuBDocg1vmBlShK56x52zs8SJgOMZwD4vWvc9snbC7yPiZL4T7ISuBPoOYXoaOHUd4D+5xvRqzF0iYoKsRbmUUwSMBVGLiaXKnT52RasGzIVkIacKm9MHYNHIfrsrylwCDbhSGR8dauSXlM+7PKN1slv/RUvH0ZRpBWUxMr1TBiSEaZv7VJm2SzLVh3MsmsZzRR3x9IqXw32CQkfJ5vbJLvpGMZ1mno66d1AojfXlO69LJehJrxfIWC2EmLIUbadNAjHQVOOePeQ0GKtuL738BVTpRIWawT0ezW0bMyCvfN8k7515XTCr4RcXPdtbedyNP+3Kn42EEc0fNaPNunXUjf8smbGdNZCTkdDxrzyiiDZX5Ir+j/FRbxwNKYrko0YTNobQiuFIEPW72MaoXrKlxAlKH4xbVsnUp3Tep8LhDtEt9/QhY8wAY5RrRzv0YgGm+AvZoOhqyFBv9LKVZ+F8u3+tzfdP5Bk9nVtFxLgB7sAVVgbncfN0P6GWkzsBPKdD8lLtvMxQnqmxuZbiFY4R1ejuHJ1ktXIl9e1TB4t8iNlJYYaRA3cPV7ULDTU8P4VL4OYXYg74xJSrdn3mW06Y61+WdYrwWW3zYqjbePD8lRwVeBCvckR867DTfbDI5Z7xqvizBuPx3IW2trSiymN1FiSPdBwUkv9W6q0O7AR8P7Ya3cTEEJFoPdinnjgeAx/aFR8QpiBlhzie0OXgcn07CdVj1bdhPWdIOaRllyV9oGrQN`,title:`Dynamic%20Data%20%26%20Time%20Axis`,type:`js`})]),code:e(()=>[...l[6]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`::: echarts Dynamic Data & Time Axis`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,"```js")]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`const oneDay = 86400000`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`const data = []`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`let now = new Date(1997, 9, 3)`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`let value = Math.random() * 1000`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`const randomData = () => {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  now = new Date(now.getTime() + oneDay)`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  value = value + Math.random() * 21 - 10`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  return {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    name: now.toString(),`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    value: [`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      Math.round(value),`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    ],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  }`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`for (let i = 0; i < 1000; i++) data.push(randomData())`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`const option = {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  tooltip: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    trigger: 'axis',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    formatter: (params) => {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      const item = params[0]`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      const date = new Date(item.name)`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,"      return `${date.getDate()}/${")]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        date.getMonth() + 1`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,"      }/${date.getFullYear()} : ${item.value[1]}`")]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    axisPointer: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      animation: false,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  xAxis: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    type: 'time',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    splitLine: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      show: false,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  yAxis: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    type: 'value',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    boundaryGap: [0, '100%'],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    splitLine: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      show: false,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  toolbox: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    show: true,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    feature: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      mark: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        show: true,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      dataView: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        show: true,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        readOnly: false,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      restore: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        show: true,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      saveAsImage: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        show: true,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  series: [`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      name: 'Fake Data',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      type: 'line',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      showSymbol: false,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      data,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`const timeId = setInterval(() => {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  if (myChart._disposed) {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    clearInterval(timeId)`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    return`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  }`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  for (let i = 0; i < 5; i++) {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    data.shift()`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    data.push(randomData())`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  }`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  myChart.setOption({`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    series: [{ data }],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  })`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`}, 1000)`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,"```")]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`:::`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),n(g,{title:`柱状图`},{content:e(()=>[n(h,{config:`eJyNVM1u2zAMvvspeLO9BqnRYodlS4es7SGHoodhw4AgGJiYsYXJUiDJaYIi7z5K/mm8ZcF8EGWJfx/JT2utrIMcHcIUFsso2mgDiSQHgg+yjyw+wXsWV1dpUBtva1smT+jKsdG1ytstqlxXSQrv4CbL0jSKGsd664RW7Ok1AtjP9sJOwhagwv0EYu/xCffxiM+Ofjmc6rjDllhpjY4KbQ5BC0IWE1jEs3gE8Re/3PvlwS+P8bJREmpHxrK1MzU1R6hEhT6dh9oEOYHbLPvH3bcth2HzXiPkezOC62vQSh7AlQQSTUGM8hZWaCy8CClhRZALu5V4oLwDZckIYlSL4KnBBmAIpRMVfdXGneYJoLDyuH+0gPtCcJT+yFeh20tckeyK5j9b6pehS4CttqJBHRtRlK73BLBDWdOsK8HQMABoRaitpIJU3kUbRgpaTmu50lytcxoAG0JXG4bTpVuh+XU5+TaHBvR3QXx9GSuXNn/mLk1gg9L+7cdw1/RpDhejWtzRzM4rLP7PIoiwnBm5ME6Xxm2o8IhWqIJ7JoWitv1/XHa2byrHln2m9tRjVk7vQt7nuB04LUkVrmxY3nNsIZZwNYULVB/+30E2/gCf/QOQAXOF34GInVWH+xKNG1tyz+E1SNq56EjxOhjv5i06hlE7pgylxeKZMs85b/YzV44MD23yBk1sIOki/fQE1JbytO3WWnJdeqPGU8jNTwIPo/Kx/D8XLOGYo9CHNPoNJT1ucw==`,title:`A%20bar%20chart`,type:`js`})]),code:e(()=>[...l[7]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`::: echarts A bar chart`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,"```js")]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`const data = []`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`for (let i = 0; i < 5; i++) data.push(Math.round(Math.random() * 200))`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`const option = {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  xAxis: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    max: 'dataMax',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  yAxis: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    type: 'category',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    data: ['A', 'B', 'C', 'D', 'E'],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    inverse: true,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    animationDuration: 300,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    animationDurationUpdate: 300,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    max: 2, // only the largest 3 bars will be displayed`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  series: [`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      realtimeSort: true,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      name: 'X',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      type: 'bar',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      data,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      label: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        show: true,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        position: 'right',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        valueAnimation: true,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  legend: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    show: true,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  toolbox: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    show: true,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    feature: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      mark: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        show: true,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      dataView: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        show: true,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        readOnly: false,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      restore: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        show: true,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      saveAsImage: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        show: true,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  animationDuration: 0,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  animationDurationUpdate: 3000,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  animationEasing: 'linear',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  animationEasingUpdate: 'linear',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`const run = () => {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  for (let i = 0; i < data.length; i++)`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    data[i] += Math.round(Math.random() * Math.random() > 0.9 ? 2000 : 200)`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  myChart.setOption({`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    series: [{ type: 'bar', data }],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  })`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`const timeId = setInterval(() => {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  if (myChart._disposed) {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    clearInterval(timeId)`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    return`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  }`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  run()`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`}, 3000)`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,"```")]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`:::`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),n(g,{title:`饼图`},{content:e(()=>[n(h,{config:`eJyVk71ugzAUhfc8hWWpWwZCfhp1qzp1aaW26lJluCk3YNVgZF/SoirvXtslQH4gYcHce44/+9jwO2KMS4wxi/gdc5WtSeW24GtFpFJue7uxs5FScq1+Gp9J1LetSBfoDLazQaBCY22xrRT0V6s+nFY1Pd9rERC8C3T6+Rl7p+1qhOg5k6VVNiDNKUyjIXWwmwurG9jivXlMIb48yY/u+X84BrVAYz0fXqjjZ5A6Fn8ScUIii0Eie0hAE69XpTL3llxg09QQicLzwmDMJkGwqqVPzAi1k/g8uOFj5odG18rgW8UEe0gNVBCmr1TKo3RrpSPUL/sVl2dvpY7WjufVLcjCEWdBczmt5G47bOI+oyNsB2a67MaEAzBhN2Y6ANMTanY9JuwJNR+AWXRjFgMwPWdzez1m0hNq2cJUb6v6l1mNdqM/icX4bQ==`,title:`A%20nightingale%20chart`})]),code:e(()=>[...l[8]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`::: echarts A nightingale chart`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,"```json")]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`{`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  "legend": {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    "top": "bottom"`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  "toolbox": {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    "show": true,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    "feature": {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      "mark": {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        "show": true`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      "dataView": {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        "show": true,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        "readOnly": false`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      "restore": {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        "show": true`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      "saveAsImage": {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        "show": true`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      }`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    }`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  "series": [`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      "name": "Nightingale Chart",`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      "type": "pie",`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      "radius": [20, 100],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      "center": ["50%", "50%"],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      "roseType": "area",`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      "itemStyle": {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        "borderRadius": 8`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      "data": [`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          "value": 40,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          "name": "rose 1"`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          "value": 38,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          "name": "rose 2"`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          "value": 32,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          "name": "rose 3"`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          "value": 30,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          "name": "rose 4"`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          "value": 28,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          "name": "rose 5"`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          "value": 26,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          "name": "rose 6"`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          "value": 22,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          "name": "rose 7"`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          "value": 18,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          "name": "rose 8"`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        }`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      ]`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    }`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ]`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,"```")]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`:::`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),n(g,{title:`散点图`},{content:e(()=>[n(h,{config:`eJxtkj1uwzAMhXefgtAsEPqX3K1n6Bh4cFsPBlq0iD3EDXz3kkobhEo0COCnp8dHQecOQJ2eT/OinuC8ay43WS7TcZ64PlAFwDd4qWX7fP36eJl/JjpzhrWVv4/reFXzOliDRkNBE4Z/FVGqs4aEfbyl1rM2Yyy3tEcT2aFYobUXX+8FDReHlBrfwN0ah5osPXQo2EsHh5SBHJxMZolmFJCC3UMazGsI6GQvh46lRVCHhmjAkIW2voJv0lJYoqFJm2o3iiDenLrVeV07WZ23CG1GUzTEZt5Yk0VMZfiD11O1bt/8F9TyNq7rdFSV77QP3d79Ahlkc/0=`,title:`A%20scatter%20chart`})]),code:e(()=>[...l[9]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`::: echarts A scatter chart`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,"```json")]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`{`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  "xAxis": {},`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  "yAxis": {},`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  "series": [`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      "symbolSize": 20,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      "data": [`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        [10.0, 8.04],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        [8.07, 6.95],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        [13.0, 7.58],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        [9.05, 8.81],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        [11.0, 8.33],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        [14.0, 7.66],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        [13.4, 6.81],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        [10.0, 6.33],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        [14.0, 8.96],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        [12.5, 6.82],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        [9.15, 7.2],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        [11.5, 7.2],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        [3.03, 4.23],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        [12.2, 7.83],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        [2.02, 4.47],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        [1.05, 3.33],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        [4.05, 4.96],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        [6.03, 7.24],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        [12.0, 6.26],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        [12.0, 8.84],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        [7.08, 5.82],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        [5.02, 5.68]`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      ],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      "type": "scatter"`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    }`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ]`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,"```")]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`:::`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),n(g,{title:`极坐标图`},{content:e(()=>[n(h,{config:`eJxVkDFPwzAQhXf/ituS0KqkgiJU6NCRAakSY9TBao7kJNeO7CuiQv3vnO0kgsU+v3vf89knZwNDq1nDDpqjUp/OQ2mQgUSoX2R73cG6jtViUcGPAsgM95igkuA+Giq4g4eneu576W1EK9ewgHfN/SqQLcuMCfGciNQ4vFWVcHGK1XAJfdn4Zc4/VuqmVA7skbqeJfVxU0+aG5icFS3OZbBD225TndO20BSGLBbHpWi3uAzOaC+edGDnDNMwIeyp61C6hf6mUEQHQCwPjizHRvaJ8zqg2E7ehcmXAtOibWdwL9icm91f2lxwdAfWnvfRuIV6Jr1u6RJGNCkBPaGcmkRN15+c8y1ZzfhxDYxnCU/vGsMBrD7HG9PbJ22c4p8WP+nP+PJNN/ULaOeRXw==`,title:`Two%20Value-Axes%20in%20Polar`,type:`js`})]),code:e(()=>[...l[10]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`::: echarts Two Value-Axes in Polar`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,"```js")]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`const data = []`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`for (let i = 0; i <= 100; i++) {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  const theta = (i / 100) * 360`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  const r = 5 * (1 + Math.sin((theta / 180) * Math.PI))`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  data.push([r, theta])`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`const height = 450`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`const option = {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  legend: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    data: ['line'],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  polar: {},`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  tooltip: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    trigger: 'axis',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    axisPointer: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      type: 'cross',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  angleAxis: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    type: 'value',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    startAngle: 0,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  radiusAxis: {},`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  series: [`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      coordinateSystem: 'polar',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      name: 'line',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      type: 'line',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      data,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,"```")]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`:::`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),n(g,{title:`烛台图`},{content:e(()=>[n(h,{config:`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`,title:`Stocks`,type:`js`})]),code:e(()=>[...l[11]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`::: echarts Stocks`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,"```js")]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`const upColor = '#ec0000'`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`const upBorderColor = '#8A0000'`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`const downColor = '#00da3c'`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`const downBorderColor = '#008F28'`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`const splitData = (rawData) => {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  const categoryData = []`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  const values = []`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  for (let i = 0; i < rawData.length; i++) {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    categoryData.push(rawData[i].splice(0, 1)[0])`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    values.push(rawData[i])`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  }`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  return {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    categoryData,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    values,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  }`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`// Each item: open，close，lowest，highest`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`const data0 = splitData([`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/1/24', 2320.26, 2320.26, 2287.3, 2362.94],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/1/25', 2300, 2291.3, 2288.26, 2308.38],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/1/28', 2295.35, 2346.5, 2295.35, 2346.92],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/1/29', 2347.22, 2358.98, 2337.35, 2363.8],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/1/30', 2360.75, 2382.48, 2347.89, 2383.76],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/1/31', 2383.43, 2385.42, 2371.23, 2391.82],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/2/1', 2377.41, 2419.02, 2369.57, 2421.15],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/2/4', 2425.92, 2428.15, 2417.58, 2440.38],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/2/5', 2411, 2433.13, 2403.3, 2437.42],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/2/6', 2432.68, 2434.48, 2427.7, 2441.73],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/2/7', 2430.69, 2418.53, 2394.22, 2433.89],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/2/8', 2416.62, 2432.4, 2414.4, 2443.03],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/2/18', 2441.91, 2421.56, 2415.43, 2444.8],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/2/19', 2420.26, 2382.91, 2373.53, 2427.07],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/2/20', 2383.49, 2397.18, 2370.61, 2397.94],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/2/21', 2378.82, 2325.95, 2309.17, 2378.82],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/2/22', 2322.94, 2314.16, 2308.76, 2330.88],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/2/25', 2320.62, 2325.82, 2315.01, 2338.78],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/2/26', 2313.74, 2293.34, 2289.89, 2340.71],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/2/27', 2297.77, 2313.22, 2292.03, 2324.63],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/2/28', 2322.32, 2365.59, 2308.92, 2366.16],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/3/1', 2364.54, 2359.51, 2330.86, 2369.65],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/3/4', 2332.08, 2273.4, 2259.25, 2333.54],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/3/5', 2274.81, 2326.31, 2270.1, 2328.14],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/3/6', 2333.61, 2347.18, 2321.6, 2351.44],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/3/7', 2340.44, 2324.29, 2304.27, 2352.02],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/3/8', 2326.42, 2318.61, 2314.59, 2333.67],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/3/11', 2314.68, 2310.59, 2296.58, 2320.96],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/3/12', 2309.16, 2286.6, 2264.83, 2333.29],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/3/13', 2282.17, 2263.97, 2253.25, 2286.33],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/3/14', 2255.77, 2270.28, 2253.31, 2276.22],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/3/15', 2269.31, 2278.4, 2250, 2312.08],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/3/18', 2267.29, 2240.02, 2239.21, 2276.05],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/3/19', 2244.26, 2257.43, 2232.02, 2261.31],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/3/20', 2257.74, 2317.37, 2257.42, 2317.86],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/3/21', 2318.21, 2324.24, 2311.6, 2330.81],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/3/22', 2321.4, 2328.28, 2314.97, 2332],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/3/25', 2334.74, 2326.72, 2319.91, 2344.89],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/3/26', 2318.58, 2297.67, 2281.12, 2319.99],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/3/27', 2299.38, 2301.26, 2289, 2323.48],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/3/28', 2273.55, 2236.3, 2232.91, 2273.55],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/3/29', 2238.49, 2236.62, 2228.81, 2246.87],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/4/1', 2229.46, 2234.4, 2227.31, 2243.95],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/4/2', 2234.9, 2227.74, 2220.44, 2253.42],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/4/3', 2232.69, 2225.29, 2217.25, 2241.34],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/4/8', 2196.24, 2211.59, 2180.67, 2212.59],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/4/9', 2215.47, 2225.77, 2215.47, 2234.73],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/4/10', 2224.93, 2226.13, 2212.56, 2233.04],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/4/11', 2236.98, 2219.55, 2217.26, 2242.48],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/4/12', 2218.09, 2206.78, 2204.44, 2226.26],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/4/15', 2199.91, 2181.94, 2177.39, 2204.99],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/4/16', 2169.63, 2194.85, 2165.78, 2196.43],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/4/17', 2195.03, 2193.8, 2178.47, 2197.51],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/4/18', 2181.82, 2197.6, 2175.44, 2206.03],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/4/19', 2201.12, 2244.64, 2200.58, 2250.11],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/4/22', 2236.4, 2242.17, 2232.26, 2245.12],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/4/23', 2242.62, 2184.54, 2182.81, 2242.62],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/4/24', 2187.35, 2218.32, 2184.11, 2226.12],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/4/25', 2213.19, 2199.31, 2191.85, 2224.63],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/4/26', 2203.89, 2177.91, 2173.86, 2210.58],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/5/2', 2170.78, 2174.12, 2161.14, 2179.65],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/5/3', 2179.05, 2205.5, 2179.05, 2222.81],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/5/6', 2212.5, 2231.17, 2212.5, 2236.07],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/5/7', 2227.86, 2235.57, 2219.44, 2240.26],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/5/8', 2242.39, 2246.3, 2235.42, 2255.21],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/5/9', 2246.96, 2232.97, 2221.38, 2247.86],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/5/10', 2228.82, 2246.83, 2225.81, 2247.67],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/5/13', 2247.68, 2241.92, 2231.36, 2250.85],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/5/14', 2238.9, 2217.01, 2205.87, 2239.93],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/5/15', 2217.09, 2224.8, 2213.58, 2225.19],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/5/16', 2221.34, 2251.81, 2210.77, 2252.87],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/5/17', 2249.81, 2282.87, 2248.41, 2288.09],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/5/20', 2286.33, 2299.99, 2281.9, 2309.39],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/5/21', 2297.11, 2305.11, 2290.12, 2305.3],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/5/22', 2303.75, 2302.4, 2292.43, 2314.18],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/5/23', 2293.81, 2275.67, 2274.1, 2304.95],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/5/24', 2281.45, 2288.53, 2270.25, 2292.59],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/5/27', 2286.66, 2293.08, 2283.94, 2301.7],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/5/28', 2293.4, 2321.32, 2281.47, 2322.1],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/5/29', 2323.54, 2324.02, 2321.17, 2334.33],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/5/30', 2316.25, 2317.75, 2310.49, 2325.72],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/5/31', 2320.74, 2300.59, 2299.37, 2325.53],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/6/3', 2300.21, 2299.25, 2294.11, 2313.43],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/6/4', 2297.1, 2272.42, 2264.76, 2297.1],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/6/5', 2270.71, 2270.93, 2260.87, 2276.86],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/6/6', 2264.43, 2242.11, 2240.07, 2266.69],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/6/7', 2242.26, 2210.9, 2205.07, 2250.63],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ['2013/6/13', 2190.1, 2148.35, 2126.22, 2190.1],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`])`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`const calculateMA = (dayCount) => {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  const result = []`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  for (let i = 0; i < data0.values.length; i++) {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    if (i < dayCount) {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      result.push('-')`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      continue`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    }`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    let sum = 0`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    for (let j = 0; j < dayCount; j++) sum += Number(data0.values[i - j][1])`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    result.push(sum / dayCount)`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  }`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  return result`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`const option = {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  tooltip: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    trigger: 'axis',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    axisPointer: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      type: 'cross',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  legend: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30'],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  grid: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    left: '10%',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    right: '10%',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    bottom: '15%',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  xAxis: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    type: 'category',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    data: data0.categoryData,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    boundaryGap: false,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    axisLine: { onZero: false },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    splitLine: { show: false },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    min: 'dataMin',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    max: 'dataMax',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  yAxis: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    scale: true,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    splitArea: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      show: true,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  dataZoom: [`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      type: 'inside',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      start: 50,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      end: 100,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      show: true,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      type: 'slider',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      top: '90%',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      start: 50,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      end: 100,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  series: [`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      name: '日K',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      type: 'candlestick',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      data: data0.values,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      itemStyle: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        color: upColor,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        color0: downColor,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        borderColor: upBorderColor,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        borderColor0: downBorderColor,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      markPoint: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        label: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          formatter: (param) =>`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`            param == null ? '' : Math.round(param.value).toString(),`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        data: [`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`            name: 'Mark',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`            coord: ['2013/5/31', 2300],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`            value: 2300,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`            itemStyle: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`              color: 'rgb(41,60,85)',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`            },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`            name: 'highest value',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`            type: 'max',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`            valueDim: 'highest',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`            name: 'lowest value',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`            type: 'min',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`            valueDim: 'lowest',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`            name: 'average value on close',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`            type: 'average',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`            valueDim: 'close',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        ],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        tooltip: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,"          formatter: (param) => `${param.name}<br>${param.data.coord || ''}`,")]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      markLine: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        symbol: ['none', 'none'],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        data: [`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          [`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`            {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`              name: 'from lowest to highest',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`              type: 'min',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`              valueDim: 'lowest',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`              symbol: 'circle',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`              symbolSize: 10,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`              label: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`                show: false,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`              },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`              emphasis: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`                label: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`                  show: false,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`                },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`              },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`            },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`            {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`              type: 'max',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`              valueDim: 'highest',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`              symbol: 'circle',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`              symbolSize: 10,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`              label: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`                show: false,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`              },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`              emphasis: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`                label: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`                  show: false,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`                },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`              },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`            },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          ],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`            name: 'min line on close',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`            type: 'min',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`            valueDim: 'close',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`            name: 'max line on close',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`            type: 'max',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`            valueDim: 'close',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        ],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      name: 'MA5',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      type: 'line',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      data: calculateMA(5),`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      smooth: true,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      lineStyle: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        opacity: 0.5,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      name: 'MA10',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      type: 'line',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      data: calculateMA(10),`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      smooth: true,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      lineStyle: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        opacity: 0.5,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      name: 'MA20',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      type: 'line',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      data: calculateMA(20),`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      smooth: true,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      lineStyle: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        opacity: 0.5,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      name: 'MA30',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      type: 'line',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      data: calculateMA(30),`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      smooth: true,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      lineStyle: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        opacity: 0.5,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,"```")]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`:::`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),n(g,{title:`雷达图`},{content:e(()=>[n(h,{config:`eJx1Uj1vgzAQ3fMrTp4ZIE2iqhttlw6d6IYYLLhSVGMjY1CjKP+9dzYfbVoWzDu/dx/vfNkBCIU16ko8ACPClXSSUC5SpUwpHVbwOFQ1OhGBSEs3SAVZR5JG16IgzTXiNFZW0q5ZGronseFQ7kMAFxBatkgRkUmFPSds5Rfh0zGOQ54bXlq1jW56Z6VrjF4FySneULzod2NbT4c3LD+0UaY+r8o7Ev6vfBp6Z1q0kA1dZ6yfd9Lcb2mecURluhb1D/pxv0V/lfYTHRu3kPc0OpE9d3WzR9uQQbN3wVSKz4nCRmDsoZ9XMZcT7tx5TtjIEp73OuE1qb8dpRpYlR+o+ci7FAHPwYBbjIC/dCRsRjGn/dXVnxezkBYztsqGEskh1OUSdPCSI+COGCXbdW9e5Vp2+mNjAyp21903CYG6ew==`,title:`A%20Radar%20Chart`})]),code:e(()=>[...l[12]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`::: echarts A Radar Chart`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,"```json")]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`{`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  "legend": {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    "data": ["Allocated Budget", "Actual Spending"]`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  "radar": {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    "indicator": [`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      { "name": "Sales", "max": 6500 },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      { "name": "Administration", "max": 16000 },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      { "name": "Information Technology", "max": 30000 },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      { "name": "Customer Support", "max": 38000 },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      { "name": "Development", "max": 52000 },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      { "name": "Marketing", "max": 25000 }`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    ]`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  "series": [`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      "name": "Budget vs spending",`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      "type": "radar",`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      "data": [`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          "value": [4200, 3000, 20000, 35000, 50000, 18000],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          "name": "Allocated Budget"`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          "value": [5000, 14000, 28000, 26000, 42000, 21000],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          "name": "Actual Spending"`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        }`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      ]`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    }`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ]`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,"```")]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`:::`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),n(g,{title:`热力图`},{content:e(()=>[n(h,{config:`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`,type:`js`})]),code:e(()=>[...l[13]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`::: echarts`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,"```js")]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`/*`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,` * perlin noise helper from https://github.com/josephg/noisejs`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,` */`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`function getNoiseHelper() {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  class Grad {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    constructor(x, y, z) {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      this.x = x`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      this.y = y`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      this.z = z`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    }`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    dot2(x, y) {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      return this.x * x + this.y * y`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    }`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    dot3(x, y, z) {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      return this.x * x + this.y * y + this.z * z`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    }`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  }`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  const grad3 = [`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    new Grad(1, 1, 0),`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    new Grad(-1, 1, 0),`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    new Grad(1, -1, 0),`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    new Grad(-1, -1, 0),`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    new Grad(1, 0, 1),`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    new Grad(-1, 0, 1),`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    new Grad(1, 0, -1),`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    new Grad(-1, 0, -1),`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    new Grad(0, 1, 1),`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    new Grad(0, -1, 1),`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    new Grad(0, 1, -1),`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    new Grad(0, -1, -1),`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ]`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  const p = [`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    141, 128, 195, 78, 66, 215, 61, 156, 180,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ]`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  // To remove the need for index wrapping, double the permutation table length`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  const perm = new Array(512)`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  const gradP = new Array(512)`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  // This isn't a very good seeding function, but it works ok. It supports 2^16`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  // different seed values. Write something better if you need more seeds.`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  const generateSeed = (seedValue) => {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    let seed = seedValue`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    if (seed > 0 && seed < 1) {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      // Scale the seed out`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      seed *= 65536`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    }`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    seed = Math.floor(seed)`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    if (seed < 256) {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      seed |= seed << 8`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    }`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    for (let i = 0; i < 256; i++) {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      let v`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      if (i & 1) {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        v = p[i] ^ (seed & 255)`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      } else {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        v = p[i] ^ ((seed >> 8) & 255)`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      }`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      perm[i] = v`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      perm[i + 256] = v`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      gradP[i] = grad3[v % 12]`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      gradP[i + 256] = grad3[v % 12]`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    }`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  }`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  generateSeed(0)`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  // ##### Perlin noise stuff`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  function fade(t) {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    return t * t * t * (t * (t * 6 - 15) + 10)`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  }`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  function lerp(a, b, t) {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    return (1 - t) * a + t * b`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  }`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  // 2D Perlin Noise`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  function perlin2(x, y) {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    // Find unit grid cell containing point`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    let X = Math.floor(x)`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    let Y = Math.floor(y)`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    // Get relative xy coordinates of point within that cell`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    const relativeX = x - X`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    const relativeY = y - Y`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    // Wrap the integer cells at 255 (smaller integer period can be introduced here)`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    X &= 255`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    Y &= 255`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    // Calculate noise contributions from each of the four corners`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    const n00 = gradP[X + perm[Y]].dot2(relativeX, relativeY)`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    const n01 = gradP[X + perm[Y + 1]].dot2(relativeX, relativeY - 1)`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    const n10 = gradP[X + 1 + perm[Y]].dot2(relativeX - 1, relativeY)`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    const n11 = gradP[X + 1 + perm[Y + 1]].dot2(relativeX - 1, relativeY - 1)`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    // Compute the fade curve value for x`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    const u = fade(relativeX)`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    // Interpolate the four results`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    return lerp(lerp(n00, n10, u), lerp(n01, n11, u), fade(relativeY))`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  }`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  return {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    generateSeed,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    perlin2,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  }`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`const noise = getNoiseHelper()`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`const xData = []`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`const yData = []`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`noise.generateSeed(Math.random())`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`const data = []`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`for (let i = 0; i <= 200; i++) {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  for (let j = 0; j <= 100; j++) {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    data.push([i, j, noise.perlin2(i / 40, j / 20) + 0.5])`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  }`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  xData.push(i)`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`for (let j = 0; j < 100; j++) {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  yData.push(j)`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`option = {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  tooltip: {},`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  xAxis: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    type: 'category',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    data: xData,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  yAxis: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    type: 'category',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    data: yData,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  visualMap: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    min: 0,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    max: 1,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    calculable: true,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    realtime: false,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    inRange: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      color: [`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        '#313695',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        '#4575b4',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        '#74add1',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        '#abd9e9',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        '#e0f3f8',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        '#ffffbf',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        '#fee090',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        '#fdae61',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        '#f46d43',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        '#d73027',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        '#a50026',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      ],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  series: [`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      name: 'Gaussian',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      type: 'heatmap',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      data,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      emphasis: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        itemStyle: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          borderColor: '#333',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          borderWidth: 1,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      progressive: 1000,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      animation: false,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`const height = 500`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,"```")]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`:::`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),n(g,{title:`树图`},{content:e(()=>[n(h,{config:`eJxNUU1PwzAMvfdX5IK6StAO8alK48LuHIAT4pC13pKpiaPYHSpo/x2npRs91Mp7z37PSYOeWLWatVop/aUtqy1wYxaZUrlhDlRXFRtwcGUwwJUmAqby0MOeyhCBqErN1bbTEco9oc8vs6KUDr9YCF2o1ZOSOlKLosiyyREDW/Ti+SNGjNixDfV4kGO0ux3EWuWWwcm8f+CLF9hhT+DwACN3TD+CaIFq9TGKpznSNAQQPUeYpOlLcUWXyueMMYp5fv14cVJtkBldAm/PYKcH7FnAqFuruxNOg9tgJzi4wMOzjU139pvIV/stSR5m0HrLMuFNgq0hsKnVzUxpb51Ol7Pu41jfg2RNzXfLWSM+RpOVfedNldpi0wuQt0AN+FZ7PkUYb+ivyM7H+REM2J1heYT75TL7BZIRlko=`,title:`Tree`,type:`js`})]),code:e(()=>[...l[14]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`::: echarts Tree`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,"```js")]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`const data = await fetch(`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  'https://theme-hope-assets.vuejs.press/data/flare.json',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`).then((res) => res.json())`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`const option = {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  tooltip: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    trigger: 'item',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    triggerOn: 'mousemove',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  series: [`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      type: 'tree',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      data: [data],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      top: '18%',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      bottom: '14%',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      layout: 'radial',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      symbol: 'emptyCircle',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      symbolSize: 7,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      initialTreeDepth: 3,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      animationDurationUpdate: 750,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      emphasis: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        focus: 'descendant',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`const height = 600`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,"```")]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`:::`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),n(g,{title:`多图`},{content:e(()=>[n(h,{config:`eJztVL2O2zAM3vMUXAK1QGD4J8qPgQLtZSpw7VSgQ9BBZzO2UMcybLmXIMi7l5R0roM+QJcuoviRH0lJFAvTDhZMZ7Vp4QPcFgANVtiWOdzuK9KsMY3VHamkkNrrqsI+B6EuehDsATDU5vVgWoutzeGkmgEZd/RSWTUgwZ4+mLEvMIej0wCOoutNORZWrECkcZIGmQW5DlIGuQlyK3741Bzii25+wjdUZJObSK5gl0YJrbtou4JtzHuZRWtCZJTMecoWtYJnZS0yN3GeCXtK8nSsjCJk0W4FG4o24x5qxAHhYArDedcuyyaNUlr3XEO24ThryUiWRnLG/a6adrTw1JvXVnPm1HttOcY64X1CGbMs2pO+n2p2wt3q5RNdPt0p2GtHtykKZbEy/VV48/XNXPW6/NyWeMkh9iZGHNHQkwopl4EyYK+ROP5h/GPRa/vwjW6pzIANZ2NsnVMnjO6ZHebYz+pqRvt0JQYdbSLguavV4As6mWKkjfCEkDsc6n/af5G24w4MELfGA9CrUrtQWbycwIK+OU+Ao5CM0n+kLprae1ZIQGBWUHOawoRyaN6oF2we3fsz/0meMreXO5k+8mi4w7tbeV++/zsCtoUp6TB/QmiL56/q7A74NmAm4y/VjGzx82aCp0n3aJjfHp3yvlj4mVmjrmpLM3MXx4vfwFNXcQ==`,type:`js`})]),code:e(()=>[...l[15]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`::: echarts`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,"```js")]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`const option = {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  legend: {},`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  tooltip: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    trigger: 'axis',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    showContent: false,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  dataset: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    source: [`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      ['product', '2012', '2013', '2014', '2015', '2016', '2017'],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      ['Milk Tea', 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      ['Matcha Latte', 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      ['Cheese Cocoa', 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      ['Walnut Brownie', 25.2, 37.1, 41.2, 18, 33.9, 49.1],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    ],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  xAxis: { type: 'category' },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  yAxis: { gridIndex: 0 },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  grid: { top: '55%' },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  series: [`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      type: 'line',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      smooth: true,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      seriesLayoutBy: 'row',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      emphasis: { focus: 'series' },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      type: 'line',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      smooth: true,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      seriesLayoutBy: 'row',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      emphasis: { focus: 'series' },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      type: 'line',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      smooth: true,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      seriesLayoutBy: 'row',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      emphasis: { focus: 'series' },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      type: 'line',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      smooth: true,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      seriesLayoutBy: 'row',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      emphasis: { focus: 'series' },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      type: 'pie',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      id: 'pie',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      radius: '30%',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      center: ['50%', '25%'],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      emphasis: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        focus: 'self',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      label: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        formatter: '{b}: {@2012} ({d}%)',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      encode: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        itemName: 'product',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        value: '2012',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        tooltip: '2012',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`const height = 800`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,"```")]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`:::`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),n(g,{title:`词云 (通过设置函数)`},{content:e(()=>[n(h,{config:`eJy1Vttu3EYMfe9XEEkDr4v1XnLPAgVqJ3EbFKmBJkVRBAEyK41W0x1p1NHI622Qf+8hR7e1t31pqyeJ4pCH5CGHiSvrQK4KxpX0LX3+img+p0SV16qmtUq2G++aMqXEWefxcxC9ZMmKTu5nmTqZxnPvc02Fa2pNlTNl0J5yVW5qCo5SU1dW7SlA5VrZRuNEcM4GU63o8xc2UGtvdL2iD3gngcJP2FcabnbOpy+ta1L4av+0DutcVZpcJqbvJaxzTzx6tZvRS1XSWpMq98BklSf9R6MkWq8rr2sNmCkhWDVYTZS1HChlTZmw7pScJ0VbvWcY1J6b0fm1MlatLeKNIpjxmhLjE8gmqc5UY8MpB9eb9qlxJqWJqirowG6ulQ9tFEnjr/VUIikcCrMt3a68Bfx0imSqwqEqk8GwsgZBIAs11LyGUvAGybf6LHN+B7eDZArvnXqv1VTebPIwpQpxqA0HreCiDsrPuowLSBQjBnhQiR+1rpDGSieBPONk44Wqt28KtZE4l6slAUo0Uo9raIAkMhBvdVNVznNRalMmmnSSIz/1GWdeivvdw9lytmjPb+H2XLyuKFO21mNM5zBhc9foEDQZwbHLTZJLfvEGKVKlaGesZZLom8Q2KTxn3hXCH1NuKOibUM+Oci6CluNopGDKRjPzuLR75hT7OaCnBMAq6KFdn1YY7TO1Gl7HoVw6a53AsToL8+Cq+c6kIZ/nmqs2l9rN1y4EIGcOogkRB9JdudowTAmF42YGC47B+qtIVAaGNFRNIFNGvNweoD6IkCOeZ08e0A09XzxAYv/UPX6GxKwQZZkF0rgOnX1bKKAhfrZ40MtiCBDCcC+UgFZUNtZ2ohhdJxsVBAUSQCBeeVBjGTQcS6rCUOYC9UFyghsVdZSBXF1Dx5SmaApaPqxuJPxC3Yjg6QKCg+j542d2jMm1fDiFxsc76LwL7dARhLGx0DAMTW+81rOo10EUfWCEeuoKkAmK8eiHsxeLKb1YfKT1vjf7jm09ftJ57cQdqu5In9vRsRXOjeFKHlu2bjwGFTxX5kbbWthUKL/tmKTi9DPWhH1PcLk5BnMsw/DagES9RXYRZ9zabPo/qkLgYac1GgoURce1VvjMOxxZ0fMDoFqqFXzbc9wfkdyRxdy+gI7ZgfS5JtQmHdpQUI7Kfz6c7jHh4pD+HSWkvRdHDv6jMca2rppwlV3w1XpklJkIIMOUiYjgAtdnzK1Uhn/zqOrQxftWp6PLZ5draEHVYSp5U277QzN6k5FB2wN4zGtEMFhlZg6WSheEprpMtdfp3eNcllun+QDcNuX2YJj+i6zFIN67S3Ns+gNSpT1SUyBLezAAbYdLgF2NAPx09f41J0tucYQgSK1WQqNf3tDaukQYj+QJITBbAdQ63PVgRUvVdg6Km/POyypmYQTpe+vWysaU1GFveQmSUQnBO/7GKtSKSGp9qQpj9xiNtSrrM16Qsn5CRo1fu+G5dpZ3o+4fvMmGxpyVBejuVhOXGtnsgAap3PSnRTg5HaERixgoGEf9Mtg9XofGl/TJb9aTrz/H9a173qqQz2RhnMRXMQHT39Dy6aJfjf5f5Y+z37GPTk6mJ6dfTj/1P2TrPHjRRYV7zmAJHdchaSA4qbXl5Pfyo0VrxblK3e7CNliQl4sxkuFvvz8/evRoVLcxptH1xPcXaIdaKu/VfkavFe44eQdrdUFFg3VRrq5SFfGGibdf5R3aIOxHnO+Rx1NtMyP2sO/mEfx1izg/4wDZPnBfN7I/y5IDhzm8jMKg6B0zG8+R6I6afOtnP/yNmeUCz51E3s1+S13uBwuuH5gaOT9e6X+0O1i+f/Hq4vXl+YFtfrDp9VV/fPznVZZhQP6GeG4pHGAbffSv7eUt33j/8tVf41IOsw==`,type:`js`})]),code:e(()=>[...l[16]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`::: echarts`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,"```js")]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`const option = {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  // canvas background color`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  backgroundColor: '#ffa',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  // The mouse pointer hangs to display the value`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  tooltip: {},`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  series: [`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      type: 'wordCloud',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      // The shape of the "cloud" to draw. Can be any polar equation represented as a`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      // callback function, or a keyword present. Available presents are circle (default),`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      // cardioid (apple or heart shape curve, the most known polar equation), diamond (`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      // alias of square), triangle-forward, triangle, (alias of triangle-upright, pentagon, and star.`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      shape: 'circle',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      // Keep aspect ratio of maskImage or 1:1 for shapes`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      // This option is supported since echarts-wordcloud@2.1.0`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      keepAspect: false,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      // A silhouette image which the white area will be excluded from drawing texts.`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      // The shape option will continue to apply as the shape of the cloud to grow.`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      // maskImage: maskImage,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      // Following left/top/width/height/right/bottom are used for positioning the word cloud`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      // Default to be put in the center and has 75% x 80% size.`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      left: 'center',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      top: 'center',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      width: '70%',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      height: '80%',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      right: null,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      bottom: null,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      // Text size range which the value in data will be mapped to.`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      // Default to have minimum 12px and maximum 60px size.`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      sizeRange: [12, 60],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      // Text rotation range and step in degree. Text will be rotated randomly in range [-90, 90] by rotationStep 45`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      rotationRange: [-90, 90],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      rotationStep: 45,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      // size of the grid in pixels for marking the availability of the canvas`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      // the larger the grid size, the bigger the gap between words.`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      gridSize: 8,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      // set to true to allow word to be drawn partly outside of the canvas.`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      // Allow word bigger than the size of the canvas to be drawn`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      // This option is supported since echarts-wordcloud@2.1.0`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      drawOutOfBound: false,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      // if the font size is too large for the text to be displayed,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      // whether to shrink the text. If it is set to false, the text will`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      // not be rendered. If it is set to true, the text will be shrunk.`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      // This option is supported since echarts-wordcloud@2.1.0`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      shrinkToFit: false,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      // If perform layout animation.`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      // NOTE disable it will lead to UI blocking when there is lots of words.`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      layoutAnimation: true,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      // Global text style`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      textStyle: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        fontFamily: 'sans-serif',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        fontWeight: 'bold',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        // Color can be a callback function or a color string`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        color() {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          // Random color`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,"          return `rgb(${[")]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`            Math.round(Math.random() * 160),`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`            Math.round(Math.random() * 160),`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`            Math.round(Math.random() * 160),`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,"          ].join(',')})`")]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      emphasis: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        focus: 'self',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        textStyle: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          textShadowBlur: 10,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          textShadowColor: '#333',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      // Data is an array. Each array item must have name and value property.`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      // textStyle must not be empty`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      data: [`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          name: 'vuepress theme hope',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          value: 8888,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          name: 'Mr.Hope',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          value: 10000,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          textStyle: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`            color: 'black',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          emphasis: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`            textStyle: {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`              color: '#BDBEFA',`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`              shadowBlur: 4,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`              shadowOffsetY: 14,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`            },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`          },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      ],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,"```")]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`:::`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1})])}var f=c(u,[[`render`,d]]);export{l as _pageData,f as default};