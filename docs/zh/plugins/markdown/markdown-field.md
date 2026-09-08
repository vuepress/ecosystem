---
icon: list-checks
---

# markdown-field

<NpmBadge package="@vuepress/plugin-markdown-field" />

在 VuePress 站点中添加字段容器。

## 使用

```bash
npm i -D @vuepress/plugin-markdown-field@next
```

```ts title=".vuepress/config.ts"
import { markdownFieldPlugin } from '@vuepress/plugin-markdown-field'

export default {
  plugins: [
    markdownFieldPlugin({
      // 启用字段容器
      fields: true,
    }),
  ],
}
```

## 语法

你可以使用 `::: fields` 容器描述字段信息，包括字段名称、类型、是否必填、默认值等。

在容器内部，以 `@名称@` 开头的行是字段项目。属性附加在闭合的 `@` 之后。

```md
::: fields
@theme@ type="ThemeConfig" required default="{ base: '/' }"

主题配置

@enabled@ type="boolean" optional default="true"

是否启用

:::
```

默认情况下，所有属性都允许并按原样显示。常见属性包括 `type`、`required`、`optional`、`default` 和 `deprecated`。

- `type` 显示为字段头部中的代码块。
- `default` 显示为字段头部下方带标签的代码块。
- `required`、`optional` 和 `deprecated` 显示为徽章，已弃用字段的名称会标红并划掉。
- 其他属性显示为 `名称: 值` 徽章。

### 嵌套

字段可以嵌套以描述对象类型的字段。要在另一个字段内创建字段项目，每个嵌套级别将起始 `@` 增加一个。

```md
::: fields
@options@ type="object"

选项。

@@options.name@ type="string"

选项名称。

@other@ type="string"

其他字段。

:::
```

更多语法细节，请参考 [@mdit/plugin-field](https://mdit-plugins.github.io/zh/field.html)。

## 演示

::: fields
@theme@ type="ThemeConfig" required default="{ base: '/' }"

主题配置

@enabled@ type="boolean" optional default="true"

是否启用

@other@ type="string" deprecated

已弃用字段

:::

## 选项

### fields

- 类型：`boolean`
- 详情：是否启用字段容器。

### locales

- 类型：`MarkdownFieldPluginLocaleConfig`

```ts
interface MarkdownFieldPluginLocaleData {
  /**
   * `default` 属性的标签文本
   */
  default: string

  /**
   * `required` 属性的徽章文本
   */
  required: string

  /**
   * `optional` 属性的徽章文本
   */
  optional: string

  /**
   * `deprecated` 属性的徽章文本
   */
  deprecated: string
}
```

- 详情：徽章文本的国际化配置。
