---
icon: pyramid
---

# prismjs

<NpmBadge package="@vuepress/plugin-prismjs" />

This plugin enables syntax highlighting for markdown code fences with [Prism.js](https://prismjs.com/).

This plugin has been integrated into the default theme.

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

## Guide

### Prism.js Themes

Prism.js themes are applied to the whole site. Use `theme` to set a single theme, or `themes` to use different themes for light and dark mode.

::: tip Available Prism.js Light themes

- ateliersulphurpool-light
- coldark-cold
- coy
- duotone-light
- ghcolors
- gruvbox-light
- material-light
- one-light
- vs

:::

::: tip Available Prism.js Dark themes

- atom-dark
- cb
- coldark-dark
- dark
- dracula
- duotone-dark
- duotone-earth
- duotone-forest
- duotone-sea
- duotone-space
- gruvbox-dark
- holi
- hopscotch
- lucario
- material-dark
- material-oceanic
- night-owl
- nord
- one-dark
- pojoaque
- shades-of-purple
- solarized-dark-atom
- tomorrow
- vsc-dark-plus
- xonokai
- z-touch

:::

::: warning

To use `themes`, your theme must set the `data-theme="dark"` attribute on the `<html>` tag when dark mode is enabled.

:::

### Line Numbers

Line numbers are enabled by default. You can override them per code block with markers:

- `:line-numbers`: enable line numbers.
- `:no-line-numbers`: disable line numbers.
- `:line-numbers=2`: enable line numbers and start counting from `2`.

::: preview

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
// line-numbers is enabled and starts from 2
const line3 = 'This is line 3'
const line4 = 'This is line 4'
```

:::

You can also set `lineNumbers` to a number to only enable line numbers for code blocks with enough lines, or to `'disable'` to turn the markers off completely.

### Highlight Lines

Line highlighting is enabled by default. Add line ranges to the code fence info to highlight them:

- Line ranges: `{5-8}`
- Multiple single lines: `{4,7,9}`
- Combined: `{4,7-13,16,23-27,40}`

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

### Collapsed Lines

Code block collapsing is disabled by default. Set `collapsedLines` to enable it, then use markers to control a single code block:

- `:collapsed-lines`: collapse the code block, starting from line 15 by default.
- `:no-collapsed-lines`: do not collapse the code block.
- `:collapsed-lines=10`: collapse the code block starting from line `10`.

::: preview

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
```

:::

### Code Block Title

Code block title is enabled by default. Add `title="Title"` to the code fence info to display a title bar above the code block.

::: preview

```ts title="foo/baz.js"
console.log('hello')
```

:::

You can pass a `CodeBlockTitleRender` function to `codeBlockTitle` to customize how the title is rendered.

### Notation

The plugin supports the same annotation transformers as [Shiki](https://shiki.style/packages/transformers). Each of them is off by default and needs to be enabled by its matching option.

#### Diff

Enable `notationDiff` to highlight added and removed lines with `[!code ++]` and `[!code --]`.

<VPPreview>
<template #code>

````md
```ts
console.log('hewwo') // [\!code --]
console.log('hello') // [\!code ++]
console.log('goodbye')
```
````

</template>
<template #content>

```ts
console.log('hewwo') // [!code --]
console.log('hello') // [!code ++]
console.log('goodbye')
```

</template>
</VPPreview>

#### Focus

Enable `notationFocus` to dim all lines except the focused ones, marked with `[!code focus]`.

<VPPreview>
<template #code>

````md
```ts
console.log('Not focused')
console.log('Focused') // [\!code focus]
console.log('Not focused')
```
````

</template>
<template #content>

```ts
console.log('Not focused')
console.log('Focused') // [!code focus]
console.log('Not focused')
```

</template>
</VPPreview>

#### Highlight

Enable `notationHighlight` to highlight lines marked with `[!code highlight]`.

<VPPreview>
<template #code>

````md
```ts
console.log('Not highlighted')
console.log('Highlighted') // [\!code highlight]
console.log('Not highlighted')
```
````

</template>
<template #content>

```ts
console.log('Not highlighted')
console.log('Highlighted') // [!code highlight]
console.log('Not highlighted')
```

</template>
</VPPreview>

#### Error Level

Enable `notationErrorLevel` to color lines by level, marked with `[!code warning]` and `[!code error]`.

<VPPreview>
<template #code>

````md
```ts
console.log('No errors or warnings')
console.warn('Warning') // [\!code warning]
console.error('Error') // [\!code error]
```
````

</template>
<template #content>

```ts
console.log('No errors or warnings')
console.warn('Warning') // [!code warning]
console.error('Error') // [!code error]
```

</template>
</VPPreview>

#### Word Highlight

Enable `notationWordHighlight` to highlight words. The marker must be written on a separate line.

Highlight words with comments:

<VPPreview>
<template #code>

````md
```ts
// [\!code word:Hello]
const message = 'Hello World'
console.log(message) // prints Hello World
```
````

</template>
<template #content>

```ts
// [!code word:Hello]
const message = 'Hello World'
console.log(message) // prints Hello World
```

</template>
</VPPreview>

Highlight words based on the meta string provided on the code snippet:

::: preview

```js /Hello/
const msg = 'Hello World'
console.log(msg) // prints Hello World
```

:::

### Render Whitespace

Whitespace rendering is disabled by default. Set `whitespace` to enable it, then use markers to control a single code block:

- `:whitespace`: render whitespace with the type set in config.
- `:no-whitespace`: do not render whitespace.
- `:whitespace=boundary`: render leading and trailing whitespace of each line.

The render type accepts `'all'`, `'boundary'`, `'leading'` and `'trailing'`.

::: preview

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

```md :whitespace=leading
<!-- render leading whitespace of the line -->

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

:::

## Options

::: fields
@`theme` type=PrismjsTheme default=`'nord'`

Prism.js theme applied to code blocks. See [Prism.js Themes](#prism-js-themes) for the available values.

@`themes` type=`{ light: PrismjsTheme; dark: PrismjsTheme }`

Use different Prism.js themes for light and dark mode. See [Prism.js Themes](#prism-js-themes) for the available values.

Requires your theme to set the `data-theme="dark"` attribute on the `<html>` tag when dark mode is enabled.

@`lineNumbers` type=`boolean | number | 'disable'` default=`true`

Whether to enable line numbers. A number is the minimum number of lines required to enable line numbers on a code block, and `'disable'` turns the `:line-numbers` marker off completely.

See also: [Line Numbers](#line-numbers).

@`highlightLines` type=boolean default=`true`

Whether to enable line highlighting with line range markers.

See also: [Highlight Lines](#highlight-lines).

@`collapsedLines` type=`boolean | number | 'disable'` default=`'disable'`

Whether to enable code block collapsing. A number is the line to collapse from, and `true` is equivalent to `15`. Set it to `false` to support the `:collapsed-lines` marker without collapsing any code block by default.

See also: [Collapsed Lines](#collapsed-lines).

@`codeBlockTitle` type=`boolean | CodeBlockTitleRender` default=`true`

Whether to render a title bar for code blocks with `title="Title"` in the fence info.

Pass a `CodeBlockTitleRender` function to customize the title rendering.

```ts
type CodeBlockTitleRender = (title: string, code: string) => string
```

See also: [Code Block Title](#code-block-title).

@`notationDiff` type=boolean default=`false`

Whether to enable the notation diff transformer.

@`notationFocus` type=boolean default=`false`

Whether to enable the notation focus transformer.

@`notationHighlight` type=boolean default=`false`

Whether to enable the notation highlight transformer.

@`notationErrorLevel` type=boolean default=`false`

Whether to enable the notation error level transformer.

@`notationWordHighlight` type=boolean default=`false`

Whether to enable the notation word highlight transformer.

See also: [Notation](#notation).

@`whitespace` type=`boolean | 'all' | 'boundary' | 'leading' | 'trailing'` default=`false`

Whether to render whitespace characters. `true` enables the syntax without rendering any whitespace by default, and `false` turns the `:whitespace` marker off completely.

See also: [Render Whitespace](#render-whitespace).

@`preloadLanguages` type=`string[]` default=`['markdown', 'jsdoc', 'yaml']`

Languages to preload.

By default, languages are loaded on demand when parsing markdown files, but Prism.js has [some potential issues](https://github.com/PrismJS/prism/issues/2716) about loading languages dynamically. Preloading languages avoids them.

@`preWrapper` type=boolean default=`true`

Whether to add an extra wrapper outside the `<pre>` tag.

The wrapper is required by `lineNumbers` and `collapsedLines`, which means disabling it also disables line numbers and collapsed lines. You may disable it if you want to implement these features on the client side, for example with [Prismjs Line Highlight](https://prismjs.com/plugins/line-highlight/) or [Prismjs Line Numbers](https://prismjs.com/plugins/line-numbers/).

:::
