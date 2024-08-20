# Twikoo 选项

## 配置

### envId

- 类型: `string`
- 必填: 是
- 详情：腾讯云环境 ID 或 Vercel 地址。

### repoId

- 类型: `string`
- 默认值: `"ap-shanghai"`
- 详情：腾讯云区域。

## 插件配置

你可以直接在插件选项中配置可序列化的选项:

```ts title=".vuepress/config.ts"
import { commentPlugin } from '@vuepress/plugin-comment'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  plugins: [
    commentPlugin({
      provider: 'Twikoo',
      // 其他选项
      // ...
    }),
  ],
})
```

## 客户端配置

你可以使用 `defineTwikooConfig` 函数来配置 Twikoo。

```ts title=".vuepress/client.ts"
import { defineTwikooConfig } from '@vuepress/plugin-comment/client'
import { defineClientConfig } from 'vuepress/client'

defineTwikooConfig({
  // Twikoo 选项
})
```
