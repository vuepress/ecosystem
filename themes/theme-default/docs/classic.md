# 与 `@vuepress/theme-classic` 的对应关系

本主题已接替原默认主题：原 `@vuepress/theme-default` 改名为 `@vuepress/theme-classic`（下称 classic），`@vuepress/theme-default` 现在指向本主题。本主题的目标是**与 classic 保持功能等价**：布局与样式是新的，但 classic 的每个配置项都应有等价写法，classic 没有的新功能单独记录。

本文按「配置项 → 等价写法 → 无等价项」整理。并非要求配置字段同名，只要求能力等价。

## 配置项对照

### 总体

| classic（`@vuepress/theme-classic`） | `@vuepress/theme-default` 等价写法 | 说明                                                                                                                   |
| ------------------------------------ | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `hostname`                           | `hostname`                         | 同名同义：配置后自动接线 `plugin-seo` 与 `plugin-sitemap`，可用 `themePlugins.seo` / `themePlugins.sitemap` 关闭       |
| `themePlugins`                       | `themePlugins`                     | 每项都可设为 `false` 关闭；带配置项的插件也可传对象，`activeHeaderLinks`、`nprogress` 为布尔开关（见下方「插件开关」） |
| `locales`                            | `locales`（键名不同）              | classic键为路由路径 `/`、`/zh/`；新主题键为 VitePress 风格 `root`、`zh`，内部会转换为路由路径                          |

### 颜色模式

| classic                  | 新主题                             | 说明                                                                                                            |
| ------------------------ | ---------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `colorMode: 'auto'`      | `appearance: true`（默认，可省略） | 跟随系统，可切换                                                                                                |
| `colorMode: 'dark'`      | `appearance: 'dark'`               | 初始深色，可切换                                                                                                |
| `colorMode: 'light'`     | `appearance: false`                | 固定浅色                                                                                                        |
| `colorModeSwitch: false` | 无等价项                           | 新主题的切换按钮默认显示；可固定 `appearance` 为 `false` / `'force-dark'` / `'force-auto'` 隐藏，见「颜色模式」 |

classic 没有的能力：`appearance: 'force-dark'` / `'force-auto'`（固定深色 / 固定跟随系统，不显示切换按钮），这是从 VitePress 语义保留的新功能。

### 导航栏

classic 的 `navbar` 是一个 `AutoLinkOptions` 数组，支持 `prefix`、`children`；新主题使用 VitePress 风格 `nav`。

| classic                                                                 | 新主题等价写法                                                                           |
| ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `navbar: ['/guide/']`                                                   | `nav: [{ text: '指南', link: '/guide/' }]` 或 `nav: [{ text: '指南', link: '/guide/' }]` |
| `navbar: [{ text: 'Guide', link: '/guide/' }]`                          | `nav: [{ text: 'Guide', link: '/guide/' }]`                                              |
| `navbar: [{ text: 'Guide', children: [...] }]`                          | `nav: [{ text: 'Guide', items: [...] }]`（`children` → `items`）                         |
| `navbar: [{ text: 'Guide', prefix: '/guide/', children: [...] }]`       | 无直接等价，需把 `prefix` 展开到每个子项 `link`                                          |
| `navbar: false`                                                         | `nav: []`（不渲染导航菜单）                                                              |
| `navbarLabel` / `pageNavbarLabel`                                       | `navMenuLabel` / `mobileMenuLabel`                                                       |
| `logo` / `logoDark` / `logoAlt`                                         | `logo: string \| { light, dark, alt }`                                                   |
| `home`                                                                  | `logoLink`（Logo 链接）与 404 的 `notFound.link`；首页路径默认自动推导                   |
| `siteTitle`                                                             | `siteTitle`                                                                              |
| `repo` / `repoLabel`                                                    | `socialLinks: [{ icon: 'github', link: repo }]`；也可放在 `nav` 的额外菜单               |
| `selectLanguageText` / `selectLanguageAriaLabel` / `selectLanguageName` | `langMenuLabel` + `locales.<key>.label`                                                  |

新增能力：导航栏与侧边栏图标（`icon` 字段）、Hero 默认渐变、`socialLinks`、`extraMenuLabel`、`skipToContentLabel`、`returnToTopLabel`、`gradedContainers`。

### 插件开关

| classic                                                                                               | 新主题等价写法                                                                                                                                                                                    |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `themePlugins: { nprogress: false, mediumZoom: false }`                                               | 同名同义                                                                                                                                                                                          |
| `themePlugins: { copyCode: { ... }, git: { ... }, hint: { ... }, tab: { ... }, mediumZoom: { ... } }` | `themePlugins: { copyCode: { ... }, git: { ... }, markdownHint: { ... }, markdownTab: { ... }, icon: { ... }, mediumZoom: { ... } }`                                                              |
| `themePlugins: { activeHeaderLinks: false }`                                                          | 同名同义                                                                                                                                                                                          |
| `themePlugins: { backToTop, linksCheck, seo, sitemap }`                                               | 同名同义（`seo` / `sitemap` 需要先配置 `hostname`）                                                                                                                                               |
| `themePlugins: { prismjs }`                                                                           | 无等价项：新主题使用 Shiki；需要 Prism 时把 `themePlugins.shiki` 设为 `false`，再在站点 `plugins` 中注册 `prismjsPlugin()`                                                                        |
| 无对应开关（classic不提供 `v-pre` / `raw` 容器）                                                      | 新主题额外接线 `@vuepress/plugin-markdown-ext`（`vPre: true`）与 `@vuepress/plugin-markdown-raw`（默认开启样式隔离），可分别用 `themePlugins.markdownExt` / `themePlugins.markdownRaw` 配置或关闭 |

### 侧边栏与文档页

| classic                                                  | 新主题等价写法                                      | 说明                                                                                                   |
| -------------------------------------------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `sidebar: 'heading'`                                     | `sidebar: 'heading'`（默认）                        | 从当前页标题生成侧边栏                                                                                 |
| `sidebar: [...]` / `{ '/guide/': [...] }`                | 同形（VitePress 风格对象数组）                      | 新主题分组用 `text` / `items` / `link`，不接受字符串条目                                               |
| `sidebar: false`                                         | `sidebar: false`                                    | 支持（关闭自动侧边栏）                                                                                 |
| `sidebarDepth`                                           | `sidebarDepth`（默认 2）                            | 控制自动侧边栏的标题深度；右侧大纲仍由 `outline.level` 控制（默认 `2`）                                |
| `editLink: boolean`                                      | `editLink: { pattern, text }`                       | 关闭时省略该选项                                                                                       |
| `editLinkText`                                           | `editLink.text`                                     |                                                                                                        |
| `editLinkPattern`                                        | `editLink.pattern`，其中 `:path` 会替换为源文件路径 |                                                                                                        |
| `docsRepo` / `docsBranch` / `docsDir`                    | 无等价项                                            | 直接写成完整的 `editLink.pattern`                                                                      |
| `lastUpdated: boolean`                                   | `lastUpdated: boolean \| { text, formatOptions }`   |                                                                                                        |
| `lastUpdatedText`                                        | `lastUpdated.text`                                  |                                                                                                        |
| `contributors` / `contributorsText`                      | 同名                                                | 文档页脚渲染贡献者列表，数据来自 `@vuepress/plugin-git`                                                |
| `prev` / `next`                                          | `docFooter.prev` / `docFooter.next`                 | 支持 `string` / `false`                                                                                |
| `externalLinkIcon`                                       | `externalLinkIcon`                                  | 同名同义                                                                                               |
| `tip` / `warning` / `danger` / `important` / `note` 文案 | 同名主题选项                                        | 主题会转成 `@vuepress/plugin-markdown-hint` 的 `locales`                                               |
| `backToTop`（经典主题插件）                              | `themePlugins.backToTop`                            | 接线同一个插件，默认启用，配置项透传；移动端本地导航里的「返回顶部」另由主题的 `returnToTopLabel` 控制 |
| `linksCheck`（经典主题插件）                             | `themePlugins.linksCheck`                           | 默认启用，配置项透传给 `@vuepress/plugin-links-check`                                                  |
| `prismjs` 主题配置                                       | `@vuepress/plugin-shiki`                            | 新主题默认使用 Shiki（`github-light` / `github-dark`），不再使用 Prism                                 |
| `palettePlugin` / `userStyle`                            | `userStyle`（`.vuepress/styles/index.css`）         | 主题注册纯 CSS 的用户样式入口，覆盖 CSS 自定义属性；需要 Sass 调色板时在站点注册 `palettePlugin`       |

### 首页与 404

| classic                                   | 新主题等价写法                                                | 说明                                              |
| ----------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------- |
| frontmatter `home: true`                  | frontmatter `type: home`                                      | 新主题用 `type` 表达页面类型                      |
| `heroImage` / `heroImageDark` / `heroAlt` | `hero.image`                                                  | VitePress 风格对象                                |
| `heroText`                                | `hero.name`                                                   |                                                   |
| `tagline`                                 | `hero.text`                                                   |                                                   |
| `actions`                                 | `hero.actions`                                                | 每项 `{ text, link, theme }`                      |
| `features: [{ title, details }]`          | `features: [{ icon, title, details, link? }]`                 | 新增图标；图标支持 emoji、图片对象或 Iconify 名称 |
| `footer`（首页字符串）                    | `footer.message` / `footer.copyright`                         | 主题级页脚配置                                    |
| `notFound: string[]`                      | `notFound: { title, quote, link, linkLabel, linkText, code }` | 改为对象，语义更明确                              |
| `backToHome`                              | `notFound.linkText`                                           |                                                   |

新增能力：导航栏与侧边栏图标（`icon` 字段）、Hero 默认渐变、`VPTeamPage*` / `VPTeamMembers`、`VPSponsors*` 组件，以及 `VPHomeContent` 等区块组件。

### 无障碍文案

| classic           | 新主题等价写法                                                                                    |
| ----------------- | ------------------------------------------------------------------------------------------------- |
| `openInNewWindow` | 无等价项（文案内置）                                                                              |
| `toggleColorMode` | `darkModeSwitchLabel`                                                                             |
| `toggleSidebar`   | `sidebarMenuLabel`                                                                                |
| ——                | 新增 `navMenuLabel`、`mobileMenuLabel`、`langMenuLabel`、`skipToContentLabel`、`returnToTopLabel` |

## 页面数据与 frontmatter

| classic                                                                        | 新主题等价物                                                                         |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `ClassicThemeData` / `ClassicThemeLocaleOptions`                               | `ThemeConfig`（`locales` 支持多语言覆盖）                                            |
| `ClassicThemePageData`（`filePathRelative`、`git`）                            | `ThemePageData`（`path`、`title`、`lang`、`frontmatter`、`filePathRelative`、`git`） |
| `ClassicThemeNormalPageFrontmatter`                                            | `ThemePageFrontmatter`（新增 `type`，其余字段按需扩展）                              |
| `home: true`                                                                   | `type: home`                                                                         |
| `navbar: false`                                                                | 无等价项（导航菜单由主题配置的 `nav` 决定）                                          |
| `sidebar: ...` / `sidebarDepth` / `editLink` / `lastUpdated` / `prev` / `next` | 与主题选项同名，见上表                                                               |
| ——                                                                             | 新增 `type`、`hero`、`features`、`outline`、`pageClass` 等字段                       |

## 客户端 API 与组件

| classic导出                                                                              | 新主题等价物                                                                | 说明                                                              |
| ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `useData()`                                                                              | `useThemePageData()` + `useThemePageFrontmatter()` + `useThemeLocaleData()` | 新主题基于 `vuepress/client` 与 `plugin-theme-data` 原生 API 组合 |
| `useDarkMode()`                                                                          | `useDarkMode()` + `darkModeSymbol`                                          | 状态通过 `@vuepress/helper/client` 的 `darkModeSymbol` 互通       |
| `useEditLink()`                                                                          | 主题内部实现                                                                | 未公开导出                                                        |
| `useHeaders()` / `setupHeaders()`                                                        | 无等价项                                                                    | 新主题的大纲直接从 DOM 读取                                       |
| `useSidebarItems()`                                                                      | 无等价项                                                                    | 侧边栏状态由内部组合函数维护                                      |
| `useNavbarConfig()` / `useNavbarRepo()` / `useNavbarSelectLanguage()`                    | 无等价项                                                                    | 导航与语言菜单由内部组合函数维护                                  |
| `useNavigate()` / `useRelatedLinks()` / `useScrollPromise()` / `useUpdateDeviceStatus()` | 无等价项                                                                    |                                                                   |
| `resolveEditLink()`、`resolvePrefix()`、`resolveRepoType()`、`isActiveSidebarItem()`     | 内部实现                                                                    | 不作为公开 API                                                    |
| `@theme/*` 组件别名（可替换组件）                                                        | 不支持                                                                      | 新主题通过 `exports` 暴露组件与样式，但不提供按文件替换的机制     |

新主题公开的客户端 API：默认导出与 `VP*` 组件、`useLayout()`、`usePageType()`、页面数据组合函数（`useThemePageData()` 等）、`useThemeLocalePath()` / `useThemeLocales()`、暗色模式组合函数、若干类型；`Layout` 通过默认导出提供，`NotFound` 为内部组件。详见 [功能一览](./features.md#公共-api)。

### 提示容器文案

| classic              | 新主题等价写法               |
| -------------------- | ---------------------------- |
| `tip` / `warning`    | 同名选项                     |
| `danger`             | `danger`（渲染为 `caution`） |
| `important` / `note` | 同名选项                     |

提示容器的解析与样式由 `@vuepress/plugin-markdown-hint` 提供，主题只把上述文案按语言传给插件的 `locales`。

## 无等价项清单（待补）

以下classic能力目前在新主题中没有等价项，已逐条记录，后续按优先级补全：

1. `repo` 的仓库图标与 `repoLabel`、`docsRepo` / `docsBranch` / `docsDir` 的自动编辑链接推导（可用完整 `editLink.pattern` 替代）。
2. `colorModeSwitch`、`openInNewWindow`、`home` 等文案/行为开关。
3. `@theme/*` 组件覆盖机制。
4. `useHeaders` / `useSidebarItems` 等对外组合函数。
