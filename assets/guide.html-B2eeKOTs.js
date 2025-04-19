import{_ as p,c as d,d as o,a as i,e,b as t,w as n,r,o as h}from"./app-BsF2ugWo.js";const m={},k={id:"provider",tabindex:"-1"},c={class:"header-anchor",href:"#provider"};function u(g,s){const l=r("Badge"),a=r("RouteLink");return h(),d("div",null,[s[18]||(s[18]=o(`<h1 id="指南" tabindex="-1"><a class="header-anchor" href="#指南"><span>指南</span></a></h1><h2 id="设置选项" tabindex="-1"><a class="header-anchor" href="#设置选项"><span>设置选项</span></a></h2><p>你既可以在 Node.js 一侧使用插件选项设置选项，也可以通过<a href="https://vuejs.press/zh/guide/configuration.html#%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6" target="_blank" rel="noopener noreferrer">客户端配置文件</a>在浏览器一侧设置选项。</p><h3 id="通过插件选项" tabindex="-1"><a class="header-anchor" href="#通过插件选项"><span>通过插件选项</span></a></h3><div class="language-ts line-numbers-mode" data-highlighter="shiki" data-ext="ts" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">commentPlugin</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;@vuepress/plugin-comment&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// .vuepress/config.ts</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">export</span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD;"> default</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  plugins</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> [</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    commentPlugin</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">({</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">      provider</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;Artalk&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// Artalk | Giscus | Waline | Twikoo</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">      // 在这里放置其他选项</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">      // ...</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }),</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  ],</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="通过客户端配置文件" tabindex="-1"><a class="header-anchor" href="#通过客户端配置文件"><span>通过客户端配置文件</span></a></h3><div class="code-block-with-title"><div class="code-block-title-bar" data-title=".vuepress/client.ts"><span>.vuepress/client.ts</span></div><div class="language-ts line-numbers-mode" data-highlighter="shiki" data-ext="ts" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  defineArtalkConfig</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">  // defineGiscusConfig,</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">  // defineTwikooConfig,</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">  // defineWalineConfig,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">} </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;@vuepress/plugin-comment/client&#39;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">defineClientConfig</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;vuepress/client&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">defineArtalkConfig</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">({</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">  // 选项</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">})</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><p>有以下你需要注意的限制：</p>`,8)),i("ul",null,[i("li",null,[s[2]||(s[2]=i("p",null,[i("code",null,"provider"),e("、多语言设置和其他资源相关选项必须在插件选项中设置。")],-1)),s[3]||(s[3]=i("p",null,"为确保 tree-shaking 有效，我们必须在 Node 一侧优化入口，以便打包器可以了解最终打包中应包含哪些资源。",-1)),i("p",null,[s[0]||(s[0]=e("这些选项将在配置参考中用 ")),t(l,{text:"仅限插件选项",type:"warning",vertical:"baseline"}),s[1]||(s[1]=e(" 标记。"))])]),i("li",null,[s[6]||(s[6]=i("p",null,"不能序列化为 JSON 的选项必须在客户端配置中设置。",-1)),s[7]||(s[7]=i("p",null,"接收复杂值的选项（例如：函数）不能在插件选项中设置，因为插件运行在 Node.js 环境下，所以我们无法将这些值和它们的上下文传递给浏览器。",-1)),i("p",null,[s[4]||(s[4]=e("这些选项将在配置参考中用 ")),t(l,{text:"仅限客户端配置",type:"warning",vertical:"baseline"}),s[5]||(s[5]=e(" 标记。"))])])]),s[19]||(s[19]=o('<h2 id="添加评论" tabindex="-1"><a class="header-anchor" href="#添加评论"><span>添加评论</span></a></h2><p>该插件全局注册了一个组件 <code>&lt;CommentService /&gt;</code>。</p><ul><li>如果你是用户，你应该使用 <code>alias</code> 和布局槽来插入组件。 我们建议你在 <code>&lt;PageNav /&gt;</code> 组件之后插入评论组件 (<code>&lt;CommentService /&gt;</code>)，本页可作为一个 Demo 作为参考。</li><li>如果你是主题开发者，你应该将这个组件插入到你的主题布局中。</li></ul><p>默认情况下，<code>&lt;CommentService /&gt;</code> 组件是全局启用的，你可以在插件选项和页面 frontmatter 中使用 <code>comment</code> 选项来控制它。</p><ul><li>你可以通过在页面 frontmatter 中设置 <code>comment: false</code> 在本地禁用它。</li><li>要使其全局禁用，请在插件选项中将 <code>comment</code> 设置为 <code>false</code>。 然后你可以在页面 frontmatter 中设置 comment: true 以在局部启用它。</li></ul><p>你可以在页面 frontmatter 中设置 commentID 选项来自定义评论 ID，该 ID 用于标识要用于页面的评论存储项。默认情况下，它将是页面的 <code>path</code> ，这意味着如果你将站点部署到多个位置，站点间具有相同内容的页面将共享相同的评论数据。</p><h2 id="可用的评论服务" tabindex="-1"><a class="header-anchor" href="#可用的评论服务"><span>可用的评论服务</span></a></h2>',7)),i("p",null,[s[12]||(s[12]=e("目前你可以选择 ")),t(a,{to:"/zh/plugins/blog/comment/giscus/"},{default:n(()=>s[8]||(s[8]=[e("Giscus")])),_:1}),s[13]||(s[13]=e("、")),t(a,{to:"/zh/plugins/blog/comment/waline/"},{default:n(()=>s[9]||(s[9]=[e("Waline")])),_:1}),s[14]||(s[14]=e("、")),t(a,{to:"/zh/plugins/blog/comment/artalk/"},{default:n(()=>s[10]||(s[10]=[e("Artalk")])),_:1}),s[15]||(s[15]=e(" 和 ")),t(a,{to:"/zh/plugins/blog/comment/twikoo/"},{default:n(()=>s[11]||(s[11]=[e("Twikoo")])),_:1}),s[16]||(s[16]=e("。"))]),s[20]||(s[20]=i("div",{class:"hint-container tip"},[i("p",{class:"hint-container-title"},"推荐的评论服务"),i("ul",null,[i("li",null,"面向程序员和开发人员: Giscus"),i("li",null,"面向公众: Waline")])],-1)),s[21]||(s[21]=i("h2",{id:"通用选项",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#通用选项"},[i("span",null,"通用选项")])],-1)),i("h3",k,[i("a",c,[i("span",null,[s[17]||(s[17]=e("provider ")),t(l,{text:"仅限插件选项",type:"warning"})])])]),s[22]||(s[22]=o('<ul><li>类型: <code>&quot;Artalk&quot; | &quot;Giscus&quot; | &quot;Twikoo&quot; | &quot;Waline&quot; | &quot;None&quot;</code></li><li>默认值: <code>&quot;None&quot;</code></li><li>详情：评论服务提供者。</li></ul><h3 id="comment" tabindex="-1"><a class="header-anchor" href="#comment"><span>comment</span></a></h3><ul><li>类型: <code>boolean</code></li><li>默认值: <code>true</code></li><li>详情：是否默认启用评论功能。</li></ul>',3))])}const y=p(m,[["render",u]]),A=JSON.parse('{"path":"/zh/plugins/blog/comment/guide.html","title":"指南","lang":"zh-CN","frontmatter":{"icon":"lightbulb","layout":"CommentPage","description":"指南 设置选项 你既可以在 Node.js 一侧使用插件选项设置选项，也可以通过客户端配置文件在浏览器一侧设置选项。 通过插件选项 通过客户端配置文件 .vuepress/client.ts 有以下你需要注意的限制： provider、多语言设置和其他资源相关选项必须在插件选项中设置。 为确保 tree-shaking 有效，我们必须在 Node 一侧...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"指南\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-01-10T18:07:54.000Z\\",\\"author\\":[]}"],["meta",{"property":"og:url","content":"https://ecosystem.vuejs.press/ecosystem/zh/plugins/blog/comment/guide.html"}],["meta",{"property":"og:site_name","content":"VuePress 生态系统"}],["meta",{"property":"og:title","content":"指南"}],["meta",{"property":"og:description","content":"指南 设置选项 你既可以在 Node.js 一侧使用插件选项设置选项，也可以通过客户端配置文件在浏览器一侧设置选项。 通过插件选项 通过客户端配置文件 .vuepress/client.ts 有以下你需要注意的限制： provider、多语言设置和其他资源相关选项必须在插件选项中设置。 为确保 tree-shaking 有效，我们必须在 Node 一侧..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:locale:alternate","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2025-01-10T18:07:54.000Z"}],["meta",{"property":"article:modified_time","content":"2025-01-10T18:07:54.000Z"}],["link",{"rel":"alternate","hreflang":"en-us","href":"https://ecosystem.vuejs.press/ecosystem/plugins/blog/comment/guide.html"}],["link",{"rel":"alternate","type":"application/atom+xml","href":"https://ecosystem.vuejs.press/ecosystem/zh/atom.xml","title":"VuePress 生态系统 Atom Feed"}],["link",{"rel":"alternate","type":"application/json","href":"https://ecosystem.vuejs.press/ecosystem/zh/feed.json","title":"VuePress 生态系统 JSON Feed"}],["link",{"rel":"alternate","type":"application/rss+xml","href":"https://ecosystem.vuejs.press/ecosystem/zh/rss.xml","title":"VuePress 生态系统 RSS Feed"}]]},"git":{"updatedTime":1736532474000,"contributors":[{"name":"Mister-Hope","username":"Mister-Hope","email":"mister-hope@outlook.com","commits":6,"avatar":"https://avatars.githubusercontent.com/Mister-Hope?v=4","url":"https://github.com/Mister-Hope"},{"name":"meteorlxy","username":"meteorlxy","email":"meteor.lxy@foxmail.com","commits":1,"avatar":"https://avatars.githubusercontent.com/meteorlxy?v=4","url":"https://github.com/meteorlxy"},{"name":"pengzhanbo","username":"pengzhanbo","email":"volodymyr@foxmail.com","commits":1,"avatar":"https://avatars.githubusercontent.com/pengzhanbo?v=4","url":"https://github.com/pengzhanbo"}],"changelog":[{"hash":"ae96c427eeb664c8d361963d1815a68386856bbe","time":1736532474000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"docs: add icons to docs (#332)"},{"hash":"29ccdccc89a7d97fe92ed219041acc4d9a246362","time":1724167427000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"chore: use eslint v9 (#237)","coAuthors":[{"name":"meteorlxy","email":"meteor.lxy@foxmail.com"},{"name":"pengzhanbo","email":"volodymyr@foxmail.com"}]},{"hash":"abd787c6f128028703d28a7bc8128bb1d4ab92f4","time":1716961207000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"chore: update repo structure (#159)"},{"hash":"6a5b9161eb74eb44e40111257fdf11a616f5ee91","time":1716788335000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"feat: support vuepress2 rc12 (#156)"},{"hash":"d15d4aa61d8e574e5aeb72618db8f4efdc66860c","time":1713674142000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"fix: fix wrong plugin name"},{"hash":"5debe9d28cee2213933857b900455edb1b1e0643","time":1710145201000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"feat: add comment plugin (#87)"}]},"autoDesc":true,"filePathRelative":"zh/plugins/blog/comment/guide.md"}');export{y as comp,A as data};
