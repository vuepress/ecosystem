---
url: /ecosystem/themes/default/plugin.md
---
# Plugins

The theme is a layout layer: the navbar, the sidebar, the document page, the home page and the not-found page are provided by the theme, while every feature outside the layout is provided by a plugin. The theme wires those plugins for you, with sensible defaults, so a typical site never installs or configures them itself.

The theme data plugin is always enabled and is not configurable, because the whole theme configuration is delivered to the client through it. Every other plugin can be switched in [`themePlugins`](./config.md#theme-plugins).

## Wired plugins

| Plugin                                 | `themePlugins` key  | Default | Notes                                                          |
| -------------------------------------- | ------------------- | ------- | -------------------------------------------------------------- |
| `@vuepress/plugin-theme-data`          | —                   | enabled | Always enabled.                                                |
| `@vuepress/plugin-copy-code`           | `copyCode`          | `true`  | Scoped to the code blocks in the page content.                 |
| `@vuepress/plugin-git`                 | `git`               | `true`  | Collects the last updated time and the contributors.           |
| `@vuepress/plugin-active-header-links` | `activeHeaderLinks` | `true`  | Keeps the URL hash in sync with the outline.                   |
| `@vuepress/plugin-back-to-top`         | `backToTop`         | `true`  | The back to top button.                                        |
| `@vuepress/plugin-icon`                | `icon`              | `true`  | Iconify assets, loaded at runtime.                             |
| `@vuepress/plugin-medium-zoom`         | `mediumZoom`        | `true`  | Image zoom on the document images.                             |
| `@vuepress/plugin-nprogress`           | `nprogress`         | `true`  | The progress bar on navigation.                                |
| `@vuepress/plugin-seo`                 | `seo`               | `true`  | Only wired when [`hostname`](./config.md#basic-config) is set. |
| `@vuepress/plugin-sitemap`             | `sitemap`           | `true`  | Only wired when [`hostname`](./config.md#basic-config) is set. |

The Markdown plugins — Shiki, Markdown Ext, Markdown Raw, Markdown Hint, Markdown Tab and Links Check — are grouped under [`markdownPlugins`](#markdown-plugins) instead, apart from the plugins above.

Search is not bundled. The navbar renders a `SearchBox` placeholder, which a search plugin fills: [SlimSearch](../../plugins/search/slimsearch.md) for a local index or [DocSearch](../../plugins/search/docsearch.md) for Algolia. See [Search](#search).

## Configuring plugins

A `themePlugins` entry accepts:

* `true` (or leaving it out) — the theme enables the plugin with its own defaults.
* `false` — the plugin is not wired at all, so neither its feature nor its client assets are loaded.
* an object — the plugin is enabled, the object is merged over the defaults the theme passes.

```ts
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  theme: defaultTheme({
    themePlugins: {
      copyCode: { showInMobile: true },
      mediumZoom: { selector: '.vp-doc img' },
      icon: false,
    },
  }),
})
```

Some plugins are enabled by the theme options themselves rather than by `themePlugins` entries:

* `git` receives `updatedTime` and `contributors` from [`lastUpdated`](./config.md#page) and [`contributors`](./config.md#page). When every locale disables the contributors, the git plugin does not collect them.
* `markdownPlugins.hint` receives the [hint container labels](./locale.md#hint-containers) from `tip`, `warning`, `danger`, `important` and `note`.
* `seo` and `sitemap` require [`hostname`](./config.md#basic-config).
* `shiki`, `activeHeaderLinks` and `copyCode` scope their features to the classes the theme renders, so overriding those options may break the integration they rely on.

::: tip
Disabling a plugin does not remove the markup the theme renders for it. For example, `icon: false` only means no icon is resolved, so an icon name stays as text.
:::

## themePlugins

:::: fields
@`themePlugins.copyCode` type=`CopyCodePluginOptions | boolean` default=`true`

Wires [Copy Code](../../plugins/features/copy-code.md). The theme scopes it to the code blocks inside the page content with `selector: '[vp-content] div[class*="language-"] pre'`.

The object is merged over that selector, so it configures the behavior only:

```ts
themePlugins: {
  copyCode: {
    // copy the inline code on double click
    inline: true,
    // show the hint for 3000ms
    duration: 3000,
    showInMobile: true,
  },
}
```

@`themePlugins.git` type=`GitPluginOptions | boolean` default=`true`

Wires [Git](../../plugins/development/git.md). The theme disables the created time and the changelog, and enables the updated time and the contributors according to the theme options.

The object configures the rest:

```ts
themePlugins: {
  git: {
    // show the avatar of the contributors
    contributors: { avatar: true },
    // collect the changelog, which the theme does not render by default
    changelog: { repoUrl: 'https://github.com/vuepress/ecosystem' },
  },
}
```

@`themePlugins.activeHeaderLinks` type=boolean default=`true`

Wires [Active Header Links](../../plugins/development/active-header-links.md) with `headerLinkSelector: '.outline-link'`, so the URL hash follows the outline while scrolling. Only a boolean: the selector is fixed by the theme because it is tied to the outline markup.

@`themePlugins.backToTop` type=`BackToTopPluginOptions | boolean` default=`true`

Wires [Back To Top](../../plugins/features/back-to-top.md). The label of the button comes from the locales of the plugin.

```ts
themePlugins: {
  // show the button after 200px of scrolling, with a progress bar
  backToTop: { threshold: 200, progress: true },
}
```

@`themePlugins.icon` type=`IconPluginOptions | boolean` default=`true`

Wires [Icon](../../plugins/features/icon.md) with `assets: 'iconify'`, i.e. the iconify web component resolved at runtime from the iconify CDN, which is what the navbar, sidebar and feature icons use.

The theme renders the icons through the `VPIcon` component, so the `component` option of the plugin is reserved by the theme and cannot be changed.

```ts
themePlugins: {
  icon: {
    // bundle the icon sets instead of loading them from the CDN
    offline: true,
    // resolve `icon: 'mdi:github'` as `icon: 'github'`
    prefix: 'mdi:',
  },
}
```

@`themePlugins.mediumZoom` type=`MediumZoomPluginOptions | boolean` default=`true`

Wires [Medium Zoom](../../plugins/features/medium-zoom.md).

```ts
themePlugins: {
  mediumZoom: { selector: '.vp-doc img' },
}
```

@`themePlugins.nprogress` type=boolean default=`true`

Wires [NProgress](../../plugins/features/nprogress.md), the progress bar shown on navigation. The plugin takes no options, so only a boolean is accepted. The bar style is themed by the theme CSS.

@`themePlugins.seo` type=`Partial<SeoPluginOptions> | boolean` default=`true`

Wires [SEO](../../plugins/seo/seo.md) when [`hostname`](./config.md#basic-config) is configured. The hostname is passed by the theme and the object adds the rest:

```ts
defaultTheme({
  hostname: 'https://example.com',
  themePlugins: {
    seo: {
      author: { name: 'VuePress' },
      autoDescription: true,
    },
  },
})
```

@`themePlugins.sitemap` type=`Partial<SitemapPluginOptions> | boolean` default=`true`

Wires [Sitemap](../../plugins/seo/sitemap.md) when [`hostname`](./config.md#basic-config) is configured.

```ts
defaultTheme({
  hostname: 'https://example.com',
  themePlugins: {
    sitemap: { changefreq: 'weekly', excludePaths: ['/404.html'] },
  },
})
```

::::

## markdownPlugins

:::: fields
@`markdownPlugins` type=`MarkdownPluginsOptions`

The options of the Markdown plugins wired by the theme. A key accepts `true` (or leaving it out) to enable the plugin with its defaults, `false` to skip the plugin, and an object that is merged over the defaults.

```ts
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  theme: defaultTheme({
    markdownPlugins: {
      shiki: { themes: { light: 'vitesse-light', dark: 'vitesse-dark' } },
      hint: { alert: true },
    },
  }),
})
```

@`markdownPlugins.shiki` type=`ShikiPluginOptions | boolean` default=`true`

Wires [Shiki](../../plugins/markdown/shiki.md) with the `github-light` and `github-dark` themes, which are consumed by the theme CSS as a light and a dark theme at the same time.

Pass a `themes` object to replace them:

```ts
markdownPlugins: {
  shiki: {
    themes: { light: 'vitesse-light', dark: 'vitesse-dark' },
  },
}
```

`markdownPlugins.shiki: false` leaves the code blocks unhighlighted. Pair it with [`@vuepress/plugin-prismjs`](../../plugins/markdown/prismjs.md) if Prism is needed instead.

@`markdownPlugins.linksCheck` type=`LinksCheckPluginOptions | boolean` default=`true`

Wires [Links Check](../../plugins/markdown/links-check.md) with the plugin defaults. The object is the plugin options:

```ts
markdownPlugins: {
  linksCheck: {
    // do not check the anchor links in development
    dev: false,
    // fail the build on a dead link
    build: 'error',
  },
}
```

@`markdownPlugins.ext` type=`MarkdownExtPluginOptions | boolean` default=`true`

Wires [Markdown Ext](../../plugins/markdown/markdown-ext.md) with the `v-pre` container only, i.e. `{ vPre: true }`.

The other Markdown extensions of the plugin are opt-in. `gfm: true` enables the GFM support — footnotes, task lists, soft line breaks and linkified URLs:

```ts
markdownPlugins: {
  ext: { gfm: true },
}
```

@`markdownPlugins.raw` type=`MarkdownRawPluginOptions | boolean` default=`true`

Wires [Markdown Raw](../../plugins/markdown/markdown-raw.md) with `isolateStyles: true`, so the styles of the theme are isolated from the raw content.

@`markdownPlugins.hint` type=`MarkdownHintPluginOptions | boolean` default=`true`

Wires [Markdown Hint](../../plugins/markdown/markdown-hint.md) with `hint: true` and `alert: true`, plus the localized labels of the theme options.

```ts
markdownPlugins: {
  // disable the GFM alerts, keep the containers
  hint: { alert: false },
}
```

@`markdownPlugins.tab` type=`MarkdownTabPluginOptions | boolean` default=`true`

Wires [Markdown Tab](../../plugins/markdown/markdown-tab.md) with `codeTabs: true`. Code tabs work out of the box; the generic `::: tabs` group is opt-in:

```ts
markdownPlugins: {
  tab: { tabs: true },
}
```

::::

## Search

The theme does not ship a search implementation. The navbar renders a `SearchBox` placeholder wherever a search plugin registers one, and the outline, the sidebar and the keyboard shortcut stay owned by the plugin.

```ts
import { slimsearchPlugin } from '@vuepress/plugin-slimsearch'

export default defineUserConfig({
  theme: defaultTheme({}),
  plugins: [slimsearchPlugin()],
})
```

The available search plugins are [SlimSearch](../../plugins/search/slimsearch.md), [DocSearch](../../plugins/search/docsearch.md), [Orama](../../plugins/search/orama.md), [MeiliSearch](../../plugins/search/meilisearch.md), [FlexSearch](../../plugins/search/flexsearch.md) and the legacy [Search](../../plugins/search/search.md).
