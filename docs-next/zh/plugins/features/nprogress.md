---
icon: pajamas:progress
---

# nprogress {#nprogress-plugin}

<NpmBadge package="@vuepress/plugin-nprogress" />

将 [nprogress](https://github.com/rstacruz/nprogress) 集成到 VuePress 中，在切换到另一个页面时会展示进度条。

该插件已经集成到默认主题中。

## 使用方法

```bash
npm i -D @vuepress/plugin-nprogress@next
```

```ts
import { nprogressPlugin } from '@vuepress/plugin-nprogress'

export default {
  plugins: [nprogressPlugin()],
}
```

## 样式

你可以通过 CSS 变量来自定义进度条的样式：

@[code css](@vuepress/plugin-nprogress/src/client/styles/vars.css)
