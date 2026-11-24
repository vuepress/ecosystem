---
icon: settings-2
---

# Config

All options are passed to `defaultTheme()` in `.vuepress/config.ts`:

```ts title=".vuepress/config.ts"
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  theme: defaultTheme({
    siteTitle: 'My Site',
    nav: [{ text: 'Guide', link: '/guide/' }],
    sidebar: 'heading',
  }),
})
```

Every option below is a field of the `ThemeConfig` interface, except `hostname`, which is an extra option of `defaultTheme()`. Options that are not supported — including the VitePress-only ones — are rejected by the TypeScript type checker rather than silently ignored.

The options are merged from the root theme config and the matching entry of [`locales`](#locale): an option set only in `locales['/zh/']` does not apply to the other languages. Site-wide options that must not be translated, such as `hostname`, only make sense at the root.

## Basic Config

:::: fields
@`siteTitle` type=`string | false`

The site title shown next to the logo in the navbar. It defaults to the site title from the VuePress config, and may contain HTML.

Set it to `false` to hide the text and show the logo only.

@`logo` type=`DefaultTheme.ThemeableImage`

The logo image shown in the navbar. Upload the file to the public directory and pass its URL. It accepts:

- a URL string: `'/logo.svg'`.
- an object with extra image attributes: `{ src: '/logo.svg', alt: 'My Site' }`.
- a themed object: `{ light: '/logo-light.svg', dark: '/logo-dark.svg', alt: 'My Site' }` — the icon in use follows the current color mode.

@`logoLink` type=`string | { link?: string; rel?: string; target?: string }`

The link of the logo and the site title. It defaults to the home link of the current language (`/` for the root locale, `/zh/` for the `/zh/` locale, and so on).

@`hostname` type=string

The hostname the site is deployed at, such as `'https://example.com'`.

It is not part of the theme config: the theme passes it to `@vuepress/plugin-seo` and `@vuepress/plugin-sitemap`, and neither plugin is enabled when `hostname` is missing. See [Plugins](./plugin.md#themeplugins).

@`appearance` type=`AppearanceOptions`

The color mode of the site: whether dark mode is available, which mode is used first, and whether the user can switch. See [Appearance](#appearance).

@`dir` type=`'ltr' | 'rtl' | 'auto'` default=`'ltr'`

The text direction of the language. It is carried into the locale data used by the language menu, where it becomes the `dir` attribute of the alternate-language links.

The layout itself is written with logical CSS properties and switches its direction from the `dir` attribute of the `<html>` element, which the theme does not set — use `@vuepress/plugin-rtl` or your own client config to set it.

@`footer` type=`DefaultTheme.Footer`

The footer shown at the bottom of every page. It is hidden when the page sets `footer: false` in its frontmatter.

Its fields are:

@@`footer.message` type=string

The message line of the footer. HTML is allowed.

@@`footer.copyright` type=string

The copyright line of the footer. HTML is allowed.

@`notFound` type=`DefaultTheme.NotFoundOptions`

Customize the text of the 404 page. Every field falls back to the built-in English text, so a site only sets the fields it wants to translate.

Its fields are:

@@`notFound.title` type=string default=`'PAGE NOT FOUND'`

The large title of the page.

@@`notFound.quote` type=string

The quote under the title. The default is the Alice in Wonderland quote used by VitePress.

@@`notFound.code` type=string default=`'404'`

The error code shown above the title.

@@`notFound.link` type=string

The target of the home link. It defaults to the home link of the current language.

@@`notFound.linkText` type=string default=`'Take me home'`

The text of the home link.

@@`notFound.linkLabel` type=string default=`'go to home'`

The `aria-label` of the home link.

@`externalLinkIcon` type=boolean default=`false`

Whether to show an icon after external links in the Markdown content. The icon is a CSS pseudo-element on `a[href*='://']` and `a[target='_blank']` inside `.vp-doc`, so it is not rendered as an element and does not affect the link text.

Add the `no-icon` class to an image or a link to opt it out.

@`gradedContainers` type=boolean

Whether to color the custom containers on a graded severity scale.

By default `warning` uses yellow, while `caution` and `danger` both use red. Enabling this option maps `warning` to orange and `caution` to yellow, so `warning`, `caution` and `danger` form an orange → yellow → red scale.

See [Markdown containers](./markdown.md#hint-containers) for the container syntax.
::::

## Navbar

:::: fields
@`nav` type=`DefaultTheme.NavItem[]`

The navbar items. Every item is one of three shapes:

- a link item, rendered as a link in the navbar.
- a children item, rendered as a dropdown that contains link items and groups.
- a component item, rendered by a component registered in the VuePress app.

@`nav[*].text` type=string

The text of a link item or a children item. It is required for a children item.

For a link item it can be omitted: the theme falls back to the `title` of the page metadata, so a navbar item only needs its `link` and is labelled like the page it leads to.

@`nav[*].link` type=`string | ((payload: ThemePageData) => string)`

The link of a link item. Pass a function to compute the link from the current page data, e.g. to keep the reader inside a versioned directory.

@`nav[*].icon` type=string

The icon of the item. Icon classes of the theme start with `vpi-` (for example `vpi-github`), and any [Iconify](https://iconify.design) name is also accepted. See [Icons](../../plugins/features/icon.md).

When the icon of a link item or of a group is omitted, the theme falls back to the `icon` of the page metadata — the frontmatter `icon` of the page that the link leads to.

@`nav[*].activeMatch` type=string

A regular expression, as a string, that decides whether the item is active. By default an item is active only when the current page matches its link exactly; use `'^/guide/'` to mark the item active for a whole directory.

@`nav[*].rel` type=string

The `rel` attribute of the link.

@`nav[*].target` type=string

The `target` attribute of the link, e.g. `'_blank'`.

@`nav[*].noIcon` type=boolean

Whether to hide the external link icon of the item.

@`nav[*].items` type=`(NavItemComponent | NavItemChildren | NavItemWithLink)[]`

The children of a children item. This field is not allowed on a link item.

@@`nav[*].items[*].component` type=string

The name of a globally registered component that renders the item. Mutually exclusive with `link`.

@@`nav[*].items[*].props` type=`Record<string, any>`

The props passed to that component.

@@`nav[*].items[*].items` type=`NavItemWithLink[]`

The items of a group. A group is rendered as a column with a title inside the dropdown.

@@@`nav[*].items[*].items[*].text` type=string

The text of the link inside the group. It falls back to the `title` of the page metadata when omitted.

@@@`nav[*].items[*].items[*].link` type=`string | ((payload: ThemePageData) => string)`

The link of the link inside the group.

@@@`nav[*].items[*].items[*].icon` type=string

The icon of the link inside the group. It falls back to the page metadata when omitted.
::::

A navbar example with a dropdown, a group and an external link:

```ts
export default defineUserConfig({
  theme: defaultTheme({
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

The social links shown at the end of the navbar and in the mobile menu.

@`socialLinks[*].icon` type=`string | { svg: string }`

The icon of the link: an icon name or class as in `nav[*].icon`, or `{ svg: '<svg>…</svg>' }` to inline an SVG.

@`socialLinks[*].link` type=string required

The URL of the link.

@`socialLinks[*].ariaLabel` type=string

The `aria-label` of the link.

@`socialLinks[*].target` type=string

The `target` attribute of the link.
::::

## Sidebar

:::: fields
@`sidebar` type=`DefaultTheme.Sidebar | 'heading' | false` default=`'heading'`

The sidebar configuration. It accepts five shapes:

- `'heading'`: generate the sidebar from the headings of the current page. This is the default.
- `'structure'`: generate the sidebar from the file structure. See [Generate from the file structure](#generate-from-the-file-structure).
- an array of [sidebar items](#sidebar-items): the same sidebar on every page.
- an object keyed by path: a different sidebar for each path. The key is matched as a path prefix and the longest matching key wins. The value is a sidebar array, `'heading'` or `'structure'`.
- `false`: no sidebar.

`sidebar` can be overridden per page in the frontmatter.

@`sidebarDepth` type=number default=`2`

The maximum heading depth of the sidebar, including the page title heading. It is only used when `sidebar` is `'heading'`. `1` shows the page title and the `h2` headings, `2` also shows the `h3` headings, and so on.

@`sidebarSorter` type=`SidebarSorter` default=`['readme', 'order', 'title', 'filename']`

The comparator of the items generated from the file structure. It accepts a keyword, a function, or an array of them. See [Sorting the items](../../tools/theme-helper.md#sorting-the-items).
::::

### Sidebar items

A sidebar item is a link, or a group that contains items. A group without a link is collapsible; a group with a link renders the link and its children below it.

:::: fields
@`sidebar[*].text` type=string

The text of the item. When it is omitted, the sidebar resolves the text from the page the item links to: the theme saves the page title into the route meta, and the item text becomes that title.

@`sidebar[*].link` type=string

The link of the item. An item without a link is a group.

@`sidebar[*].icon` type=string

The icon of the item, in the same form as `nav[*].icon`. When it is omitted, the sidebar resolves the icon from the route meta of the linked page, so a site can add page icons by writing them into `page.routeMeta.icon` in an `extendsPage` hook.

@`sidebar[*].items` type=`DefaultTheme.SidebarItem[]`

The children of the item. A group can itself contain groups.

@`sidebar[*].collapsed` type=boolean

Whether the group is collapsible. When the field is omitted, the group is not collapsible and its children are always shown. When it is set, the group gets a toggle and starts collapsed if `true`.

@`sidebar[*].base` type=string

The base path prepended to the links of the item and its children, so that child links can be written relatively.

@`sidebar[*].docFooterText` type=string

The text used for this item in the previous/next page footer of a document page, instead of the item text.

@`sidebar[*].rel` type=string

The `rel` attribute of the link.

@`sidebar[*].target` type=string

The `target` attribute of the link.
::::

The multi-sidebar object also accepts `{ items, base }` to set the base of a whole sidebar group, and `'heading'` to use the heading sidebar under that path:

```ts
export default defineUserConfig({
  theme: defaultTheme({
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

### Generate from the file structure

The sidebar can be generated from the file structure of the site. Set `sidebar` to `'structure'` to generate the sidebar of every route scope, use it as a value of the path object to generate the sidebar of the paths, or set `items` of a group to `'structure'` to generate its children only:

```ts title=".vuepress/config.ts"
export default defineUserConfig({
  theme: defaultTheme({
    // the whole site
    sidebar: 'structure',
    // or: only some paths
    // sidebar: { '/guide/': 'structure' },
    // or: only the children of a group
    // sidebar: [{ text: 'Guide', base: '/guide/', items: 'structure' }],
  }),
})
```

The items are read from the pages under the scope, and they are nested by directories. The structure helper reads the following frontmatter fields by default:

- `index: false` hides the page from the sidebar.
- `order` puts the page before (positive) or after (negative) the pages without an order.
- `shortTitle` overrides the item text.
- `icon` sets the item icon.
- the `dir` field of a `README.md` configures the group of its directory: `text`, `icon`, `collapsible`, `expanded`, `link`, `index` and `order`.

```md title="guide/a.md"
---
order: 1
icon: a
---
```

```md title="guide/README.md"
---
dir:
  text: Guide
  icon: guide
  collapsible: true
  expanded: true
---
```

See [theme-helper](../../tools/theme-helper.md#default-frontmatter-mapping) for the default frontmatter mapping, and [Sorting the items](../../tools/theme-helper.md#sorting-the-items) for the `sidebarSorter` option.

::: tip

`'structure'` is only supported in the theme config, not in the frontmatter of a page.

:::

## Page

:::: fields
@`outline` type=`DefaultTheme.Outline | DefaultTheme.Outline['level'] | false` default=`2`

The heading levels shown in the outline of the aside. The default, `2`, shows only the `h2` headings.

It accepts a level (`3`), a range (`[2, 4]`), `'deep'` for `[2, 6]`, or an object with `level` and `label`:

@@`outline.level` type=`number | [number, number] | 'deep'`

The heading levels of the outline.

@@`outline.label` type=string default=`'On this page'`

The title of the outline.

Set `outline` to `false` to remove the outline and the aside entirely. It can be overridden per page in the frontmatter.

@`aside` type=`boolean | 'left'`

Where to render the aside that contains the outline. The default is the right side; `'left'` moves it to the left of the content, and `false` prevents the aside from rendering.

A page always has its aside disabled on the home page, and it can override the theme config in its frontmatter.

@`editLink` type=`DefaultTheme.EditLink`

The "edit this page" link in the document footer. It is disabled when the option is not set.

Its fields are:

@@`editLink.pattern` type=`string | ((payload: ThemePageData) => string)` required

The pattern of the link. In a string pattern, `:path` is replaced by the file path of the page relative to the source directory, for example `'https://github.com/owner/repo/edit/main/docs/:path'`. A function receives the page data and returns the URL, which is useful when the repository or the branch is derived from the page.

@@`editLink.text` type=string default=`'Edit this page'`

The text of the link.

@`lastUpdated` type=`DefaultTheme.LastUpdatedOptions | boolean`

Whether to show the last updated time of the page. It defaults to `true`, and the time comes from `@vuepress/plugin-git`; disable the `git` plugin or set `lastUpdated: false` to hide it.

Pass an object to customize the format:

@@`lastUpdated.text` type=string default=`'Last updated'`

The text shown before the time.

@@`lastUpdated.formatOptions` type=`Intl.DateTimeFormatOptions & { forceLocale?: boolean }`

The `Intl.DateTimeFormat` options used to format the time. The default is `{ dateStyle: 'medium', timeStyle: 'medium' }`. The time is formatted with the language of the page; set `forceLocale: true` to use the page language instead of the browser language.

@`contributors` type=boolean default=`true`

Whether to show the contributors of the page in the document footer. The list comes from `@vuepress/plugin-git`.

@`contributorsText` type=string default=`'Contributors'`

The text shown before the contributor list.

@`docFooter` type=`DefaultTheme.DocFooter`

Customize the labels of the previous/next page links in the document footer.

@@`docFooter.prev` type=`string | boolean` default=`'Previous page'`

The label of the previous page link. Set it to `false` to hide the link.

@@`docFooter.next` type=`string | boolean` default=`'Next page'`

The label of the next page link. Set it to `false` to hide the link.
::::

## Appearance

:::: fields
@`appearance` type=`AppearanceOptions` default=`true`

The color mode of the site. The value is one of:

- `true`: both light and dark mode, following the system preference first; the user can switch.
- `false`: light mode only, and the switch is hidden.
- `'dark'`: dark mode first, and the user can switch.
- `'force-dark'`: dark mode only, and the switch is hidden.
- `'force-auto'`: both modes, always following the system preference, and the switch is hidden.
- an object `{ initialValue: 'dark' }`: dark mode first, and the user can switch. This is the same as `'dark'` and exists for VitePress compatibility.

The chosen mode is stored in `localStorage` under the `vuepress-color-scheme` key, as `'auto'`, `'dark'` or `'light'`. The theme sets the `data-theme` attribute (`'dark'` or `'light'`) on `<html>`, and styles follow that attribute; there is no `dark` class.

For a first paint without a flash, the `appearance` value is also written into the `data-appearance` attribute of the built HTML template, and an inline script resolves the theme before the app loads. See [Styles](./styles.md) for the CSS side.
::::

## Accessibility labels

Every interactive control of the theme has a translatable label. The defaults are English, and the labels are usually translated inside [`locales`](#locale).

:::: fields
@`darkModeSwitchLabel` type=string default=`'Appearance'`

The accessible label of the dark mode switch.

@`lightModeSwitchTitle` type=string default=`'Switch to light theme'`

The tooltip and accessible title of the switch when dark mode is active.

@`darkModeSwitchTitle` type=string default=`'Switch to dark theme'`

The tooltip and accessible title of the switch when light mode is active.

@`sidebarMenuLabel` type=string default=`'Menu'`

The accessible label of the mobile sidebar menu button.

@`returnToTopLabel` type=string default=`'Return to top'`

The label of the return to top action in the mobile outline menu.

@`langMenuLabel` type=string default=`'Change language'`

The accessible label of the language menu button.

@`navMenuLabel` type=string default=`'Main Navigation'`

The accessible label of the main navigation landmarks.

@`mobileMenuLabel` type=string default=`'Menu'`

The accessible label of the mobile menu button.

@`extraMenuLabel` type=string default=`'More options'`

The accessible label of the overflow menu button.

@`skipToContentLabel` type=string default=`'Skip to content'`

The text of the "skip to content" link, which is the first focusable element of the page.
::::

## Locale

:::: fields
@`locales` type=`LocaleConfig<ThemeConfig>`

The theme config of each language. The key is the locale path and the value contains any theme option plus the language information `label`, `lang`, `dir` and `link`.

```ts
export default defineUserConfig({
  locales: {
    '/': { lang: 'en-US', title: 'My Site' },
    '/zh/': { lang: 'zh-CN', title: '我的站点' },
  },
  theme: defaultTheme({
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

See [Locale](./locale.md) for the locale model, the language menu and every built-in text that can be translated.

@`tip` type=string default=`'TIP'`

The title of the `tip` container. It is passed to `@vuepress/plugin-markdown-hint`.

@`warning` type=string default=`'WARNING'`

The title of the `warning` container.

@`danger` type=string default=`'DANGER'`

The title of the `danger` container.

@`important` type=string default=`'IMPORTANT'`

The title of the `important` container.

@`note` type=string default=`'NOTE'`

The title of the `note` container.
::::

## Theme Plugins

:::: fields
@`themePlugins` type=`ThemePluginsOptions`

The options of the plugins wired by the theme. Set a key to `false` to disable the plugin, or to an options object to configure it — the object is merged over the default options the theme passes.

```ts
export default defineUserConfig({
  theme: defaultTheme({
    themePlugins: {
      copyCode: false,
      shiki: { themes: { light: 'vitesse-light', dark: 'vitesse-dark' } },
      markdownHint: { alert: true },
    },
  }),
})
```

See [Plugins](./plugin.md) for every key, its default value and the plugin documentation.
::::
