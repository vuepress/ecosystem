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

在容器内部，以 `@` 加一段行内代码开头的行是字段项目。属性附加在闭合的反引号之后。

```md
::: fields
@`theme` type=ThemeConfig required default=`{ base: '/' }`

主题配置

@`enabled` type=boolean optional default=`true`

是否启用

:::
```

### 字段名称

名称是一段行内代码，因此遵循行内代码语法，且必须在同一行闭合。这使得描述嵌套类型的路径可以直接书写，例如数组元素或 Record 的值：

```md
::: fields
@`contributors.info[*].username` type=string

每个贡献者的用户名。

@`locales.<localePath>.title` type=string

每个语言的标题，其中 `<localePath>` 是 `/`、`/zh/` 这样的语言路径。

:::
```

`[*]` 标记数组元素，`<key>` 标记 `Record` 的值。两者都会保留在渲染出的名称中，但在生成[字段 ID](#字段-id) 时会被去除。

### 属性

默认情况下，所有属性都允许并按原样显示。常见属性包括 `type`、`required`、`optional`、`default` 和 `deprecated`。

- `type` 显示为字段头部中的行内代码。
- `default` 显示为字段头部下方带标签的内容。使用反引号包裹时渲染为行内代码，否则渲染为普通文字。
- `required`、`optional` 和 `deprecated` 显示为徽章，已弃用字段的名称会标红并划掉。
- 其他属性显示为 `名称: 值` 徽章。

属性值可以不加引号，也可以使用 `"`、`'` 或反引号包裹：

- 不加引号的值在第一个空白处结束，包含空格时必须使用引号。
- 使用 `"` 或 `'` 包裹的值支持用 `\` 转义。
- 使用反引号包裹的值保持字面量，不做转义处理。

由于 `default` 在不使用反引号时会渲染为普通文字，字面量请使用反引号，描述性文字请使用引号：

```md
::: fields
@`size` type=number default=`320px`

渲染为行内代码。

@`timeout` type=number default="由主题决定，显式设置可覆盖"

渲染为普通文字。

:::
```

### 字段 ID

每个字段项目都会根据其名称生成一个 `id`，以便你可以直接链接到它（例如 `#theme`）。该 id 使用与标题相同的 slugify 函数（`markdown.anchor.slugify`，回退到 `markdown.slugify`）生成，并在页面内保持唯一。

数组和 Record 的占位符会从 id 中去除：`contributors.info[*].username` 得到 `#contributors-info-username`，`locales.<localePath>.title` 得到 `#locales-localepath-title`。

### 嵌套

字段可以嵌套以描述对象类型的字段。要在另一个字段内创建字段项目，每个嵌套级别将起始 `@` 增加一个。

```md
::: fields
@`options` type=object

选项。

@@`options.name` type=string

选项名称。

@`other` type=string

其他字段。

:::
```

### 转义

使用 `\` 转义 `@`，即可把类似标记的一行保留为内容：

```md
::: fields
@`theme` type=object

\@`not-a-field`
:::
```

更多语法细节，请参考 [@mdit/plugin-field](https://mdit-plugins.github.io/zh/field.html)。

## 演示

::: fields
@`theme` type=ThemeConfig required default=`{ base: '/' }`

主题配置

@`enabled` type=boolean optional default=`true`

是否启用

@`timeout` type=number default="由主题决定，显式设置可覆盖"

描述性默认值，渲染为普通文字。

@`other` type=string deprecated

已弃用字段

:::

## 选项

::: fields
@`fields` type=boolean

是否启用 `::: fields` 容器。

@`locales` type=`MarkdownFieldPluginLocaleConfig`

徽章文本的国际化配置，以语言路径（`/`、`/zh/` 等）为键。

@@`locales.<localePath>.default` type=string

`default` 属性的标签文本。

@@`locales.<localePath>.required` type=string

`required` 属性的徽章文本。

@@`locales.<localePath>.optional` type=string

`optional` 属性的徽章文本。

@@`locales.<localePath>.deprecated` type=string

`deprecated` 属性的徽章文本。

:::
