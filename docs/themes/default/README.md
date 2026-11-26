---
icon: palette
---

# theme-default

<NpmBadge package="@vuepress/theme-default" />

The default theme of VuePress. It is a thin layout layer ported from the [VitePress](https://vitepress.dev) default theme: the theme provides the layout and the styles only (navbar, sidebar, doc outline, home page, footer and dark mode), while every other feature is delegated to the ecosystem plugins.

## The former default theme

The theme that used to be published as `@vuepress/theme-default` is now [`@vuepress/theme-classic`](../classic/). The new default theme deliberately keeps the layout and the CSS variable names close to VitePress rather than to the classic theme, so the two themes are not drop-in replacements of each other — see [Migrating from Classic](./migrating-from-classic.md) when you move a site.

## Usage

Install the theme:

```bash
npm i -D @vuepress/theme-default@next
```

Use it in your config:

```ts title=".vuepress/config.ts"
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  theme: defaultTheme({
    siteTitle: 'My Site',
    logo: '/logo.svg',
    navbar: [{ text: 'Guide', link: '/guide/' }],
    sidebar: ['/guide/', '/guide/install'],
    appearance: true,
  }),
})
```

Every option of `defaultTheme()` is described in [Config](./config.md). The theme also accepts a `hostname` option, which is not part of the theme config itself but is required by the SEO and sitemap plugins:

```ts
export default defineUserConfig({
  theme: defaultTheme({
    hostname: 'https://example.com',
  }),
})
```

## Page types

The theme registers a single `Layout` (plus `NotFound` for the 404 page) and decides what to render inside it from the page frontmatter `type` field. The default type is `doc`.

| `type`              | Renders                                                                             |
| ------------------- | ----------------------------------------------------------------------------------- |
| `home`              | `VPHome`: hero, features, and the page content below them                           |
| `doc` (default)     | `VPDoc`: the article with its outline aside, last updated time and prev/next footer |
| `page`              | `VPPage`: the markdown content only, without the doc aside and footer               |
| `content`           | The raw markdown content only, without any layout shell                             |
| any custom `layout` | The layout registered under that name in a client config                            |

See [Frontmatter](./frontmatter.md) for the fields each page type accepts, and [Extending](./extending.md) for custom layouts.

## Where things are configured

| Concern                                               | Configured with          | Page                                                  |
| ----------------------------------------------------- | ------------------------ | ----------------------------------------------------- |
| Navbar, sidebar, outline, edit link, footer, theme UI | `defaultTheme()` options | [Config](./config.md)                                 |
| Page type, home page hero and features, per-page UI   | Page frontmatter         | [Frontmatter](./frontmatter.md)                       |
| Bundled plugins and their switches                    | `themePlugins`           | [Plugins](./plugin.md)                                |
| UI texts and per-language options                     | `locales`                | [Locale](./locale.md)                                 |
| Exported components, team and sponsor sections        | Client API               | [Built-in Components](./components.md)                |
| Markdown syntax                                       | Bundled plugins          | [Markdown](./markdown.md)                             |
| CSS variables, user styles                            | Plain CSS                | [Styles](./styles.md)                                 |
| Custom layouts and layout slots                       | `.vuepress/client.ts`    | [Extending](./extending.md)                           |
| Migration from the classic theme                      | —                        | [Migrating from Classic](./migrating-from-classic.md) |

## Wired plugins

The theme wires the following plugins automatically. Each of them can be disabled with `false` or configured with an options object through `themePlugins`; see [Plugins](./plugin.md).

| Plugin                                 | `themePlugins` key  | Default                               |
| -------------------------------------- | ------------------- | ------------------------------------- |
| `@vuepress/plugin-theme-data`          | —                   | Always enabled                        |
| `@vuepress/plugin-copy-code`           | `copyCode`          | Enabled                               |
| `@vuepress/plugin-git`                 | `git`               | Enabled                               |
| `@vuepress/plugin-shiki`               | `shiki`             | Enabled, `github-light`/`github-dark` |
| `@vuepress/plugin-markdown-hint`       | `markdownHint`      | Enabled, `hint` and `alert`           |
| `@vuepress/plugin-markdown-tab`        | `markdownTab`       | Enabled, `codeTabs`                   |
| `@vuepress/plugin-markdown-ext`        | `markdownExt`       | Enabled, `vPre`                       |
| `@vuepress/plugin-markdown-raw`        | `markdownRaw`       | Enabled, style isolation on           |
| `@vuepress/plugin-active-header-links` | `activeHeaderLinks` | Enabled                               |
| `@vuepress/plugin-icon`                | `icon`              | Enabled, `assets: 'iconify'`          |
| `@vuepress/plugin-medium-zoom`         | `mediumZoom`        | Enabled                               |
| `@vuepress/plugin-nprogress`           | `nprogress`         | Enabled                               |
| `@vuepress/plugin-back-to-top`         | `backToTop`         | Enabled                               |
| `@vuepress/plugin-links-check`         | `linksCheck`        | Enabled                               |
| `@vuepress/plugin-seo`                 | `seo`               | Only with `hostname`                  |
| `@vuepress/plugin-sitemap`             | `sitemap`           | Only with `hostname`                  |

::: tip Search is not bundled
A theme cannot choose a search backend for a site, so search is not part of the theme. Install `@vuepress/plugin-slimsearch` (local search) or `@vuepress/plugin-docsearch` (Algolia) and register it in `plugins`; the navbar renders the globally registered `SearchBox` component automatically.
:::

## Client API

The node entry (`@vuepress/theme-default`) exports `defaultTheme` together with the types describing the theme: `ThemeOptions`, `ThemeConfig`, `ThemeLayout`, `ThemePageData`, `ThemePluginsOptions`, `ThemeContributor`, `AppearanceOptions`, and the types of the nav items, sidebar items, outline, footer, team members, and so on (`NavItem`, `SidebarItem`, `Outline`, `Footer`, `TeamMember`, ...).

The client entry (`@vuepress/theme-default/client`) exports the built-in components and composables. Importing it also loads the theme styles and the Inter webfont.

Components: `VPBadge`, `VPButton`, `VPDocAsideSponsors`, `VPDocFooterContributors`, `VPFeatures`, `VPHomeContent`, `VPHomeFeatures`, `VPHomeHero`, `VPHomeSponsors`, `VPImage`, `VPLink`, `VPNavBarSearch`, `VPSocialLink`, `VPSocialLinks`, `VPSponsors`, `VPTeamMembers`, `VPTeamPage`, `VPTeamPageSection`, `VPTeamPageTitle`, `VPThemeIcon`.

Composables and helpers: `useContributors`, `useLayout`, `usePageIsNotFound`, `usePageLastUpdated`, `usePageRelativePath`, `usePageType`, `useThemeData`, `useThemeLocaleData`, `useThemePageData`, `useThemePageFrontmatter`, `useThemeLocalePath`, `useThemeLocales`, `useRuntimeBase`, `useDarkMode`, `createDarkModeRef`, `themeDarkModeSymbol`, `COLOR_MODE_STORAGE_KEY`.

See [Built-in Components](./components.md) for the component props and [Extending](./extending.md) for the layout state returned by `useLayout`.

## Next

- [Config](./config.md) — every theme option.
- [Frontmatter](./frontmatter.md) — page types and home page.
- [Plugins](./plugin.md) — the bundled plugins and their switches.
- [Markdown](./markdown.md) — the Markdown extensions the theme enables.
- [Styles](./styles.md) — CSS variables and user styles.
- [Locale](./locale.md) — multi-language sites.
- [Extending](./extending.md) — custom layouts and slots.
- [Migrating from Classic](./migrating-from-classic.md) — move a site from `@vuepress/theme-classic`.
- [Differences from VitePress](./differences.md) — how the theme differs from VitePress.
