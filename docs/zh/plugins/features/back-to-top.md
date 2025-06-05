---
icon: arrow-up-to-line
---

# back-to-top

<NpmBadge package="@vuepress/plugin-back-to-top" />

该插件会给你的站点添加一个 _返回顶部_ 按钮。当页面向下滚动时，该按钮会显示在页面的右下角。点击该按钮，页面会滚动到顶部。

该插件已经集成到默认主题中。

## 使用方法

```bash
npm i -D @vuepress/plugin-back-to-top@next
```

```ts title=".vuepress/config.ts"
import { backToTopPlugin } from '@vuepress/plugin-back-to-top'

export default {
  plugins: [backToTopPlugin()],
}
```

## 选项

### threshold

- 类型：`number`
- 默认值：`100`
- 详情：滚动距离阈值，用于显示返回顶部按钮（单位：像素）

### progress

- 类型：`boolean`
- 默认值：`true`
- 详情：是否显示滚动进度

## 样式

你可以通过 CSS 变量来自定义 _返回顶部_ 按钮的样式：

@[code css](@vuepress/plugin-back-to-top/src/client/styles/vars.css)
