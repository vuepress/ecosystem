---
url: /plugins/markdown/shiki.md
---
# shiki

This plugin enables syntax highlighting for markdown code fence with [Shiki](https://shiki.style/).

::: tip

[Shiki](https://shiki.style/) is the syntax highlighter used by VSCode. It provides higher fidelity highlighting but may be slower than [Prism.js](https://prismjs.com/), especially when processing many code blocks.

:::

## Usage

```bash
npm i -D @vuepress/plugin-shiki@next
```

```ts title=".vuepress/config.ts"
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

* Type: `ShikiLang[]`

* Details: Additional languages to be parsed by Shiki.

  ::: tip

  The plugin automatically loads languages used in your markdown files, so manual specification is not required.

  :::

* Also see:
  * [Shiki > Languages](https://shiki.style/languages)

### langAlias

* Type: `{ [lang: string]: string }`

* Details: Custom language aliases for Shiki.

* Also see:
  * [Shiki > Custom Language Aliases](https://shiki.style/guide/load-lang#custom-language-aliases)

### theme

* Type: `ShikiTheme`

* Default: `'nord'`

* Details: Shiki theme to be applied to code blocks.

* Also see:
  * [Shiki > Themes](https://shiki.style/themes)

### themes

* Type: `{ light: ShikiTheme; dark: ShikiTheme }`

* Details: Dark/light dual themes for Shiki.

  The styles of both themes will be injected as `--shiki-light` and `--shiki-dark` CSS variables to code blocks:

  ```html
  <span style="--shiki-light:lightColor;--shiki-dark:darkColor;">code</span>
  ```

* Also see:
  * [Shiki > Dual Themes](https://shiki.style/guide/dual-themes)

### lineNumbers

* Type: `boolean | number | 'disable'`
* Default: `true`
* Details: Controls the display of line numbers.

  * `number`: minimum number of lines required to enable line numbers.
    For example, setting it to 4 will only enable line numbers when your code block has at least 4 lines.
  * `true`: enable line numbers globally.
  * `false`: disable line numbers globally.
  * `'disable'`: completely disable line numbers; `:line-numbers` will not take effect.

  You can add `:line-numbers` / `:no-line-numbers` markers to your fenced code blocks to override the config setting, and customize the starting number by adding `=` after `:line-numbers`. For example, `:line-numbers=2` will start line numbers from `2`.

::: preview

```ts:line-numbers
// line-numbers are enabled
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts :no-line-numbers
// line-numbers are disabled
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts :line-numbers=2
// line-numbers are enabled and start from 2
const line3 = 'This is line 3'
const line4 = 'This is line 4'
```

:::

### highlightLines

* Type: `boolean`
* Default: `true`
* Details: Whether to enable code line highlighting. You can highlight specified lines by adding line range markers to your fenced code blocks:
  * Line ranges: `{5-8}`
  * Multiple single lines: `{4,7,9}`
  * Combined: `{4,7-13,16,23-27,40}`

::: preview

```ts {1,7-9}
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  title: 'Hello, VuePress',

  theme: defaultTheme({
    logo: 'https://vuepress.vuejs.org/images/hero.png',
  }),
})
```

:::

### collapsedLines

* Type: `boolean | number | 'disable'`
* Default: `'disable'`
* Details: Default behavior of code block collapsing.

  * `number`: collapse the code block starting from line `number` by default, for example, `12` means collapsing the code block starting from line 12.
  * `true`: Equivalent to `15`, collapsing the code block starting from line 15 by default.
  * `false`: Add support for code block collapsing, but disable it globally
  * `'disable'`: Completely disable code block collapsing, `:collapsed-lines` will not take effect.

  To override global settings, you can add the `:collapsed-lines` / `:no-collapsed-lines` marker to the code block. You can also add `=` after `:collapsed-lines` to customize the starting line number being collapsed, for example, `:collapsed-lines=12` means collapsing the code block starting from line 12.

::: preview

```css :collapsed-lines
html {
  margin: 0;
  background: black;
  height: 100%;
}

body {
  margin: 0;
  width: 100%;
  height: inherit;
}

/* the three main rows going down the page */

body > div {
  height: 25%;
}

.thumb {
  float: left;
  width: 25%;
  height: 100%;
  object-fit: cover;
}

.main {
  display: none;
}
```

```css :no-collapsed-lines
html {
  margin: 0;
  background: black;
  height: 100%;
}

body {
  margin: 0;
  width: 100%;
  height: inherit;
}

/* the three main rows going down the page */

body > div {
  height: 25%;
}

.thumb {
  float: left;
  width: 25%;
  height: 100%;
  object-fit: cover;
}

.main {
  display: none;
}
```

```css :collapsed-lines=10
html {
  margin: 0;
  background: black;
  height: 100%;
}

body {
  margin: 0;
  width: 100%;
  height: inherit;
}

/* the three main rows going down the page */

body > div {
  height: 25%;
}

.thumb {
  float: left;
  width: 25%;
  height: 100%;
  object-fit: cover;
}

.main {
  display: none;
}
```

:::

### codeBlockTitle

* Type: `boolean | CodeBlockTitleRender`

  ```ts
  type CodeBlockTitleRender = (title: string, code: string) => string
  ```

* Default: `true`

* Details: Whether to enable code block title rendering. Add `title="Title"` after the code block \`\`\` to set the title.

  Pass a `CodeBlockTitleRender` function to customize title rendering.

* Example:

  ::: preview

  ```ts title="foo/baz.js"
  console.log('hello')
  ```

  :::

### notationDiff

* Type: `boolean`

* Default: `false`

* Details: Whether to enable notation diff.

* Example:

  ````md
  ```ts
  console.log('hewwo') // [\!code --]
  console.log('hello') // [\!code ++]
  console.log('goodbye')
  ```
  ````

  ```ts
  console.log('hewwo') // [!code --]
  console.log('hello') // [!code ++]
  console.log('goodbye')
  ```

* Also see:
  * [Shiki > Notation Diff](https://shiki.style/packages/transformers#transformernotationdiff)

### notationFocus

* Type: `boolean`

* Default: `false`

* Details: Whether to enable notation focus.

* Example:

  ````md
  ```ts
  console.log('Not focused')
  console.log('Focused') // [\!code focus]
  console.log('Not focused')
  ```
  ````

  ```ts
  console.log('Not focused')
  console.log('Focused') // [!code focus]
  console.log('Not focused')
  ```

* Also see:
  * [Shiki > Notation Focus](https://shiki.style/packages/transformers#transformernotationfocus)

### notationHighlight

* Type: `boolean`

* Default: `false`

* Details: Whether to enable notation highlight.

* Example:

  ````md
  ```ts
  console.log('Not highlighted')
  console.log('Highlighted') // [\!code highlight]
  console.log('Not highlighted')
  ```
  ````

  ```ts
  console.log('Not highlighted')
  console.log('Highlighted') // [!code highlight]
  console.log('Not highlighted')
  ```

* Also see:
  * [Shiki > Notation Highlight](https://shiki.style/packages/transformers#transformernotationhighlight)

### notationErrorLevel

* Type: `boolean`

* Default: `false`

* Details: Whether to enable notation error level.

* Example:

  ````md
  ```ts
  console.log('No errors or warnings')
  console.warn('Warning') // [\!code warning]
  console.error('Error') // [\!code error]
  ```
  ````

  ```ts
  console.log('No errors or warnings')
  console.warn('Warning') // [!code warning]
  console.error('Error') // [!code error]
  ```

* Also see:
  * [Shiki > Notation Error Level](https://shiki.style/packages/transformers#transformernotationerrorlevel)

### notationWordHighlight

* Type: `boolean`

* Default: `false`

* Details: Whether to enable notation word highlight.

  Word highlights must be written on separate lines.

* Example:

  Highlight words with comments

  ````md
  ```ts
  // [\!code word:Hello]
  const message = 'Hello World'
  console.log(message) // prints Hello World
  ```
  ````

  ```ts
  // [!code word:Hello]
  const message = 'Hello World'
  console.log(message) // prints Hello World
  ```

  Highlight words based on the meta string provided in the code snippet

  ::: preview

  ```js /Hello/
  const msg = 'Hello World'
  console.log(msg) // prints Hello World
  ```

  :::

* Also see:
  * [Shiki > Notation Word Highlight](https://shiki.style/packages/transformers#transformernotationwordhighlight)

### whitespace

* Type: `boolean | 'all' | 'boundary' | 'trailing'`

* Default: `false`

* Details: Whether to enable whitespace characters (spaces and tabs).

  * `true`: enable whitespace rendering but don't render any whitespace by default
  * `false`: completely disable whitespace rendering; `:whitespace` will not take effect
  * `'all'`: render all whitespace characters
  * `'boundary'`: render leading and trailing whitespace on each line
  * `'trailing'`: render trailing whitespace on each line

  You can add `:whitespace` / `:no-whitespace` markers to your fenced code blocks to override the config setting, and customize the render type by adding `=` after `:whitespace`. For example, `:whitespace=boundary` will render leading and trailing whitespace on each line.

* Example:

  ::: preview

  ```md :whitespace
  <!-- render all whitespace -->

  A text  
  with trailing spaces

      indented text
  ```

  ```md :whitespace=boundary
  <!-- render leading and trailing whitespace on each line -->

  A text  
  with trailing spaces

      indented text
  ```

  ```md :whitespace=trailing
  <!-- render trailing whitespace on each line -->

  A text  
  with trailing spaces

      indented text
  ```

  ```md :no-whitespace
  <!-- disable whitespace rendering -->

  A text  
  with trailing spaces

      indented text
  ```

  :::

* Also see:
  * [Shiki > Render Whitespace](https://shiki.style/packages/transformers#transformerrenderwhitespace)

### twoslash

* Type: `boolean | ShikiTwoslashOptions`

  ```ts
  interface ShikiTwoslashOptions extends TransformerTwoslashOptions {
    /**
     * Requires adding `twoslash` to the code block explicitly to run twoslash
     * @default true
     */
    explicitTrigger?: RegExp | boolean

    /**
     * twoslash options
     */
    twoslashOptions?: TransformerTwoslashOptions['twoslashOptions'] &
      VueSpecificOptions

    /**
     * The options for caching resolved types
     * @default true
     */
    typesCache?: TwoslashTypesCache | boolean
  }
  ```

* Default: `false`

* Details: Whether to enable [twoslash](https://github.com/twoslashes/twoslash).

  ::: tip

  For size optimization, the plugin doesn't include the `@vuepress/shiki-twoslash` package by default. You need to install it manually to use this feature.

  :::

* Also see:
  * [Shiki > Twoslash](https://shiki.style/packages/twoslash)
  * [Twoslash > TransformerTwoslashOptions](https://github.com/shikijs/shiki/blob/main/packages/twoslash/src/types.ts#L30)
  * [Twoslash > VueSpecificOptions](https://github.com/twoslashes/twoslash/blob/main/packages/twoslash-vue/src/index.ts#L36)
  * [TwoslashTypesCache](https://github.com/vuepress/ecosystem/blob/main/tools/shiki-twoslash/src/node/options.ts#L47)

* Example:

  ::: preview

  ```ts twoslash
  const a = 1
  const b = 23
  console.log(a + b)
  ```

  :::

  ::: warning

  For code blocks with `twoslash` enabled:

  * Don't add the `:v-pre` marker to code blocks, as this will prevent `twoslash` from running properly.

  * To avoid layout conflicts, line numbers will not be displayed for these code blocks.

  :::

## Advanced Options

### defaultLang

* Type: `string`
* Default: `'plain'`
* Details: Fallback language to use when the specified language is not available.

### logLevel

* Type: `'warn' | 'debug' | 'silent'`
* Default: `'warn'`
* Details: Log level for Shiki language detection.
  * `warn`: warn about each unknown language once (default)
  * `debug`: log every unknown code block with its file path (default when `--debug` flag is set)
  * `silent`: no warnings

### preWrapper

* Type: `boolean`
* Default: `true`
* Details: Whether to add an extra wrapper outside the `<pre>` tag.

  This wrapper is required for `lineNumbers` and `collapsedLines` features. If you disable `preWrapper`, line numbers and collapsed lines will also be disabled.

### shikiSetup

* Type: `(shiki: Highlighter) => void | Promise<void>`
* Details: A hook function to customize the Shiki highlighter instance.

### transformers

* Type: `ShikiTransformer[]`

* Details: Shiki transformers.

  This option will be passed to the `codeToHtml()` method of Shiki.

* Also see:
  * [Shiki > Transformers](https://shiki.style/guide/transformers)
