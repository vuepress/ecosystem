# prismjs

<NpmBadge package="@vuepress/plugin-prismjs" />

This plugin will enable syntax highlighting for markdown code fence with [Prism.js](https://prismjs.com/).

This plugin has been integrated into the default theme.

Notice that this plugin would only tokenize the code fence without adding styles. When using it with a custom theme, you may need to choose and import Prism.js style theme yourself.

## Usage

```bash
npm i -D @vuepress/plugin-prismjs@next
```

```ts
import { prismjsPlugin } from '@vuepress/plugin-prismjs'

export default {
  plugins: [
    prismjsPlugin({
      // options
    }),
  ],
}
```

## Options

### preloadLanguages

- Type: `string[]`

- Default: `['markdown', 'jsdoc', 'yaml']`

- Details:

  Languages to preload.

  By default, languages will be loaded on demand when parsing markdown files.

  However, Prism.js has [some potential issues](https://github.com/PrismJS/prism/issues/2716) about loading languages dynamically. To avoid them, you can preload languages via this option.

### lineNumbers

- Type: `boolean | number`

- Default: `true`

- Details:

  Configure code line numbers.

  - `true`: Enable line numbers.
  - `false`: Disable line numbers.
  - `number`: the minimum number of lines to enable line numbers.
    For example, if you set it to 4, line numbers will only be enabled when your code block has at least 4 lines of code.

  You can add `:line-numbers` / `:no-line-numbers` mark in your fenced code blocks to override the value set in config.

**Input:**

````md
```ts
// line-numbers is enabled by default
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts:no-line-numbers
// line-numbers is disabled
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```

```
````

**Output:**

```ts
// line-numbers is enabled by default
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts:no-line-numbers
// line-numbers is disabled
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

### highlightLines

- Type: `boolean`

- Default: `true`

- Details:

  Enable code line highlighting or not.

  You can highlight specified lines of your code blocks by adding line ranges mark in your fenced code blocks.

  Examples for line ranges mark:

  - Line ranges: `{5-8}`
  - Multiple single lines: `{4,7,9}`
  - Combined: `{4,7-13,16,23-27,40}`

::: tip
In the new version, we have rewritten the implementation of `highlightLines`. It now achieves line highlighting by adding the class name `highlighted` to `<span class="line">` within the code block.
:::

**Input:**

````md
```ts{1,7-9}
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  title: 'Hello, VuePress',

  theme: defaultTheme({
    logo: 'https://vuejs.org/images/logo.png',
  }),
})
```
````

**Output:**

```ts{1,7-9}
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  title: 'Hello, VuePress',

  theme: defaultTheme({
    logo: 'https://vuejs.org/images/logo.png',
  }),
})
```

### preWrapper

- Type: `boolean`

- Default: `true`

- Details:

  Enable the extra wrapper of the `<pre>` tag or not.

  The wrapper is required by the `lineNumbers`. That means, if you disable `preWrapper`, the line line numbers will also be disabled.

::: tip
You can disable it if you want to implement them in client side. For example,
[Prismjs Line Highlight](https://prismjs.com/plugins/line-highlight/) or [Prismjs Line Numbers](https://prismjs.com/plugins/line-numbers/).
:::

:::: tip

In the new version, some functionalities similar to [shiki](https://shiki.style/packages/transformers) have been implemented, allowing you to style code blocks using the same syntax.

The following features requires additional style to work, which should be handled by themes or users.

::: details View Styles Example
@[code{260-349}](@vuepress/theme-default/src/client/styles/code.scss)
:::

::::

### notationDiff

- Type: `boolean`

- Default: `false`

- Details:

  Whether enable notation diff

  Also see: [Shiki > Notation Diff](https://shiki.style/packages/transformers#transformernotationdiff)

### notationFocus

- Type: `boolean`

- Default: `false`

- Details:

  Whether enable notation focus.

  Also see: [Shiki > Notation Focus](https://shiki.style/packages/transformers#transformernotationfocus)

### notationHighlight

- Type: `boolean`

- Default: `false`

- Details:

  Whether enable notation highlight.

  Also see: [Shiki > Notation Highlight](https://shiki.style/packages/transformers#transformernotationhighlight)

### notationErrorLevel

- Type: `boolean`

- Default: `false`

- Details:

  Whether enable notation error level.

  Also see: [Shiki > Notation Error Level](https://shiki.style/packages/transformers#transformernotationerrorlevel)
