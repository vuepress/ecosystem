---
icon: expand
---

# markdown-ext

<NpmBadge package="@vuepress/plugin-markdown-ext" />

为 VuePress 添加基本的 GFM 支持，以及一些有用的功能。

## 使用

```bash
npm i -D @vuepress/plugin-markdown-ext@next
```

```ts
import { markdownExtPlugin } from '@vuepress/plugin-markdown-ext'

export default {
  plugins: [
    markdownExtPlugin({
      // 选项
    }),
  ],
}
```

## 语法

### 脚注

- 在 Markdown 中使用 `[^锚点文字]` 来定义脚注。

- 在之后的任何位置使用 `[^锚点文字]: ...` 来描述脚注内容。

- 如果脚注包含多个段落，其后的段落应当保持双层缩进。

::: details 示例

脚注 1 链接[^链接1]。

脚注 2 链接[^链接2]。

行内的脚注^[行内脚注文本] 定义。

重复的页脚定义[^second]。

[^链接1]: 脚注 **可以包含特殊标记**

    也可以由多个段落组成

[^链接2]: 脚注文字。

```md
脚注 1 链接[^链接1]。

脚注 2 链接[^链接2]。

行内的脚注^[行内脚注文本] 定义。

重复的页脚定义[^second]。

[^链接1]: 脚注 **可以包含特殊标记**

    也可以由多个段落组成

[^链接2]: 脚注文字。
```

:::

### 任务列表

- 使用 `- [ ] 一些文字` 渲染一个未勾选的任务项
- 使用 `- [x] 一些文字` 渲染一个勾选了的任务项 (我们也支持大写的 `X`)

::: details 示例

- [ ] 计划 A
- [x] 计划 B

```md
- [ ] 计划 A
- [x] 计划 B
```

:::

### 组件

你可以使用 component 代码块来在 Markdown 中添加组件。YAML 和 JSON 的数据格式均受支持:

- YAML <Badge text="推荐" type="tip" />:

  ````md
  ```component 组件名称
  # 组件数据
  ```
  ````

- JSON:

  ````md
  ```component 组件名称
  {
    // 组件数据
  }
  ```
  ````

::: details 示例

```component Badge
text: Mr.Hope
type: tip
```

```component Badge
{
  "text": "Mr.Hope",
  "type": "tip"
}
```

````md
```component Badge
text: Mr.Hope
type: tip
```

```component Badge
{
  "text": "Mr.Hope",
  "type": "tip"
}
```
````

:::

### v-pre

你可以使用 `v-pre` 容器来渲染将任何 mustache 语法作为纯文本渲染。

:::: details 示例

::: v-pre

{{ abc }}

:::

```md
::: v-pre

{{ abc }}

:::
```

::::

## 选项

### gfm

- 类型：`boolean`

- 详情：

  是否调整行为和功能，使其更类似于 GitHub Flavored Markdown。

  `markdown-it` 已经默认支持表格与删除线。如果此选项为 `true`，则会启用以下新功能：

  - 自动链接（在 `markdown-it` 中命名为 `linkify`）
  - 硬换行
  - 脚注
  - 任务列表

  请注意，一些行为可能和 GitHub Flavored Markdown 不同。

### footnote

- 类型：`boolean`
- 默认值：`false`
- 在 GFM 中启用：是
- 详情：是否启用页脚格式支持。

### tasklist

- 类型：`MarkdownItTaskListOptions | boolean`

  ```ts
  interface MarkdownItTaskListOptions {
    /**
     * 是否禁用 checkbox
     *
     * @default true
     */
    disabled?: boolean

    /**
     * 是否使用 `<label>` 来包裹文字
     *
     * @default true
     */
    label?: boolean
  }
  ```

- 默认值：`false`
- 在 GFM 中启用：是
- 详情：

  是否启用任务列表格式支持。您可以传递一个对象来配置任务列表。

### breaks

- 类型：`boolean`
- 默认值：`false`
- 在 GFM 中启用：是
- 详情：是否将段落中的 `\n` 转换为 `<br>`。

### linkify

- 类型：`boolean`
- 默认值：`false`
- 在 GFM 中启用：是
- 详情：是否将类似 URL 的文本转换为链接。

### component

- 类型：`boolean`
- 默认值：`false`
- 详情：是否启用组件代码块支持。

### vPre

- 类型：`boolean`
- 默认值：`false`
- 详情：是否启用 `v-pre` 块支持。
