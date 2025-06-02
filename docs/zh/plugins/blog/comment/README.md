# comment

<NpmBadge package="@vuepress/plugin-comment" />

VuePress 评论插件，支持多种评论服务商。

## 使用

```bash
npm i -D @vuepress/plugin-comment@next
```

```ts title=".vuepress/config.ts"
import { commentPlugin } from '@vuepress/plugin-comment'

export default {
  plugins: [
    commentPlugin({
      provider: 'Waline', // Artalk | Giscus | Waline | Twikoo
      // 服务商选项
    }),
  ],
}
```

## 支持的服务商

- [Artalk](./artalk/)
- [Giscus](./giscus/)
- [Twikoo](./twikoo/)
- [Waline](./waline/)

## 指南

详细配置和使用说明请查看[指南](./guide.md)。
