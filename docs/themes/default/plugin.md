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

  Enable [@vuepress/plugin-active-header-links](../../plugins/active-header-links.md) or not.

## themePlugins.backToTop

- Type: `BackToTopPluginOptions | boolean`

- Default: `true`

- Details:

  Enable [@vuepress/plugin-back-to-top](../../plugins/back-to-top.md) or not.

  Object value is supported as plugin options.

## themePlugins.container

- Type: `Record<ContainerType, boolean>`

- Details:

  Enable custom containers that powered by [@vuepress/plugin-markdown-container](../../plugins/markdown-container.md) or not.

  `ContainerType` type is:

  - `tip`
  - `warning`
  - `danger`
  - `details`
  - `codeGroup`
  - `codeGroupItem`

- Also see:
  - [Default Theme > Markdown > Custom Containers](./markdown.md#custom-containers)

## themePlugins.copyCode

- Type: `CopyCodePluginOptions | boolean`

- Default: `true`

- Details:

  Enable [@vuepress/plugin-copy-code](../../plugins/copy-code.md) or not.

  Object value is supported as plugin options.

## themePlugins.git

- Type: `boolean`

- Default: `true`

- Details:

  Enable [@vuepress/plugin-git](../../plugins/git.md) or not.

## themePlugins.linksCheck

- Type: `LinksCheckPluginOptions | boolean`

- Default: `true`

- Details:

  Enable [@vuepress/plugin-links-check](../../plugins/links-check.md) or not.

## themePlugins.mediumZoom

- Type: `boolean`

- Default: `true`

- Details:

  Enable [@vuepress/plugin-medium-zoom](../../plugins/medium-zoom.md) or not.

## themePlugins.nprogress

- Type: `boolean`

- Default: `true`

- Details:

  Enable [@vuepress/plugin-nprogress](../../plugins/nprogress.md) or not.

## themePlugins.prismjs

- Type: `boolean`

- Default: `true`

- Details:

  Enable [@vuepress/plugin-prismjs](../../plugins/prismjs.md) or not.

## themePlugins.seo

- Type: `SeoPluginOptions | boolean`

- Default: `true`

- Details:

  Enable [@vuepress/plugin-seo](../../plugins/seo/README.md) or not.

  Object value is supported as plugin options.

## themePlugins.sitemap

- Type: `SitemapPluginOptions | boolean`

- Default: `true`

- Details:

  Enable [@vuepress/plugin-sitemap](../../plugins/sitemap/README.md) or not.

  Object value is supported as plugin options.
