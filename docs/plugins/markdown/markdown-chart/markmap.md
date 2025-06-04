---
title: Markmap
icon: fab fa-markdown
---

<!-- #region before -->

Let the Markdown file support markmap in your VuePress site.

<!-- more -->

## Settings

Install `markmap-lib`, `markmap-toolbar` and `markmap-view` in your project:

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D markmap-lib markmap-toolbar markmap-view
```

@tab yarn

```bash
yarn add -D markmap-lib markmap-toolbar markmap-view
```

@tab npm

```bash
npm i -D markmap-lib markmap-toolbar markmap-view
```

:::

Then enabling via:

<!-- #endregion before -->

```js {7} title=".vuepress/config.js"
import { markdownChartPlugin } from '@vuepress/plugin-markdown-chart'

export default {
  plugins: [
    markdownChartPlugin({
      // Enable Markmap
      markmap: true,
    }),
  ],
}
```

<!-- #region after -->

## Syntax

````md
```markmap
<!-- contents here -->
```
````

Configuring through frontmatter syntax is supported.

## Demo

::: md-demo

````markmap
---
markmap:
  colorFreezeLevel: 2
---

# markmap

## Links

- <https://markmap.js.org/>
- [GitHub](https://github.com/markmap/markmap)

## Features

- links
- **strong** ~~del~~ *italic* ==highlight==
- multiline
  text
- `inline code`
-
    ```js
    console.log('code block');
    ```
- Katex
  - $x = {-b \pm \sqrt{b^2-4ac} \over 2a}$
- Now we can wrap very very very very long text based on `maxWidth` option
````

:::

<!-- #endregion after -->
