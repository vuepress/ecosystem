import{_ as s,o as n,c as a,d as e}from"./app-Ewd8mK7F.js";const l={},p=e(`<h1 id="页面相关" tabindex="-1"><a class="header-anchor" href="#页面相关"><span>页面相关</span></a></h1><p>这些函数为你的页面生成常见信息。</p><h2 id="getpageexcerpt" tabindex="-1"><a class="header-anchor" href="#getpageexcerpt"><span>getPageExcerpt</span></a></h2><p>获取页面摘要。</p><div class="language-ts line-numbers-mode" data-highlighter="shiki" data-ext="ts" data-title="ts" style="background-color:#1E1E1E;color:#D4D4D4;"><pre class="shiki dark-plus vp-code"><code><span class="line"><span style="color:#C586C0;">export</span><span style="color:#569CD6;"> interface</span><span style="color:#4EC9B0;"> PageExcerptOptions</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#6A9955;">  /**</span></span>
<span class="line"><span style="color:#6A9955;">   * 摘要分隔符</span></span>
<span class="line"><span style="color:#6A9955;">   *</span></span>
<span class="line"><span style="color:#6A9955;">   * </span><span style="color:#569CD6;">@default</span><span style="color:#9CDCFE;"> &quot;</span><span style="color:#9CDCFE;">&lt;!-- more --&gt;</span><span style="color:#9CDCFE;">&quot;</span></span>
<span class="line"><span style="color:#6A9955;">   */</span></span>
<span class="line"><span style="color:#9CDCFE;">  separator</span><span style="color:#D4D4D4;">?: </span><span style="color:#4EC9B0;">string</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955;">  /**</span></span>
<span class="line"><span style="color:#6A9955;">   * 摘要的长度</span></span>
<span class="line"><span style="color:#6A9955;">   *</span></span>
<span class="line"><span style="color:#6A9955;">   * </span><span style="color:#569CD6;">@description</span><span style="color:#6A9955;"> 摘要的长度会尽可能的接近这个值</span></span>
<span class="line"><span style="color:#6A9955;">   *</span></span>
<span class="line"><span style="color:#6A9955;">   * </span><span style="color:#569CD6;">@default</span><span style="color:#9CDCFE;"> 300</span></span>
<span class="line"><span style="color:#6A9955;">   */</span></span>
<span class="line"><span style="color:#9CDCFE;">  length</span><span style="color:#D4D4D4;">?: </span><span style="color:#4EC9B0;">number</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955;">  /**</span></span>
<span class="line"><span style="color:#6A9955;">   * 被认为是自定义元素的标签</span></span>
<span class="line"><span style="color:#6A9955;">   *</span></span>
<span class="line"><span style="color:#6A9955;">   * </span><span style="color:#569CD6;">@description</span><span style="color:#6A9955;"> 用于判断一个标签是否是自定义元素，因为在摘要中，所有的未知标签都会被移除。</span></span>
<span class="line"><span style="color:#6A9955;">   */</span></span>
<span class="line"><span style="color:#DCDCAA;">  isCustomElement</span><span style="color:#D4D4D4;">?: (</span><span style="color:#9CDCFE;">tagName</span><span style="color:#D4D4D4;">: </span><span style="color:#4EC9B0;">string</span><span style="color:#D4D4D4;">) </span><span style="color:#569CD6;">=&gt;</span><span style="color:#4EC9B0;"> boolean</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955;">  /**</span></span>
<span class="line"><span style="color:#6A9955;">   * 是否保留页面标题 (第一个 h1)</span></span>
<span class="line"><span style="color:#6A9955;">   *</span></span>
<span class="line"><span style="color:#6A9955;">   * </span><span style="color:#569CD6;">@default</span><span style="color:#9CDCFE;"> false</span></span>
<span class="line"><span style="color:#6A9955;">   */</span></span>
<span class="line"><span style="color:#9CDCFE;">  keepPageTitle</span><span style="color:#D4D4D4;">?: </span><span style="color:#4EC9B0;">boolean</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955;">  /**</span></span>
<span class="line"><span style="color:#6A9955;">   * 是否保留代码块的标签，诸如行号和高亮行</span></span>
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
<span class="line"><span style="color:#D4D4D4;">) </span><span style="color:#569CD6;">=&gt;</span><span style="color:#4EC9B0;"> string</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="getpagetext" tabindex="-1"><a class="header-anchor" href="#getpagetext"><span>getPageText</span></a></h2><p>获取页面纯文本。</p><div class="language-ts line-numbers-mode" data-highlighter="shiki" data-ext="ts" data-title="ts" style="background-color:#1E1E1E;color:#D4D4D4;"><pre class="shiki dark-plus vp-code"><code><span class="line"><span style="color:#C586C0;">export</span><span style="color:#569CD6;"> interface</span><span style="color:#4EC9B0;"> PageTextOptions</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#6A9955;">  /**</span></span>
<span class="line"><span style="color:#6A9955;">   * 是否将文字转换成单行内容</span></span>
<span class="line"><span style="color:#6A9955;">   *</span></span>
<span class="line"><span style="color:#6A9955;">   * </span><span style="color:#569CD6;">@default</span><span style="color:#9CDCFE;"> false</span></span>
<span class="line"><span style="color:#6A9955;">   */</span></span>
<span class="line"><span style="color:#9CDCFE;">  singleLine</span><span style="color:#D4D4D4;">?: </span><span style="color:#4EC9B0;">boolean</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955;">  /**</span></span>
<span class="line"><span style="color:#6A9955;">   * 文字的长度</span></span>
<span class="line"><span style="color:#6A9955;">   *</span></span>
<span class="line"><span style="color:#6A9955;">   * </span><span style="color:#569CD6;">@description</span><span style="color:#6A9955;"> 文字的长度会尽可能的接近这个值</span></span>
<span class="line"><span style="color:#6A9955;">   *</span></span>
<span class="line"><span style="color:#6A9955;">   * </span><span style="color:#569CD6;">@default</span><span style="color:#9CDCFE;"> 300</span></span>
<span class="line"><span style="color:#6A9955;">   */</span></span>
<span class="line"><span style="color:#9CDCFE;">  length</span><span style="color:#D4D4D4;">?: </span><span style="color:#4EC9B0;">number</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955;">  /**</span></span>
<span class="line"><span style="color:#6A9955;">   * 需要移除的标签</span></span>
<span class="line"><span style="color:#6A9955;">   *</span></span>
<span class="line"><span style="color:#6A9955;">   * </span><span style="color:#569CD6;">@description</span><span style="color:#6A9955;"> 默认情况下表格和代码块会被移除</span></span>
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
<span class="line"><span style="color:#D4D4D4;">) </span><span style="color:#569CD6;">=&gt;</span><span style="color:#4EC9B0;"> string</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8),o=[p];function i(t,c){return n(),a("div",null,o)}const d=s(l,[["render",i],["__file","page.html.vue"]]),v=JSON.parse('{"path":"/zh/tools/helper/node/page.html","title":"页面相关","lang":"zh-CN","frontmatter":{"description":"页面相关 这些函数为你的页面生成常见信息。 getPageExcerpt 获取页面摘要。 getPageText 获取页面纯文本。","head":[["link",{"rel":"alternate","hreflang":"en-us","href":"https://ecosystem.vuejs.press/tools/helper/node/page.html"}],["meta",{"property":"og:url","content":"https://ecosystem.vuejs.press/zh/tools/helper/node/page.html"}],["meta",{"property":"og:site_name","content":"VuePress 生态系统"}],["meta",{"property":"og:title","content":"页面相关"}],["meta",{"property":"og:description","content":"页面相关 这些函数为你的页面生成常见信息。 getPageExcerpt 获取页面摘要。 getPageText 获取页面纯文本。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:locale:alternate","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2024-02-03T11:34:35.000Z"}],["meta",{"property":"article:modified_time","content":"2024-02-03T11:34:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"页面相关\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-02-03T11:34:35.000Z\\",\\"author\\":[]}"],["link",{"rel":"alternate","type":"application/atom+xml","href":"https://ecosystem.vuejs.press/zh/atom.xml","title":"VuePress 生态系统 Atom Feed"}],["link",{"rel":"alternate","type":"application/json","href":"https://ecosystem.vuejs.press/zh/feed.json","title":"VuePress 生态系统 JSON Feed"}],["link",{"rel":"alternate","type":"application/rss+xml","href":"https://ecosystem.vuejs.press/zh/rss.xml","title":"VuePress 生态系统 RSS Feed"}]]},"headers":[{"level":2,"title":"getPageExcerpt","slug":"getpageexcerpt","link":"#getpageexcerpt","children":[]},{"level":2,"title":"getPageText","slug":"getpagetext","link":"#getpagetext","children":[]}],"git":{"updatedTime":1706960075000,"contributors":[{"name":"Mr.Hope","email":"mister-hope@outlook.com","commits":1}]},"autoDesc":true,"filePathRelative":"zh/tools/helper/node/page.md"}');export{d as comp,v as data};
