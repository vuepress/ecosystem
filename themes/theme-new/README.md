# @vuepress/theme-new

An experimental VuePress theme ported from the [VitePress](https://vitepress.dev) default theme.

The theme only ports the **layout and styles** of VitePress: navigation, sidebar, doc outline, home
page, footer and dark mode. Everything else is delegated to the existing ecosystem plugins,
following the same philosophy as `@vuepress/theme-default`.

## Theming conventions

- CSS classes use the `vp-` prefix (`vp-theme-container`, `vp-navbar`, `vp-doc`, …) and reuse the
  design tokens of `@vuepress/theme-default`; see `src/client/theme-default/styles/vars.css`.
- A single `Layout` is registered (plus `NotFound` for the core 404 page). The page type is set with
  the theme's own `type` frontmatter field: `type: home | doc | page | content` (default
  `doc`), and `type: content` renders the page content without the layout shell. The VuePress `layout` frontmatter
  is only used as the layout name (custom layouts and `NotFound`).
- The theme is configured with the VitePress `DefaultTheme.Config` shape (`nav`, `sidebar`,
  `outline`, `socialLinks`, `locales`, `appearance`, …). The options are typed by the
  theme's own `ThemeConfig`, which only contains the supported fields, so VitePress-only
  theme config keys are rejected by the type checker.
- The dark mode state is written as `data-theme="light|dark"` on `<html>` (no `dark` class) and
  persisted in the `vuepress-color-scheme` storage key, which is the ecosystem convention read by
  `@vuepress/helper` and the plugins.

## Feature coverage

The theme decouples features into plugins and only keeps layout-related behaviour:

- **Wired by the theme**: `@vuepress/plugin-theme-data`, `@vuepress/plugin-git` (last updated),
  `@vuepress/plugin-shiki` (`github-light`/`github-dark`), `@vuepress/plugin-copy-code`,
  `@vuepress/plugin-nprogress`, `@vuepress/plugin-medium-zoom`, `@vuepress/plugin-markdown-tab`,
  `@vuepress/plugin-markdown-hint` (hint containers and styles, the theme only overrides its CSS
  variables), `@vuepress/plugin-icon` (iconify icons), `@vuepress/plugin-active-header-links`
  (outline highlight).
- **Configurable plugins**: every plugin wired by the theme can be configured or disabled through
  the `themePlugins` option, e.g. `themePlugins: { icon: { offline: true, scan: {} } }` or
  `themePlugins: { mediumZoom: false, nprogress: false }`.
- **Provided by the user**: any search plugin registering a global `SearchBox`
  (`plugin-slimsearch`, `plugin-orama`, `plugin-flexsearch`, `plugin-docsearch`,
  `plugin-meilisearch`, `plugin-search`).
- **Markdown**: hint containers (`::: tip`, `::: details`, …) are parsed, rendered and styled by
  `@vuepress/plugin-markdown-hint`; the theme only overrides its CSS variables. Code groups are
  provided by `@vuepress/plugin-markdown-tab` (`codeTabs: true`) with the `::: code-tabs` + `@tab`
  syntax.
- **Icons**: `socialLinks` and iconify names in page `features` are rendered by
  `@vuepress/plugin-icon`; icon sets are loaded at runtime by the iconify web component.
- **Sidebar**: `sidebar: 'heading'` generates the sidebar from the page headings (the default), and
  `sidebarDepth` controls how deep the generated headings go.
- **Contributors**: the doc footer lists the contributors of the page, collected by
  `@vuepress/plugin-git`; disable it with `contributors: false`.
- **Containers**: the title text of the hint containers can be customized per locale with the
  `tip` / `warning` / `danger` / `important` / `note` options.

See the documents below for the exact coverage, the implementation trade-offs and the unsupported
VitePress features:

- [Feature overview](./docs/features.md)
- [Equivalents to `@vuepress/theme-default`](./docs/theme-default.md)
- [Feature coverage and plans](./docs/coverage.md)
- [Implementation differences and trade-offs](./docs/differences.md)
- [Unsupported VitePress features](./docs/unsupported.md)

## Usage

```ts
import { slimsearchPlugin } from '@vuepress/plugin-slimsearch'
import { themeNew } from '@vuepress/theme-new'
import { defineUserConfig } from 'vuepress/cli'

export default defineUserConfig({
  plugins: [slimsearchPlugin()],
  theme: themeNew({
    nav: [{ text: 'Guide', link: '/guide/' }],
    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started.html' },
          ],
        },
      ],
    },
  }),
})
```

## Attribution

The theme source is vendored from VitePress. See [LICENSE.vitepress](./LICENSE.vitepress) and
[THIRD-PARTY-NOTICES.md](./THIRD-PARTY-NOTICES.md).
