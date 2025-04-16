import{_ as r,c as k,a as i,b as n,d as a,e,w as h,r as l,o}from"./app-Hy3CkDjp.js";const c={},g={class:"hint-container details"};function A(v,s){const p=l("NpmBadge"),d=l("RevealJs"),t=l("RouteLink");return o(),k("div",null,[s[7]||(s[7]=i("h1",{id:"revealjs",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#revealjs"},[i("span",null,"revealjs")])],-1)),n(p,{package:"@vuepress/plugin-revealjs"}),s[8]||(s[8]=a(`<p>在你的 VuePress 站点中添加幻灯片。</p><h2 id="使用" tabindex="-1"><a class="header-anchor" href="#使用"><span>使用</span></a></h2><div class="language-bash" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">npm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> i</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -D</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> @vuepress/plugin-revealjs@next</span></span></code></pre></div><div class="code-block-with-title"><div class="code-block-title-bar" data-title=".vuepress/config.js"><span>.vuepress/config.js</span></div><div class="language-js" data-highlighter="shiki" data-ext="js" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">revealJsPlugin</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;@vuepress/plugin-revealjs&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">export</span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD;"> default</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  plugins</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> [</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    revealJsPlugin</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">({</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">      // 插件选项</span></span>
<span class="line highlighted"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }),</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  ],</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre></div></div><h2 id="幻灯片语法" tabindex="-1"><a class="header-anchor" href="#幻灯片语法"><span>幻灯片语法</span></a></h2><ul><li>使用 <code>---</code> 分割幻灯片</li><li>使用 <code>--</code> 对幻灯片进行二次分割(垂直显示)</li></ul><div class="language-md line-numbers-mode" data-highlighter="shiki" data-ext="md" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">@slidestart</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">&lt;!-- slide1 --&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">---</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">&lt;!-- slide2 --&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">---</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">&lt;!-- slide3 --&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">@slideend</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7)),i("details",g,[s[0]||(s[0]=i("summary",null,"示例",-1)),n(d,{id:"revealjs-31",code:"eJzjUlZWeLpz9/PG9c87258taH+5aAYX15MdDU92rHrWvfTZnM5n09qfrp3+dFKPQvTLyfue9S2N1cgoKSkottLXz80sLkkt0s3IL0jVS87P1VR4Pqvl2bqtLybs5eLS1dXlApn9ZPfi5wsaX66e8WTXOi6uhISErGKFaCNdkxpDXdNYruT8vOIShcSUFAVbBY1EHYUkTQVbO4VqLgWFzDQFjZLKgtT8NIUkBVtbWwX10ryU1LTMvNQUdU2FotSS0qI8hUQFbQVDLqBqJH4SVy3IGi4AEi9W9Q==",theme:"auto"}),s[1]||(s[1]=a(`<div class="language-md line-numbers-mode" data-highlighter="shiki" data-ext="md" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">@slidestart</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">## 幻灯片标题</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">一个拥有文字和 </span><span style="--shiki-light:#986801;--shiki-dark:#ABB2BF;">[</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">链接</span><span style="--shiki-light:#986801;--shiki-dark:#ABB2BF;">]</span><span style="--shiki-light:#A626A4;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#A626A4;--shiki-light-text-decoration:inherit;--shiki-dark:#C678DD;--shiki-dark-text-decoration:underline;">https://mister-hope.com</span><span style="--shiki-light:#A626A4;--shiki-dark:#E06C75;">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> 的段落</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">---</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">## 代码高亮</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">\`\`\`js [2-4|1-5]</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> add</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">a</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">b</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=&gt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">  if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD;">typeof</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> b</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> ===</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;undefined&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">return</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> a</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> +</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">  return</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> a</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> +</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> b</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">\`\`\`</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">@slideend</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1))]),s[9]||(s[9]=a("<p>默认情况下，我们使用 <code>auto</code> 主题来渲染幻灯片，你也可以通过 <code>@slidestart 主题名称</code> 使用其他主题。</p><p>你可以通过插件选项中的 <code>themes</code> 启用以下主题:</p><ul><li><code>auto</code> (默认)</li><li><code>black</code></li><li><code>white</code></li><li><code>league</code></li><li><code>beige</code></li><li><code>sky</code></li><li><code>night</code></li><li><code>serif</code></li><li><code>simple</code></li><li><code>solarized</code></li><li><code>blood</code></li><li><code>moon</code></li></ul>",3)),i("p",null,[s[3]||(s[3]=e("各主题的外观，详见 ")),n(t,{to:"/zh/plugins/markdown/revealjs/themes.html"},{default:h(()=>s[2]||(s[2]=[e("幻灯片主题")])),_:1})]),s[10]||(s[10]=a(`<div class="hint-container important"><p class="hint-container-title">资源路径</p><p>由于 <code>@slidestart</code> 和 <code>@slideend</code> 之间的 Markdown 内容由 Reveal.js 在浏览器中处理，因此你只能在幻灯片中使用绝对路径的资源，这些资源必须可以直接在浏览器中访问，不支持相对路径或别名。</p></div><h2 id="幻灯片布局" tabindex="-1"><a class="header-anchor" href="#幻灯片布局"><span>幻灯片布局</span></a></h2><p>默认情况下，插件会注册一个 <code>SlidePage</code> 布局来供你渲染“幻灯片页”。</p><p>在使用此布局的页面中，你应该只包含单个幻灯片语法，不包含其他内容，以避免渲染问题:</p><div class="language-md" data-highlighter="shiki" data-ext="md" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">---</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">layout</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">SlidePage</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">---</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">@slidestart</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">&lt;!-- 此处是幻灯片内容 --&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">@slideend</span></span></code></pre></div><p>你可以通过插件选项中的 <code>layout</code> 来自定义此行为，比如使用 <code>false</code> 来禁用它或填入其他布局名称。</p><h2 id="演示" tabindex="-1"><a class="header-anchor" href="#演示"><span>演示</span></a></h2>`,7)),i("p",null,[s[5]||(s[5]=e("请见 ")),n(t,{to:"/zh/plugins/markdown/revealjs/demo.html"},{default:h(()=>s[4]||(s[4]=[e("幻灯片演示")])),_:1}),s[6]||(s[6]=e("。"))]),s[11]||(s[11]=a(`<h2 id="自定义-reveal-js" tabindex="-1"><a class="header-anchor" href="#自定义-reveal-js"><span>自定义 Reveal.js</span></a></h2><h3 id="内置插件" tabindex="-1"><a class="header-anchor" href="#内置插件"><span>内置插件</span></a></h3><p>你可以通过插件选项中的 <code>plugins</code> 启用 reveal.js 中的内置插件。它接受以下插件名称的数组:</p><ul><li><code>highlight</code></li><li><code>math</code></li><li><code>search</code></li><li><code>notes</code></li><li><code>zoom</code></li></ul><div class="hint-container note"><p class="hint-container-title">注</p><p>为了支持 Markdown 语法，我们总会启用 <code>markdown</code> 插件。</p></div><h3 id="高级配置" tabindex="-1"><a class="header-anchor" href="#高级配置"><span>高级配置</span></a></h3><p>你也可以在<a href="https://vuejs.press/zh/guide/configuration.html#%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6" target="_blank" rel="noopener noreferrer">客户端配置文件</a>中导入并调用 <code>defineRevealJsConfig</code> 来自定义 reveal.js:</p><p><code>defineRevealJsConfig</code> 函数接受一个 ref、getter 或普通对象作为 reveal.js 选项:</p><div class="code-block-with-title"><div class="code-block-title-bar" data-title=".vuepress/client.ts"><span>.vuepress/client.ts</span></div><div class="language-ts line-numbers-mode" data-highlighter="shiki" data-ext="ts" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">defineRevealJsConfig</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;@vuepress/plugin-revealjs/client&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 普通对象</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B;"> options1</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">  // 选项</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 或 getter</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> options2</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> () </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=&gt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> ({</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">  // 选项</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">})</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 或 ref</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B;"> options3</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> ref</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">({</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">  // 选项</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">})</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">defineRevealJsConfig</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">options1or2or3</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><div class="hint-container note"><p class="hint-container-title">注</p><p>Reveal.js 还提供了<a href="https://github.com/hakimel/reveal.js/wiki/Plugins,-Tools-and-Hardware" target="_blank" rel="noopener noreferrer">更多的插件</a>，你可以通过 <code>plugin</code> 选项在 <code>defineRevealJsConfig</code> 中添加它们，这种自定义行为不会影响你声明的内置插件。</p></div><h3 id="页面级配置" tabindex="-1"><a class="header-anchor" href="#页面级配置"><span>页面级配置</span></a></h3><p>你也可以在 Frontmatter 设置 <code>revealJs</code> 以设置特定页面的 reveal.js 选项。</p><p>Reveal.js 选项，请参见<a href="https://revealjs.com/config/" target="_blank" rel="noopener noreferrer">reveal.js config</a>，Reveal.js 用法，请参阅 <a href="https://revealjs.com/" target="_blank" rel="noopener noreferrer">reveal.js 文档</a>。</p><h2 id="选项" tabindex="-1"><a class="header-anchor" href="#选项"><span>选项</span></a></h2><h3 id="plugins" tabindex="-1"><a class="header-anchor" href="#plugins"><span>plugins</span></a></h3><ul><li><p>类型： <code>RevealJsPlugin[]</code></p></li><li><p>详情：需要启用 Reveal.js 内置的插件</p><p>可用值：<code>highlight</code>、<code>math</code>、<code>search</code>、<code>notes</code>、<code>zoom</code></p></li></ul><h3 id="themes" tabindex="-1"><a class="header-anchor" href="#themes"><span>themes</span></a></h3><ul><li><p>类型： <code>RevealJsTheme[]</code></p></li><li><p>默认值：<code>[&#39;auto&#39;]</code></p></li><li><p>详情：需要启用的 Reveal.js 主题</p><p>可用值：<code>auto</code>、<code>black</code>、<code>white</code>、<code>league</code>、<code>beige</code>、<code>sky</code>、<code>night</code>、<code>serif</code>、<code>simple</code>、<code>solarized</code>、<code>blood</code>、<code>moon</code></p></li></ul><h3 id="layout" tabindex="-1"><a class="header-anchor" href="#layout"><span>layout</span></a></h3><ul><li>类型： <code>string | false</code></li><li>默认值：<code>&#39;SlidePage&#39;</code></li><li>详情：用于渲染幻灯片的布局组件名称</li></ul><h2 id="样式" tabindex="-1"><a class="header-anchor" href="#样式"><span>样式</span></a></h2><p>你可以通过 CSS 变量自定义样式：</p><div class="language-css" data-highlighter="shiki" data-ext="css" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#986801;--shiki-dark:#56B6C2;">:root</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  --reveal-c-accent</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">var</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">--vp-c-accent</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  --reveal-c-control</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">var</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">--vp-c-control</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  --reveal-c-control-hover</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">var</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">--vp-c-control-hover</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  --reveal-c-shadow</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">var</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">--vp-c-shadow</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre></div><div class="language-" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span></span></span></code></pre></div>`,24))])}const B=r(c,[["render",A]]),m=JSON.parse('{"path":"/zh/plugins/markdown/revealjs/","title":"revealjs","lang":"zh-CN","frontmatter":{"icon":"presentation","description":"revealjs","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"revealjs\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-02-24T04:51:23.000Z\\",\\"author\\":[]}"],["meta",{"property":"og:url","content":"https://ecosystem.vuejs.press/zh/plugins/markdown/revealjs/"}],["meta",{"property":"og:site_name","content":"VuePress 生态系统"}],["meta",{"property":"og:title","content":"revealjs"}],["meta",{"property":"og:description","content":"revealjs"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:locale:alternate","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2025-02-24T04:51:23.000Z"}],["meta",{"property":"article:modified_time","content":"2025-02-24T04:51:23.000Z"}],["link",{"rel":"alternate","hreflang":"en-us","href":"https://ecosystem.vuejs.press/plugins/markdown/revealjs/"}],["link",{"rel":"alternate","type":"application/atom+xml","href":"https://ecosystem.vuejs.press/zh/atom.xml","title":"VuePress 生态系统 Atom Feed"}],["link",{"rel":"alternate","type":"application/json","href":"https://ecosystem.vuejs.press/zh/feed.json","title":"VuePress 生态系统 JSON Feed"}],["link",{"rel":"alternate","type":"application/rss+xml","href":"https://ecosystem.vuejs.press/zh/rss.xml","title":"VuePress 生态系统 RSS Feed"}]]},"git":{"updatedTime":1740372683000,"contributors":[{"name":"Mister-Hope","username":"Mister-Hope","email":"mister-hope@outlook.com","commits":5,"avatar":"https://avatars.githubusercontent.com/Mister-Hope?v=4","url":"https://github.com/Mister-Hope"},{"name":"ycyin","username":"ycyin","email":"71380489+ycyin@users.noreply.github.com","commits":1,"avatar":"https://avatars.githubusercontent.com/ycyin?v=4","url":"https://github.com/ycyin"}],"changelog":[{"hash":"00128fe8846af8af9c41fc11f5094fde5f87a650","time":1740372683000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"feat(plugin-revealjs)!: remove delay option (#367)"},{"hash":"ae96c427eeb664c8d361963d1815a68386856bbe","time":1736532474000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"docs: add icons to docs (#332)"},{"hash":"a11237cdc2fdfd286e408e43b0e31251f602b1a6","time":1734332740000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"fix: fix define getter (#304)"},{"hash":"8ddd51cc6ef3d614eb0d58eab5cfd2de23291e61","time":1733511606000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"docs(plugin-revealjs): improve docs"},{"hash":"3356183025ad0aa651266190f483113c14e6e853","time":1728375636000,"email":"71380489+ycyin@users.noreply.github.com","author":"ycyin","message":"docs: fix typos (#271)"},{"hash":"253b959cca19fd8ef9eff5d90f21a147c916899a","time":1727005764000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"feat: add plugin-revealjs (#251)"}]},"autoDesc":true,"filePathRelative":"zh/plugins/markdown/revealjs/README.md"}');export{B as comp,m as data};
