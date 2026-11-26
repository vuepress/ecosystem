---
icon: globe
---

# 语言配置 {#locale-config}

站点可以通过主题的 `locales` 配置项进行翻译。每个语言都带有自己的主题配置项，因此一种语言的导航栏、侧边栏、标签和文案会放在一起配置。

VuePress 本身也有[站点级 `locales`](https://vuepress.vuejs.org/zh/guide/i18n.html) 配置项，用于声明站点的语言并决定路由所属的语言。主题的语言配置只携带一种语言的主题配置项，因此请在两处声明相同的语言路径。

<NpmBadge package="@vuepress/theme-default" />

```ts
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  lang: 'en-US',
  theme: defaultTheme({
    locales: {
      '/': {
        label: 'English',
        lang: 'en-US',
        navbar: [{ text: 'Guide', link: '/guide/' }],
        sidebar: ['/guide/'],
        editLink: {
          pattern: 'https://github.com/example/repo/edit/main/:path',
        },
      },
      '/zh/': {
        label: '简体中文',
        lang: 'zh-CN',
        navbar: [{ text: '指南', link: '/zh/guide/' }],
        sidebar: ['/zh/guide/'],
        editLink: {
          pattern: 'https://github.com/example/repo/edit/main/:path',
          text: '在 GitHub 上编辑此页',
        },
        contributorsText: '贡献者',
        lastUpdated: { text: '上次更新' },
        docFooter: { prev: '上一页', next: '下一页' },
        tip: '提示',
        warning: '注意',
        danger: '警告',
        important: '重要',
        note: '笔记',
        notFound: {
          title: '页面不存在',
          quote: '看起来我们进入了错误的链接',
          linkText: '返回首页',
        },
      },
    },
  }),
})
```

语言配置中的 `lang` 供文档使用，而 `label` 是语言菜单显示的内容。

## 语言配置 {#locale-options}

::: fields
@`locales` type=`LocaleConfig<ThemeConfig>`

每种语言的主题配置项，以语言路径为键。每个值接受下文中语言配置的字段，以及任意其他[主题配置项](./config.md)，后者会为该语言的页面覆盖站点配置中的同名配置项。

@@`locales.<localePath>.label` type=string

语言菜单中显示的语言名称，使用该语言自身的写法。它会回退到语言路径。

@@`locales.<localePath>.lang` type=string

语言的 BCP 47 标签，例如 `'en-US'` 或 `'zh-CN'`。它会回退到站点的语言。

@@`locales.<localePath>.dir` type=`'ltr' | 'rtl' | 'auto'` default=`'ltr'`

语言的文字方向。它会被应用到语言菜单中的备选语言链接。页面本身的方向由 `@vuepress/plugin-rtl` 设置。

@@`locales.<localePath>.link` type=string

语言的链接。它默认为语言路径。当该语言所在的 URL 不是由语言键推导而来时，请设置它。
:::

键是语言的路径前缀。`/` 和 `/zh/` 都会被规范化为带尾部斜杠的形式，因此 `zh` 和 `/zh/` 是同一个语言。

::: tip
语言会继承根语言（即直接在主题上配置的那个语言）的所有配置项，并且只覆盖它自己设置的配置项。值为对象或数组的配置项会被整体替换，而不是合并。
:::

## 内置文案 {#built-in-texts}

主题渲染的文案都可以翻译，无需修改主题。它们是主题配置项，因此可以按语言在 [`locales`](#locale-options) 中设置，也可以为整个站点设置一次。

### 文档页面 {#document-page}

::: fields
@`editLink.text` type=string default=`'Edit this page'`

文档页脚中编辑链接的文本。

@`lastUpdated.text` type=string default=`'Last updated'`

最后更新时间之前的标签。时间格式本身由 `lastUpdated.formatOptions` 配置。

@`contributorsText` type=string default=`'Contributors'`

文档页脚中贡献者之前的标签。

@`docFooter.prev` type=`string | boolean` default=`'Previous page'`

上一篇页面链接上方的标签。将其设为 `false` 可隐藏上一篇链接。

@`docFooter.next` type=`string | boolean` default=`'Next page'`

下一篇页面链接上方的标签。将其设为 `false` 可隐藏下一篇链接。

@`outline.label` type=string default=`'On this page'`

大纲的标题。它在 [`outline`](./config.md#page) 配置项上设置：

```ts
defaultTheme({
  outline: { level: [2, 3], label: 'On this page' },
})
```
:::

### 提示容器 {#hint-containers}

提示容器的标题是主题配置项，主题会把它们转发给 `@vuepress/plugin-markdown-hint`：

| 容器            | 配置项      | 默认值        |
| --------------- | ----------- | ------------- |
| `::: tip`       | `tip`       | `'TIP'`       |
| `::: warning`   | `warning`   | `'WARNING'`   |
| `::: danger`    | `danger`    | `'DANGER'`    |
| `::: important` | `important` | `'IMPORTANT'` |
| `::: note`      | `note`      | `'NOTE'`      |

`::: danger` 容器渲染的是 caution 样式，因此 `danger` 也会设置 `::: caution` 的标题。`::: info` 和 `::: details` 的标题来自插件的语言配置。

### 未找到页面 {#not-found-page}

::: fields
@`notFound.title` type=string default=`'PAGE NOT FOUND'`

未找到页面的标题。

@`notFound.quote` type=string

未找到页面的引文。默认是一句关于方向的引文。

@`notFound.code` type=string default=`'404'`

显示在标题上方的错误码。

@`notFound.link` type=string

按钮的链接。它默认为当前语言的主页。

@`notFound.linkText` type=string default=`'Take me home'`

按钮的文本。

@`notFound.linkLabel` type=string default=`'go to home'`

按钮的无障碍标签。
:::

### 无障碍标签 {#accessibility-labels}

这些标签会被屏幕阅读器朗读，或作为纯图标控件的标题显示：

::: fields
@`darkModeSwitchLabel` type=string default=`'Appearance'`

移动端菜单中外观切换按钮的标签。

@`lightModeSwitchTitle` type=string default=`'Switch to light theme'`

暗色模式激活时外观切换按钮的标题。

@`darkModeSwitchTitle` type=string default=`'Switch to dark theme'`

亮色模式激活时外观切换按钮的标题。

@`sidebarMenuLabel` type=string default=`'Menu'`

本地导航中侧边栏切换按钮的标签。

@`returnToTopLabel` type=string default=`'Return to top'`

本地导航的大纲下拉菜单中“返回顶部”条目的标签。

@`langMenuLabel` type=string default=`'Change language'`

语言菜单的标签。

@`navMenuLabel` type=string default=`'Main Navigation'`

导航菜单的标签。

@`mobileMenuLabel` type=string default=`'Menu'`

移动端菜单切换按钮的标签。

@`extraMenuLabel` type=string default=`'More options'`

导航栏溢出菜单的标签。

@`skipToContentLabel` type=string default=`'Skip to content'`

跳到内容链接的文本。
:::

## 语言菜单 {#language-menu}

语言菜单由 [`locales`](#locale-options) 推导而来：它会列出主题数据中的每个语言（`label` 会回退到语言路径），链接到该语言下的同一页面（如果该页面存在），并且只有一个语言时隐藏。当前语言的标签会显示在桌面端导航栏中，完整列表会显示在移动端菜单中。

语言配置中的 `label`、`lang` 和 `dir` 会被该菜单使用。语言数据的其余部分由该语言的页面使用。
