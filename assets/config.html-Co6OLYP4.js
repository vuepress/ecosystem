import{_ as o,c as l,d as i,a as t,e as a,b as p,w as r,r as n,o as d}from"./app-BsF2ugWo.js";const m={};function c(u,e){const s=n("RouteLink");return d(),l("div",null,[e[6]||(e[6]=i('<h1 id="config" tabindex="-1"><a class="header-anchor" href="#config"><span>Config</span></a></h1><h2 id="hostname" tabindex="-1"><a class="header-anchor" href="#hostname"><span>hostname</span></a></h2><ul><li><p>Type: <code>string</code></p></li><li><p>Required: Yes</p></li><li><p>Details:</p><p>The domain name where the current site is deployed, the plugin needs this option to work.</p></li></ul><h2 id="extraurls" tabindex="-1"><a class="header-anchor" href="#extraurls"><span>extraUrls</span></a></h2><ul><li><p>Type: <code>string[]</code></p></li><li><p>Details:</p><p>Extra link to be included.</p><p>If you have some links not including in VuePress Router (normally in public directory or generated by other tools directly), you may need this option.</p></li><li><p>Example: <code>[&#39;/about.html&#39;, &#39;/api/&#39;]</code></p></li></ul><h2 id="excludepaths" tabindex="-1"><a class="header-anchor" href="#excludepaths"><span>excludePaths</span></a></h2><ul><li><p>Type: <code>string[]</code></p></li><li><p>Default: <code>[&#39;/404.html&#39;]</code></p></li><li><p>Details:</p><p>Urls excluding from sitemap, starting with absolute path.</p><p>By default, all the urls generated by VuePress (excluding 404 page) will be added into sitemap.</p></li></ul><h2 id="devserver" tabindex="-1"><a class="header-anchor" href="#devserver"><span>devServer</span></a></h2><ul><li><p>Type: <code>boolean</code></p></li><li><p>Default: <code>false</code></p></li><li><p>Details:</p><p>Whether enabled in devServer.</p></li></ul><div class="hint-container tip"><p class="hint-container-title">Tips</p><p>For performance reasons, we do not provide hot reload. Reboot your devServer to sync your changes.</p></div><h2 id="devhostname" tabindex="-1"><a class="header-anchor" href="#devhostname"><span>devHostname</span></a></h2><ul><li><p>Type: <code>string</code></p></li><li><p>Default: <code>&quot;http://localhost:${port}&quot;</code></p></li><li><p>Details:</p><p>Hostname to use in devServer</p></li></ul><h2 id="sitemapfilename" tabindex="-1"><a class="header-anchor" href="#sitemapfilename"><span>sitemapFilename</span></a></h2><ul><li><p>Type: <code>string</code></p></li><li><p>Default value: <code>&quot;sitemap.xml&quot;</code></p></li><li><p>Details:</p><p>The output filename, relative to output directory.</p></li></ul><h2 id="sitemapxslfilename" tabindex="-1"><a class="header-anchor" href="#sitemapxslfilename"><span>sitemapXSLFilename</span></a></h2><ul><li><p>Type: <code>string</code></p></li><li><p>Default value: <code>&quot;sitemap.xsl&quot;</code></p></li><li><p>Details:</p><p>Output xsl filename, relative to dest folder.</p></li></ul><h2 id="sitemapxsltemplate" tabindex="-1"><a class="header-anchor" href="#sitemapxsltemplate"><span>sitemapXSLTemplate</span></a></h2><ul><li><p>Type: <code>string</code></p></li><li><p>Default value: <code>&quot;@vuepress/plugin-sitemap/templates/sitemap.xsl&quot;</code></p></li><li><p>Details:</p><p>XSL content used as template.</p></li></ul><h2 id="changefreq" tabindex="-1"><a class="header-anchor" href="#changefreq"><span>changefreq</span></a></h2>',19)),t("ul",null,[e[4]||(e[4]=t("li",null,[t("p",null,[a("Type: "),t("code",null,'"always" | "hourly" | "daily" | "weekly" |"monthly" | "yearly" | "never"')])],-1)),e[5]||(e[5]=t("li",null,[t("p",null,[a("Default value: "),t("code",null,'"daily"')])],-1)),t("li",null,[e[3]||(e[3]=t("p",null,"Details:",-1)),t("p",null,[e[1]||(e[1]=a("Page default update frequency, will be overridden by ")),p(s,{to:"/plugins/seo/sitemap/frontmatter.html#sitemap-changefreq"},{default:r(()=>e[0]||(e[0]=[a("sitemap.changefreq")])),_:1}),e[2]||(e[2]=a(" in Frontmatter."))])])]),e[7]||(e[7]=i('<h2 id="priority" tabindex="-1"><a class="header-anchor" href="#priority"><span>priority</span></a></h2><ul><li><p>Type: <code>number</code></p></li><li><p>Default: <code>0.5</code></p></li><li><p>Details:</p><p>Page priority, from <code>0</code> to <code>1</code>.</p></li></ul><h2 id="modifytimegetter" tabindex="-1"><a class="header-anchor" href="#modifytimegetter"><span>modifyTimeGetter</span></a></h2><ul><li><p>Type: <code>(page: Page, app: App) =&gt; string</code></p></li><li><p>Details:</p><p>Last modify time getter. By default, the plugin will use the timestamp generated by git plugin.</p></li></ul>',4))])}const f=o(m,[["render",c]]),g=JSON.parse('{"path":"/plugins/seo/sitemap/config.html","title":"Config","lang":"en-US","frontmatter":{"icon":"settings-2","description":"Config hostname Type: string Required: Yes Details: The domain name where the current site is deployed, the plugin needs this option to work. extraUrls Type: string[] Details: E...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Config\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-01-10T18:07:54.000Z\\",\\"author\\":[]}"],["meta",{"property":"og:url","content":"https://ecosystem.vuejs.press/ecosystem/plugins/seo/sitemap/config.html"}],["meta",{"property":"og:site_name","content":"VuePress Ecosystem"}],["meta",{"property":"og:title","content":"Config"}],["meta",{"property":"og:description","content":"Config hostname Type: string Required: Yes Details: The domain name where the current site is deployed, the plugin needs this option to work. extraUrls Type: string[] Details: E..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:locale:alternate","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-01-10T18:07:54.000Z"}],["meta",{"property":"article:modified_time","content":"2025-01-10T18:07:54.000Z"}],["link",{"rel":"alternate","hreflang":"zh-cn","href":"https://ecosystem.vuejs.press/ecosystem/zh/plugins/seo/sitemap/config.html"}],["link",{"rel":"alternate","type":"application/atom+xml","href":"https://ecosystem.vuejs.press/ecosystem/atom.xml","title":"VuePress Ecosystem Atom Feed"}],["link",{"rel":"alternate","type":"application/json","href":"https://ecosystem.vuejs.press/ecosystem/feed.json","title":"VuePress Ecosystem JSON Feed"}],["link",{"rel":"alternate","type":"application/rss+xml","href":"https://ecosystem.vuejs.press/ecosystem/rss.xml","title":"VuePress Ecosystem RSS Feed"}]]},"git":{"updatedTime":1736532474000,"contributors":[{"name":"Mister-Hope","username":"Mister-Hope","email":"mister-hope@outlook.com","commits":5,"avatar":"https://avatars.githubusercontent.com/Mister-Hope?v=4","url":"https://github.com/Mister-Hope"}],"changelog":[{"hash":"ae96c427eeb664c8d361963d1815a68386856bbe","time":1736532474000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"docs: add icons to docs (#332)"},{"hash":"abd787c6f128028703d28a7bc8128bb1d4ab92f4","time":1716961207000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"chore: update repo structure (#159)"},{"hash":"247c792961069abbb1b5152be09bdfb1a3aa4458","time":1706723991000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"feat(plugin-sitemap): rename excludeUrls to excludePaths (#45)"},{"hash":"267f388c6ee4d3d5a44f42ddd16583569cfe97af","time":1706627619000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"feat(plugin-sitemap): add sitemap plugin (#37)"},{"hash":"bd72368cf00335793e2c376b162546be05724636","time":1706625181000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"docs: improve docs"}]},"autoDesc":true,"filePathRelative":"plugins/seo/sitemap/config.md"}');export{f as comp,g as data};
