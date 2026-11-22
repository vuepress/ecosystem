---
icon: code
---

# markdown-raw

<NpmBadge package="@vuepress/plugin-markdown-raw" />

为你的 VuePress 站点添加 `raw` 容器，并为 `raw` 容器的内容提供可选的样式隔离。

## 使用

```bash
npm i -D @vuepress/plugin-markdown-raw@next
```

```ts title=".vuepress/config.ts"
import { markdownRawPlugin } from '@vuepress/plugin-markdown-raw'

export default {
  plugins: [markdownRawPlugin()],
}
```

## 指南

### raw 容器

`raw` 容器会用 `<div class="vp-raw">` 元素包裹其内容。它用于放置由其他工具渲染、或从组件库复制的内容，这些内容的 DOM 不应该受到站点文档样式的影响。

包裹元素本身不会隔离样式。要让站点样式跳过包裹的内容，请启用 `isolateStyles` 选项，或手动使用插件导出的 PostCSS 插件（见 [样式隔离](#样式隔离)）。

```md
::: raw

任何内容，包括 HTML 与 Markdown。

:::
```

### 样式隔离

PostCSS 本身不提供将样式与 DOM 的某一部分隔离的能力。插件内置了 VitePress `postcssIsolateStyles` 的移植版本：它会为匹配的样式文件的选择器添加 `:not(:where(.vp-raw, .vp-raw *))` 前缀，使这些样式不会作用于 `raw` 容器内部。

启用 `isolateStyles: true` 后，插件会自动向打包器注入该 PostCSS 插件，无论你使用 `@vuepress/bundler-vite`、`@vuepress/bundler-webpack` 还是 `@vuepress/bundler-rspack`。

默认只隔离路径匹配 `/vp-doc\.css/` 或 `/base\.css/` 的样式文件，与 VitePress 布局保持一致。传入对象可隔离其他文件：

```ts title=".vuepress/config.ts"
import { markdownRawPlugin } from '@vuepress/plugin-markdown-raw'

export default {
  plugins: [
    markdownRawPlugin({
      isolateStyles: {
        includeFiles: [/vp-doc\.css/, /base\.css/, /my-article\.css/],
        ignoreFiles: [/my-article\.css/],
      },
    }),
  ],
}
```

如果你已经自行管理 PostCSS 插件，可以直接使用插件导出的函数：

```js title="postcss.config.js"
import { postcssIsolateStyles } from '@vuepress/plugin-markdown-raw'

export default {
  plugins: [postcssIsolateStyles()],
}
```

::: tip

只有当主题样式与 `raw` 内容出现在同一页面时，样式隔离才有意义。如果你的站点不需要，请保持 `isolateStyles: false`（默认值）。

:::

## 选项

::: fields
@`isolateStyles` type=`IsolateStylesOptions | boolean` default=`false`

是否将页面样式与 `raw` 容器的内容隔离。启用后会向打包器注入一个 PostCSS 插件。

@@`isolateStyles.includeFiles` type=`RegExp[]` default=`[/vp-doc\.css/, /base\.css/]`

需要隔离的样式文件，使用解析后的文件路径匹配。

@@`isolateStyles.ignoreFiles` type=`RegExp[]`

需要忽略的样式文件，使用解析后的文件路径匹配。

@@`isolateStyles.prefix` type=string default=`:not(:where(.vp-raw, .vp-raw *))`

添加到匹配的选择器上的前缀。

:::
