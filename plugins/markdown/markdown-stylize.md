---
url: /ecosystem/plugins/markdown/markdown-stylize.md
---
# markdown-stylize

Stylizing content in your VuePress site.

## Usage

```bash
npm i -D @vuepress/plugin-markdown-stylize@next
```

```ts title=".vuepress/config.ts"
import { markdownStylizePlugin } from '@vuepress/plugin-markdown-stylize'

export default {
  plugins: [
    markdownStylizePlugin({
      // options
    }),
  ],
}
```

## Syntax

### Align Content

You can use `left` `center` `right` `justify` to align text.

:::: details Demo

::: left
Contents to align left
:::

::: center
Contents to align center
:::

::: right
Contents to align right
:::

::: justify
Contents to align justify
:::

```md
::: left
Contents to align left
:::

::: center
Contents to align center
:::

::: right
Contents to align right
:::

::: justify
Contents to align justify
:::
```

::::

### Appending Attributes

You can use `{attrs}` to add attrs to Markdown content.

For example, if you want a heading2 "Hello World" with an id "say-hello-world", you can write:

```md
## Hello World {#say-hello-world}
```

If you want an image with class "full-width", you can write:

```md
![img](link/to/image.png) {.full-width}
```

Also, other attrs are supported, so:

```md
A paragraph with some text. {#p .a .b align=center customize-attr="content with spaces"}
```

will be rendered into:

```html
<p id="p" class="a b" align="center" customize-attr="content with spaces">
  A paragraph with some text.
</p>
```

For all demos, see [@mdit/plugin-attrs](https://mdit-plugins.github.io/attrs.html#demo).

### Highlighting Content

You can use `==` to mark text with `<mark>`.

::: details Demo

VuePress is ==powerful==!

```md
VuePress is ==powerful==!
```

:::

### Creating Spoilers

You can use `!! !!` to mark a content as spoiler.

::: details Demo

VuePress is !!powerful!!.

```md
VuePress is !!powerful!!.
```

:::

### Superscript and Subscript

You can use `^` for superscript and `~` for subscript.

::: details Demo

H~2~O is a liquid. 2^10^ is 1024.

```md
H~2~O is a liquid. 2^10^ is 1024.
```

:::

### Create your own stylize rules

The `custom` option receives an array, where each element accepts 2 options:

* `matcher`: should be `string` or `RegExp`.

* `replacer`: a function customizing the matched token

For example, you can use the following config to transform `*Recommended*` into a Badge Recommended

```js {6-18} title=".vuepress/config.js"
import { markdownStylizePlugin } from '@vuepress/plugin-markdown-stylize'

export default {
  plugins: [
    markdownStylizePlugin({
      custom: [
        {
          matcher: 'Recommended',
          replacer: ({ tag }) => {
            if (tag === 'em')
              return {
                tag: 'Badge',
                attrs: { type: 'tip' },
                content: 'Recommended',
              }

            return null
          },
        },
      ],
    }),
  ],
}
```

Another example is you want to set all the emphasis `n't` words to red color, so that `Setting this to an invalid syntax *doesn't* have any effect.` becomes: "Setting this to an invalid syntax doesn't have any effect."

```js {6-18} title=".vuepress/config.js"
import { markdownStylizePlugin } from '@vuepress/plugin-markdown-stylize'

export default {
  plugins: [
    markdownStylizePlugin({
      custom: [
        {
          matcher: /n't$/,
          replacer: ({ tag, attrs, content }) => {
            if (tag === 'em')
              return {
                tag: 'span',
                attrs: { ...attrs, style: 'color: red' },
                content,
              }

            return null
          },
        },
      ],
    }),
  ],
}
```

Also, you can use `stylize` in frontmatter to provide extra stylize rules for content of the page.

## Options

### align

* Type: `boolean`

* Details: Whether to enable align support

### attrs

* Type: `MarkdownItAttrsOptions | boolean`

* Details:

  Whether to enable attrs support.

  You can also pass an object to specify the options of [@mdit/plugin-attrs](https://mdit-plugins.github.io/attrs.html#advanced).

### mark

* Type: `boolean`

* Details: Whether to enable mark format support

### spoiler

* Type: `boolean`

* Details: Whether to enable spoiler support

### sup

* Type: `boolean`

* Details: Whether to enable superscript format support

### sub

* Type: `boolean`

* Details: Whether to enable subscript format support

### custom

* Type: `MarkdownItStylizeConfig[]`

* Details:

  Create own stylize customizations. For details, see [@mdit/plugin-stylize](https://mdit-plugins.github.io/stylize.html#usage)
