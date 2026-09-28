---
icon: https://artalk.js.org/favicon.png
---

# Artalk

Artalk 是一款简洁的自托管评论系统，你可以在服务器上轻松部署并集成到前端页面中。

在你的博客或任意页面部署 Artalk 评论框，为页面添加丰富的社交功能。

<!-- more -->

## 使用 {#usage}

```bash
npm i -D artalk
```

请配置 `provider: "Artalk"`，并将你的服务端地址传入 `server` 选项：

```ts title=".vuepress/config.ts"
import { commentPlugin } from '@vuepress/plugin-comment'

export default {
  plugins: [
    commentPlugin({
      provider: 'Artalk',
      server: 'https://artalk.example.com',
    }),
  ],
}
```

Artalk 的选项继承自 [Artalk 配置](https://artalk.js.org/guide/frontend/config.html)，所有可序列化的选项都可以直接在插件选项中配置。

### 部署服务端 {#deploy-server}

请参见 [Artalk 文档](https://artalk.js.org/guide/deploy.html)。

### 夜间模式 {#dark-mode}

为了能使 Artalk 应用正确的主题，你需要通过 `<CommentService />` 的 `darkmode` 属性传入一个布尔值，代表当前是否开启夜间模式。插件会将其转发给 Artalk 的 `darkMode` 选项。

## 选项 {#options}

以下选项为插件的保留选项，会根据 VuePress 上下文自动推断：

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

`imgUploader` 和 `avatarURLBuilder` 这两个函数选项只能在[客户端配置](#client-config)中设置。

:::

## 客户端配置 {#client-config}

你可以使用 `defineArtalkConfig` 函数来配置 Artalk：

```ts title=".vuepress/client.ts"
import { defineArtalkConfig } from '@vuepress/plugin-comment/client'
import { defineClientConfig } from 'vuepress/client'

defineArtalkConfig({
  // Artalk 选项
})
```
