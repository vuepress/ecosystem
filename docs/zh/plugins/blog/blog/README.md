---
icon: la:blog
---

# blog

<NpmBadge package="@vuepress/plugin-blog" />

为 VuePress 提供博客功能的插件，包括文章收集、分类、类型过滤和摘要生成。

## 使用

```bash
npm i -D @vuepress/plugin-blog@next
```

```ts title=".vuepress/config.ts"
import { blogPlugin } from '@vuepress/plugin-blog'

export default {
  plugins: [
    blogPlugin({
      // 选项
    }),
  ],
}
```
