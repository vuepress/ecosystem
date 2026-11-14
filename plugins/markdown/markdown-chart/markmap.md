---
url: /ecosystem/plugins/markdown/markdown-chart/markmap.md
---
# Markmap

Add Markmap support to the Markdown files in your VuePress site.

## Installation

Install `@markmap/parse`, `@markmap/toolbar` and `@markmap/view` in your project:

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D @markmap/parse @markmap/toolbar @markmap/view
```

@tab yarn

```bash
yarn add -D @markmap/parse @markmap/toolbar @markmap/view
```

@tab npm

```bash
npm i -D @markmap/parse @markmap/toolbar @markmap/view
```

:::

To render TeX math in labels, also install `@markmap/plugin-math` and `@markmap/render`:

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D @markmap/plugin-math @markmap/render
```

@tab yarn

```bash
yarn add -D @markmap/plugin-math @markmap/render
```

@tab npm

```bash
npm i -D @markmap/plugin-math @markmap/render
```

:::

Then enable it via:

```ts {7} title=".vuepress/config.ts"
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

## Syntax

````md
```markmap
<!-- contents here -->
```
````

Configuring through frontmatter syntax is supported.

## Demo

::: preview

````markmap
---
title: markmap
markmap:
  colorDepth: 2
---

## Links

- [Website](https://markmap.js.org/)
- [GitHub](https://github.com/gera2ld/markmap)

## Related Projects

- [coc-markmap](https://github.com/gera2ld/coc-markmap) for Neovim
- [markmap-vscode](https://marketplace.visualstudio.com/items?itemName=gera2ld.markmap-vscode) for VSCode
- [eaf-markmap](https://github.com/emacs-eaf/eaf-markmap) for Emacs

## Features

Paragraphs, code blocks and tables are shown as notes, click the dot next to a node to open them.

### Lists

- **strong** ~~del~~ _italic_ ==highlight==
- `inline code`
- [x] checkbox
- Katex: $x = {-b \pm \sqrt{b^2-4ac} \over 2a}$ <!-- markmap: fold -->
  - [More Katex Examples](#?d=gist:af76a4c245b302206b16aec503dbe07b:katex.md)
- Now we can wrap very very very very long text based on `wrapWidth` option
- Ordered list
  1. item 1
  2. item 2

### Blocks

```js
console.log('hello, JavaScript')
```

| Products | Price |
| -------- | ----- |
| Apple    | 4     |
| Banana   | 2     |

![](https://markmap.js.org/favicon.png)
````

:::
