---
url: /plugins/markdown/markdown-hint.md
---
# markdown-hint

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

By default, we support `important`, `info`, `note`, `tip`, `warning`, `danger`, `details` containers with markdown container:

::: tip

A custom tip container with `code`, [link](#demo).

```js
const a = 1
```

:::

````md
::: tip

A custom tip container with `code`, [link](#demo).

```js
const a = 1
```

:::
````

To customize the title of the container, you can add the title after the named container:

::: important Custom Title

A important container with customized title.

:::

```md
::: important Custom Title

A important container with customized title.

:::
```

The container can contain a title only:

::: warning A warning text
:::

```md
::: warning A warning text
:::
```

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

### hint

* Type: `boolean`
* Details: Whether enable hint containers, enabled by default.

### alert

* Type: `boolean`
* Details: Whether enable gfm alert support.

### injectStyles

* Type: `boolean`
* Default: `true`
* Details: Whether to inject default styles.

### locales

* Type: `MarkdownHintPluginLocaleConfig`

  ```ts
  interface MarkdownHintPluginLocaleConfig {
    [localePath: string]: Partial<MarkdownHintPluginLocaleData>
  }

  interface MarkdownHintPluginLocaleData {
    /**
     * Default Title text for important block
     */
    important: string

    /**
     * Default Title text for note block
     */
    note: string

    /**
     * Default Title text for tip block
     */
    tip: string

    /**
     * Default Title text for warning block
     */
    warning: string

    /**
     * Default Title text for danger block
     */
    caution: string

    /**
     * Default Title text for info block
     */
    info: string

    /**
     * Default Title text for details block
     */
    details: string
  }
  ```

* Details: The locales for hint container titles.
