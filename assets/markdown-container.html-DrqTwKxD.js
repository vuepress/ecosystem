import{_ as h,c as p,a as s,b as e,d as r,e as a,w as k,r as n,o}from"./app-Hy3CkDjp.js";const d={};function c(g,i){const t=n("NpmBadge"),l=n("RouteLink");return o(),p("div",null,[i[3]||(i[3]=s("h1",{id:"markdown-container",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#markdown-container"},[s("span",null,"markdown-container")])],-1)),e(t,{package:"@vuepress/plugin-markdown-container"}),i[4]||(i[4]=s("p",null,"为你的 VuePress 站点注册自定义容器。",-1)),i[5]||(i[5]=s("p",null,[a("该插件简化了 "),s("a",{href:"https://github.com/markdown-it/markdown-it-container",target:"_blank",rel:"noopener noreferrer"},"markdown-it-container"),a(" 的使用方法，但同时也保留了其原本的能力。")],-1)),s("p",null,[i[1]||(i[1]=a("默认主题的 ")),e(l,{to:"/zh/themes/default/markdown.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%AE%B9%E5%99%A8"},{default:k(()=>i[0]||(i[0]=[a("自定义容器")])),_:1}),i[2]||(i[2]=a(" 就是由该插件支持的。"))]),i[6]||(i[6]=r(`<h2 id="使用方法" tabindex="-1"><a class="header-anchor" href="#使用方法"><span>使用方法</span></a></h2><div class="language-bash" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">npm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> i</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -D</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> @vuepress/plugin-markdown-container@next</span></span></code></pre></div><div class="code-block-with-title"><div class="code-block-title-bar" data-title=".vuepress/config.ts"><span>.vuepress/config.ts</span></div><div class="language-ts" data-highlighter="shiki" data-ext="ts" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">markdownContainerPlugin</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;@vuepress/plugin-markdown-container&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">export</span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD;"> default</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  plugins</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> [</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    markdownContainerPlugin</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">({</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">      // 配置项</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }),</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  ],</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre></div></div><h2 id="容器语法" tabindex="-1"><a class="header-anchor" href="#容器语法"><span>容器语法</span></a></h2><div class="language-md" data-highlighter="shiki" data-ext="md" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">::: &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">type</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt; </span><span style="--shiki-light:#986801;--shiki-dark:#ABB2BF;">[</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">info</span><span style="--shiki-light:#986801;--shiki-dark:#ABB2BF;">]</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#ABB2BF;">[</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">content</span><span style="--shiki-light:#986801;--shiki-dark:#ABB2BF;">]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:::</span></span></code></pre></div><ul><li><code>type</code> 是必需的，应通过 <a href="#type">type</a> 配置项来指定。</li><li><code>info</code> 是可选的，其默认值可以通过 <a href="#locales">locales</a> 的 <code>defaultInfo</code> 配置项来指定。</li><li><code>content</code> 可是任何合法的 Markdown 内容。</li></ul><div class="hint-container tip"><p class="hint-container-title">提示</p><p>该插件可以被多次使用，以便支持不同类型的容器。</p></div><h2 id="配置项" tabindex="-1"><a class="header-anchor" href="#配置项"><span>配置项</span></a></h2><h3 id="type" tabindex="-1"><a class="header-anchor" href="#type"><span>type</span></a></h3><ul><li><p>类型： <code>string</code></p></li><li><p>详情：</p><p>容器的类型。</p><p>它将会被用作 <a href="https://github.com/markdown-it/markdown-it-container#api" target="_blank" rel="noopener noreferrer">markdown-it-container</a> 的 <code>name</code> 参数。</p></li></ul><h3 id="locales" tabindex="-1"><a class="header-anchor" href="#locales"><span>locales</span></a></h3><ul><li><p>类型： <code>Record&lt;string, { defaultInfo: string }&gt;</code></p></li><li><p>详情：</p><p>容器在不同 locales 下的默认 <code>info</code> 。</p><p>如果没有指定该配置项，默认 <code>info</code> 会使用大写的 <a href="#type">type</a> 。</p></li><li><p>示例：</p></li></ul><div class="code-block-with-title"><div class="code-block-title-bar" data-title=".vuepress/config.ts"><span>.vuepress/config.ts</span></div><div class="language-ts line-numbers-mode" data-highlighter="shiki" data-ext="ts" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">export</span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD;"> default</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  plugins</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> [</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    markdownContainerPlugin</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">({</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">      type</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;tip&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">      locales</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        &#39;/&#39;</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">          defaultInfo</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;TIP&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        },</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        &#39;/zh/&#39;</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">          defaultInfo</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;提示&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        },</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      },</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }),</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  ],</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><ul><li>参考： <ul><li><a href="https://vuejs.press/zh/guide/i18n.html" target="_blank" rel="noopener noreferrer">指南 &gt; 多语言支持</a></li></ul></li></ul><h3 id="before" tabindex="-1"><a class="header-anchor" href="#before"><span>before</span></a></h3><ul><li><p>类型： <code>(info: string) =&gt; string</code></p></li><li><p>默认值：</p></li></ul><div class="language-ts" data-highlighter="shiki" data-ext="ts" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">info</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#0184BC;--shiki-dark:#E5C07B;"> string</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#0184BC;--shiki-dark:#E5C07B;"> string</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> =&gt;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">  \`&lt;div class=&quot;custom-container </span><span style="--shiki-light:#CA1243;--shiki-dark:#C678DD;">\${</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">type</span><span style="--shiki-light:#CA1243;--shiki-dark:#C678DD;">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;&gt;</span><span style="--shiki-light:#CA1243;--shiki-dark:#C678DD;">\${</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">info</span><span style="--shiki-light:#0184BC;--shiki-dark:#C678DD;"> ?</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> \`&lt;p class=&quot;custom-container-title&quot;&gt;</span><span style="--shiki-light:#CA1243;--shiki-dark:#C678DD;">\${</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">info</span><span style="--shiki-light:#CA1243;--shiki-dark:#C678DD;">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&lt;/p&gt;\`</span><span style="--shiki-light:#0184BC;--shiki-dark:#C678DD;"> :</span><span style="--shiki-light:#CA1243;--shiki-dark:#98C379;"> &#39;&#39;</span><span style="--shiki-light:#CA1243;--shiki-dark:#C678DD;">}</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">\\n</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">\`</span></span></code></pre></div><ul><li><p>详情：</p><p>一个用于渲染容器起始标签的函数。</p><p>第一个参数是 <a href="#%E5%AE%B9%E5%99%A8%E8%AF%AD%E6%B3%95">容器语法</a> 的 <code>info</code> 部分。</p><p>如果你没有设置 <a href="#after">after</a> 配置项，则该配置项也不会生效。</p></li></ul><h3 id="after" tabindex="-1"><a class="header-anchor" href="#after"><span>after</span></a></h3><ul><li><p>类型： <code>(info: string) =&gt; string</code></p></li><li><p>默认值：</p></li></ul><div class="language-ts" data-highlighter="shiki" data-ext="ts" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#0184BC;--shiki-dark:#E5C07B;"> string</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> =&gt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;&lt;/div&gt;</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">\\n</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;</span></span></code></pre></div><ul><li><p>详情：</p><p>一个用于渲染容器结束标签的函数。</p><p>第一个参数是 <a href="#%E5%AE%B9%E5%99%A8%E8%AF%AD%E6%B3%95">容器语法</a> 的 <code>info</code> 部分。</p><p>如果你没有设置 <a href="#before">before</a> 配置项，则该配置项也不会生效。</p></li></ul><h3 id="render" tabindex="-1"><a class="header-anchor" href="#render"><span>render</span></a></h3><ul><li>类型：</li></ul><div class="language-ts" data-highlighter="shiki" data-ext="ts" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">type</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> MarkdownItContainerRenderFunction</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">  tokens</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> Token</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[],</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">  index</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#0184BC;--shiki-dark:#E5C07B;"> number</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">  options</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#0184BC;--shiki-dark:#E5C07B;"> unknown</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">  env</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> MarkdownEnv</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">  self</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> Renderer</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=&gt;</span><span style="--shiki-light:#0184BC;--shiki-dark:#E5C07B;"> string</span></span></code></pre></div><ul><li><p>详情：</p><p><a href="https://github.com/markdown-it/markdown-it-container#api" target="_blank" rel="noopener noreferrer">markdown-it-container</a> 的 <code>render</code> 配置项。</p><p>该插件使用了一个默认的 <code>render</code> 函数。但如果你指定了该配置项，那么默认的 <code>render</code> 函数就会被替换掉，此时 <a href="#locales">locales</a> 、 <a href="#before">before</a> 和 <a href="#after">after</a> 配置项都会被忽略。</p></li></ul><h3 id="validate" tabindex="-1"><a class="header-anchor" href="#validate"><span>validate</span></a></h3><ul><li><p>类型： <code>(params: string) =&gt; boolean</code></p></li><li><p>详情：</p><p><a href="https://github.com/markdown-it/markdown-it-container#api" target="_blank" rel="noopener noreferrer">markdown-it-container</a> 的 <code>validate</code> 配置项。</p></li></ul><h3 id="marker" tabindex="-1"><a class="header-anchor" href="#marker"><span>marker</span></a></h3><ul><li><p>类型： <code>string</code></p></li><li><p>详情：</p><p><a href="https://github.com/markdown-it/markdown-it-container#api" target="_blank" rel="noopener noreferrer">markdown-it-container</a> 的 <code>marker</code> 配置项。</p></li></ul>`,30))])}const B=h(d,[["render",c]]),y=JSON.parse('{"path":"/zh/plugins/markdown/markdown-container.html","title":"markdown-container","lang":"zh-CN","frontmatter":{"icon":"package","description":"markdown-container","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"markdown-container\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-04-12T19:03:58.000Z\\",\\"author\\":[]}"],["meta",{"property":"og:url","content":"https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-container.html"}],["meta",{"property":"og:site_name","content":"VuePress 生态系统"}],["meta",{"property":"og:title","content":"markdown-container"}],["meta",{"property":"og:description","content":"markdown-container"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:locale:alternate","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2025-04-12T19:03:58.000Z"}],["meta",{"property":"article:modified_time","content":"2025-04-12T19:03:58.000Z"}],["link",{"rel":"alternate","hreflang":"en-us","href":"https://ecosystem.vuejs.press/plugins/markdown/markdown-container.html"}],["link",{"rel":"alternate","type":"application/atom+xml","href":"https://ecosystem.vuejs.press/zh/atom.xml","title":"VuePress 生态系统 Atom Feed"}],["link",{"rel":"alternate","type":"application/json","href":"https://ecosystem.vuejs.press/zh/feed.json","title":"VuePress 生态系统 JSON Feed"}],["link",{"rel":"alternate","type":"application/rss+xml","href":"https://ecosystem.vuejs.press/zh/rss.xml","title":"VuePress 生态系统 RSS Feed"}]]},"git":{"updatedTime":1744484638000,"contributors":[{"name":"Mister-Hope","username":"Mister-Hope","email":"mister-hope@outlook.com","commits":7,"avatar":"https://avatars.githubusercontent.com/Mister-Hope?v=4","url":"https://github.com/Mister-Hope"},{"name":"张怀文","username":"","email":"mister-hope@outlook.com","commits":1,"avatar":"https://gravatar.com/avatar/d92a8c6a31f27b708fae0e278bece19c6290f09e49e37bf3aa13da9a5252649f?d=retro"},{"name":"meteorlxy","username":"meteorlxy","email":"meteor.lxy@foxmail.com","commits":1,"avatar":"https://avatars.githubusercontent.com/meteorlxy?v=4","url":"https://github.com/meteorlxy"},{"name":"pengzhanbo","username":"pengzhanbo","email":"volodymyr@foxmail.com","commits":1,"avatar":"https://avatars.githubusercontent.com/pengzhanbo?v=4","url":"https://github.com/pengzhanbo"}],"changelog":[{"hash":"a13d5abfbb964e7b748cd3f06b28ee0f7d32f35c","time":1744484638000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"docs: improve code block title"},{"hash":"ae96c427eeb664c8d361963d1815a68386856bbe","time":1736532474000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"docs: add icons to docs (#332)"},{"hash":"29ccdccc89a7d97fe92ed219041acc4d9a246362","time":1724167427000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"chore: use eslint v9 (#237)","coAuthors":[{"name":"meteorlxy","email":"meteor.lxy@foxmail.com"},{"name":"pengzhanbo","email":"volodymyr@foxmail.com"}]},{"hash":"abd787c6f128028703d28a7bc8128bb1d4ab92f4","time":1716961207000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"chore: update repo structure (#159)"},{"hash":"c6b8cc5bd0685e6ab6cb4ccf0f08647e2de6655d","time":1715593918000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"docs(plugin-markdown-container): correct docs"},{"hash":"39017d308934303db86ae0b9555897c709db20e6","time":1715593433000,"email":"mister-hope@outlook.com","author":"张怀文","message":"feat!: rename plugin-container to plugin-markdown-container (#131)"},{"hash":"082a9532226d8a6c0672a919c3e2a94811c50d8c","time":1708493626000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"feat(plugin-links-check): add links check plugin"},{"hash":"ceb049cac6dae3a94736c39e6d49700017faa228","time":1706605723000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"docs: add ecosystem docs (close #36) (#38)"}]},"autoDesc":true,"filePathRelative":"zh/plugins/markdown/markdown-container.md"}');export{B as comp,y as data};
