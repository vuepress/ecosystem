# shiki

<NpmBadge package="@vuepress/plugin-shiki" />

该插件使用 [Shiki](https://shiki.matsu.io/) 来为 Markdown 代码块启用代码高亮。

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

  Shiki 要解析的代码块的语言。

  该配置项会被传递到 Shiki 的 `getHighlighter()` 方法中。

  你最好明确传入所有你使用的语言列表，否则 Shiki 会加载所有语言，并可能影响性能。

- 参考：
  - [shiki > Languages](https://shiki.style/languages)

### theme

- 类型： `ShikiTheme`

- 默认值： `'nord'`

- 详情：

  Shiki 的主题。

  该配置项会被传递到 Shiki 的 `codeToHtml()` 方法中。

- 参考：
  - [Shiki > Themes](https://shiki.style/themes)

### themes

- 类型：`Record<'dark' | 'light', ShikiTheme>`

- 详情：

  Shiki 的暗黑和明亮模式双主题。

  该配置项会被传递到 Shiki 的 `codeToHtml()` 方法中。

- 参考：
  - [Shiki > Dual Themes](https://shiki.style/guide/dual-themes)

### transformers

- 类型：`ShikiTransformer[]`
- 详情：

  Shiki 的转换器。

  该配置项会被传递到 Shiki 的 `codeToHtml()` 方法中。

- 参考：
  - [Shiki > Transformers](https://shiki.style/guide/transformers)
