---
icon: lightbulb
layout: CommentPage
---

# 指南

## 配置

该插件通过插件选项和客户端配置文件提供灵活的配置方式。

### 使用插件选项

```ts title=".vuepress/config.ts"
import { commentPlugin } from '@vuepress/plugin-comment'

export default {
  plugins: [
    commentPlugin({
      provider: 'Artalk', // Artalk | Giscus | Waline | Twikoo
      // 服务商的特定配置
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

### 配置逻辑

为了确保最佳性能和正确的序列化，配置选项被拆分到了插件配置和客户端配置中：

- **插件选项 (Plugin Options)**：静态选项（如 `provider`、`locales` 和资源链接）必须在此处设置。这允许构建工具进行 **Tree-shaking**，确保未使用的服务商代码不会被打包到最终构建中。

- **客户端配置 (Client Config)**：动态选项（尤其是涉及函数或回调的选项）必须在此处设置。由于这些选项无法在主配置中序列化，客户端配置将作为运行时的入口点。

## 组件用法

该插件注册了一个全局的 `<CommentService />` 组件，你可以将其放置在布局的任何位置。

**对于用户**：
你可以通过别名或主题提供的布局插槽来注入该组件。通用的做法是将其放置在 `<PageNav />` 组件之后。

**对于主题开发者**：
你应该直接在主题的布局文件中包含 `<CommentService />` 组件，以提供内置的评论支持。

### 可见性与标识

你可以控制评论区的显示状态，并自定义每个页面的唯一标识符：

- **全局开关**：使用插件配置中的 `comment` 选项来设置全站的默认显示状态。
- **单页开关**：使用 Frontmatter 中的 `comment` 键来启用或禁用特定页面的评论，该设置会覆盖全局设置。
- **自定义标识符**：使用 Frontmatter 中的 `commentID` 键来定义页面评论的自定义标识符（例如在迁移文章或更改 URL 时）。

## 可选服务商

我们支持以下评论服务。请参考各自的指南以获取设置详情：[Giscus](giscus/README.md)、[Waline](waline/README.md)、[Artalk](artalk/README.md) 和 [Twikoo](twikoo/README.md)。

::: tip 推荐

- **Giscus**：**开发者**和技术博客的理想选择，它使用 GitHub Discussions 来存储评论。
- **Waline**：**普通用户**的全面之选，提供丰富的功能集和后端灵活性。

:::

## 通用选项

### provider <Badge text="仅限插件选项" type="warning"/>

- 类型：`"Artalk" | "Giscus" | "Twikoo" | "Waline" | "None"`
- 默认值：`"None"`
- 详情：要使用的评论服务提供商。

### comment

- 类型：`boolean`
- 默认值：`true`
- 详情：是否默认在全局范围内启用评论功能。
