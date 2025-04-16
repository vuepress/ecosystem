import{_ as p,c as d,d as i,a as e,e as s,b as a,w as n,r as l,o as r}from"./app-Hy3CkDjp.js";const k={};function c(g,t){const h=l("RouteLink"),o=l("ProjectLink");return r(),d("div",null,[t[9]||(t[9]=i(`<h1 id="指南" tabindex="-1"><a class="header-anchor" href="#指南"><span>指南</span></a></h1><p>本插件会通过向网站 <code>&lt;head&gt;</code> 注入标签，让你的网站完全支持 <a href="https://ogp.me/" target="_blank" rel="noopener noreferrer">开放内容协议 OGP</a> 和 <a href="https://www.w3.org/TR/json-ld-api/" target="_blank" rel="noopener noreferrer">JSON-LD 1.1</a>，以全面增强站点的搜索引擎优化性。</p><h2 id="开箱即用" tabindex="-1"><a class="header-anchor" href="#开箱即用"><span>开箱即用</span></a></h2><p>插件开箱即用，在不做任何配置的情况下，会尽可能通过页面内容，提取对应的信息补全 OGP 与 JSON-LD 所需的必要标签。</p><p>默认情况下，插件会读取站点配置、主题配置与页面的 frontmatter 来尽可能自动生成。诸如站点名称，页面标题，页面类型，写作日期，最后更新日期，文章标签均会自动生成。</p><h3 id="默认的-ogp-生成逻辑" tabindex="-1"><a class="header-anchor" href="#默认的-ogp-生成逻辑"><span>默认的 OGP 生成逻辑</span></a></h3><table><thead><tr><th style="text-align:center;">属性名称</th><th style="text-align:center;">值</th></tr></thead><tbody><tr><td style="text-align:center;"><code>og:url</code></td><td style="text-align:center;"><code>options.hostname</code> + <code>path</code></td></tr><tr><td style="text-align:center;"><code>og:site_name</code></td><td style="text-align:center;"><code>siteConfig.title</code></td></tr><tr><td style="text-align:center;"><code>og:title</code></td><td style="text-align:center;"><code>page.title</code></td></tr><tr><td style="text-align:center;"><code>og:description</code></td><td style="text-align:center;"><code>page.frontmatter.description</code> || 自动生成 (当插件选项中的 <code>autoDescription</code> 为 <code>true</code> 时)</td></tr><tr><td style="text-align:center;"><code>og:type</code></td><td style="text-align:center;"><code>&quot;article&quot;</code></td></tr><tr><td style="text-align:center;"><code>og:image</code></td><td style="text-align:center;"><code>page.frontmatter.banner</code> || <code>page.frontmatter.cover</code> || 页面的第一张图片|| 插件选项的 <code>fallbackImage</code></td></tr><tr><td style="text-align:center;"><code>og:updated_time</code></td><td style="text-align:center;"><code>page.git.updatedTime</code></td></tr><tr><td style="text-align:center;"><code>og:locale</code></td><td style="text-align:center;"><code>page.lang</code></td></tr><tr><td style="text-align:center;"><code>og:locale:alternate</code></td><td style="text-align:center;"><code>siteData.locales</code> 包含的其他语言</td></tr><tr><td style="text-align:center;"><code>twitter:card</code></td><td style="text-align:center;"><code>&quot;summary_large_image&quot;</code> (仅在找到图片时)</td></tr><tr><td style="text-align:center;"><code>twitter:image:alt</code></td><td style="text-align:center;"><code>page.title</code> (仅在找到图片时)</td></tr><tr><td style="text-align:center;"><code>article:author</code></td><td style="text-align:center;"><code>page.frontmatter.author</code> || <code>options.author</code></td></tr><tr><td style="text-align:center;"><code>article:tag</code></td><td style="text-align:center;"><code>page.frontmatter.tags</code> || <code>page.frontmatter.tag</code></td></tr><tr><td style="text-align:center;"><code>article:published_time</code></td><td style="text-align:center;"><code>page.frontmatter.date</code> || <code>page.git.createdTime</code></td></tr><tr><td style="text-align:center;"><code>article:modified_time</code></td><td style="text-align:center;"><code>page.git.updatedTime</code></td></tr></tbody></table><h3 id="默认的-json-ld-生成逻辑" tabindex="-1"><a class="header-anchor" href="#默认的-json-ld-生成逻辑"><span>默认的 JSON-LD 生成逻辑</span></a></h3><table><thead><tr><th style="text-align:center;">属性名</th><th style="text-align:center;">值</th></tr></thead><tbody><tr><td style="text-align:center;"><code>@context</code></td><td style="text-align:center;"><code>&quot;https://schema.org&quot;</code></td></tr><tr><td style="text-align:center;"><code>@type</code></td><td style="text-align:center;"><code>&quot;NewsArticle&quot;</code></td></tr><tr><td style="text-align:center;"><code>headline</code></td><td style="text-align:center;"><code>page.title</code></td></tr><tr><td style="text-align:center;"><code>image</code></td><td style="text-align:center;">页面中的图片|| <code>options.hostname</code> + <code>page.frontmatter.image</code></td></tr><tr><td style="text-align:center;"><code>datePublished</code></td><td style="text-align:center;"><code>page.frontmatter.date</code> || <code>page.git.createdTime</code></td></tr><tr><td style="text-align:center;"><code>dateModified</code></td><td style="text-align:center;"><code>page.git.updatedTime</code></td></tr><tr><td style="text-align:center;"><code>author</code></td><td style="text-align:center;"><code>page.frontmatter.author</code> || <code>options.author</code></td></tr></tbody></table><h2 id="直接添加-head-标签" tabindex="-1"><a class="header-anchor" href="#直接添加-head-标签"><span>直接添加 head 标签</span></a></h2><p>你可以在页面的 frontmatter 中配置 <code>head</code> 选项，自主添加特定标签到页面 <code>&lt;head&gt;</code> 以增强 SEO。</p><p>如:</p><div class="language-md" data-highlighter="shiki" data-ext="md" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">---</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">head</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  - - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">meta</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    - </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">keywords</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">      content</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">SEO plugin</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">---</span></span></code></pre></div><p>会自动注入 <code>&lt;meta name=&quot;keywords&quot; content=&quot;SEO plugin&quot; /&gt;</code>。</p><h2 id="自定义生成过程" tabindex="-1"><a class="header-anchor" href="#自定义生成过程"><span>自定义生成过程</span></a></h2><p>本插件也支持你完全控制生成逻辑。</p><h3 id="页面类型" tabindex="-1"><a class="header-anchor" href="#页面类型"><span>页面类型</span></a></h3><p>对于大多数页面，基本只有文章和网页两种类型，所以插件提供了 <code>isArticle</code> 选项让你提供辨别文章的逻辑。</p><p>选项接受一个 <code>(page: Page) =&gt; boolean</code> 格式的函数，默认情况下从 Markdown 文件生成的非主页页面都会被视为文章。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>如果某个网页的确符合图书、音乐之类的“冷门”类型，你可以通过设置下方三个选项处理它们。</p></div><h3 id="ogp" tabindex="-1"><a class="header-anchor" href="#ogp"><span>OGP</span></a></h3><p>你可以使用插件选项的 <code>ogp</code> 传入一个函数来按照你的需要修改默认 OGP 对象并返回。</p><div class="language-ts" data-highlighter="shiki" data-ext="ts" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">function</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> ogp</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">  /** 插件推断的 OGP 信息 */</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">  ogpInfo</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> SeoContent</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">  /** 页面对象 */</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">  page</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> Page</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">  /** VuePress App */</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">  app</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> App</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> SeoContent</span></span></code></pre></div>`,23)),e("p",null,[t[1]||(t[1]=s("详细的参数结构详见 ")),a(h,{to:"/zh/plugins/seo/seo/config.html"},{default:n(()=>t[0]||(t[0]=[s("配置")])),_:1}),t[2]||(t[2]=s("。"))]),t[10]||(t[10]=i(`<p>比如你在使用某个第三方主题，并按照主题要求为每篇文章在 Front Matter 中设置了 <code>banner</code>，那你可以传入这样的 <code>ogp</code>:</p><div class="language-ts" data-highlighter="shiki" data-ext="ts" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">seoPlugin</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">({</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">  ogp</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">ogp</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">page</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=&gt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> ({</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">    ...</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">ogp</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    &#39;og:image&#39;</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> page</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">frontmatter</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">banner</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> ||</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> ogp</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;og:image&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">],</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  }),</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">})</span></span></code></pre></div><h3 id="json-ld" tabindex="-1"><a class="header-anchor" href="#json-ld"><span>JSON-LD</span></a></h3><p>同 OGP，你可以使用插件选项的 <code>jsonLd</code> 传入一个函数来按照你的需要修改默认 JSON-LD 对象并返回。</p><div class="language-ts" data-highlighter="shiki" data-ext="ts" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">function</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> jsonLd</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">  /** 由插件推断出的 JSON-LD 对象 */</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">  jsonLD</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> ArticleSchema</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;"> |</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> BlogPostingSchema</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;"> |</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> WebPageSchema</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">  /** 页面对象 */</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">  page</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> Page</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">  /** VuePress App */</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">  app</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> App</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> ArticleSchema</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;"> |</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> BlogPostingSchema</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;"> |</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> WebPageSchema</span></span></code></pre></div><h2 id="规范链接" tabindex="-1"><a class="header-anchor" href="#规范链接"><span>规范链接</span></a></h2><p>如果你将内容部署到不同的站点，或不同 URL 下的相同内容，你可能需要设置 <code>canonical</code> 选项为你的页面提供 “规范链接”。 你可以设置一个字符串，这样它会附加在页面路由链接之前，或者添加一个自定义函数 <code>(page: Page) =&gt; string | null</code> 返回规范链接。</p><div class="hint-container tip"><p class="hint-container-title">例子</p><p>如果你的站点部署在 <code>example.com</code> 的 docs 文件夹下，但同时在下列网址中可用:</p><ul><li><code>http://example.com/docs/xxx</code></li><li><code>https://example.com/docs/xxx</code></li><li><code>http://www.example.com/docs/xxx</code></li><li><code>https://www.example.com/docs/xxx</code> (首选)</li></ul><p>要让搜索引擎结果始终是首选，你可能需要将 <code>canonical</code> 设置为 <code>https://www.example.com/docs/</code>，以便搜索引擎知道首选第四个 URL 作为索引结果。</p></div><h3 id="自定义-head-标签" tabindex="-1"><a class="header-anchor" href="#自定义-head-标签"><span>自定义 head 标签</span></a></h3><p>有些时候你可能需要符合其他协议或按照其他搜索引擎提供的格式提供对应的 SEO 标签，此时你可以使用 <code>customHead</code> 选项，其类型为:</p><div class="language-ts" data-highlighter="shiki" data-ext="ts" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">function</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> customHead</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">  /** head 标签配置 */</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">  head</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> HeadConfig</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[],</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">  /** 页面对象 */</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">  page</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> Page</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">  /** VuePress App */</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">  app</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> App</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#0184BC;--shiki-dark:#E5C07B;"> void</span></span></code></pre></div><p>你应该直接修改传入的 <code>head</code> 参数。</p><h2 id="seo-介绍" tabindex="-1"><a class="header-anchor" href="#seo-介绍"><span>SEO 介绍</span></a></h2><p>搜索引擎优化 (<strong>S</strong>earch <strong>E</strong>ngine <strong>O</strong>ptimization)，是一种透过了解搜索引擎的运作规则来调整网站，以及提高目的网站在有关搜索引擎内排名的方式。由于不少研究发现，搜索引擎的用户往往只会留意搜索结果最前面的几个条目，所以不少网站都希望透过各种形式来影响搜索引擎的排序，让自己的网站可以有优秀的搜索排名。 所谓“针对搜索引擎作最优化的处理”，是指为了要让网站更容易被搜索引擎接受。搜索引擎会将网站彼此间的内容做一些相关性的资料比对，然后再由浏览器将这些内容以最快速且接近最完整的方式，呈现给搜索者。搜索引擎优化就是通过搜索引擎的规则进行优化，为用户打造更好的用户体验，最终的目的就是做好用户体验。</p><h2 id="相关文档" tabindex="-1"><a class="header-anchor" href="#相关文档"><span>相关文档</span></a></h2>`,15)),e("ul",null,[t[7]||(t[7]=i('<li><p><a href="https://ogp.me/" target="_blank" rel="noopener noreferrer">开放内容协议 OGP</a> (<strong>O</strong>pen <strong>G</strong>raph <strong>Pr</strong>otocal)</p><p>本插件完美支持该协议，会自动生成符合该协议的 <code>&lt;meta&gt;</code> 标签。</p></li><li><p><a href="https://www.w3.org/TR/json-ld-api/" target="_blank" rel="noopener noreferrer">JSON-LD 1.1</a></p><p>本插件会为文章类页面生成 NewsArticle 类标签。</p></li>',2)),e("li",null,[t[6]||(t[6]=e("p",null,[e("a",{href:"https://www.w3.org/TR/rdfa-primer/",target:"_blank",rel:"noopener noreferrer"},"RDFa 1.1")],-1)),e("p",null,[t[4]||(t[4]=s("RDFa 主要标记 HTML 结构。这是插件无法支持的内容，")),a(o,{type:"theme",name:"hope",path:"/zh/"},{default:n(()=>t[3]||(t[3]=[s("vuepress-theme-hope")])),_:1}),t[5]||(t[5]=s(" 使用了这一功能通过了谷歌的富媒体结构测试。你可以考虑搭配使用。"))])]),t[8]||(t[8]=e("li",null,[e("p",null,[e("a",{href:"https://schema.org/",target:"_blank",rel:"noopener noreferrer"},"Schema.Org")]),e("p",null,"结构标记的 Schema 定义站点")],-1))]),t[11]||(t[11]=e("h2",{id:"相关工具",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#相关工具"},[e("span",null,"相关工具")])],-1)),t[12]||(t[12]=e("p",null,[s("你可以使用 "),e("a",{href:"https://search.google.com/test/rich-results",target:"_blank",rel:"noopener noreferrer"},"Google 富媒体结构测试工具"),s(" 测试本站点。")],-1))])}const m=p(k,[["render",c]]),B=JSON.parse('{"path":"/zh/plugins/seo/seo/guide.html","title":"指南","lang":"zh-CN","frontmatter":{"icon":"lightbulb","description":"指南 本插件会通过向网站 <head> 注入标签，让你的网站完全支持 开放内容协议 OGP 和 JSON-LD 1.1，以全面增强站点的搜索引擎优化性。 开箱即用 插件开箱即用，在不做任何配置的情况下，会尽可能通过页面内容，提取对应的信息补全 OGP 与 JSON-LD 所需的必要标签。 默认情况下，插件会读取站点配置、主题配置与页面的 frontma...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"指南\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-01-10T18:07:54.000Z\\",\\"author\\":[]}"],["meta",{"property":"og:url","content":"https://ecosystem.vuejs.press/zh/plugins/seo/seo/guide.html"}],["meta",{"property":"og:site_name","content":"VuePress 生态系统"}],["meta",{"property":"og:title","content":"指南"}],["meta",{"property":"og:description","content":"指南 本插件会通过向网站 <head> 注入标签，让你的网站完全支持 开放内容协议 OGP 和 JSON-LD 1.1，以全面增强站点的搜索引擎优化性。 开箱即用 插件开箱即用，在不做任何配置的情况下，会尽可能通过页面内容，提取对应的信息补全 OGP 与 JSON-LD 所需的必要标签。 默认情况下，插件会读取站点配置、主题配置与页面的 frontma..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:locale:alternate","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2025-01-10T18:07:54.000Z"}],["meta",{"property":"article:modified_time","content":"2025-01-10T18:07:54.000Z"}],["link",{"rel":"alternate","hreflang":"en-us","href":"https://ecosystem.vuejs.press/plugins/seo/seo/guide.html"}],["link",{"rel":"alternate","type":"application/atom+xml","href":"https://ecosystem.vuejs.press/zh/atom.xml","title":"VuePress 生态系统 Atom Feed"}],["link",{"rel":"alternate","type":"application/json","href":"https://ecosystem.vuejs.press/zh/feed.json","title":"VuePress 生态系统 JSON Feed"}],["link",{"rel":"alternate","type":"application/rss+xml","href":"https://ecosystem.vuejs.press/zh/rss.xml","title":"VuePress 生态系统 RSS Feed"}]]},"git":{"updatedTime":1736532474000,"contributors":[{"name":"Mister-Hope","username":"Mister-Hope","email":"mister-hope@outlook.com","commits":7,"avatar":"https://avatars.githubusercontent.com/Mister-Hope?v=4","url":"https://github.com/Mister-Hope"},{"name":"meteorlxy","username":"meteorlxy","email":"meteor.lxy@foxmail.com","commits":1,"avatar":"https://avatars.githubusercontent.com/meteorlxy?v=4","url":"https://github.com/meteorlxy"},{"name":"pengzhanbo","username":"pengzhanbo","email":"volodymyr@foxmail.com","commits":1,"avatar":"https://avatars.githubusercontent.com/pengzhanbo?v=4","url":"https://github.com/pengzhanbo"}],"changelog":[{"hash":"ae96c427eeb664c8d361963d1815a68386856bbe","time":1736532474000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"docs: add icons to docs (#332)"},{"hash":"29ccdccc89a7d97fe92ed219041acc4d9a246362","time":1724167427000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"chore: use eslint v9 (#237)","coAuthors":[{"name":"meteorlxy","email":"meteor.lxy@foxmail.com"},{"name":"pengzhanbo","email":"volodymyr@foxmail.com"}]},{"hash":"abd787c6f128028703d28a7bc8128bb1d4ab92f4","time":1716961207000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"chore: update repo structure (#159)"},{"hash":"ae1bcdbed604b592f37e635cc92a1d375e75b312","time":1710082287000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"docs(plugin-seo): improve docs"},{"hash":"f8d1202b3b2d73d02a4e161b40aac9fa123b4887","time":1706762763000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"style: update linter (#48)"},{"hash":"4f4af33cae4d7f0a7cbc631197b5900c45d0c3ef","time":1706682874000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"docs: fix docs"},{"hash":"8a999c58c20006b3a36de52a8502d03344af099d","time":1706676659000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"feat(plugin-seo): add seo plugin (#42)"}]},"autoDesc":true,"filePathRelative":"zh/plugins/seo/seo/guide.md"}');export{m as comp,B as data};
