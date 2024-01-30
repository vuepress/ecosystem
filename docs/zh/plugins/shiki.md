# shiki

<NpmBadge package="@vuepress/plugin-shiki" />

该插件使用 [Shiki](https://shiki.matsu.io/) ([Shikiji](https://shikiji.netlify.app/)) 来为 Markdown 代码块启用代码高亮。

::: tip
[Shiki](https://shiki.matsu.io/) 是 VSCode 正在使用的代码高亮器。它具有更高的保真度，但可能会比 [Prism.js](https://prismjs.com/) 要慢一些，特别是在有大量代码块需要处理的时候。

你可以考虑在 `dev` 模式下禁用该插件来获取更好的开发体验。
:::

## 使用方法

```bash
npm i -D @vuepress/plugin-shiki@next
```

```ts
import { shikiPlugin } from '@vuepress/plugin-shiki'

export default {
  plugins: [
    shikiPlugin({
      // 配置项
      langs: ['ts', 'json', 'vue', 'md', 'bash', 'diff'],
    }),
  ],
}
```

## 配置项

### langs

- 类型： `ShikiLang[]`

- 详情：

  Shikiji 要解析的代码块的语言。

  该配置项会被传递到 Shikiji 的 `getHighlighter()` 方法中。

  你需要明确传入所有你使用的语言列表，否则 Shikiji 将不会加载任何语言。

- 参考：
  - [shikiji > Languages](https://shikiji.netlify.app/languages)

### theme

- 类型： `ShikiTheme`

- 默认值： `'nord'`

- 详情：

  Shikiji 的主题。

  该配置项会被传递到 Shikiji 的 `codeToHtml()` 方法中。

- 参考：
  - [shikiji > Themes](https://shikiji.netlify.app/themes)

### themes

- 类型：`Record<'dark' | 'light', ShikiTheme>`

- 详情：

  Shikiji 的暗黑和明亮模式双主题。

  该配置项会被传递到 Shikiji 的 `codeToHtml()` 方法中。

- 参考：
  - [shikiji > Dual Themes](https://shikiji.netlify.app/guide/dual-themes)
