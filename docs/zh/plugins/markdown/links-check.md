---
icon: list-checks
---

# links-check

<NpmBadge package="@vuepress/plugin-links-check" />

此插件检查你的 Markdown 文件中的死链接。

此插件已集成到默认主题中。

## 使用 {#usage}

```bash
npm i -D @vuepress/plugin-links-check@next
```

```ts title=".vuepress/config.ts"
import { linksCheckPlugin } from '@vuepress/plugin-links-check'

export default {
  plugins: [
    linksCheckPlugin({
      // 选项
    }),
  ],
}
```

## 指南 {#guide}

### 链接检查 {#link-checking}

插件会检查每个 Markdown 链接，并对目标文件不存在的链接给出警告。

链接会在开发服务器与构建时检查。设置 `build: 'error'` 可以在发现死链接时让构建失败。

使用 `exclude` 可以通过字符串、正则表达式或函数排除有意为之的失效链接。

### 锚点检查 {#anchor-checking}

链接的锚点也会被检查。当锚点不在目标页面中时，该链接将被视为死链接，无论目标页面是当前页面还是其他页面。

以下锚点会被识别：

- 标题 id，包括 `{#custom-id}` 指定的自定义 id。
- 裸 HTML 中的 id，如 `<div id="foo">`。
- 其他 Markdown 插件发布的 id，如 `@vuepress/plugin-markdown-field` 生成的字段 id。

设置 `anchors: 'same-page'` 可以只检查指向当前页面的锚点，设置为 `false` 可以跳过锚点检查。

当链接的目标页面不是由 Markdown 渲染时，该页面中的锚点未知，因此不会检查链接的锚点。

检查锚点时，链接会同时以原样（含锚点）和去掉锚点的路径与 `exclude` 比较。

## 选项 {#options}

::: fields
@`dev` type=boolean default=`true`

是否在开发服务器中检查 Markdown 中的死链接。

@`build` type=`boolean | 'error'` default=`true`

是否在构建时检查 Markdown 中的死链接。如果设置为 `'error'`，则在发现死链接时构建将失败。

@`anchors` type=`boolean | 'same-page'` default=`true`

是否检查链接的锚点。设置为 `'same-page'` 时仅检查指向当前页面的锚点，设置为 `false` 时跳过锚点检查。

参考：[锚点检查](#anchor-checking)。

@`exclude` type=`(string | RegExp)[] | ((link: string, isDev: boolean) => boolean)`

检查时需要排除的链接。你可以使用字符串或正则表达式的列表，或者返回布尔值的函数。

```ts title=".vuepress/config.ts"
import { linksCheckPlugin } from '@vuepress/plugin-links-check'

export default {
  plugins: [
    linksCheckPlugin({
      exclude: [
        // 通过字符串排除链接
        '/exclude-link',
        // 通过正则表达式排除链接
        /\/exclude-link-regex/,
      ],

      // 或者通过函数排除链接
      exclude: (link, isDev) => {
        if (isDev) {
          return link.startsWith('/exclude-link-dev')
        }
        return link.startsWith('/exclude-link-build')
      },
    }),
  ],
}
```

:::
