# shiki

<NpmBadge package="@vuepress/plugin-shiki" />

This plugin will enable syntax highlighting for markdown code fence with [Shiki](https://shiki.matsu.io/) ([Shikiji](https://shikiji.netlify.app/)).

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

  Languages of code blocks to be parsed by shikiji.

  This option will be forwarded to `getHighlighter()` method of shikiji.

  You need to provide the languages list you are using explicitly, otherwise shikiji won't load any languages.

- Also see:
  - [shikiji > Languages](https://shikiji.netlify.app/languages)

### theme

- Type: `ShikiTheme`

- Default: `'nord'`

- Details:

  Theme of shikiji.

  This option will be forwarded to `codeToHtml()` method of shikiji.

- Also see:
  - [shikiji > Themes](https://shikiji.netlify.app/themes)

### themes

- Type: `Record<'dark' | 'light', ShikiTheme>`

- Details:

  Dark / Light Dual themes of shikiji.

  This option will be forwarded to `codeToHtml()` method of shikiji.

- Also see:
  - [shikiji > Dual Themes](https://shikiji.netlify.app/guide/dual-themes)
