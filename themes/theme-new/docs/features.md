# 功能一览

`@vuepress/theme-new` 是一个「薄布局层」主题：主题只提供布局与样式，功能尽量交给生态中已有的插件。本页按功能分区介绍主题提供了什么、由谁提供，作为了解这个主题的入口。

相关文档：

- [与 `@vuepress/theme-default` 的对应关系](./theme-default.md)：老主题的配置项在新主题中的等价写法。
- [功能覆盖与计划](./coverage.md)：逐项功能对照表。
- [实现差异与取舍](./differences.md)：与 VitePress 默认主题的差异及原因。

## 布局与页面类型

| 功能       | 提供方               | 说明                                                                                    |
| ---------- | -------------------- | --------------------------------------------------------------------------------------- |
| 布局外壳   | 主题                 | 只注册 `Layout` 与 `NotFound` 两个布局。`Layout` 包含导航栏、侧边栏、内容区、页脚等骨架 |
| 页面类型   | 主题                 | frontmatter `type: home \| doc \| page \| content`，默认 `doc`                          |
| 404 页面   | VuePress 核心 + 主题 | VuePress 自动生成 `/404.html` 并解析到 `NotFound`；主题把 404 渲染在常规布局外壳内      |
| 自定义布局 | VuePress 核心        | 通过 frontmatter `layout: CommentPage` 指定已注册的自定义布局                           |

`type` 的语义：

- `home`：首页，渲染 hero、features 等内容区。
- `doc`：文档页（默认值），渲染标题、正文、右侧大纲、上下篇导航。
- `page`：空白页面容器，只渲染内容区，不带文档页的辅助元素。
- `false`：只渲染页面内容，不渲染布局外壳（导航栏、侧边栏等）。

## 导航栏

| 功能            | 提供方      | 说明                                                       |
| --------------- | ----------- | ---------------------------------------------------------- |
| 站点标题 / Logo | 主题        | `siteTitle`、`logo`、`logoLink`                            |
| 导航菜单        | 主题        | `nav`，支持下拉分组与外部链接                              |
| 语言菜单        | 主题        | 由主题数据中的 `locales` 自动生成                          |
| 外观切换        | 主题        | 明暗模式切换按钮，文案 `darkModeSwitchLabel` 等            |
| 搜索入口        | 插件 + 主题 | 主题只挂载插件注册的全局 `SearchBox` 组件                  |
| 移动端菜单      | 主题        | 汉堡按钮 + 全屏菜单                                        |
| 无障碍标签      | 主题        | `navMenuLabel`、`mobileMenuLabel`、`skipToContentLabel` 等 |

## 侧边栏与文档页

| 功能            | 提供方      | 说明                                                                                                                           |
| --------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------ |
| 侧边栏          | 主题        | `sidebar` 支持数组与按路径分组两种写法，支持分组折叠与当前项高亮；默认 `'heading'` 按页面标题自动生成，`sidebarDepth` 控制深度 |
| 页面贡献者      | 插件 + 主题 | `@vuepress/plugin-git` 收集，主题渲染在文档页脚，`contributors` / `contributorsText` 可配置                                    |
| 右侧大纲        | 主题        | `outline` 控制标题级别与标签；滚动高亮由 `@vuepress/plugin-active-header-links` 驱动                                           |
| 上一页 / 下一页 | 主题        | `docFooter` 配置文案，默认从侧边栏顺序推导                                                                                     |
| 编辑此页        | 主题        | `editLink` 配置 `pattern` 与 `text`，`:path` 会替换为页面源文件路径                                                            |
| 最后更新时间    | 插件 + 主题 | `@vuepress/plugin-git` 提供时间，主题负责展示，`lastUpdated` 配置文案与格式                                                    |
| 正文样式        | 主题        | 文档排版、表格、代码块外壳、标题锚点等                                                                                         |

## 首页

| 功能      | 提供方 | 说明                                                                               |
| --------- | ------ | ---------------------------------------------------------------------------------- |
| Hero 区域 | 主题   | frontmatter `hero`：`name`、`text`、`tagline`、`image`、`actions`                  |
| 特性网格  | 主题   | frontmatter `features`：`icon`（emoji、图片或 Iconify 图标名）、`title`、`details` |
| 团队页    | 主题   | frontmatter `team` + 组件，支持分组展示成员                                        |
| 赞助商    | 主题   | frontmatter `sponsors`，支持多档赞助商                                             |
| 首页内容  | 主题   | 首页正文写在 Markdown 中，渲染在 hero/features 之后                                |

## 页脚与 404

| 功能           | 提供方 | 说明                                                               |
| -------------- | ------ | ------------------------------------------------------------------ |
| 页脚           | 主题   | `footer.message`、`footer.copyright`                               |
| 404 文案与跳转 | 主题   | `notFound.title`、`quote`、`link`、`linkText`、`linkLabel`、`code` |

## 暗色模式

| 功能       | 提供方 | 说明                                                                                |
| ---------- | ------ | ----------------------------------------------------------------------------------- |
| 颜色模式   | 主题   | 只用 `<html data-theme="light \| dark">`，不使用 `dark` 类                          |
| 首屏无闪烁 | 主题   | 构建期把 `appearance` 写进 `data-appearance`，内联脚本据此在首屏前设置 `data-theme` |
| 持久化     | 主题   | 读取 `localStorage` 的 `vuepress-color-scheme`                                      |
| 插件互通   | 主题   | 通过 `@vuepress/helper/client` 的 `darkModeSymbol` 暴露状态，生态插件可直接读取     |

`appearance` 取值：`true`（默认，跟随系统并可切换）、`'dark'`（初始深色）、`'light'`（初始浅色）、`false`（固定浅色）、`'force-dark'` / `'force-auto'`（固定深色 / 固定跟随系统，隐藏切换按钮），也支持传给 `useDark` 的选项对象。

## 多语言

多语言站点必须在 VuePress 站点配置的 `locales` 中声明语言（VuePress 的多语言模型），主题不再单独声明语言集合；主题的 `locales` 只提供各语言的主题级配置（标题、导航、侧边栏、文案等）。

| 功能         | 提供方      | 说明                                                                     |
| ------------ | ----------- | ------------------------------------------------------------------------ |
| 主题多语言   | 插件 + 主题 | 主题数据按路由语言路径合并，`locales` 中的主题配置会覆盖根配置           |
| 语言菜单     | 主题        | 根据主题 `locales` 生成语言菜单，路由语言由站点 `locales` 决定           |
| 语言切换路径 | 主题        | 切到目标语言的对应页面（当前页面在目标语言下的路径，保留 query 与 hash） |

## Markdown 扩展

| 功能                 | 提供方                           | 说明                                                                                                                                                                                                       |
| -------------------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 提示容器             | `@vuepress/plugin-markdown-hint` | `::: tip`、`info`、`note`、`warning`、`caution`、`important`、`details`，支持 `{no-title}`；`danger` 渲染为 `caution`；标题文案可用主题选项 `tip` / `warning` / `danger` / `important` / `note` 按语言覆盖 |
| 代码组               | `@vuepress/plugin-markdown-tab`  | `::: code-tabs` + `@tab`，主题提供与自身风格一致的样式                                                                                                                                                     |
| 标题锚点             | 主题                             | 标题文本内部渲染锚点链接，适配 VuePress 的标题 DOM                                                                                                                                                         |
| 外链图标             | 主题                             | `externalLinkIcon` 控制外链图标                                                                                                                                                                            |
| `v-pre` / `raw` 容器 | 主题                             | 保留 VitePress 的两个容器扩展                                                                                                                                                                              |

## 由插件提供的能力

| 能力              | 插件                                                                                                                          | 默认                                                |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| 搜索              | `@vuepress/plugin-slimsearch`、`plugin-orama`、`plugin-flexsearch`、`plugin-search`、`plugin-docsearch`、`plugin-meilisearch` | 由站点选择安装，主题自动挂载                        |
| 复制代码          | `@vuepress/plugin-copy-code`                                                                                                  | 启用                                                |
| 进度条            | `@vuepress/plugin-nprogress`                                                                                                  | 启用                                                |
| 图片缩放          | `@vuepress/plugin-medium-zoom`                                                                                                | 启用                                                |
| 图标              | `@vuepress/plugin-icon`                                                                                                       | 启用，`themePlugins.icon` 可透传或设为 `false` 关闭 |
| 代码高亮          | `@vuepress/plugin-shiki`                                                                                                      | 启用，`github-light` / `github-dark`                |
| 最后更新时间      | `@vuepress/plugin-git`                                                                                                        | 启用，只取更新时间；贡献者由主题渲染                |
| 主题数据          | `@vuepress/plugin-theme-data`                                                                                                 | 启用                                                |
| 当前标题高亮      | `@vuepress/plugin-active-header-links`                                                                                        | 启用                                                |
| Markdown 提示容器 | `@vuepress/plugin-markdown-hint`                                                                                              | 启用                                                |
| Markdown Tab      | `@vuepress/plugin-markdown-tab`                                                                                               | 启用代码组                                          |

## 主题配置

主题选项由主题自己的 `ThemeConfig` 类型定义，只包含主题实际支持的字段；VitePress 专有的配置项会被类型检查拒绝。字段列表见 [`ThemeConfig`](../src/shared/types.ts) 与 [与 `@vuepress/theme-default` 的对应关系](./theme-default.md)。

`themePlugins` 可以逐项配置或关闭主题接线的插件：

```ts
themeNew({
  themePlugins: {
    icon: { offline: true, scan: {} },
    mediumZoom: false,
    nprogress: false,
  },
})
```

## 公共 API

服务端（`@vuepress/theme-new`）：

- `themeNew(options)`：创建主题。
- `ThemeNewOptions`、`ThemeConfig`、`ThemePageData`、`DefaultTheme`（组件用的类型命名空间）。

客户端（`@vuepress/theme-new/client`）：

- 布局与组件：`Layout`、`NotFound`、`VP*` 组件（`VPBadge`、`VPButton`、`VPFeatures`、`VPHero`、`VPTeamPage`、`VPSocialLinks` 等）。
- `useLayout()`：布局状态，包括是否首页、侧边栏、大纲、是否有 aside 等。
- `usePageType()`：当前页面 `type`，默认 `doc`。
- 页面数据组合函数：`useThemePageData`、`useThemePageFrontmatter`、`useThemePageRelativePath`、`useThemePageLastUpdated`、`useThemePageIsNotFound`。
- `useContributors()`：当前页面的贡献者列表（受 `contributors` 选项与 frontmatter 控制）。
- 多语言：`useThemeLocaleData`、`useThemeLocalePath`、`useThemeLocales`、`resolveThemeLocalePath`。
- 暗色模式：`useDarkMode()`、`themeDarkModeSymbol`、`COLOR_MODE_STORAGE_KEY`、`createDarkModeRef()`。

## 构建与首屏

- 模板：`templates/build.html`，注入 `data-appearance`、`lang` 与 VuePress 的 SSR 出口。
- 客户端构建：`tsdown` 的 `unbundle` 模式，保留 `.vue` 组件与 CSS 资源，由站点侧 bundler 编译。
- 样式：VitePress 默认主题样式经 `vp-` 类名与 `data-theme` 适配；主题额外引入 `@vuepress/helper/colors.css` 调色板。
