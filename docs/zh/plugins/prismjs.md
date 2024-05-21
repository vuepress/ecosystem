# prismjs

<NpmBadge package="@vuepress/plugin-prismjs" />

该插件使用 [Prism.js](https://prismjs.com/) 来为 Markdown 代码块启用代码高亮。

该插件已经集成到默认主题中。

需要注意的是，该插件仅会给代码块添加 HTML 标记，而不会添加样式。当你在一个自定义主题中使用它时，可能需要自己选择并引入 Prism.js 样式主题。

## 使用方法

```bash
npm i -D @vuepress/plugin-prismjs@next
```

```ts
import { prismjsPlugin } from '@vuepress/plugin-prismjs'

export default {
  plugins: [
    prismjsPlugin({
      // 配置项
    }),
  ],
}
```

## 配置项

### preloadLanguages

- 类型： `string[]`

- 默认值： `['markdown', 'jsdoc', 'yaml']`

- 详情：

  需要预加载的语言。

  默认情况下，语言会在解析 Markdown 文件时按需加载。

  然而， Prism.js 在动态加载语言时可能会遇到 [一些潜在的问题](https://github.com/PrismJS/prism/issues/2716) 。为了避免这些问题，你可以使用该配置项来预加载一些语言。

### lineNumbers

- 类型： `boolean | number`

- 默认值： `true`

- 详情：

  是否启用行号。

  - `true`：启用代码行号。
  - `false` ：禁用代码行号。
  - `number` ：显示行号所需的最少行数。
    例如，如果你将它设置为 4 ，那么只有在你的代码块包含至少 4 行代码时才会启用行号。

  你可以在代码块添加 `:line-numbers` / `:no-line-numbers` 标记来覆盖配置项中的设置。

**输入：**

````md
```ts:line-numbers
// 启用行号
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts:no-line-numbers
// 禁用行号
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```
````

**输出：**

```ts:line-numbers
// 启用行号
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts:no-line-numbers
// 禁用行号
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

### highlightLines

- 类型： `boolean`

- 默认值： `true`

- 详情：

  是否启用 行高亮。

  在代码块添加行数范围标记，来为对应代码行进行高亮。

  行数范围标记的例子：

  - 行数范围： `{5-8}`
  - 多个单行： `{4,7,9}`
  - 组合： `{4,7-13,16,23-27,40}`

::: tip
我们在 新的版本中 重写了 `highlightLines` 的实现，现在它通过在 代码块内的 `<span class="line">` 上添加
类名 `highlighted` 来实现行高亮。
:::

**输入：**

````md
```ts{1,7-9}
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  title: '你好， VuePress',

  theme: defaultTheme({
    logo: 'https://vuejs.org/images/logo.png',
  }),
})
```
````

**输出：**

```ts{1,7-9}
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  title: '你好， VuePress',

  theme: defaultTheme({
    logo: 'https://vuejs.org/images/logo.png',
  }),
})
```

### copyCodeButton

- 类型： `boolean | CopyCodeButtonOptions`

- 默认值： `true`

- 详情：

  是否在代码块中添加 复制按钮。

::: tip
`@vuepress/plugin-prismjs` 插件仅在代码块中添加复制按钮，并不提供功能实现以及样式。

你应该配合使用 [@vuepress/plugin-copy-code](./copy-code.md) 插件来实现 代码复制功能 和 样式。
:::

```ts
interface CopyCodeButtonOptions {
  /**
   * 复制按钮的类名
   * @default 'copy'
   */
  className: string
  // 多语言配置
  locales: {
    [localPath: string]: {
      /**
       * 复制按钮的标题
       */
      title: string
      /**
       * 复制成功的提示文字
       */
      copied: string
    }
  }
}
```

::: details 内置支持语言

- **简体中文** (zh-CN)
- **繁体中文** (zh-TW)
- **英文(美国)** (en-US)
- **德语** (de-DE)
- **德语(澳大利亚)** (de-AT)
- **俄语** (ru-RU)
- **乌克兰语** (uk-UA)
- **越南语** (vi-VN)
- **葡萄牙语(巴西)** (pt-BR)
- **波兰语** (pl-PL)
- **法语** (fr-FR)
- **西班牙语** (es-ES)
- **斯洛伐克** (sk-SK)
- **日语** (ja-JP)
- **土耳其语** (tr-TR)
- **韩语** (ko-KR)
- **芬兰语** (fi-FI)
- **印尼语** (id-ID)
- **荷兰语** (nl-NL)

:::

### preWrapper

- 类型： `boolean`

- 默认值： `true`

- 详情：

  是否在 `<pre>` 标签外额外包裹一层。

  `lineNumbers` 和 `copyCodeButton` 依赖于这个额外的包裹层。这换句话说，如果你禁用了 `preWrapper` ，那么 行号 和 复制按钮 也会被同时禁用。

::: tip
如果你想要在客户端来实现这些功能时，可以禁用该配置项。比如使用
[Prismjs Line Highlight](https://prismjs.com/plugins/line-highlight/) 或者 [Prismjs Line Numbers](https://prismjs.com/plugins/line-numbers/)。
:::

:::: tip

在新的版本中，实现了类似于 [shiki](https://shiki.style/packages/transformers) 的部分功能，
你可以使用与其相同的语法来为代码块添加样式。

以下功能需要额外的样式才能正常工作，这应该由主题或用户来处理。

::: details 查看样式示例
@[code{260-349}](@vuepress/theme-default/src/client/styles/code.scss)
:::

::::

### notationDiff

- 类型： `boolean`

- 默认值： `false`

- 详情：

  是否启用 Notation Diff

- 示例：

  ```ts
  console.log('hewwo') // [!code --]
  console.log('hello') // [!code ++]
  console.log('goodbye')
  ```

- 参考：
  - [Shiki > Notation Diff](https://shiki.style/packages/transformers#transformernotationdiff)

### notationFocus

- 类型： `boolean`

- 默认值： `false`

- 详情：

  是否启用 Notation Focus.

- 示例：

  ```ts
  console.log('Not focused')
  console.log('Focused') // [!code focus]
  console.log('Not focused')
  ```

- 参考：
  - [Shiki > Notation Focus](https://shiki.style/packages/transformers#transformernotationfocus)

### notationHighlight

- 类型： `boolean`

- 默认值： `false`

- 详情：

  是否启用 Notation Highlight.

- 示例：

  ```ts
  console.log('Not highlighted')
  console.log('Highlighted') // [!code highlight]
  console.log('Not highlighted')
  ```

- 参考：
  - [Shiki > Notation Highlight](https://shiki.style/packages/transformers#transformernotationhighlight)

### notationErrorLevel

- 类型： `boolean`

- 默认值： `false`

- 详情：

  是否启用 Notation Error Level.

- 示例：

  ```ts
  console.log('No errors or warnings')
  console.warn('Warning') // [!code warning]
  console.error('Error') // [!code error]
  ```

- 参考：
  - [Shiki > Notation Error Level](https://shiki.style/packages/transformers#transformernotationerrorlevel)
