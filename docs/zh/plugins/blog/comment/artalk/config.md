# Artalk 选项

## 配置

详见 [Artalk 配置](https://artalk.js.org/guide/frontend/config.html)。

- `el`、`pageTitle`、`pageKey` 和 `site` 选项为插件的保留选项，将从 VuePress 配置中自动推断。

- `imgUploader` 和 `avatarURLBuilder` 这两个函数选项只能在客户端设置。

## 插件配置

你可以直接在插件选项中配置可序列化的选项：

```ts title=".vuepress/config.ts"
import { commentPlugin } from '@vuepress/plugin-comment'

export default {
  plugins: [
    commentPlugin({
      provider: 'Artalk',
      // 其他选项
      // ...
    }),
  ],
}
```

## 客户端配置

你可以使用 `defineArtalkConfig` 函数来配置 Artalk。

```ts title=".vuepress/client.ts"
import { defineArtalkConfig } from '@vuepress/plugin-comment/client'
import { defineClientConfig } from 'vuepress/client'

defineArtalkConfig({
  // Artalk 选项
})
```
