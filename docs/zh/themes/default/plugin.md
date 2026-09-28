---
icon: unplug
---

# 插件配置 {#plugins-config}

你可以通过 `themePlugins` 设置默认主题使用的插件。

默认主题使用了一些插件，如果你确实不需要该插件，你可以选择禁用它。在禁用插件之前，请确保你已了解它的用途。

```ts title=".vuepress/config.ts"
import { defaultTheme } from '@vuepress/theme-default'

export default {
  theme: defaultTheme({
    themePlugins: {
      // 在这里自定义主题插件
    },
  }),
}
```

## themePlugins

:::: fields
@`activeHeaderLinks` type=boolean default=`true`

是否启用 [@vuepress/plugin-active-header-links](../../plugins/development/active-header-links.md)。

@`backToTop` type=`BackToTopPluginOptions | boolean` default=`true`

是否启用 [@vuepress/plugin-back-to-top](../../plugins/features/back-to-top.md)。

支持对象格式以作为插件选项。

@`copyCode` type=`CopyCodePluginOptions | boolean` default=`true`

是否启用 [@vuepress/plugin-copy-code](../../plugins/features/copy-code.md)。

支持对象格式以作为插件选项。

@`git` type=`GitPluginOptions | boolean` default=`true`

是否启用 [@vuepress/plugin-git](../../plugins/development/git.md)。

@`hint` type=`MarkdownHintPluginOptions | boolean` default=`true`

是否启用 [@vuepress/plugin-markdown-hint](../../plugins/markdown/markdown-hint.md)。

参考：[提示容器](./markdown.md#hint-containers)

@`linksCheck` type=`LinksCheckPluginOptions | boolean` default=`true`

是否启用 [@vuepress/plugin-links-check](../../plugins/markdown/links-check.md)。

支持对象格式以作为插件选项。

@`mediumZoom` type=boolean default=`true`

是否启用 [@vuepress/plugin-medium-zoom](../../plugins/features/medium-zoom.md)。

@`nprogress` type=boolean default=`true`

是否启用 [@vuepress/plugin-nprogress](../../plugins/features/nprogress.md)。

@`prismjs` type=`PrismjsPluginOptions | boolean` default=`true`

是否启用 [@vuepress/plugin-prismjs](../../plugins/markdown/prismjs.md)。

@`seo` type=`Partial<SeoPluginOptions> | boolean` default=`true`

是否启用 [@vuepress/plugin-seo](../../plugins/seo/seo.md)。

支持对象格式以作为插件选项。

@`sitemap` type=`Partial<SitemapPluginOptions> | boolean` default=`true`

是否启用 [@vuepress/plugin-sitemap](../../plugins/seo/sitemap.md)。

支持对象格式以作为插件选项。

@`tab` type=`MarkdownTabPluginOptions | boolean` default=`true`

是否启用 [@vuepress/plugin-markdown-tab](../../plugins/markdown/markdown-tab.md)。

参考：[代码选项卡](./markdown.md#code-tabs) 与 [选项卡](./markdown.md#tabs)

::::
