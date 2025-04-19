import{_ as i,c as s,d as a,o as n}from"./app-BsF2ugWo.js";const t={};function l(h,e){return n(),s("div",null,e[0]||(e[0]=[a(`<h1 id="频道设置" tabindex="-1"><a class="header-anchor" href="#频道设置"><span>频道设置</span></a></h1><p><code>channel</code> 插件选项用于配置 feed 的频道。</p><h2 id="channel-title" tabindex="-1"><a class="header-anchor" href="#channel-title"><span>channel.title</span></a></h2><ul><li>类型：<code>string</code></li><li>默认值：<code>SiteConfig.title</code></li></ul><p>频道的标题</p><h2 id="channel-link" tabindex="-1"><a class="header-anchor" href="#channel-link"><span>channel.link</span></a></h2><ul><li>类型：<code>string</code></li><li>默认值：部署的网址 (通过 <code>options.hostname</code> 和 <code>context.base</code> 生成)</li></ul><p>频道地址</p><h2 id="channel-description" tabindex="-1"><a class="header-anchor" href="#channel-description"><span>channel.description</span></a></h2><ul><li>类型：<code>string</code></li><li>默认值：<code>SiteConfig.description</code></li></ul><p>频道描述信息</p><h2 id="channel-language" tabindex="-1"><a class="header-anchor" href="#channel-language"><span>channel.language</span></a></h2><ul><li>类型：<code>string</code></li><li>默认值: <ul><li><code>siteConfig.locales[&#39;/&#39;].locales</code></li><li>如果上述未提供，回退到 <code>&quot;en-US&quot;</code></li></ul></li></ul><p>频道使用的语言</p><h2 id="channel-copyright" tabindex="-1"><a class="header-anchor" href="#channel-copyright"><span>channel.copyright</span></a></h2><ul><li>类型：<code>string</code></li><li>默认值: <ul><li>尝试读取 channel 选项中的 <code>author.name</code> 生成 <code>Copyright by $author</code></li></ul></li><li>建议自行设置: <strong>是</strong></li></ul><p>频道版权信息</p><h2 id="channel-pubdate" tabindex="-1"><a class="header-anchor" href="#channel-pubdate"><span>channel.pubDate</span></a></h2><ul><li>类型：<code>string</code> (需是合法的 Date ISOString)</li><li>默认值：每次插件构建时刻</li><li>建议自行设置: <strong>是</strong></li></ul><p>频道内容的发布时间</p><h2 id="channel-lastupdated" tabindex="-1"><a class="header-anchor" href="#channel-lastupdated"><span>channel.lastUpdated</span></a></h2><ul><li>类型：<code>string</code> (需是合法的 Date ISOString)</li><li>默认值：每次插件构建时刻</li></ul><p>频道内容的上次更新时间</p><h2 id="channel-ttl" tabindex="-1"><a class="header-anchor" href="#channel-ttl"><span>channel.ttl</span></a></h2><ul><li>类型：<code>number</code></li><li>建议自行设置: <strong>是</strong></li></ul><p>内容有效时间，即获取后保持缓存而不进行新获取的时间</p><h2 id="channel-image" tabindex="-1"><a class="header-anchor" href="#channel-image"><span>channel.image</span></a></h2><ul><li>类型：<code>string</code></li><li>建议自行设置: <strong>是</strong></li></ul><p>这是一个会在频道中使用的图片，建议设置正方形图片、尺寸最好不小于 512×512。</p><h2 id="channel-icon" tabindex="-1"><a class="header-anchor" href="#channel-icon"><span>channel.icon</span></a></h2><ul><li>类型：<code>string</code></li><li>建议自行设置: <strong>是</strong></li></ul><p>一个代表频道的图标，建议设置正方形图片、尺寸最好不小于 128×128，背景色透明。</p><h2 id="channel-author" tabindex="-1"><a class="header-anchor" href="#channel-author"><span>channel.author</span></a></h2><ul><li>类型：<code>FeedAuthor</code></li><li>建议自行设置: <strong>是</strong></li></ul><p>频道的作者。</p><details class="hint-container details"><summary>FeedAuthor 格式</summary><div class="language-ts line-numbers-mode" data-highlighter="shiki" data-ext="ts" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">interface</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> FeedAuthor</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">  /** 作者姓名 */</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">  name</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#0184BC;--shiki-dark:#E5C07B;"> string</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">  /** 作者电子邮箱 */</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">  email</span><span style="--shiki-light:#0184BC;--shiki-dark:#C678DD;">?</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#0184BC;--shiki-dark:#E5C07B;"> string</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">  /** 作者网站 */</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">  url</span><span style="--shiki-light:#0184BC;--shiki-dark:#C678DD;">?</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#0184BC;--shiki-dark:#E5C07B;"> string</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">  /**</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">   * 作者头像地址</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">   *</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">   * 正方形，最好不小于 128×128，透明背景</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">   */</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">  avatar</span><span style="--shiki-light:#0184BC;--shiki-dark:#C678DD;">?</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#0184BC;--shiki-dark:#E5C07B;"> string</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="channel-hub" tabindex="-1"><a class="header-anchor" href="#channel-hub"><span>channel.hub</span></a></h2><ul><li>类型：<code>string</code></li></ul><p>Websub 的链接。Websub 需要服务器后端，与 VuePress 主旨不符，如无特殊需要忽略即可。</p><div class="hint-container tip"><p class="hint-container-title">WebSub</p><p>有关信息，详见 <a href="https://w3c.github.io/websub/#subscription-migration" target="_blank" rel="noopener noreferrer">Websub</a>。</p></div>`,40)]))}const o=i(t,[["render",l]]),c=JSON.parse('{"path":"/zh/plugins/blog/feed/channel.html","title":"频道设置","lang":"zh-CN","frontmatter":{"icon":"tv","description":"频道设置 channel 插件选项用于配置 feed 的频道。 channel.title 类型：string 默认值：SiteConfig.title 频道的标题 channel.link 类型：string 默认值：部署的网址 (通过 options.hostname 和 context.base 生成) 频道地址 channel.descript...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"频道设置\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-01-10T18:07:54.000Z\\",\\"author\\":[]}"],["meta",{"property":"og:url","content":"https://ecosystem.vuejs.press/ecosystem/zh/plugins/blog/feed/channel.html"}],["meta",{"property":"og:site_name","content":"VuePress 生态系统"}],["meta",{"property":"og:title","content":"频道设置"}],["meta",{"property":"og:description","content":"频道设置 channel 插件选项用于配置 feed 的频道。 channel.title 类型：string 默认值：SiteConfig.title 频道的标题 channel.link 类型：string 默认值：部署的网址 (通过 options.hostname 和 context.base 生成) 频道地址 channel.descript..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:locale:alternate","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2025-01-10T18:07:54.000Z"}],["meta",{"property":"article:modified_time","content":"2025-01-10T18:07:54.000Z"}],["link",{"rel":"alternate","hreflang":"en-us","href":"https://ecosystem.vuejs.press/ecosystem/plugins/blog/feed/channel.html"}],["link",{"rel":"alternate","type":"application/atom+xml","href":"https://ecosystem.vuejs.press/ecosystem/zh/atom.xml","title":"VuePress 生态系统 Atom Feed"}],["link",{"rel":"alternate","type":"application/json","href":"https://ecosystem.vuejs.press/ecosystem/zh/feed.json","title":"VuePress 生态系统 JSON Feed"}],["link",{"rel":"alternate","type":"application/rss+xml","href":"https://ecosystem.vuejs.press/ecosystem/zh/rss.xml","title":"VuePress 生态系统 RSS Feed"}]]},"git":{"updatedTime":1736532474000,"contributors":[{"name":"Mister-Hope","username":"Mister-Hope","email":"mister-hope@outlook.com","commits":5,"avatar":"https://avatars.githubusercontent.com/Mister-Hope?v=4","url":"https://github.com/Mister-Hope"}],"changelog":[{"hash":"ae96c427eeb664c8d361963d1815a68386856bbe","time":1736532474000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"docs: add icons to docs (#332)"},{"hash":"abd787c6f128028703d28a7bc8128bb1d4ab92f4","time":1716961207000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"chore: update repo structure (#159)"},{"hash":"4a50404feae553e0f212c11b7a8373dc5773d0dc","time":1706801200000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"feat(plugin-rtl): add rtl plugin (#49)"},{"hash":"f8d1202b3b2d73d02a4e161b40aac9fa123b4887","time":1706762763000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"style: update linter (#48)"},{"hash":"b0b2aa49b4904fb903ec8b312a2e48f6b9affc17","time":1706674769000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"feat(plugin-feed): add feed plugin (#41)"}]},"autoDesc":true,"filePathRelative":"zh/plugins/blog/feed/channel.md"}');export{o as comp,c as data};
