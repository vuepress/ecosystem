---
icon: palette
---

# theme-default

<NpmBadge package="@vuepress/theme-default" />

VuePress 的默认主题。它是从 [VitePress](https://vitepress.dev) 默认主题移植而来的薄布局层：主题只提供布局和样式（导航栏、侧边栏、文档大纲、首页、页脚和暗色模式），其余功能全部交给生态插件实现。

## 旧版默认主题 {#the-former-default-theme}

过去以 `@vuepress/theme-default` 发布的主题现在是 [`@vuepress/theme-classic`](../classic/)。新的默认主题刻意让布局和 CSS 变量名贴近 VitePress 而不是经典主题，因此两个主题不能互相直接替换 —— 迁移站点时请参考 [从经典主题迁移](./migrating-from-classic.md)。

## 使用方法 {#usage}

安装主题：

```bash
npm i -D @vuepress/theme-default@next
```

在配置中使用它：

```ts title=".vuepress/config.ts"
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  theme: defaultTheme({
    siteTitle: 'My Site',
    logo: '/logo.svg',
    nav: [{ text: 'Guide', link: '/guide/' }],
    sidebar: 'heading',
    appearance: true,
  }),
})
```

`defaultTheme()` 的每个配置项都在 [配置](./config.md) 中说明。主题还接受一个 `hostname` 配置项，它不属于主题配置本身，而是 SEO 和 sitemap 插件所必需的：

```ts
export default defineUserConfig({
  theme: defaultTheme({
    hostname: 'https://example.com',
  }),
})
```

## 页面类型 {#page-types}

主题只注册一个 `Layout`（另外为 404 页面注册 `NotFound`），并根据页面 frontmatter 的 `type` 字段决定在其中渲染什么。默认类型是 `doc`。

| `type`              | 渲染内容                                                         |
| ------------------- | ---------------------------------------------------------------- |
| `home`              | `VPHome`：Hero、特性卡片，以及它们下方的页面内容                 |
| `doc`（默认）       | `VPDoc`：带有大纲侧边栏、最后更新时间以及上一篇/下一篇页脚的正文 |
| `page`              | `VPPage`：仅 Markdown 内容，没有文档侧边栏和页脚                 |
| `content`           | 仅原始 Markdown 内容，没有任何布局外壳                           |
| 任意自定义 `layout` | 客户端配置中注册的同名布局                                       |

每种页面类型接受哪些字段见 [Frontmatter](./frontmatter.md)，自定义布局见 [继承](./extending.md)。

## 各项配置的位置 {#where-things-are-configured}

| 关注点                                        | 通过什么配置            | 页面                                          |
| --------------------------------------------- | ----------------------- | --------------------------------------------- |
| 导航栏、侧边栏、大纲、编辑链接、页脚、主题 UI | `defaultTheme()` 配置项 | [配置](./config.md)                           |
| 页面类型、首页 Hero 与特性、单页 UI           | 页面 frontmatter        | [Frontmatter](./frontmatter.md)               |
| 内置插件及其开关                              | `themePlugins`          | [插件](./plugin.md)                           |
| UI 文案和按语言区分的配置项                   | `locales`               | [语言](./locale.md)                           |
| 导出的组件、团队与赞助章节                    | 客户端 API              | [内置组件](./components.md)                   |
| Markdown 语法                                 | 内置插件                | [Markdown](./markdown.md)                     |
| CSS 变量、用户样式                            | 普通 CSS                | [样式](./styles.md)                           |
| 自定义布局和布局插槽                          | `.vuepress/client.ts`   | [继承](./extending.md)                        |
| 从经典主题迁移                                | —                       | [从经典主题迁移](./migrating-from-classic.md) |

## 内置插件 {#wired-plugins}

主题会自动接入以下插件。每个插件都可以通过 `themePlugins` 设为 `false` 禁用，或传入配置对象进行配置；见 [插件](./plugin.md)。

| 插件                                   | `themePlugins` 键   | 默认值                             |
| -------------------------------------- | ------------------- | ---------------------------------- |
| `@vuepress/plugin-theme-data`          | —                   | 始终启用                           |
| `@vuepress/plugin-copy-code`           | `copyCode`          | 启用                               |
| `@vuepress/plugin-git`                 | `git`               | 启用                               |
| `@vuepress/plugin-shiki`               | `shiki`             | 启用，`github-light`/`github-dark` |
| `@vuepress/plugin-markdown-hint`       | `markdownHint`      | 启用，`hint` 和 `alert`            |
| `@vuepress/plugin-markdown-tab`        | `markdownTab`       | 启用，`codeTabs`                   |
| `@vuepress/plugin-markdown-ext`        | `markdownExt`       | 启用，`vPre`                       |
| `@vuepress/plugin-markdown-raw`        | `markdownRaw`       | 启用，样式隔离开启                 |
| `@vuepress/plugin-active-header-links` | `activeHeaderLinks` | 启用                               |
| `@vuepress/plugin-icon`                | `icon`              | 启用，`assets: 'iconify'`          |
| `@vuepress/plugin-medium-zoom`         | `mediumZoom`        | 启用                               |
| `@vuepress/plugin-nprogress`           | `nprogress`         | 启用                               |
| `@vuepress/plugin-back-to-top`         | `backToTop`         | 启用                               |
| `@vuepress/plugin-links-check`         | `linksCheck`        | 启用                               |
| `@vuepress/plugin-seo`                 | `seo`               | 仅在设置了 `hostname` 时启用       |
| `@vuepress/plugin-sitemap`             | `sitemap`           | 仅在设置了 `hostname` 时启用       |

::: tip 搜索并未内置
主题无法为站点选择搜索后端，因此搜索不属于主题的一部分。请安装 `@vuepress/plugin-slimsearch`（本地搜索）或 `@vuepress/plugin-docsearch`（Algolia），并在 `plugins` 中注册；导航栏会自动渲染全局注册的 `SearchBox` 组件。
:::

## 客户端 API {#client-api}

Node 入口（`@vuepress/theme-default`）导出 `defaultTheme` 以及描述主题的类型：`ThemeOptions`、`ThemeConfig`、`ThemeLayout`、`ThemePageData`、`ThemePluginsOptions`、`ThemeContributor`、`AppearanceOptions`，还有 `DefaultTheme` 命名空间（导航项、侧边栏项、Hero 与特性配置项、页脚、团队成员等）。

客户端入口（`@vuepress/theme-default/client`）导出内置组件和组合式函数。导入它还会加载主题样式和 Inter 网络字体。

组件：`VPBadge`、`VPButton`、`VPDocAsideSponsors`、`VPDocFooterContributors`、`VPFeatures`、`VPHomeContent`、`VPHomeFeatures`、`VPHomeHero`、`VPHomeSponsors`、`VPImage`、`VPLink`、`VPNavBarSearch`、`VPSocialLink`、`VPSocialLinks`、`VPSponsors`、`VPTeamMembers`、`VPTeamPage`、`VPTeamPageSection`、`VPTeamPageTitle`、`VPThemeIcon`。

组合式函数与辅助工具：`useContributors`、`useLayout`、`usePageIsNotFound`、`usePageLastUpdated`、`usePageRelativePath`、`usePageType`、`useThemeData`、`useThemeLocaleData`、`useThemePageData`、`useThemePageFrontmatter`、`useThemeLocalePath`、`useThemeLocales`、`useRuntimeBase`、`useDarkMode`、`createDarkModeRef`、`themeDarkModeSymbol`、`COLOR_MODE_STORAGE_KEY`。

组件属性见 [内置组件](./components.md)，`useLayout` 返回的布局状态见 [继承](./extending.md)。

## 下一步 {#next}

- [配置](./config.md) —— 所有主题配置项。
- [Frontmatter](./frontmatter.md) —— 页面类型和首页。
- [插件](./plugin.md) —— 内置插件及其开关。
- [Markdown](./markdown.md) —— 主题启用的 Markdown 扩展。
- [样式](./styles.md) —— CSS 变量和用户样式。
- [语言](./locale.md) —— 多语言站点。
- [继承](./extending.md) —— 自定义布局和插槽。
- [从经典主题迁移](./migrating-from-classic.md) —— 把站点从 `@vuepress/theme-classic` 迁移过来。
- [与 VitePress 的差异](./differences.md) —— 本主题与 VitePress 的不同之处。
