# shiki

<NpmBadge package="@vuepress/plugin-shiki" />

该插件使用 [Shiki](https://shiki.style/) 来为 Markdown 代码块启用代码高亮。

::: tip

[Shiki](https://shiki.style/) 是 VSCode 正在使用的代码高亮器。它具有更高的保真度，但可能会比 [Prism.js](https://prismjs.com/) 要慢一些，特别是在有大量代码块需要处理的时候。

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

### defaultHighlightLang

- 类型： `string`

- 详情：

  当指定的语言不可用时，使用备选语言。

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

### lineNumbers

- 类型： `boolean | number`

- 默认值： `true`

- 详情：

  是否启用行号。

  - `true`：启用代码行号
  - `false`：禁用代码行号。
  - `number`：显示行号所需的最少行数。
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

### preWrapper

- 类型： `boolean`

- 默认值： `true`

- 详情：

  是否在 `<pre>` 标签外额外包裹一层。

  `lineNumbers` 依赖于这个额外的包裹层。这换句话说，如果你禁用了 `preWrapper` ，那么 行号 也会被同时禁用。

### defaultColor

- 类型： `false | 'light' | 'dark' | string`

- 默认值： `'light'`

- 详情：

  应用于代码的默认主题（通过内联 `color` 样式）。其余主题通过 CSS 变量应用，并通过 CSS 覆盖进行切换。

  例如，如果 `defaultColor` 是 `light`，则将 `light` 主题应用于代码，并通过 CSS 变量应用 `dark` 主题和其他自定义主题：

```html
<span style="color:#{light};--shiki-dark:#{dark};--shiki-custom:#{custom};"
  >code</span
>
```

设置为 `false` 时，将不会应用任何默认样式，完全由用户自行应用样式。

```html
<span
  style="--shiki-light:#{light};--shiki-dark:#{dark};--shiki-custom:#{custom};"
  >code</span
>
```

### shikiSetup

- 类型： `(shiki: Highlighter) => void | Promise<void>`

- 详情：

  自定义 Shiki 函数。您可以通过在配置中添加自己的 shikiSetup 函数来扩展 Shiki 实例。

:::: tip

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
