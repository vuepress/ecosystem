---
icon: plug
---

# 插件配置 {#plugins-config}

主题是布局层：导航栏、侧边栏、文档页面、首页和未找到页面由主题提供，而布局之外的所有功能都由插件提供。主题会以合理的默认值替你接入这些插件，因此典型站点从不需要自己安装或配置它们。

主题数据插件始终启用且不可配置，因为整个主题配置都通过它传给客户端。其他每个插件都可以在 [`themePlugins`](./config.md#theme-plugins) 中开关。

## 内置插件 {#wired-plugins}

| 插件                                   | `themePlugins` 键   | 默认值 | 说明                                                       |
| -------------------------------------- | ------------------- | ------ | ---------------------------------------------------------- |
| `@vuepress/plugin-theme-data`          | —                   | 启用   | 始终启用。                                                 |
| `@vuepress/plugin-copy-code`           | `copyCode`          | `true` | 作用范围限定为页面内容中的代码块。                         |
| `@vuepress/plugin-git`                 | `git`               | `true` | 收集最后更新时间和贡献者。                                 |
| `@vuepress/plugin-shiki`               | `shiki`             | `true` | `github-light` 和 `github-dark` 主题。                     |
| `@vuepress/plugin-markdown-ext`        | `markdownExt`       | `true` | `v-pre` 容器。                                             |
| `@vuepress/plugin-markdown-raw`        | `markdownRaw`       | `true` | `raw` 容器，带样式隔离。                                   |
| `@vuepress/plugin-markdown-hint`       | `markdownHint`      | `true` | 提示容器和 GFM 警告。                                      |
| `@vuepress/plugin-markdown-tab`        | `markdownTab`       | `true` | 代码标签页。其他标签页分组需要手动开启。                   |
| `@vuepress/plugin-active-header-links` | `activeHeaderLinks` | `true` | 让 URL 哈希与大纲保持同步。                                |
| `@vuepress/plugin-back-to-top`         | `backToTop`         | `true` | 返回顶部按钮。                                             |
| `@vuepress/plugin-links-check`         | `linksCheck`        | `true` | 死链检测，使用插件默认配置。                               |
| `@vuepress/plugin-icon`                | `icon`              | `true` | 运行时加载的 Iconify 资源。                                |
| `@vuepress/plugin-medium-zoom`         | `mediumZoom`        | `true` | 文档图片的图片缩放。                                       |
| `@vuepress/plugin-nprogress`           | `nprogress`         | `true` | 导航时的进度条。                                           |
| `@vuepress/plugin-seo`                 | `seo`               | `true` | 仅在设置了 [`hostname`](./config.md#basic-config) 时接入。 |
| `@vuepress/plugin-sitemap`             | `sitemap`           | `true` | 仅在设置了 [`hostname`](./config.md#basic-config) 时接入。 |

搜索并未内置。导航栏会渲染一个 `SearchBox` 占位符，由搜索插件填充：[SlimSearch](../../plugins/search/slimsearch.md) 提供本地索引，[DocSearch](../../plugins/search/docsearch.md) 提供 Algolia 搜索。见 [搜索](#search)。

## 配置插件 {#configuring-plugins}

`themePlugins` 的条目接受：

- `true`（或不写）—— 主题用自己的默认值启用该插件。
- `false` —— 完全不接入该插件，因此它的功能和客户端资源都不会加载。
- 一个对象 —— 启用该插件，该对象会合并到主题传入的默认值之上。

```ts
import { themeDefault } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  theme: themeDefault({
    themePlugins: {
      copyCode: { showInMobile: true },
      mediumZoom: { selector: '.vp-doc img' },
      icon: false,
    },
  }),
})
```

有些插件是由主题配置项本身启用的，而不是由 `themePlugins` 条目启用的：

- `git` 会从 [`lastUpdated`](./config.md#page) 和 [`contributors`](./config.md#page) 接收 `updatedTime` 和 `contributors`。当所有语言都禁用贡献者时，git 插件不会收集它们。
- `markdownHint` 会从 `tip`、`warning`、`danger`、`important` 和 `note` 接收[提示容器标签](./locale.md#hint-containers)。
- `seo` 和 `sitemap` 需要 [`hostname`](./config.md#basic-config)。
- `shiki`、`activeHeaderLinks` 和 `copyCode` 会把功能限定到主题渲染的类上，因此覆盖这些配置项可能破坏它们依赖的集成。

::: tip
禁用插件不会移除主题为它渲染的标记。例如 `icon: false` 只是表示不解析图标，因此图标名称会以文本形式保留。
:::

## themePlugins {#themeplugins}

:::: fields
@`themePlugins.copyCode` type=`CopyCodePluginOptions | boolean` default=`true`

接入[复制代码](../../plugins/features/copy-code.md)。主题通过 `selector: '[vp-content] div[class*="language-"] pre'` 把它限定到页面内容中的代码块。

对象会合并到该选择器之上，因此它只配置行为：

```ts
themePlugins: {
  copyCode: {
    // copy the inline code on double click
    inline: true,
    // show the hint for 3000ms
    duration: 3000,
    showInMobile: true,
  },
}
```

@`themePlugins.git` type=`GitPluginOptions | boolean` default=`true`

接入 [Git](../../plugins/development/git.md)。主题会禁用创建时间和变更日志，并根据主题配置项启用更新时间和贡献者。

对象配置其余部分：

```ts
themePlugins: {
  git: {
    // show the avatar of the contributors
    contributors: { avatar: true },
    // collect the changelog, which the theme does not render by default
    changelog: { repoUrl: 'https://github.com/vuepress/ecosystem' },
  },
}
```

@`themePlugins.shiki` type=`ShikiPluginOptions | boolean` default=`true`

接入 [Shiki](../../plugins/markdown/shiki.md)，使用 `github-light` 和 `github-dark` 主题，主题 CSS 会同时把它们作为亮色和暗色主题使用。

传入 `themes` 对象可以替换它们：

```ts
themePlugins: {
  shiki: {
    themes: { light: 'vitesse-light', dark: 'vitesse-dark' },
  },
}
```

`themePlugins.shiki: false` 会让代码块不带高亮。如果改用 Prism，可以配合 [`@vuepress/plugin-prismjs`](../../plugins/markdown/prismjs.md)。

@`themePlugins.markdownExt` type=`MarkdownExtPluginOptions | boolean` default=`true`

接入 [Markdown Ext](../../plugins/markdown/markdown-ext.md)，但只启用 `v-pre` 容器，即 `{ vPre: true }`。

该插件的其他 Markdown 扩展需要手动开启。`gfm: true` 会启用 GFM 支持 —— 脚注、任务列表、软换行和自动链接的 URL：

```ts
themePlugins: {
  markdownExt: { gfm: true },
}
```

@`themePlugins.markdownRaw` type=`MarkdownRawPluginOptions | boolean` default=`true`

接入 [Markdown Raw](../../plugins/markdown/markdown-raw.md)，并设置 `isolateStyles: true`，从而让主题样式与原始内容隔离。

@`themePlugins.markdownHint` type=`MarkdownHintPluginOptions | boolean` default=`true`

接入 [Markdown Hint](../../plugins/markdown/markdown-hint.md)，设置 `hint: true` 和 `alert: true`，并传入主题配置项中的本地化标签。

```ts
themePlugins: {
  // disable the GFM alerts, keep the containers
  markdownHint: { alert: false },
}
```

@`themePlugins.markdownTab` type=`MarkdownTabPluginOptions | boolean` default=`true`

接入 [Markdown Tab](../../plugins/markdown/markdown-tab.md)，并设置 `codeTabs: true`。代码标签页开箱即用；通用的 `::: tabs` 分组需要手动开启：

```ts
themePlugins: {
  markdownTab: { tabs: true },
}
```

@`themePlugins.activeHeaderLinks` type=boolean default=`true`

接入 [Active Header Links](../../plugins/development/active-header-links.md)，并设置 `headerLinkSelector: '.outline-link'`，从而在滚动时让 URL 哈希跟随大纲。只接受布尔值：选择器由主题固定，因为它与大纲的标记绑定。

@`themePlugins.backToTop` type=`BackToTopPluginOptions | boolean` default=`true`

接入 [返回顶部](../../plugins/features/back-to-top.md)。按钮的标签来自插件的语言配置。

```ts
themePlugins: {
  // show the button after 200px of scrolling, with a progress bar
  backToTop: { threshold: 200, progress: true },
}
```

@`themePlugins.linksCheck` type=`LinksCheckPluginOptions | boolean` default=`true`

接入[链接检查](../../plugins/markdown/links-check.md)，使用插件默认配置。对象就是插件配置项：

```ts
themePlugins: {
  linksCheck: {
    // do not check the anchor links in development
    dev: false,
    // fail the build on a dead link
    build: 'error',
  },
}
```

@`themePlugins.icon` type=`IconPluginOptions | boolean` default=`true`

接入[图标](../../plugins/features/icon.md)，并设置 `assets: 'iconify'`，即在运行时从 iconify CDN 解析 iconify Web Component，导航栏、侧边栏和特性图标都使用它。

```ts
themePlugins: {
  icon: {
    // bundle the icon sets instead of loading them from the CDN
    offline: true,
    // resolve `icon: 'mdi:github'` as `icon: 'github'`
    prefix: 'mdi:',
  },
}
```

@`themePlugins.mediumZoom` type=`MediumZoomPluginOptions | boolean` default=`true`

接入 [Medium Zoom](../../plugins/features/medium-zoom.md)。

```ts
themePlugins: {
  mediumZoom: { selector: '.vp-doc img' },
}
```

@`themePlugins.nprogress` type=boolean default=`true`

接入 [NProgress](../../plugins/features/nprogress.md)，即导航时显示的进度条。该插件不接受配置项，因此只接受布尔值。进度条的样式由主题 CSS 提供。

@`themePlugins.seo` type=`Partial<SeoPluginOptions> | boolean` default=`true`

在配置了 [`hostname`](./config.md#basic-config) 时接入 [SEO](../../plugins/seo/seo.md)。hostname 由主题传入，对象补充其余配置：

```ts
themeDefault({
  hostname: 'https://example.com',
  themePlugins: {
    seo: {
      author: { name: 'VuePress' },
      autoDescription: true,
    },
  },
})
```

@`themePlugins.sitemap` type=`Partial<SitemapPluginOptions> | boolean` default=`true`

在配置了 [`hostname`](./config.md#basic-config) 时接入 [Sitemap](../../plugins/seo/sitemap.md)。

```ts
themeDefault({
  hostname: 'https://example.com',
  themePlugins: {
    sitemap: { changefreq: 'weekly', excludePaths: ['/404.html'] },
  },
})
```
::::

## 搜索 {#search}

主题不提供搜索实现。只要搜索插件注册了搜索框，导航栏就会渲染 `SearchBox` 占位符，而大纲、侧边栏和键盘快捷键仍由插件负责。

```ts
import { slimsearchPlugin } from '@vuepress/plugin-slimsearch'

export default defineUserConfig({
  theme: themeDefault({}),
  plugins: [slimsearchPlugin()],
})
```

可用的搜索插件有 [SlimSearch](../../plugins/search/slimsearch.md)、[DocSearch](../../plugins/search/docsearch.md)、[Orama](../../plugins/search/orama.md)、[MeiliSearch](../../plugins/search/meilisearch.md)、[FlexSearch](../../plugins/search/flexsearch.md) 以及旧版的 [Search](../../plugins/search/search.md)。
