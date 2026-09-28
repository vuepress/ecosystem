---
icon: github
---

# Giscus

Giscus 是一个基于 GitHub Discussions 的评论系统，启用简便。

<!-- more -->

## 使用

请配置 `provider: "Giscus"`，并将从 [Giscus 页面](https://giscus.app/zh-CN) 获取的值传入 `repo`、`repoId`、`category` 和 `categoryId` 选项：

```ts title=".vuepress/config.ts"
import { commentPlugin } from '@vuepress/plugin-comment'

export default {
  plugins: [
    commentPlugin({
      provider: 'Giscus',
      repo: 'owner/repo',
      repoId: 'repo-id',
      category: 'Announcements',
      categoryId: 'category-id',
    }),
  ],
}
```

### 准备工作

1. 创建一个公开仓库，并开启评论区，作为评论存放的地点。
1. 安装 [Giscus App](https://github.com/apps/giscus)，使其有权限访问对应仓库。
1. 前往 [Giscus 页面](https://giscus.app/zh-CN) 获取设置。

   填写仓库和 Discussion 分类，然后滚动到页面下方的“启用 giscus”部分，获取 `data-repo`、`data-repo-id`、`data-category` 和 `data-category-id` 四个属性。

### 主题

默认情况下，Giscus 使用 `light` 或 `dark` 主题（基于夜间模式状态）。

::: tip 夜间模式

为了能使 Giscus 应用正确的主题，你需要为 `<CommentService />` 通过 `darkmode` 属性传入一个布尔值，代表当前是否开启夜间模式。

:::

如果你想在日间模式和夜间模式下自定义主题，可以设置 [lightTheme](#lighttheme) 和 [darkTheme](#darktheme) 选项，使用内置主题关键词或以 `https://` 开头的自定义 CSS 链接。

## 选项

::: fields
@`repo` type=string required

存放评论的仓库名称，格式为 `owner/repo`。

参考：[准备工作](#准备工作)。

@`repoId` type=string required

存放评论的仓库 ID，请从 [Giscus 页面](https://giscus.app/zh-CN) 获取。

@`category` type=string required

讨论分类名称。

@`categoryId` type=string required

讨论分类 ID，请从 [Giscus 页面](https://giscus.app/zh-CN) 获取。

@`mapping` type=`'number' | 'og:title' | 'pathname' | 'specific' | 'title' | 'url'` default=`'pathname'`

页面与 discussion 的映射关系，详见 [Giscus 页面](https://giscus.app/zh-CN)。

@`strict` type=boolean default=`true`

是否启用严格匹配。

@`lazyLoading` type=boolean default=`true`

是否启用懒加载。

@`reactionsEnabled` type=boolean default=`true`

是否启用主帖子上的反应。

@`inputPosition` type=`'top' | 'bottom'` default=`'top'`

输入框的位置。

@`lightTheme` type=GiscusTheme default=`'light'`

日间模式下使用的 Giscus 主题，应为一个内置主题关键词或以 `https://` 开头的 CSS 链接。

可用主题：

- `'catppuccin_frappe'`
- `'catppuccin_latte'`
- `'catppuccin_macchiato'`
- `'catppuccin_mocha'`
- `'cobalt'`
- `'dark_dimmed'`
- `'dark_high_contrast'`
- `'dark_protanopia'`
- `'dark_tritanopia'`
- `'dark'`
- `'fro'`
- `'gruvbox_dark'`
- `'gruvbox_light'`
- `'gruvbox'`
- `'light_high_contrast'`
- `'light_protanopia'`
- `'light_tritanopia'`
- `'light'`
- `'noborder_dark'`
- `'noborder_gray'`
- `'noborder_light'`
- `'preferred_color_scheme'`
- `'purple_dark'`
- `'transparent_dark'`

参考：[主题](#主题)。

@`darkTheme` type=GiscusTheme default=`'dark'`

夜间模式下使用的 Giscus 主题，应为一个内置主题关键词或以 `https://` 开头的 CSS 链接。

可用主题见 `lightTheme`。

参考：[主题](#主题)。

:::

## 客户端配置

你可以使用 `defineGiscusConfig` 函数来配置 Giscus：

```ts title=".vuepress/client.ts"
import { defineGiscusConfig } from '@vuepress/plugin-comment/client'
import { defineClientConfig } from 'vuepress/client'

defineGiscusConfig({
  // Giscus 选项
})
```
