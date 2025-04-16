import{_ as a,c as i,d as o,a as r,e as t,b as n,w as c,r as p,o as d}from"./app-Hy3CkDjp.js";const l={};function m(u,e){const s=p("RouteLink");return d(),i("div",null,[e[3]||(e[3]=o('<h1 id="giscus" tabindex="-1"><a class="header-anchor" href="#giscus"><span>Giscus</span></a></h1><p>Giscus is a commenting system based on GitHub Discussion that is easy to start.</p><h2 id="preparation" tabindex="-1"><a class="header-anchor" href="#preparation"><span>Preparation</span></a></h2><ol><li><p>Create a public repository and open discussion panel as a place to store comments.</p></li><li><p>Install the <a href="https://github.com/apps/giscus" target="_blank" rel="noopener noreferrer">Giscus App</a> to have permission to access the corresponding repository.</p></li><li><p>After completing the above steps, please go to the <a href="https://giscus.app" target="_blank" rel="noopener noreferrer">Giscus page</a> to get your settings.</p><p>You just need to fill in the repository and Discussion categories, then scroll to the &quot;Enable giscus&quot; section at the bottom of the page and obtain four attributes: <code>data-repo</code>, <code>data-repo-id</code>, <code>data-category</code> and <code>data-category-id</code>.</p></li></ol><h2 id="config" tabindex="-1"><a class="header-anchor" href="#config"><span>Config</span></a></h2><p>Please set <code>provider: &quot;Giscus&quot;</code> and pass <code>data-repo</code>, <code>data-repo-id</code>, <code>data-category</code> and <code>data-category-id</code> as plugin options as <code>repo</code>, <code>repoId</code>, <code>category</code> <code>categoryId</code>.</p>',6)),r("p",null,[e[1]||(e[1]=t("For other options, see ")),n(s,{to:"/plugins/blog/comment/giscus/config.html"},{default:c(()=>e[0]||(e[0]=[t("Giscus Config")])),_:1}),e[2]||(e[2]=t("."))]),e[4]||(e[4]=o('<h2 id="theme" tabindex="-1"><a class="header-anchor" href="#theme"><span>Theme</span></a></h2><p>By default, the theme of Giscus is <code>light</code> or <code>dark</code> (based on darkmode status).</p><div class="hint-container tip"><p class="hint-container-title">Dark Mode</p><p>To let Giscus apply the correct theme, you need to pass a boolean value to <code>&lt;CommentService /&gt;</code> via <code>darkmode</code> property, indicating whether darkmode is currently enabled.</p></div><p>If you want to customize theme in lightmode and darkmode, you can set <code>lightTheme</code> and <code>darkTheme</code> option with a built-in theme keyword or a custom CSS link starting with <code>https://</code>.</p>',4))])}const g=a(l,[["render",m]]),y=JSON.parse('{"path":"/plugins/blog/comment/giscus/","title":"Giscus","lang":"en-US","frontmatter":{"icon":"github","description":"Giscus Giscus is a commenting system based on GitHub Discussion that is easy to start. Preparation Create a public repository and open discussion panel as a place to store comme...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Giscus\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-02-17T05:44:53.000Z\\",\\"author\\":[]}"],["meta",{"property":"og:url","content":"https://ecosystem.vuejs.press/plugins/blog/comment/giscus/"}],["meta",{"property":"og:site_name","content":"VuePress Ecosystem"}],["meta",{"property":"og:title","content":"Giscus"}],["meta",{"property":"og:description","content":"Giscus Giscus is a commenting system based on GitHub Discussion that is easy to start. Preparation Create a public repository and open discussion panel as a place to store comme..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:locale:alternate","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-02-17T05:44:53.000Z"}],["meta",{"property":"article:modified_time","content":"2025-02-17T05:44:53.000Z"}],["link",{"rel":"alternate","hreflang":"zh-cn","href":"https://ecosystem.vuejs.press/zh/plugins/blog/comment/giscus/"}],["link",{"rel":"alternate","type":"application/atom+xml","href":"https://ecosystem.vuejs.press/atom.xml","title":"VuePress Ecosystem Atom Feed"}],["link",{"rel":"alternate","type":"application/json","href":"https://ecosystem.vuejs.press/feed.json","title":"VuePress Ecosystem JSON Feed"}],["link",{"rel":"alternate","type":"application/rss+xml","href":"https://ecosystem.vuejs.press/rss.xml","title":"VuePress Ecosystem RSS Feed"}]]},"git":{"updatedTime":1739771093000,"contributors":[{"name":"Mister-Hope","username":"Mister-Hope","email":"mister-hope@outlook.com","commits":4,"avatar":"https://avatars.githubusercontent.com/Mister-Hope?v=4","url":"https://github.com/Mister-Hope"}],"changelog":[{"hash":"bdcca84dd32f440dd97f7601108cde7e74d86e11","time":1739771093000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"chore: unify Darkmode to DarkMode"},{"hash":"ae96c427eeb664c8d361963d1815a68386856bbe","time":1736532474000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"docs: add icons to docs (#332)"},{"hash":"abd787c6f128028703d28a7bc8128bb1d4ab92f4","time":1716961207000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"chore: update repo structure (#159)"},{"hash":"5debe9d28cee2213933857b900455edb1b1e0643","time":1710145201000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"feat: add comment plugin (#87)"}]},"autoDesc":true,"filePathRelative":"plugins/blog/comment/giscus/README.md"}');export{g as comp,y as data};
