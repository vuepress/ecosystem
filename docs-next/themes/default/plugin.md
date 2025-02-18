# Plugins Config

You can configure the plugins that used by default theme with `themePlugins`.

Default theme is using some plugins by default. You can disable a plugin if you really do not want to use it. Make sure you understand what the plugin is for before disabling it.

```ts
import { defaultTheme } from '@vuepress/theme-default'

export default {
  theme: defaultTheme({
    themePlugins: {
      // customize theme plugins here
    },
  }),
}
```

## themePlugins.activeHeaderLinks

- Type: `boolean`

- Default: `true`

- Details:

  Enable [@vuepress/plugin-active-header-links](../../plugins/development/active-header-links.md) or not.

## themePlugins.copyCode

- Type: `CopyCodePluginOptions | boolean`

- Default: `true`

- Details:

  Enable [@vuepress/plugin-copy-code](../../plugins/features/copy-code.md) or not.

  Object value is supported as plugin options.

## themePlugins.git

- Type: `boolean`

- Default: `true`

- Details:

  Enable [@vuepress/plugin-git](../../plugins/development/git.md) or not.

## themePlugins.hint

- Type: `MarkdownHintPluginOptions | boolean`

- Default: `{ alert: true, hint: true }`

- Details:

  Enable [@vuepress/plugin-markdown-hint](../../plugins/markdown/markdown-hint.md) or not.

## themePlugins.tab

- Type: `MarkdownTabPluginOptions | boolean`

- Default: `{ codeTabs: true, tabs: true }`

- Details:

  Enable [@vuepress/plugin-markdown-tab](../../plugins/markdown/markdown-tab.md) or not.

## themePlugins.linksCheck

- Type: `LinksCheckPluginOptions | boolean`

- Default: `true`

- Details:

  Enable [@vuepress/plugin-links-check](../../plugins/markdown/links-check.md) or not.

## themePlugins.photoSwipe

- Type: `boolean`

- Default: `true`

- Details:

  Enable [@vuepress/plugin-photo-swipe](../../plugins/features/photo-swipe.md) or not.

## themePlugins.nprogress

- Type: `boolean`

- Default: `true`

- Details:

  Enable [@vuepress/plugin-nprogress](../../plugins/features/nprogress.md) or not.

## themePlugins.shiki

- Type: `boolean | ShikiPluginOptions`

- Default: `true`

- Details:

  Enable [@vuepress/plugin-shiki](../../plugins/markdown/shiki.md) or not.

## themePlugins.seo

- Type: `SeoPluginOptions | boolean`

- Default: `true`

- Details:

  Enable [@vuepress/plugin-seo](../../plugins/seo/seo/README.md) or not.

  Object value is supported as plugin options.

## themePlugins.sitemap

- Type: `SitemapPluginOptions | boolean`

- Default: `true`

- Details:

  Enable [@vuepress/plugin-sitemap](../../plugins/seo/sitemap/README.md) or not.

  Object value is supported as plugin options.
