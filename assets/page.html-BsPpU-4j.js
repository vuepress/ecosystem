import{_ as s,o as n,c as e,d as a}from"./app-DUADLqHd.js";const l={},p=a(`<h1 id="page-related" tabindex="-1"><a class="header-anchor" href="#page-related"><span>Page Related</span></a></h1><p>These functions generate common information for your pages.</p><h2 id="getpageexcerpt" tabindex="-1"><a class="header-anchor" href="#getpageexcerpt"><span>getPageExcerpt</span></a></h2><p>Get the excerpt of the page.</p><div class="language-ts line-numbers-mode" data-highlighter="shiki" data-ext="ts" data-title="ts" style="background-color:#1E1E1E;color:#D4D4D4;"><pre class="shiki dark-plus vp-code"><code><span class="line"><span style="color:#C586C0;">export</span><span style="color:#569CD6;"> interface</span><span style="color:#4EC9B0;"> PageExcerptOptions</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#6A9955;">  /**</span></span>
<span class="line"><span style="color:#6A9955;">   * Excerpt separator</span></span>
<span class="line"><span style="color:#6A9955;">   *</span></span>
<span class="line"><span style="color:#6A9955;">   * </span><span style="color:#569CD6;">@default</span><span style="color:#9CDCFE;"> &quot;</span><span style="color:#9CDCFE;">&lt;!-- more --&gt;</span><span style="color:#9CDCFE;">&quot;</span></span>
<span class="line"><span style="color:#6A9955;">   */</span></span>
<span class="line"><span style="color:#9CDCFE;">  separator</span><span style="color:#D4D4D4;">?: </span><span style="color:#4EC9B0;">string</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955;">  /**</span></span>
<span class="line"><span style="color:#6A9955;">   * Length of excerpt</span></span>
<span class="line"><span style="color:#6A9955;">   *</span></span>
<span class="line"><span style="color:#6A9955;">   * </span><span style="color:#569CD6;">@description</span><span style="color:#6A9955;"> Excerpt length will be the minimal possible length reaching this value</span></span>
<span class="line"><span style="color:#6A9955;">   *</span></span>
<span class="line"><span style="color:#6A9955;">   * </span><span style="color:#569CD6;">@default</span><span style="color:#9CDCFE;"> 300</span></span>
<span class="line"><span style="color:#6A9955;">   */</span></span>
<span class="line"><span style="color:#9CDCFE;">  length</span><span style="color:#D4D4D4;">?: </span><span style="color:#4EC9B0;">number</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955;">  /**</span></span>
<span class="line"><span style="color:#6A9955;">   * Tags which is considered as custom elements</span></span>
<span class="line"><span style="color:#6A9955;">   *</span></span>
<span class="line"><span style="color:#6A9955;">   * </span><span style="color:#569CD6;">@description</span><span style="color:#6A9955;"> This is used to determine whether a tag is a custom element since all unknown tags are removed in excerpt.</span></span>
<span class="line"><span style="color:#6A9955;">   */</span></span>
<span class="line"><span style="color:#DCDCAA;">  isCustomElement</span><span style="color:#D4D4D4;">?: (</span><span style="color:#9CDCFE;">tagName</span><span style="color:#D4D4D4;">: </span><span style="color:#4EC9B0;">string</span><span style="color:#D4D4D4;">) </span><span style="color:#569CD6;">=&gt;</span><span style="color:#4EC9B0;"> boolean</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955;">  /**</span></span>
<span class="line"><span style="color:#6A9955;">   * Whether keep page title (first h1) in excerpt</span></span>
<span class="line"><span style="color:#6A9955;">   *</span></span>
<span class="line"><span style="color:#6A9955;">   * </span><span style="color:#569CD6;">@default</span><span style="color:#9CDCFE;"> false</span></span>
<span class="line"><span style="color:#6A9955;">   */</span></span>
<span class="line"><span style="color:#9CDCFE;">  keepPageTitle</span><span style="color:#D4D4D4;">?: </span><span style="color:#4EC9B0;">boolean</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955;">  /**</span></span>
<span class="line"><span style="color:#6A9955;">   * Whether preserve tags like line numbers and highlight lines for code blocks</span></span>
<span class="line"><span style="color:#6A9955;">   *</span></span>
<span class="line"><span style="color:#6A9955;">   * </span><span style="color:#569CD6;">@default</span><span style="color:#9CDCFE;"> false</span></span>
<span class="line"><span style="color:#6A9955;">   */</span></span>
<span class="line"><span style="color:#9CDCFE;">  keepFenceDom</span><span style="color:#D4D4D4;">?: </span><span style="color:#4EC9B0;">boolean</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C586C0;">export</span><span style="color:#569CD6;"> const</span><span style="color:#DCDCAA;"> getPageExcerpt</span><span style="color:#D4D4D4;">: (</span></span>
<span class="line"><span style="color:#9CDCFE;">  app</span><span style="color:#D4D4D4;">: </span><span style="color:#4EC9B0;">App</span><span style="color:#D4D4D4;">,</span></span>
<span class="line"><span style="color:#9CDCFE;">  page</span><span style="color:#D4D4D4;">: </span><span style="color:#4EC9B0;">Page</span><span style="color:#D4D4D4;">,</span></span>
<span class="line"><span style="color:#9CDCFE;">  options</span><span style="color:#D4D4D4;">?: </span><span style="color:#4EC9B0;">PageExcerptOptions</span><span style="color:#D4D4D4;">,</span></span>
<span class="line"><span style="color:#D4D4D4;">) </span><span style="color:#569CD6;">=&gt;</span><span style="color:#4EC9B0;"> string</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="getpagetext" tabindex="-1"><a class="header-anchor" href="#getpagetext"><span>getPageText</span></a></h2><p>Get plain text of the page.</p><div class="language-ts line-numbers-mode" data-highlighter="shiki" data-ext="ts" data-title="ts" style="background-color:#1E1E1E;color:#D4D4D4;"><pre class="shiki dark-plus vp-code"><code><span class="line"><span style="color:#C586C0;">export</span><span style="color:#569CD6;"> interface</span><span style="color:#4EC9B0;"> PageTextOptions</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#6A9955;">  /**</span></span>
<span class="line"><span style="color:#6A9955;">   * Whether convert text to single line content</span></span>
<span class="line"><span style="color:#6A9955;">   *</span></span>
<span class="line"><span style="color:#6A9955;">   * </span><span style="color:#569CD6;">@default</span><span style="color:#9CDCFE;"> false</span></span>
<span class="line"><span style="color:#6A9955;">   */</span></span>
<span class="line"><span style="color:#9CDCFE;">  singleLine</span><span style="color:#D4D4D4;">?: </span><span style="color:#4EC9B0;">boolean</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955;">  /**</span></span>
<span class="line"><span style="color:#6A9955;">   * Length of text</span></span>
<span class="line"><span style="color:#6A9955;">   *</span></span>
<span class="line"><span style="color:#6A9955;">   * </span><span style="color:#569CD6;">@description</span><span style="color:#6A9955;"> Text length will be the minimal possible length reaching this value</span></span>
<span class="line"><span style="color:#6A9955;">   *</span></span>
<span class="line"><span style="color:#6A9955;">   * </span><span style="color:#569CD6;">@default</span><span style="color:#9CDCFE;"> 300</span></span>
<span class="line"><span style="color:#6A9955;">   */</span></span>
<span class="line"><span style="color:#9CDCFE;">  length</span><span style="color:#D4D4D4;">?: </span><span style="color:#4EC9B0;">number</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955;">  /**</span></span>
<span class="line"><span style="color:#6A9955;">   * Tags to be removed</span></span>
<span class="line"><span style="color:#6A9955;">   *</span></span>
<span class="line"><span style="color:#6A9955;">   * </span><span style="color:#569CD6;">@description</span><span style="color:#6A9955;"> Table and code blocks are removed by default.</span></span>
<span class="line"><span style="color:#6A9955;">   *</span></span>
<span class="line"><span style="color:#6A9955;">   * </span><span style="color:#569CD6;">@default</span><span style="color:#9CDCFE;"> [&#39;table&#39;,</span><span style="color:#6A9955;"> &#39;pre&#39;]</span></span>
<span class="line"><span style="color:#6A9955;">   */</span></span>
<span class="line"><span style="color:#9CDCFE;">  removedTags</span><span style="color:#D4D4D4;">?: </span><span style="color:#4EC9B0;">string</span><span style="color:#D4D4D4;">[]</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C586C0;">export</span><span style="color:#569CD6;"> const</span><span style="color:#DCDCAA;"> getPageText</span><span style="color:#D4D4D4;">: (</span></span>
<span class="line"><span style="color:#9CDCFE;">  app</span><span style="color:#D4D4D4;">: </span><span style="color:#4EC9B0;">App</span><span style="color:#D4D4D4;">,</span></span>
<span class="line"><span style="color:#9CDCFE;">  page</span><span style="color:#D4D4D4;">: </span><span style="color:#4EC9B0;">Page</span><span style="color:#D4D4D4;">,</span></span>
<span class="line"><span style="color:#9CDCFE;">  options</span><span style="color:#D4D4D4;">?: </span><span style="color:#4EC9B0;">PageTextOptions</span><span style="color:#D4D4D4;">,</span></span>
<span class="line"><span style="color:#D4D4D4;">) </span><span style="color:#569CD6;">=&gt;</span><span style="color:#4EC9B0;"> string</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8),t=[p];function o(i,c){return n(),e("div",null,t)}const d=s(l,[["render",o],["__file","page.html.vue"]]),y=JSON.parse('{"path":"/tools/helper/node/page.html","title":"Page Related","lang":"en-US","frontmatter":{"description":"Page Related These functions generate common information for your pages. getPageExcerpt Get the excerpt of the page. getPageText Get plain text of the page.","head":[["link",{"rel":"alternate","hreflang":"zh-cn","href":"https://ecosystem.vuejs.press/ecosystem/zh/tools/helper/node/page.html"}],["meta",{"property":"og:url","content":"https://ecosystem.vuejs.press/ecosystem/tools/helper/node/page.html"}],["meta",{"property":"og:site_name","content":"VuePress Ecosystem"}],["meta",{"property":"og:title","content":"Page Related"}],["meta",{"property":"og:description","content":"Page Related These functions generate common information for your pages. getPageExcerpt Get the excerpt of the page. getPageText Get plain text of the page."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:locale:alternate","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-02-03T11:34:35.000Z"}],["meta",{"property":"article:modified_time","content":"2024-02-03T11:34:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Page Related\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-02-03T11:34:35.000Z\\",\\"author\\":[]}"],["link",{"rel":"alternate","type":"application/atom+xml","href":"https://ecosystem.vuejs.press/ecosystem/atom.xml","title":"VuePress Ecosystem Atom Feed"}],["link",{"rel":"alternate","type":"application/json","href":"https://ecosystem.vuejs.press/ecosystem/feed.json","title":"VuePress Ecosystem JSON Feed"}],["link",{"rel":"alternate","type":"application/rss+xml","href":"https://ecosystem.vuejs.press/ecosystem/rss.xml","title":"VuePress Ecosystem RSS Feed"}]]},"headers":[{"level":2,"title":"getPageExcerpt","slug":"getpageexcerpt","link":"#getpageexcerpt","children":[]},{"level":2,"title":"getPageText","slug":"getpagetext","link":"#getpagetext","children":[]}],"git":{"updatedTime":1706960075000,"contributors":[{"name":"Mr.Hope","email":"mister-hope@outlook.com","commits":1}]},"autoDesc":true,"filePathRelative":"tools/helper/node/page.md"}');export{d as comp,y as data};
