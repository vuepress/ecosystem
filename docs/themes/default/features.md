---
icon: sparkles
---

# Features

The default theme is a thin layout layer: the theme only provides the layout and the styles, and delegates the rest to the existing ecosystem plugins. This page lists what the theme provides and which plugin provides each feature.

Related pages:

- [Equivalents to `@vuepress/theme-classic`](./classic.md): how the options of the former default theme map to this theme.
- [Differences from VitePress](./differences.md): what is implemented differently, and why.

## Layout and page types

| Feature        | Provided by           | Description                                                                                              |
| -------------- | --------------------- | -------------------------------------------------------------------------------------------------------- |
| Layout shell   | Theme                 | Only `Layout` and `NotFound` are registered. `Layout` contains the navbar, sidebar, content and footer   |
| Page types     | Theme                 | Frontmatter `type: home \| doc \| page \| content`, defaults to `doc`                                    |
| 404 page       | VuePress core + theme | VuePress creates `/404.html` and resolves it to `NotFound`; the theme renders it inside the layout shell |
| Custom layouts | VuePress core         | Use a registered layout with frontmatter `layout: CommentPage`                                           |

The `type` values:

- `home`: the home page, renders the hero and the feature grid.
- `doc`: a document page (default), renders the article, the outline and the page footer.
- `page`: a blank page container, without the document page helpers.
- `content`: renders the page content only, without the layout shell.

## Navbar

| Feature              | Provided by    | Description                                                                |
| -------------------- | -------------- | -------------------------------------------------------------------------- |
| Site title/logo      | Theme          | `siteTitle`, `logo`, `logoLink`                                            |
| Navigation menu      | Theme          | `nav`, with dropdown groups and external links                             |
| Language menu        | Theme          | Generated from the theme `locales`                                         |
| Appearance switch    | Theme          | The light/dark switch, labelled by `darkModeSwitchLabel` etc.              |
| Search entry         | Plugin + theme | The theme only mounts the global `SearchBox` registered by a search plugin |
| Mobile menu          | Theme          | Hamburger button and full-screen menu                                      |
| Accessibility labels | Theme          | `navMenuLabel`, `mobileMenuLabel`, `skipToContentLabel`, etc.              |

## Sidebar and document page

| Feature           | Provided by    | Description                                                                                                                                                         |
| ----------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sidebar           | Theme          | `sidebar` accepts an array or a path-keyed record, with collapsible groups and active-item highlighting; defaults to `'heading'`, `sidebarDepth` controls the depth |
| Page contributors | Plugin + theme | Collected by `@vuepress/plugin-git`, rendered in the doc footer, configurable by `contributors` / `contributorsText`                                                |
| Outline           | Theme          | `outline` controls the heading levels and the label (`outline.level` defaults to `2`); the active heading is driven by `@vuepress/plugin-active-header-links`       |
| Previous/next     | Theme          | Labels configured by `docFooter`, derived from the sidebar order by default                                                                                         |
| Edit link         | Theme          | `editLink.pattern` and `editLink.text`; `:path` is replaced with the page source path                                                                               |
| Last updated      | Plugin + theme | `@vuepress/plugin-git` provides the time, the theme renders it, `lastUpdated` configures the label and format                                                       |
| Body styles       | Theme          | Document typography, tables, code block shells, heading anchors and the content spacing                                                                             |

## Home page

| Feature      | Provided by | Description                                                                                                                          |
| ------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Hero         | Theme       | Frontmatter `hero`: `name`, `text`, `tagline`, `image`, `actions`                                                                    |
| Features     | Theme       | Frontmatter `features`: `icon` (emoji, image or Iconify name), `title`, `details`                                                    |
| Team         | Theme       | Composed with the exported `VPTeamPage` / `VPTeamPageTitle` / `VPTeamPageSection` / `VPTeamMembers` components; no frontmatter field |
| Sponsors     | Theme       | Composed with the exported `VPSponsors` / `VPHomeSponsors` / `VPDocAsideSponsors` components; no frontmatter field                   |
| Home content | Theme       | The Markdown body of the home page is rendered after the hero and the features                                                       |

## Footer and 404

| Feature            | Provided by | Description                                                        |
| ------------------ | ----------- | ------------------------------------------------------------------ |
| Footer             | Theme       | `footer.message`, `footer.copyright`                               |
| 404 texts and link | Theme       | `notFound.title`, `quote`, `link`, `linkText`, `linkLabel`, `code` |

## Dark mode

| Feature              | Provided by | Description                                                                                                      |
| -------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------- |
| Color mode           | Theme       | Uses `<html data-theme="light \| dark">` only, no `dark` class                                                   |
| No first-paint flash | Theme       | The build writes `appearance` into `data-appearance`, the inline script sets `data-theme` before the first paint |
| Persistence          | Theme       | Stored in `localStorage` under `vuepress-color-scheme`                                                           |
| Plugin interop       | Theme       | The state is exposed through `darkModeSymbol` from `@vuepress/helper/client`                                     |

`appearance` accepts `true` (default, follow the system preference and switchable), `'dark'` (start dark, switchable), `false` (always light), `'force-dark'` / `'force-auto'` (fixed dark / fixed system preference, switch hidden), or a `useDark` options object (only `initialValue: 'dark'` is read).

## Internationalization

A multilingual site must declare its languages in the VuePress site `locales` (the VuePress i18n model); the theme `locales` only provide theme-level configuration per language (title, nav, sidebar, texts, ...).

| Feature         | Provided by    | Description                                                                            |
| --------------- | -------------- | -------------------------------------------------------------------------------------- |
| Theme locales   | Plugin + theme | Theme data is merged by the route language, `locales` overrides the root configuration |
| Language menu   | Theme          | Built from the theme `locales`, based on the route language from the site `locales`    |
| Language switch | Theme          | Switches to the same page in the target language, keeping the query and the hash       |

## Markdown extensions

| Feature            | Provided by                                                       | Description                                                                                                                                                                                                                                                                  |
| ------------------ | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hint containers    | `@vuepress/plugin-markdown-hint`                                  | `::: tip`, `info`, `note`, `warning`, `caution`, `important`, `details`, with `{no-title}` support; `danger` is rendered as `caution`; labels can be overridden per language with the `tip` / `warning` / `danger` / `important` / `note` theme options                      |
| Code tabs          | `@vuepress/plugin-markdown-tab`                                   | `::: code-tabs` + `@tab`, with styles matching the theme                                                                                                                                                                                                                     |
| Heading anchors    | Theme                                                             | The heading text is rendered inside the anchor link, following the VuePress heading DOM                                                                                                                                                                                      |
| External link icon | Theme                                                             | `externalLinkIcon`                                                                                                                                                                                                                                                           |
| `v-pre` / `raw`    | `@vuepress/plugin-markdown-ext` + `@vuepress/plugin-markdown-raw` | `v-pre` comes from markdown-ext (`vPre: true`), `raw` comes from markdown-raw; the theme enables style isolation for `raw` by default and lets links inside it bypass the SPA router; configure or disable them with `themePlugins.markdownExt` / `themePlugins.markdownRaw` |

## Plugin capabilities

| Capability               | Plugin                                                                                                                        | Default                                                        |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Search                   | `@vuepress/plugin-slimsearch`, `plugin-orama`, `plugin-flexsearch`, `plugin-search`, `plugin-docsearch`, `plugin-meilisearch` | Installed by the site, mounted by the theme                    |
| Copy code                | `@vuepress/plugin-copy-code`                                                                                                  | Enabled                                                        |
| Progress bar             | `@vuepress/plugin-nprogress`                                                                                                  | Enabled                                                        |
| Image zoom               | `@vuepress/plugin-medium-zoom`                                                                                                | Enabled                                                        |
| Icons                    | `@vuepress/plugin-icon`                                                                                                       | Enabled, `themePlugins.icon` can pass options or disable it    |
| Code highlighting        | `@vuepress/plugin-shiki`                                                                                                      | Enabled, `github-light` / `github-dark`                        |
| Last update              | `@vuepress/plugin-git`                                                                                                        | Enabled, the time only; contributors are rendered by the theme |
| Theme data               | `@vuepress/plugin-theme-data`                                                                                                 | Enabled                                                        |
| Active heading           | `@vuepress/plugin-active-header-links`                                                                                        | Enabled                                                        |
| Back to top              | `@vuepress/plugin-back-to-top`                                                                                                | Enabled, label from the plugin locales (`backToTop`)           |
| Links check              | `@vuepress/plugin-links-check`                                                                                                | Enabled                                                        |
| SEO                      | `@vuepress/plugin-seo`                                                                                                        | Enabled once `hostname` is configured                          |
| Sitemap                  | `@vuepress/plugin-sitemap`                                                                                                    | Enabled once `hostname` is configured                          |
| Markdown hint containers | `@vuepress/plugin-markdown-hint`                                                                                              | Enabled                                                        |
| Markdown tabs            | `@vuepress/plugin-markdown-tab`                                                                                               | Enabled, for `code-tabs`                                       |

## Theme options

The theme options are defined by the theme's own `ThemeConfig` type, which only contains the fields the theme really supports. See [`ThemeConfig`](https://github.com/vuepress/ecosystem/blob/main/themes/theme-default/src/shared/types.ts) and [Equivalents to `@vuepress/theme-classic`](./classic.md).

`themePlugins` configures or disables the wired plugins one by one:

```ts
themeDefault({
  hostname: 'https://example.com',
  themePlugins: {
    icon: { offline: true, scan: {} },
    mediumZoom: false,
    nprogress: false,
  },
})
```

`hostname` makes the theme wire the SEO and sitemap plugins automatically; set `themePlugins.seo` / `themePlugins.sitemap` to `false` to keep the others only.

Custom styles go to the `userStyle: '.vuepress/styles/index.css'` entry registered by the theme: write CSS variables or rules there to override the look (the equivalent of `palettePlugin` / `userStyle` in `@vuepress/theme-classic`).

## Public API

Node entry (`@vuepress/theme-default`):

- `themeDefault(options)`: creates the theme.
- Types: `ThemeOptions`, `ThemeConfig`, `ThemeLayout`, `ThemePageData`, `ThemePluginsOptions`, `ThemeContributor`, `AppearanceOptions`.

Client entry (`@vuepress/theme-default/client`):

- The default export (`Layout`, `enhanceApp`) and the `VP*` components (`VPBadge`, `VPButton`, `VPFeatures`, `VPSocialLinks`, ...). `NotFound` is internal and rendered by `VPContent`.
- `useLayout()`: the layout state, including whether the page is a home page, has a sidebar or an outline.
- `usePageType()`: the current page `type`, defaulting to `doc`.
- Page data composables: `useThemePageData()`, `useThemePageFrontmatter()`, `usePageRelativePath()`, `usePageLastUpdated()`, `usePageIsNotFound()`.
- `useContributors()`: the contributors of the current page.
- i18n: `useThemeLocalePath()`, `useThemeLocales()`; `useThemeData()` / `useThemeLocaleData()` are re-exported from `@vuepress/plugin-theme-data/client`.
- Dark mode: `useDarkMode()`, `themeDarkModeSymbol`, `COLOR_MODE_STORAGE_KEY`, `createDarkModeRef()`.
- `useRuntimeBase()`: the runtime site base.

## Build and first paint

- Template: `templates/build.html`, which injects `data-appearance`, `lang` and the VuePress SSR outlet.
- Client build: `tsdown` in `unbundle` mode, keeping the `.vue` components and the CSS assets for the site bundler to compile.
- Styles: the VitePress default theme styles adapted with `vp-` classes and `data-theme`; the theme additionally imports the `@vuepress/helper/colors.css` palette.
