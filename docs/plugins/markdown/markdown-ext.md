---
icon: expand
---

# markdown-ext

<NpmBadge package="@vuepress/plugin-markdown-ext" />

Add basic GFM support to VuePress with useful features.

## Usage

```bash
npm i -D @vuepress/plugin-markdown-ext@next
```

```ts title=".vuepress/config.ts"
import { markdownExtPlugin } from '@vuepress/plugin-markdown-ext'

export default {
  plugins: [
    markdownExtPlugin({
      // options
    }),
  ],
}
```

## Syntax

### Footnote

- Use `[^Anchor text]` in Markdown to define a footnote

- Use `[^Anchor text]: ...` to describe footnote content

- If there are multiple paragraphs in footnote, the paragraph show be double indented

::: preview

Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**

    and multiple paragraphs.

[^second]: Footnote text.

:::

### Task list

- Use `- [ ] some text` to render an unchecked task item.
- Use `- [x] some text` to render a checked task item. (Capital `X` is also supported)

::: preview

- [ ] Plan A
- [x] Plan B

:::

### Component

You can use component fence block to add a component into your markdown content. Both YAML and JSON format props data are supported:

- YAML <Badge text="Recommended" type="tip" />:

  ````md
  ```component ComponentName
  # component data here
  ```
  ````

- JSON:

  ````md
  ```component ComponentName
  {
    // component data here
  }
  ```
  ````

::: preview

```component Badge
text: Mr.Hope
type: tip
```

```component Badge
{
  "text": "Mr.Hope",
  "type": "tip"
}
```

:::

### v-pre

You can use any mustache syntax as raw text in `v-pre` container:

:::: preview

::: v-pre

{{ abc }}

:::

::::

## Options

### gfm

- Type: `boolean`

- Details:

  Whether tweaks the behavior and features to be more similar to GitHub Flavored Markdown.

  `markdown-it` already supports tables and strike through by default. If this option is `true`, the following new features will be enabled:
  - Auto link (named `linkify` in `markdown-it`)
  - Hard breaks
  - Footnote
  - Task list

  Note: Not all behavior is exactly the same as GitHub Flavored Markdown.

### footnote

- Type: `boolean`
- Details: Whether to enable footnote format support.
- Enabled in GFM: Yes

### tasklist

- Type: `MarkdownItTaskListOptions | boolean`

  ```ts
  interface MarkdownItTaskListOptions {
    /**
     * Whether disable checkbox
     *
     * @default true
     */
    disabled?: boolean

    /**
     * Whether use `<label>` to wrap text
     *
     * @default true
     */
    label?: boolean
  }
  ```

- Details:

  Whether to enable tasklist format support. You can pass an object to config tasklist.

- Enabled in GFM: Yes

### breaks

- Type: `boolean`
- Details: Whether convert `\n` in paragraphs into `<br>`s.
- Enabled in GFM: Yes

### linkify

- Type: `boolean`
- Details: Whether convert URL-like text into links.
- Enabled in GFM: Yes

### component

- Type: `boolean`
- Details: Whether to enable component fence support.

### vPre

- Type: `boolean`
- Details: Whether to enable v-pre wrapper.
