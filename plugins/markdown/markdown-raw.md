---
url: /ecosystem/plugins/markdown/markdown-raw.md
---
# markdown-raw

Add the `raw` container to your VuePress site, with optional style isolation for its content.

## Usage

```bash
npm i -D @vuepress/plugin-markdown-raw@next
```

```ts title=".vuepress/config.ts"
import { markdownRawPlugin } from '@vuepress/plugin-markdown-raw'

export default {
  plugins: [markdownRawPlugin()],
}
```

## Guide

### raw container

The `raw` container wraps its content with a `<div class="vp-raw">` element. It is meant for content that is rendered by another tool or copied from a component library, whose DOM is not expected to receive the document styles of your site.

The wrapper element does not isolate styles by itself. To make the styles of your site skip the wrapped content, enable the `isolateStyles` option, or apply the exported PostCSS plugin manually (see [Style isolation](#style-isolation)).

```md
::: raw

Any content, including HTML and Markdown.

:::
```

### Style isolation

PostCSS does not provide a way to isolate styles from a part of the DOM. The plugin ships a port of VitePress `postcssIsolateStyles`: it prefixes the selectors of the matched style files with `:not(:where(.vp-raw, .vp-raw *))`, so those styles do not apply inside a `raw` container.

With `isolateStyles: true`, the plugin injects the PostCSS plugin into the bundler automatically, no matter whether you use `@vuepress/bundler-vite`, `@vuepress/bundler-webpack` or `@vuepress/bundler-rspack`.

By default, only style files whose path matches `/vp-doc\.css/` or `/base\.css/` are isolated, which matches the VitePress layout. Pass an object to isolate other files:

```ts title=".vuepress/config.ts"
import { markdownRawPlugin } from '@vuepress/plugin-markdown-raw'

export default {
  plugins: [
    markdownRawPlugin({
      isolateStyles: {
        includeFiles: [/vp-doc\.css/, /base\.css/, /my-article\.css/],
        ignoreFiles: [/my-article\.css/],
      },
    }),
  ],
}
```

If you already manage PostCSS plugins yourself, use the exported plugin directly:

```js title="postcss.config.js"
import { postcssIsolateStyles } from '@vuepress/plugin-markdown-raw'

export default {
  plugins: [postcssIsolateStyles()],
}
```

::: tip

The style isolation only makes sense when the theme styles and the `raw` content live in the same page. If your site does not need it, keep `isolateStyles: false` (the default).

:::

## Options

::: fields
@`isolateStyles` type=`IsolateStylesOptions | boolean` default=`false`

Whether to isolate the page styles from the content of the `raw` container. When enabled, a PostCSS plugin is injected into the bundler.

@@`isolateStyles.includeFiles` type=`RegExp[]` default=`[/vp-doc\.css/, /base\.css/]`

Style files to be isolated, matched with the resolved file path.

@@`isolateStyles.ignoreFiles` type=`RegExp[]`

Style files to be ignored, matched with the resolved file path.

@@`isolateStyles.prefix` type=string default=`:not(:where(.vp-raw, .vp-raw *))`

Selector prefix added to the matched selectors.

:::
