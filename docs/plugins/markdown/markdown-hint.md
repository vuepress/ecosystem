---
icon: siren
---

# markdown-hint

<NpmBadge package="@vuepress/plugin-markdown-hint" />

Add gfm alerts and hint containers to your VuePress site.

This plugin has been integrated into the default theme.

## Usage

```bash
npm i -D @vuepress/plugin-markdown-hint@next
```

```ts title=".vuepress/config.ts"
import { markdownHintPlugin } from '@vuepress/plugin-markdown-hint'

export default {
  plugins: [
    markdownHintPlugin({
      // Enable hint container, true by default
      hint: true,
      // Enable gfm alert
      alert: true,
    }),
  ],
}
```

## Guide

By default, we support `important`, `info`, `note`, `tip`, `warning`, `caution`, `details` containers with markdown container:

:::: preview

::: tip

A custom tip container with `code` and [links](https://example.com).

```js
const a = 1
```

:::

::::

To customize the title of the container, you can add the title after the named container:

:::: preview

::: important Custom Title

An important container with customized title.

:::

::::

The container can contain a title only:

:::: preview

::: warning A warning text
:::

::::

The plugin also provides an `alert` option to support gfm alerts:

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

## Options

::: fields
@hint@ type=boolean default=`true`

Whether to enable hint containers including important, info, note, tip, warning, caution, details.

@alert@ type=boolean

Whether to enable GFM alert support.

@injectStyles@ type=boolean default=`true`

Whether to inject default styles.

@locales@ type=MarkdownHintPluginLocaleConfig

Locale config for hint container titles.

@@locales.important@ type=string

Default title text for important block.

@@locales.note@ type=string

Default title text for note block.

@@locales.tip@ type=string

Default title text for tip block.

@@locales.warning@ type=string

Default title text for warning block.

@@locales.caution@ type=string

Default title text for caution block.

@@locales.info@ type=string

Default title text for info block.

@@locales.details@ type=string

Default title text for details block.

:::
