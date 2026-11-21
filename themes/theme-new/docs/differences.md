# 实现差异与取舍

本主题有意不追求与 VitePress 默认主题逐字节对齐。下面按关注点列出差异，并说明为什么选择生态实现、以及各自的取舍。

## CSS 类名前缀：`vp-` 代替 `VP`

- **移植方式**：移植层的公开类名全部从 VitePress 的 `VPFoo` 改为生态的 `vp-foo`（`VPNavBar*` 特例为 `vp-navbar*`）；根类为 `vp-theme-container` 和 `vp-not-found`。
- **原因**：仓库要求所有 CSS 类以 `vp-` 开头，且站点的其他样式也已经按 `vp-` 类名编写。
- **优点**：与生态一致；不会与第三方 VitePress 插件类名冲突；因为改的是同一份选择器，组件 scoped 样式仍然有效。
- **缺点**：针对 `.VPLayout`、`.VPButton` 等类名的 VitePress 示例 CSS 不生效，迁移 VitePress 站点时要调整自定义样式；与上游 diff 更困难，因此 vendored 目录被排除在部分 lint 规则之外。

## 暗色模式：只用 `data-theme`

- **移植方式**：完全改用生态约定 —— 状态以 `data-theme="light|dark"` 写在 `<html>` 上，不再使用 `dark` 类；所有移植样式中的 `.dark` 选择器都改成 `[data-theme='dark']`。存储键为 `vuepress-color-scheme`（VitePress 用 `vitepress-theme-appearance`）。客户端由 `src/client/composables/darkMode.ts` 的 `createDarkModeRef()` 驱动（`usePreferredDark()` + `useStorage`，支持 `appearance` 的 `false` / `'force-dark'` / `'force-auto'` / 对象写法），并把只读的 `isDark` 同时提供给主题的 `dataSymbol` 和 `@vuepress/helper` 的 `darkModeSymbol`，让生态插件读到同一状态；`templates/build.html` 的内联脚本在首屏前只写 `data-theme`。
- **原因**：生态插件和样式（`@vuepress/helper` 的 `getDarkMode()`、搜索插件样式、Shiki 明暗主题切换）读取 `document.documentElement.dataset.theme`，并用 `MutationObserver` 监听它。
- **优点**：只有一个状态来源；不会出现 `dark` 类与 `data-theme` 不一致；插件自动获得正确的暗色状态。
- **缺点**：针对 `.dark` 选择器的 VitePress 自定义 CSS 需要改成 `[data-theme='dark']`；主题因此不能直接复用 VitePress 上游的暗色规则，需要一次机械改写。

## 搜索：主题只提供挂载点，UI 由插件负责

- **移植方式**：导航栏在有搜索插件注册全局组件时渲染 `<SearchBox />`，此外不做任何事，也不打包任何搜索实现。
- **原因**：VitePress 的本地搜索 UI 与 VitePress 内部实现（索引格式、worker、弹窗组件）强绑定；生态已有多个带语言数据和可刷新索引的搜索插件。
- **优点**：可选任意后端（slimsearch、orama、flexsearch、docsearch、meilisearch）；主题更小；不重复维护索引格式。
- **缺点**：搜索 UI 外观与 VitePress 本地搜索不同；插件样式会用到主题 `styles/vars.css` 中别名块暴露的 CSS 变量，新插件可能还需补一条别名。

## 复制代码：使用插件而非核心 Markdown 包装器

- **移植方式**：接入 `@vuepress/plugin-copy-code`，选择器为 `[vp-content] ... pre`。
- **原因**：VitePress 把复制按钮实现在 Markdown pre-wrapper 中，属于核心行为而非主题行为；生态插件是官方替代实现，自带图标、语言和样式。
- **优点**：实现共享，复制反馈提示、移动端行为等只需维护一份，后续修复对所有主题生效。
- **缺点**：按钮标记和样式来自插件而非 VitePress；如果站点在 `vp-content` 根之外渲染内容，需要额外配置选择器。

## 代码组：由 Markdown Tab 插件提供

- **移植方式**：主题启用 `markdownTabPlugin({ codeTabs: true })`，代码组使用 `::: code-tabs` + `@tab` 语法；插件负责解析、渲染 `<VPCodeTabs>` 组件、自带 `.vp-code-tabs` 样式与客户端切换逻辑。主题不再注册 `code-group` 容器渲染器，也删除了 VitePress 的 `vp-code-group` 样式。
- **原因**：本主题不追求与 VitePress 语法全兼容，只迁移布局。既然生态已有对应功能的插件，就优先直接使用，做到开箱即用，而不是在主题里维护一套仅供兼容的解析器与样式。
- **优点**：插件开箱即用，自带样式、选中态持久化、同 `tab-id` 联动等能力；主题没有自有解析与切换代码；后续插件改进会自动惠及主题。
- **缺点**：语法与 VitePress 不同（VitePress 的 `::: code-group` + `[title]` 在这里不生效，需要改写为 `::: code-tabs` + `@tab`）；DOM 与样式细节和 VitePress 主题有差异。
- **可回补的插件改进（记录）**：VitePress 的代码组用 `<input type="radio">` + `<label>` 实现标签页，因此天然具备单选组语义、方向键切换、无 JavaScript 也能切换；我们的 `VPCodeTabs` 用按钮 + JavaScript 切换。若确认原生 radio 方案在无障碍上更好，可回头给 `@vuepress/plugin-markdown-tab` 增加 radio 模式，而不是在主题里保留自研渲染器。

## 图标：交给 `@vuepress/plugin-icon` 运行时渲染

- **移植方式**：主题接入 `@vuepress/plugin-icon`（`assets: 'iconify'`），把 VitePress 的 `useIcon` / `VPIcon` 换成插件全局注册的 `VPIcon` 组件：社交链接渲染 `<VPIcon :icon="'simple-icons:github'" />`，`features[].icon` 中带 `:` 的名称也交给它；主题不再生成图标 CSS，也删除了 `src/node/icons.ts` 与临时 client config。主题内部的 UI 图标（箭头、太阳/月亮等）仍是 `styles/icons.css` 里的 CSS mask，不受影响。
- **原因**：图标属于「功能」而不是布局，生态已有插件，用户要求主题尽量薄、优先复用插件；插件的图标渲染方式（`<iconify-icon>` Web Component）与移植层的 `vpi-*` mask 类冲突，只能二选一，选插件。
- **优点**：支持任意 Iconify 集合与图标服务，不再需要 `@iconify-json/*` 依赖，也不需要构建期扫描；插件后续改进自动惠及主题。
- **缺点**：在线模式从图标服务加载图标，首次渲染在客户端完成 —— SSR HTML 里只有空的 `<iconify-icon>`，hydration 后才出现，且离线时不显示；相比 VitePress 的构建期 CSS 方案少了无 JavaScript 可用的能力。需要离线/构建期图标时，应改进插件（增加构建期 CSS 模式）或使用插件的离线模式（站点需自行安装 `iconify-icon` 与对应图标集包，并受 pnpm 严格解析限制）。

## Markdown 容器：插件默认渲染 + 样式映射

- **移植方式**：容器由 `@vuepress/plugin-markdown-container` 解析，每种容器一个插件实例。tip/info/warning/danger/note/important/caution 注册时**不传 `render`**，直接使用插件默认标记 `<div class="custom-container tip"><p class="custom-container-title">TIP</p>…</div>`（无标题时取 `type.toUpperCase()` 或插件的 `locales.defaultInfo`）；主题把移植的 VitePress 容器样式从 `.custom-block` / `.custom-block-title` 映射到 `.custom-container` / `.custom-container-title`，不再输出 VitePress 兼容标记。`details` 需要原生 `<details>` 元素，插件默认渲染只会输出 `<div>`，因此保留一个极简自定义 `render`，输出 `<details class="custom-container details"><summary class="custom-container-title">Details</summary>…</details>`；`v-pre`、`raw` 同理保留极简自定义 `render`（`<div v-pre>`、`<div class="vp-raw">`）。入口见 `src/node/containers.ts`。
- **原因**：主题只负责布局与样式，容器解析属于插件能力；插件默认渲染就是它设计的用法，主题不应再维护一套只为兼容 VitePress 标记的渲染函数。标记改用插件默认类名后，样式跟随映射，而不是反过来为旧标记保留自定义渲染。
- **优点**：主题侧只剩「注册容器 + 映射样式」，不再维护约 50 行 VitePress 兼容渲染代码；容器类型、默认标题、`locales.defaultInfo` 等行为由插件维护，上游改进无需同步；类名是插件的公开约定，用户自定义样式直接针对 `.custom-container`。
- **缺点（未 1:1 映射的 DOM 差异）**：
  - 类名与顺序不同：VitePress 为 `<div class="tip custom-block"><p class="custom-block-title">`，这里为 `<div class="custom-container tip"><p class="custom-container-title">`。针对 `.custom-block` 的 VitePress 自定义样式不生效，需改为 `.custom-container`。
  - 没有 `custom-block-title-default` 修饰类：插件默认渲染不区分默认标题与自定义标题，样式也不依赖该修饰类。
  - 不支持 `{no-title}` 无标题容器：VitePress 2 可用 `::: tip {no-title}` 去掉标题（并减少顶部内边距），插件默认渲染会把 `{no-title}` 当成标题文本，原样输出到 `custom-container-title` 里。
  - 容器不再透传 token 上的额外属性：旧的自定义渲染用 `renderAttrs` 输出 `id`、额外 `class` 等，插件默认渲染只输出固定类名。
  - 标题不经过行内 Markdown 渲染：插件默认渲染直接拼接 info 文本，例如 ``::: tip `code` `` 中的反引号会原样显示；`details` 的标题仍由主题渲染行内 Markdown（用 `md.parseInline` + `md.renderer.renderInline`，避免 `md.renderInline` 重入被包装过的 `renderer.render` 而清空页面 headers/title）。
  - `details` 的结构与 VitePress 不完全一致：VitePress 为 `<details class="details custom-block"><summary>`，这里为 `<details class="custom-container details"><summary class="custom-container-title">`（`summary` 多一个类名，用于复用标题样式）。
  - `v-pre`、`raw` 仍是主题自定义渲染，不属于插件默认能力。
- **可回补的插件改进（记录）**：若标题需要支持行内 Markdown、`{no-title}` 无标题容器或容器需要透传属性，应给 `@vuepress/plugin-markdown-container` 的默认渲染函数补能力（标题走 `md.renderInline`、识别 `{no-title}` 后不输出标题、保留 `renderAttrs`），而不是在主题里再写一套渲染函数。

## 标题锚点：按 VuePress 的 DOM 适配

- **移植方式**：VuePress 的 Markdown 渲染器用 `anchorPlugin.permalink.headerLink({ class: 'header-anchor', safariReaderFix: true })`，把标题文本**包在** `<a class="header-anchor">` 内；VitePress 则把标题文本留在 `<h*>` 里，锚点是独立的 `#` 图标链接，靠绝对定位放到标题左侧、hover 时才显示。主题把 `styles/components/vp-doc.css` 里 `.header-anchor` 的绝对定位 / 负外边距 / `opacity: 0` 改为 `position: static`、`display: inline`、继承字号与颜色，`::before` 的 `#` 符号关闭；`composables/outline.ts` 的 `serializeHeader` 不再按「跳过 anchor 子节点」取标题文本，而是克隆标题节点、移除 `.vp-badge` 等元素后取 `textContent`。
- **原因**：这是 Markdown 渲染层的 DOM 差异，样式必须按 VuePress 真实 DOM 适配，否则标题文本会随锚点一起被隐藏。
- **优点**：标题正常显示，大纲标题包含完整的行内内容；不需要主题接管 Markdown 锚点渲染，保持「主题只做布局/样式」。
- **缺点**：没有 VitePress 的 hover `#` 锚点图标；若希望恢复，需要改 Markdown 锚点渲染（例如在 `extendsMarkdown` 里重配 `anchorPlugin` 的 permalink），属于可以记录下来的后续改进点。

## 当前标题高亮：滚动监听交给插件，主题只反射 hash

- **移植方式**：主题接入 `@vuepress/plugin-active-header-links`（`headerLinkSelector: '.outline-link'`），由插件在滚动时维护 `route.hash`；`composables/outline.ts` 的 `useActiveAnchor` 不再注册任何 scroll 监听，只 `watch` `route.hash` 给对应的 `.outline-link` 加 `active` 类并移动大纲指示器。
- **原因**：主题应只做薄布局层，滚动监听是可以复用的常规逻辑，生态已有插件提供。
- **优点**：滚动与 hash 同步逻辑只有一份，且与生态其他主题一致；主题侧代码更少。
- **缺点**：插件与主题的职责边界变多了一道（插件写 hash、主题读 hash），调试时需要同时看两边；插件默认选择器不是 `.outline-link`，需要显式配置。

## 客户端 API：直接使用 `vuepress/client`

- **移植方式**：移植层内部不再保留 VitePress 兼容层（原 `src/client/app/*`）：主题的组合函数（`useThemePageData`、`useThemePageFrontmatter`、`useThemePageRelativePath`、`useThemeLocaleData` 等）直接读取 `vuepress/client` 与 `@vuepress/plugin-theme-data/client` 的原生数据，再组合成移植组件需要的 VitePress 数据形状；`useLayout()` 等布局状态组合函数仍由主题导出。
- **原因**：兼容层会带来额外的响应式包装与运行时开销；用户要求最终提供「0 性能损失的原生实现」。
- **优点**：没有中间层，数据流更直接；主题代码与生态其他主题一致，便于长期维护。
- **缺点**：移植组件仍按 VitePress 的数据形状编写，形状转换的代码从兼容层移到了组合函数里（`useLayout()`、`usePrevNext()` 等），需要保证语义与 VitePress 一致。
- **接口差异（记录）**：
  - 主题不提供 VitePress 的数据 composables（`useData`、`useRouter`、`useRoute` 等），站点扩展直接使用 `vuepress/client` 原生 API；主题自身的布局状态组合函数（`useLayout` 等）仍会导出，供移植组件和需要扩展布局的站点使用。
  - `theme.i18nRouting` 仅支持 `false`（关闭语言切换路径改写）；VitePress 的**函数**形式不支持，默认的「对应页面」路径改写逻辑保持不变。
  - `nav[].link`、`editLink.pattern` 等 VitePress 回调参数不再构造 `VitePressData`，而是直接传入原生 VuePress 页面数据（`page`），字段有差异（如 `filePath` 对应 `filePathRelative`）；如需要 VitePress 兼容载荷，可在用户侧自行适配。
  - 主题在 `enhance` 中会再次 `provide(themeLocaleDataSymbol)`，覆盖 `@vuepress/plugin-theme-data` 的默认实现，以便站点只配置主题 `locales` 时也能按路径命中语言数据。这会在开发模式下打印一条 `[Vue warn]: App already provides property with key "Symbol()"` 警告，属于已知的 dev-only 噪声，不影响运行；后续若插件提供关闭默认 provide 的开关或注入辅助函数，可移除此覆盖。

## 字体

- **移植方式**：打包 Inter webfont，并保留上游样式表中的 Google Fonts `@import`。
- **缺点**：外部 `@import` 会产生网络请求；需要完全离线构建的项目应自行移除。

## 布局解析：只有一个 `Layout`

- **移植方式**：主题只注册 `Layout`（大写开头，符合生态规范）和 `NotFound`。`extendsPage` 把 VitePress frontmatter 的小写 `layout: home` / `doc` / `page` 统一归一化为 `Layout`，原值保存在 `page.data.originalLayout`；客户端 `useThemePageFrontmatter()` 再把它还原到 `frontmatter.layout`，让 `VPContent` 里 `layout === 'home'` 等 VitePress 语义继续成立。`NotFound` 必须单独注册：VuePress 核心在 `extendsPage` 之后才给内置 `/404.html` 设置 `frontmatter.layout = 'NotFound'`，主题无法把它归一化，且 VitePress 同样把 404 渲染在常规布局外壳内。
- **原因**：用户要求「只需要一个布局就只保留一个」，避免注册三个指向同一组件的多余布局。
- **优点**：布局注册表干净，主题只剩一个真正的布局入口；VitePress 页面（`layout: false` / `page` / `home`）仍可原样渲染；自定义布局（如 `layout: CommentPage`）不被改写，直接交给 VuePress 解析。
- **缺点**：内部页面类型切换完全由 `VPContent` 负责；`page.data.frontmatter.layout` 是归一化后的值，需要原始值的代码要读 `page.data.originalLayout`；`NotFound` 与 `Layout` 是两个注册项，和「只有一个布局」的表述略有出入（属于 VuePress 核心 404 机制要求）。
