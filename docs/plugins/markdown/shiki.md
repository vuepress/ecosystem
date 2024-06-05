# shiki

<NpmBadge package="@vuepress/plugin-shiki" />

This plugin will enable syntax highlighting for markdown code fence with [Shiki](https://shiki.style/).

::: tip

[Shiki](https://shiki.style/) is the syntax highlighter being used by VSCode. It has higher fidelity, but it could be slower than [Prism.js](https://prismjs.com/), especially when you have a lot of code blocks.

:::

## Usage

```bash
npm i -D @vuepress/plugin-shiki@next
```

```ts
import { shikiPlugin } from '@vuepress/plugin-shiki'

export default {
  plugins: [
    shikiPlugin({
      // options
      langs: ['ts', 'json', 'vue', 'md', 'bash', 'diff'],
    }),
  ],
}
```

## Options

### langs

- Type: `ShikiLang[]`

- Details:

  Languages of code blocks to be parsed by Shiki.

  This option will be forwarded to `getHighlighter()` method of Shiki.

  ::: warning

  We recommend you to provide the languages list you are using explicitly, otherwise Shiki will load all languages and can affect performance.

  :::

- Also see:
  - [Shiki > Languages](https://shiki.style/languages)

### langAlias

- Type: `{ [lang: string]: string }`

- Details: Customize language aliases for Shiki.

- Also see:
  - [Shiki > Custom Language Aliases](https://shiki.style/guide/load-lang#custom-language-aliases)

### theme

- Type: `ShikiTheme`

- Default: `'nord'`

- Details: Theme of Shiki, will be applied to code blocks.

- Also see:
  - [Shiki > Themes](https://shiki.style/themes)

### themes

- Type: `{ light: ShikiTheme; dark: ShikiTheme }`

- Details:

  Dark / Light Dual themes of Shiki.

  The styles of the 2 themes will be injected as `--shiki-light` and `--shiki-dark` to code blocks:

  ```html
  <span style="--shiki-light:lightColor;--shiki-dark:darkColor;">code</span>
  ```

- Also see:
  - [Shiki > Dual Themes](https://shiki.style/guide/dual-themes)

### lineNumbers

- Type: `boolean | number`

- Default: `true`

- Details:

  - `true`: enable line numbers.
  - `false`: disabled line numbers.
  - `number`: the minimum number of lines to enable line numbers.
    For example, if you set it to 4, line numbers will only be enabled when your code block has at least 4 lines of code.

  You can add `:line-numbers` / `:no-line-numbers` mark in your fenced code blocks to override the value set in config, and customize the beginning number by adding `=` after `:line-numbers`. For example, `:line-numbers=2` means the line numbers in code blocks will start from `2`.

**Input:**

````md
```ts:line-numbers
// line-numbers is enabled
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts :no-line-numbers
// line-numbers is disabled
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts :line-numbers=2
// line-numbers is enabled and start from 2
const line3 = 'This is line 3'
const line4 = 'This is line 4'
```
````

**Output:**

```ts :line-numbers
// line-numbers is enabled
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts :no-line-numbers
// line-numbers is disabled
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts :line-numbers=2
// line-numbers is enabled and start from 2
const line3 = 'This is line 3'
const line4 = 'This is line 4'
```

### highlightLines

- Type: `boolean`

- Default: `true`

- Details:

  Whether enable code line highlighting. You can highlight specified lines of your code blocks by adding line ranges mark in your fenced code blocks:

  - Line ranges: `{5-8}`
  - Multiple single lines: `{4,7,9}`
  - Combined: `{4,7-13,16,23-27,40}`

**Input:**

````md
```ts {1,7-9}
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

```ts {1,7-9}
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  title: 'Hello, VuePress',

  theme: defaultTheme({
    logo: 'https://vuejs.org/images/logo.png',
  }),
})
```

:::: tip

The following features requires additional style to work, which should be handled by themes or users.

::: details View Styles Example
@[code{260-349}](@vuepress/theme-default/src/client/styles/content/code.scss)
:::

::::

### notationDiff

- Type: `boolean`

- Default: `false`

- Details: Whether enable notation diff.

- Example:

  ```ts
  console.log('hewwo') // [!code --]
  console.log('hello') // [!code ++]
  console.log('goodbye')
  ```

- Also see:
  - [Shiki > Notation Diff](https://shiki.style/packages/transformers#transformernotationdiff)

### notationFocus

- Type: `boolean`

- Default: `false`

- Details: Whether enable notation focus.

- Example:

  ```ts
  console.log('Not focused')
  console.log('Focused') // [!code focus]
  console.log('Not focused')
  ```

- Also see:
  - [Shiki > Notation Focus](https://shiki.style/packages/transformers#transformernotationfocus)

### notationHighlight

- Type: `boolean`

- Default: `false`

- Details: Whether enable notation highlight.

- Example:

  ```ts
  console.log('Not highlighted')
  console.log('Highlighted') // [!code highlight]
  console.log('Not highlighted')
  ```

- Also see:
  - [Shiki > Notation Highlight](https://shiki.style/packages/transformers#transformernotationhighlight)

### notationErrorLevel

- Type: `boolean`

- Default: `false`

- Details: Whether enable notation error level.

- Example:

  ```ts
  console.log('No errors or warnings')
  console.warn('Warning') // [!code warning]
  console.error('Error') // [!code error]
  ```

- Also see:
  - [Shiki > Notation Error Level](https://shiki.style/packages/transformers#transformernotationerrorlevel)

## Advanced Options

### defaultLang

- Type: `string`

- Default: `'plain'`

- Details: Fallback language when the specified language is not available.

### logLevel

- Type: `'warn' | 'debug' | 'silent'`

- Default: `'warn'`

- Details:

  Log level of Shiki language detection.

  - `warn`: warn each unknown lang one time (default)
  - `debug`: log every unknown code block with its file path. (default when `--debug` flag is set)
  - `silent`: no warning

### preWrapper

- Type: `boolean`

- Default: `true`

- Details:

  Adds extra wrapper outside `<pre>` tag or not.

  The wrapper is required by the `lineNumbers`. That means, if you disable `preWrapper`, the line line numbers will also be disabled.

### shikiSetup

- Type: `(shiki: Highlighter) => void | Promise<void>`

- Details: A function hook to customize Shiki highlighter instance.

### transformers

- Type: `ShikiTransformer[]`

- Details:

  Transformers of Shiki.

  This option will be forwarded to `codeToHtml()` method of Shiki.

- Also see:
  - [Shiki > Transformers](https://shiki.style/guide/transformers)
