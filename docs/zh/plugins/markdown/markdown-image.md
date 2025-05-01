---
icon: image
---

# markdown-image

<NpmBadge package="@vuepress/plugin-markdown-image" />

向你的 Markdown 图像添加附加功能。

## 使用方法

```bash
npm i -D @vuepress/plugin-markdown-image@next
```

```ts title=".vuepress/config.ts"
import { markdownImagePlugin } from '@vuepress/plugin-markdown-image'

export default {
  plugins: [
    markdownImagePlugin({
      // 启用 figure
      figure: true,
      // 启用图片懒加载
      lazyload: true,
      // 启用图片标记
      mark: true,
      // 启用图片大小
      size: true,
    }),
  ],
}
```

## 指南

### 图片懒加载

插件会通过原生 HTML5 功能启用图片的延迟加载，此功能仅在 [支持 loading=lazy 属性](https://caniuse.com/loading-lazy-attr) 的浏览器生效。

### 图片 ID 标记

当你在插件选项中设置 `mark: true` 时，你可以通过 `#light` 和 `#dark` 标记图片，使得图片只在特定的模式显示。

<VPToggleColorModeButton /> (尝试切换主题)

![GitHub Light](/images/icon/github-light.svg#dark)
![GitHub Dark](/images/icon/github-dark.svg#light)

```md
![GitHub Light](/images/icon/github-light.svg#dark)
![GitHub Dark](/images/icon/github-dark.svg#light)
```

#### 高级用法

你可以将对象传递给 `mark` 以配置 ID 标记，可用选项如下：

```ts
interface ImageMarkOptions {
  /** 仅限日间模式的 ID */
  light?: string[]
  /** 仅限夜间模式的 ID */
  dark?: string[]
}
```

### 图片尺寸

当你在插件选项中设置 `size: true` 时，你可以在图片替代文字后面添加 `=widthxheight`，并用空格分隔。

`width` 和 `height` 都应该是数字，单位为像素，并且都是可选的。

```md
![替代文字 =200x300](/example.png)
![替代文字 =200x](/example.jpg '标题')
![替代文字 =x300](/example.bmp)
```

渲染为 ↓

```html
<img src="/example.png" alt="替代文字" width="200" height="300" />
<img src="/example.jpg" alt="替代文字" title="标题" width="200" />
<img src="/example.bmp" alt="替代文字" height="300" />
```

#### Obsidian 语法

当你在插件选项中设置 `obsidianSize: true` 时，你可以在图片替代文字后面添加 `widthxheight`，并用 `|` 分隔。

`width` 和 `height` 都应该是数字，单位为像素，并且都是必需的。设置其中一个为 `0` 以按比例缩放另一个。

```md
![替代文字|200x200](/example.png)
![替代文字|200x0](/example.jpg)
![替代文字|0x300](/example.bmp)
```

渲染为 ↓

```html
<img src="/example.png" alt="替代文字" width="200" height="300" />
<img src="/example.jpg" alt="替代文字" width="200" />
<img src="/example.bmp" alt="替代文字" height="300" />
```

::: tip 在三种语法之间选择

- 旧语法在不支持的环境中会导致图片渲染问题（例如：GitHub）
- 新语法和 Obsidian 语法都与 Markdown 标准兼容，但新语法更自然。

:::

#### 旧语法 (已废弃)

::: warning 这种语法可能会在 GitHub 等平台上导致渲染问题。

:::

当你在插件选项中设置 `legacySize: true` 时，你可以在图片链接部分的末尾添加 `=widthxheight`，并用空格分隔。

`width` 和 `height` 都应该是数字，单位为像素，并且都是可选的。

```md
![替代文字](/example.png =200x300)
![替代文字](/example.jpg "标题" =200x)
![替代文字](/example.bmp =x300)
```

渲染为 ↓

```html
<img src="/example.png" alt="替代文字" width="200" height="300" />
<img src="/example.jpg" alt="替代文字" title="标题" width="200" />
<img src="/example.bmp" alt="替代文字" height="300" />
```

### 图片展示

有时，你可能希望为图像添加描述，并将其单独展示在上下文中，在这种情况下，你应该在插件选项中设置 `figure: true`。

这样当你单独将图片至于一行 (也可同时嵌套链接)，图像将显示为 `<figure>` ，标题或图片替代文字将显示为 `<figcaption>`。

![VuePress 图标](/favicon.ico)

[![VuePress 图标](/favicon.ico)](https://vuejs.press/)

![VuePress 图标](/favicon.ico 'VuePress 图标')

[![VuePress 图标](/favicon.ico 'VuePress 图标')](https://vuejs.press/)

![VuePress 图标](https://vuejs.press/images/hero.png "VuePress 图标" =300x300)

```md
![VuePress 图标](/favicon.ico)

[![VuePress 图标](/favicon.ico)](https://vuejs.press/)

![VuePress 图标](/favicon.ico 'VuePress 图标')

[![VuePress 图标](/favicon.ico 'VuePress 图标')](https://vuejs.press/)

![VuePress 图标](https://vuejs.press/images/hero.png "VuePress 图标" =300x300)
```

## 配置项

### figure

- 类型：`boolean`
- 详情：是否启用图片 Figure 支持。

### lazyload

- 类型：`boolean`
- 详情：是否使用原生方式懒加载页面图片。

### mark

- 类型：`ImageMarkOptions | boolean`

  ```ts
  interface ImageMarkOptions {
    /** 日间模式的 ID */
    light?: string[]
    /** 夜间模式的 ID */
    dark?: string[]
  }
  ```

- 详情：是否启用图片标注支持

### size

- 类型：`boolean | 'strict'`
- 详情：是否启用图片尺寸支持。`strict` 需要显式设置 `0` 来忽略宽度或高度。

### obsidianSize

- 类型：`boolean`
- 详情：是否启用 Obsidian 图片尺寸支持。

### legacySize

- 类型：`boolean`
- 详情：是否启用旧版图片尺寸支持。

<script setup>
import VPToggleColorModeButton from '@theme/VPToggleColorModeButton.vue'
</script>
