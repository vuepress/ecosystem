---
url: /ecosystem/themes/default/plugin.md
---
# Plugins Config

You can configure the plugins that used by default theme with `themePlugins`.

Default theme is using some plugins by default. You can disable a plugin if you really do not want to use it. Make sure you understand what the plugin is for before disabling it.

```ts title=".vuepress/config.ts"
import { defaultTheme } from '@vuepress/theme-default'

export default {
  theme: defaultTheme({
    themePlugins: {
      // customize theme plugins here
    },
  }),
}
```

## themePlugins

:::: fields
@`activeHeaderLinks` type=boolean default=`true`

Enable [@vuepress/plugin-active-header-links](../../plugins/development/active-header-links.md) or not.

@`backToTop` type=`BackToTopPluginOptions | boolean` default=`true`

Enable [@vuepress/plugin-back-to-top](../../plugins/features/back-to-top.md) or not.

Object value is supported as plugin options.

@`copyCode` type=`CopyCodePluginOptions | boolean` default=`true`

Enable [@vuepress/plugin-copy-code](../../plugins/features/copy-code.md) or not.

Object value is supported as plugin options.

@`git` type=`GitPluginOptions | boolean` default=`true`

Enable [@vuepress/plugin-git](../../plugins/development/git.md) or not.

@`hint` type=`MarkdownHintPluginOptions | boolean` default=`true`

Enable [@vuepress/plugin-markdown-hint](../../plugins/markdown/markdown-hint.md) or not.

See also: [Hint Containers](./markdown.md#hint-containers)

@`linksCheck` type=`LinksCheckPluginOptions | boolean` default=`true`

Enable [@vuepress/plugin-links-check](../../plugins/markdown/links-check.md) or not.

Object value is supported as plugin options.

@`mediumZoom` type=boolean default=`true`

Enable [@vuepress/plugin-medium-zoom](../../plugins/features/medium-zoom.md) or not.

@`nprogress` type=boolean default=`true`

Enable [@vuepress/plugin-nprogress](../../plugins/features/nprogress.md) or not.

@`prismjs` type=`PrismjsPluginOptions | boolean` default=`true`

Enable [@vuepress/plugin-prismjs](../../plugins/markdown/prismjs.md) or not.

@`seo` type=`Partial<SeoPluginOptions> | boolean` default=`true`

Enable [@vuepress/plugin-seo](../../plugins/seo/seo.md) or not.

Object value is supported as plugin options.

@`sitemap` type=`Partial<SitemapPluginOptions> | boolean` default=`true`

Enable [@vuepress/plugin-sitemap](../../plugins/seo/sitemap.md) or not.

Object value is supported as plugin options.

@`tab` type=`MarkdownTabPluginOptions | boolean` default=`true`

Enable [@vuepress/plugin-markdown-tab](../../plugins/markdown/markdown-tab.md) or not.

See also: [Code Tabs](./markdown.md#code-tabs) and [Tabs](./markdown.md#tabs)

::::
