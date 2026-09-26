---
icon: package
---

# markdown-container

<NpmBadge package="@vuepress/plugin-markdown-container" />

为你的 VuePress 站点注册自定义容器。

该插件简化了 [markdown-it-container](https://github.com/markdown-it/markdown-it-container) 的使用方法，但同时也保留了其原本的能力。

## 使用方法

```bash
npm i -D @vuepress/plugin-markdown-container@next
```

```ts title=".vuepress/config.ts"
import { markdownContainerPlugin } from '@vuepress/plugin-markdown-container'

export default {
  plugins: [
    markdownContainerPlugin({
      // 配置项
    }),
  ],
}
```

## 容器语法

```md
::: <type> [info]
[content]
:::
```

- `type` 是必需的，应通过 [type](#type) 配置项来指定。
- `info` 是可选的，其默认值可以通过 [locales](#locales) 的 `defaultInfo` 配置项来指定。
- `content` 可以是任何合法的 Markdown 内容。

::: tip
该插件可以被多次使用，以便支持不同类型的容器。
:::

## 选项

::: fields
@`type` type=string required

容器的类型。

它将会被用作 [markdown-it-container](https://github.com/markdown-it/markdown-it-container#api) 的 `name` 参数。

@`locales` type=`Record<string, { defaultInfo: string }>` default=`{}`

容器在不同 locales 下的默认 `info`。

如果没有指定该配置项，默认 `info` 会使用大写的 [type](#type)。

```ts title=".vuepress/config.ts"
export default {
  plugins: [
    markdownContainerPlugin({
      type: 'tip',
      locales: {
        '/': {
          defaultInfo: 'TIP',
        },
        '/zh/': {
          defaultInfo: '提示',
        },
      },
    }),
  ],
}
```

参考：[指南 > 多语言支持](https://vuejs.press/zh/guide/i18n.html)。

@@`locales.<localePath>.defaultInfo` type=string

容器在该 locale 下的默认 `info`。

@`before` type=`(info: string) => string`

一个用于渲染容器起始标签的函数。

第一个参数是 [容器语法](#容器语法) 的 `info` 部分。

如果你没有设置 [after](#after) 配置项，则该配置项也不会生效。

它的默认值为：

```ts
;(info: string): string =>
  `<div class="custom-container ${type}">${info ? `<p class="custom-container-title">${info}</p>` : ''}\n`
```

@`after` type=`(info: string) => string` @default=`(): string => '</div>\n'`

一个用于渲染容器结束标签的函数。

第一个参数是 [容器语法](#容器语法) 的 `info` 部分。

如果你没有设置 [before](#before) 配置项，则该配置项也不会生效。

@`render` type=`MarkdownItContainerRenderFunction`

[markdown-it-container](https://github.com/markdown-it/markdown-it-container#api) 的 `render` 配置项。

该插件使用了一个默认的 `render` 函数。但如果你指定了该配置项，那么默认的 `render` 函数就会被替换掉，此时 [locales](#locales)、[before](#before) 和 [after](#after) 配置项都会被忽略。

它的类型为：

```ts
type MarkdownItContainerRenderFunction = (
  tokens: Token[],
  index: number,
  options: unknown,
  env: MarkdownEnv,
  self: Renderer,
) => string
```

@`validate` type=`(params: string) => boolean`

[markdown-it-container](https://github.com/markdown-it/markdown-it-container#api) 的 `validate` 配置项。

@`marker` type=string default=`':'`

[markdown-it-container](https://github.com/markdown-it/markdown-it-container#api) 的 `marker` 配置项。

:::
