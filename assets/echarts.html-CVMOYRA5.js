import{_ as m,c as b,d,b as e,w as a,r,o as v,a as n,e as s}from"./app-Jc7SvwFk.js";const o={};function h(g,l){const t=r("CodeTabs"),i=r("ECharts"),p=r("VPPreview");return v(),b("div",null,[l[17]||(l[17]=d('<h1 id="echarts" tabindex="-1"><a class="header-anchor" href="#echarts"><span>ECharts</span></a></h1><p>Add <a href="https://echarts.apache.org/en/index.html" target="_blank" rel="noopener noreferrer">ECharts</a> support to the Markdown files in your VuePress site.</p><h2 id="installation" tabindex="-1"><a class="header-anchor" href="#installation"><span>Installation</span></a></h2><p>Install <a href="https://echarts.apache.org/en/index.html" target="_blank" rel="noopener noreferrer">ECharts</a> in your project:</p>',4)),e(t,{data:[{id:"pnpm"},{id:"yarn"},{id:"npm"}],"tab-id":"shell"},{title0:a(({value:c,isActive:u})=>[...l[0]||(l[0]=[s("pnpm",-1)])]),title1:a(({value:c,isActive:u})=>[...l[1]||(l[1]=[s("yarn",-1)])]),title2:a(({value:c,isActive:u})=>[...l[2]||(l[2]=[s("npm",-1)])]),tab0:a(({value:c,isActive:u})=>[...l[3]||(l[3]=[n("div",{class:"language-bash","data-highlighter":"shiki","data-ext":"bash",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[n("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[n("code",{class:"language-bash"},[n("span",{class:"line"},[n("span",{style:{"--shiki-light":"#4078F2","--shiki-dark":"#61AFEF"}},"pnpm"),n("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}}," add"),n("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}}," -D"),n("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}}," echarts")])])])],-1)])]),tab1:a(({value:c,isActive:u})=>[...l[4]||(l[4]=[n("div",{class:"language-bash","data-highlighter":"shiki","data-ext":"bash",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[n("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[n("code",{class:"language-bash"},[n("span",{class:"line"},[n("span",{style:{"--shiki-light":"#4078F2","--shiki-dark":"#61AFEF"}},"yarn"),n("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}}," add"),n("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}}," -D"),n("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}}," echarts")])])])],-1)])]),tab2:a(({value:c,isActive:u})=>[...l[5]||(l[5]=[n("div",{class:"language-bash","data-highlighter":"shiki","data-ext":"bash",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[n("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[n("code",{class:"language-bash"},[n("span",{class:"line"},[n("span",{style:{"--shiki-light":"#4078F2","--shiki-dark":"#61AFEF"}},"npm"),n("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}}," i"),n("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}}," -D"),n("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}}," echarts")])])])],-1)])]),_:1}),l[18]||(l[18]=d(`<p>Then enable it via:</p><div class="code-block-with-title"><div class="code-block-title-bar" data-title=".vuepress/config.ts"><span>.vuepress/config.ts</span></div><div class="language-ts line-numbers-mode" data-highlighter="shiki" data-ext="ts" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-ts"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">markdownChartPlugin</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;@vuepress/plugin-markdown-chart&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">export</span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD;"> default</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  plugins</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> [</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    markdownChartPlugin</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">({</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">      // Enable ECharts</span></span>
<span class="line highlighted"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">      echarts</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> true</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }),</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  ],</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><h2 id="syntax" tabindex="-1"><a class="header-anchor" href="#syntax"><span>Syntax</span></a></h2><h3 id="with-json" tabindex="-1"><a class="header-anchor" href="#with-json"><span>With JSON</span></a></h3><p>If you can generate your chart data easily, you can just provide echarts config using JSON code block:</p><div class="language-md" data-highlighter="shiki" data-ext="md" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-md"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">::: echarts Title</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">\`\`\`json</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">  // Your echarts config here.</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">\`\`\`</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:::</span></span></code></pre></div><h3 id="with-scripts" tabindex="-1"><a class="header-anchor" href="#with-scripts"><span>With Scripts</span></a></h3><p>You should use <code>json</code> code block to provide your ECharts configuration whenever possible, however for dynamic data generation, you can also use script blocks.</p><p>Both <code>js</code> or <code>javascript</code> code block are supported. We will expose the echarts lib as <code>echarts</code> and the instance as <code>myChart</code> in the script, and you are expected to assign the echarts option object to <code>option</code> variable. Also, you can assign <code>width</code> and <code>height</code> variable to set the chart size.</p><div class="hint-container warning"><p class="hint-container-title">Warning</p><p>For security reasons, you need to manually allow script blocks in certain files. Set <code>DANGEROUS_ALLOW_SCRIPT_EXECUTION: true</code> and <code>DANGEROUS_SCRIPT_EXECUTION_ALLOWLIST: [&#39;your/file/path.md&#39;]</code> in plugin options.</p></div><div class="language-md" data-highlighter="shiki" data-ext="md" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-md"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">::: echarts Title</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">\`\`\`js</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B;"> option</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">  // Your echarts config here.</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">\`\`\`</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:::</span></span></code></pre></div><div class="hint-container tip"><p class="hint-container-title">Tips</p><p>You can use top-level await and <code>fetch</code> to get data from network requests.</p></div><h2 id="advanced" tabindex="-1"><a class="header-anchor" href="#advanced"><span>Advanced</span></a></h2><p>You can import and call <code>defineEChartsConfig</code> in <a href="https://vuejs.press/guide/configuration.html#client-config-file" target="_blank" rel="noopener noreferrer">client config file</a> to customize echarts.</p><div class="code-block-with-title"><div class="code-block-title-bar" data-title=".vuepress/client.ts"><span>.vuepress/client.ts</span></div><div class="language-ts line-numbers-mode" data-highlighter="shiki" data-ext="ts" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-ts"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">defineEChartsConfig</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;@vuepress/plugin-markdown-chart/client&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">defineEChartsConfig</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">({</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  options</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">    // global echarts options</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  },</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">  setup</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> async</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> () </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=&gt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">    // echarts setup</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">    // e.g.: await import(&quot;echarts-wordcloud&quot;)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  },</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">})</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><h2 id="docs" tabindex="-1"><a class="header-anchor" href="#docs"><span>Docs</span></a></h2><p>For details, please see <a href="https://echarts.apache.org/handbook/en/get-started/" target="_blank" rel="noopener noreferrer">ECharts Docs</a>.</p><h2 id="demo" tabindex="-1"><a class="header-anchor" href="#demo"><span>Demo</span></a></h2>`,18)),e(p,{title:"Line Chart"},{content:a(()=>[e(i,{config:"eJyVVNtu2zAMffdX6KGD5SXzkt2brQOKFR0KrOiADgOGIFjZWkm02pIhKW2NwP8+ipKd9IotD3YskueQhxQvtLKOaSUOoGF77MO7NyP/S8J5AQ7wdDpLSuGY0tf4ocQ1OwAn+Hh39/2Q7Q7Z64zMV1CuBDocg1vmBlShK56x52zs8SJgOMZwD4vWvc9snbC7yPiZL4T7ISuBPoOYXoaOHUd4D+5xvRqzF0iYoKsRbmUUwSMBVGLiaXKnT52RasGzIVkIacKm9MHYNHIfrsrylwCDbhSGR8dauSXlM+7PKN1slv/RUvH0ZRpBWUxMr1TBiSEaZv7VJm2SzLVh3MsmsZzRR3x9IqXw32CQkfJ5vbJLvpGMZ1mno66d1AojfXlO69LJehJrxfIWC2EmLIUbadNAjHQVOOePeQ0GKtuL738BVTpRIWawT0ezW0bMyCvfN8k7515XTCr4RcXPdtbedyNP+3Kn42EEc0fNaPNunXUjf8smbGdNZCTkdDxrzyiiDZX5Ir+j/FRbxwNKYrko0YTNobQiuFIEPW72MaoXrKlxAlKH4xbVsnUp3Tep8LhDtEt9/QhY8wAY5RrRzv0YgGm+AvZoOhqyFBv9LKVZ+F8u3+tzfdP5Bk9nVtFxLgB7sAVVgbncfN0P6GWkzsBPKdD8lLtvMxQnqmxuZbiFY4R1ejuHJ1ktXIl9e1TB4t8iNlJYYaRA3cPV7ULDTU8P4VL4OYXYg74xJSrdn3mW06Y61+WdYrwWW3zYqjbePD8lRwVeBCvckR867DTfbDI5Z7xqvizBuPx3IW2trSiymN1FiSPdBwUkv9W6q0O7AR8P7Ya3cTEEJFoPdinnjgeAx/aFR8QpiBlhzie0OXgcn07CdVj1bdhPWdIOaRllyV9oGrQN",title:"Dynamic%20Data%20%26%20Time%20Axis",type:"js"})]),code:a(()=>[...l[6]||(l[6]=[n("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[n("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[n("code",{class:"language-"},[n("span",{class:"line"},[n("span",null,"::: echarts Dynamic Data & Time Axis")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"```js")]),s(`
`),n("span",{class:"line"},[n("span",null,"const oneDay = 86400000")]),s(`
`),n("span",{class:"line"},[n("span",null,"const data = []")]),s(`
`),n("span",{class:"line"},[n("span",null,"let now = new Date(1997, 9, 3)")]),s(`
`),n("span",{class:"line"},[n("span",null,"let value = Math.random() * 1000")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"const randomData = () => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  now = new Date(now.getTime() + oneDay)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  value = value + Math.random() * 21 - 10")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    name: now.toString(),")]),s(`
`),n("span",{class:"line"},[n("span",null,"    value: [")]),s(`
`),n("span",{class:"line"},[n("span",null,"      [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),")]),s(`
`),n("span",{class:"line"},[n("span",null,"      Math.round(value),")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"for (let i = 0; i < 1000; i++) data.push(randomData())")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"const option = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  tooltip: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    trigger: 'axis',")]),s(`
`),n("span",{class:"line"},[n("span",null,"    formatter: (params) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      const item = params[0]")]),s(`
`),n("span",{class:"line"},[n("span",null,"      const date = new Date(item.name)")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"      return `${date.getDate()}/${")]),s(`
`),n("span",{class:"line"},[n("span",null,"        date.getMonth() + 1")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }/${date.getFullYear()} : ${item.value[1]}`")]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    axisPointer: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      animation: false,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  xAxis: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    type: 'time',")]),s(`
`),n("span",{class:"line"},[n("span",null,"    splitLine: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      show: false,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  yAxis: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    type: 'value',")]),s(`
`),n("span",{class:"line"},[n("span",null,"    boundaryGap: [0, '100%'],")]),s(`
`),n("span",{class:"line"},[n("span",null,"    splitLine: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      show: false,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  toolbox: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    show: true,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    feature: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      mark: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        show: true,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      },")]),s(`
`),n("span",{class:"line"},[n("span",null,"      dataView: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        show: true,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        readOnly: false,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      },")]),s(`
`),n("span",{class:"line"},[n("span",null,"      restore: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        show: true,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      },")]),s(`
`),n("span",{class:"line"},[n("span",null,"      saveAsImage: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        show: true,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  series: [")]),s(`
`),n("span",{class:"line"},[n("span",null,"    {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      name: 'Fake Data',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      type: 'line',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      showSymbol: false,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      data,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ],")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"const timeId = setInterval(() => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (myChart._disposed) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    clearInterval(timeId)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"  for (let i = 0; i < 5; i++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    data.shift()")]),s(`
`),n("span",{class:"line"},[n("span",null,"    data.push(randomData())")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  myChart.setOption({")]),s(`
`),n("span",{class:"line"},[n("span",null,"    series: [{ data }],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  })")]),s(`
`),n("span",{class:"line"},[n("span",null,"}, 1000)")]),s(`
`),n("span",{class:"line"},[n("span",null,"```")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,":::")])])]),n("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1)])]),_:1}),e(p,{title:"Bar Chart"},{content:a(()=>[e(i,{config:"eJyNVM1u2zAMvvspeLO9BqnRYodlS4es7SGHoodhw4AgGJiYsYXJUiDJaYIi7z5K/mm8ZcF8EGWJfx/JT2utrIMcHcIUFsso2mgDiSQHgg+yjyw+wXsWV1dpUBtva1smT+jKsdG1ytstqlxXSQrv4CbL0jSKGsd664RW7Ok1AtjP9sJOwhagwv0EYu/xCffxiM+Ofjmc6rjDllhpjY4KbQ5BC0IWE1jEs3gE8Re/3PvlwS+P8bJREmpHxrK1MzU1R6hEhT6dh9oEOYHbLPvH3bcth2HzXiPkezOC62vQSh7AlQQSTUGM8hZWaCy8CClhRZALu5V4oLwDZckIYlSL4KnBBmAIpRMVfdXGneYJoLDyuH+0gPtCcJT+yFeh20tckeyK5j9b6pehS4CttqJBHRtRlK73BLBDWdOsK8HQMABoRaitpIJU3kUbRgpaTmu50lytcxoAG0JXG4bTpVuh+XU5+TaHBvR3QXx9GSuXNn/mLk1gg9L+7cdw1/RpDhejWtzRzM4rLP7PIoiwnBm5ME6Xxm2o8IhWqIJ7JoWitv1/XHa2byrHln2m9tRjVk7vQt7nuB04LUkVrmxY3nNsIZZwNYULVB/+30E2/gCf/QOQAXOF34GInVWH+xKNG1tyz+E1SNq56EjxOhjv5i06hlE7pgylxeKZMs85b/YzV44MD23yBk1sIOki/fQE1JbytO3WWnJdeqPGU8jNTwIPo/Kx/D8XLOGYo9CHNPoNJT1ucw==",title:"A%20bar%20chart",type:"js"})]),code:a(()=>[...l[7]||(l[7]=[n("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[n("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[n("code",{class:"language-"},[n("span",{class:"line"},[n("span",null,"::: echarts A bar chart")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"```js")]),s(`
`),n("span",{class:"line"},[n("span",null,"const data = []")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"for (let i = 0; i < 5; i++) data.push(Math.round(Math.random() * 200))")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"const option = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  xAxis: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    max: 'dataMax',")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  yAxis: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    type: 'category',")]),s(`
`),n("span",{class:"line"},[n("span",null,"    data: ['A', 'B', 'C', 'D', 'E'],")]),s(`
`),n("span",{class:"line"},[n("span",null,"    inverse: true,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    animationDuration: 300,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    animationDurationUpdate: 300,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    max: 2, // only the largest 3 bars will be displayed")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  series: [")]),s(`
`),n("span",{class:"line"},[n("span",null,"    {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      realtimeSort: true,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      name: 'X',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      type: 'bar',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      data,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      label: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        show: true,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        position: 'right',")]),s(`
`),n("span",{class:"line"},[n("span",null,"        valueAnimation: true,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  legend: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    show: true,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  toolbox: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    show: true,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    feature: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      mark: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        show: true,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      },")]),s(`
`),n("span",{class:"line"},[n("span",null,"      dataView: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        show: true,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        readOnly: false,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      },")]),s(`
`),n("span",{class:"line"},[n("span",null,"      restore: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        show: true,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      },")]),s(`
`),n("span",{class:"line"},[n("span",null,"      saveAsImage: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        show: true,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  animationDuration: 0,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  animationDurationUpdate: 3000,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  animationEasing: 'linear',")]),s(`
`),n("span",{class:"line"},[n("span",null,"  animationEasingUpdate: 'linear',")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"const run = () => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  for (let i = 0; i < data.length; i++)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    data[i] += Math.round(Math.random() * Math.random() > 0.9 ? 2000 : 200)")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"  myChart.setOption({")]),s(`
`),n("span",{class:"line"},[n("span",null,"    series: [{ type: 'bar', data }],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  })")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"const timeId = setInterval(() => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (myChart._disposed) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    clearInterval(timeId)")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"  run()")]),s(`
`),n("span",{class:"line"},[n("span",null,"}, 3000)")]),s(`
`),n("span",{class:"line"},[n("span",null,"```")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,":::")])])]),n("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1)])]),_:1}),e(p,{title:"Pie Chart"},{content:a(()=>[e(i,{config:"eJyVk71ugzAUhfc8hWWpWwZCfhp1qzp1aaW26lJluCk3YNVgZF/SoirvXtslQH4gYcHce44/+9jwO2KMS4wxi/gdc5WtSeW24GtFpFJue7uxs5FScq1+Gp9J1LetSBfoDLazQaBCY22xrRT0V6s+nFY1Pd9rERC8C3T6+Rl7p+1qhOg5k6VVNiDNKUyjIXWwmwurG9jivXlMIb48yY/u+X84BrVAYz0fXqjjZ5A6Fn8ScUIii0Eie0hAE69XpTL3llxg09QQicLzwmDMJkGwqqVPzAi1k/g8uOFj5odG18rgW8UEe0gNVBCmr1TKo3RrpSPUL/sVl2dvpY7WjufVLcjCEWdBczmt5G47bOI+oyNsB2a67MaEAzBhN2Y6ANMTanY9JuwJNR+AWXRjFgMwPWdzez1m0hNq2cJUb6v6l1mNdqM/icX4bQ==",title:"A%20nightingale%20chart"})]),code:a(()=>[...l[8]||(l[8]=[n("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[n("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[n("code",{class:"language-"},[n("span",{class:"line"},[n("span",null,"::: echarts A nightingale chart")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"```json")]),s(`
`),n("span",{class:"line"},[n("span",null,"{")]),s(`
`),n("span",{class:"line"},[n("span",null,'  "legend": {')]),s(`
`),n("span",{class:"line"},[n("span",null,'    "top": "bottom"')]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,'  "toolbox": {')]),s(`
`),n("span",{class:"line"},[n("span",null,'    "show": true,')]),s(`
`),n("span",{class:"line"},[n("span",null,'    "feature": {')]),s(`
`),n("span",{class:"line"},[n("span",null,'      "mark": {')]),s(`
`),n("span",{class:"line"},[n("span",null,'        "show": true')]),s(`
`),n("span",{class:"line"},[n("span",null,"      },")]),s(`
`),n("span",{class:"line"},[n("span",null,'      "dataView": {')]),s(`
`),n("span",{class:"line"},[n("span",null,'        "show": true,')]),s(`
`),n("span",{class:"line"},[n("span",null,'        "readOnly": false')]),s(`
`),n("span",{class:"line"},[n("span",null,"      },")]),s(`
`),n("span",{class:"line"},[n("span",null,'      "restore": {')]),s(`
`),n("span",{class:"line"},[n("span",null,'        "show": true')]),s(`
`),n("span",{class:"line"},[n("span",null,"      },")]),s(`
`),n("span",{class:"line"},[n("span",null,'      "saveAsImage": {')]),s(`
`),n("span",{class:"line"},[n("span",null,'        "show": true')]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,'  "series": [')]),s(`
`),n("span",{class:"line"},[n("span",null,"    {")]),s(`
`),n("span",{class:"line"},[n("span",null,'      "name": "Nightingale Chart",')]),s(`
`),n("span",{class:"line"},[n("span",null,'      "type": "pie",')]),s(`
`),n("span",{class:"line"},[n("span",null,'      "radius": [20, 100],')]),s(`
`),n("span",{class:"line"},[n("span",null,'      "center": ["50%", "50%"],')]),s(`
`),n("span",{class:"line"},[n("span",null,'      "roseType": "area",')]),s(`
`),n("span",{class:"line"},[n("span",null,'      "itemStyle": {')]),s(`
`),n("span",{class:"line"},[n("span",null,'        "borderRadius": 8')]),s(`
`),n("span",{class:"line"},[n("span",null,"      },")]),s(`
`),n("span",{class:"line"},[n("span",null,'      "data": [')]),s(`
`),n("span",{class:"line"},[n("span",null,"        {")]),s(`
`),n("span",{class:"line"},[n("span",null,'          "value": 40,')]),s(`
`),n("span",{class:"line"},[n("span",null,'          "name": "rose 1"')]),s(`
`),n("span",{class:"line"},[n("span",null,"        },")]),s(`
`),n("span",{class:"line"},[n("span",null,"        {")]),s(`
`),n("span",{class:"line"},[n("span",null,'          "value": 38,')]),s(`
`),n("span",{class:"line"},[n("span",null,'          "name": "rose 2"')]),s(`
`),n("span",{class:"line"},[n("span",null,"        },")]),s(`
`),n("span",{class:"line"},[n("span",null,"        {")]),s(`
`),n("span",{class:"line"},[n("span",null,'          "value": 32,')]),s(`
`),n("span",{class:"line"},[n("span",null,'          "name": "rose 3"')]),s(`
`),n("span",{class:"line"},[n("span",null,"        },")]),s(`
`),n("span",{class:"line"},[n("span",null,"        {")]),s(`
`),n("span",{class:"line"},[n("span",null,'          "value": 30,')]),s(`
`),n("span",{class:"line"},[n("span",null,'          "name": "rose 4"')]),s(`
`),n("span",{class:"line"},[n("span",null,"        },")]),s(`
`),n("span",{class:"line"},[n("span",null,"        {")]),s(`
`),n("span",{class:"line"},[n("span",null,'          "value": 28,')]),s(`
`),n("span",{class:"line"},[n("span",null,'          "name": "rose 5"')]),s(`
`),n("span",{class:"line"},[n("span",null,"        },")]),s(`
`),n("span",{class:"line"},[n("span",null,"        {")]),s(`
`),n("span",{class:"line"},[n("span",null,'          "value": 26,')]),s(`
`),n("span",{class:"line"},[n("span",null,'          "name": "rose 6"')]),s(`
`),n("span",{class:"line"},[n("span",null,"        },")]),s(`
`),n("span",{class:"line"},[n("span",null,"        {")]),s(`
`),n("span",{class:"line"},[n("span",null,'          "value": 22,')]),s(`
`),n("span",{class:"line"},[n("span",null,'          "name": "rose 7"')]),s(`
`),n("span",{class:"line"},[n("span",null,"        },")]),s(`
`),n("span",{class:"line"},[n("span",null,"        {")]),s(`
`),n("span",{class:"line"},[n("span",null,'          "value": 18,')]),s(`
`),n("span",{class:"line"},[n("span",null,'          "name": "rose 8"')]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      ]")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ]")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"```")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,":::")])])]),n("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1)])]),_:1}),e(p,{title:"Scatter Chart"},{content:a(()=>[e(i,{config:"eJxtkj1uwzAMhXefgtAsEPqX3K1n6Bh4cFsPBlq0iD3EDXz3kkobhEo0COCnp8dHQecOQJ2eT/OinuC8ay43WS7TcZ64PlAFwDd4qWX7fP36eJl/JjpzhrWVv4/reFXzOliDRkNBE4Z/FVGqs4aEfbyl1rM2Yyy3tEcT2aFYobUXX+8FDReHlBrfwN0ah5osPXQo2EsHh5SBHJxMZolmFJCC3UMazGsI6GQvh46lRVCHhmjAkIW2voJv0lJYoqFJm2o3iiDenLrVeV07WZ23CG1GUzTEZt5Yk0VMZfiD11O1bt/8F9TyNq7rdFSV77QP3d79Ahlkc/0=",title:"A%20scatter%20chart"})]),code:a(()=>[...l[9]||(l[9]=[n("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[n("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[n("code",{class:"language-"},[n("span",{class:"line"},[n("span",null,"::: echarts A scatter chart")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"```json")]),s(`
`),n("span",{class:"line"},[n("span",null,"{")]),s(`
`),n("span",{class:"line"},[n("span",null,'  "xAxis": {},')]),s(`
`),n("span",{class:"line"},[n("span",null,'  "yAxis": {},')]),s(`
`),n("span",{class:"line"},[n("span",null,'  "series": [')]),s(`
`),n("span",{class:"line"},[n("span",null,"    {")]),s(`
`),n("span",{class:"line"},[n("span",null,'      "symbolSize": 20,')]),s(`
`),n("span",{class:"line"},[n("span",null,'      "data": [')]),s(`
`),n("span",{class:"line"},[n("span",null,"        [10.0, 8.04],")]),s(`
`),n("span",{class:"line"},[n("span",null,"        [8.07, 6.95],")]),s(`
`),n("span",{class:"line"},[n("span",null,"        [13.0, 7.58],")]),s(`
`),n("span",{class:"line"},[n("span",null,"        [9.05, 8.81],")]),s(`
`),n("span",{class:"line"},[n("span",null,"        [11.0, 8.33],")]),s(`
`),n("span",{class:"line"},[n("span",null,"        [14.0, 7.66],")]),s(`
`),n("span",{class:"line"},[n("span",null,"        [13.4, 6.81],")]),s(`
`),n("span",{class:"line"},[n("span",null,"        [10.0, 6.33],")]),s(`
`),n("span",{class:"line"},[n("span",null,"        [14.0, 8.96],")]),s(`
`),n("span",{class:"line"},[n("span",null,"        [12.5, 6.82],")]),s(`
`),n("span",{class:"line"},[n("span",null,"        [9.15, 7.2],")]),s(`
`),n("span",{class:"line"},[n("span",null,"        [11.5, 7.2],")]),s(`
`),n("span",{class:"line"},[n("span",null,"        [3.03, 4.23],")]),s(`
`),n("span",{class:"line"},[n("span",null,"        [12.2, 7.83],")]),s(`
`),n("span",{class:"line"},[n("span",null,"        [2.02, 4.47],")]),s(`
`),n("span",{class:"line"},[n("span",null,"        [1.05, 3.33],")]),s(`
`),n("span",{class:"line"},[n("span",null,"        [4.05, 4.96],")]),s(`
`),n("span",{class:"line"},[n("span",null,"        [6.03, 7.24],")]),s(`
`),n("span",{class:"line"},[n("span",null,"        [12.0, 6.26],")]),s(`
`),n("span",{class:"line"},[n("span",null,"        [12.0, 8.84],")]),s(`
`),n("span",{class:"line"},[n("span",null,"        [7.08, 5.82],")]),s(`
`),n("span",{class:"line"},[n("span",null,"        [5.02, 5.68]")]),s(`
`),n("span",{class:"line"},[n("span",null,"      ],")]),s(`
`),n("span",{class:"line"},[n("span",null,'      "type": "scatter"')]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ]")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"```")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,":::")])])]),n("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1)])]),_:1}),e(p,{title:"Polar Chart"},{content:a(()=>[e(i,{config:"eJxVkDFPwzAQhXf/ituS0KqkgiJU6NCRAakSY9TBao7kJNeO7CuiQv3vnO0kgsU+v3vf89knZwNDq1nDDpqjUp/OQ2mQgUSoX2R73cG6jtViUcGPAsgM95igkuA+Giq4g4eneu576W1EK9ewgHfN/SqQLcuMCfGciNQ4vFWVcHGK1XAJfdn4Zc4/VuqmVA7skbqeJfVxU0+aG5icFS3OZbBD225TndO20BSGLBbHpWi3uAzOaC+edGDnDNMwIeyp61C6hf6mUEQHQCwPjizHRvaJ8zqg2E7ehcmXAtOibWdwL9icm91f2lxwdAfWnvfRuIV6Jr1u6RJGNCkBPaGcmkRN15+c8y1ZzfhxDYxnCU/vGsMBrD7HG9PbJ22c4p8WP+nP+PJNN/ULaOeRXw==",title:"Two%20Value-Axes%20in%20Polar",type:"js"})]),code:a(()=>[...l[10]||(l[10]=[n("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[n("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[n("code",{class:"language-"},[n("span",{class:"line"},[n("span",null,"::: echarts Two Value-Axes in Polar")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"```js")]),s(`
`),n("span",{class:"line"},[n("span",null,"const data = []")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"for (let i = 0; i <= 100; i++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const theta = (i / 100) * 360")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const r = 5 * (1 + Math.sin((theta / 180) * Math.PI))")]),s(`
`),n("span",{class:"line"},[n("span",null,"  data.push([r, theta])")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"const height = 450")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"const option = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  legend: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    data: ['line'],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  polar: {},")]),s(`
`),n("span",{class:"line"},[n("span",null,"  tooltip: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    trigger: 'axis',")]),s(`
`),n("span",{class:"line"},[n("span",null,"    axisPointer: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      type: 'cross',")]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  angleAxis: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    type: 'value',")]),s(`
`),n("span",{class:"line"},[n("span",null,"    startAngle: 0,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  radiusAxis: {},")]),s(`
`),n("span",{class:"line"},[n("span",null,"  series: [")]),s(`
`),n("span",{class:"line"},[n("span",null,"    {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      coordinateSystem: 'polar',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      name: 'line',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      type: 'line',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      data,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ],")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"```")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,":::")])])]),n("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1)])]),_:1}),e(p,{title:"Candlestick Chart"},{content:a(()=>[e(i,{config:"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",title:"Stocks",type:"js"})]),code:a(()=>[...l[11]||(l[11]=[n("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[n("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[n("code",{class:"language-"},[n("span",{class:"line"},[n("span",null,"::: echarts Stocks")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"```js")]),s(`
`),n("span",{class:"line"},[n("span",null,"const upColor = '#ec0000'")]),s(`
`),n("span",{class:"line"},[n("span",null,"const upBorderColor = '#8A0000'")]),s(`
`),n("span",{class:"line"},[n("span",null,"const downColor = '#00da3c'")]),s(`
`),n("span",{class:"line"},[n("span",null,"const downBorderColor = '#008F28'")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"const splitData = (rawData) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const categoryData = []")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const values = []")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"  for (let i = 0; i < rawData.length; i++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    categoryData.push(rawData[i].splice(0, 1)[0])")]),s(`
`),n("span",{class:"line"},[n("span",null,"    values.push(rawData[i])")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    categoryData,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    values,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"// Each item: open，close，lowest，highest")]),s(`
`),n("span",{class:"line"},[n("span",null,"const data0 = splitData([")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/1/24', 2320.26, 2320.26, 2287.3, 2362.94],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/1/25', 2300, 2291.3, 2288.26, 2308.38],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/1/28', 2295.35, 2346.5, 2295.35, 2346.92],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/1/29', 2347.22, 2358.98, 2337.35, 2363.8],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/1/30', 2360.75, 2382.48, 2347.89, 2383.76],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/1/31', 2383.43, 2385.42, 2371.23, 2391.82],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/2/1', 2377.41, 2419.02, 2369.57, 2421.15],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/2/4', 2425.92, 2428.15, 2417.58, 2440.38],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/2/5', 2411, 2433.13, 2403.3, 2437.42],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/2/6', 2432.68, 2434.48, 2427.7, 2441.73],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/2/7', 2430.69, 2418.53, 2394.22, 2433.89],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/2/8', 2416.62, 2432.4, 2414.4, 2443.03],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/2/18', 2441.91, 2421.56, 2415.43, 2444.8],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/2/19', 2420.26, 2382.91, 2373.53, 2427.07],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/2/20', 2383.49, 2397.18, 2370.61, 2397.94],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/2/21', 2378.82, 2325.95, 2309.17, 2378.82],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/2/22', 2322.94, 2314.16, 2308.76, 2330.88],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/2/25', 2320.62, 2325.82, 2315.01, 2338.78],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/2/26', 2313.74, 2293.34, 2289.89, 2340.71],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/2/27', 2297.77, 2313.22, 2292.03, 2324.63],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/2/28', 2322.32, 2365.59, 2308.92, 2366.16],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/3/1', 2364.54, 2359.51, 2330.86, 2369.65],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/3/4', 2332.08, 2273.4, 2259.25, 2333.54],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/3/5', 2274.81, 2326.31, 2270.1, 2328.14],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/3/6', 2333.61, 2347.18, 2321.6, 2351.44],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/3/7', 2340.44, 2324.29, 2304.27, 2352.02],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/3/8', 2326.42, 2318.61, 2314.59, 2333.67],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/3/11', 2314.68, 2310.59, 2296.58, 2320.96],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/3/12', 2309.16, 2286.6, 2264.83, 2333.29],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/3/13', 2282.17, 2263.97, 2253.25, 2286.33],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/3/14', 2255.77, 2270.28, 2253.31, 2276.22],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/3/15', 2269.31, 2278.4, 2250, 2312.08],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/3/18', 2267.29, 2240.02, 2239.21, 2276.05],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/3/19', 2244.26, 2257.43, 2232.02, 2261.31],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/3/20', 2257.74, 2317.37, 2257.42, 2317.86],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/3/21', 2318.21, 2324.24, 2311.6, 2330.81],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/3/22', 2321.4, 2328.28, 2314.97, 2332],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/3/25', 2334.74, 2326.72, 2319.91, 2344.89],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/3/26', 2318.58, 2297.67, 2281.12, 2319.99],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/3/27', 2299.38, 2301.26, 2289, 2323.48],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/3/28', 2273.55, 2236.3, 2232.91, 2273.55],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/3/29', 2238.49, 2236.62, 2228.81, 2246.87],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/4/1', 2229.46, 2234.4, 2227.31, 2243.95],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/4/2', 2234.9, 2227.74, 2220.44, 2253.42],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/4/3', 2232.69, 2225.29, 2217.25, 2241.34],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/4/8', 2196.24, 2211.59, 2180.67, 2212.59],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/4/9', 2215.47, 2225.77, 2215.47, 2234.73],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/4/10', 2224.93, 2226.13, 2212.56, 2233.04],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/4/11', 2236.98, 2219.55, 2217.26, 2242.48],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/4/12', 2218.09, 2206.78, 2204.44, 2226.26],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/4/15', 2199.91, 2181.94, 2177.39, 2204.99],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/4/16', 2169.63, 2194.85, 2165.78, 2196.43],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/4/17', 2195.03, 2193.8, 2178.47, 2197.51],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/4/18', 2181.82, 2197.6, 2175.44, 2206.03],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/4/19', 2201.12, 2244.64, 2200.58, 2250.11],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/4/22', 2236.4, 2242.17, 2232.26, 2245.12],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/4/23', 2242.62, 2184.54, 2182.81, 2242.62],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/4/24', 2187.35, 2218.32, 2184.11, 2226.12],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/4/25', 2213.19, 2199.31, 2191.85, 2224.63],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/4/26', 2203.89, 2177.91, 2173.86, 2210.58],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/5/2', 2170.78, 2174.12, 2161.14, 2179.65],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/5/3', 2179.05, 2205.5, 2179.05, 2222.81],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/5/6', 2212.5, 2231.17, 2212.5, 2236.07],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/5/7', 2227.86, 2235.57, 2219.44, 2240.26],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/5/8', 2242.39, 2246.3, 2235.42, 2255.21],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/5/9', 2246.96, 2232.97, 2221.38, 2247.86],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/5/10', 2228.82, 2246.83, 2225.81, 2247.67],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/5/13', 2247.68, 2241.92, 2231.36, 2250.85],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/5/14', 2238.9, 2217.01, 2205.87, 2239.93],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/5/15', 2217.09, 2224.8, 2213.58, 2225.19],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/5/16', 2221.34, 2251.81, 2210.77, 2252.87],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/5/17', 2249.81, 2282.87, 2248.41, 2288.09],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/5/20', 2286.33, 2299.99, 2281.9, 2309.39],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/5/21', 2297.11, 2305.11, 2290.12, 2305.3],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/5/22', 2303.75, 2302.4, 2292.43, 2314.18],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/5/23', 2293.81, 2275.67, 2274.1, 2304.95],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/5/24', 2281.45, 2288.53, 2270.25, 2292.59],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/5/27', 2286.66, 2293.08, 2283.94, 2301.7],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/5/28', 2293.4, 2321.32, 2281.47, 2322.1],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/5/29', 2323.54, 2324.02, 2321.17, 2334.33],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/5/30', 2316.25, 2317.75, 2310.49, 2325.72],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/5/31', 2320.74, 2300.59, 2299.37, 2325.53],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/6/3', 2300.21, 2299.25, 2294.11, 2313.43],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/6/4', 2297.1, 2272.42, 2264.76, 2297.1],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/6/5', 2270.71, 2270.93, 2260.87, 2276.86],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/6/6', 2264.43, 2242.11, 2240.07, 2266.69],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/6/7', 2242.26, 2210.9, 2205.07, 2250.63],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ['2013/6/13', 2190.1, 2148.35, 2126.22, 2190.1],")]),s(`
`),n("span",{class:"line"},[n("span",null,"])")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"const calculateMA = (dayCount) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const result = []")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"  for (let i = 0; i < data0.values.length; i++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (i < dayCount) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      result.push('-')")]),s(`
`),n("span",{class:"line"},[n("span",null,"      continue")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let sum = 0")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    for (let j = 0; j < dayCount; j++) sum += Number(data0.values[i - j][1])")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    result.push(sum / dayCount)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return result")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"const option = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  tooltip: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    trigger: 'axis',")]),s(`
`),n("span",{class:"line"},[n("span",null,"    axisPointer: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      type: 'cross',")]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  legend: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30'],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  grid: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    left: '10%',")]),s(`
`),n("span",{class:"line"},[n("span",null,"    right: '10%',")]),s(`
`),n("span",{class:"line"},[n("span",null,"    bottom: '15%',")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  xAxis: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    type: 'category',")]),s(`
`),n("span",{class:"line"},[n("span",null,"    data: data0.categoryData,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    boundaryGap: false,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    axisLine: { onZero: false },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    splitLine: { show: false },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    min: 'dataMin',")]),s(`
`),n("span",{class:"line"},[n("span",null,"    max: 'dataMax',")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  yAxis: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    scale: true,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    splitArea: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      show: true,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  dataZoom: [")]),s(`
`),n("span",{class:"line"},[n("span",null,"    {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      type: 'inside',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      start: 50,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      end: 100,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      show: true,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      type: 'slider',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      top: '90%',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      start: 50,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      end: 100,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  series: [")]),s(`
`),n("span",{class:"line"},[n("span",null,"    {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      name: '日K',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      type: 'candlestick',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      data: data0.values,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      itemStyle: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        color: upColor,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        color0: downColor,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        borderColor: upBorderColor,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        borderColor0: downBorderColor,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      },")]),s(`
`),n("span",{class:"line"},[n("span",null,"      markPoint: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        label: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          formatter: (param) =>")]),s(`
`),n("span",{class:"line"},[n("span",null,"            param == null ? '' : Math.round(param.value).toString(),")]),s(`
`),n("span",{class:"line"},[n("span",null,"        },")]),s(`
`),n("span",{class:"line"},[n("span",null,"        data: [")]),s(`
`),n("span",{class:"line"},[n("span",null,"          {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            name: 'Mark',")]),s(`
`),n("span",{class:"line"},[n("span",null,"            coord: ['2013/5/31', 2300],")]),s(`
`),n("span",{class:"line"},[n("span",null,"            value: 2300,")]),s(`
`),n("span",{class:"line"},[n("span",null,"            itemStyle: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"              color: 'rgb(41,60,85)',")]),s(`
`),n("span",{class:"line"},[n("span",null,"            },")]),s(`
`),n("span",{class:"line"},[n("span",null,"          },")]),s(`
`),n("span",{class:"line"},[n("span",null,"          {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            name: 'highest value',")]),s(`
`),n("span",{class:"line"},[n("span",null,"            type: 'max',")]),s(`
`),n("span",{class:"line"},[n("span",null,"            valueDim: 'highest',")]),s(`
`),n("span",{class:"line"},[n("span",null,"          },")]),s(`
`),n("span",{class:"line"},[n("span",null,"          {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            name: 'lowest value',")]),s(`
`),n("span",{class:"line"},[n("span",null,"            type: 'min',")]),s(`
`),n("span",{class:"line"},[n("span",null,"            valueDim: 'lowest',")]),s(`
`),n("span",{class:"line"},[n("span",null,"          },")]),s(`
`),n("span",{class:"line"},[n("span",null,"          {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            name: 'average value on close',")]),s(`
`),n("span",{class:"line"},[n("span",null,"            type: 'average',")]),s(`
`),n("span",{class:"line"},[n("span",null,"            valueDim: 'close',")]),s(`
`),n("span",{class:"line"},[n("span",null,"          },")]),s(`
`),n("span",{class:"line"},[n("span",null,"        ],")]),s(`
`),n("span",{class:"line"},[n("span",null,"        tooltip: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          formatter: (param) => `${param.name}<br>${param.data.coord || ''}`,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        },")]),s(`
`),n("span",{class:"line"},[n("span",null,"      },")]),s(`
`),n("span",{class:"line"},[n("span",null,"      markLine: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        symbol: ['none', 'none'],")]),s(`
`),n("span",{class:"line"},[n("span",null,"        data: [")]),s(`
`),n("span",{class:"line"},[n("span",null,"          [")]),s(`
`),n("span",{class:"line"},[n("span",null,"            {")]),s(`
`),n("span",{class:"line"},[n("span",null,"              name: 'from lowest to highest',")]),s(`
`),n("span",{class:"line"},[n("span",null,"              type: 'min',")]),s(`
`),n("span",{class:"line"},[n("span",null,"              valueDim: 'lowest',")]),s(`
`),n("span",{class:"line"},[n("span",null,"              symbol: 'circle',")]),s(`
`),n("span",{class:"line"},[n("span",null,"              symbolSize: 10,")]),s(`
`),n("span",{class:"line"},[n("span",null,"              label: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                show: false,")]),s(`
`),n("span",{class:"line"},[n("span",null,"              },")]),s(`
`),n("span",{class:"line"},[n("span",null,"              emphasis: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                label: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                  show: false,")]),s(`
`),n("span",{class:"line"},[n("span",null,"                },")]),s(`
`),n("span",{class:"line"},[n("span",null,"              },")]),s(`
`),n("span",{class:"line"},[n("span",null,"            },")]),s(`
`),n("span",{class:"line"},[n("span",null,"            {")]),s(`
`),n("span",{class:"line"},[n("span",null,"              type: 'max',")]),s(`
`),n("span",{class:"line"},[n("span",null,"              valueDim: 'highest',")]),s(`
`),n("span",{class:"line"},[n("span",null,"              symbol: 'circle',")]),s(`
`),n("span",{class:"line"},[n("span",null,"              symbolSize: 10,")]),s(`
`),n("span",{class:"line"},[n("span",null,"              label: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                show: false,")]),s(`
`),n("span",{class:"line"},[n("span",null,"              },")]),s(`
`),n("span",{class:"line"},[n("span",null,"              emphasis: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                label: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                  show: false,")]),s(`
`),n("span",{class:"line"},[n("span",null,"                },")]),s(`
`),n("span",{class:"line"},[n("span",null,"              },")]),s(`
`),n("span",{class:"line"},[n("span",null,"            },")]),s(`
`),n("span",{class:"line"},[n("span",null,"          ],")]),s(`
`),n("span",{class:"line"},[n("span",null,"          {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            name: 'min line on close',")]),s(`
`),n("span",{class:"line"},[n("span",null,"            type: 'min',")]),s(`
`),n("span",{class:"line"},[n("span",null,"            valueDim: 'close',")]),s(`
`),n("span",{class:"line"},[n("span",null,"          },")]),s(`
`),n("span",{class:"line"},[n("span",null,"          {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            name: 'max line on close',")]),s(`
`),n("span",{class:"line"},[n("span",null,"            type: 'max',")]),s(`
`),n("span",{class:"line"},[n("span",null,"            valueDim: 'close',")]),s(`
`),n("span",{class:"line"},[n("span",null,"          },")]),s(`
`),n("span",{class:"line"},[n("span",null,"        ],")]),s(`
`),n("span",{class:"line"},[n("span",null,"      },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      name: 'MA5',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      type: 'line',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      data: calculateMA(5),")]),s(`
`),n("span",{class:"line"},[n("span",null,"      smooth: true,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      lineStyle: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        opacity: 0.5,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      name: 'MA10',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      type: 'line',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      data: calculateMA(10),")]),s(`
`),n("span",{class:"line"},[n("span",null,"      smooth: true,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      lineStyle: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        opacity: 0.5,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      name: 'MA20',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      type: 'line',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      data: calculateMA(20),")]),s(`
`),n("span",{class:"line"},[n("span",null,"      smooth: true,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      lineStyle: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        opacity: 0.5,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      name: 'MA30',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      type: 'line',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      data: calculateMA(30),")]),s(`
`),n("span",{class:"line"},[n("span",null,"      smooth: true,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      lineStyle: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        opacity: 0.5,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ],")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"```")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,":::")])])]),n("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1)])]),_:1}),e(p,{title:"Radar Chart"},{content:a(()=>[e(i,{config:"eJx1Uj1vgzAQ3fMrTp4ZIE2iqhttlw6d6IYYLLhSVGMjY1CjKP+9dzYfbVoWzDu/dx/vfNkBCIU16ko8ACPClXSSUC5SpUwpHVbwOFQ1OhGBSEs3SAVZR5JG16IgzTXiNFZW0q5ZGronseFQ7kMAFxBatkgRkUmFPSds5Rfh0zGOQ54bXlq1jW56Z6VrjF4FySneULzod2NbT4c3LD+0UaY+r8o7Ev6vfBp6Z1q0kA1dZ6yfd9Lcb2mecURluhb1D/pxv0V/lfYTHRu3kPc0OpE9d3WzR9uQQbN3wVSKz4nCRmDsoZ9XMZcT7tx5TtjIEp73OuE1qb8dpRpYlR+o+ci7FAHPwYBbjIC/dCRsRjGn/dXVnxezkBYztsqGEskh1OUSdPCSI+COGCXbdW9e5Vp2+mNjAyp21903CYG6ew==",title:"A%20Radar%20Chart"})]),code:a(()=>[...l[12]||(l[12]=[n("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[n("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[n("code",{class:"language-"},[n("span",{class:"line"},[n("span",null,"::: echarts A Radar Chart")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"```json")]),s(`
`),n("span",{class:"line"},[n("span",null,"{")]),s(`
`),n("span",{class:"line"},[n("span",null,'  "legend": {')]),s(`
`),n("span",{class:"line"},[n("span",null,'    "data": ["Allocated Budget", "Actual Spending"]')]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,'  "radar": {')]),s(`
`),n("span",{class:"line"},[n("span",null,'    "indicator": [')]),s(`
`),n("span",{class:"line"},[n("span",null,'      { "name": "Sales", "max": 6500 },')]),s(`
`),n("span",{class:"line"},[n("span",null,'      { "name": "Administration", "max": 16000 },')]),s(`
`),n("span",{class:"line"},[n("span",null,'      { "name": "Information Technology", "max": 30000 },')]),s(`
`),n("span",{class:"line"},[n("span",null,'      { "name": "Customer Support", "max": 38000 },')]),s(`
`),n("span",{class:"line"},[n("span",null,'      { "name": "Development", "max": 52000 },')]),s(`
`),n("span",{class:"line"},[n("span",null,'      { "name": "Marketing", "max": 25000 }')]),s(`
`),n("span",{class:"line"},[n("span",null,"    ]")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,'  "series": [')]),s(`
`),n("span",{class:"line"},[n("span",null,"    {")]),s(`
`),n("span",{class:"line"},[n("span",null,'      "name": "Budget vs spending",')]),s(`
`),n("span",{class:"line"},[n("span",null,'      "type": "radar",')]),s(`
`),n("span",{class:"line"},[n("span",null,'      "data": [')]),s(`
`),n("span",{class:"line"},[n("span",null,"        {")]),s(`
`),n("span",{class:"line"},[n("span",null,'          "value": [4200, 3000, 20000, 35000, 50000, 18000],')]),s(`
`),n("span",{class:"line"},[n("span",null,'          "name": "Allocated Budget"')]),s(`
`),n("span",{class:"line"},[n("span",null,"        },")]),s(`
`),n("span",{class:"line"},[n("span",null,"        {")]),s(`
`),n("span",{class:"line"},[n("span",null,'          "value": [5000, 14000, 28000, 26000, 42000, 21000],')]),s(`
`),n("span",{class:"line"},[n("span",null,'          "name": "Actual Spending"')]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      ]")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ]")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"```")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,":::")])])]),n("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1)])]),_:1}),e(p,{title:"Heat Map"},{content:a(()=>[e(i,{config:"eJyNWNtu20gSffdXFDDYWHYUmd26e+MAgxlsdh5mEWwWmxiGB6CllkQPRRK8OFJm8+97TjVJiY48GCGWmnU5dbq6urqZq8szuZTM5XGUSJJGhZONi/EsqzzdyqYss+L66modlZvqYbBIt1ePaeGyzfpKjR8LuF+drapkUUZpImtX/ovyfypG70L+OBNZxGFRyPs8XOojBGlSlHm1KNO8t+vLvi9fvSU/5SYqBju5kd2xYA/B/ljwFYKvKvh2pj/LtLSKdoDKXVnlSYN4KTt53aBd1mgH5+H3VP7cv3n4ioeGSQ2oE5Q1ZjwEzTtVJu6L5qBn+oJ/wUW/K37zghwyqk7an1RQBqhT9qfkXvzmJfvvFQQ5gaO2p+XK9AX7WnHfZi1rM2bGxJsQYDjtyxxPcz6MKaBq2BcbUArJfNKXMQRmPoJ0iBFcrKXtKPChhzAxATRDoEzm1Ni+zOCLMSNYWIolMn8VjJY0hJUdwcTYGswOEWcKeJrSZA7tBHgaf4yBNYC1jGcMdENSAfYQqjGRphQOPdqM+KRgRnAaA2+mJsTilHUeyn+qOYE5/wwJ0MhMODAezJCaGQJIaRNoAlfGMyNijDUagGZKDgNrmQ4Laky3pcg03CzTZZVGwETDaAT9GGOi2REHNBkxbAC1GQF3jCeyIvUJ40waegzAGcJnqkuI2FPyYmoMJ24DMJyREifJpbIB43ORjSYSnDwYkQzTZ8Ywm/FpojyULyHmmigyoBa/1PsF0hLhHMYNnKUvl57MOZchvXXllYu3hnLG0qGRIVKgpFmC5IqUK5q6UagMSEAnSBNIWHxWq0yXYaqJ1wWhAZfOKEtYjmp2zKlhMtVYK1VrnpvAkJWZIAyzb6YsRRJWQpgHf/0GgWJWAzLPhtU+pa1uKGbA6kpMqeQcDedoAiqYBMtlZ7lbTsNyl6LifK1wUmZOHCbOEtpoXaicNDUSN4plFc1YSRSziiyX1nIHmAaPtA2zq1LWnoVOdPvT13DvGmbe6KaaQck/S7ZGq0r7BXKlgFhoYSjDbUETCqzmVQlzj1ktc80FWTMe06qZ5KZX7vXmMJyEYR4MuxBTxr1mGRQFD3ytTy0v9rirK/lPioNlmz45HB8O/dAtZZXmEiVLt5MveZhlUbLu40iqHmJvg6N0W5WhnrBlSGnsknW5OfRMGKBtsrf+mOfhvjc29qJzDn04pSYZnGASFcl5KaE8uXwv6zRdSgFWYCHNwd6Xh6qUqJQvaf57IenvA/mllKLKsjQvC7G/mYnHW0arlctdAiUn9hTGlSsG8imPSidFunU4MoH74MoSd4xoJfu08jnYpjksMCoGB+YucXlYuo80uJEe1f8l5IXcvKuP6djVsW70R9WqALg6yDsJ5NUrb/QWB1R7voPvx0VYJ1nVaVXWOn28vEELGw85N3+61/Ib+TUsN4NVnOIGQwmzeRTxLUpqcoijsv95fvL2rcyO8Lj0Pc4hAmrwd/yoMwavXx8QaPBUjxklklfHExF5gnd2F93LbzWFV2xTnhZCiYtxszttXifpncwunnnVv6wu2t60FLwEFyAwPZZrpXlTvfzcPcnfsDtY+Efqg9/3Rv4KBdOjle8FdbH+wI98OL6sFmW1WkHb3kBX4dL1yiY1zQ0OV7Tmr9d+TeQN9ucF6BiNwLgtTuzyrBei7vvyHK1n4AjhJbYM7oD4fai9wdH+3BDUi/AxpL9ldy+p8PgHdr5UCTbXOo+WsnBxzPIvwyjhVsnSKPFFySL43K29nV8ram67mr3XAP89lLmL0T7QcnZ7YKc5NjeSi4288vjyBRd8cC43YakMDvf01pehd5j55xM6Bt9Dd9sE/YQ+ptsK4G6NrU7QQoCOAkOJbsMYGW61SE2EtrMIE7QGSvN0WS1Qlhs0Ez+Tz/Lqhs76cHv8gHA/hfGiAhX0Uy0L5i+P0LOQ98K/yrhwseF8SWqVVmCU5qgxvMC0s0mCoC7KD3efsbRa5rf39wN9t2jz0D9M21NrvM0Jb1bXnyGwBjsopsvBvMyDri9xMV0uB5STfJ4hHTgxtek2q5BYzRs2lyyqHIWknV27l39P83ErRNUd2EK3OL9gqfMs1UVq1yB3RRWXfg3q3aUbT7+wHH3moy/VRd/LkWOK8EVRJ9LtRbOHayC/wY4biT+y623Ih29neF2rM6Z1g5w9e4Ot1bufwzLkm8l9LdgfBOo66HQs3Yh5mCzTbQ+8ap9l63Ki66OeA46att+aPHqTR5rgWovR4WQg4iCrik3vLurLI3KjXJpOE8mVXs0f8WsDdrpgML5v8qRz8t7RBTJxIuKzgDpp7/FIj7M00852o9oyTeMyyq7lj29M7u7HXVTgQYmW+8xdy/kCCVqn+f7cLwXpX3seuhz82v9VNyXTuj1FRRXGv4YMr0bbKLnGy5kfh7trVLgvVN8qcIu6FvwnhPPS3IXgvoVsFeKo9MIo+XeYrCFrDs5FGqf5df16ys/5D0O8ls3HNTEvGo2n44dRRzQdhcul6YjCh+XczTsiF6yGq1lHtMLnYdUVORfMg65oGbpJF341mixHw45oOR0GdtolMQ4CO2lF936gCdWvAn3ZYTX8jJs0JCETdf4+rIoiCpPWvV6tjQvLbZi1Yi5XM3bbbBMWhwXWNJdu+7Hcc0EOQpEHHFMu/8mnHIkeHs+mUX+KluWmXduWfGeQ5ekajaZAk4BlgK5SK8Ik2uqturPq6odMtK1h46L1pkSRI1ln/wcNN8YP",type:"js"})]),code:a(()=>[...l[13]||(l[13]=[n("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[n("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[n("code",{class:"language-"},[n("span",{class:"line"},[n("span",null,"::: echarts")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"```js")]),s(`
`),n("span",{class:"line"},[n("span",null,"/*")]),s(`
`),n("span",{class:"line"},[n("span",null," * perlin noise helper from https://github.com/josephg/noisejs")]),s(`
`),n("span",{class:"line"},[n("span",null," */")]),s(`
`),n("span",{class:"line"},[n("span",null,"function getNoiseHelper() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  class Grad {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    constructor(x, y, z) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      this.x = x")]),s(`
`),n("span",{class:"line"},[n("span",null,"      this.y = y")]),s(`
`),n("span",{class:"line"},[n("span",null,"      this.z = z")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    dot2(x, y) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      return this.x * x + this.y * y")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    dot3(x, y, z) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      return this.x * x + this.y * y + this.z * z")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const grad3 = [")]),s(`
`),n("span",{class:"line"},[n("span",null,"    new Grad(1, 1, 0),")]),s(`
`),n("span",{class:"line"},[n("span",null,"    new Grad(-1, 1, 0),")]),s(`
`),n("span",{class:"line"},[n("span",null,"    new Grad(1, -1, 0),")]),s(`
`),n("span",{class:"line"},[n("span",null,"    new Grad(-1, -1, 0),")]),s(`
`),n("span",{class:"line"},[n("span",null,"    new Grad(1, 0, 1),")]),s(`
`),n("span",{class:"line"},[n("span",null,"    new Grad(-1, 0, 1),")]),s(`
`),n("span",{class:"line"},[n("span",null,"    new Grad(1, 0, -1),")]),s(`
`),n("span",{class:"line"},[n("span",null,"    new Grad(-1, 0, -1),")]),s(`
`),n("span",{class:"line"},[n("span",null,"    new Grad(0, 1, 1),")]),s(`
`),n("span",{class:"line"},[n("span",null,"    new Grad(0, -1, 1),")]),s(`
`),n("span",{class:"line"},[n("span",null,"    new Grad(0, 1, -1),")]),s(`
`),n("span",{class:"line"},[n("span",null,"    new Grad(0, -1, -1),")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ]")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const p = [")]),s(`
`),n("span",{class:"line"},[n("span",null,"    151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    141, 128, 195, 78, 66, 215, 61, 156, 180,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ]")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // To remove the need for index wrapping, double the permutation table length")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const perm = new Array(512)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const gradP = new Array(512)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // This isn't a very good seeding function, but it works ok. It supports 2^16")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // different seed values. Write something better if you need more seeds.")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const generateSeed = (seedValue) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let seed = seedValue")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (seed > 0 && seed < 1) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // Scale the seed out")]),s(`
`),n("span",{class:"line"},[n("span",null,"      seed *= 65536")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    seed = Math.floor(seed)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (seed < 256) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      seed |= seed << 8")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    for (let i = 0; i < 256; i++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      let v")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (i & 1) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        v = p[i] ^ (seed & 255)")]),s(`
`),n("span",{class:"line"},[n("span",null,"      } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        v = p[i] ^ ((seed >> 8) & 255)")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      perm[i] = v")]),s(`
`),n("span",{class:"line"},[n("span",null,"      perm[i + 256] = v")]),s(`
`),n("span",{class:"line"},[n("span",null,"      gradP[i] = grad3[v % 12]")]),s(`
`),n("span",{class:"line"},[n("span",null,"      gradP[i + 256] = grad3[v % 12]")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  generateSeed(0)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // ##### Perlin noise stuff")]),s(`
`),n("span",{class:"line"},[n("span",null,"  function fade(t) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return t * t * t * (t * (t * 6 - 15) + 10)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  function lerp(a, b, t) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (1 - t) * a + t * b")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 2D Perlin Noise")]),s(`
`),n("span",{class:"line"},[n("span",null,"  function perlin2(x, y) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // Find unit grid cell containing point")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let X = Math.floor(x)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let Y = Math.floor(y)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // Get relative xy coordinates of point within that cell")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const relativeX = x - X")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const relativeY = y - Y")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // Wrap the integer cells at 255 (smaller integer period can be introduced here)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    X &= 255")]),s(`
`),n("span",{class:"line"},[n("span",null,"    Y &= 255")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // Calculate noise contributions from each of the four corners")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const n00 = gradP[X + perm[Y]].dot2(relativeX, relativeY)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const n01 = gradP[X + perm[Y + 1]].dot2(relativeX, relativeY - 1)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const n10 = gradP[X + 1 + perm[Y]].dot2(relativeX - 1, relativeY)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const n11 = gradP[X + 1 + perm[Y + 1]].dot2(relativeX - 1, relativeY - 1)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // Compute the fade curve value for x")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const u = fade(relativeX)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // Interpolate the four results")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return lerp(lerp(n00, n10, u), lerp(n01, n11, u), fade(relativeY))")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    generateSeed,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    perlin2,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"const noise = getNoiseHelper()")]),s(`
`),n("span",{class:"line"},[n("span",null,"const xData = []")]),s(`
`),n("span",{class:"line"},[n("span",null,"const yData = []")]),s(`
`),n("span",{class:"line"},[n("span",null,"noise.generateSeed(Math.random())")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"const data = []")]),s(`
`),n("span",{class:"line"},[n("span",null,"for (let i = 0; i <= 200; i++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  for (let j = 0; j <= 100; j++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    data.push([i, j, noise.perlin2(i / 40, j / 20) + 0.5])")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  xData.push(i)")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"for (let j = 0; j < 100; j++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  yData.push(j)")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"option = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  tooltip: {},")]),s(`
`),n("span",{class:"line"},[n("span",null,"  xAxis: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    type: 'category',")]),s(`
`),n("span",{class:"line"},[n("span",null,"    data: xData,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  yAxis: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    type: 'category',")]),s(`
`),n("span",{class:"line"},[n("span",null,"    data: yData,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  visualMap: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    min: 0,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    max: 1,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    calculable: true,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    realtime: false,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    inRange: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      color: [")]),s(`
`),n("span",{class:"line"},[n("span",null,"        '#313695',")]),s(`
`),n("span",{class:"line"},[n("span",null,"        '#4575b4',")]),s(`
`),n("span",{class:"line"},[n("span",null,"        '#74add1',")]),s(`
`),n("span",{class:"line"},[n("span",null,"        '#abd9e9',")]),s(`
`),n("span",{class:"line"},[n("span",null,"        '#e0f3f8',")]),s(`
`),n("span",{class:"line"},[n("span",null,"        '#ffffbf',")]),s(`
`),n("span",{class:"line"},[n("span",null,"        '#fee090',")]),s(`
`),n("span",{class:"line"},[n("span",null,"        '#fdae61',")]),s(`
`),n("span",{class:"line"},[n("span",null,"        '#f46d43',")]),s(`
`),n("span",{class:"line"},[n("span",null,"        '#d73027',")]),s(`
`),n("span",{class:"line"},[n("span",null,"        '#a50026',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      ],")]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  series: [")]),s(`
`),n("span",{class:"line"},[n("span",null,"    {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      name: 'Gaussian',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      type: 'heatmap',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      data,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      emphasis: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        itemStyle: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          borderColor: '#333',")]),s(`
`),n("span",{class:"line"},[n("span",null,"          borderWidth: 1,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        },")]),s(`
`),n("span",{class:"line"},[n("span",null,"      },")]),s(`
`),n("span",{class:"line"},[n("span",null,"      progressive: 1000,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      animation: false,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ],")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"const height = 500")]),s(`
`),n("span",{class:"line"},[n("span",null,"```")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,":::")])])]),n("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1)])]),_:1}),e(p,{title:"Tree Chart"},{content:a(()=>[e(i,{config:"eJxNUU1PwzAMvfdX5IK6StAO8alK48LuHIAT4pC13pKpiaPYHSpo/x2npRs91Mp7z37PSYOeWLWatVop/aUtqy1wYxaZUrlhDlRXFRtwcGUwwJUmAqby0MOeyhCBqErN1bbTEco9oc8vs6KUDr9YCF2o1ZOSOlKLosiyyREDW/Ti+SNGjNixDfV4kGO0ux3EWuWWwcm8f+CLF9hhT+DwACN3TD+CaIFq9TGKpznSNAQQPUeYpOlLcUWXyueMMYp5fv14cVJtkBldAm/PYKcH7FnAqFuruxNOg9tgJzi4wMOzjU139pvIV/stSR5m0HrLMuFNgq0hsKnVzUxpb51Ol7Pu41jfg2RNzXfLWSM+RpOVfedNldpi0wuQt0AN+FZ7PkUYb+ivyM7H+REM2J1heYT75TL7BZIRlko=",title:"Tree",type:"js"})]),code:a(()=>[...l[14]||(l[14]=[n("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[n("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[n("code",{class:"language-"},[n("span",{class:"line"},[n("span",null,"::: echarts Tree")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"```js")]),s(`
`),n("span",{class:"line"},[n("span",null,"const data = await fetch(")]),s(`
`),n("span",{class:"line"},[n("span",null,"  'https://theme-hope-assets.vuejs.press/data/flare.json',")]),s(`
`),n("span",{class:"line"},[n("span",null,").then((res) => res.json())")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"const option = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  tooltip: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    trigger: 'item',")]),s(`
`),n("span",{class:"line"},[n("span",null,"    triggerOn: 'mousemove',")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  series: [")]),s(`
`),n("span",{class:"line"},[n("span",null,"    {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      type: 'tree',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      data: [data],")]),s(`
`),n("span",{class:"line"},[n("span",null,"      top: '18%',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      bottom: '14%',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      layout: 'radial',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      symbol: 'emptyCircle',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      symbolSize: 7,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      initialTreeDepth: 3,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      animationDurationUpdate: 750,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      emphasis: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        focus: 'descendant',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ],")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"const height = 600")]),s(`
`),n("span",{class:"line"},[n("span",null,"```")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,":::")])])]),n("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1)])]),_:1}),e(p,{title:"Multiple Chart"},{content:a(()=>[e(i,{config:"eJztVL2O2zAM3vMUXAK1QGD4J8qPgQLtZSpw7VSgQ9BBZzO2UMcybLmXIMi7l5R0roM+QJcuoviRH0lJFAvTDhZMZ7Vp4QPcFgANVtiWOdzuK9KsMY3VHamkkNrrqsI+B6EuehDsATDU5vVgWoutzeGkmgEZd/RSWTUgwZ4+mLEvMIej0wCOoutNORZWrECkcZIGmQW5DlIGuQlyK3741Bzii25+wjdUZJObSK5gl0YJrbtou4JtzHuZRWtCZJTMecoWtYJnZS0yN3GeCXtK8nSsjCJk0W4FG4o24x5qxAHhYArDedcuyyaNUlr3XEO24ThryUiWRnLG/a6adrTw1JvXVnPm1HttOcY64X1CGbMs2pO+n2p2wt3q5RNdPt0p2GtHtykKZbEy/VV48/XNXPW6/NyWeMkh9iZGHNHQkwopl4EyYK+ROP5h/GPRa/vwjW6pzIANZ2NsnVMnjO6ZHebYz+pqRvt0JQYdbSLguavV4As6mWKkjfCEkDsc6n/af5G24w4MELfGA9CrUrtQWbycwIK+OU+Ao5CM0n+kLprae1ZIQGBWUHOawoRyaN6oF2we3fsz/0meMreXO5k+8mi4w7tbeV++/zsCtoUp6TB/QmiL56/q7A74NmAm4y/VjGzx82aCp0n3aJjfHp3yvlj4mVmjrmpLM3MXx4vfwFNXcQ==",type:"js"})]),code:a(()=>[...l[15]||(l[15]=[n("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[n("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[n("code",{class:"language-"},[n("span",{class:"line"},[n("span",null,"::: echarts")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"```js")]),s(`
`),n("span",{class:"line"},[n("span",null,"const option = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  legend: {},")]),s(`
`),n("span",{class:"line"},[n("span",null,"  tooltip: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    trigger: 'axis',")]),s(`
`),n("span",{class:"line"},[n("span",null,"    showContent: false,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  dataset: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    source: [")]),s(`
`),n("span",{class:"line"},[n("span",null,"      ['product', '2012', '2013', '2014', '2015', '2016', '2017'],")]),s(`
`),n("span",{class:"line"},[n("span",null,"      ['Milk Tea', 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],")]),s(`
`),n("span",{class:"line"},[n("span",null,"      ['Matcha Latte', 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],")]),s(`
`),n("span",{class:"line"},[n("span",null,"      ['Cheese Cocoa', 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],")]),s(`
`),n("span",{class:"line"},[n("span",null,"      ['Walnut Brownie', 25.2, 37.1, 41.2, 18, 33.9, 49.1],")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  xAxis: { type: 'category' },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  yAxis: { gridIndex: 0 },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  grid: { top: '55%' },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  series: [")]),s(`
`),n("span",{class:"line"},[n("span",null,"    {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      type: 'line',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      smooth: true,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      seriesLayoutBy: 'row',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      emphasis: { focus: 'series' },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      type: 'line',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      smooth: true,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      seriesLayoutBy: 'row',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      emphasis: { focus: 'series' },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      type: 'line',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      smooth: true,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      seriesLayoutBy: 'row',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      emphasis: { focus: 'series' },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      type: 'line',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      smooth: true,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      seriesLayoutBy: 'row',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      emphasis: { focus: 'series' },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      type: 'pie',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      id: 'pie',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      radius: '30%',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      center: ['50%', '25%'],")]),s(`
`),n("span",{class:"line"},[n("span",null,"      emphasis: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        focus: 'self',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      },")]),s(`
`),n("span",{class:"line"},[n("span",null,"      label: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        formatter: '{b}: {@2012} ({d}%)',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      },")]),s(`
`),n("span",{class:"line"},[n("span",null,"      encode: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        itemName: 'product',")]),s(`
`),n("span",{class:"line"},[n("span",null,"        value: '2012',")]),s(`
`),n("span",{class:"line"},[n("span",null,"        tooltip: '2012',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ],")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"const height = 800")]),s(`
`),n("span",{class:"line"},[n("span",null,"```")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,":::")])])]),n("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1)])]),_:1}),e(p,{title:"WordCloud (with setup function)"},{content:a(()=>[e(i,{config:"eJy1Vttu3EYMfe9XEEkDr4v1XnLPAgVqJ3EbFKmBJkVRBAEyK41W0x1p1NHI622Qf+8hR7e1t31pqyeJ4pCH5CGHiSvrQK4KxpX0LX3+img+p0SV16qmtUq2G++aMqXEWefxcxC9ZMmKTu5nmTqZxnPvc02Fa2pNlTNl0J5yVW5qCo5SU1dW7SlA5VrZRuNEcM4GU63o8xc2UGtvdL2iD3gngcJP2FcabnbOpy+ta1L4av+0DutcVZpcJqbvJaxzTzx6tZvRS1XSWpMq98BklSf9R6MkWq8rr2sNmCkhWDVYTZS1HChlTZmw7pScJ0VbvWcY1J6b0fm1MlatLeKNIpjxmhLjE8gmqc5UY8MpB9eb9qlxJqWJqirowG6ulQ9tFEnjr/VUIikcCrMt3a68Bfx0imSqwqEqk8GwsgZBIAs11LyGUvAGybf6LHN+B7eDZArvnXqv1VTebPIwpQpxqA0HreCiDsrPuowLSBQjBnhQiR+1rpDGSieBPONk44Wqt28KtZE4l6slAUo0Uo9raIAkMhBvdVNVznNRalMmmnSSIz/1GWdeivvdw9lytmjPb+H2XLyuKFO21mNM5zBhc9foEDQZwbHLTZJLfvEGKVKlaGesZZLom8Q2KTxn3hXCH1NuKOibUM+Oci6CluNopGDKRjPzuLR75hT7OaCnBMAq6KFdn1YY7TO1Gl7HoVw6a53AsToL8+Cq+c6kIZ/nmqs2l9rN1y4EIGcOogkRB9JdudowTAmF42YGC47B+qtIVAaGNFRNIFNGvNweoD6IkCOeZ08e0A09XzxAYv/UPX6GxKwQZZkF0rgOnX1bKKAhfrZ40MtiCBDCcC+UgFZUNtZ2ohhdJxsVBAUSQCBeeVBjGTQcS6rCUOYC9UFyghsVdZSBXF1Dx5SmaApaPqxuJPxC3Yjg6QKCg+j542d2jMm1fDiFxsc76LwL7dARhLGx0DAMTW+81rOo10EUfWCEeuoKkAmK8eiHsxeLKb1YfKT1vjf7jm09ftJ57cQdqu5In9vRsRXOjeFKHlu2bjwGFTxX5kbbWthUKL/tmKTi9DPWhH1PcLk5BnMsw/DagES9RXYRZ9zabPo/qkLgYac1GgoURce1VvjMOxxZ0fMDoFqqFXzbc9wfkdyRxdy+gI7ZgfS5JtQmHdpQUI7Kfz6c7jHh4pD+HSWkvRdHDv6jMca2rppwlV3w1XpklJkIIMOUiYjgAtdnzK1Uhn/zqOrQxftWp6PLZ5draEHVYSp5U277QzN6k5FB2wN4zGtEMFhlZg6WSheEprpMtdfp3eNcllun+QDcNuX2YJj+i6zFIN67S3Ns+gNSpT1SUyBLezAAbYdLgF2NAPx09f41J0tucYQgSK1WQqNf3tDaukQYj+QJITBbAdQ63PVgRUvVdg6Km/POyypmYQTpe+vWysaU1GFveQmSUQnBO/7GKtSKSGp9qQpj9xiNtSrrM16Qsn5CRo1fu+G5dpZ3o+4fvMmGxpyVBejuVhOXGtnsgAap3PSnRTg5HaERixgoGEf9Mtg9XofGl/TJb9aTrz/H9a173qqQz2RhnMRXMQHT39Dy6aJfjf5f5Y+z37GPTk6mJ6dfTj/1P2TrPHjRRYV7zmAJHdchaSA4qbXl5Pfyo0VrxblK3e7CNliQl4sxkuFvvz8/evRoVLcxptH1xPcXaIdaKu/VfkavFe44eQdrdUFFg3VRrq5SFfGGibdf5R3aIOxHnO+Rx1NtMyP2sO/mEfx1izg/4wDZPnBfN7I/y5IDhzm8jMKg6B0zG8+R6I6afOtnP/yNmeUCz51E3s1+S13uBwuuH5gaOT9e6X+0O1i+f/Hq4vXl+YFtfrDp9VV/fPznVZZhQP6GeG4pHGAbffSv7eUt33j/8tVf41IOsw==",type:"js"})]),code:a(()=>[...l[16]||(l[16]=[n("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[n("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[n("code",{class:"language-"},[n("span",{class:"line"},[n("span",null,"::: echarts")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"```js")]),s(`
`),n("span",{class:"line"},[n("span",null,"const option = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // canvas background color")]),s(`
`),n("span",{class:"line"},[n("span",null,"  backgroundColor: '#ffa',")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // The mouse pointer hangs to display the value")]),s(`
`),n("span",{class:"line"},[n("span",null,"  tooltip: {},")]),s(`
`),n("span",{class:"line"},[n("span",null,"  series: [")]),s(`
`),n("span",{class:"line"},[n("span",null,"    {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      type: 'wordCloud',")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,'      // The shape of the "cloud" to draw. Can be any polar equation represented as a')]),s(`
`),n("span",{class:"line"},[n("span",null,"      // callback function, or a keyword present. Available presents are circle (default),")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // cardioid (apple or heart shape curve, the most known polar equation), diamond (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // alias of square), triangle-forward, triangle, (alias of triangle-upright, pentagon, and star.")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"      shape: 'circle',")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // Keep aspect ratio of maskImage or 1:1 for shapes")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // This option is supported since echarts-wordcloud@2.1.0")]),s(`
`),n("span",{class:"line"},[n("span",null,"      keepAspect: false,")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // A silhouette image which the white area will be excluded from drawing texts.")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // The shape option will continue to apply as the shape of the cloud to grow.")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // maskImage: maskImage,")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // Following left/top/width/height/right/bottom are used for positioning the word cloud")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // Default to be put in the center and has 75% x 80% size.")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"      left: 'center',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      top: 'center',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      width: '70%',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      height: '80%',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      right: null,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      bottom: null,")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // Text size range which the value in data will be mapped to.")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // Default to have minimum 12px and maximum 60px size.")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"      sizeRange: [12, 60],")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // Text rotation range and step in degree. Text will be rotated randomly in range [-90, 90] by rotationStep 45")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"      rotationRange: [-90, 90],")]),s(`
`),n("span",{class:"line"},[n("span",null,"      rotationStep: 45,")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // size of the grid in pixels for marking the availability of the canvas")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // the larger the grid size, the bigger the gap between words.")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"      gridSize: 8,")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // set to true to allow word to be drawn partly outside of the canvas.")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // Allow word bigger than the size of the canvas to be drawn")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // This option is supported since echarts-wordcloud@2.1.0")]),s(`
`),n("span",{class:"line"},[n("span",null,"      drawOutOfBound: false,")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // if the font size is too large for the text to be displayed,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // whether to shrink the text. If it is set to false, the text will")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // not be rendered. If it is set to true, the text will be shrunk.")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // This option is supported since echarts-wordcloud@2.1.0")]),s(`
`),n("span",{class:"line"},[n("span",null,"      shrinkToFit: false,")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // If perform layout animation.")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // NOTE disable it will lead to UI blocking when there is lots of words.")]),s(`
`),n("span",{class:"line"},[n("span",null,"      layoutAnimation: true,")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // Global text style")]),s(`
`),n("span",{class:"line"},[n("span",null,"      textStyle: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        fontFamily: 'sans-serif',")]),s(`
`),n("span",{class:"line"},[n("span",null,"        fontWeight: 'bold',")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // Color can be a callback function or a color string")]),s(`
`),n("span",{class:"line"},[n("span",null,"        color() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          // Random color")]),s(`
`),n("span",{class:"line"},[n("span",null,"          return `rgb(${[")]),s(`
`),n("span",{class:"line"},[n("span",null,"            Math.round(Math.random() * 160),")]),s(`
`),n("span",{class:"line"},[n("span",null,"            Math.round(Math.random() * 160),")]),s(`
`),n("span",{class:"line"},[n("span",null,"            Math.round(Math.random() * 160),")]),s(`
`),n("span",{class:"line"},[n("span",null,"          ].join(',')})`")]),s(`
`),n("span",{class:"line"},[n("span",null,"        },")]),s(`
`),n("span",{class:"line"},[n("span",null,"      },")]),s(`
`),n("span",{class:"line"},[n("span",null,"      emphasis: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        focus: 'self',")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"        textStyle: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          textShadowBlur: 10,")]),s(`
`),n("span",{class:"line"},[n("span",null,"          textShadowColor: '#333',")]),s(`
`),n("span",{class:"line"},[n("span",null,"        },")]),s(`
`),n("span",{class:"line"},[n("span",null,"      },")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // Data is an array. Each array item must have name and value property.")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // textStyle must not be empty")]),s(`
`),n("span",{class:"line"},[n("span",null,"      data: [")]),s(`
`),n("span",{class:"line"},[n("span",null,"        {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          name: 'vuepress theme hope',")]),s(`
`),n("span",{class:"line"},[n("span",null,"          value: 8888,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        },")]),s(`
`),n("span",{class:"line"},[n("span",null,"        {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          name: 'Mr.Hope',")]),s(`
`),n("span",{class:"line"},[n("span",null,"          value: 10000,")]),s(`
`),n("span",{class:"line"},[n("span",null,"          textStyle: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            color: 'black',")]),s(`
`),n("span",{class:"line"},[n("span",null,"          },")]),s(`
`),n("span",{class:"line"},[n("span",null,"          emphasis: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            textStyle: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"              color: '#BDBEFA',")]),s(`
`),n("span",{class:"line"},[n("span",null,"              shadowBlur: 4,")]),s(`
`),n("span",{class:"line"},[n("span",null,"              shadowOffsetY: 14,")]),s(`
`),n("span",{class:"line"},[n("span",null,"            },")]),s(`
`),n("span",{class:"line"},[n("span",null,"          },")]),s(`
`),n("span",{class:"line"},[n("span",null,"        },")]),s(`
`),n("span",{class:"line"},[n("span",null,"      ],")]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ],")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"```")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,":::")])])]),n("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1)])]),_:1})])}const y=m(o,[["render",h]]),A=JSON.parse('{"path":"/plugins/markdown/markdown-chart/echarts.html","title":"ECharts","lang":"en-US","frontmatter":{"icon":"chart-scatter","description":"ECharts Add ECharts support to the Markdown files in your VuePress site. Installation Install ECharts in your project: Then enable it via: .vuepress/config.ts Syntax With JSON I...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"ECharts\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-11-26T05:40:25.000Z\\",\\"author\\":[]}"],["meta",{"property":"og:url","content":"https://ecosystem.vuejs.press/plugins/markdown/markdown-chart/echarts.html"}],["meta",{"property":"og:site_name","content":"VuePress Ecosystem"}],["meta",{"property":"og:title","content":"ECharts"}],["meta",{"property":"og:description","content":"ECharts Add ECharts support to the Markdown files in your VuePress site. Installation Install ECharts in your project: Then enable it via: .vuepress/config.ts Syntax With JSON I..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:locale:alternate","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-11-26T05:40:25.000Z"}],["meta",{"property":"article:modified_time","content":"2025-11-26T05:40:25.000Z"}],["link",{"rel":"alternate","hreflang":"zh-cn","href":"https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-chart/echarts.html"}],["link",{"rel":"alternate","type":"application/atom+xml","href":"https://ecosystem.vuejs.press/atom.xml","title":"VuePress Ecosystem Atom Feed"}],["link",{"rel":"alternate","type":"application/json","href":"https://ecosystem.vuejs.press/feed.json","title":"VuePress Ecosystem JSON Feed"}],["link",{"rel":"alternate","type":"application/rss+xml","href":"https://ecosystem.vuejs.press/rss.xml","title":"VuePress Ecosystem RSS Feed"}]]},"git":{"updatedTime":1764135625000,"contributors":[{"name":"Mister-Hope","username":"Mister-Hope","email":"mister-hope@outlook.com","commits":3,"avatar":"https://avatars.githubusercontent.com/Mister-Hope?v=4","url":"https://github.com/Mister-Hope"}],"changelog":[{"hash":"795eeec15c9a889905a67ccac8f3fbee6089b4bd","time":1764135625000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"feat(plugin-markdown-chart)!: avoid potential XSS attack (#574)"},{"hash":"ca1ee4007bb66653de8d0944807c4b12ab92118f","time":1758449847000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"docs: fix typos, close #559"},{"hash":"7f5fdff8c26f865b21697b3c6d29bb49d9b20ba4","time":1749285836000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"feat: add plugin-markdown-chart (#249)"}]},"autoDesc":true,"filePathRelative":"plugins/markdown/markdown-chart/echarts.md"}');export{y as comp,A as data};
