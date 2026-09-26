---
icon: highlighter
---

# shiki

<NpmBadge package="@vuepress/plugin-shiki" />

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

## Guide

### Shiki Themes

Use `theme` to set a single theme, or `themes` to use different themes for light and dark mode.

With `themes`, both themes are injected into code blocks as `--shiki-light` and `--shiki-dark` CSS variables, so switching color mode doesn't need to re-highlight the code:

```html
<span style="--shiki-light:lightColor;--shiki-dark:darkColor;">code</span>
```

See also: [Shiki > Dual Themes](https://shiki.style/guide/dual-themes).

### Languages

The plugin automatically loads the languages used in your markdown files, so `langs` is only needed to preload extra languages, and `langAlias` to add custom language aliases.

See also: [Shiki > Languages](https://shiki.style/languages).

### Line Numbers

Line numbers are enabled by default. You can override them per code block with markers:

- `:line-numbers`: enable line numbers.
- `:no-line-numbers`: disable line numbers.
- `:line-numbers=2`: enable line numbers and start counting from `2`.

::: preview

```ts :line-numbers
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

### Remove Comments

Enable `removeComments` to strip comments from the code. It works by checking the grammar token metadata to determine whether a token is a comment.

See also: [Shiki > Remove Comments](https://shiki.style/packages/transformers#transformerremovecomments).

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

Enable `notationErrorLevel` to color lines by level, marked with `[!code warning]`, `[!code error]` and `[!code info]`.

<VPPreview>
<template #code>

````md
```ts
console.log('No errors or warnings')
console.warn('Warning') // [\!code warning]
console.error('Error') // [\!code error]
console.log('Info') // [\!code info]
```
````

</template>
<template #content>

```ts
console.log('No errors or warnings')
console.warn('Warning') // [!code warning]
console.error('Error') // [!code error]
console.log('Info') // [!code info]
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
<!-- render leading and trailing whitespace on each line -->

A text  
with trailing spaces

    indented text
```

```md :whitespace=leading
<!-- render leading whitespace on each line -->

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

### Twoslash Support

Enable `twoslash` to get type information for code blocks with [twoslash](https://github.com/twoslashes/twoslash). It adds type hints, error messages and completions to the code, rendered as a popup when hovering.

```ts twoslash
const a = 1
const b = 23
console.log(a + b)
```

For code blocks with `twoslash` enabled:

- Don't add the `:v-pre` marker, as this will prevent `twoslash` from running properly.
- To avoid layout conflicts, line numbers will not be displayed.

::: tip

For size optimization, the plugin doesn't include the `@vuepress/shiki-twoslash` package by default. You need to install it manually to use this feature.

:::

See also: [Shiki > Twoslash](https://shiki.style/packages/twoslash).

## Options

::: fields
@langs@ type=`ShikiLang[]`

Additional languages to be parsed by Shiki.

See also: [Languages](#languages).

@langAlias@ type=`{ [lang: string]: string }`

Custom language aliases for Shiki.

See also: [Languages](#languages).

@theme@ type=ShikiTheme default=`'nord'`

Shiki theme applied to code blocks.

@themes@ type=`{ light: ShikiTheme; dark: ShikiTheme }`

Use different Shiki themes for light and dark mode. The styles of both themes are injected as `--shiki-light` and `--shiki-dark` CSS variables.

See also: [Shiki Themes](#shiki-themes).

@lineNumbers@ type=`boolean | number | 'disable'` default=`true`

Whether to enable line numbers. A number is the minimum number of lines required to enable line numbers on a code block, and `'disable'` turns the `:line-numbers` marker off completely.

See also: [Line Numbers](#line-numbers).

@highlightLines@ type=boolean default=`true`

Whether to enable line highlighting with line range markers.

See also: [Highlight Lines](#highlight-lines).

@collapsedLines@ type=`boolean | number | 'disable'` default=`'disable'`

Whether to enable code block collapsing. A number is the line to collapse from, and `true` is equivalent to `15`. Set it to `false` to support the `:collapsed-lines` marker without collapsing any code block by default.

See also: [Collapsed Lines](#collapsed-lines).

@codeBlockTitle@ type=`boolean | CodeBlockTitleRender` default=`true`

Whether to render a title bar for code blocks with `title="Title"` in the fence info.

Pass a `CodeBlockTitleRender` function to customize the title rendering.

```ts
type CodeBlockTitleRender = (title: string, code: string) => string
```

See also: [Code Block Title](#code-block-title).

@notationDiff@ type=boolean default=`false`

Whether to enable the notation diff transformer.

@notationFocus@ type=boolean default=`false`

Whether to enable the notation focus transformer.

@notationHighlight@ type=boolean default=`false`

Whether to enable the notation highlight transformer.

@notationErrorLevel@ type=boolean default=`false`

Whether to enable the notation error level transformer.

@notationWordHighlight@ type=boolean default=`false`

Whether to enable the notation word highlight transformer.

See also: [Notation](#notation).

@removeComments@ type=boolean default=`false`

Whether to remove comments from the code.

See also: [Remove Comments](#remove-comments).

@whitespace@ type=`boolean | 'all' | 'boundary' | 'leading' | 'trailing'` default=`false`

Whether to render whitespace characters. `true` enables the syntax without rendering any whitespace by default, and `false` turns the `:whitespace` marker off completely.

See also: [Render Whitespace](#render-whitespace).

@twoslash@ type=`boolean | ShikiTwoslashOptions` default=`false`

Whether to enable [twoslash](https://github.com/twoslashes/twoslash).

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

See also: [Twoslash Support](#twoslash-support).

:::

## Advanced Options

::: fields
@defaultLang@ type=string default=`'plain'`

Fallback language to use when the specified language is not available.

@logLevel@ type=`'warn' | 'debug' | 'silent'` default=`'warn'`

Log level for Shiki language detection.

- `warn`: warn about each unknown language once (default)
- `debug`: log every unknown code block with its file path (default when `--debug` flag is set)
- `silent`: no warnings

@preWrapper@ type=boolean default=`true`

Whether to add an extra wrapper outside the `<pre>` tag.

This wrapper is required by `lineNumbers` and `collapsedLines`, which means disabling it also disables line numbers and collapsed lines.

@shikiSetup@ type=`(shiki: Highlighter) => void | Promise<void>`

A hook function to customize the Shiki highlighter instance.

@transformers@ type=`ShikiTransformer[]`

Shiki transformers, passed to the `codeToHtml()` method of Shiki.

See also: [Shiki > Transformers](https://shiki.style/guide/transformers).

:::
