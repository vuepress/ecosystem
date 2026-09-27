# Artalk 选项

## 选项

Artalk 的选项继承自 [Artalk 配置](https://artalk.js.org/guide/frontend/config.html)，所有可序列化的 Artalk 选项都可以直接在插件选项中配置。

以下选项为插件的保留选项，将从 VuePress 配置中自动推断：

::: fields
@`el` type=`string | HTMLElement` managed-by="插件"

容器元素，由 VuePress 配置推断。

@`pageTitle` type=string managed-by="插件"

页面标题，由 VuePress 页面推断。

@`pageKey` type=string managed-by="插件"

页面键名，由 VuePress 路由推断。

@`site` type=string managed-by="插件"

站点名称，由 VuePress 站点配置推断。

:::

::: tip
`imgUploader` 和 `avatarURLBuilder` 这两个函数选项只能在客户端设置，详见 [客户端配置](#客户端配置)。
:::

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
