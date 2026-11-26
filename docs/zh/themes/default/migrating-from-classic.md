---
icon: arrow-right-left
---

# 从经典主题迁移 {#migrating-from-classic}

`@vuepress/theme-classic` 是曾经作为 VuePress 默认主题的主题。它依然可用，也保持着自己的外观，但新的默认主题是 `@vuepress/theme-default` —— 一个从 VitePress 移植而来的轻量布局层。

本页把经典主题的配置项、frontmatter 和样式映射到新主题。新主题直接接受导航栏和侧边栏的经典写法 —— 字符串条目、`prefix`、`children` 与 `collapsible` 会在构建时归一化 —— 因此大多数站点只需要更换依赖包。经典主题的配置项同样会被接受：它们在构建时映射到对应的新配置项，并且只输出一次弃用警告，因此可以逐个配置项地迁移。下面的表格列出了每个配置项的替代项；没有对应新配置项的会注明。样式曾经是 SASS，现在则是 CSS 自定义属性。

<NpmBadge package="@vuepress/theme-default" />

## 更新依赖包 {#update-the-package}

替换主题的包和工厂函数的导入：

```diff
- npm install -D @vuepress/theme-classic@next
+ npm install -D @vuepress/theme-default@next
```

```diff
- import { classicTheme } from '@vuepress/theme-classic'
+ import { defaultTheme } from '@vuepress/theme-default'

  export default defineUserConfig({
-   theme: classicTheme({ /* ... */ }),
+   theme: defaultTheme({ /* ... */ }),
  })
```

新主题保留了 `defaultTheme` 导出名，因此原有的 `import { defaultTheme } from '@vuepress/theme-default'` 在升级后仍然可用。布局和主题配置项发生了变化，请按下面的说明迁移。

## 迁移主题配置项 {#migrate-the-theme-options}

### 通用 {#general}

| 经典主题           | 新主题                    | 说明                                                                                                                  |
| ------------------ | ------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `hostname`         | `hostname`                | 相同。它会启用 SEO 插件和 sitemap 插件。                                                                              |
| `locales`          | `locales`                 | 为每个语言添加 `label`、`lang` 和 `link`，因为语言菜单依赖它们。                                                      |
| `colorMode`        | `appearance`              | 在构建时映射，见[颜色模式](#color-mode)。会输出弃用警告。                                                             |
| `logo`             | `logo`                    | 一个字符串，或一个 `ThemeableImage` 对象。                                                                            |
| `logoDark`         | `logo: { light, dark }`   | logo 的暗色变体。                                                                                                     |
| `logoAlt`          | `logo: { alt }`           | logo 的替代文本。                                                                                                     |
| `home`             | `logoLink`                | 导航栏中 logo 的链接，以及站点的首页。404 按钮使用 `notFound.link`。                                                  |
| `repo`             | `socialLinks`             | 在构建时接受并映射。GitHub、GitLab、Gitee 和 Bitbucket 会自动添加品牌图标，因此只有其他托管平台才需要 `socialLinks`。 |
| `repoLabel`        | `socialLinks[].ariaLabel` | 仓库链接的标签。默认使用仓库类型，例如 `GitHub`。                                                                     |
| `navbar`           | `navbar`                  | 相同的键与相同的条目写法。见[导航栏](#navbar)。                                                                       |
| `sidebar`          | `sidebar`                 | 相同的键与相同的条目写法。默认值现在是 `false`。见[侧边栏](#sidebar)。                                                |
| `externalLinkIcon` | `externalLinkIcon`        | 相同，默认值为 `false`。                                                                                              |
| `themePlugins`     | `themePlugins`            | 见[主题插件](#theme-plugins)。                                                                                        |

### 导航栏 {#navbar}

导航栏保留 `navbar` 键与经典主题的条目写法：字符串条目、`children`、`prefix` 与 `activeMatch` 会在构建时归一化。`navbar: false` 会隐藏导航栏。

| 经典主题                     | 新主题                           | 说明                                                    |
| ---------------------------- | -------------------------------- | ------------------------------------------------------- |
| `navbar: []`（默认）         | 不写 `navbar`                    | 两者都渲染不带条目的导航栏。                            |
| `navbar: false`              | `navbar: false`                  | 隐藏导航栏本身。                                        |
| `'/guide/'`（字符串条目）    | 相同                             | 文本在运行时从该页面的标题解析。                        |
| `{ text, link }`             | 相同                             | 相同。                                                  |
| `{ text, children }`         | 相同，或 `{ text, items }`       | `children` 是 `items` 的废弃别名。                      |
| `{ text, prefix, children }` | 相同，或 `{ text, base, items }` | `prefix` 是 `base` 的废弃别名。基路径只作用于子项链接。 |
| `{ text, activeMatch }`      | 相同                             | 相同，作为正则表达式字符串。                            |
| `{ text, ariaLabel }`        | —                                | 不支持；添加一个 `icon` 或保留文本。                    |
| —                            | `{ exact }`                      | 使条目只在其链接对应的页面上激活。                      |
| —                            | `{ component, props }`           | 在导航栏中渲染自定义组件。                              |
| —                            | `socialLinks`                    | 社交链接与导航条目是分开的。                            |

`navbarLabel` 和 `pageNavbarLabel` 曾是导航的无障碍标签。导航栏请使用 `navMenuLabel`；页面导航栏不再有自己的标签。

### 侧边栏 {#sidebar}

侧边栏保留 `sidebar` 键与经典主题的条目写法，包括字符串条目、`children`、`prefix` 与 `collapsible`。默认值现在是 `false`，因此没有配置侧边栏的站点不再生成标题侧边栏。`'heading'` 模式与 `sidebarDepth` 配置项已移除：请使用 `@vuepress/plugin-toc` 提供目录。

| 经典主题                     | 新主题                           | 说明                                                             |
| ---------------------------- | -------------------------------- | ---------------------------------------------------------------- |
| `'/guide/'`（字符串条目）    | 相同                             | 文本在运行时从该页面的标题解析。                                 |
| `{ text, link }`             | 相同                             | 相同。                                                           |
| `{ text, children }`         | 相同，或 `{ text, items }`       | `children` 是 `items` 的废弃别名。                               |
| `{ text, prefix, children }` | 相同，或 `{ text, base, items }` | `prefix` 是 `base` 的废弃别名。                                  |
| `{ text, collapsible }`      | 相同                             | `expanded: true` 使分组默认展开。                                |
| `{ text, collapsed }`        | —                                | 已移除；请使用 `collapsible` 配合 `expanded`。                   |
| `{ text, ariaLabel }`        | —                                | 不支持。                                                         |
| —                            | `{ icon }`                       | 条目的图标。                                                     |
| —                            | `{ activeMatch, exact }`         | 控制条目何时激活。                                               |
| —                            | `{ docFooterText }`              | 上一篇/下一篇链接使用的文本。                                    |
| 以页面路径为键的侧边栏对象   | 相同                             | 每个值可以是数组、`false`、`'structure'`，或 `{ items, base }`。 |

### 文档页脚 {#document-footer}

| 经典主题           | 新主题                         | 说明                                                       |
| ------------------ | ------------------------------ | ---------------------------------------------------------- |
| `editLink`         | `editLink`                     | `false` 会禁用链接。`true` 会按仓库配置项映射为 pattern。  |
| `editLinkText`     | `editLink.text`                | 在构建时接受并映射。                                       |
| `editLinkPattern`  | `editLink.pattern`             | 在构建时接受并映射。`:path` 是唯一的占位符。               |
| `docsRepo`         | `getEditLinkPattern({ repo })` | 在构建时接受并映射。该辅助函数用于在配置之外构建 pattern。 |
| `docsBranch`       | —                              | 在构建时接受并映射到 pattern 中。                          |
| `docsDir`          | —                              | 在构建时接受并映射到 pattern 中。                          |
| `lastUpdated`      | `lastUpdated`                  | 相同，或带 `text` 和 `formatOptions` 的对象。              |
| `lastUpdatedText`  | `lastUpdated.text`             | 默认值为 `'Last updated'`。                                |
| `contributors`     | `contributors`                 | 相同，默认值为 `true`。                                    |
| `contributorsText` | `contributorsText`             | 相同，默认值为 `'Contributors'`。                          |
| `prev`             | `docFooter.prev`               | 一个字符串标签，或 `false` 以隐藏上一篇链接。              |
| `next`             | `docFooter.next`               | 一个字符串标签，或 `false` 以隐藏下一篇链接。              |

### 颜色模式 {#color-mode}

| 经典主题             | 新主题                                                 |
| -------------------- | ------------------------------------------------------ |
| `colorMode: 'auto'`  | `appearance: true`                                     |
| `colorMode: 'light'` | `appearance: { initialValue: 'light' }`                |
| `colorMode: 'dark'`  | `appearance: 'dark'`                                   |
| —                    | `appearance: 'force-dark'`（始终为暗色）               |
| —                    | `appearance: 'force-auto'`（跟随系统，不显示切换按钮） |

`colorModeSwitch: false` 会在构建期映射：配合 `colorMode: 'light'` 变成 `appearance: false`，配合 `'dark'` 变成 `'force-dark'`，不写 `colorMode` 则变成 `'force-auto'`。外观固定时切换按钮会被隐藏。

存储键仍然是 `vuepress-color-scheme`，但暗色模式现在由 `<html>` 上的 `data-theme` 属性驱动，而不再由 `dark` class 驱动。针对 `.dark` 的样式表必须改为针对 `[data-theme='dark']`。

### 首页与 404 {#home-page-and-404}

除 `home` 外，经典主题的首页字段保持原来的名称。`home: true` 已弃用，请改用 `type: home`，使用时会输出警告；下面的扁平字段会作为对应的 `hero` 字段读取。嵌套的 `hero` 写法仍然可用，两者同时设置时 `hero` 优先。`heroHeight` 不可配置。

| 经典主题（frontmatter）         | 新主题（frontmatter）                                  | 说明                                                       |
| ------------------------------- | ------------------------------------------------------ | ---------------------------------------------------------- |
| `home: true`                    | `type: home`                                           | `home: true` 仍可使用，但已弃用并会输出警告。              |
| `heroImage`                     | `heroImage`                                            | 一个字符串，或 `{ src }` 对象（使用 `hero.image` 时）。    |
| `heroImageDark`                 | `heroImageDark`                                        | 图片的暗色变体。                                           |
| `heroAlt`                       | `heroAlt`                                              | 替代文本。                                                 |
| `heroHeight`                    | —                                                      | 不可配置。                                                 |
| `heroText`                      | `heroText`                                             | 项目的名称。                                               |
| `tagline`                       | `tagline`                                              | hero 的文本。                                              |
| `actions[{ text, link, type }]` | `actions[{ text, link, type }]`                        | 支持 `type: 'primary'`，也支持 `theme: 'brand' \| 'alt'`。 |
| `features[{ title, details }]`  | `features[{ title, details }]`                         | 新条目还接受 `icon`、`link` 和 `linkText`。                |
| `footer`                        | `footer`                                               | 字符串渲染为页面页脚；布尔值控制站点页脚。                 |
| `footerHtml`                    | `footerHtml`                                           | 是否将字符串页脚作为 HTML 渲染。                           |
| `notFound`（字符串数组）        | `notFound`（对象）                                     | 见下文。                                                   |
| `backToHome`                    | `notFound.linkText`                                    | 默认值为 `'Take me home'`。                                |
| —                               | `notFound.title`、`quote`、`link`、`linkLabel`、`code` | 404 页面的各个部分。                                       |

经典主题会从 `notFound` 中随机渲染一条消息。新主题只有一个 `quote`，因此请从原来的消息中选一条：

```ts
defaultTheme({
  notFound: {
    title: 'PAGE NOT FOUND',
    quote: "There's nothing here.",
    linkText: 'Take me home',
  },
})
```

### 无障碍标签 {#accessibility-labels}

| 经典主题                  | 新主题                                                                      |
| ------------------------- | --------------------------------------------------------------------------- |
| `toggleColorMode`         | `darkModeSwitchLabel`，以及 `lightModeSwitchTitle` 和 `darkModeSwitchTitle` |
| `toggleSidebar`           | `sidebarMenuLabel` 和 `mobileMenuLabel`                                     |
| `selectLanguageText`      | `langMenuLabel`                                                             |
| `selectLanguageAriaLabel` | `langMenuLabel`                                                             |
| `selectLanguageName`      | `locales.<localePath>.label`                                                |
| `navbarLabel`             | `navMenuLabel`                                                              |
| `pageNavbarLabel`         | —                                                                           |
| `openInNewWindow`         | —                                                                           |
| —                         | `returnToTopLabel`、`extraMenuLabel`、`skipToContentLabel`                  |

如果没有设置 `locales.<localePath>.label`，语言切换器会回退到 locale 路径，因此只配置了 `selectLanguageText` 的 locale 在迁移时需要补上它。

### 主题插件 {#theme-plugins}

| 经典主题            | 新主题                  | 说明                                                                    |
| ------------------- | ----------------------- | ----------------------------------------------------------------------- |
| `activeHeaderLinks` | `activeHeaderLinks`     | 只接受布尔值。                                                          |
| `backToTop`         | `backToTop`             | 相同的配置项。                                                          |
| `copyCode`          | `copyCode`              | 相同的配置项。                                                          |
| `git`               | `git`                   | 相同的配置项。                                                          |
| `hint`              | `markdownPlugins.hint`  | 相同的配置项，已移到 `markdownPlugins`。                                |
| `linksCheck`        | `linksCheck`            | 相同的配置项。                                                          |
| `mediumZoom`        | `mediumZoom`            | 含义相同，接受配置对象。                                                |
| `nprogress`         | `nprogress`             | 相同。                                                                  |
| `prismjs`           | `markdownPlugins.shiki` | 高亮器变了。设置 `shiki: false` 并注册 `prismjsPlugin` 即可保留 Prism。 |
| `seo`               | `seo`                   | 相同的配置项，需要 `hostname`。                                         |
| `sitemap`           | `sitemap`               | 相同的配置项，需要 `hostname`。                                         |
| `tab`               | `markdownPlugins.tab`   | 代码选项卡默认开启；`::: tabs` 需要 `tab: { tabs: true }`。             |
| —                   | `icon`                  | 使用 Iconify 渲染图标。                                                 |
| `markdownExt`       | `markdownPlugins.ext`   | GFM、脚注、任务列表和 `v-pre` 容器。                                    |
| `markdownRaw`       | `markdownPlugins.raw`   | 带样式隔离的 `raw` 容器。                                               |

SASS 调色板已被移除。主题不再接入 `@vuepress/plugin-palette`，因为主题使用 CSS 自定义属性编写样式，站点在 `.vuepress/styles/index.css` 中覆盖它们即可。见[样式](#styles)。

插件仍然用 `false` 禁用、用对象配置，和以前一样：

```ts
defaultTheme({
  themePlugins: {
    linksCheck: { exclude: [/^#\//u] },
    sitemap: false,
  },
  markdownPlugins: {
    shiki: { themes: { light: 'nord', dark: 'nord' } },
  },
})
```

要保留 Prism 作为高亮器，请禁用 Shiki 并自行注册 Prism 插件：

```ts
import { prismjsPlugin } from '@vuepress/plugin-prismjs'

export default defineUserConfig({
  plugins: [prismjsPlugin()],
  theme: defaultTheme({
    markdownPlugins: { shiki: false },
  }),
})
```

## 迁移 frontmatter {#migrate-the-frontmatter}

| 经典主题           | 新主题             | 说明                                                                         |
| ------------------ | ------------------ | ---------------------------------------------------------------------------- |
| `home: true`       | `type: home`       | `home: true` 仍可使用，但已弃用并会输出警告；其他页面默认为 `type: doc`。    |
| `navbar`           | `navbar`           | 相同。                                                                       |
| `externalLinkIcon` | `externalLinkIcon` | 相同。                                                                       |
| `pageClass`        | `pageClass`        | 相同，且该 class 会加在页面容器上。                                          |
| `editLink`         | `editLink`         | 一个布尔值，用于启用或禁用该页面的链接。                                     |
| `editLinkPattern`  | —                  | pattern 现在是主题配置项。                                                   |
| `lastUpdated`      | `lastUpdated`      | 相同，一个布尔值或一个时间戳。                                               |
| `contributors`     | `contributors`     | 相同。                                                                       |
| `sidebar`          | `sidebar`          | 形状相同，包括 classic 条目写法。                                            |
| `prev` / `next`    | `prev` / `next`    | 字符串即文本；对象接受 `text`、`link`、`target` 和 `rel`；`false` 隐藏链接。 |
| `footer`（字符串） | `footer`（字符串） | 字符串会渲染为页面页脚。                                                     |
| `footerHtml`       | `footerHtml`       | 是否将字符串页脚作为 HTML 渲染。                                             |
| —                  | `footer: false`    | 在该页面隐藏站点页脚。                                                       |

上一篇/下一篇 frontmatter 的行为变了。在经典主题中，字符串是页面文件的路径，会被转换成链接。在新主题中，字符串就是链接的文本，目标来自侧边栏顺序：

```diff
- prev: /guide/getting-started.md
+ prev: { text: 'Get started', link: '/guide/getting-started.html' }
```

## 样式 {#styles}

经典主题使用 SASS：`.vuepress/styles/palette.scss` 存放变量，`.vuepress/styles/index.scss` 存放规则。新主题使用纯 CSS 和 CSS 自定义属性，因此不再需要调色板插件：

```diff
- /* .vuepress/styles/palette.scss */
- $vp-c-accent: #2c3e50;
- $vp-c-accent-bg: #2c3e50;
+ /* .vuepress/styles/index.css */
+ :root {
+   --vp-c-brand: #2c3e50;
+   --vp-c-brand-hover: #2c3e50;
+   --vp-c-brand-bg: #2c3e50;
+ }
```

自定义规则从 `.vuepress/styles/index.scss` 移到 `.vuepress/styles/index.css`，主题会自动导入后者。由于该文件是纯 CSS，只有站点自己配置了预处理器时才需要保留 SCSS。

经典主题的变量名会作为别名保留（`--vp-c-accent`、`--vp-c-text`、`--vp-c-control` 等等），因此生态插件的样式仍能正常工作。覆盖经典变量的站点应当改为覆盖它别名到的新变量，也就是主题自身使用的那个变量。见[样式](./styles.md)。

## 自定义布局和组件 {#custom-layouts-and-components}

经典主题的 `@theme/*` 别名在新主题中不存在，内部组件也不再导出。替代它们的两样东西是 `theme.Layout` 组件和布局的[插槽](./extending.md#layout-slots)：

```diff
- import ParentLayout from '@vuepress/theme-classic/layouts/Layout.vue'
+ import theme from '@vuepress/theme-default/client'
+
+ const ParentLayout = theme.Layout
```

经典主题的布局从 `@vuepress/theme-classic/components/*` 或通过 `@theme/*` 导入它的组件。新主题只导出公共组件，并保持它们的 `VP` 名称：`VPBadge`、`VPButton`、`VPImage`、`VPLink`、首页组件、团队组件和赞助商组件。当插槽存在时用插槽替换内部组件，否则用自己的标记替换。见[内置组件](./components.md)。

## 类型 {#types}

| 经典主题                            | 新主题                                                |
| ----------------------------------- | ----------------------------------------------------- |
| `ClassicThemeOptions`               | `ThemeOptions`                                        |
| `ClassicThemeData`                  | `ThemeConfig`                                         |
| `ClassicThemeLocaleData`            | `ThemeConfig`                                         |
| `ClassicThemePageData`              | `ThemePageData`                                       |
| `ClassicThemePageFrontmatter`       | `ThemePageFrontmatter`                                |
| `ClassicThemeHomePageFrontmatter`   | `ThemePageFrontmatter`（带 `type: 'home'` 和 `hero`） |
| `ClassicThemeNormalPageFrontmatter` | `ThemePageFrontmatter`（带 `type: 'doc'`）            |
| `ClassicThemePluginsOptions`        | `ThemePluginsOptions`                                 |
| `NavbarOptions`                     | `NavItem[]`                                           |
| `SidebarOptions`                    | `Sidebar`                                             |

导航条目、侧边栏条目、hero 和特性、页脚、团队成员以及赞助商的类型都以普通类型从包中导出。导入它们即可为配置对象标注类型：

```ts
import type { NavItem } from '@vuepress/theme-default'

const navbar: NavItem[] = [{ text: 'Guide', link: '/guide/' }]
```

## 客户端 API {#client-api}

| 经典主题               | 新主题                                                 |
| ---------------------- | ------------------------------------------------------ |
| `useData()`            | `useThemePageData()` 和 `vuepress/client` 的组合式函数 |
| `useThemeData()`       | `useThemeData()`（同名）                               |
| `useThemeLocaleData()` | `useThemeLocaleData()`（同名）                         |
| `useDarkMode()`        | `useDarkMode()`（返回暗色模式是否开启）                |
| `darkModeSymbol`       | `themeDarkModeSymbol`                                  |
| `useEditLink()`        | —                                                      |
| `useHeaders()`         | `useLayout().headers`                                  |
| `useSidebarItems()`    | `useLayout().sidebar` 和 `useLayout().sidebarGroups`   |
| `useNavbarConfig()`    | —                                                      |
| `useNavbarRepo()`      | —                                                      |

新主题不会重新导出 `vuepress/client` 的组合式函数。请直接从 `vuepress/client` 导入 `usePageData`、`usePageFrontmatter`、`useRouteLocale`、`useSiteData` 等。

## 没有对应新特性的功能 {#features-without-a-new-equivalent}

有几个经典特性是被移除而不是改名：

- 导航栏的 `repo` 条目。仓库会映射为一个带品牌图标的 `socialLinks` 条目，这也是 v1 渲染社交链接的唯一位置。
- 随机化的 404 引文列表。只使用经典列表中的第一条消息作为 `quote`。
- 外链的 `openInNewWindow` 文本。新主题只有 `externalLinkIcon` 布尔值。
- `@theme/*` 别名和可替换的内部组件。请改用插槽和布局。
- `pageNavbarLabel` 标签。
- SASS 调色板。请使用 CSS 自定义属性。

## 检查清单 {#checklist}

1. 把 `@vuepress/theme-classic` 替换为 `@vuepress/theme-default`，把 `classicTheme` 替换为 `defaultTheme`。
2. 保持 `navbar` 与 `sidebar` 配置不变：默认主题接受经典主题的写法，见上文的兼容性表格。经典主题的配置项同样会被接受，因此在迁移配置项之前站点依然可以构建；构建日志会列出它仍然找到的每一个已弃用的配置项。
3. 把 `colorMode` / `colorModeSwitch` 转换为 `appearance`，把语言切换器配置项转换为 `locales.<path>.label` 和 `langMenuLabel`。
4. 将 `home: true` 转换为 `type: home`，并转换 `notFound` / `backToHome`；其他经典首页字段保持原来的名称。
5. 把 Markdown 插件开关重命名为 `markdownPlugins`，如果站点必须保留 Prism 则关掉 Shiki。移除现在会输出弃用警告的配置项：`colorMode`、`colorModeSwitch`、`home`、`navbarLabel`、`logoDark`、`logoAlt`、`repo`、`repoLabel`、`selectLanguage*`、`sidebarDepth`、`editLink*`、`docsRepo`、`docsBranch`、`docsDir`、`lastUpdatedText`、`backToHome`、`openInNewWindow`、`toggleColorMode`、`toggleSidebar`、`prev`、`next`，以及经典主题的 `themePlugins.markdown*` / `themePlugins.hint` / `themePlugins.tab` / `themePlugins.prismjs` 键。
6. 把 SASS 调色板迁移为 `.vuepress/styles/index.css` 中的 CSS 变量。
7. 用 `theme.Layout` 和公共组件替换 `ParentLayout` 与 `@theme/*` 导入。
8. 更新类型名称。
9. 运行站点，检查导航栏、侧边栏、首页、404 页面和暗色模式。
