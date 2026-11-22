---
icon: settings-2
---

# 配置 {#config}

所有配置项都传给 `.vuepress/config.ts` 中的 `themeDefault()`：

```ts title=".vuepress/config.ts"
import { themeDefault } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  theme: themeDefault({
    siteTitle: 'My Site',
    nav: [{ text: 'Guide', link: '/guide/' }],
    sidebar: 'heading',
  }),
})
```

下面每个配置项都是 `ThemeConfig` 接口的字段，只有 `hostname` 是 `themeDefault()` 的额外配置项。不支持的配置项 —— 包括仅 VitePress 支持的配置项 —— 会被 TypeScript 类型检查拒绝，而不会被静默忽略。

配置项由根主题配置和 [`locales`](#locale) 中对应的条目合并而来：只在 `locales['/zh/']` 中设置的配置项不会作用于其他语言。诸如 `hostname` 这类不应被翻译的站点级配置项，只在根配置中有意义。

## 基础配置 {#basic-config}

:::: fields
@`siteTitle` type=`string | false`

导航栏中显示在 Logo 旁边的站点标题。它默认取 VuePress 配置中的站点标题，可以包含 HTML。

将其设为 `false` 可隐藏文字，只显示 Logo。

@`logo` type=`DefaultTheme.ThemeableImage`

导航栏中显示的 Logo 图片。把文件上传到公共目录，然后传入它的 URL。它接受：

- 一个 URL 字符串：`'/logo.svg'`。
- 一个带额外图片属性的对象：`{ src: '/logo.svg', alt: 'My Site' }`。
- 一个随主题切换的对象：`{ light: '/logo-light.svg', dark: '/logo-dark.svg', alt: 'My Site' }` —— 实际使用的图标会跟随当前颜色模式。

@`logoLink` type=`string | { link?: string; rel?: string; target?: string }`

Logo 和站点标题的链接。它默认为当前语言的主页链接（根语言为 `/`，`/zh/` 语言为 `/zh/`，依此类推）。

@`hostname` type=string

站点部署的域名，例如 `'https://example.com'`。

它不属于主题配置：主题会把它传给 `@vuepress/plugin-seo` 和 `@vuepress/plugin-sitemap`，缺少 `hostname` 时这两个插件都不会启用。见 [插件](./plugin.md#themeplugins)。

@`appearance` type=`AppearanceOptions`

站点的颜色模式：是否可用暗色模式、优先使用哪种模式，以及用户能否切换。见 [外观](#appearance)。

@`dir` type=`'ltr' | 'rtl' | 'auto'` default=`'ltr'`

语言的文字方向。它会被带入语言菜单使用的语言数据中，成为备选语言链接的 `dir` 属性。

布局本身使用逻辑 CSS 属性编写，并根据 `<html>` 元素的 `dir` 属性切换方向，而主题不会设置该属性 —— 请使用 `@vuepress/plugin-rtl` 或你自己的客户端配置来设置。

@`footer` type=`DefaultTheme.Footer`

显示在每个页面底部的页脚。页面在 frontmatter 中设置 `footer: false` 时会隐藏它。

它的字段为：

@@`footer.message` type=string

页脚的消息行。允许使用 HTML。

@@`footer.copyright` type=string

页脚的版权行。允许使用 HTML。

@`notFound` type=`DefaultTheme.NotFoundOptions`

自定义 404 页面的文字。每个字段都会回退到内置的英文文案，因此站点只需设置自己想翻译的字段。

它的字段为：

@@`notFound.title` type=string default=`'PAGE NOT FOUND'`

页面的大标题。

@@`notFound.quote` type=string

标题下方的引文。默认是 VitePress 使用的《爱丽丝梦游仙境》引文。

@@`notFound.code` type=string default=`'404'`

显示在标题上方的错误码。

@@`notFound.link` type=string

返回主页链接的目标。它默认为当前语言的主页链接。

@@`notFound.linkText` type=string default=`'Take me home'`

主页链接的文本。

@@`notFound.linkLabel` type=string default=`'go to home'`

主页链接的 `aria-label`。

@`externalLinkIcon` type=boolean default=`false`

是否在 Markdown 内容中的外部链接后显示图标。该图标是 `.vp-doc` 内 `a[href*='://']` 和 `a[target='_blank']` 上的 CSS 伪元素，因此不会作为元素渲染，也不会影响链接文本。

给图片或链接添加 `no-icon` 类即可让它不显示图标。

@`gradedContainers` type=boolean

是否按分级严重程度为自定义容器着色。

默认情况下 `warning` 使用黄色，而 `caution` 和 `danger` 都使用红色。启用该配置项会把 `warning` 映射为橙色、把 `caution` 映射为黄色，于是 `warning`、`caution` 和 `danger` 形成橙色 → 黄色 → 红色的分级。

容器语法见 [Markdown 容器](./markdown.md#hint-containers)。
::::

## 导航栏 {#navbar}

:::: fields
@`nav` type=`DefaultTheme.NavItem[]`

导航栏项目。每个项目都是以下三种形态之一：

- 链接项目，在导航栏中渲染为链接。
- 子项目，渲染为包含链接项目和分组的下拉菜单。
- 组件项目，由 VuePress 应用中注册的组件渲染。

@`nav[*].text` type=string

链接项目或子项目的文本。子项目必须提供该字段。

链接项目可以省略：主题会回退到页面元数据的 `title`，所以一个导航条目只需要它的 `link`，文本和它指向的页面一致。

@`nav[*].link` type=`string | ((payload: ThemePageData) => string)`

链接项目的链接。传入函数可以根据当前页面数据计算链接，例如让读者始终停留在带版本号的目录中。

@`nav[*].icon` type=string

项目的图标。主题的图标类以 `vpi-` 开头（例如 `vpi-github`），也接受任何 [Iconify](https://iconify.design) 名称。见 [图标](../../plugins/features/icon.md)。

链接项目或分组的图标省略时，主题会回退到页面元数据中的 `icon`，也就是链接指向页面的 frontmatter `icon`。

@`nav[*].activeMatch` type=string

一个正则表达式字符串，用于决定项目是否处于激活状态。默认情况下，只有当前页面与项目链接完全匹配时项目才会激活；使用 `'^/guide/'` 可以让项目在整个目录下保持激活。

@`nav[*].rel` type=string

链接的 `rel` 属性。

@`nav[*].target` type=string

链接的 `target` 属性，例如 `'_blank'`。

@`nav[*].noIcon` type=boolean

是否隐藏项目的外部链接图标。

@`nav[*].items` type=`(NavItemComponent | NavItemChildren | NavItemWithLink)[]`

子项目的子项。链接项目不允许使用该字段。

@@`nav[*].items[*].component` type=string

渲染该项目的全局注册组件的名称。与 `link` 互斥。

@@`nav[*].items[*].props` type=`Record<string, any>`

传给该组件的属性。

@@`nav[*].items[*].items` type=`NavItemWithLink[]`

分组的项目。分组在下拉菜单中渲染为带标题的列。

@@@`nav[*].items[*].items[*].text` type=string

分组内链接的文本。省略时回退到页面元数据的 `title`。

@@@`nav[*].items[*].items[*].link` type=`string | ((payload: ThemePageData) => string)`

分组内链接的链接。

@@@`nav[*].items[*].items[*].icon` type=string

分组内链接的图标。省略时回退到页面元数据。
::::

一个包含下拉菜单、分组和外部链接的导航栏示例：

```ts
export default defineUserConfig({
  theme: themeDefault({
    nav: [
      { text: 'Guide', link: '/guide/' },
      {
        text: 'Ecosystem',
        items: [
          { text: 'Themes', link: '/themes/' },
          {
            text: 'Plugins',
            items: [
              { text: 'Search', link: '/plugins/search/' },
              { text: 'SEO', link: '/plugins/seo/' },
            ],
          },
        ],
      },
      { text: 'GitHub', link: 'https://github.com/vuepress', noIcon: true },
    ],
  }),
})
```

:::: fields
@`socialLinks` type=`DefaultTheme.SocialLink[]`

显示在导航栏末尾和移动端菜单中的社交链接。

@`socialLinks[*].icon` type=`string | { svg: string }`

链接的图标：与 `nav[*].icon` 相同的图标名称或类，或 `{ svg: '<svg>…</svg>' }` 以内联 SVG。

@`socialLinks[*].link` type=string required

链接的 URL。

@`socialLinks[*].ariaLabel` type=string

链接的 `aria-label`。

@`socialLinks[*].target` type=string

链接的 `target` 属性。
::::

## 侧边栏 {#sidebar}

:::: fields
@`sidebar` type=`DefaultTheme.Sidebar | 'heading' | false` default=`'heading'`

侧边栏配置。它接受四种形态：

- `'heading'`：根据当前页面的标题生成侧边栏。这是默认值。
- 一个[侧边栏项目](#sidebar-items)数组：所有页面使用相同的侧边栏。
- 一个以路径为键的对象：每个路径使用不同的侧边栏。键按路径前缀匹配，最长的匹配键生效。
- `false`：不显示侧边栏。

`sidebar` 可以在 frontmatter 中按页面覆盖。

@`sidebarDepth` type=number default=`2`

侧边栏的最大标题深度，包含页面标题本身。它仅在 `sidebar` 为 `'heading'` 时使用。`1` 显示页面标题和 `h2` 标题，`2` 还会显示 `h3` 标题，依此类推。
::::

### 侧边栏项目 {#sidebar-items}

侧边栏项目是一个链接，或一个包含项目的分组。没有链接的分组可以折叠；带链接的分组会渲染该链接，并在其下方渲染子项。

:::: fields
@`sidebar[*].text` type=string

项目的文本。省略时，侧边栏会从项目所链接的页面解析文本：主题会把页面标题保存到路由元信息中，项目文本便使用该标题。

@`sidebar[*].link` type=string

项目的链接。没有链接的项目就是分组。

@`sidebar[*].icon` type=string

项目的图标，形式与 `nav[*].icon` 相同。省略时，侧边栏会从被链接页面的路由元信息中解析图标，因此站点可以在 `extendsPage` 钩子中把页面图标写入 `page.routeMeta.icon`，从而为页面添加图标。

@`sidebar[*].items` type=`DefaultTheme.SidebarItem[]`

项目的子项。分组本身也可以包含分组。

@`sidebar[*].collapsed` type=boolean

分组是否可折叠。省略该字段时，分组不可折叠，其子项始终显示。设置该字段后，分组会带有切换按钮，并且当值为 `true` 时初始为折叠状态。

@`sidebar[*].base` type=string

添加到该项目及其子项链接前的基路径，这样就能用相对路径书写子项链接。

@`sidebar[*].docFooterText` type=string

在文档页面的上一篇/下一篇页脚中用于该项目的文本，而非项目自身的文本。

@`sidebar[*].rel` type=string

链接的 `rel` 属性。

@`sidebar[*].target` type=string

链接的 `target` 属性。
::::

多侧边栏对象还接受 `{ items, base }` 来设置整个侧边栏分组的基路径，以及 `'heading'` 来在该路径下使用标题侧边栏：

```ts
export default defineUserConfig({
  theme: themeDefault({
    sidebar: {
      '/guide/': [{ text: 'Guide', items: ['/guide/', '/guide/install'] }],
      '/advanced/': {
        base: '/advanced/',
        items: ['intro', 'options'],
      },
      '/reference/': 'heading',
    },
  }),
})
```

## 页面 {#page}

:::: fields
@`outline` type=`DefaultTheme.Outline | DefaultTheme.Outline['level'] | false` default=`2`

侧边栏大纲中显示的标题级别。默认值 `2` 只显示 `h2` 标题。

它接受一个级别（`3`）、一个范围（`[2, 4]`）、表示 `[2, 6]` 的 `'deep'`，或一个包含 `level` 和 `label` 的对象：

@@`outline.level` type=`number | [number, number] | 'deep'`

大纲的标题级别。

@@`outline.label` type=string default=`'On this page'`

大纲的标题。

把 `outline` 设为 `false` 可完全移除大纲和侧边栏。它可以在 frontmatter 中按页面覆盖。

@`aside` type=`boolean | 'left'`

包含大纲的侧边栏渲染在何处。默认在右侧；`'left'` 会把它移到内容左侧，`false` 则阻止侧边栏渲染。

首页上的页面始终会禁用侧边栏，页面也可以在 frontmatter 中覆盖主题配置。

@`editLink` type=`DefaultTheme.EditLink`

文档页脚中的“编辑此页”链接。未设置该配置项时它处于禁用状态。

它的字段为：

@@`editLink.pattern` type=`string | ((payload: ThemePageData) => string)` required

链接的模式。在字符串模式中，`:path` 会被替换为页面相对于源目录的文件路径，例如 `'https://github.com/owner/repo/edit/main/docs/:path'`。函数会接收页面数据并返回 URL，这在仓库或分支由页面推导而来时很有用。

@@`editLink.text` type=string default=`'Edit this page'`

链接的文本。

@`lastUpdated` type=`DefaultTheme.LastUpdatedOptions | boolean`

是否显示页面的最后更新时间。它默认为 `true`，时间来自 `@vuepress/plugin-git`；禁用 `git` 插件或设置 `lastUpdated: false` 可以隐藏它。

传入对象可以自定义格式：

@@`lastUpdated.text` type=string default=`'Last updated'`

时间之前显示的文本。

@@`lastUpdated.formatOptions` type=`Intl.DateTimeFormatOptions & { forceLocale?: boolean }`

用于格式化时间的 `Intl.DateTimeFormat` 配置项。默认值为 `{ dateStyle: 'medium', timeStyle: 'medium' }`。时间按页面语言格式化；设置 `forceLocale: true` 可以使用页面语言而不是浏览器语言。

@`contributors` type=boolean default=`true`

是否在文档页脚中显示页面的贡献者。该列表来自 `@vuepress/plugin-git`。

@`contributorsText` type=string default=`'Contributors'`

贡献者列表之前显示的文本。

@`docFooter` type=`DefaultTheme.DocFooter`

自定义文档页脚中上一篇/下一篇页面链接的标签。

@@`docFooter.prev` type=`string | boolean` default=`'Previous page'`

上一篇页面链接的标签。将其设为 `false` 可隐藏该链接。

@@`docFooter.next` type=`string | boolean` default=`'Next page'`

下一篇页面链接的标签。将其设为 `false` 可隐藏该链接。
::::

## 外观 {#appearance}

:::: fields
@`appearance` type=`AppearanceOptions` default=`true`

站点的颜色模式。取值是以下之一：

- `true`：亮色和暗色模式都有，优先跟随系统偏好；用户可以切换。
- `false`：仅亮色模式，并隐藏切换按钮。
- `'dark'`：优先暗色模式，用户可以切换。
- `'force-dark'`：仅暗色模式，并隐藏切换按钮。
- `'force-auto'`：两种模式都有，始终跟随系统偏好，并隐藏切换按钮。
- 一个对象 `{ initialValue: 'dark' }`：优先暗色模式，用户可以切换。它与 `'dark'` 相同，仅为兼容 VitePress 而保留。

所选模式会以 `'auto'`、`'dark'` 或 `'light'` 的形式存储在 `localStorage` 的 `vuepress-color-scheme` 键下。主题会在 `<html>` 上设置 `data-theme` 属性（`'dark'` 或 `'light'`），样式跟随该属性；不存在 `dark` 类。

为了首次绘制时不闪烁，`appearance` 的值还会写入构建出的 HTML 模板的 `data-appearance` 属性，内联脚本会在应用加载前解析主题。CSS 相关部分见 [样式](./styles.md)。
::::

## 无障碍标签 {#accessibility-labels}

主题的每个交互控件都有一个可翻译的标签。默认值都是英文，标签通常会在 [`locales`](#locale) 中翻译。

:::: fields
@`darkModeSwitchLabel` type=string default=`'Appearance'`

暗色模式切换按钮的无障碍标签。

@`lightModeSwitchTitle` type=string default=`'Switch to light theme'`

暗色模式处于激活状态时，切换按钮的提示和无障碍标题。

@`darkModeSwitchTitle` type=string default=`'Switch to dark theme'`

亮色模式处于激活状态时，切换按钮的提示和无障碍标题。

@`sidebarMenuLabel` type=string default=`'Menu'`

移动端侧边栏菜单按钮的无障碍标签。

@`returnToTopLabel` type=string default=`'Return to top'`

移动端大纲菜单中“返回顶部”操作的标签。

@`langMenuLabel` type=string default=`'Change language'`

语言菜单按钮的无障碍标签。

@`navMenuLabel` type=string default=`'Main Navigation'`

主导航地标的无障碍标签。

@`mobileMenuLabel` type=string default=`'Menu'`

移动端菜单按钮的无障碍标签。

@`extraMenuLabel` type=string default=`'More options'`

溢出菜单按钮的无障碍标签。

@`skipToContentLabel` type=string default=`'Skip to content'`

“跳到内容”链接的文本，该链接是页面的第一个可聚焦元素。
::::

## 语言配置 {#locale}

:::: fields
@`locales` type=`LocaleConfig<ThemeConfig>`

每种语言的主题配置。键是语言路径，值包含任意主题配置项，以及语言信息 `label`、`lang`、`dir` 和 `link`。

```ts
export default defineUserConfig({
  locales: {
    '/': { lang: 'en-US', title: 'My Site' },
    '/zh/': { lang: 'zh-CN', title: '我的站点' },
  },
  theme: themeDefault({
    locales: {
      '/': { label: 'English' },
      '/zh/': {
        label: '简体中文',
        editLink: {
          pattern: 'https://github.com/owner/repo/edit/main/docs/zh/:path',
          text: '在 GitHub 上编辑此页',
        },
      },
    },
  }),
})
```

语言模型、语言菜单以及所有可翻译的内置文案见 [语言](./locale.md)。

@`tip` type=string default=`'TIP'`

`tip` 容器的标题。它会被传给 `@vuepress/plugin-markdown-hint`。

@`warning` type=string default=`'WARNING'`

`warning` 容器的标题。

@`danger` type=string default=`'DANGER'`

`danger` 容器的标题。

@`important` type=string default=`'IMPORTANT'`

`important` 容器的标题。

@`note` type=string default=`'NOTE'`

`note` 容器的标题。
::::

## 主题插件 {#theme-plugins}

:::: fields
@`themePlugins` type=`ThemePluginsOptions`

主题接入的插件的配置项。把某个键设为 `false` 可禁用该插件，或设为配置对象来配置它 —— 该对象会合并到主题传入的默认配置项之上。

```ts
export default defineUserConfig({
  theme: themeDefault({
    themePlugins: {
      copyCode: false,
      shiki: { themes: { light: 'vitesse-light', dark: 'vitesse-dark' } },
      markdownHint: { alert: true },
    },
  }),
})
```

每个键、其默认值以及对应插件的文档见 [插件](./plugin.md)。
::::
