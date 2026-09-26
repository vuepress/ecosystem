---
icon: siren
---

# markdown-hint

<NpmBadge package="@vuepress/plugin-markdown-hint" />

向你的 VuePress 站点添加 GFM 警告和提示容器。

该插件已经集成到默认主题中。

## 使用方法

```bash
npm i -D @vuepress/plugin-markdown-hint@next
```

```ts title=".vuepress/config.ts"
import { markdownHintPlugin } from '@vuepress/plugin-markdown-hint'

export default {
  plugins: [
    markdownHintPlugin({
      // 启用提示容器，默认启用
      hint: true,
      // 启用 GFM 警告
      alert: true,
    }),
  ],
}
```

## 指南

默认情况下，我们支持 `important`、`info`、`note`、`tip`、`warning`、`caution`、`details` 容器与 markdown 容器：

:::: preview

::: tip

一个带有 `code` 和[链接](https://example.com)的自定义提示容器。

```js
const a = 1
```

:::

::::

要自定义容器的标题，你可以在命名容器后添加标题：

:::: preview

::: important 自定义标题

一个带有自定义标题的重要容器。

:::

::::

容器可以只包含一个标题：

:::: preview

::: warning 警告文字
:::

::::

插件也提供了 `alert` 选项，以支持 GFM 警告：

```md
> [!note]
> This is note text

> [!important]
> This is important text

> [!tip]
> This is tip text

> [!warning]
> This is warning text

> [!caution]
> This is caution text
```

## 选项

::: fields
@hint@ type=boolean default=`true`

是否启用提示容器，包括 important、info、note、tip、warning、caution、details。

@alert@ type=boolean

是否启用 GFM 警告支持。

@injectStyles@ type=boolean default=`true`

是否注入默认样式。

@locales@ type=MarkdownHintPluginLocaleConfig

提示容器标题的本地化配置。

@@locales.important@ type=string

重要块的默认标题。

@@locales.note@ type=string

注释块的默认标题。

@@locales.tip@ type=string

提示块的默认标题。

@@locales.warning@ type=string

注意块的默认标题。

@@locales.caution@ type=string

警告块的默认标题。

@@locales.info@ type=string

信息块的默认标题。

@@locales.details@ type=string

详情块的默认标题。

:::
