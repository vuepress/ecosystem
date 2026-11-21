# @vuepress/theme-new

An experimental VuePress theme ported from the [VitePress](https://vitepress.dev) default theme.

The theme only ports the **layout and styles** of VitePress: navigation, sidebar, doc outline, home
page, footer and dark mode. Everything else is delegated to the existing ecosystem plugins,
following the same philosophy as `@vuepress/theme-default`.

## Theming conventions

- CSS classes use the `vp-` prefix (`vp-theme-container`, `vp-navbar`, `vp-doc`, …) and reuse the
  design tokens of `@vuepress/theme-default`; see `src/client/theme-default/styles/vars.css`.
- A single `Layout` is registered (plus `NotFound` for the core 404 page); the VitePress lowercase
  `layout: home|doc|page` frontmatter is normalized to `Layout` and restored transparently on the
  client, so VitePress page markup keeps working.
- The theme is configured with the VitePress `DefaultTheme.Config` shape (`nav`, `sidebar`,
  `outline`, `socialLinks`, `locales`, `appearance`, …).
- The dark mode state is written as `data-theme="light|dark"` on `<html>` (no `dark` class) and
  persisted in the `vuepress-color-scheme` storage key, which is the ecosystem convention read by
  `@vuepress/helper` and the plugins.

## Feature coverage

The theme decouples features into plugins and only keeps layout-related behaviour:

- **Wired by the theme**: `@vuepress/plugin-theme-data`, `@vuepress/plugin-git` (last updated),
  `@vuepress/plugin-shiki` (`github-light`/`github-dark`), `@vuepress/plugin-copy-code`,
  `@vuepress/plugin-nprogress`, `@vuepress/plugin-markdown-tab`,
  `@vuepress/plugin-markdown-container` (default container markup, styles remapped to the plugin
  class names), `@vuepress/plugin-icon` (iconify icons), `@vuepress/plugin-active-header-links`
  (outline highlight).
- **Provided by the user**: any search plugin registering a global `SearchBox`
  (`plugin-slimsearch`, `plugin-orama`, `plugin-flexsearch`, `plugin-docsearch`,
  `plugin-meilisearch`, `plugin-search`); `plugin-medium-zoom` is an optional addition.
- **Markdown**: custom containers (`::: tip`, `::: details`, …) are parsed and rendered by
  `@vuepress/plugin-markdown-container`; the theme only remaps its styles onto the ported VitePress
  container styles. Code groups are provided by `@vuepress/plugin-markdown-tab`
  (`codeTabs: true`) with the `::: code-tabs` + `@tab` syntax.
- **Icons**: `socialLinks` and iconify names in page `features` are rendered by
  `@vuepress/plugin-icon`; icon sets are loaded at runtime by the iconify web component.

See the documents below for the exact coverage, the implementation trade-offs and the unsupported
VitePress features:

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
