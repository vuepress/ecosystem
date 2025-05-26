---
url: /plugins/markdown/prismjs.md
---
# prismjs

This plugin will enable syntax highlighting for markdown code fence with [Prism.js](https://prismjs.com/).

This plugin has been integrated into the default theme.

Notice that this plugin would only tokenize the code fence without adding styles. When using it with a custom theme, you may need to choose and import Prism.js style theme yourself.

## Usage

```bash
npm i -D @vuepress/plugin-prismjs@next
```

```ts title=".vuepress/config.ts"
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

### theme

* Type: `PrismjsTheme`

* Default: `'nord'`

* Details: Theme of Prismjs, will be applied to code blocks.

### themes

* Type: `{ light: PrismjsTheme; dark: PrismjsTheme }`

* Details:

  Apply Light / Dark Dual themes.

  Note: To use this, your theme must set `data-theme="dark"` attribute on the `<html>` tag when dark mode is enabled.

::: tip Available Prism.js Light themes

* ateliersulphurpool-light
* coldark-cold
* coy
* duotone-light
* ghcolors
* gruvbox-light
* material-light
* one-light
* vs

:::

::: tip Available Prism.js Dark themes

* atom-dark
* cb
* coldark-dark
* dark
* dracula
* duotone-dark
* duotone-earth
* duotone-forest
* duotone-sea
* duotone-space
* gruvbox-dark
* holi
* hopscotch
* lucario
* material-dark
* material-oceanic
* night-owl
* nord
* one-dark
* pojoaque
* shades-of-purple
* solarized-dark-atom
* tomorrow
* vsc-dark-plus
* xonokai
* z-touch

:::

### lineNumbers

* Type: `boolean | number | 'disable'`

* Default: `true`

* Details:

  * `number`: the minimum number of lines to enable line numbers.
    For example, if you set it to 4, line numbers will only be enabled when your code block has at least 4 lines of code.
  * `true`: enable line numbers globally.
  * `false`: disable line numbers globally.
  * `'disable'`: Completely disable line numbers, `:line-numbers` will not take effect.

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

* Type: `boolean`

* Default: `true`

* Details:

  Whether enable code line highlighting. You can highlight specified lines of your code blocks by adding line ranges mark in your fenced code blocks:

  * Line ranges: `{5-8}`
  * Multiple single lines: `{4,7,9}`
  * Combined: `{4,7-13,16,23-27,40}`

**Input:**

````md
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
````

**Output:**

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

### collapsedLines

* Type: `boolean | number | 'disable'`

* Default: `'disable'`

* Details: Default behavior of code block collapsing.

  * `number`: collapse the code block starting from line `number` by default, for example, `12` means collapsing the code block starting from line 12.
  * `true`: Equivalent to `15`, collapsing the code block starting from line 15 by default.
  * `false`: Add support for code block collapsing, but disable it globally
  * `'disable'`: Completely disable code block collapsing, `:collapsed-lines` will not take effect.

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

### codeBlockTitle

* Type: `boolean | CodeBlockTitleRender`

  ```ts
  type CodeBlockTitleRender = (title: string, code: string) => string
  ```

* Default: `true`

* Details: Whether to enable code block title rendering. Add `title="Title"` after the code block \`\`\` to set the title.

  Pass `CodeBlockTitleRender` to customize the title rendering.

* Example:

  **Input:**

  ````md {1}
  ```ts title="foo/baz.js"
  console.log('hello')
  ```
  ````

  **Output:**

  ```ts title="foo/baz.js"
  console.log('hello')
  ```

::: tip

In the new version, some functionalities similar to [shiki](https://shiki.style/packages/transformers) have been implemented, allowing you to style code blocks using the same syntax.

:::

### notationDiff

* Type: `boolean`

* Default: `false`

* Details: Whether enable notation diff.

* Example:

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

* Also see:
  * [Shiki > Notation Diff](https://shiki.style/packages/transformers#transformernotationdiff)

### notationFocus

* Type: `boolean`

* Default: `false`

* Details: Whether enable notation focus.

* Example:

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

* Also see:
  * [Shiki > Notation Focus](https://shiki.style/packages/transformers#transformernotationfocus)

### notationHighlight

* Type: `boolean`

* Default: `false`

* Details: Whether enable notation highlight.

* Example:

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

* Also see:
  * [Shiki > Notation Highlight](https://shiki.style/packages/transformers#transformernotationhighlight)

### notationErrorLevel

* Type: `boolean`

* Default: `false`

* Details: Whether enable notation error level.

* Example:

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

* Also see:
  * [Shiki > Notation Error Level](https://shiki.style/packages/transformers#transformernotationerrorlevel)

### notationWordHighlight

* Type: `boolean`

* Default: `false`

* Details: Whether enable notation word highlight.

  Word highlight must be written on a separate line.

* Example:

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

* Example：Highlight words based on the meta string provided on the code snippet

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

* Also see:

  * [Shiki > Notation Word Highlight](https://shiki.style/packages/transformers#transformernotationwordhighlight)

### whitespace

* Type: `boolean | 'all' | 'boundary' | 'trailing'`

* Default: `false`

* Details: Whether enable whitespace characters (Space and Tab).

  * `true`: enable whitespace, but not render any whitespace by default
  * `false`: completely disable render whitespace, `:whitespace` will not take effect.
  * `'all'`: render all whitespace
  * `'boundary'`: render leading and trailing whitespace of the line
  * `'trailing'`: render trailing whitespace of the line

  You can add `:whitespace / :no-whitespace` mark in your fenced code blocks to override the value set in config, and customize the render type by adding `=` after `:whitespace`. For example `:whitespace=boundary` will render leading and trailing whitespace of the line.

* Example:

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

* Also see：
  * [Shiki > Render Whitespace](https://shiki.style/packages/transformers#transformerrenderwhitespace)

### preloadLanguages

* Type: `string[]`

* Default: `['markdown', 'jsdoc', 'yaml']`

* Details:

  Languages to preload.

  By default, languages will be loaded on demand when parsing markdown files.

  However, Prism.js has [some potential issues](https://github.com/PrismJS/prism/issues/2716) about loading languages dynamically. To avoid them, you can preload languages via this option.

### preWrapper

* Type: `boolean`

* Default: `true`

* Details:

  Adds extra wrapper outside `<pre>` tag or not.

  The wrapper is required by the `lineNumbers` and `collapsedLines`. That means, if you disable `preWrapper`, the line line numbers and collapsed lines will also be disabled.

  ::: tip

  You can disable it if you want to implement them in client side. For example, [Prismjs Line Highlight](https://prismjs.com/plugins/line-highlight/) or [Prismjs Line Numbers](https://prismjs.com/plugins/line-numbers/).

  :::
