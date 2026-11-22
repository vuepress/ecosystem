# @vuepress/theme-default

The default theme of VuePress. It is a thin layout layer ported from the
[VitePress](https://vitepress.dev) default theme: the theme only provides the **layout and styles**
(navigation, sidebar, doc outline, home page, footer and dark mode), while everything else is
delegated to the existing ecosystem plugins, following the same philosophy as the former default
theme, which is now published as `@vuepress/theme-classic`.

## Theming conventions

- CSS classes use the `vp-` prefix (`vp-theme-container`, `vp-navbar`, `vp-doc`, …). The theme
  defines its own token set, and the token names are compatible with `@vuepress/theme-classic`, so
  ecosystem plugins that style themselves against those names keep working; see
  `src/client/theme-default/styles/vars.css`.
- A single `Layout` is registered (plus `NotFound` for the core 404 page). The page type is set with
  the theme's own `type` frontmatter field: `type: home | doc | page | content` (default
  `doc`), and `type: content` renders the page content without the layout shell. The VuePress `layout` frontmatter
  is only used as the layout name (custom layouts and `NotFound`).
- The theme is configured with its own `ThemeConfig`, whose shapes and semantics follow
  `@vuepress/theme-classic`: `nav`, `sidebar`, `outline`, `socialLinks`, `locales`, `appearance`, …
  The type only contains the supported fields, so VitePress-only theme config keys are rejected by
  the type checker. See [the equivalents to `@vuepress/theme-classic`](./docs/classic.md).
- The dark mode state is written as `data-theme="light|dark"` on `<html>` (no `dark` class) and
  persisted in the `vuepress-color-scheme` storage key. The theme's `useDarkMode()` and the build
  template read the key, and it is the same key that `@vuepress/test-utils` drives in tests.

## Feature coverage

The theme decouples features into plugins and only keeps layout-related behaviour:

- **Wired by the theme**: `@vuepress/plugin-theme-data`, `@vuepress/plugin-git` (last updated),
  `@vuepress/plugin-shiki` (`github-light`/`github-dark`), `@vuepress/plugin-copy-code`,
  `@vuepress/plugin-nprogress`, `@vuepress/plugin-medium-zoom`, `@vuepress/plugin-markdown-tab`,
  `@vuepress/plugin-markdown-hint` (hint containers and styles, the theme only overrides its CSS
  variables), `@vuepress/plugin-icon` (iconify icons), `@vuepress/plugin-active-header-links`
  (outline highlight), `@vuepress/plugin-markdown-ext` (`v-pre` container),
  `@vuepress/plugin-markdown-raw` (`raw` container).
- **Configurable plugins**: every plugin wired by the theme can be disabled through the
  `themePlugins` option; plugins that accept options also accept an object, e.g.
  `themePlugins: { icon: { offline: true, scan: {} } }` or
  `themePlugins: { mediumZoom: false, nprogress: false }` (`activeHeaderLinks` and `nprogress` are
  boolean switches only).
- **Provided by the user**: any search plugin registering a global `SearchBox`
  (`plugin-slimsearch`, `plugin-orama`, `plugin-flexsearch`, `plugin-docsearch`,
  `plugin-meilisearch`, `plugin-search`).
- **Markdown**: hint containers (`::: tip`, `::: details`, …) are parsed, rendered and styled by
  `@vuepress/plugin-markdown-hint`; the theme only overrides its CSS variables. Code groups are
  provided by `@vuepress/plugin-markdown-tab` (`codeTabs: true`) with the `::: code-tabs` + `@tab`
  syntax. The `v-pre` container is provided by `@vuepress/plugin-markdown-ext`; the `raw` container
  is provided by `@vuepress/plugin-markdown-raw`, with the style isolation enabled by default (it is
  opt-in in VitePress) and the links inside the container kept out of the SPA router.
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
- [Equivalents to `@vuepress/theme-classic`](./docs/classic.md)
- [Feature coverage and plans](./docs/coverage.md)
- [Implementation differences and trade-offs](./docs/differences.md)
- [Unsupported VitePress features](./docs/unsupported.md)

## Usage

```ts
import { slimsearchPlugin } from '@vuepress/plugin-slimsearch'
import { themeDefault } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'

export default defineUserConfig({
  plugins: [slimsearchPlugin()],
  theme: themeDefault({
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
