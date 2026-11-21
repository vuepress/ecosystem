# VitePress 默认主题功能覆盖

本主题只迁移 VitePress 默认主题的**布局与样式**，并遵循 VuePress 生态约定：主题只负责布局，功能由插件提供。下表逐项列出 VitePress 默认主题的功能在本主题中的覆盖方式。

图例：**主题** —— 由本主题自身提供（布局或样式）；**插件** —— 由生态已有插件提供（主题已接线，或由用户自行启用）；**缺失** —— 暂未覆盖，并给出补全计划。

| 功能                                    | 状态 | 实现                                                                                                                                                                                                 |
| --------------------------------------- | ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 布局：导航、侧边栏、大纲、文档页脚      | 主题 | `src/client/theme-default/components/*`                                                                                                                                                              |
| 布局：首页（Hero、Features、Sponsors）  | 主题 | `VPHome*`、`VPHero`、`VPFeatures`、`VPSponsors*`                                                                                                                                                     |
| 布局：团队成员页                        | 主题 | `VPTeam*` 组件 + frontmatter                                                                                                                                                                         |
| 布局：404 页面                          | 主题 | `NotFound.vue`，注册为 `NotFound` 布局并渲染在常规布局外壳内                                                                                                                                         |
| 布局：页脚、上一篇/下一篇、编辑链接     | 主题 | `VPFooter`、`VPDocFooter`、`usePrevNext`、`useEditLink`                                                                                                                                              |
| 布局：大纲及当前标题高亮                | 主题 | `VPDocAsideOutline` 负责展示，`useActiveAnchor` 只根据 `route.hash` 反射高亮；滚动时更新 hash 由插件完成                                                                                             |
| 布局：移动端「回到顶部」                | 主题 | `VPLocalNavOutlineDropdown`                                                                                                                                                                          |
| 布局：跳转链接、无障碍标签              | 主题 | `VPSkipLink`、aria 标签                                                                                                                                                                              |
| 布局：明暗模式切换                      | 主题 | `VPSwitchAppearance` + `appearance` 配置项；状态写在 `<html data-theme>` 上，并同步到插件读取的 `darkModeSymbol`                                                                                     |
| 样式：排版、代码块                      | 主题 | `src/client/theme-default/styles/**`（提示容器样式由插件自带，主题只覆盖其 CSS 变量）                                                                                                                |
| Markdown：提示容器（`::: tip` 等）      | 插件 | `@vuepress/plugin-markdown-hint`（`hint: true, alert: true`）：插件负责解析、渲染与样式（`.hint-container`），主题只覆盖 `--hint-*` 与调色板变量（见[差异](./differences.md)）                       |
| Markdown：`v-pre` / `raw` 容器          | 主题 | `src/node/containers.ts`（`@vuepress/plugin-markdown-container` 极简 render，hint 插件不覆盖这两个 VitePress 扩展）                                                                                  |
| Markdown：代码组                        | 插件 | `@vuepress/plugin-markdown-tab`（`codeTabs: true`，主题已接线）；语法为 `::: code-tabs` + `@tab`，不再支持 VitePress 的 `::: code-group`（见[差异](./differences.md)）                               |
| Markdown：外链图标                      | 主题 | `styles/components/vp-doc.css`                                                                                                                                                                       |
| Markdown：标题锚点                      | 主题 | VuePress 把标题文本包在 `.header-anchor` 链接内，主题按此 DOM 调整 `styles/components/vp-doc.css` 与 `composables/outline.ts`（VitePress 的 hover `#` 图标不再提供，见[差异](./differences.md)）     |
| 搜索 UI                                 | 插件 | 任意注册全局 `SearchBox` 的搜索插件（`@vuepress/plugin-slimsearch`、`plugin-orama`、`plugin-flexsearch`、`plugin-docsearch`、`plugin-meilisearch`、`plugin-search`）                                 |
| 复制代码按钮                            | 插件 | `@vuepress/plugin-copy-code`（主题已接线）                                                                                                                                                           |
| 基于 Git 的「最后更新时间」             | 插件 | `@vuepress/plugin-git`（主题已接线）                                                                                                                                                                 |
| 代码高亮                                | 插件 | `@vuepress/plugin-shiki`（主题已接线）                                                                                                                                                               |
| 主题数据 / 多语言                       | 插件 | `@vuepress/plugin-theme-data`（主题已接线）                                                                                                                                                          |
| NProgress 进度条                        | 插件 | `@vuepress/plugin-nprogress`（主题已接线；颜色取自 `--vp-c-accent`，主题的调色板别名已提供）                                                                                                         |
| Medium zoom 图片缩放                    | 缺失 | 用户可自行启用 `@vuepress/plugin-medium-zoom`，但默认选择器需改为 `.vp-doc img`。计划：增加可选主题配置并预设正确选择器。                                                                            |
| 任意 Iconify 集合的图标                 | 插件 | `@vuepress/plugin-icon`（主题已接线，`assets: 'iconify'`）：图标由 `<iconify-icon>` Web Component 在客户端渲染，支持任意 Iconify 集合与图标服务。SSR HTML 中只有空元素，无 JavaScript 或离线时不显示 |
| `features[].icon` 使用 Iconify 名称     | 主题 | Feature 图标支持 emoji、`{ svg }` 对象，以及含 `:` 的 Iconify 名称（交给插件注册的 `VPIcon` 渲染）                                                                                                   |
| 本地搜索 UI（`VPLocalSearchBox`）       | 缺失 | 有意不移植：搜索由插件提供。VitePress 内置本地搜索 UI 由生态搜索插件替代。                                                                                                                           |
| Algolia 搜索 UI（`VPAlgoliaSearchBox`） | 缺失 | 有意不移植：请使用 `@vuepress/plugin-docsearch`。                                                                                                                                                    |
| Carbon 广告                             | 缺失 | 不支持，见[不支持的 VitePress 功能](./unsupported.md)。                                                                                                                                              |

## 说明

- 主题只在导航栏挂载一个 `<SearchBox v-if="hasSearchBox" />`，不自带任何搜索实现、索引、worker 或语言数据——这些都属于搜索插件。
- 复制代码插件的选择器为 `selector: '[vp-content] div[class*="language-"] pre'`，因为主题的内容根节点带有 `vp-content` 属性，与生态插件的选择器约定一致。
- 提示容器由 `@vuepress/plugin-markdown-hint` 解析、渲染并自带样式（`.hint-container`，每个容器带图标，`details` 为原生可折叠元素）。主题不写容器样式：它引入 `@vuepress/helper/colors.css` 提供插件依赖的调色板，再在 `styles/vars.css` 里覆盖 `--hint-font-size` 等少量 CSS 变量。`v-pre`、`raw` 两个 VitePress 扩展仍由主题用 `@vuepress/plugin-markdown-container` 的极简 render 提供（见[差异](./differences.md)）。代码组由 `@vuepress/plugin-markdown-tab` 提供（`codeTabs: true`），主题本身不注册 Markdown 解析器。
- 图标由 `@vuepress/plugin-icon` 提供（在线 iconify Web Component 模式）：主题不再于构建期生成图标 CSS，也不依赖 `@iconify-json/*` 包。代价是首屏 HTML 中图标为空、hydrate 后才出现，且依赖图标服务可用；需要构建期图标的站点可改用插件的离线模式（站点需自行安装 `iconify-icon` 与对应的 `@iconify-json/<prefix>`）。
- 主题只注册 `Layout` 与 `NotFound` 两个布局，页面类型由主题自己的 frontmatter 字段 `type` 决定：`home` 渲染首页、`doc`（默认）渲染文档页、`page` 渲染空白页面容器、`false` 只渲染页面内容而不渲染布局外壳。组件的判断统一走 `usePageType()`（`useLayout().isHome`、`Layout.vue`、`VPContent.vue`），`extendsPage` 不再改写 `layout`。`layout` frontmatter 只用于指定已注册的布局名（自定义布局、`NotFound`）；`NotFound` 必须单独注册：VuePress 核心在 `extendsPage` 之后才给内置 `/404.html` 设置 `frontmatter.layout = 'NotFound'`。
