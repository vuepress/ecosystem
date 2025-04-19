import{_ as t,c as s,d as a,o}from"./app-BsF2ugWo.js";const i={};function l(c,e){return o(),s("div",null,e[0]||(e[0]=[a('<h1 id="配置" tabindex="-1"><a class="header-anchor" href="#配置"><span>配置</span></a></h1><h2 id="插件选项" tabindex="-1"><a class="header-anchor" href="#插件选项"><span>插件选项</span></a></h2><h3 id="id" tabindex="-1"><a class="header-anchor" href="#id"><span>id</span></a></h3><ul><li>类型: <code>string</code></li><li>必填: 是</li></ul><p>调色板的唯一 ID，用于避免重复注册。</p><h3 id="config" tabindex="-1"><a class="header-anchor" href="#config"><span>config</span></a></h3><ul><li>类型: <code>string</code></li><li>默认值: <code>`.vuepress/styles/${id}-palette.scss`</code></li></ul><p>用户配置文件路径，相对于源文件夹。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>这是用户设置样式变量的文件。</p><p>默认路径的文件名拥有上方的 ID 前缀。</p></div><h3 id="defaultconfig" tabindex="-1"><a class="header-anchor" href="#defaultconfig"><span>defaultConfig</span></a></h3><ul><li>类型: <code>string</code></li><li>默认值: <code>&quot;@vuepress/plugin-sass-palette/styles/default/config.scss&quot;</code></li></ul><p>默认的配置文件路径，应为绝对路径。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>这是你应该通过 <code>!default</code> 来提供默认样式变量的文件。</p></div><h3 id="palette" tabindex="-1"><a class="header-anchor" href="#palette"><span>palette</span></a></h3><ul><li>类型: <code>string</code></li><li>默认值: <code>`.vuepress/styles/${id}-palette.scss`</code></li></ul><p>用户的调色板文件路径，相对于源文件夹。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>这是用户控制注入 CSS 变量的文件。所有的变量会被转换为连字符格式然后被注入。</p><p>默认路径的文件名拥有上方的 ID 前缀。</p></div><h3 id="defaultpalette" tabindex="-1"><a class="header-anchor" href="#defaultpalette"><span>defaultPalette</span></a></h3><ul><li>类型: <code>string</code></li><li>默认值: <code>&quot;@vuepress/plugin-sass-palette/styles/default/palette.scss&quot;</code></li></ul><p>默认的调色板文件路径，应为绝对路径。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>这是你应该通过 <code>!default</code> 来提供默认调色板值的文件。所有的变量会被转换为连字符格式然后被注入。</p></div><h3 id="generator" tabindex="-1"><a class="header-anchor" href="#generator"><span>generator</span></a></h3><ul><li>类型: <code>string</code></li><li>必填: 否</li></ul><p>自定义的生成器，用于生成调色板配置的衍生值。</p><p>如: 你可能想要根据 <code>$theme-color</code> 的值提供一个 <code>$theme-color-light</code>。</p><h3 id="style" tabindex="-1"><a class="header-anchor" href="#style"><span>style</span></a></h3><ul><li>类型: <code>string</code></li><li>必填: 否</li></ul><p>用户的样式文件路径，相对于源文件夹。.</p><h2 id="别名" tabindex="-1"><a class="header-anchor" href="#别名"><span>别名</span></a></h2><p>可用的别名如下:</p><ul><li>配置: <code>@sass-palette/${id}-config</code> (基于 <code>id</code>)</li><li>调色板: <code>@sass-palette/${id}-palette</code> (基于 <code>id</code>)</li><li>样式: <code>@sass-palette/${id}-style</code> (仅在设置了 <code>style</code> 选项时可用)</li><li>助手: <code>@sass-palette/helper</code></li></ul>',31)]))}const n=t(i,[["render",l]]),r=JSON.parse('{"path":"/zh/plugins/development/sass-palette/config.html","title":"配置","lang":"zh-CN","frontmatter":{"icon":"settings-2","description":"配置 插件选项 id 类型: string 必填: 是 调色板的唯一 ID，用于避免重复注册。 config 类型: string 默认值: `.vuepress/styles/${id}-palette.scss` 用户配置文件路径，相对于源文件夹。 提示 这是用户设置样式变量的文件。 默认路径的文件名拥有上方的 ID 前缀。 defaultConf...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"配置\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-01-10T18:07:54.000Z\\",\\"author\\":[]}"],["meta",{"property":"og:url","content":"https://ecosystem.vuejs.press/ecosystem/zh/plugins/development/sass-palette/config.html"}],["meta",{"property":"og:site_name","content":"VuePress 生态系统"}],["meta",{"property":"og:title","content":"配置"}],["meta",{"property":"og:description","content":"配置 插件选项 id 类型: string 必填: 是 调色板的唯一 ID，用于避免重复注册。 config 类型: string 默认值: `.vuepress/styles/${id}-palette.scss` 用户配置文件路径，相对于源文件夹。 提示 这是用户设置样式变量的文件。 默认路径的文件名拥有上方的 ID 前缀。 defaultConf..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:locale:alternate","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2025-01-10T18:07:54.000Z"}],["meta",{"property":"article:modified_time","content":"2025-01-10T18:07:54.000Z"}],["link",{"rel":"alternate","hreflang":"en-us","href":"https://ecosystem.vuejs.press/ecosystem/plugins/development/sass-palette/config.html"}],["link",{"rel":"alternate","type":"application/atom+xml","href":"https://ecosystem.vuejs.press/ecosystem/zh/atom.xml","title":"VuePress 生态系统 Atom Feed"}],["link",{"rel":"alternate","type":"application/json","href":"https://ecosystem.vuejs.press/ecosystem/zh/feed.json","title":"VuePress 生态系统 JSON Feed"}],["link",{"rel":"alternate","type":"application/rss+xml","href":"https://ecosystem.vuejs.press/ecosystem/zh/rss.xml","title":"VuePress 生态系统 RSS Feed"}]]},"git":{"updatedTime":1736532474000,"contributors":[{"name":"Mister-Hope","username":"Mister-Hope","email":"mister-hope@outlook.com","commits":3,"avatar":"https://avatars.githubusercontent.com/Mister-Hope?v=4","url":"https://github.com/Mister-Hope"}],"changelog":[{"hash":"ae96c427eeb664c8d361963d1815a68386856bbe","time":1736532474000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"docs: add icons to docs (#332)"},{"hash":"abd787c6f128028703d28a7bc8128bb1d4ab92f4","time":1716961207000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"chore: update repo structure (#159)"},{"hash":"cf627013e21a8a937f5afc8cdf151fffa6ff2dde","time":1715007279000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"feat: add sass-palette plugin (#115)"}]},"autoDesc":true,"filePathRelative":"zh/plugins/development/sass-palette/config.md"}');export{n as comp,r as data};
