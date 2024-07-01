import{_ as a,r as l,o as e,c as p,a as o,b as s,d as i}from"./app-DUADLqHd.js";const c={},t=s("h1",{id:"notice",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#notice"},[s("span",null,"notice")])],-1),r=i(`<p>你可以通过此插件添加通知弹窗。</p><h2 id="使用" tabindex="-1"><a class="header-anchor" href="#使用"><span>使用</span></a></h2><div class="language-bash" data-highlighter="shiki" data-ext="bash" data-title="bash" style="background-color:#1E1E1E;color:#D4D4D4;"><pre class="shiki dark-plus vp-code"><code><span class="line"><span style="color:#DCDCAA;">npm</span><span style="color:#CE9178;"> i</span><span style="color:#569CD6;"> -D</span><span style="color:#CE9178;"> @vuepress/plugin-notice@next</span></span></code></pre></div><div class="language-ts" data-highlighter="shiki" data-ext="ts" data-title="ts" style="background-color:#1E1E1E;color:#D4D4D4;"><pre class="shiki dark-plus vp-code"><code><span class="line"><span style="color:#C586C0;">import</span><span style="color:#D4D4D4;"> { </span><span style="color:#9CDCFE;">noticePlugin</span><span style="color:#D4D4D4;"> } </span><span style="color:#C586C0;">from</span><span style="color:#CE9178;"> &#39;@vuepress/plugin-notice&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C586C0;">default</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#C8C8C8;">  plugins</span><span style="color:#D4D4D4;">: [</span></span>
<span class="line"><span style="color:#DCDCAA;">    noticePlugin</span><span style="color:#D4D4D4;">({</span></span>
<span class="line"><span style="color:#6A9955;">      // 选项</span></span>
<span class="line"><span style="color:#D4D4D4;">    }),</span></span>
<span class="line"><span style="color:#D4D4D4;">  ],</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span></code></pre></div><p>你可以为站点的不同路径设置多个公告。</p><p>每个公告配置需要包含一个 <code>path</code> 或 <code>match</code> 选项，用于匹配路径。<code>path</code> 选项为字符串，匹配所有以此开头的路径，<code>match</code> 选项为正则表达式以和所有路由测试匹配。</p><p>一个公告配置包括:</p><ul><li><p><code>title</code>: 通知标题，支持文本和 HTMLString</p></li><li><p><code>content</code>: 通知内容，支持文本和 HTMLString</p></li><li><p><code>actions</code>: 通知操作</p><p>应该是包含以下内容的对象数组:</p><ul><li><p><code>text</code>: 动作文本</p></li><li><p><code>link</code> (可选): 操作链接。</p><p>绝对路径会被当作内部路处理，完整 URL 被当作外部链接在新窗口打。</p></li><li><p><code>type</code> (可选): <code>&quot;default&quot;</code> 或 <code>&quot;primary&quot;</code></p><p>默认值为 <code>&quot;default&quot;</code>。</p></li></ul></li></ul><p>这是一个例子:</p><div class="language-ts line-numbers-mode" data-highlighter="shiki" data-ext="ts" data-title="ts" style="background-color:#1E1E1E;color:#D4D4D4;"><pre class="shiki dark-plus vp-code"><code><span class="line"><span style="color:#C586C0;">import</span><span style="color:#D4D4D4;"> { </span><span style="color:#9CDCFE;">noticePlugin</span><span style="color:#D4D4D4;"> } </span><span style="color:#C586C0;">from</span><span style="color:#CE9178;"> &#39;@vuepress/plugin-notice&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C586C0;">export</span><span style="color:#C586C0;"> default</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#9CDCFE;">  plugins:</span><span style="color:#D4D4D4;"> [</span></span>
<span class="line"><span style="color:#DCDCAA;">    noticePlugin</span><span style="color:#D4D4D4;">({</span></span>
<span class="line"><span style="color:#9CDCFE;">      config:</span><span style="color:#D4D4D4;"> [</span></span>
<span class="line"><span style="color:#D4D4D4;">        {</span></span>
<span class="line"><span style="color:#9CDCFE;">          path:</span><span style="color:#CE9178;"> &#39;/&#39;</span><span style="color:#D4D4D4;">,</span></span>
<span class="line"><span style="color:#9CDCFE;">          title:</span><span style="color:#CE9178;"> &#39;Notice Title&#39;</span><span style="color:#D4D4D4;">,</span></span>
<span class="line"><span style="color:#9CDCFE;">          content:</span><span style="color:#CE9178;"> &#39;Notice Content&#39;</span><span style="color:#D4D4D4;">,</span></span>
<span class="line"><span style="color:#9CDCFE;">          actions:</span><span style="color:#D4D4D4;"> [</span></span>
<span class="line"><span style="color:#D4D4D4;">            {</span></span>
<span class="line"><span style="color:#9CDCFE;">              text:</span><span style="color:#CE9178;"> &#39;Primary Action&#39;</span><span style="color:#D4D4D4;">,</span></span>
<span class="line"><span style="color:#9CDCFE;">              link:</span><span style="color:#CE9178;"> &#39;https://theme-hope.vuejs.press/&#39;</span><span style="color:#D4D4D4;">,</span></span>
<span class="line"><span style="color:#9CDCFE;">              type:</span><span style="color:#CE9178;"> &#39;primary&#39;</span><span style="color:#D4D4D4;">,</span></span>
<span class="line"><span style="color:#D4D4D4;">            },</span></span>
<span class="line"><span style="color:#D4D4D4;">            { </span><span style="color:#9CDCFE;">text:</span><span style="color:#CE9178;"> &#39;Default Action&#39;</span><span style="color:#D4D4D4;"> },</span></span>
<span class="line"><span style="color:#D4D4D4;">          ],</span></span>
<span class="line"><span style="color:#D4D4D4;">        },</span></span>
<span class="line"><span style="color:#D4D4D4;">        {</span></span>
<span class="line"><span style="color:#9CDCFE;">          path:</span><span style="color:#CE9178;"> &#39;/zh/&#39;</span><span style="color:#D4D4D4;">,</span></span>
<span class="line"><span style="color:#9CDCFE;">          title:</span><span style="color:#CE9178;"> &#39;Notice Title&#39;</span><span style="color:#D4D4D4;">,</span></span>
<span class="line"><span style="color:#9CDCFE;">          content:</span><span style="color:#CE9178;"> &#39;Notice Content&#39;</span><span style="color:#D4D4D4;">,</span></span>
<span class="line"><span style="color:#9CDCFE;">          actions:</span><span style="color:#D4D4D4;"> [</span></span>
<span class="line"><span style="color:#D4D4D4;">            {</span></span>
<span class="line"><span style="color:#9CDCFE;">              text:</span><span style="color:#CE9178;"> &#39;Primary Action&#39;</span><span style="color:#D4D4D4;">,</span></span>
<span class="line"><span style="color:#9CDCFE;">              link:</span><span style="color:#CE9178;"> &#39;https://theme-hope.vuejs.press/&#39;</span><span style="color:#D4D4D4;">,</span></span>
<span class="line"><span style="color:#9CDCFE;">              type:</span><span style="color:#CE9178;"> &#39;primary&#39;</span><span style="color:#D4D4D4;">,</span></span>
<span class="line"><span style="color:#D4D4D4;">            },</span></span>
<span class="line"><span style="color:#D4D4D4;">            { </span><span style="color:#9CDCFE;">text:</span><span style="color:#CE9178;"> &#39;Default Action&#39;</span><span style="color:#D4D4D4;"> },</span></span>
<span class="line"><span style="color:#D4D4D4;">          ],</span></span>
<span class="line"><span style="color:#D4D4D4;">        },</span></span>
<span class="line"><span style="color:#D4D4D4;">      ],</span></span>
<span class="line"><span style="color:#D4D4D4;">    }),</span></span>
<span class="line"><span style="color:#D4D4D4;">  ],</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，我们还为你提供了一些高级选项来控制通知显示。</p><div class="custom-container tip"><p class="custom-container-title">通知显示控件</p><p>默认情况下，每当用户进入网站时都会显示该通知，如果用户关闭该网站，该通知将在此期间保持关闭状态。</p><p>为了防止在用户关闭通知后下次访问时再次显示通知，你可以在公告配置中设置 <code>showOnce: true</code>。</p><p>另外，通知记忆是根据通知标题和通知内容来记忆的，你可以设置 <code>key</code> 选项来使用你想要的记忆键值，这样你就可以编辑通知而不会打扰已经确认过的用户。</p></div><div class="custom-container tip"><p class="custom-container-title">全屏</p><p>如果要显示全屏弹出窗口，可以在公告配置中使用 <code>fullscreen: true</code>。我们建议你将它与 <code>confirm: true</code> 一起使用。</p><p>通知将显示在屏幕中央，其他地方将被模糊遮罩覆盖。</p></div><div class="custom-container tip"><p class="custom-container-title">关闭逻辑</p><p>默认情况下，通知右侧会有一个关闭按钮，用户可以点击关闭。</p><p>但是，如果你希望用户确认通知，你可以设置 <code>confirm: true</code>，这样用户只能通过点击操作按钮来关闭通知。</p></div><h2 id="选项" tabindex="-1"><a class="header-anchor" href="#选项"><span>选项</span></a></h2><h3 id="config" tabindex="-1"><a class="header-anchor" href="#config"><span>config</span></a></h3><ul><li><p>类型：<code>NoticeOptions[]</code></p><div class="language-ts line-numbers-mode" data-highlighter="shiki" data-ext="ts" data-title="ts" style="background-color:#1E1E1E;color:#D4D4D4;"><pre class="shiki dark-plus vp-code"><code><span class="line"><span style="color:#569CD6;">interface</span><span style="color:#4EC9B0;"> NoticeItemOptions</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#6A9955;">  /**</span></span>
<span class="line"><span style="color:#6A9955;">   * 通知标题</span></span>
<span class="line"><span style="color:#6A9955;">   */</span></span>
<span class="line"><span style="color:#9CDCFE;">  title</span><span style="color:#D4D4D4;">: </span><span style="color:#4EC9B0;">string</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955;">  /**</span></span>
<span class="line"><span style="color:#6A9955;">   * 通知内容</span></span>
<span class="line"><span style="color:#6A9955;">   */</span></span>
<span class="line"><span style="color:#9CDCFE;">  content</span><span style="color:#D4D4D4;">: </span><span style="color:#4EC9B0;">string</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955;">  /**</span></span>
<span class="line"><span style="color:#6A9955;">   * Notice 的 key</span></span>
<span class="line"><span style="color:#6A9955;">   *</span></span>
<span class="line"><span style="color:#6A9955;">   * </span><span style="color:#569CD6;">@description</span><span style="color:#6A9955;"> 用于标识和存储 notice 的状态</span></span>
<span class="line"><span style="color:#6A9955;">   */</span></span>
<span class="line"><span style="color:#9CDCFE;">  key</span><span style="color:#D4D4D4;">?: </span><span style="color:#4EC9B0;">string</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955;">  /**</span></span>
<span class="line"><span style="color:#6A9955;">   * 是否只显示一次通知</span></span>
<span class="line"><span style="color:#6A9955;">   *</span></span>
<span class="line"><span style="color:#6A9955;">   * </span><span style="color:#569CD6;">@default</span><span style="color:#9CDCFE;"> false</span></span>
<span class="line"><span style="color:#6A9955;">   */</span></span>
<span class="line"><span style="color:#9CDCFE;">  showOnce</span><span style="color:#D4D4D4;">?: </span><span style="color:#4EC9B0;">boolean</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955;">  /**</span></span>
<span class="line"><span style="color:#6A9955;">   * 通知是否需要确认</span></span>
<span class="line"><span style="color:#6A9955;">   *</span></span>
<span class="line"><span style="color:#6A9955;">   * </span><span style="color:#569CD6;">@default</span><span style="color:#9CDCFE;"> false</span></span>
<span class="line"><span style="color:#6A9955;">   */</span></span>
<span class="line"><span style="color:#9CDCFE;">  confirm</span><span style="color:#D4D4D4;">?: </span><span style="color:#4EC9B0;">boolean</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955;">  /**</span></span>
<span class="line"><span style="color:#6A9955;">   * 通知是否应该全屏显示</span></span>
<span class="line"><span style="color:#6A9955;">   *</span></span>
<span class="line"><span style="color:#6A9955;">   * </span><span style="color:#569CD6;">@default</span><span style="color:#9CDCFE;"> false</span></span>
<span class="line"><span style="color:#6A9955;">   */</span></span>
<span class="line"><span style="color:#9CDCFE;">  fullscreen</span><span style="color:#D4D4D4;">?: </span><span style="color:#4EC9B0;">boolean</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955;">  /**</span></span>
<span class="line"><span style="color:#6A9955;">   * 通知操作</span></span>
<span class="line"><span style="color:#6A9955;">   */</span></span>
<span class="line"><span style="color:#9CDCFE;">  actions</span><span style="color:#D4D4D4;">?: </span><span style="color:#4EC9B0;">NoticeActionOption</span><span style="color:#D4D4D4;">[]</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">interface</span><span style="color:#4EC9B0;"> NoticePathOptions</span><span style="color:#569CD6;"> extends</span><span style="color:#4EC9B0;"> NoticeItemOptions</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#6A9955;">  /**</span></span>
<span class="line"><span style="color:#6A9955;">   * 公告需要匹配的前缀路径</span></span>
<span class="line"><span style="color:#6A9955;">   */</span></span>
<span class="line"><span style="color:#9CDCFE;">  path</span><span style="color:#D4D4D4;">: </span><span style="color:#4EC9B0;">string</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">interface</span><span style="color:#4EC9B0;"> NoticeMatchOptions</span><span style="color:#569CD6;"> extends</span><span style="color:#4EC9B0;"> NoticeItemOptions</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#6A9955;">  /**</span></span>
<span class="line"><span style="color:#6A9955;">   * 公告路径的正则匹配</span></span>
<span class="line"><span style="color:#6A9955;">   */</span></span>
<span class="line"><span style="color:#9CDCFE;">  match</span><span style="color:#D4D4D4;">: </span><span style="color:#4EC9B0;">RegExp</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">type</span><span style="color:#4EC9B0;"> NoticeOptions</span><span style="color:#D4D4D4;"> = </span><span style="color:#4EC9B0;">NoticeMatchOptions</span><span style="color:#D4D4D4;"> | </span><span style="color:#4EC9B0;">NoticePathOptions</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>详情：</p><p>通知配置</p></li></ul>`,17);function d(D,y){const n=l("NpmBadge");return e(),p("div",null,[t,o(n,{package:"@vuepress/plugin-notice"}),r])}const u=a(c,[["render",d],["__file","notice.html.vue"]]),m=JSON.parse('{"path":"/zh/plugins/features/notice.html","title":"notice","lang":"zh-CN","frontmatter":{"description":"notice","head":[["link",{"rel":"alternate","hreflang":"en-us","href":"https://ecosystem.vuejs.press/ecosystem/plugins/features/notice.html"}],["meta",{"property":"og:url","content":"https://ecosystem.vuejs.press/ecosystem/zh/plugins/features/notice.html"}],["meta",{"property":"og:site_name","content":"VuePress 生态系统"}],["meta",{"property":"og:title","content":"notice"}],["meta",{"property":"og:description","content":"notice"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:locale:alternate","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2024-05-29T05:40:07.000Z"}],["meta",{"property":"article:modified_time","content":"2024-05-29T05:40:07.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"notice\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-05-29T05:40:07.000Z\\",\\"author\\":[]}"],["link",{"rel":"alternate","type":"application/atom+xml","href":"https://ecosystem.vuejs.press/ecosystem/zh/atom.xml","title":"VuePress 生态系统 Atom Feed"}],["link",{"rel":"alternate","type":"application/json","href":"https://ecosystem.vuejs.press/ecosystem/zh/feed.json","title":"VuePress 生态系统 JSON Feed"}],["link",{"rel":"alternate","type":"application/rss+xml","href":"https://ecosystem.vuejs.press/ecosystem/zh/rss.xml","title":"VuePress 生态系统 RSS Feed"}]]},"headers":[{"level":2,"title":"使用","slug":"使用","link":"#使用","children":[]},{"level":2,"title":"选项","slug":"选项","link":"#选项","children":[{"level":3,"title":"config","slug":"config","link":"#config","children":[]}]}],"git":{"updatedTime":1716961207000,"contributors":[{"name":"Mister-Hope","email":"mister-hope@outlook.com","commits":1}]},"autoDesc":true,"filePathRelative":"zh/plugins/features/notice.md"}');export{u as comp,m as data};
