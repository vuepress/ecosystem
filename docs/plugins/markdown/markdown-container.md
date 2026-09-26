---
icon: package
---

# markdown-container

<NpmBadge package="@vuepress/plugin-markdown-container" />

Register markdown custom containers in your VuePress site.

This plugin simplifies the use of [markdown-it-container](https://github.com/markdown-it/markdown-it-container), but also retains its original capabilities.

## Usage

```bash
npm i -D @vuepress/plugin-markdown-container@next
```

```ts title=".vuepress/config.ts"
import { markdownContainerPlugin } from '@vuepress/plugin-markdown-container'

export default {
  plugins: [
    markdownContainerPlugin({
      // options
    }),
  ],
}
```

## Container Syntax

```md
::: <type> [info]
[content]
:::
```

- The `type` is required and should be specified via [type](#type) option.
- The `info` is optional, and the default value can be specified via `defaultInfo` in [locales](#locales) option.
- The `content` can be any valid markdown content.

::: tip
This plugin can be used multiple times to support different types of containers.
:::

## Options

::: fields
@`type` type=string required

The type of the container.

It will be used as the `name` param of [markdown-it-container](https://github.com/markdown-it/markdown-it-container#api).

@`locales` type=`Record<string, { defaultInfo: string }>` default=`{}`

The default `info` of the container in different locales.

If this option is not specified, the default `info` will fallback to the uppercase of the [type](#type) option.

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

See also: [Guide > I18n](https://vuejs.press/guide/i18n.html).

@@`locales.<localePath>.defaultInfo` type=string

The default `info` of the container in this locale.

@`before` type=`(info: string) => string`

A function to render the starting tag of the container.

The first param is the `info` part of [container syntax](#container-syntax).

This option will not take effect if you don't specify the [after](#after) option.

Its default value is:

```ts
;(info: string): string =>
  `<div class="custom-container ${type}">${info ? `<p class="custom-container-title">${info}</p>` : ''}\n`
```

@`after` type=`(info: string) => string` default=`(): string => '</div>\n'`

A function to render the ending tag of the container.

The first param is the `info` part of [container syntax](#container-syntax).

This option will not take effect if you don't specify the [before](#before) option.

@`render` type=`MarkdownItContainerRenderFunction`

The `render` option of [markdown-it-container](https://github.com/markdown-it/markdown-it-container#api).

This plugin uses a default `render` function. If you specify this option, the default `render` function will be replaced, and the [locales](#locales), [before](#before) and [after](#after) options will be ignored.

Its type is:

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

The `validate` option of [markdown-it-container](https://github.com/markdown-it/markdown-it-container#api).

@`marker` type=string default=`':'`

The `marker` option of [markdown-it-container](https://github.com/markdown-it/markdown-it-container#api).

:::
