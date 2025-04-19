import{_ as h,c as p,a as s,b as e,d as r,e as a,w as o,r as t,o as k}from"./app-BsF2ugWo.js";const d={};function c(g,i){const n=t("NpmBadge"),l=t("RouteLink");return k(),p("div",null,[i[3]||(i[3]=s("h1",{id:"markdown-container",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#markdown-container"},[s("span",null,"markdown-container")])],-1)),e(n,{package:"@vuepress/plugin-markdown-container"}),i[4]||(i[4]=s("p",null,"Register markdown custom containers in your VuePress site.",-1)),i[5]||(i[5]=s("p",null,[a("This plugin simplifies the use of "),s("a",{href:"https://github.com/markdown-it/markdown-it-container",target:"_blank",rel:"noopener noreferrer"},"markdown-it-container"),a(", but also retains its original capabilities.")],-1)),s("p",null,[i[1]||(i[1]=a("The ")),e(l,{to:"/themes/default/markdown.html#custom-containers"},{default:o(()=>i[0]||(i[0]=[a("Custom Containers")])),_:1}),i[2]||(i[2]=a(" of default theme is powered by this plugin."))]),i[6]||(i[6]=r(`<h2 id="usage" tabindex="-1"><a class="header-anchor" href="#usage"><span>Usage</span></a></h2><div class="language-bash" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">npm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> i</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -D</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> @vuepress/plugin-markdown-container@next</span></span></code></pre></div><div class="code-block-with-title"><div class="code-block-title-bar" data-title=".vuepress/config.ts"><span>.vuepress/config.ts</span></div><div class="language-ts" data-highlighter="shiki" data-ext="ts" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">markdownContainerPlugin</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;@vuepress/plugin-markdown-container&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">export</span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD;"> default</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  plugins</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> [</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    markdownContainerPlugin</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">({</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">      // options</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }),</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  ],</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre></div></div><h2 id="container-syntax" tabindex="-1"><a class="header-anchor" href="#container-syntax"><span>Container Syntax</span></a></h2><div class="language-md" data-highlighter="shiki" data-ext="md" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">::: &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">type</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt; </span><span style="--shiki-light:#986801;--shiki-dark:#ABB2BF;">[</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">info</span><span style="--shiki-light:#986801;--shiki-dark:#ABB2BF;">]</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#ABB2BF;">[</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">content</span><span style="--shiki-light:#986801;--shiki-dark:#ABB2BF;">]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:::</span></span></code></pre></div><ul><li>The <code>type</code> is required and should be specified via <a href="#type">type</a> option.</li><li>The <code>info</code> is optional, and the default value can be specified via <code>defaultInfo</code> in <a href="#locales">locales</a> option.</li><li>The <code>content</code> can be any valid markdown content.</li></ul><div class="hint-container tip"><p class="hint-container-title">Tips</p><p>This plugin can be used multiple times to support different types of containers.</p></div><h2 id="options" tabindex="-1"><a class="header-anchor" href="#options"><span>Options</span></a></h2><h3 id="type" tabindex="-1"><a class="header-anchor" href="#type"><span>type</span></a></h3><ul><li><p>Type: <code>string</code></p></li><li><p>Details:</p><p>The type of the container.</p><p>It will be used as the <code>name</code> param of <a href="https://github.com/markdown-it/markdown-it-container#api" target="_blank" rel="noopener noreferrer">markdown-it-container</a>.</p></li></ul><h3 id="locales" tabindex="-1"><a class="header-anchor" href="#locales"><span>locales</span></a></h3><ul><li><p>Type: <code>Record&lt;string, { defaultInfo: string }&gt;</code></p></li><li><p>Details:</p><p>The default <code>info</code> of the container in different locales.</p><p>If this option is not specified, the default <code>info</code> will fallback to the uppercase of the <a href="#type">type</a> option.</p></li><li><p>Example:</p></li></ul><div class="code-block-with-title"><div class="code-block-title-bar" data-title=".vuepress/config.ts"><span>.vuepress/config.ts</span></div><div class="language-ts line-numbers-mode" data-highlighter="shiki" data-ext="ts" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">export</span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD;"> default</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
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
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><ul><li>Also see: <ul><li><a href="https://vuejs.press/guide/i18n.html" target="_blank" rel="noopener noreferrer">Guide &gt; I18n</a></li></ul></li></ul><h3 id="before" tabindex="-1"><a class="header-anchor" href="#before"><span>before</span></a></h3><ul><li><p>Type: <code>(info: string) =&gt; string</code></p></li><li><p>Default:</p></li></ul><div class="language-ts" data-highlighter="shiki" data-ext="ts" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">info</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#0184BC;--shiki-dark:#E5C07B;"> string</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#0184BC;--shiki-dark:#E5C07B;"> string</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> =&gt;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">  \`&lt;div class=&quot;custom-container </span><span style="--shiki-light:#CA1243;--shiki-dark:#C678DD;">\${</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">type</span><span style="--shiki-light:#CA1243;--shiki-dark:#C678DD;">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;&gt;</span><span style="--shiki-light:#CA1243;--shiki-dark:#C678DD;">\${</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">info</span><span style="--shiki-light:#0184BC;--shiki-dark:#C678DD;"> ?</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> \`&lt;p class=&quot;custom-container-title&quot;&gt;</span><span style="--shiki-light:#CA1243;--shiki-dark:#C678DD;">\${</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">info</span><span style="--shiki-light:#CA1243;--shiki-dark:#C678DD;">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&lt;/p&gt;\`</span><span style="--shiki-light:#0184BC;--shiki-dark:#C678DD;"> :</span><span style="--shiki-light:#CA1243;--shiki-dark:#98C379;"> &#39;&#39;</span><span style="--shiki-light:#CA1243;--shiki-dark:#C678DD;">}</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">\\n</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">\`</span></span></code></pre></div><ul><li><p>Details:</p><p>A function to render the starting tag of the container.</p><p>The first param is the <code>info</code> part of <a href="#container-syntax">container syntax</a>.</p><p>This option will not take effect if you don&#39;t specify the <a href="#after">after</a> option.</p></li></ul><h3 id="after" tabindex="-1"><a class="header-anchor" href="#after"><span>after</span></a></h3><ul><li><p>Type: <code>(info: string) =&gt; string</code></p></li><li><p>Default:</p></li></ul><div class="language-ts" data-highlighter="shiki" data-ext="ts" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#0184BC;--shiki-dark:#E5C07B;"> string</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> =&gt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;&lt;/div&gt;</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">\\n</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;</span></span></code></pre></div><ul><li><p>Details:</p><p>A function to render the ending tag of the container.</p><p>The first param is the <code>info</code> part of <a href="#container-syntax">container syntax</a>.</p><p>This option will not take effect if you don&#39;t specify the <a href="#before">before</a> option.</p></li></ul><h3 id="render" tabindex="-1"><a class="header-anchor" href="#render"><span>render</span></a></h3><ul><li>Type:</li></ul><div class="language-ts" data-highlighter="shiki" data-ext="ts" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">type</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> MarkdownItContainerRenderFunction</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">  tokens</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> Token</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[],</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">  index</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#0184BC;--shiki-dark:#E5C07B;"> number</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">  options</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#0184BC;--shiki-dark:#E5C07B;"> unknown</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">  env</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> MarkdownEnv</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">  self</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> Renderer</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=&gt;</span><span style="--shiki-light:#0184BC;--shiki-dark:#E5C07B;"> string</span></span></code></pre></div><ul><li><p>Details:</p><p>The <code>render</code> option of <a href="https://github.com/markdown-it/markdown-it-container#api" target="_blank" rel="noopener noreferrer">markdown-it-container</a>.</p><p>This plugin uses a default <code>render</code> function. If you specify this option, the default <code>render</code> function will be replaced, and the <a href="#locales">locales</a>, <a href="#before">before</a> and <a href="#after">after</a> options will be ignored.</p></li></ul><h3 id="validate" tabindex="-1"><a class="header-anchor" href="#validate"><span>validate</span></a></h3><ul><li><p>Type: <code>(params: string) =&gt; boolean</code></p></li><li><p>Details:</p><p>The <code>validate</code> option of <a href="https://github.com/markdown-it/markdown-it-container#api" target="_blank" rel="noopener noreferrer">markdown-it-container</a>.</p></li></ul><h3 id="marker" tabindex="-1"><a class="header-anchor" href="#marker"><span>marker</span></a></h3><ul><li><p>Type: <code>string</code></p></li><li><p>Details:</p><p>The <code>marker</code> option of <a href="https://github.com/markdown-it/markdown-it-container#api" target="_blank" rel="noopener noreferrer">markdown-it-container</a>.</p></li></ul>`,30))])}const y=h(d,[["render",c]]),B=JSON.parse('{"path":"/plugins/markdown/markdown-container.html","title":"markdown-container","lang":"en-US","frontmatter":{"icon":"package","description":"markdown-container","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"markdown-container\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-04-12T19:03:58.000Z\\",\\"author\\":[]}"],["meta",{"property":"og:url","content":"https://ecosystem.vuejs.press/ecosystem/plugins/markdown/markdown-container.html"}],["meta",{"property":"og:site_name","content":"VuePress Ecosystem"}],["meta",{"property":"og:title","content":"markdown-container"}],["meta",{"property":"og:description","content":"markdown-container"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:locale:alternate","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-04-12T19:03:58.000Z"}],["meta",{"property":"article:modified_time","content":"2025-04-12T19:03:58.000Z"}],["link",{"rel":"alternate","hreflang":"zh-cn","href":"https://ecosystem.vuejs.press/ecosystem/zh/plugins/markdown/markdown-container.html"}],["link",{"rel":"alternate","type":"application/atom+xml","href":"https://ecosystem.vuejs.press/ecosystem/atom.xml","title":"VuePress Ecosystem Atom Feed"}],["link",{"rel":"alternate","type":"application/json","href":"https://ecosystem.vuejs.press/ecosystem/feed.json","title":"VuePress Ecosystem JSON Feed"}],["link",{"rel":"alternate","type":"application/rss+xml","href":"https://ecosystem.vuejs.press/ecosystem/rss.xml","title":"VuePress Ecosystem RSS Feed"}]]},"git":{"updatedTime":1744484638000,"contributors":[{"name":"Mister-Hope","username":"Mister-Hope","email":"mister-hope@outlook.com","commits":7,"avatar":"https://avatars.githubusercontent.com/Mister-Hope?v=4","url":"https://github.com/Mister-Hope"},{"name":"张怀文","username":"","email":"mister-hope@outlook.com","commits":1,"avatar":"https://gravatar.com/avatar/d92a8c6a31f27b708fae0e278bece19c6290f09e49e37bf3aa13da9a5252649f?d=retro"},{"name":"meteorlxy","username":"meteorlxy","email":"meteor.lxy@foxmail.com","commits":1,"avatar":"https://avatars.githubusercontent.com/meteorlxy?v=4","url":"https://github.com/meteorlxy"},{"name":"pengzhanbo","username":"pengzhanbo","email":"volodymyr@foxmail.com","commits":1,"avatar":"https://avatars.githubusercontent.com/pengzhanbo?v=4","url":"https://github.com/pengzhanbo"}],"changelog":[{"hash":"a13d5abfbb964e7b748cd3f06b28ee0f7d32f35c","time":1744484638000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"docs: improve code block title"},{"hash":"ae96c427eeb664c8d361963d1815a68386856bbe","time":1736532474000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"docs: add icons to docs (#332)"},{"hash":"29ccdccc89a7d97fe92ed219041acc4d9a246362","time":1724167427000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"chore: use eslint v9 (#237)","coAuthors":[{"name":"meteorlxy","email":"meteor.lxy@foxmail.com"},{"name":"pengzhanbo","email":"volodymyr@foxmail.com"}]},{"hash":"abd787c6f128028703d28a7bc8128bb1d4ab92f4","time":1716961207000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"chore: update repo structure (#159)"},{"hash":"c6b8cc5bd0685e6ab6cb4ccf0f08647e2de6655d","time":1715593918000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"docs(plugin-markdown-container): correct docs"},{"hash":"39017d308934303db86ae0b9555897c709db20e6","time":1715593433000,"email":"mister-hope@outlook.com","author":"张怀文","message":"feat!: rename plugin-container to plugin-markdown-container (#131)"},{"hash":"082a9532226d8a6c0672a919c3e2a94811c50d8c","time":1708493626000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"feat(plugin-links-check): add links check plugin"},{"hash":"ceb049cac6dae3a94736c39e6d49700017faa228","time":1706605723000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"docs: add ecosystem docs (close #36) (#38)"}]},"autoDesc":true,"filePathRelative":"plugins/markdown/markdown-container.md"}');export{y as comp,B as data};
