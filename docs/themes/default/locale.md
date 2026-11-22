---
icon: globe
---

# Locale

A site can be translated with the `locales` option of the theme. Each locale carries its own theme options, so the navbar, the sidebar, the labels and the texts of a language are configured together.

VuePress itself also has a [site-level `locales`](https://vuepress.vuejs.org/guide/i18n.html) option, which declares the languages of the site and decides the locale of a route. The theme locales only carry the theme options of a language, so declare the same locale paths in both places.

<NpmBadge package="@vuepress/theme-default" />

```ts
import { themeDefault } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  lang: 'en-US',
  theme: themeDefault({
    locales: {
      '/': {
        label: 'English',
        lang: 'en-US',
        nav: [{ text: 'Guide', link: '/guide/' }],
        sidebar: ['/guide/'],
        editLink: {
          pattern: 'https://github.com/example/repo/edit/main/:path',
        },
      },
      '/zh/': {
        label: '简体中文',
        lang: 'zh-CN',
        nav: [{ text: '指南', link: '/zh/guide/' }],
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

The `lang` of a locale is used by the document, while `label` is what the language menu shows.

## Locale Config

::: fields
@`locales` type=`LocaleConfig<ThemeConfig>`

The theme options of every language, keyed by the locale path. Each value accepts the fields of the locale config below, plus any other [theme option](./config.md), which overrides the same option of the site config for the pages of that language.

@@`locales.<localePath>.label` type=string

The name of the language shown in the language menu, in its own language. It falls back to the locale path.

@@`locales.<localePath>.lang` type=string

The BCP 47 tag of the language, such as `'en-US'` or `'zh-CN'`. It falls back to the language of the site.

@@`locales.<localePath>.dir` type=`'ltr' | 'rtl' | 'auto'` default=`'ltr'`

The text direction of the language. It is applied to the alternate-language links in the language menu. The direction of the page itself is set by `@vuepress/plugin-rtl`.

@@`locales.<localePath>.link` type=string

The link of the language. It defaults to the locale path. Set it when the language lives at a URL that is not derived from the key of the locale.
:::

The key is the path prefix of the language. Both `/` and `/zh/` are normalized to the trailing-slash form, so `zh` and `/zh/` are the same locale.

::: tip
A locale inherits every option of the root locale, which is the one configured on the theme itself, and overrides only the options it sets. Options whose value is an object or an array are replaced, not merged.
:::

## Built-in Texts

The texts the theme renders can be translated without touching the theme. They are theme options, so they are set per locale in [`locales`](#locale-config) or once for the whole site.

### Document Page

::: fields
@`editLink.text` type=string default=`'Edit this page'`

The text of the edit link in the document footer.

@`lastUpdated.text` type=string default=`'Last updated'`

The label before the last updated time. The time format itself is configured with `lastUpdated.formatOptions`.

@`contributorsText` type=string default=`'Contributors'`

The label before the contributors in the document footer.

@`docFooter.prev` type=`string | boolean` default=`'Previous page'`

The label above the link to the previous page. Set it to `false` to hide the previous link.

@`docFooter.next` type=`string | boolean` default=`'Next page'`

The label above the link to the next page. Set it to `false` to hide the next link.

@`outline.label` type=string default=`'On this page'`

The title of the outline. It is set on the [`outline`](./config.md#page) option:

```ts
themeDefault({
  outline: { level: [2, 3], label: 'On this page' },
})
```
:::

### Hint Containers

The titles of the hint containers are theme options, which the theme forwards to `@vuepress/plugin-markdown-hint`:

| Container       | Option      | Default       |
| --------------- | ----------- | ------------- |
| `::: tip`       | `tip`       | `'TIP'`       |
| `::: warning`   | `warning`   | `'WARNING'`   |
| `::: danger`    | `danger`    | `'DANGER'`    |
| `::: important` | `important` | `'IMPORTANT'` |
| `::: note`      | `note`      | `'NOTE'`      |

The `::: danger` container renders the caution style, so `danger` also sets the title of `::: caution`. The titles of `::: info` and `::: details` come from the locales of the plugin.

### Not Found Page

::: fields
@`notFound.title` type=string default=`'PAGE NOT FOUND'`

The title of the not-found page.

@`notFound.quote` type=string

The quote of the not-found page. Its default is a quote about directions.

@`notFound.code` type=string default=`'404'`

The error code shown above the title.

@`notFound.link` type=string

The link of the button. It defaults to the home page of the current language.

@`notFound.linkText` type=string default=`'Take me home'`

The text of the button.

@`notFound.linkLabel` type=string default=`'go to home'`

The accessible label of the button.
:::

### Accessibility Labels

These labels are read by screen readers, or shown as the title of an icon-only control:

::: fields
@`darkModeSwitchLabel` type=string default=`'Appearance'`

The label of the appearance switch in the mobile menu.

@`lightModeSwitchTitle` type=string default=`'Switch to light theme'`

The title of the appearance switch when the dark mode is active.

@`darkModeSwitchTitle` type=string default=`'Switch to dark theme'`

The title of the appearance switch when the light mode is active.

@`sidebarMenuLabel` type=string default=`'Menu'`

The label of the sidebar toggle in the local nav.

@`returnToTopLabel` type=string default=`'Return to top'`

The label of the "return to top" entry in the outline dropdown of the local nav.

@`langMenuLabel` type=string default=`'Change language'`

The label of the language menu.

@`navMenuLabel` type=string default=`'Main Navigation'`

The label of the navigation menu.

@`mobileMenuLabel` type=string default=`'Menu'`

The label of the mobile menu toggle.

@`extraMenuLabel` type=string default=`'More options'`

The label of the overflow menu of the navbar.

@`skipToContentLabel` type=string default=`'Skip to content'`

The text of the skip-to-content link.
:::

## Language Menu

The language menu is derived from [`locales`](#locale-config): it lists every locale of the theme data (the label falls back to the locale path), links to the same page in that language when the page exists, and is hidden when there is only one locale. The label of the current language is shown in the desktop navbar, and the whole list is shown in the mobile menu.

The `label`, `lang` and `dir` of a locale are used by that menu. The rest of the locale data is used by the pages of the language.
