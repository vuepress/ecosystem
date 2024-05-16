# 样式

<NpmBadge package="@vuepress/theme-default" />

默认主题使用 CSS 编写样式，使用 CSS Variables 定义样式变量。

用户可以通过 [样式文件](#样式文件) 覆盖默认的 CSS 变量，以及编写额外的样式。

## CSS 变量文件

你可以在 [样式文件](#样式文件) 中覆盖默认的 CSS 变量。

::: details 点击展开 CSS 变量
@[code scss](@vuepress/theme-default/src/client/styles/vars.css)
:::

## 样式文件

样式文件的路径是 `.vuepress/styles/index.scss`.

你可以在这里编写额外的样式，或覆盖默认样式：

```css
:root {
  scroll-behavior: smooth;
}
```
