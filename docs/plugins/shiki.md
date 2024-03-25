# shiki

<NpmBadge package="@vuepress/plugin-shiki" />

This plugin will enable syntax highlighting for markdown code fence with [Shiki](https://shiki.style/).

::: tip
[Shiki](https://shiki.matsu.io/) is the syntax highlighter being used by VSCode. It has higher fidelity, but it could be slower than [Prism.js](https://prismjs.com/), especially when you have a lot of code blocks.

You could consider disabling this plugin in `dev` mode to get better development experience.
:::

## Usage

```bash
npm i -D @vuepress/plugin-shiki@next
```

```ts
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

## Options

### langs

- Type: `ShikiLang[]`

- Details:

  Languages of code blocks to be parsed by Shiki.

  This option will be forwarded to `getHighlighter()` method of Shiki.

  You'd better provide the languages list you are using explicitly, otherwise Shiki will load all languages and can affect performance.

- Also see:
  - [Shiki > Languages](https://shiki.style/languages)

### theme

- Type: `ShikiTheme`

- Default: `'nord'`

- Details:

  Theme of Shiki.

  This option will be forwarded to `codeToHtml()` method of Shiki.

- Also see:
  - [Shiki > Themes](https://shiki.style/themes)

### themes

- Type: `Record<'dark' | 'light', ShikiTheme>`

- Details:

  Dark / Light Dual themes of Shiki.

  This option will be forwarded to `codeToHtml()` method of Shiki.

- Also see:
  - [Shiki > Dual Themes](https://shiki.style/guide/dual-themes)

### transformers

- Type: `ShikiTransformer[]`

- Details:

  Transformers of Shiki.

  This option will be forwarded to `codeToHtml()` method of Shiki.

- Also see:
  - [Shiki > Transformers](https://shiki.style/guide/transformers)
