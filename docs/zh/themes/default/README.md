---
icon: palette
---

# theme-default

<NpmBadge package="@vuepress/theme-default" />

VuePress 的默认主题。它是一个从 [VitePress](https://vitepress.dev) 默认主题移植而来的「薄布局层」：主题只提供布局与样式（导航栏、侧边栏、文档大纲、首页、页脚与暗色模式），其余功能都交给生态中已有的插件。

::: tip 原默认主题
原默认主题已改名为 [`@vuepress/theme-classic`](../classic/)。
:::

## 使用

安装主题：

```bash
npm i -D @vuepress/theme-default@next
```

在配置中使用：

```ts title=".vuepress/config.ts"
import { themeDefault } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  theme: themeDefault({
    // 站点标题、Logo、导航、侧边栏等
  }),
})
```

## 页面类型

主题只注册 `Layout` 一个布局（以及 VuePress 内置的 `NotFound` 404 页面），并读取 frontmatter 的 `type` 决定在布局里渲染什么：

| `type`    | 渲染内容                                     |
| --------- | -------------------------------------------- |
| `home`    | 首页：Hero、特性网格与首页正文               |
| `doc`     | 文档页（默认）：正文、大纲、页脚、上下篇导航 |
| `page`    | 空白页面容器，不带文档页的辅助元素           |
| `content` | 只渲染页面内容，不渲染布局外壳               |

自定义布局仍然照常使用：注册布局后，在 frontmatter 中设置 `layout: MyLayout`。

## 配置

```ts title=".vuepress/config.ts"
import { themeDefault } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  theme: themeDefault({
    siteTitle: '我的文档',
    logo: '/logo.svg',
    nav: [
      { text: '指南', link: '/guide/' },
      {
        text: '插件',
        items: [{ text: 'Shiki', link: '/plugins/shiki/' }],
      },
    ],
    sidebar: {
      '/guide/': [{ text: '快速上手', link: '/guide/getting-started.md' }],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuepress/ecosystem' },
    ],
    appearance: true,
    outline: { level: [2, 3] },
  }),
})
```

主题选项由主题自己的 `ThemeConfig` 类型定义，只包含主题实际支持的字段。各项功能见 [功能一览](./features.md)，从原默认主题迁移见 [与 `@vuepress/theme-classic` 的对应关系](./classic.md)。

## 接线的插件

主题会启用一组生态插件，每一项都可以通过 `themePlugins` 选项配置或关闭：

| 插件                                   | 默认                                   |
| -------------------------------------- | -------------------------------------- |
| `@vuepress/plugin-theme-data`          | 启用                                   |
| `@vuepress/plugin-copy-code`           | 启用                                   |
| `@vuepress/plugin-git`                 | 启用（最后更新时间、贡献者）           |
| `@vuepress/plugin-shiki`               | 启用（`github-light` / `github-dark`） |
| `@vuepress/plugin-nprogress`           | 启用                                   |
| `@vuepress/plugin-medium-zoom`         | 启用                                   |
| `@vuepress/plugin-icon`                | 启用（`assets: 'iconify'`）            |
| `@vuepress/plugin-active-header-links` | 启用                                   |
| `@vuepress/plugin-back-to-top`         | 启用                                   |
| `@vuepress/plugin-links-check`         | 启用                                   |
| `@vuepress/plugin-seo`                 | 配置 `hostname` 后启用                 |
| `@vuepress/plugin-sitemap`             | 配置 `hostname` 后启用                 |
| `@vuepress/plugin-markdown-hint`       | 启用                                   |
| `@vuepress/plugin-markdown-tab`        | 启用（代码组）                         |
| `@vuepress/plugin-markdown-ext`        | 启用（`v-pre`）                        |
| `@vuepress/plugin-markdown-raw`        | 启用（`raw`，样式隔离）                |

搜索不打包在主题内：安装任意一个搜索插件，导航栏会自动挂载它的搜索框。

主题注册了 `userStyle: '.vuepress/styles/index.css'`，自定义样式（包括 CSS 自定义属性）可以直接写在该文件里，替代 classic 的 Sass 调色板。

## API

- Node 入口：`themeDefault(options)`，以及 `ThemeOptions`、`ThemeConfig`、`ThemeLayout`、`ThemePageData`、`ThemePluginsOptions` 类型。
- 客户端入口（`@vuepress/theme-default/client`）：默认导出的 `Layout`、`VP*` 组件、`useLayout()`、`usePageType()`、页面数据组合函数（`useThemePageData()`、`useThemePageFrontmatter()`、`usePageRelativePath()`、`usePageLastUpdated()`、`usePageIsNotFound()`）、`useThemeLocalePath()`、`useThemeLocales()`、`useDarkMode()` 及其辅助函数。

## 相关文档

- [功能一览](./features.md)
- [与 VitePress 的差异](./differences.md)
- [与 `@vuepress/theme-classic` 的对应关系](./classic.md)
