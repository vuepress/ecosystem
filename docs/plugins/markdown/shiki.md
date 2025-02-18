---
icon: highlighter
---

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

  Additional languages to be parsed by Shiki.

  ::: tip

  The plugin now automatically loads the languages used in your markdown files, so you don't need to specify them manually.

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

- Type: `boolean | number | 'disable'`

- Default: `true`

- Details:

  - `number`: the minimum number of lines to enable line numbers.
    For example, if you set it to 4, line numbers will only be enabled when your code block has at least 4 lines of code.
  - `true`: enable line numbers globally.
  - `false`: disable line numbers globally.
  - `'disable'`: Completely disable line numbers, `:line-numbers` will not take effect.

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

### collapsedLines

- Type: `boolean | number | 'disable'`

- Default: `'disable'`

- Details: Default behavior of code block collapsing.

  - `number`: collapse the code block starting from line `number` by default, for example, `12` means collapsing the code block starting from line 12.
  - `true`: Equivalent to `15`, collapsing the code block starting from line 15 by default.
  - `false`: Add support for code block collapsing, but disable it globally
  - `'disable'`: Completely disable code block collapsing, `:collapsed-lines` will not take effect.

  To override global settings, you can add the `:collapsed-lines` / `:no-collapsed-lines` marker to the code block. You can also add `=` after `:collapsed-lines` to customize the starting line number being collapsed, for example, `:collapsed-lines=12` means collapsing the code block starting from line 12.

**Input:**

````md
<!-- Collapsed by default starting from line 15 -->

```css :collapsed-lines
html {
  margin: 0;
  background: black;
  height: 100%;
}
/* ... more code */
```

<!-- Disabled collapsed -->

```css :no-collapsed-lines
html {
  margin: 0;
  background: black;
  height: 100%;
}
/* ... more code */
```

<!-- Collapsed starting from line 10 -->

```css :collapsed-lines=10
html {
  margin: 0;
  background: black;
  height: 100%;
}
/* ... more code */
```
````

**Output:**

<!-- Collapsed by default starting from line 15 -->

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

.blowup {
  display: block;
  position: absolute;
  object-fit: contain;
  object-position: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2000;
}

.darken {
  opacity: 0.4;
}
```

<!-- Disabled collapsed -->

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

.blowup {
  display: block;
  position: absolute;
  object-fit: contain;
  object-position: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2000;
}

.darken {
  opacity: 0.4;
}
```

<!-- Collapsed starting from line 10 -->

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

.blowup {
  display: block;
  position: absolute;
  object-fit: contain;
  object-position: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2000;
}

.darken {
  opacity: 0.4;
}
```

### notationDiff

- Type: `boolean`

- Default: `false`

- Details: Whether enable notation diff.

- Example:

  **Input:**

  ````md
  ```ts
  console.log('hewwo') // [\!code --]
  console.log('hello') // [\!code ++]
  console.log('goodbye')
  ```
  ````

  **Output:**

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

  **Input:**

  ````md
  ```ts
  console.log('Not focused')
  console.log('Focused') // [\!code focus]
  console.log('Not focused')
  ```
  ````

  **Output:**

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

  **Input:**

  ````md
  ```ts
  console.log('Not highlighted')
  console.log('Highlighted') // [\!code highlight]
  console.log('Not highlighted')
  ```
  ````

  **Output:**

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

  **Input:**

  ````md
  ```ts
  console.log('No errors or warnings')
  console.warn('Warning') // [\!code warning]
  console.error('Error') // [\!code error]
  ```
  ````

  **Output:**

  ```ts
  console.log('No errors or warnings')
  console.warn('Warning') // [!code warning]
  console.error('Error') // [!code error]
  ```

- Also see:
  - [Shiki > Notation Error Level](https://shiki.style/packages/transformers#transformernotationerrorlevel)

### notationWordHighlight

- Type: `boolean`

- Default: `false`

- Details: Whether enable notation word highlight.

  Word highlight must be written on a separate line.

- Example:

  **Input:**

  ````md
  ```ts
  // [\!code word:Hello]
  const message = 'Hello World'
  console.log(message) // prints Hello World
  ```
  ````

  **Output:**

  ```ts
  // [!code word:Hello]
  const message = 'Hello World'
  console.log(message) // prints Hello World
  ```

- Example：Highlight words based on the meta string provided on the code snippet

  **Input:**

  ````md
  ```js /Hello/
  const msg = 'Hello World'
  console.log(msg)
  console.log(msg) // prints Hello World
  ```
  ````

  **Output:**

  ```js /Hello/
  const msg = 'Hello World'
  console.log(msg)
  console.log(msg) // prints Hello World
  ```

- Also see:

  - [Shiki > Notation Word Highlight](https://shiki.style/packages/transformers#transformernotationwordhighlight)

### whitespace

- Type: `boolean | 'all' | 'boundary' | 'trailing'`

- Default: `false`

- Details: Whether enable whitespace characters (Space and Tab).

  - `true`: enable render whitespace, same of `all`
  - `false`: disable render whitespace
  - `'all'`: render all whitespace
  - `'boundary'`: render leading and trailing whitespace of the line
  - `'trailing'`: render trailing whitespace of the line

  You can add `:whitespace / :no-whitespace` mark in your fenced code blocks to override the value set in config, and customize the render type by adding `=` after `:whitespace`. For example `:whitespace=boundary` will render leading and trailing whitespace of the line.

- Example:

  **Input:**

  ````md
  ```md :whitespace
  <!-- render all whitespace -->

  A text  
  with trailing spaces

      indented text
  ```

  ```md :whitespace=boundary
  <!-- render leading and trailing whitespace of the line -->

  A text  
  with trailing spaces

      indented text
  ```

  ```md :whitespace=trailing
  <!-- render trailing whitespace of the line -->

  A text  
  with trailing spaces

      indented text
  ```

  ```md :no-whitespace
  <!-- disable render whitespace -->

  A text  
  with trailing spaces

      indented text
  ```
  ````

  **Output:**

  ```md :whitespace
  <!-- render all whitespace -->

  A text  
  with trailing spaces

      indented text
  ```

  ```md :whitespace=boundary
  <!-- render leading and trailing whitespace of the line -->

  A text  
  with trailing spaces

      indented text
  ```

  ```md :whitespace=trailing
  <!-- render trailing whitespace of the line -->

  A text  
  with trailing spaces

      indented text
  ```

  ```md :no-whitespace
  <!-- disable render whitespace -->

  A text  
  with trailing spaces

      indented text
  ```

- Also see：
  - [Shiki > Render Whitespace](https://shiki.style/packages/transformers#transformerrenderwhitespace)

### twoslash

- Type: `boolean | ShikiTwoslashOptions`

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

- Default: `false`

- Details: Whether enable [twoslash](https://github.com/twoslashes/twoslash).

  ::: tip

  For size reasons, the plugin does not include the `@vuepress/shiki-twoslash` package by default. If you want to use it, you need to install it manually.

  :::

- Also see:

  - [Shiki > Twoslash](https://shiki.style/packages/twoslash)
  - [Twoslash > TransformerTwoslashOptions](https://github.com/shikijs/shiki/blob/main/packages/twoslash/src/types.ts#L30)
  - [Twoslash > VueSpecificOptions](https://github.com/twoslashes/twoslash/blob/main/packages/twoslash-vue/src/index.ts#L36)
  - [TwoslashTypesCache](https://github.com/vuepress/ecosystem/blob/main/tools/shiki-twoslash/src/node/options.ts#L47)

- Example:

  **Input:**

  ````md
  ```ts twoslash
  const a = 1
  const b = 2
  console.log(a + b)
  ```
  ````

  **Output:**

  ```ts twoslash
  const a = 1
  const b = 23
  console.log(a + b)
  ```

  ::: warning

  For code blocks that have `twoslash` enabled:

  - Do not add the `:v-pre` marker in the code block, as this will cause `twoslash` to fail to run properly.

  - To avoid layout conflicts, code blocks will no longer display line numbers.

  :::

## Advanced Options

### defaultLang

- Type: `string`

- Default: `''`

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

  The wrapper is required by the `lineNumbers` and `collapsedLines`. That means, if you disable `preWrapper`, the line line numbers and collapsed lines will also be disabled.

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
