---
icon: scan-eye
---

# markdown-preview

<NpmBadge package="@vuepress/plugin-markdown-preview" />

在 VuePress 站点中支持内容预览。

## 使用

```bash
npm i -D @vuepress/plugin-markdown-preview@next
```

```ts title=".vuepress/config.ts"
import { markdownPreviewPlugin } from '@vuepress/plugin-markdown-preview'

export default {
  plugins: [markdownPreviewPlugin()],
}
```

## 指南

该插件提供了 `preview` 容器和 `VPPreview` 组件来在 VuePress 站点中预览内容。

你可以在 markdown 文件中像这样使用 `preview` 容器：

```md
::: preview 可选标题

预览内容

:::
```

它将在站点中渲染为一个预览容器，同时显示内容和其源代码：

::: preview 可选标题

预览内容

:::

有时，用户的代码可能与嵌入的预览内容不同，你可以直接使用 `VPPreview` 组件来实现这一点：

````md
<VPPreview title="可选标题">
  <template #content>
    <!-- 你的内容在这里 -->

    Hello world!

  </template>
  <template #code>
    <!-- 你的代码在这里 -->

```js
document.querySelector('body').innerText = 'Hello world!'
```

  </template>
</VPPreview>
````

<VPPreview title="可选标题">
  <template #content>
    <!-- 你的内容在这里 -->

    Hello world!

  </template>
  <template #code>
    <!-- 你的代码在这里 -->

```js
document.querySelector('body').innerText = 'Hello world!'
```

  </template>
</VPPreview>

## 选项

### locales

- 类型：`Record<string, MarkdownPreviewLocaleData>`

  ```ts
  export interface MarkdownPreviewLocaleData {
    /**
     * Toggle code button text
     *
     * 切换代码按钮文字
     */
    toggle: string
  }
  ```

- 详情：`<VPPreview>` 的本地化配置。

## 样式

你可以通过 CSS 变量自定义样式：

@[code css](@vuepress/plugin-markdown-preview/src/client/styles/vars.css)
