---
icon: git-compare
---

# 与 VitePress 的差异 {#differences-from-vitepress}

主题有意不追求对 VitePress 默认主题的逐字节复制。本页按关注点列出差异，并给出每项选择的原因、收益和取舍。

## 从 VitePress 迁移 {#migrating-from-vitepress}

主题借用了 VitePress 默认主题的布局和样式，但它是一个 VuePress 主题，因此迁移 VitePress 站点时，是把配置和内容搬进 VuePress，而不是换一个包。[VitePress 文档](https://vitepress.dev/)和 [VuePress 指南](https://vuepress.vuejs.org/guide/)分别描述了这两边，而[从经典主题迁移](./migrating-from-classic.md)则针对使用过原 VuePress 默认主题的站点，覆盖了同一类映射。

## class 前缀：`vp-` 而非 `VP` {#class-prefix-vp-instead-of-vp}

- **做法**：移植层所有公开 class 都从 `VPFoo` 改名为 `vp-foo`（`VPNavBar*` 变为 `vp-navbar*`）；根 class 是 `vp-theme-container` 和 `vp-not-found`。
- **原因**：生态要求所有 CSS class 使用 `vp-` 前缀，而站点的样式已经这样写了。
- **收益**：与生态一致；不会与第三方 VitePress 插件的 class 冲突；组件的作用域样式仍然有效，因为选择器是一起改名的。
- **取舍**：针对 `.VPLayout`、`.VPButton` 等的 VitePress 示例 CSS 不再生效，自定义样式必须改用 `vp-` 名称重写。与上游做 diff 也更困难，因此 vendored 目录被排除在某些 lint 规则之外。

## 暗色模式：仅使用 `data-theme` {#dark-mode-data-theme-only}

- **做法**：状态写成 `<html>` 上的 `data-theme="light|dark"`，而不是 `dark` class；移植样式中所有 `.dark` 选择器都改为 `[data-theme='dark']`。存储键是 `vuepress-color-scheme`（VitePress 使用 `vitepress-theme-appearance`）。状态由 `src/client/composables/useDarkMode.ts` 中的 `createDarkModeRef()` 创建（`usePreferredDark()` + `useStorage`，遵循作为 `false` / `'force-dark'` / `'force-auto'` / 对象形式的 `appearance`），并同时提供给主题数据和 `@vuepress/helper/client` 的 `darkModeSymbol`，因此生态插件读到的是同一份状态。`appearance` 会在构建时由 `defaultTheme()` 的 `templateBuildRenderer` 写入 `<html data-appearance="…">`，而 `templates/build.html` 的内联脚本会在首次绘制前利用存储和系统偏好设置 `data-theme`，因此 `'force-dark'` / `'force-auto'` 在构建后的站点中不会闪出错误的颜色；开发模式绕过了构建模板，所以首次绘制由存储和系统偏好决定。
- **原因**：生态插件和样式（`@vuepress/helper` 的 `getDarkMode()`、搜索样式、Shiki 的亮色/暗色主题）都会读取并监听 `document.documentElement.dataset.theme`。
- **收益**：单一数据来源；`dark` class 与 `data-theme` 不可能相互矛盾；插件会自动拿到正确的暗色状态。
- **取舍**：为 `.dark` 编写的 VitePress 自定义 CSS 必须改用 `[data-theme='dark']` 重写，上游的暗色规则无法原样复用。开发模式下站点级的 `appearance` 在首次绘制时可能不准确，而构建后的站点没有这个问题。

## 搜索：主题只提供挂载点 {#search-the-theme-only-provides-the-mount-point}

- **做法**：当有搜索插件注册了 `SearchBox` 这个全局组件时，导航栏渲染 `<SearchBox />`。主题不打包任何搜索实现。
- **原因**：VitePress 的本地搜索 UI 与 VitePress 内部实现（索引格式、worker、弹窗组件）紧耦合，而生态中已经有多个带 i18n 和可刷新索引的搜索插件。
- **收益**：可以使用任意后端（slimsearch、orama、flexsearch、docsearch、meilisearch）；主题保持小巧；索引格式不需要维护两份。
- **取舍**：搜索 UI 的外观与 VitePress 本地搜索不同，新插件可能需要为 `styles/vars.css` 暴露的 CSS 变量提供别名。

## 复制代码：由插件提供 {#copy-code-provided-by-a-plugin}

- **做法**：接入 `@vuepress/plugin-copy-code`，选择器为 `[vp-content] ... pre`。
- **原因**：VitePress 在其 Markdown pre 包装层中实现复制按钮，那属于核心行为而非主题行为；生态插件是官方替代方案，带有自己的图标、文案和样式。
- **收益**：实现只有一份，因此复制反馈、移动端行为和修复会作用于每个主题。
- **取舍**：按钮的标记和样式来自插件；在 `vp-content` 根之外渲染内容的站点需要额外的选择器。

## 代码分组：由 Markdown Tab 插件提供 {#code-groups-provided-by-the-markdown-tab-plugin}

- **做法**：主题启用 `markdownTabPlugin({ codeTabs: true })`，因此代码分组使用 `::: code-tabs` + `@tab`。插件解析 markdown、渲染 `<VPCodeTabs>` 组件，并自带 `.vp-code-tabs` 样式和客户端切换逻辑。主题不再注册 `code-group` 容器渲染器，VitePress 的 `vp-code-group` 样式已被移除。
- **原因**：主题不追求与 VitePress 语法完全兼容，它只借用 VitePress 的布局和样式。当插件已经覆盖某个特性时，不再在主题中重复实现该特性。
- **收益**：插件开箱即用，并且自带样式、选择记忆和相同 `tab-id` 的联动切换；主题没有自己的解析或切换代码；插件的改进会自动到达主题。
- **取舍**：语法与 VitePress 不同（`::: code-group` + `[title]` 在这里不可用，必须写成 `::: code-tabs` + `@tab`），DOM 和样式也与 VitePress 主题不同。
- **已记录的插件改进**：VitePress 的代码分组使用 `<input type="radio">` + `<label>`，因此具备原生单选组语义、方向键切换和无 JavaScript 切换。我们的 `VPCodeTabs` 使用按钮加 JavaScript 切换。如果原生单选方案在无障碍方面确实更好，`@vuepress/plugin-markdown-tab` 可以增加一种单选模式，而不是在主题中保留自定义渲染器。

## 图标：由 `@vuepress/plugin-icon` 在运行时渲染 {#icons-rendered-by-vuepress-plugin-icon-at-runtime}

- **做法**：主题以 `assets: 'iconify'` 启用 `@vuepress/plugin-icon`，并用插件全局注册的 `VPIcon` 取代 VitePress 的 `useIcon` / `VPIcon`：社交链接渲染为 `<VPIcon :icon="'simple-icons:github'" />`，包含 `:` 的 `features[].icon` 名称也由它渲染。主题不再生成图标 CSS，`src/node/icons.ts` 和临时的客户端配置已被移除。内部 UI 图标（箭头、太阳 / 月亮……）仍是 `styles/icons.css` 中的 CSS mask，不受影响。
- **原因**：图标属于特性而非布局，而生态中已经有对应插件。插件的图标渲染（`<iconify-icon>` Web Component）与移植层的 `vpi-*` mask class 冲突，因此只能二选一 —— 这里选择了插件。
- **收益**：支持任意 Iconify 图标集和图标服务，不需要 `@iconify-json/*` 依赖，也不需要构建时扫描，插件的改进会自动到达主题。
- **取舍**：图标在客户端渲染，因此 SSR 的 HTML 中是一个空的 `<iconify-icon>` 元素，图标会在 hydration 之后出现；与 VitePress 的构建时 CSS 方案相比，在没有 JavaScript 时图标不可用。特性本身并未缺失：离线或内网部署可以传入 `icon: { offline: true }`，让插件扫描站点用到的图标并在构建时打包（站点需要自行安装 `iconify-icon` 和 `@iconify-json/<prefix>` 包，且在严格的 pnpm 解析下这些包必须能被插件解析到）。

## Markdown 容器：由 `@vuepress/plugin-markdown-hint` 提供 {#markdown-containers-provided-by-vuepress-plugin-markdown-hint}

- **做法**：主题启用 `markdownHintPlugin({ hint: true, alert: true })`。`tip` / `info` / `warning` / `caution` / `note` / `important` / `danger`（渲染为 `caution`，与 theme-classic 一致）以及 `details` 由插件解析、渲染和设置样式：`.hint-container`、`.hint-container-title`、标题前的图标，`details` 则是原生的可折叠 `<details>`。主题不再注册容器渲染器，也不再为容器写样式；它只做三件事：
  1. 导入 `@vuepress/helper/colors.css`，因为插件的样式依赖 `--vp-c-*-bg` / `-text` / `-soft` 色板，而该色板会随 `[data-theme='dark']` 切换，与主题的暗色模式一致。
  2. 在 `styles/vars.css` 中覆盖少量变量：用 `--hint-font-size: 0.875rem` 对齐 VitePress 的容器字号，并把插件色板中的蓝色映射到靛蓝（VitePress 的 info 容器使用靛蓝）。
  3. `v-pre` 和 `raw` 容器分别由 `@vuepress/plugin-markdown-ext`（`vPre: true`）和 `@vuepress/plugin-markdown-raw` 提供：前者只输出 `<div v-pre>`；后者输出 `<div class="vp-raw">`，且主题默认开启样式隔离（`isolateStyles: true`，在 VitePress 中这是 `postcss.config` 里的可选开启项）。主题还接管了容器内链接的点击，使它们不经过 SPA 路由，与 VitePress 一致。禁用 `themePlugins.markdownRaw` 会让 `::: raw` 按纯文本渲染。
- **原因**：容器属于特性，应当由官方插件提供；样式对齐的做法是覆盖插件的 CSS 变量，而不是在主题中复制或映射一整套 VitePress 容器样式。
- **收益**：主题中不再有容器样式或渲染代码；容器图标、本地化的默认标题以及打印前自动展开 `<details>` 都由插件维护；外观与 theme-classic 一致，且只受主题色板影响；插件的改进会自动到达主题。
- **取舍（与 VitePress 的差异）**：
  - class 名不同：VitePress 使用 `.custom-block` / `.custom-block-title`，这里是 `.hint-container` / `.hint-container-title`；针对 VitePress class 的自定义样式必须重写。
  - 标题前有图标（插件样式的一部分），而 VitePress 的容器标题没有图标。
  - `::: tip {no-title}` 渲染为无标题的容器（插件支持该写法，它只读取信息字符串末尾的标记；`details` 会忽略它）。
  - token 上的额外属性（例如 `id` 或额外的 `class`）不会被传递到容器。
  - `raw` 的样式隔离由主题默认开启，需要站点的打包器用 PostCSS 处理主题的 `vp-doc.css` / `base.css`：自定义了 `css.postcss`（Vite）或 `postcss-loader` 配置项的站点必须确保相关插件被合并。可以用 `themePlugins.markdownRaw: { isolateStyles: false }` 关闭隔离。
  - `::: danger` 输出 `caution` 类型（标题为 "Caution"），与 theme-classic 的兼容映射一致。
- **已完成的插件改进**：`@vuepress/plugin-markdown-hint` 现已支持 `{no-title}`，并把容器间距和圆角暴露为 `--hint-container-*` / `--hint-details-*` CSS 变量，因此主题只用变量即可对齐布局（见插件 PR #1136）。剩余的差异是 token 上的额外属性（例如 `id` 或额外的 `class`）不会被传递到输出的 DOM。

## 活动标题：滚动监听属于插件 {#active-heading-the-scroll-listener-belongs-to-the-plugin}

- **做法**：主题以 `headerLinkSelector: '.outline-link'` 启用 `@vuepress/plugin-active-header-links`，由插件在滚动时保持 `route.hash` 同步。`composables/useActiveAnchor.ts` 的 `useActiveAnchor()` 不再注册滚动监听；它只监听 `route.hash`，为匹配的 `.outline-link` 添加 `active` class 并移动大纲标记。
- **原因**：主题只应当是一个轻量的布局层；滚动监听是可复用的通用逻辑，而生态已经在插件中提供了它。
- **收益**：滚动和哈希逻辑只存在一处，并与其他主题保持一致；主题的代码更少。
- **取舍**：职责边界多了一跳（插件写哈希，主题读哈希），因此调试涉及两端；插件的默认选择器不是 `.outline-link`，必须显式配置。

## 客户端 API：原生 `vuepress/client` API {#client-api-the-native-vuepress-client-api}

- **做法**：移植层没有 VitePress 兼容层（原先的 `src/client/app/*`）：主题的组合式函数（`useThemePageData`、`useThemePageFrontmatter`、`usePageRelativePath`，以及来自 `@vuepress/plugin-theme-data/client` 的 `useThemeLocaleData` 等）读取 `vuepress/client` 的原生数据，并把它们组织成主题数据 API（`ThemePageData`、`ThemePageFrontmatter`、`ThemeLayout` 等），其形状和语义遵循 `@vuepress/theme-classic`，新增字段另行记录。
- **原因**：兼容层会带来响应式包装和运行时开销；用户要求的是零性能损失的原生实现。
- **收益**：没有中间层，数据流直接；主题代码与生态中其他主题一致，更易维护。
- **取舍**：内部组合式函数属于主题自己的 API，必须与 `@vuepress/theme-classic` 的数据形状和语义保持一致；新增或暂时缺失的字段记录在[配置](./config.md)和[从经典主题迁移](./migrating-from-classic.md)中，以免出现两套并行的约定。
- **接口说明**：
  - 主题既不保留 VitePress 的数据形状，也不保留 VitePress 的数据组合式函数（`useData`、`useRouter`、`useRoute` 等）。站点扩展使用原生的 `vuepress/client` API；主题自己的布局状态组合式函数 `useLayout()` 返回主题的 `ThemeLayout` 类型，供移植的组件和使用扩展布局的站点使用。
  - VitePress 的回调载荷（例如 `nav[].link` 和 `editLink.pattern`）不再构造 `VitePressData`；它们收到的是原生 VuePress 页面数据（`page`），其字段与之不同（例如 `filePath` 与 `filePathRelative`）。如果需要与 VitePress 兼容的载荷，请在站点侧做适配。
  - i18n 遵循 VuePress 模型：站点在 VuePress 的 `locales` 中声明语言，路由语言由站点的 `locales` 决定；主题既不覆盖 `@vuepress/plugin-theme-data` 的 `themeLocaleDataSymbol`，也不只从主题的 `locales` 推导语言。主题的 `locales` 只决定每个语言的主题配置和文案，其键在构建时映射到路由语言路径（`root` → `/`，其他 → `/<key>/` 或显式的 `link`）。

## 字体 {#fonts}

- **做法**：主题打包 Inter 网络字体，并保留上游样式表中的 Google Fonts `@import`。
- **取舍**：外部 `@import` 会产生网络请求；必须完全离线构建的项目应当移除它。

## 主题配置项：独立的 `ThemeConfig` {#theme-options-an-independent-themeconfig}

- **做法**：主题配置项是主题自己的 `ThemeConfig`（`src/shared/types.ts`），只包含主题实际支持的字段，从包的入口导出，并由 `defaultTheme(options: ThemeOptions)` 和 `useThemeData<ThemeConfig>()` 使用。嵌套类型（`NavItem`、`Sidebar`、`Hero`、`Feature`……）保留在 `DefaultTheme` 命名空间中，供组件和用户使用。
- **原因**：VitePress 默认主题的配置包含许多主题未实现或不需要的字段；保留它的类型会让用户写出能通过类型检查但在运行时什么都不做的配置。配置项类型应当充当文档，错误的字段应当在类型检查时报错。
- **收益**：配置项范围与实现一致；仅 VitePress 才有的字段会被类型检查器拒绝；包的入口导出了完整的配置项类型，因此用户在编写配置时能得到准确的提示。
- **取舍**：为 VitePress 默认主题编写的配置无法原样复用类型，必须重写；主题配置项不会自动跟随 VitePress 的新字段。

## 布局解析：单一的 `Layout` 与 `type` 字段 {#layout-resolution-a-single-layout-and-the-type-field}

- **做法**：主题只注册 `Layout`（首字母大写，遵循生态约定）和 `NotFound`。页面类型由主题自己的 frontmatter 字段 `type` 决定，而不是 VitePress 的小写 `layout`：`home` 渲染首页，`doc`（默认）渲染文档页面，`page` 渲染空白页面容器，`content` 只渲染页面内容而不带布局外壳。`extendsPage` 只填充页面数据（`filePathRelative`、`routeMeta.title`），不改写 frontmatter；组件通过 `usePageType()`（`useLayout().isHome`、`Layout.vue`、`VPContent.vue`）读取类型。VuePress 的 `layout` frontmatter 仅用作已注册的布局名称（自定义布局、`NotFound`）。
- **原因**：用户要求既然一个布局够用就只保留一个，而不是注册三个指向同一组件的布局；显式的 `type` 取代了 VitePress 兼容层，并移除了 `originalLayout` 这类只为 VitePress 检查而存在的字段。
- **收益**：布局注册表干净，主题只有一个布局入口；页面类型是显式的 API，组件检查不再依赖 VitePress 的 frontmatter 约定；`extendsPage` 不改写用户数据，因此行为可预测；自定义布局（例如 `layout: CommentPage`）不受影响；`NotFound` 的处理与首页 / 文档检查解耦。
- **取舍**：页面类型是主题特有的字段；VitePress 的 `layout: home|doc|page` 会被 VuePress 当作布局名（主题并未注册）并抛出 `[vuepress] Cannot resolve layout`，而 `layout: false` 不是字符串，会回退到完整的布局外壳。页面类型切换完全由 `VPContent` 处理；`NotFound` 仍必须注册为第二个布局，因为 VuePress 只在 `extendsPage` 执行之后才设置 `frontmatter.layout = 'NotFound'`，主题无法更早改写它。

## 不作移植的 VitePress 功能 {#not-ported-from-vitepress}

VitePress 默认主题的两个功能被有意排除：

- **Carbon 广告**：`carbonAds` 配置项、`VPCarbonAds` 组件与 `__CARBON__` 构建标记均不移植，也没有替代方案。
- **内置搜索 UI**：本地搜索弹窗、`@localSearchIndex` 模块、搜索 worker 与 `search` 主题配置项均不移植。请改为安装任一搜索插件（`@vuepress/plugin-slimsearch`、`@vuepress/plugin-orama`、`@vuepress/plugin-flexsearch`、`@vuepress/plugin-search`、`@vuepress/plugin-meilisearch`、`@vuepress/plugin-docsearch`），主题会挂载它们注册的 `SearchBox` 组件。
