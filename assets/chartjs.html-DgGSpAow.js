import{_ as h,c as b,d,b as i,w as a,a as s,e as n,r as c,o}from"./app-Jc7SvwFk.js";const m={};function k(v,l){const u=c("CodeTabs"),e=c("ChartJS"),r=c("VPPreview");return o(),b("div",null,[l[12]||(l[12]=d('<h1 id="chart-js" tabindex="-1"><a class="header-anchor" href="#chart-js"><span>Chart.js</span></a></h1><p>为你 VuePress 站点中的 Markdown 文件添加 <a href="https://www.chartjs.org/docs/latest/" target="_blank" rel="noopener noreferrer">Chart.js</a> 支持。</p><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装"><span>安装</span></a></h2><p>在你的项目中安装 <a href="https://www.chartjs.org/docs/latest/" target="_blank" rel="noopener noreferrer">Chart.js</a>：</p>',4)),i(u,{data:[{id:"pnpm"},{id:"yarn"},{id:"npm"}],"tab-id":"shell"},{title0:a(({value:p,isActive:t})=>[...l[0]||(l[0]=[n("pnpm",-1)])]),title1:a(({value:p,isActive:t})=>[...l[1]||(l[1]=[n("yarn",-1)])]),title2:a(({value:p,isActive:t})=>[...l[2]||(l[2]=[n("npm",-1)])]),tab0:a(({value:p,isActive:t})=>[...l[3]||(l[3]=[s("div",{class:"language-bash","data-highlighter":"shiki","data-ext":"bash",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[s("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[s("code",{class:"language-bash"},[s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#4078F2","--shiki-dark":"#61AFEF"}},"pnpm"),s("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}}," add"),s("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}}," -D"),s("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}}," chart.js")])])])],-1)])]),tab1:a(({value:p,isActive:t})=>[...l[4]||(l[4]=[s("div",{class:"language-bash","data-highlighter":"shiki","data-ext":"bash",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[s("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[s("code",{class:"language-bash"},[s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#4078F2","--shiki-dark":"#61AFEF"}},"yarn"),s("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}}," add"),s("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}}," -D"),s("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}}," chart.js")])])])],-1)])]),tab2:a(({value:p,isActive:t})=>[...l[5]||(l[5]=[s("div",{class:"language-bash","data-highlighter":"shiki","data-ext":"bash",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[s("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[s("code",{class:"language-bash"},[s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#4078F2","--shiki-dark":"#61AFEF"}},"npm"),s("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}}," i"),s("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}}," -D"),s("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}}," chart.js")])])])],-1)])]),_:1}),l[13]||(l[13]=d(`<p>然后通过以下方式启用：</p><div class="code-block-with-title"><div class="code-block-title-bar" data-title=".vuepress/config.ts"><span>.vuepress/config.ts</span></div><div class="language-ts line-numbers-mode" data-highlighter="shiki" data-ext="ts" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-ts"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">markdownChartPlugin</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;@vuepress/plugin-markdown-chart&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">export</span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD;"> default</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  plugins</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> [</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    markdownChartPlugin</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">({</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">      // 启用 Chart.js</span></span>
<span class="line highlighted"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">      chartjs</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> true</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }),</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  ],</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><h2 id="语法" tabindex="-1"><a class="header-anchor" href="#语法"><span>语法</span></a></h2><div class="language-md" data-highlighter="shiki" data-ext="md" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-md"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">::: chartjs 图表标题</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">\`\`\`json</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">  // 你的图表配置</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">\`\`\`</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:::</span></span></code></pre></div><p>你应该尽可能使用 <code>json</code> 代码块来提供你的图表数据配置，但如果需要动态生成数据，你也可以使用脚本块。<code>js</code> 或 <code>javascript</code> 代码块均受支持。你应当将导出的对象赋值给 <code>module.exports</code>。</p><div class="hint-container warning"><p class="hint-container-title">注意</p><p>出于安全考虑，你需要手动允许特定文件中的脚本块。请在插件选项中设置 <code>DANGEROUS_ALLOW_SCRIPT_EXECUTION: true</code> 和 <code>DANGEROUS_SCRIPT_EXECUTION_ALLOWLIST: [&#39;your/file/path.md&#39;]</code>。</p></div><h2 id="案例" tabindex="-1"><a class="header-anchor" href="#案例"><span>案例</span></a></h2>`,7)),i(r,{title:"块状图"},{content:a(()=>[i(e,{config:"eJyNUrtOwzAU3fsVlieQLBQnJBA2xEcgUXVwGitERHHluEOFsrHAijowsCAhgVgQYqIDf5OUv+DactsEJaVDnPs4Puce614PEMJqNuH4BOGISUx0IWaKQUE3IctYxLMC8iGuv56Wtx+YILy8f7TRz+LGRvXiexV9vtmoen3Q0UjzWuaCK8NmKsiqbJT0JNXdvH5+qebvZh7btVMNqUsQDQnyCPIJgsSz7AYVsfFVIsU0j89EJmRDyLRlErE914eLIVBQD647B+5+Q2cF8g+hH0Df9QDdAzJMrhMQdAxfD+gIMDQ0U/fLUR/8UEfrac5tetSH0QMYz4DWmNYrCBlzuesL0P/9d0La7jshbe+dkD/O+5XWvgGyxfV5GqtLcE1tozT/EZyl2W4xUanI9QraBS/GLOObHCqzRqJ5eZLmp+qCSwENJae8Ra3PclAOfgFjv8GB",title:"%E4%B8%80%E4%B8%AA%E5%9D%97%E7%8A%B6%E5%9B%BE%E6%A1%88%E4%BE%8B"})]),code:a(()=>[...l[6]||(l[6]=[s("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[s("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[s("code",{class:"language-"},[s("span",{class:"line"},[s("span",null,"::: chartjs 一个块状图案例")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"```json")]),n(`
`),s("span",{class:"line"},[s("span",null,"{")]),n(`
`),s("span",{class:"line"},[s("span",null,'  "type": "bar",')]),n(`
`),s("span",{class:"line"},[s("span",null,'  "data": {')]),n(`
`),s("span",{class:"line"},[s("span",null,'    "labels": ["红色", "蓝色", "黄色", "绿色", "紫色", "橙色"],')]),n(`
`),s("span",{class:"line"},[s("span",null,'    "datasets": [')]),n(`
`),s("span",{class:"line"},[s("span",null,"      {")]),n(`
`),s("span",{class:"line"},[s("span",null,'        "label": "投票数",')]),n(`
`),s("span",{class:"line"},[s("span",null,'        "data": [12, 19, 3, 5, 2, 3],')]),n(`
`),s("span",{class:"line"},[s("span",null,'        "backgroundColor": [')]),n(`
`),s("span",{class:"line"},[s("span",null,'          "rgba(255, 99, 132, 0.2)",')]),n(`
`),s("span",{class:"line"},[s("span",null,'          "rgba(54, 162, 235, 0.2)",')]),n(`
`),s("span",{class:"line"},[s("span",null,'          "rgba(255, 206, 86, 0.2)",')]),n(`
`),s("span",{class:"line"},[s("span",null,'          "rgba(75, 192, 192, 0.2)",')]),n(`
`),s("span",{class:"line"},[s("span",null,'          "rgba(153, 102, 255, 0.2)",')]),n(`
`),s("span",{class:"line"},[s("span",null,'          "rgba(255, 159, 64, 0.2)"')]),n(`
`),s("span",{class:"line"},[s("span",null,"        ],")]),n(`
`),s("span",{class:"line"},[s("span",null,'        "borderColor": [')]),n(`
`),s("span",{class:"line"},[s("span",null,'          "rgba(255, 99, 132, 1)",')]),n(`
`),s("span",{class:"line"},[s("span",null,'          "rgba(54, 162, 235, 1)",')]),n(`
`),s("span",{class:"line"},[s("span",null,'          "rgba(255, 206, 86, 1)",')]),n(`
`),s("span",{class:"line"},[s("span",null,'          "rgba(75, 192, 192, 1)",')]),n(`
`),s("span",{class:"line"},[s("span",null,'          "rgba(153, 102, 255, 1)",')]),n(`
`),s("span",{class:"line"},[s("span",null,'          "rgba(255, 159, 64, 1)"')]),n(`
`),s("span",{class:"line"},[s("span",null,"        ],")]),n(`
`),s("span",{class:"line"},[s("span",null,'        "borderWidth": 1')]),n(`
`),s("span",{class:"line"},[s("span",null,"      }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    ]")]),n(`
`),s("span",{class:"line"},[s("span",null,"  },")]),n(`
`),s("span",{class:"line"},[s("span",null,'  "options": {')]),n(`
`),s("span",{class:"line"},[s("span",null,'    "scales": {')]),n(`
`),s("span",{class:"line"},[s("span",null,'      "y": {')]),n(`
`),s("span",{class:"line"},[s("span",null,'        "beginAtZero": true')]),n(`
`),s("span",{class:"line"},[s("span",null,"      }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"  }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"```")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,":::")])])]),s("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1)])]),_:1}),i(r,{title:"气泡图"},{content:a(()=>[i(e,{config:"eJyr5lJQUCqpLEhVslJQSipNSspJVdIBiaUkliQCxUDyUF5xakkxUCQaLKIAlQHL5iQmpeaADHi+Zs2THQ1Pdqx6NnXDs951L2e3gQ2DKoMaCTMAbIiCUgVQyMhAR0GpEsgwBjGKgAxDU4VahFa4QhOYQkO4QgOFWri6WCTbkhKTs9OL8kvzUpzzc/JBSpWK0pM0jExNdRQsLXUUDI2NNJWgyiEmxALJWq5aLgCVmkPj",title:"%E4%B8%80%E4%B8%AA%E6%B0%94%E6%B3%A1%E5%9B%BE%E6%A1%88%E4%BE%8B"})]),code:a(()=>[...l[7]||(l[7]=[s("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[s("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[s("code",{class:"language-"},[s("span",{class:"line"},[s("span",null,"::: chartjs 一个气泡图案例")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"```json")]),n(`
`),s("span",{class:"line"},[s("span",null,"{")]),n(`
`),s("span",{class:"line"},[s("span",null,'  "type": "bubble",')]),n(`
`),s("span",{class:"line"},[s("span",null,'  "data": {')]),n(`
`),s("span",{class:"line"},[s("span",null,'    "datasets": [')]),n(`
`),s("span",{class:"line"},[s("span",null,"      {")]),n(`
`),s("span",{class:"line"},[s("span",null,'        "label": "第一个数据集",')]),n(`
`),s("span",{class:"line"},[s("span",null,'        "data": [')]),n(`
`),s("span",{class:"line"},[s("span",null,'          { "x": 20, "y": 30, "r": 15 },')]),n(`
`),s("span",{class:"line"},[s("span",null,'          { "x": 40, "y": 10, "r": 10 }')]),n(`
`),s("span",{class:"line"},[s("span",null,"        ],")]),n(`
`),s("span",{class:"line"},[s("span",null,'        "backgroundColor": "rgb(255, 99, 132)"')]),n(`
`),s("span",{class:"line"},[s("span",null,"      }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    ]")]),n(`
`),s("span",{class:"line"},[s("span",null,"  }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"```")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,":::")])])]),s("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1)])]),_:1}),i(r,{title:"线状图"},{content:a(()=>[i(e,{config:"eJyr5lJQUCqpLEhVslJQysnMS1XSAYmkJJYkAkVAskBeTmJSak4xkB+t9GRHw7M5HUo6CkpPdvXAWDs6oayns2fDZafAxFrXwtU1g1ixIBugdhSnloDNBYsoQO1D2Aly1LOOic9ntTxfswZo9ZMdq55N3fCsd93L2W1gh0IVQ50bbWaqo2BqqaNgYQDEhkC2GRADxUwMoJaCVadl5oBMTkvMKU5FEk7KL0pJLXLOz8kvAtlblJ6kYQ7Ua2hpBCY0kS0sSc0rzszPA6oz0DOECteC6VggWctVywUAjFhqNw==",title:"%E4%B8%80%E4%B8%AA%E7%BA%BF%E7%8A%B6%E5%9B%BE%E6%A1%88%E4%BE%8B"})]),code:a(()=>[...l[8]||(l[8]=[s("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[s("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[s("code",{class:"language-"},[s("span",{class:"line"},[s("span",null,"::: chartjs 一个线状图案例")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"```json")]),n(`
`),s("span",{class:"line"},[s("span",null,"{")]),n(`
`),s("span",{class:"line"},[s("span",null,'  "type": "line",')]),n(`
`),s("span",{class:"line"},[s("span",null,'  "data": {')]),n(`
`),s("span",{class:"line"},[s("span",null,'    "labels": ["一月", "二月", "三月", "四月", "五月", "六月", "七月"],')]),n(`
`),s("span",{class:"line"},[s("span",null,'    "datasets": [')]),n(`
`),s("span",{class:"line"},[s("span",null,"      {")]),n(`
`),s("span",{class:"line"},[s("span",null,'        "label": "我的第一个数据集",')]),n(`
`),s("span",{class:"line"},[s("span",null,'        "data": [65, 59, 80, 81, 56, 55, 40],')]),n(`
`),s("span",{class:"line"},[s("span",null,'        "fill": false,')]),n(`
`),s("span",{class:"line"},[s("span",null,'        "borderColor": "rgb(75, 192, 192)",')]),n(`
`),s("span",{class:"line"},[s("span",null,'        "tension": 0.1')]),n(`
`),s("span",{class:"line"},[s("span",null,"      }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    ]")]),n(`
`),s("span",{class:"line"},[s("span",null,"  }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"```")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,":::")])])]),s("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1)])]),_:1}),i(r,{title:"玫瑰图"},{content:a(()=>[i(e,{config:"eJyr5lJQUCqpLEhVslJQKsjPSSxyLEpNVNIBCackliQChUFKgLycxKTUnGIgP1rp+a5FLzo3KekoKD3fvR/Kerm7BSbWuAHKejF5LogVCzINal5xagnYDLCIAtRshPkgVzzrmPh8VsvzNWue7Gh4smPVs6kbnvWuezm7DewoqGKo06INDXUUDM10FMx1FIyBLBOoVWA1SYnJ2elF+aV5Kc75OflFSLaCpYvSkzSMTE11FCwtgTqNjTSRzIdKmwNlDS2NwAQWabBuIwMgYWGGTdoA6DgjA6C7jAzMscibmoDcDjTdyNhUUwkuGwtl1YJpEK+Wq5YLALKFcXk=",title:"%E4%B8%80%E4%B8%AA%E7%8E%AB%E7%91%B0%E5%9B%BE%E6%A1%88%E4%BE%8B"})]),code:a(()=>[...l[9]||(l[9]=[s("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[s("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[s("code",{class:"language-"},[s("span",{class:"line"},[s("span",null,"::: chartjs 一个玫瑰图案例")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"```json")]),n(`
`),s("span",{class:"line"},[s("span",null,"{")]),n(`
`),s("span",{class:"line"},[s("span",null,'  "type": "polarArea",')]),n(`
`),s("span",{class:"line"},[s("span",null,'  "data": {')]),n(`
`),s("span",{class:"line"},[s("span",null,'    "labels": ["红色", "绿色", "黄色", "灰色", "蓝色"],')]),n(`
`),s("span",{class:"line"},[s("span",null,'    "datasets": [')]),n(`
`),s("span",{class:"line"},[s("span",null,"      {")]),n(`
`),s("span",{class:"line"},[s("span",null,'        "label": "我的第一个数据集",')]),n(`
`),s("span",{class:"line"},[s("span",null,'        "data": [11, 16, 7, 3, 14],')]),n(`
`),s("span",{class:"line"},[s("span",null,'        "backgroundColor": [')]),n(`
`),s("span",{class:"line"},[s("span",null,'          "rgb(255, 99, 132)",')]),n(`
`),s("span",{class:"line"},[s("span",null,'          "rgb(75, 192, 192)",')]),n(`
`),s("span",{class:"line"},[s("span",null,'          "rgb(255, 205, 86)",')]),n(`
`),s("span",{class:"line"},[s("span",null,'          "rgb(201, 203, 207)",')]),n(`
`),s("span",{class:"line"},[s("span",null,'          "rgb(54, 162, 235)"')]),n(`
`),s("span",{class:"line"},[s("span",null,"        ]")]),n(`
`),s("span",{class:"line"},[s("span",null,"      }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    ]")]),n(`
`),s("span",{class:"line"},[s("span",null,"  }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"```")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,":::")])])]),s("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1)])]),_:1}),i(r,{title:"雷达图"},{content:a(()=>[i(e,{config:"eJy9k81Kw0AQx+99imW9KARJ0w9bj3rxDTyUHhKzqcGYLdtUECkIiigq2IM9KD30UJXSlh4Ei6hP0ybpWzi7pphgaQpCD7s7Ozsz/2F/zEkCIewclwneRJipusqwxF266qjg4s9ws1SNWBW4F/D47mzS7mEJ4XGj6Q5eueU1W/7zFbf8/pffbwnfR8N7uebWpFP3P5/E61vd7bVxkSsEGhXiiLrCgwK9X03elXtZ9x7OvW53NDwdDTvu/cC97U8eL0SjQXDQbiGbkVAmL6G8LKFcEuwsLPCl5UBURBumxSs7rEpCXk3dOygxWrX1bWpRJj6kpKmrCi+Qh6LJlCIheV1ZCytrlOmEhTMiCZHYMjVtZ2umTFxSVGXFMIw/MTv0iLAZ1ecEx/UeJNWm2fPxvN/E4VFygIIvwJPkmACPsgG2/A8+mTQUyAIaJQW9L8AnnLAwn5ikZfGJtjHlI84i7IIUpmXHpDafq2B+iUUOiS0mbYoQW6bNhz6E9Oerdk3d2YeHVKQ432uJWuIbidwvfg==",title:"%E4%B8%80%E4%B8%AA%E9%9B%B7%E8%BE%BE%E5%9B%BE%E6%A1%88%E4%BE%8B"})]),code:a(()=>[...l[10]||(l[10]=[s("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[s("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[s("code",{class:"language-"},[s("span",{class:"line"},[s("span",null,"::: chartjs 一个雷达图案例")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"```json")]),n(`
`),s("span",{class:"line"},[s("span",null,"{")]),n(`
`),s("span",{class:"line"},[s("span",null,'  "type": "radar",')]),n(`
`),s("span",{class:"line"},[s("span",null,'  "data": {')]),n(`
`),s("span",{class:"line"},[s("span",null,'    "labels": ["吃饭", "喝水", "睡觉", "设计", "编程", "骑车", "跑步"],')]),n(`
`),s("span",{class:"line"},[s("span",null,'    "datasets": [')]),n(`
`),s("span",{class:"line"},[s("span",null,"      {")]),n(`
`),s("span",{class:"line"},[s("span",null,'        "label": "我的第一个数据集",')]),n(`
`),s("span",{class:"line"},[s("span",null,'        "data": [65, 59, 90, 81, 56, 55, 40],')]),n(`
`),s("span",{class:"line"},[s("span",null,'        "fill": true,')]),n(`
`),s("span",{class:"line"},[s("span",null,'        "backgroundColor": "rgba(255, 99, 132, 0.2)",')]),n(`
`),s("span",{class:"line"},[s("span",null,'        "borderColor": "rgb(255, 99, 132)",')]),n(`
`),s("span",{class:"line"},[s("span",null,'        "pointBackgroundColor": "rgb(255, 99, 132)",')]),n(`
`),s("span",{class:"line"},[s("span",null,'        "pointBorderColor": "#fff",')]),n(`
`),s("span",{class:"line"},[s("span",null,'        "pointHoverBackgroundColor": "#fff",')]),n(`
`),s("span",{class:"line"},[s("span",null,'        "pointHoverBorderColor": "rgb(255, 99, 132)"')]),n(`
`),s("span",{class:"line"},[s("span",null,"      },")]),n(`
`),s("span",{class:"line"},[s("span",null,"      {")]),n(`
`),s("span",{class:"line"},[s("span",null,'        "label": "我的第二个数据集",')]),n(`
`),s("span",{class:"line"},[s("span",null,'        "data": [28, 48, 40, 19, 96, 27, 100],')]),n(`
`),s("span",{class:"line"},[s("span",null,'        "fill": true,')]),n(`
`),s("span",{class:"line"},[s("span",null,'        "backgroundColor": "rgba(54, 162, 235, 0.2)",')]),n(`
`),s("span",{class:"line"},[s("span",null,'        "borderColor": "rgb(54, 162, 235)",')]),n(`
`),s("span",{class:"line"},[s("span",null,'        "pointBackgroundColor": "rgb(54, 162, 235)",')]),n(`
`),s("span",{class:"line"},[s("span",null,'        "pointBorderColor": "#fff",')]),n(`
`),s("span",{class:"line"},[s("span",null,'        "pointHoverBackgroundColor": "#fff",')]),n(`
`),s("span",{class:"line"},[s("span",null,'        "pointHoverBorderColor": "rgb(54, 162, 235)"')]),n(`
`),s("span",{class:"line"},[s("span",null,"      }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    ]")]),n(`
`),s("span",{class:"line"},[s("span",null,"  },")]),n(`
`),s("span",{class:"line"},[s("span",null,'  "options": {')]),n(`
`),s("span",{class:"line"},[s("span",null,'    "elements": {')]),n(`
`),s("span",{class:"line"},[s("span",null,'      "line": {')]),n(`
`),s("span",{class:"line"},[s("span",null,'        "borderWidth": 3')]),n(`
`),s("span",{class:"line"},[s("span",null,"      }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"  }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"```")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,":::")])])]),s("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1)])]),_:1}),i(r,{title:"散点图"},{content:a(()=>[i(e,{config:"eJxtULsOgjAU3fmKppMmaETDoKufYRgKNIRYKYGaSAyLg5sjk6O7cfWHMP6F95byMGFp2vO6t+dsEUJVkXK6ITQPmFI8ozaCIVMMQBSYV85VDshOI8QwmhXM5wIT6urxubzr6lXfnt/7VScZjclr3TqB0BNAM2dhE1rAbUHK3tHxLeuM053bHXfP3Zafg6ITeIPdfBbso0wek3ArhczwJ1nkT5YuWNdrmzir5ZQaeZPgwamnUZmqWCZYjKkKWhS8fwOCawzaausWccJZ07ZhUpnHmIasL5WSh/+peJZWaf0ALadm1Q==",title:"%E4%B8%80%E4%B8%AA%E6%95%A3%E7%82%B9%E5%9B%BE%E6%A1%88%E4%BE%8B"})]),code:a(()=>[...l[11]||(l[11]=[s("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[s("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[s("code",{class:"language-"},[s("span",{class:"line"},[s("span",null,"::: chartjs 一个散点图案例")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"```json")]),n(`
`),s("span",{class:"line"},[s("span",null,"{")]),n(`
`),s("span",{class:"line"},[s("span",null,'  "type": "scatter",')]),n(`
`),s("span",{class:"line"},[s("span",null,'  "data": {')]),n(`
`),s("span",{class:"line"},[s("span",null,'    "datasets": [')]),n(`
`),s("span",{class:"line"},[s("span",null,"      {")]),n(`
`),s("span",{class:"line"},[s("span",null,'        "label": "散点数据集",')]),n(`
`),s("span",{class:"line"},[s("span",null,'        "data": [')]),n(`
`),s("span",{class:"line"},[s("span",null,'          { "x": -10, "y": 0 },')]),n(`
`),s("span",{class:"line"},[s("span",null,'          { "x": 0, "y": 10 },')]),n(`
`),s("span",{class:"line"},[s("span",null,'          { "x": 10, "y": 5 },')]),n(`
`),s("span",{class:"line"},[s("span",null,'          { "x": 0.5, "y": 5.5 }')]),n(`
`),s("span",{class:"line"},[s("span",null,"        ],")]),n(`
`),s("span",{class:"line"},[s("span",null,'        "backgroundColor": "rgb(255, 99, 132)"')]),n(`
`),s("span",{class:"line"},[s("span",null,"      }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    ]")]),n(`
`),s("span",{class:"line"},[s("span",null,"  },")]),n(`
`),s("span",{class:"line"},[s("span",null,'  "options": {')]),n(`
`),s("span",{class:"line"},[s("span",null,'    "scales": {')]),n(`
`),s("span",{class:"line"},[s("span",null,'      "x": {')]),n(`
`),s("span",{class:"line"},[s("span",null,'        "type": "linear",')]),n(`
`),s("span",{class:"line"},[s("span",null,'        "position": "bottom"')]),n(`
`),s("span",{class:"line"},[s("span",null,"      }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"  }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"```")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,":::")])])]),s("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1)])]),_:1}),l[14]||(l[14]=s("h2",{id:"文档",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#文档"},[s("span",null,"文档")])],-1)),l[15]||(l[15]=s("p",null,[n("相关详情，详见 "),s("a",{href:"https://www.chartjs.org/docs/latest/",target:"_blank",rel:"noopener noreferrer"},"Chart.js 文档"),n(".")],-1))])}const A=h(m,[["render",k]]),B=JSON.parse('{"path":"/zh/plugins/markdown/markdown-chart/chartjs.html","title":"Chart.js","lang":"zh-CN","frontmatter":{"icon":"chart-bar-increasing","description":"Chart.js 为你 VuePress 站点中的 Markdown 文件添加 Chart.js 支持。 安装 在你的项目中安装 Chart.js： 然后通过以下方式启用： .vuepress/config.ts 语法 你应该尽可能使用 json 代码块来提供你的图表数据配置，但如果需要动态生成数据，你也可以使用脚本块。js 或 javascript ...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Chart.js\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-11-26T05:40:25.000Z\\",\\"author\\":[]}"],["meta",{"property":"og:url","content":"https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-chart/chartjs.html"}],["meta",{"property":"og:site_name","content":"VuePress 生态系统"}],["meta",{"property":"og:title","content":"Chart.js"}],["meta",{"property":"og:description","content":"Chart.js 为你 VuePress 站点中的 Markdown 文件添加 Chart.js 支持。 安装 在你的项目中安装 Chart.js： 然后通过以下方式启用： .vuepress/config.ts 语法 你应该尽可能使用 json 代码块来提供你的图表数据配置，但如果需要动态生成数据，你也可以使用脚本块。js 或 javascript ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:locale:alternate","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2025-11-26T05:40:25.000Z"}],["meta",{"property":"article:modified_time","content":"2025-11-26T05:40:25.000Z"}],["link",{"rel":"alternate","hreflang":"en-us","href":"https://ecosystem.vuejs.press/plugins/markdown/markdown-chart/chartjs.html"}],["link",{"rel":"alternate","type":"application/atom+xml","href":"https://ecosystem.vuejs.press/zh/atom.xml","title":"VuePress 生态系统 Atom Feed"}],["link",{"rel":"alternate","type":"application/json","href":"https://ecosystem.vuejs.press/zh/feed.json","title":"VuePress 生态系统 JSON Feed"}],["link",{"rel":"alternate","type":"application/rss+xml","href":"https://ecosystem.vuejs.press/zh/rss.xml","title":"VuePress 生态系统 RSS Feed"}]]},"git":{"updatedTime":1764135625000,"contributors":[{"name":"Mister-Hope","username":"Mister-Hope","email":"mister-hope@outlook.com","commits":2,"avatar":"https://avatars.githubusercontent.com/Mister-Hope?v=4","url":"https://github.com/Mister-Hope"}],"changelog":[{"hash":"795eeec15c9a889905a67ccac8f3fbee6089b4bd","time":1764135625000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"feat(plugin-markdown-chart)!: avoid potential XSS attack (#574)"},{"hash":"7f5fdff8c26f865b21697b3c6d29bb49d9b20ba4","time":1749285836000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"feat: add plugin-markdown-chart (#249)"}]},"autoDesc":true,"filePathRelative":"zh/plugins/markdown/markdown-chart/chartjs.md"}');export{A as comp,B as data};
