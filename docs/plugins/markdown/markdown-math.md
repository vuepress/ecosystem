---
icon: sigma
---

# markdown-math

<NpmBadge package="@vuepress/plugin-markdown-math" />

Add math support to your VuePress site.

This plugin allows you to use `mathjax` or `katex` to render $\TeX$ in your markdown content.

## Usage

```bash
npm i -D @vuepress/plugin-markdown-math@next

# install one of the following packages:
npm i -D mathjax-full
npm i -D katex
```

```ts title=".vuepress/config.ts"
import { markdownMathPlugin } from '@vuepress/plugin-markdown-math'

export default {
  plugins: [
    markdownMathPlugin({
      // options
    }),
  ],
}
```

## Syntax

- Inline mode: `$xxx$`

  ::: preview

  Euler's identity $e^{i\pi}+1=0$ is a beautiful formula in $\mathbb{R}^2$.

  :::

- Display mode:

  ```md
  $$xxx$$

  $$
  xxx
  $$
  ```

  ::: preview

  $$
  \frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
  = \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^ Ir \cdots (r-i+1) (\log y)^{ri}} {\omega^i} \right\}
  $$

  :::

:::: tip Escaping

Escaping can be done by using `\` before the `$` character, or adding space both before and after the `$` character.

::: preview

The $a=1$ is a TeX equation, while $ a=1 $ and \$a=1$ is not.

:::

::::

## Support List

TeX Tutorial:

- [TeX Tutorial](https://www.overleaf.com/learn/latex/Learn_LaTeX_in_30_minutes)
- [TeX Cheat Sheets](https://mdit-plugins.github.io/tex.html#tex-tutorial)

Plugin tutorial and FAQs: [TeX](https://mdit-plugins.github.io/tex.html#tex-tutorial)

Katex:

- [KaTeX Support Features](https://katex.org/docs/supported.html)
- [KaTeX Support List](https://katex.org/docs/support_table.html)

Mathjax:

- [Supported TeX/LaTeX commands](https://docs.mathjax.org/en/latest/input/tex/macros/index.html#tex-commands)

## Options

### type

- Type: `'katex' | 'mathjax'`
- Details:

  The package to render $\TeX$ contents.
  - `'katex'`: use [KaTeX](https://katex.org/)
  - `'mathjax'`: use [MathJax](https://www.mathjax.org/)

  When this option is not specified, the plugin will try to detect which package is installed. If both are installed, it will use "mathjax".

### delimiters

- Type: `'brackets' | 'dollars' | 'all'`
- Default: `'dollars'`
- Details: Math delimiter syntax to enable.
  - `'brackets'`: Use `\(...\)` for inline math and `\[...\]` for display math (LaTeX style).
  - `'dollars'`: Use `$...$` for inline math and `$$...$$` for display math (common Markdown style).
  - `'all'`: Enable both bracket and dollar syntaxes.

### Using KaTeX

When using KaTeX, any other options will be passed to KaTeX as `KatexOptions`. See [KaTeX Docs](https://katex.org/docs/options.html) for all available options.

Besides, 2 special options are supported:

#### copy

- Type: `boolean`
- Details: Whether to enable copy extension.

#### mhchem

- Type: `boolean`
- Details: Whether to enable mhchem extension.

### Using MathJax

When using MathJax, you can set:

#### tex

- Type: `object`
- Details: Options passed to TeX input parser.

#### output

- Type: `'svg' | 'chtml'`
- Default: `'svg'`
- Details: Output format, either SVG or Common HTML.

#### chtml

- Type: `object`
- Details: Options passed to Common HTML output parser.

#### svg

- Type: `object`
- Details: Options passed to SVG output parser.
