---
icon: lightbulb
layout: CommentPage
---

# 指南

## 设置选项

你既可以在 Node.js 一侧使用插件选项设置选项，也可以通过[客户端配置文件][client-config]在浏览器一侧设置选项。

### 通过插件选项

```ts
import { commentPlugin } from '@vuepress/plugin-comment'

// .vuepress/config.ts
export default {
  plugins: [
    commentPlugin({
      provider: 'Artalk', // Artalk | Giscus | Waline | Twikoo

      // 在这里放置其他选项
      // ...
    }),
  ],
}
```

### 通过客户端配置文件

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

有以下你需要注意的限制：

- `provider`、多语言设置和其他资源相关选项必须在插件选项中设置。

  为确保 tree-shaking 有效，我们必须在 Node 一侧优化入口，以便打包器可以了解最终打包中应包含哪些资源。

  这些选项将在配置参考中用 <Badge text="仅限插件选项" type="warning" vertical="baseline"/> 标记。

- 不能序列化为 JSON 的选项必须在客户端配置中设置。

  接收复杂值的选项（例如：函数）不能在插件选项中设置，因为插件运行在 Node.js 环境下，所以我们无法将这些值和它们的上下文传递给浏览器。

  这些选项将在配置参考中用 <Badge text="仅限客户端配置" type="warning" vertical="baseline"/> 标记。

## 添加评论

该插件全局注册了一个组件 `<CommentService />`。

- 如果你是用户，你应该使用 `alias` 和布局槽来插入组件。 我们建议你在 `<PageNav />` 组件之后插入评论组件 (`<CommentService />`)，本页可作为一个 Demo 作为参考。
- 如果你是主题开发者，你应该将这个组件插入到你的主题布局中。

默认情况下，`<CommentService />` 组件是全局启用的，你可以在插件选项和页面 frontmatter 中使用 `comment` 选项来控制它。

- 你可以通过在页面 frontmatter 中设置 `comment: false` 在本地禁用它。
- 要使其全局禁用，请在插件选项中将 `comment` 设置为 `false`。 然后你可以在页面 frontmatter 中设置 comment: true 以在局部启用它。

你可以在页面 frontmatter 中设置 commentID 选项来自定义评论 ID，该 ID 用于标识要用于页面的评论存储项。默认情况下，它将是页面的 `path` ，这意味着如果你将站点部署到多个位置，站点间具有相同内容的页面将共享相同的评论数据。

## 可用的评论服务

目前你可以选择 [Giscus](giscus/README.md)、[Waline](waline/README.md)、[Artalk](artalk/README.md) 和 [Twikoo](twikoo/README.md)。

::: tip 推荐的评论服务

- 面向程序员和开发人员: Giscus
- 面向公众: Waline

:::

## 通用选项

### provider <Badge text="仅限插件选项" type="warning"/>

- 类型: `"Artalk" | "Giscus" | "Twikoo" | "Waline" | "None"`
- 默认值: `"None"`
- 详情：评论服务提供者。

### comment

- 类型: `boolean`
- 默认值: `true`
- 详情：是否默认启用评论功能。

[client-config]: https://vuejs.press/zh/guide/configuration.html#%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6
