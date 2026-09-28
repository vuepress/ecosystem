---
icon: https://twikoo.js.org/twikoo-logo-mini.png
---

# Twikoo

一个简洁、安全、免费的静态网站评论系统，基于 [腾讯云开发](https://curl.qcloud.com/KnnJtUom)。

<!-- more -->

## 使用 {#usage}

```bash
npm i -D twikoo
```

请配置 `provider: "Twikoo"`，并将你的服务端地址传入 `envId` 选项：

```ts title=".vuepress/config.ts"
import { commentPlugin } from '@vuepress/plugin-comment'

export default {
  plugins: [
    commentPlugin({
      provider: 'Twikoo',
      envId: 'https://twikoo.example.com',
    }),
  ],
}
```

### 部署后端 {#deploy-backend}

请先按照 [官方文档](https://twikoo.js.org/backend.html) 部署好后端。

::: tip

插件会自动设置 `lang`（为 `zh-CN` 或 `en`）、`path`（页面的评论标识符）和 `el`。

:::

## 选项 {#options}

::: fields
@`envId` type=string required

Vercel 地址或腾讯云环境 ID。

参考：[部署后端](#deploy-backend)。

@`region` type=string default=`'ap-shanghai'`

腾讯云区域。

:::

## 客户端配置 {#client-config}

你可以使用 `defineTwikooConfig` 函数来配置 Twikoo：

```ts title=".vuepress/client.ts"
import { defineTwikooConfig } from '@vuepress/plugin-comment/client'
import { defineClientConfig } from 'vuepress/client'

defineTwikooConfig({
  // Twikoo 选项
})
```
