# 不支持的 VitePress 功能

以下 VitePress 默认主题功能被**有意排除**在 `@vuepress/theme-new` 之外。这里集中列出功能范围与替代方案；其余偏差见[功能覆盖](./coverage.md)与[实现差异](./differences.md)。

## Carbon 广告

VitePress 可以在文档侧边栏显示 [Carbon Ads](https://www.carbonads.net/) 广告（`carbonAds` 配置项、`VPCarbonAds` 组件、`__CARBON__` 构建标记）。本主题不包含该组件、该配置项类型，也没有侧边栏集成。

- **替代方案**：无。Carbon 广告属于明确排除的范围。
- **替代方案**：配置中不提供 `carbonAds`，该字段不在 `ThemeConfig` 类型里，传入不会生效。

## VitePress 内置搜索 UI

VitePress 的本地搜索弹窗（`VPLocalSearchBox`）、虚拟模块 `@localSearchIndex`、MiniSearch 索引格式、搜索 worker 以及 `search` 主题配置项均未移植，`DefaultTheme.Config` 类型中已移除 `search` 字段。

- **替代方案**：任意注册全局 `SearchBox` 的生态搜索插件（`@vuepress/plugin-slimsearch`、`@vuepress/plugin-orama`、`@vuepress/plugin-flexsearch`、`@vuepress/plugin-search`、`@vuepress/plugin-meilisearch`、`@vuepress/plugin-docsearch`）。主题导航栏会自动挂载。

## VitePress 包 API

主题不提供 `vitepress` 包。站点代码中从 `vitepress` 或 `vitepress/theme` 导入的内容（`useData`、`useRouter`、`defineClientConfig`、`DefaultTheme` 类型等）不可用。主题内部也没有 VitePress 兼容层：移植的组件直接使用 `vuepress/client` 与 `@vuepress/plugin-theme-data/client` 的原生 API。

- **替代方案**：改用 `vuepress/client` 与 `@vuepress/plugin-theme-data/client` 中的等价 API；主题配置类型从 `@vuepress/theme-new` 导出的 `DefaultTheme` 获取。

## VitePress 的 SSR 图标收集 API

VitePress 2 的图标收集 API（SSR 期间写入 `ctx.vpIcons`、开发模式 `/_vpi/<collection>/<icon>.svg` 端点、构建期 `vp-icons.<hash>.css`）属于 VitePress 运行时与构建器专有，本主题不提供这些 API。

- **替代方案**：图标功能由 `@vuepress/plugin-icon` 提供（主题默认启用）。在线模式从图标服务加载并在客户端渲染；内网/离线部署可在主题选项 `icon` 中传 `offline: true` / `scan`，由插件在构建期扫描并打包站点用到的图标（需站点自行安装 `iconify-icon` 与对应 `@iconify-json/<prefix>` 图标集包）。
- **差异**：SSR HTML 中是空的 `<iconify-icon>` 元素，图标在 hydration 后显示；不提供 `/_vpi` 端点与构建期图标 CSS，因此无 JavaScript 时看不到图标。其余覆盖情况见[功能覆盖](./coverage.md)。

## 代码组语法与 JavaScript API

- VitePress 的 `::: code-group` + `[title]` 语法不支持；请改用 `::: code-tabs` + `@tab`（由 `@vuepress/plugin-markdown-tab` 提供）。
- VitePress 的 `useCodeGroups` composable 未移植；标签页切换由插件组件完成，选中态与联动通过 `tab-id` 配置。

## 提示容器的类名与自定义

提示容器由 `@vuepress/plugin-markdown-hint` 提供，输出类名是 `.hint-container` / `.hint-container-title`，标题前带图标；`::: tip {no-title}` 可去掉标题（仅认 info 串末尾的标记，`details` 忽略该标记）。外观通过插件的 CSS 变量调整（`--hint-*`、`--<type>-c-*`，以及在主题里覆盖 `--hint-font-size` 与调色板别名），不需要改组件或样式文件。

## 页面类型、head、appearance 与 markdown 配置

- **页面类型**：由 frontmatter `type: home | doc | page | content` 决定，默认 `doc`；`type: content` 只渲染页面内容、不渲染布局外壳。VuePress 的 `layout` 仍是「已注册布局名」，只用于自定义布局（如 `layout: CommentPage`）与内部的 `NotFound`。
- **主题选项**：选项类型是主题自己的 `ThemeConfig`，只包含主题支持的字段；VitePress 默认主题专有的配置项（如 `search`、`carbonAds`、`head`、`markdown`）不在类型中，写进配置会直接类型报错。
- **`head`**：由 VuePress 站点配置负责，通用的 `<link>` / `<script>` / `<meta>` 写法可以直接使用。不要手动引用 VitePress 构建期生成的资源（`vp-icons.<hash>.css`、VitePress 的 chunk 路径、`check-dark-mode` / `check-mac-os` 内联脚本等）：这些文件与脚本由 VitePress 构建器生成，本主题不产出它们；主题需要注入的 head 内容（暗色模式首屏脚本、图标样式等）由自己的模板与插件负责。
- **`appearance`**：支持 `boolean | 'dark' | 'force-dark' | 'force-auto'`。构建期会把取值写入 `<html data-appearance="…">`，首屏脚本据此决定配色，因此构建产物中 `force-dark` / `force-auto` 不会闪烁；dev 模式没有模板渲染，首帧仍按 storage 与系统偏好决定。
- **`markdown.*`**：markdown 行为由 VuePress 站点配置与插件负责（Shiki 配色、提示容器、代码组、容器扩展等），主题选项不包含也不读取 `markdown` 配置。

## 本就不属于主题的功能

以下内容从来不是主题功能，列出以避免与 VitePress 文档混淆：

- `vitepress dev` / `vitepress build` 命令行与 VitePress 的 bundler 配置。
- VitePress 的 markdown-it 设置、Shiki 配置与 `markdown.theme` 配置项——主题用 `@vuepress/plugin-shiki` 复刻了 VitePress 默认配色（`github-light` / `github-dark`），其余遵循 VuePress 的 markdown 配置。
- VitePress 的 web-types 生成与包元数据。
