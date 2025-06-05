---
icon: trash-2
---

# remove-pwa

<NpmBadge package="@vuepress/plugin-remove-pwa" />

此插件从你的 VuePress 站点中删除 service worker，确保在你移除之前启用的任何 PWA 插件后，用户仍能接收到更新。

::: tip 如果你启用过 PWA，为什么需要这个插件？

PWA 插件，如 [`@vuepress/plugin-pwa`](./pwa/README.md) 会注册 service worker 到你的站点，使其可以被缓存并离线访问。

如果你删除 PWA 插件，旧的 service worker 仍会存在，但它无法获得更新，因为没有可更新的新 service worker。用户将继续使用你网站的旧版本。

要解决这个问题：

1. 在原位置生成一个新的空 service worker。
2. 这个 service worker 会删除旧 service worker 缓存的内容，然后注销自己。

:::

## 使用方法

```bash
npm i -D @vuepress/plugin-remove-pwa@next
```

```ts title=".vuepress/config.ts"
import { removePwaPlugin } from '@vuepress/plugin-remove-pwa'

export default {
  plugins: [
    removePwaPlugin({
      // 默认情况下，所有缓存都会被移除
      // 如需针对特定缓存，请提供正则表达式模式
      cachePatterns: ['\\bworkbox\\b', 'precache-v2'],
      swLocation: 'service-worker.js',
    }),
  ],
}
```

## 选项

### cachePatterns

- 类型：`string[]`
- 默认值：`[]`
- 详情：用于匹配需要移除的缓存名称的正则表达式模式。如果为空，将移除所有缓存。

### swLocation

- 类型：`string`
- 默认值：`'service-worker.js'`
- 详情：相对于 dest 文件夹的原始 service worker 位置。
