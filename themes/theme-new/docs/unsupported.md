# 不支持的 VitePress 功能

以下 VitePress 默认主题功能被**有意排除**在 `@vuepress/theme-new` 之外。这里集中列出，方便迁移前评估；其余偏差见[功能覆盖](./coverage.md)与[实现差异](./differences.md)。

## Carbon 广告

VitePress 可以在文档侧边栏显示 [Carbon Ads](https://www.carbonads.net/) 广告（`carbonAds` 配置项、`VPCarbonAds` 组件、`__CARBON__` 构建标记）。本主题不包含该组件、该配置项类型，也没有侧边栏集成。

- **替代方案**：无。Carbon 广告属于明确排除的范围。
- **迁移方式**：从主题配置中删除 `carbonAds`；该配置项已不再有类型，传入会被忽略。

## VitePress 内置本地搜索 UI

VitePress 的本地搜索弹窗（`VPLocalSearchBox`）、虚拟模块 `@localSearchIndex`、MiniSearch 索引格式、搜索 worker 以及 `search` 主题配置项均未移植，`DefaultTheme.Config` 类型中已移除 `search` 字段。

- **替代方案**：任意注册全局 `SearchBox` 的生态搜索插件（`@vuepress/plugin-slimsearch`、`@vuepress/plugin-orama`、`@vuepress/plugin-flexsearch`、`@vuepress/plugin-search`、`@vuepress/plugin-meilisearch`、`@vuepress/plugin-docsearch`）。主题导航栏会自动挂载。
- **迁移方式**：删除 `search` 配置项，按需安装并配置搜索插件。

## Algolia 搜索 UI

`VPAlgoliaSearchBox`、`algolia` 主题配置项、`__ALGOLIA__` 构建标记以及 `@docsearch/*` 运行时依赖均未移植。

- **替代方案**：`@vuepress/plugin-docsearch`（同样的 Algolia DocSearch 后端，VuePress 原生实现）。

## VitePress 包 API

主题不提供 `vitepress` 包。站点代码中从 `vitepress` 或 `vitepress/theme` 导入的内容（`useData`、`useRouter`、`defineClientConfig`、`DefaultTheme` 类型等）不可用。主题内部也没有 VitePress 兼容层：移植的组件直接使用 `vuepress/client` 与 `@vuepress/plugin-theme-data/client` 的原生 API。

- **替代方案**：改用 `vuepress/client` 与 `@vuepress/plugin-theme-data/client` 中的等价 API；主题配置类型从 `@vuepress/theme-new` 导出的 `DefaultTheme` 获取。

## VitePress 的 SSR 图标收集端点

VitePress 2 会在 SSR 期间收集用到的图标（`ctx.vpIcons`），开发模式通过 `/_vpi/<collection>/<icon>.svg` 提供，构建期输出 `vp-icons.<hash>.css`，因此图标在无 JavaScript 时也能显示。本主题改用 `@vuepress/plugin-icon`：图标由 iconify 的 `<iconify-icon>` Web Component 在客户端渲染，图标集从图标服务加载。

- **影响**：服务端渲染出的 HTML 中只有空的 `<iconify-icon>` 元素，图标在 hydration 后才出现；离线或无法访问图标服务时图标不显示。若需要构建期图标 CSS，需要改进 `@vuepress/plugin-icon`（见[实现差异](./differences.md)）。图标覆盖情况见[功能覆盖](./coverage.md)。

## 代码组语法与 JavaScript API

- VitePress 的 `::: code-group` + `[title]` 语法不支持；请改用 `::: code-tabs` + `@tab`（由 `@vuepress/plugin-markdown-tab` 提供）。
- VitePress 的 `useCodeGroups` composable 未移植；标签页切换由插件组件完成，选中态与联动通过 `tab-id` 配置。

## VitePress 的容器类名与 `{no-title}` 语法

容器由 `@vuepress/plugin-markdown-hint` 提供，输出的类名是 `.hint-container` / `.hint-container-title`，不是 VitePress 的 `.custom-block` / `.custom-block-title`，针对旧类名的自定义样式不会生效。VitePress 2 的 `::: tip {no-title}`（去掉标题）也没有实现，`{no-title}` 会作为标题文本输出；若需要，应在插件中补充该能力（见[差异](./differences.md)）。

## VitePress 专有的 frontmatter 与站点配置

页面类型不再读 VitePress 的 `layout`，请改用 `type`。`layout: home|doc|page` 会被 VuePress 当作布局名解析，因主题没有注册这些布局而抛出 `[vuepress] Cannot resolve layout: <name>`；`layout: false` 会被当作「未设置」并回退到完整布局外壳。其余字段会被主题接受，但在 VuePress 中没有效果：引用 VitePress 专有资源的 `head` 项、依赖 VitePress 运行时的 `appearance` 取值（`'force-dark'` / `'force-auto'` 仍由主题解释；但 `templates/build.html` 的首屏内联脚本只能读取 storage 与系统偏好，无法感知站点配置，因此这两个取值在首帧可能先渲染成另一套配色，hydrate 后立即纠正）、以及 VitePress 专有的 `markdown.*` 配置。请改用 VuePress 的等价配置。

## 本就不属于主题的功能

以下内容从来不是主题功能，列出以避免与 VitePress 文档混淆：

- `vitepress dev` / `vitepress build` 命令行与 VitePress 的 bundler 配置。
- VitePress 的 markdown-it 设置、Shiki 配置与 `markdown.theme` 配置项——主题用 `@vuepress/plugin-shiki` 复刻了 VitePress 默认配色（`github-light` / `github-dark`），其余遵循 VuePress 的 markdown 配置。
- VitePress 的 web-types 生成与包元数据。
