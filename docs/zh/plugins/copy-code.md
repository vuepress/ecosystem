# copy-code

<NpmBadge package="@vuepress/plugin-copy-code" />

此插件为 [@vuepress/plugin-prismjs](./prismjs.md#copycodebutton) 和 [@vuepress/plugin-shiki](./shiki.md#copycodebutton) 等代码块高亮插件 添加的复制按钮 提供 完整的功能 和 样式支持。

## 使用

```bash
npm i -D @vuepress/plugin-copy-code@next
```

```ts
import { copyCodePlugin } from '@vuepress/plugin-copy-code'

export default {
  plugins: [
    copyCodePlugin({
      // options
    }),
  ],
}
```

## 选项

### selector

- 类型：`string`
- 默认值：`'div[class*="language-"] > button.copy'`
- 详情:

  代码块复制按钮选择器

### duration

- 类型：`number`
- 默认值：`2000`
- 详情:

  提示消息显示时间，设置为 `0` 会禁用提示。

### defaultStyle

- 类型：`boolean`
- 默认值：`true`
- 详情:

  是否使用默认样式。

  设置为 `false` 需要自定义 复制按钮 样式。

## 样式

当使用默认样式时，你可以通过 CSS 变量来自定义 _复制按钮_ 的样式：

@[code css](@vuepress/plugin-copy-code/src/client/styles/vars.css)

当不使用默认样式时，你应该在自己样式文件中，自定义*复制按钮*的样式。

::: details 复制按钮样式示例
@[code css](@vuepress/plugin-copy-code/src/client/styles/copy-code.css)
:::

## Composables API

### useCopyCode(options)

对于主题开发者，可以通过此 API 为 代码块复制按钮 提供完整的功能。

```ts
type UseCopyCode = (options?: CopyCodeOption) => void

interface CopyCodeOption {
  /**
   * 代码块复制按钮选择器
   */
  selector?: string

  /**
   * 提示消息显示时间，设置为 `0` 会禁用提示
   */
  duration?: number
}
```

**使用：**

```ts data-title="client.ts"
import { useCopyCode } from '@vuepress/plugin-copy-code/client'
export default {
  setup() {
    useCopyCode({
      selector: 'div[class*="language-"] > button.copy',
      duration: 2000,
    })
  },
}
```
