---
icon: paint-bucket
---

# markdown-stylize

<NpmBadge package="@vuepress/plugin-markdown-stylize" />

在 VuePress 站点中为内容添加样式。

## 使用方法

```bash
npm i -D @vuepress/plugin-markdown-stylize@next
```

```ts
import { markdownStylizePlugin } from '@vuepress/plugin-markdown-stylize'

export default {
  plugins: [
    markdownStylizePlugin({
      // 配置项
    }),
  ],
}
```

## 语法

### 对齐内容

你可以使用 `left` `center` `right` `justify` 来对齐文本。

:::: details 示例

::: left
左对齐的内容
:::

::: center
居中的内容
:::

::: right
右对齐的内容
:::

::: justify
两端对齐的内容
:::

```md
::: left
左对齐的内容
:::

::: center
居中的内容
:::

::: right
右对齐的内容
:::

::: justify
两端对齐的内容
:::
```

::::

### 添加属性

你可以使用语法 `{attrs}` 来为 Markdown 元素添加属性。

比如，如果你想要一个 id 为 say-hello-world，文字为 Hello World 的二级标题，你可以使用:

```md
## Hello World {#say-hello-world}
```

如果你想要一个有 full-width Class 的图片，你可以使用:

```md
![img](link/to/image.png) {.full-width}
```

同时也支持其他属性:

```md
一个包含文字的段落。 {#p .a .b align=center customize-attr="content with spaces"}
```

会被渲染为:

```html
<p id="p" class="a b" align="center" customize-attr="content with spaces">
  一个包含文字的段落。
</p>
```

完整的示例请参考 [@mdit/plugin-attrs](https://mdit-plugins.github.io/zh/attrs.html#demo)。

### 高亮内容

你可以使用 `== ==` 来通过 `<mark>` 标记内容。请注意标记两侧需要有空格。

::: details 案例

VuePress ==非常== 强大!

```md
VuePress ==非常== 强大!
```

:::

### 创建剧透

你可以使用使用 `!! !!` 标记剧透文字。请注意标记两侧需要有空格。

::: details 案例

VuePress !!非常强大!!!

```md
VuePress !!非常强大!!!
```

:::

### 上下标

你可以使用 `^` 来标记上标，`~` 来标记下标。

::: details 案例

H~2~O 是液体，2^10^ 是 1024.

```md
H~2~O 是液体，2^10^ 是 1024.
```

:::

### 创建自己的样式化

`custom` 选项接收一个数组，其中每个元素接受 2 个选项：

- `matcher`：应为 `string` 或 `RegExp`。

- `replacer`: 自定义匹配标记的函数

例如，你可以使用以下配置将 `*推荐*` 转换为徽章 <Badge type="tip">推荐</Badge>：

```js {6-18} title=".vuepress/config.js"
import { mdEnhancePlugin } from 'vuepress-plugin-md-enhance'

export default {
  plugins: [
    mdEnhancePlugin({
      stylize: [
        {
          matcher: '推荐',
          replacer: ({ tag }) => {
            if (tag === 'em')
              return {
                tag: 'Badge',
                attrs: { type: 'tip' },
                content: '推荐',
              }

            return null
          },
        },
      ],
    }),
  ],
}
```

另一个例子是你想要将所有的“不或者没”开头的强调词设置为红色，这样 `设置它*没有*任何效果，请*不要*这样使用。`变成：“设置它<span style="color:red">没有</span>任何效果，请<span style="color:red">不要</span>这样使用。"

```js {6-18} title=".vuepress/config.js"
import { mdEnhancePlugin } from 'vuepress-plugin-md-enhance'

export default {
  plugins: [
    mdEnhancePlugin({
      stylize: [
        {
          matcher: /^(不|没)/,
          replacer: ({ tag, attrs, content }) => {
            if (tag === 'em')
              return {
                tag: 'span',
                attrs: { ...attrs, style: 'color: red' },
                content,
              }

            return null
          },
        },
      ],
    }),
  ],
}
```

同时，你也可以在 frontmatter 总通过 `stylize` 选项来自定义此页面额外的匹配标记的函数。

## 配置项

### align

- 类型： `boolean`

- 详情： 是否启用对齐支持。

### attrs

- 类型： `MarkdownItAttrsOptions | boolean`

- 详情：

  是否启用 attrs 支持。

  你也可以传递一个对象来指定 [@mdit/plugin-attrs](https://mdit-plugins.github.io/zh/attrs.html#高级) 的选项。

### mark

- 类型： `boolean`

- 详情： 是否启用标记格式支持。

### spoiler

- 类型： `boolean`

- 详情： 是否启用剧透支持。

### sup

- 类型： `boolean`

- 详情： 是否启用上标格式支持。

### sub

- 类型： `boolean`

- 详情： 是否启用下标格式支持。

### custom

- 类型： `MarkdownStylizeCustomOptions[]`

- 详情：

  创建自定义样式化。详情请参阅 [@mdit/plugin-stylize](https://mdit-plugins.github.io/zh/stylize.html#使用)
