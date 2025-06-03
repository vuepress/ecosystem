---
icon: lightbulb
layout: CommentPage
---

# 指南

## 配置

使用插件选项与客户端配置文件配置插件。

### 使用插件选项

```ts title=".vuepress/config.ts"
import { commentPlugin } from '@vuepress/plugin-comment'

export default {
  plugins: [
    commentPlugin({
      provider: 'Artalk', // Artalk | Giscus | Waline | Twikoo
      // 服务商特定选项
    }),
  ],
}
```

### 使用客户端配置

```ts title=".vuepress/client.ts"
import {
  defineArtalkConfig,
  // defineGiscusConfig,
  // defineTwikooConfig,
  // defineWalineConfig,
} from '@vuepress/plugin-comment/client'
import { defineClientConfig } from 'vuepress/client'

defineArtalkConfig({
  // 选项
})
```

### 配置限制

- **仅限插件选项**：`provider`、多语言和资源相关选项必须在插件选项中设置，以确保 tree-shaking 优化。

- **仅限客户端配置**：基于函数的选项必须在客户端配置中设置，因为无法序列化。

## 使用评论

插件注册了全局组件 `<CommentService />`。

**用户**：使用别名和布局插槽插入组件。建议放在 `<PageNav />` 之后。

**主题开发者**：在主题布局中插入组件。

### 评论控制

通过插件选项或页面 frontmatter 控制评论：

- **全局**：在插件选项中设置 `comment: false` 全局禁用
- **单页**：在 frontmatter 中设置 `comment: true/false` 局部启用/禁用
- **自定义 ID**：在 frontmatter 中设置 `commentID` 自定义评论存储标识符

## 可用服务商

可选择 [Giscus](giscus/README.md)、[Waline](waline/README.md)、[Artalk](artalk/README.md) 或 [Twikoo](twikoo/README.md)。

::: tip 推荐

- **开发者**：Giscus（基于 GitHub）
- **一般用户**：Waline（功能完整）

:::

## 通用选项

### provider <Badge text="仅限插件选项" type="warning"/>

- 类型：`"Artalk" | "Giscus" | "Twikoo" | "Waline" | "None"`
- 默认值：`"None"`
- 详情：评论服务提供者。

### comment

- 类型：`boolean`
- 默认值：`true`
- 详情：是否默认启用评论功能。
