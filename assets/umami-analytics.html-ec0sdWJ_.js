import{_ as i,c as t,a,b as n,d as l,r as o,o as r}from"./app-BsF2ugWo.js";const p={};function c(h,e){const s=o("NpmBadge");return r(),t("div",null,[e[0]||(e[0]=a("h1",{id:"umami-analytics",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#umami-analytics"},[a("span",null,"umami-analytics")])],-1)),n(s,{package:"@vuepress/plugin-umami-analytics"}),e[1]||(e[1]=l(`<p>Integrate <a href="https://umami.is/" target="_blank" rel="noopener noreferrer">Umami Analytics</a> into VuePress.</p><h2 id="usage" tabindex="-1"><a class="header-anchor" href="#usage"><span>Usage</span></a></h2><div class="language-bash" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">npm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> i</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -D</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> @vuepress/plugin-umami-analytics@next</span></span></code></pre></div><div class="code-block-with-title"><div class="code-block-title-bar" data-title=".vuepress/config.ts"><span>.vuepress/config.ts</span></div><div class="language-ts" data-highlighter="shiki" data-ext="ts" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">umamiAnalyticsPlugin</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;@vuepress/plugin-umami-analytics&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">export</span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD;"> default</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  plugins</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> [</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    umamiAnalyticsPlugin</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">({</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">      // options</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }),</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  ],</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre></div></div><p>You can use <a href="https://cloud.umami.is/login" target="_blank" rel="noopener noreferrer">Umami Cloud</a> or <a href="https://umami.is/docs/install" target="_blank" rel="noopener noreferrer">Self-host Umami</a>.</p><h3 id="reporting-events" tabindex="-1"><a class="header-anchor" href="#reporting-events"><span>Reporting Events</span></a></h3><p>The plugin will automatically report page view events when visiting and switching pages.</p><p>Besides, a global <code>umami</code> object is available on the <code>window</code> object, and you can call <code>umami.track</code> for <a href="https://umami.is/docs/tracker-functions" target="_blank" rel="noopener noreferrer">custom tracker function</a>.</p><h2 id="options" tabindex="-1"><a class="header-anchor" href="#options"><span>Options</span></a></h2><h3 id="id" tabindex="-1"><a class="header-anchor" href="#id"><span>id</span></a></h3><ul><li>Type: <code>string</code></li><li>Details: The website ID in Umami Analytics</li></ul><h3 id="link" tabindex="-1"><a class="header-anchor" href="#link"><span>link</span></a></h3><ul><li>Type: <code>string</code></li><li>Details: Link of umami analytics script</li></ul><h3 id="autotrack" tabindex="-1"><a class="header-anchor" href="#autotrack"><span>autoTrack</span></a></h3><ul><li><p>Type: <code>boolean</code></p></li><li><p>Default: <code>true</code></p></li><li><p>Details:</p><p>By default, Umami tracks all pageviews and events for you automatically. You can disable this behavior and track events yourself using the tracker functions.</p></li></ul><h3 id="cache" tabindex="-1"><a class="header-anchor" href="#cache"><span>cache</span></a></h3><ul><li><p>Type: <code>boolean</code></p></li><li><p>Details:</p><p>Cache data to improve the performance of the tracking script.</p><p>Note: This will use session storage so you may need to inform your users.</p></li></ul><h3 id="domains" tabindex="-1"><a class="header-anchor" href="#domains"><span>domains</span></a></h3><ul><li>Type: <code>string[]</code></li><li>Details: Let the tracker only run on specific domains.</li></ul><h3 id="hosturl" tabindex="-1"><a class="header-anchor" href="#hosturl"><span>hostUrl</span></a></h3><ul><li>Type: <code>string</code></li><li>Details: Location to send data</li></ul>`,21))])}const m=i(p,[["render",c]]),u=JSON.parse('{"path":"/plugins/analytics/umami-analytics.html","title":"umami-analytics","lang":"en-US","frontmatter":{"icon":"chart-no-axes-combined","description":"umami-analytics","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"umami-analytics\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-04-12T19:03:58.000Z\\",\\"author\\":[]}"],["meta",{"property":"og:url","content":"https://ecosystem.vuejs.press/ecosystem/plugins/analytics/umami-analytics.html"}],["meta",{"property":"og:site_name","content":"VuePress Ecosystem"}],["meta",{"property":"og:title","content":"umami-analytics"}],["meta",{"property":"og:description","content":"umami-analytics"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:locale:alternate","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-04-12T19:03:58.000Z"}],["meta",{"property":"article:modified_time","content":"2025-04-12T19:03:58.000Z"}],["link",{"rel":"alternate","hreflang":"zh-cn","href":"https://ecosystem.vuejs.press/ecosystem/zh/plugins/analytics/umami-analytics.html"}],["link",{"rel":"alternate","type":"application/atom+xml","href":"https://ecosystem.vuejs.press/ecosystem/atom.xml","title":"VuePress Ecosystem Atom Feed"}],["link",{"rel":"alternate","type":"application/json","href":"https://ecosystem.vuejs.press/ecosystem/feed.json","title":"VuePress Ecosystem JSON Feed"}],["link",{"rel":"alternate","type":"application/rss+xml","href":"https://ecosystem.vuejs.press/ecosystem/rss.xml","title":"VuePress Ecosystem RSS Feed"}]]},"git":{"updatedTime":1744484638000,"contributors":[{"name":"Mister-Hope","username":"Mister-Hope","email":"mister-hope@outlook.com","commits":4,"avatar":"https://avatars.githubusercontent.com/Mister-Hope?v=4","url":"https://github.com/Mister-Hope"}],"changelog":[{"hash":"a13d5abfbb964e7b748cd3f06b28ee0f7d32f35c","time":1744484638000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"docs: improve code block title"},{"hash":"ae96c427eeb664c8d361963d1815a68386856bbe","time":1736532474000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"docs: add icons to docs (#332)"},{"hash":"abd787c6f128028703d28a7bc8128bb1d4ab92f4","time":1716961207000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"chore: update repo structure (#159)"},{"hash":"0e68dc5f9c3fa7c3f55e9214663f7a932ff24c4d","time":1715010663000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"feat: init umami analytics plugin (#116)"}]},"autoDesc":true,"filePathRelative":"plugins/analytics/umami-analytics.md"}');export{m as comp,u as data};
