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

  是否启用 [@vuepress/plugin-active-header-links](../../plugins/active-header-links.md) 。

### themePlugins.backToTop

- 类型： `boolean`

- 默认值： `true`

- 详情：

  是否启用 [@vuepress/plugin-back-to-top](../../plugins/back-to-top.md) 。

## themePlugins.container

- 类型： `Record<ContainerType, boolean>`

- 详情：

  是否启用由 [@vuepress/plugin-container](../../plugins/container.md) 支持的自定义容器。

  `ContainerType` 类型为：

  - `tip`
  - `warning`
  - `danger`
  - `details`
  - `codeGroup`
  - `codeGroupItem`

- 参考：
  - [默认主题 > Markdown > 自定义容器](./markdown.md#自定义容器)

## themePlugins.copyCode

- 类型： `boolean`

- 默认值： `true`

- 详情：

  是否启用 [@vuepress/plugin-copy-code](../../plugins/copy-code.md) 。

## themePlugins.externalLinkIcon

- 类型： `boolean`

- 默认值： `true`

- 详情：

  是否启用 [@vuepress/plugin-external-link-icon](../../plugins/external-link-icon.md) 。

## themePlugins.git

- 类型： `boolean`

- 默认值： `true`

- 详情：

  是否启用 [@vuepress/plugin-git](../../plugins/git.md) 。

## themePlugins.mediumZoom

- 类型： `boolean`

- 默认值： `true`

- 详情：

  是否启用 [@vuepress/plugin-medium-zoom](../../plugins/medium-zoom.md) 。

## themePlugins.nprogress

- 类型： `boolean`

- 默认值： `true`

- 详情：

  是否启用 [@vuepress/plugin-nprogress](../../plugins/nprogress.md) 。

## themePlugins.seo

- 类型： `boolean`

- 默认值： `true`

- 详情：

  是否启用 [@vuepress/plugin-seo](../../plugins/seo/README.md) 。

## themePlugins.sitemap

- 类型： `boolean`

- 默认值： `true`

- 详情：

  是否启用 [@vuepress/plugin-sitemap](../../plugins/sitemap/README.md) 。
