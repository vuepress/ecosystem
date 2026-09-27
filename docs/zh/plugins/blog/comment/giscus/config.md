# Giscus 选项

## 选项

::: fields
@`repo` type=string required

存放评论的仓库名称。

@`repoId` type=string required

仓库 ID，请从 [Giscus 页面](https://giscus.app/zh-CN) 生成。

@`category` type=string required

讨论分类名称。

@`categoryId` type=string required

讨论分类 ID，请从 [Giscus 页面](https://giscus.app/zh-CN) 生成。

@`mapping` type=`'number' | 'og:title' | 'pathname' | 'specific' | 'title' | 'url'` default=`'pathname'`

页面 ↔️ discussion 映射关系，详见 [Giscus 页面](https://giscus.app/zh-CN)。

@`strict` type=boolean default=`true`

是否启用严格匹配。

@`lazyLoading` type=boolean default=`true`

是否启用懒加载。

@`reactionsEnabled` type=boolean default=`true`

是否启用主帖子上的反应。

@`inputPosition` type=`'top' | 'bottom'` default=`'top'`

输入框的位置。

@`lightTheme` type=GiscusTheme default=`'light'`

Giscus 在日间模式下使用的主题。应为一个内置主题关键词或者一个 `https://` 开头的 CSS 链接。

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

@`darkTheme` type=GiscusTheme default=`'dark'`

Giscus 在夜间模式下使用的主题。应为一个内置主题关键词或者一个 `https://` 开头的 CSS 链接。

可用主题见 `lightTheme`。

:::

## 插件配置

你可以直接在插件选项中配置可序列化的选项:

```ts title=".vuepress/config.ts"
import { commentPlugin } from '@vuepress/plugin-comment'

export default {
  plugins: [
    commentPlugin({
      provider: 'Giscus',
      // 其他选项
      // ...
    }),
  ],
}
```

## 客户端配置

你可以使用 `defineGiscusConfig` 函数来配置 Giscus。

```ts title=".vuepress/client.ts"
import { defineGiscusConfig } from '@vuepress/plugin-comment/client'
import { defineClientConfig } from 'vuepress/client'

defineGiscusConfig({
  // Giscus 选项
})
```
