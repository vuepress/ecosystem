# 插件配置

你可以通过 `themePlugins` 设置默认主题使用的插件。

默认主题使用了一些插件，如果你确实不需要该插件，你可以选择禁用它。在禁用插件之前，请确保你已了解它的用途。

```ts
import { defaultTheme } from '@vuepress/theme-default'

export default {
  theme: defaultTheme({
    themePlugins: {
      // 在这里自定义主题插件
    },
  }),
}
```

## themePlugins.activeHeaderLinks

- 类型： `boolean`

- 默认值： `true`

- 详情：

  是否启用 [@vuepress/plugin-active-header-links](../../plugins/development/active-header-links.md)。

## themePlugins.copyCode

- 类型： `CopyCodePluginOptions | boolean`

- 默认值： `true`

- 详情：

  是否启用 [@vuepress/plugin-copy-code](../../plugins/features/copy-code.md)。

  Object value is supported as plugin options.

## themePlugins.git

- 类型： `boolean`

- 默认值： `true`

- 详情：

  是否启用 [@vuepress/plugin-git](../../plugins/development/git.md)。

## themePlugins.linksCheck

- 类型： `LinksCheckPluginOptions | boolean`

- 默认值： `true`

- 详情：

  是否启用 [@vuepress/plugin-links-check](../../plugins/markdown/links-check.md)。

## themePlugins.photoSwipe

- 类型： `boolean`

- 默认值： `true`

- 详情：

  是否启用 [@vuepress/plugin-photo-swipe](../../plugins/features/photo-swipe.md)。

## themePlugins.nprogress

- 类型： `boolean`

- 默认值： `true`

- 详情：

  是否启用 [@vuepress/plugin-nprogress](../../plugins/features/nprogress.md)。

## themePlugins.shiki

- 类型： `boolean | ShikiPluginOptions`

- 默认值： `true`

- 详情：

  是否启用 [@vuepress/plugin-shiki](../../plugins/markdown/shiki.md)。

## themePlugins.seo

- 类型： `SeoPluginOptions | boolean`

- 默认值： `true`

- 详情：

  是否启用 [@vuepress/plugin-seo](../../plugins/seo/seo/README.md)。

  Object value is supported as plugin options.

## themePlugins.sitemap

- 类型： `SitemapPluginOptions | boolean`

- 默认值： `true`

- 详情：

  是否启用 [@vuepress/plugin-sitemap](../../plugins/seo/sitemap/README.md)。

  支持对象格式以作为插件选项。
