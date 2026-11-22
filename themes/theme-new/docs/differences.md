# 实现差异与取舍

本主题有意不追求与 VitePress 默认主题逐字节对齐。下面按关注点列出差异，并说明为什么选择生态实现、以及各自的取舍。

## CSS 类名前缀：`vp-` 代替 `VP`

- **移植方式**：移植层的公开类名全部从 VitePress 的 `VPFoo` 改为生态的 `vp-foo`（`VPNavBar*` 特例为 `vp-navbar*`）；根类为 `vp-theme-container` 和 `vp-not-found`。
- **原因**：仓库要求所有 CSS 类以 `vp-` 开头，且站点的其他样式也已经按 `vp-` 类名编写。
- **优点**：与生态一致；不会与第三方 VitePress 插件类名冲突；因为改的是同一份选择器，组件 scoped 样式仍然有效。
- **缺点**：针对 `.VPLayout`、`.VPButton` 等类名的 VitePress 示例 CSS 不生效，自定义样式需要按 `vp-` 类名改写；与上游 diff 更困难，因此 vendored 目录被排除在部分 lint 规则之外。

## 暗色模式：只用 `data-theme`

- **移植方式**：完全改用生态约定 —— 状态以 `data-theme="light|dark"` 写在 `<html>` 上，不再使用 `dark` 类；所有移植样式中的 `.dark` 选择器都改成 `[data-theme='dark']`。存储键为 `vuepress-color-scheme`（VitePress 用 `vitepress-theme-appearance`）。客户端由 `src/client/composables/useDarkMode.ts` 的 `createDarkModeRef()` 驱动（`usePreferredDark()` + `useStorage`，支持 `appearance` 的 `false` / `'force-dark'` / `'force-auto'` / 对象写法），并把只读的 `isDark` 同时提供给主题的 `dataSymbol` 和 `@vuepress/helper` 的 `darkModeSymbol`，让生态插件读到同一状态；`appearance` 的取值由 `themeNew()` 的 `templateBuildRenderer` 在构建期写成 `<html data-appearance="…">`，`templates/build.html` 的内联脚本据此（结合 storage 与系统偏好）在首屏前写入 `data-theme`，因此 `'force-dark'` / `'force-auto'` 在构建产物中不会出现首帧配色错误；dev 模式不经过构建模板渲染，首帧仍由 storage 与系统偏好决定。
- **原因**：生态插件和样式（`@vuepress/helper` 的 `getDarkMode()`、搜索插件样式、Shiki 明暗主题切换）读取 `document.documentElement.dataset.theme`，并用 `MutationObserver` 监听它。
- **优点**：只有一个状态来源；不会出现 `dark` 类与 `data-theme` 不一致；插件自动获得正确的暗色状态。
- **缺点**：针对 `.dark` 选择器的 VitePress 自定义 CSS 需要改成 `[data-theme='dark']`，主题因此不能直接复用 VitePress 上游的暗色规则；dev 模式没有构建模板渲染，站点级 `appearance` 在首帧可能短暂不准确（构建产物没有这个问题）。

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
- **原因**：本主题不追求与 VitePress 语法全兼容，只参考其布局与样式。既然生态已有对应功能的插件，就优先直接使用，做到开箱即用，而不是在主题里维护一套仅供兼容的解析器与样式。
- **优点**：插件开箱即用，自带样式、选中态持久化、同 `tab-id` 联动等能力；主题没有自有解析与切换代码；后续插件改进会自动惠及主题。
- **缺点**：语法与 VitePress 不同（VitePress 的 `::: code-group` + `[title]` 在这里不生效，需要改写为 `::: code-tabs` + `@tab`）；DOM 与样式细节和 VitePress 主题有差异。
- **可回补的插件改进（记录）**：VitePress 的代码组用 `<input type="radio">` + `<label>` 实现标签页，因此天然具备单选组语义、方向键切换、无 JavaScript 也能切换；我们的 `VPCodeTabs` 用按钮 + JavaScript 切换。若确认原生 radio 方案在无障碍上更好，可回头给 `@vuepress/plugin-markdown-tab` 增加 radio 模式，而不是在主题里保留自研渲染器。

## 图标：交给 `@vuepress/plugin-icon` 运行时渲染

- **移植方式**：主题接入 `@vuepress/plugin-icon`（`assets: 'iconify'`），把 VitePress 的 `useIcon` / `VPIcon` 换成插件全局注册的 `VPIcon` 组件：社交链接渲染 `<VPIcon :icon="'simple-icons:github'" />`，`features[].icon` 中带 `:` 的名称也交给它；主题不再生成图标 CSS，也删除了 `src/node/icons.ts` 与临时 client config。主题内部的 UI 图标（箭头、太阳/月亮等）仍是 `styles/icons.css` 里的 CSS mask，不受影响。
- **原因**：图标属于「功能」而不是布局，生态已有插件，用户要求主题尽量薄、优先复用插件；插件的图标渲染方式（`<iconify-icon>` Web Component）与移植层的 `vpi-*` mask 类冲突，只能二选一，选插件。
- **优点**：支持任意 Iconify 集合与图标服务，不再需要 `@iconify-json/*` 依赖，也不需要构建期扫描；插件后续改进自动惠及主题。
- **缺点**：图标在客户端渲染，SSR HTML 里只有空的 `<iconify-icon>`，hydration 后才显示；相比 VitePress 的构建期 CSS 方案，少了「无 JavaScript 也能显示图标」的能力。功能本身没有缺失：离线/内网部署可给主题传 `icon: { offline: true }`，由插件扫描站点用到的图标并在构建期打包（站点需自行安装 `iconify-icon` 与 `@iconify-json/<prefix>`，并注意 pnpm 严格解析下这些包要能被插件解析到）。

## Markdown 容器：由 `@vuepress/plugin-markdown-hint` 提供，主题只覆盖 CSS 变量

- **移植方式**：主题启用 `markdownHintPlugin({ hint: true, alert: true })`。`tip` / `info` / `warning` / `caution` / `note` / `important` / `danger`（渲染为 `caution`，与 theme-default 一致）与 `details` 都由插件解析、渲染并自带样式：`.hint-container`、`.hint-container-title`，标题前带图标，`details` 是原生可折叠的 `<details>`。主题不再注册容器渲染器，也不再为容器写样式，只做三件事：
  1. 引入 `@vuepress/helper/colors.css`：插件样式依赖它提供的 `--vp-c-*-bg` / `-text` / `-soft` 调色板，该调色板用 `[data-theme='dark']` 切换，与主题的暗色方案一致。
  2. 在 `styles/vars.css` 覆盖少量变量：`--hint-font-size: 0.875rem` 对齐 VitePress 的容器字号；把插件调色板中的 blue 映射到 indigo（VitePress 的 info 容器用 indigo 色系）。
  3. 保留 `v-pre`、`raw` 两个 VitePress 扩展：hint 插件不覆盖它们，主题用 `@vuepress/plugin-markdown-container` 的极简 `render` 输出 `<div v-pre>` / `<div class="vp-raw">`（`src/node/containers.ts`）。
- **原因**：容器属于「功能」，应由官方插件提供；样式问题通过覆盖插件的 CSS 变量解决，而不是在主题里复刻或映射一套 VitePress 容器样式。
- **优点**：主题里没有容器样式与渲染代码；容器图标、默认标题的多语言、打印前自动展开 `<details>` 等行为全部由插件维护；外观与 theme-default 一致，只受主题调色板影响；插件后续改进自动惠及主题。
- **缺点（与 VitePress 的差异）**：
  - 类名不同：VitePress 为 `.custom-block` / `.custom-block-title`，这里为 `.hint-container` / `.hint-container-title`；针对 VitePress 类名的自定义样式需要改写。
  - 标题前多一个图标（插件样式的一部分），VitePress 的容器标题没有图标。
  - `::: tip {no-title}` 会渲染无标题容器（插件已支持，仅认 info 串末尾的标记；`details` 忽略该标记）。
  - 容器不透传 token 上的额外属性（如 `id`、额外 `class`）。
  - `::: danger` 输出为 `caution` 类型（标题为 Caution），与 theme-default 的兼容映射一致。
- **已完成的插件改进**：`@vuepress/plugin-markdown-hint` 现已支持 `{no-title}`，并把容器间距、圆角抽成 `--hint-container-*` / `--hint-details-*` CSS 变量，主题可以只靠变量对齐版式（见插件 PR #1136）。剩余差异是容器不向输出 DOM 透传 token 上的额外属性（如 `id`、额外 `class`）。

## 当前标题高亮：滚动监听交给插件，主题只反射 hash

- **移植方式**：主题接入 `@vuepress/plugin-active-header-links`（`headerLinkSelector: '.outline-link'`），由插件在滚动时维护 `route.hash`；`composables/useActiveAnchor.ts` 的 `useActiveAnchor` 不再注册任何 scroll 监听，只 `watch` `route.hash` 给对应的 `.outline-link` 加 `active` 类并移动大纲指示器。
- **原因**：主题应只做薄布局层，滚动监听是可以复用的常规逻辑，生态已有插件提供。
- **优点**：滚动与 hash 同步逻辑只有一份，且与生态其他主题一致；主题侧代码更少。
- **缺点**：插件与主题的职责边界变多了一道（插件写 hash、主题读 hash），调试时需要同时看两边；插件默认选择器不是 `.outline-link`，需要显式配置。

## 客户端 API：直接使用 `vuepress/client`

- **移植方式**：移植层内部不再保留 VitePress 兼容层（原 `src/client/app/*`）：主题的组合函数（`useThemePageData`、`useThemePageFrontmatter`、`useThemePageRelativePath`、`useThemeLocaleData` 等）直接读取 `vuepress/client` 与 `@vuepress/plugin-theme-data/client` 的原生数据，并整理为主题自己的数据 API（`ThemePageData`、`ThemePageFrontmatter`、`ThemeLayout` 等）；数据的形状与语义以 `@vuepress/theme-default` 为参照，新增字段单独记录。
- **原因**：兼容层会带来额外的响应式包装与运行时开销；用户要求最终提供「0 性能损失的原生实现」。
- **优点**：没有中间层，数据流更直接；主题代码与生态其他主题一致，便于长期维护。
- **缺点**：主题内部组合函数是主题自有 API，需要与 `@vuepress/theme-default` 的数据形状和语义保持等价；新增或暂时缺失的字段都记录在[功能一览](./features.md)与[与 `@vuepress/theme-default` 的对应关系](./theme-default.md)中，避免出现两套并行约定。
- **接口差异（记录）**：
  - 主题不保留 VitePress 的数据形状，也不提供 VitePress 的数据 composables（`useData`、`useRouter`、`useRoute` 等），站点扩展直接使用 `vuepress/client` 原生 API；主题自身的布局状态组合函数 `useLayout()` 返回主题自有的 `ThemeLayout` 类型，供移植组件和需要扩展布局的站点使用。
  - `nav[].link`、`editLink.pattern` 等 VitePress 回调参数不再构造 `VitePressData`，而是直接传入原生 VuePress 页面数据（`page`），字段有差异（如 `filePath` 对应 `filePathRelative`）；如需要 VitePress 兼容载荷，可在用户侧自行适配。
  - 多语言遵循 VuePress 模型：站点必须在 VuePress 配置的 `locales` 中声明语言，路由语言由站点 `locales` 决定；主题不覆盖 `@vuepress/plugin-theme-data` 提供的 `themeLocaleDataSymbol`，也不尝试仅凭主题 `locales` 推导语言。主题 `locales` 只决定各语言的主题配置与文案，其键会在构建期映射为路由语言路径（`root` → `/`，其余为 `/<key>/` 或显式 `link`）。

## 字体

- **移植方式**：打包 Inter webfont，并保留上游样式表中的 Google Fonts `@import`。
- **缺点**：外部 `@import` 会产生网络请求；需要完全离线构建的项目应自行移除。

## 主题选项：独立的 `ThemeConfig`

- **移植方式**：主题选项是主题自己定义的 `ThemeConfig`（`src/shared/types.ts`），只包含主题真正支持的字段，并从包入口导出；`themeNew(options: ThemeNewOptions)`、`useThemeData<ThemeConfig>()` 等都用它。字段的嵌套类型（`NavItem`、`Sidebar`、`Hero`、`Feature` 等）仍放在 `DefaultTheme` 命名空间里，供组件与用户引用。
- **原因**：VitePress 默认主题的配置项包含大量主题不实现（或不需要）的字段，继续沿用它的类型会让用户写出「类型通过、运行无效」的配置；主题希望选项类型即文档，写错字段直接在类型检查阶段报错。
- **优点**：选项面与实现一致；VitePress 专有字段不再被类型接受；包入口可导出完整选项类型，用户写配置时有准确提示。
- **缺点**：按 VitePress 默认主题选项写法给出的配置不能直接复用类型，需要按主题选项改写；主题选项不会自动跟随 VitePress 新增字段。

## 布局解析：只有一个 `Layout`，页面类型用 `type`

- **移植方式**：主题只注册 `Layout`（大写开头，符合生态规范）和 `NotFound`。页面类型不再借用 VitePress 的小写 `layout`，而是由主题自己的 frontmatter 字段 `type` 决定：`home` 渲染首页、`doc`（默认）渲染文档页、`page` 渲染空白页面容器、`content` 只渲染页面内容而不渲染布局外壳。`extendsPage` 只补充页面数据（`filePathRelative`、`routeMeta.title`），不改写 frontmatter；组件统一通过 `usePageType()` 取值（`useLayout().isHome`、`Layout.vue`、`VPContent.vue`）。VuePress 的 `layout` frontmatter 仅作为已注册布局名使用（自定义布局、`NotFound`）。
- **原因**：用户要求「只需要一个布局就只保留一个」，避免注册三个指向同一组件的多余布局；同时用生态自有的显式 `type` 语义替代 VitePress 兼容层，不引入 `originalLayout` 这类只为兼容 VitePress 判断而存在的字段。
- **优点**：布局注册表干净，主题只剩一个真正的布局入口；页面类型是显式 API，组件判断不再依赖 VitePress 的 frontmatter 约定；`extendsPage` 不改写用户数据，行为可预测；自定义布局（如 `layout: CommentPage`）不受影响；`NotFound` 与首页/文档页的判断解耦。
- **缺点**：页面类型是主题自有字段；VitePress 的 `layout: home|doc|page` 在 VuePress 中会被当作布局名解析（主题未注册这些布局，会抛 `[vuepress] Cannot resolve layout`），`layout: false` 则因不是字符串而被当作「未设置」回退到完整外壳。另外：页面类型切换完全由 `VPContent` 负责；`NotFound` 仍是第二个注册项（VuePress 核心要求在 `extendsPage` 之后才写 `frontmatter.layout = 'NotFound'`，主题无法提前改写）。
