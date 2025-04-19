import{_ as o,c as p,d as s,a as t,e as a,b as l,w as r,r as n,o as d}from"./app-BsF2ugWo.js";const c={};function m(h,e){const i=n("RouteLink");return d(),p("div",null,[e[6]||(e[6]=s('<h1 id="配置" tabindex="-1"><a class="header-anchor" href="#配置"><span>配置</span></a></h1><h2 id="hostname" tabindex="-1"><a class="header-anchor" href="#hostname"><span>hostname</span></a></h2><ul><li><p>类型：<code>string</code></p></li><li><p>必填：是</p></li><li><p>详情：</p><p>当前网站部署到的域名，插件需要此选项才能工作。</p></li></ul><h2 id="extraurls" tabindex="-1"><a class="header-anchor" href="#extraurls"><span>extraUrls</span></a></h2><ul><li><p>类型：<code>string[]</code></p></li><li><p>详情：</p><p>需要额外包含的网址。</p><p>如果你有一些不包含在 VuePress 路由中的链接 (如: 存放在 public 文件夹下的页面或其他插件或工具直接生成的页面)，你可能需要设置此项。</p></li><li><p>示例：<code>[&#39;/about.html&#39;, &#39;/api/&#39;]</code></p></li></ul><h2 id="excludepaths" tabindex="-1"><a class="header-anchor" href="#excludepaths"><span>excludePaths</span></a></h2><ul><li><p>类型：<code>string[]</code></p></li><li><p>默认值：<code>[&#39;/404.html&#39;]</code></p></li><li><p>详情：</p><p>不需要收录的页面路径，请以绝对路径开头。</p><p>默认情况下 VuePress 自动生成的所有路径 (除 404 页) 都会被添加进 Sitemap。</p></li></ul><h2 id="devserver" tabindex="-1"><a class="header-anchor" href="#devserver"><span>devServer</span></a></h2><ul><li><p>类型：<code>boolean</code></p></li><li><p>默认值：<code>false</code></p></li><li><p>详情：</p><p>是否在开发服务器中启用</p></li></ul><div class="hint-container tip"><p class="hint-container-title">提示</p><p>由于性能原因，我们不提供热更新。重启开发服务器以同步你的变更。</p></div><h2 id="devhostname" tabindex="-1"><a class="header-anchor" href="#devhostname"><span>devHostname</span></a></h2><ul><li><p>类型：<code>string</code></p></li><li><p>默认值：<code>&quot;http://localhost:${port}&quot;</code></p></li><li><p>详情：</p><p>开发服务器使用的主机名</p></li></ul><h2 id="sitemapfilename" tabindex="-1"><a class="header-anchor" href="#sitemapfilename"><span>sitemapFilename</span></a></h2><ul><li><p>类型：<code>string</code></p></li><li><p>默认值：<code>&quot;sitemap.xml&quot;</code></p></li><li><p>详情：</p><p>输出的文件名，相对于输出目录。</p></li></ul><h2 id="sitemapxslfilename" tabindex="-1"><a class="header-anchor" href="#sitemapxslfilename"><span>sitemapXSLFilename</span></a></h2><ul><li><p>类型：<code>string</code></p></li><li><p>默认值：<code>&quot;sitemap.xsl&quot;</code></p></li><li><p>详情：</p><p>输出的 xsl 文件名，相对于输出目录。</p></li></ul><h2 id="sitemapxsltemplate" tabindex="-1"><a class="header-anchor" href="#sitemapxsltemplate"><span>sitemapXSLTemplate</span></a></h2><ul><li><p>类型：<code>string</code></p></li><li><p>默认值：<code>&quot;@vuepress-plugin/sitemap/templates/sitemap.xsl&quot;</code></p></li><li><p>详情：</p><p>用作模板的 XSL 文件内容</p></li></ul><h2 id="changefreq" tabindex="-1"><a class="header-anchor" href="#changefreq"><span>changefreq</span></a></h2>',19)),t("ul",null,[e[4]||(e[4]=t("li",null,[t("p",null,[a("类型："),t("code",null,'"always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"')])],-1)),e[5]||(e[5]=t("li",null,[t("p",null,[a("默认值："),t("code",null,'"daily"')])],-1)),t("li",null,[e[3]||(e[3]=t("p",null,"详情：",-1)),t("p",null,[e[1]||(e[1]=a("页面默认更新频率，会被 Frontmatter 中的 ")),l(i,{to:"/zh/plugins/seo/sitemap/frontmatter.html#sitemap-changefreq"},{default:r(()=>e[0]||(e[0]=[a("changefreq")])),_:1}),e[2]||(e[2]=a(" 选项覆盖。"))])])]),e[7]||(e[7]=s('<h2 id="priority" tabindex="-1"><a class="header-anchor" href="#priority"><span>priority</span></a></h2><ul><li><p>类型：<code>number</code></p></li><li><p>默认值：<code>0.5</code></p></li><li><p>详情：</p><p>页面优先级，范围 <code>0</code> 至 <code>1</code>。</p></li></ul><h2 id="modifytimegetter" tabindex="-1"><a class="header-anchor" href="#modifytimegetter"><span>modifyTimeGetter</span></a></h2><ul><li><p>类型：<code>(page: Page, app: App) =&gt; string</code></p></li><li><p>详情：</p><p>最后修改事件的获得器，需要返回一个 ISO 字符形式的时间，默认会自动通过 Git 插件生成。</p></li></ul>',4))])}const g=o(c,[["render",m]]),f=JSON.parse(`{"path":"/zh/plugins/seo/sitemap/config.html","title":"配置","lang":"zh-CN","frontmatter":{"icon":"settings-2","description":"配置 hostname 类型：string 必填：是 详情： 当前网站部署到的域名，插件需要此选项才能工作。 extraUrls 类型：string[] 详情： 需要额外包含的网址。 如果你有一些不包含在 VuePress 路由中的链接 (如: 存放在 public 文件夹下的页面或其他插件或工具直接生成的页面)，你可能需要设置此项。 示例：['/ab...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"配置\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-01-10T18:07:54.000Z\\",\\"author\\":[]}"],["meta",{"property":"og:url","content":"https://ecosystem.vuejs.press/ecosystem/zh/plugins/seo/sitemap/config.html"}],["meta",{"property":"og:site_name","content":"VuePress 生态系统"}],["meta",{"property":"og:title","content":"配置"}],["meta",{"property":"og:description","content":"配置 hostname 类型：string 必填：是 详情： 当前网站部署到的域名，插件需要此选项才能工作。 extraUrls 类型：string[] 详情： 需要额外包含的网址。 如果你有一些不包含在 VuePress 路由中的链接 (如: 存放在 public 文件夹下的页面或其他插件或工具直接生成的页面)，你可能需要设置此项。 示例：['/ab..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:locale:alternate","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2025-01-10T18:07:54.000Z"}],["meta",{"property":"article:modified_time","content":"2025-01-10T18:07:54.000Z"}],["link",{"rel":"alternate","hreflang":"en-us","href":"https://ecosystem.vuejs.press/ecosystem/plugins/seo/sitemap/config.html"}],["link",{"rel":"alternate","type":"application/atom+xml","href":"https://ecosystem.vuejs.press/ecosystem/zh/atom.xml","title":"VuePress 生态系统 Atom Feed"}],["link",{"rel":"alternate","type":"application/json","href":"https://ecosystem.vuejs.press/ecosystem/zh/feed.json","title":"VuePress 生态系统 JSON Feed"}],["link",{"rel":"alternate","type":"application/rss+xml","href":"https://ecosystem.vuejs.press/ecosystem/zh/rss.xml","title":"VuePress 生态系统 RSS Feed"}]]},"git":{"updatedTime":1736532474000,"contributors":[{"name":"Mister-Hope","username":"Mister-Hope","email":"mister-hope@outlook.com","commits":6,"avatar":"https://avatars.githubusercontent.com/Mister-Hope?v=4","url":"https://github.com/Mister-Hope"}],"changelog":[{"hash":"ae96c427eeb664c8d361963d1815a68386856bbe","time":1736532474000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"docs: add icons to docs (#332)"},{"hash":"abd787c6f128028703d28a7bc8128bb1d4ab92f4","time":1716961207000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"chore: update repo structure (#159)"},{"hash":"4a50404feae553e0f212c11b7a8373dc5773d0dc","time":1706801200000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"feat(plugin-rtl): add rtl plugin (#49)"},{"hash":"247c792961069abbb1b5152be09bdfb1a3aa4458","time":1706723991000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"feat(plugin-sitemap): rename excludeUrls to excludePaths (#45)"},{"hash":"267f388c6ee4d3d5a44f42ddd16583569cfe97af","time":1706627619000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"feat(plugin-sitemap): add sitemap plugin (#37)"},{"hash":"bd72368cf00335793e2c376b162546be05724636","time":1706625181000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"docs: improve docs"}]},"autoDesc":true,"filePathRelative":"zh/plugins/seo/sitemap/config.md"}`);export{g as comp,f as data};
