---
icon: palette
---

# theme-default

<NpmBadge package="@vuepress/theme-default" />

The default theme of VuePress. It is a thin layout layer ported from the [VitePress](https://vitepress.dev) default theme: the theme provides the layout and the styles only (navbar, sidebar, doc outline, home page, footer and dark mode), while every other feature is delegated to the ecosystem plugins.

::: tip The former default theme
The former default theme is now published as [`@vuepress/theme-classic`](../classic/).
:::

## Usage

Install the theme:

```bash
npm i -D @vuepress/theme-default@next
```

Use it in your config:

```ts title=".vuepress/config.ts"
import { themeDefault } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  theme: themeDefault({
    // site title, logo, nav, sidebar, ...
  }),
})
```

## Page types

The theme registers a single `Layout` (plus the built-in `NotFound` page for the 404 page) and uses the frontmatter `type` to decide what to render inside it:

| `type`    | Renders                                                |
| --------- | ------------------------------------------------------ |
| `home`    | Home page: hero, feature grid, home content            |
| `doc`     | Document page (default): article, outline, footer, nav |
| `page`    | Blank page container without the doc helpers           |
| `content` | Page content only, without the layout shell            |

Custom layouts still work as usual: register a layout and set `layout: MyLayout` in the frontmatter.

## Configuration

```ts title=".vuepress/config.ts"
import { themeDefault } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  theme: themeDefault({
    siteTitle: 'My Docs',
    logo: '/logo.svg',
    nav: [
      { text: 'Guide', link: '/guide/' },
      {
        text: 'Plugins',
        items: [{ text: 'Shiki', link: '/plugins/shiki/' }],
      },
    ],
    sidebar: {
      '/guide/': [
        { text: 'Getting Started', link: '/guide/getting-started.md' },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuepress/ecosystem' },
    ],
    appearance: true,
    outline: { level: [2, 3] },
  }),
})
```

The theme options are typed by the theme's own `ThemeConfig`, which only contains the fields the theme actually implements. See [Features](./features.md) for what it provides, and [Equivalents to `@vuepress/theme-classic`](./classic.md) for the mapping from the former default theme.

## Wired plugins

The theme enables a set of ecosystem plugins, each of which can be configured or disabled through the `themePlugins` option:

| Plugin                                 | Default                                  |
| -------------------------------------- | ---------------------------------------- |
| `@vuepress/plugin-theme-data`          | Enabled                                  |
| `@vuepress/plugin-copy-code`           | Enabled                                  |
| `@vuepress/plugin-git`                 | Enabled (last update, contributors)      |
| `@vuepress/plugin-shiki`               | Enabled (`github-light` / `github-dark`) |
| `@vuepress/plugin-nprogress`           | Enabled                                  |
| `@vuepress/plugin-medium-zoom`         | Enabled                                  |
| `@vuepress/plugin-icon`                | Enabled (`assets: 'iconify'`)            |
| `@vuepress/plugin-active-header-links` | Enabled                                  |
| `@vuepress/plugin-markdown-hint`       | Enabled                                  |
| `@vuepress/plugin-markdown-tab`        | Enabled (code tabs)                      |
| `@vuepress/plugin-markdown-ext`        | Enabled (`v-pre`)                        |
| `@vuepress/plugin-markdown-raw`        | Enabled (`raw`, style isolation)         |

Search is not bundled: install one of the search plugins and the navbar will mount its search box automatically.

## API

- Node entry: `themeDefault(options)`, and the types `ThemeOptions`, `ThemeConfig`, `ThemeLayout`, `ThemePageData`, `ThemePluginsOptions`.
- Client entry (`@vuepress/theme-default/client`): the `Layout` default export, the `VP*` components, `useLayout()`, `usePageType()`, the page data composables (`useThemePageData()`, `useThemePageFrontmatter()`, `usePageRelativePath()`, `usePageLastUpdated()`, `usePageIsNotFound()`), `useThemeLocalePath()`, `useThemeLocales()`, `useDarkMode()` and its helpers.

## Next

- [Features](./features.md)
- [Differences from VitePress](./differences.md)
- [Equivalents to `@vuepress/theme-classic`](./classic.md)
