---
url: /plugins/markdown/markdown-preview.md
---
# markdown-preview

Support preview contents in VuePress site.

## Usage

```bash
npm i -D @vuepress/plugin-markdown-preview@next
```

```ts title=".vuepress/config.ts"
import { markdownPreviewPlugin } from '@vuepress/plugin-markdown-preview'

export default {
  plugins: [markdownPreviewPlugin()],
}
```

## Guide

The plugin provides a `preview` container and `VPPreview` component to preview contents in VuePress site.

You can use the `preview` container in markdown files like this:

```md
::: preview Optional Title

Preview Contents

:::
```

It will be rendered as a preview container in the site, showing both the content and its raw code:

::: preview Optional Title

Preview Contents

:::

Sometimes, codes for users may be different with embedding preview contents, you can use the `VPPreview` component directly to achieve this:

````md
<VPPreview title="Optional Title">
  <template #content>
    <!-- Your content here  -->

    Hello world!

  </template>
  <template #code>
    <!-- Your code here -->

```js
document.querySelector('body').innerText = 'Hello world!'
```

  </template>
</VPPreview>
````

```
Hello world!
```

```js
document.querySelector('body').innerText = 'Hello world!'
```

## Options

### locales

* Type: `Record<string, MarkdownPreviewLocaleData>`

  ```ts
  export interface MarkdownPreviewLocaleData {
    /**
     * Toggle code button text
     */
    toggle: string
  }
  ```

* Details: Locales configuration for `<VPPreview>`.

## Styles

You can customize the style via CSS variables:

@[code css](@vuepress/plugin-markdown-preview/src/client/styles/vars.css)
