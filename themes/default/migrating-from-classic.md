---
url: /ecosystem/themes/default/migrating-from-classic.md
---
# Migrating from Classic

`@vuepress/theme-classic` is the theme that used to be the default theme of VuePress. It still works and it keeps its own look, but the new default theme is `@vuepress/theme-default`, a thin layout layer ported from VitePress.

This page maps the options, the frontmatter and the styles of the classic theme to the new theme. The new theme accepts the classic syntax of the navbar and the sidebar directly — string items, `prefix`, `children` and `collapsible` are normalized at build time — so most sites only need the package swap. The classic theme options are accepted as well: they are mapped to their new counterparts at build time and log a deprecation warning once, so the migration can be done one option at a time. The tables below show the replacement of every option; options that have no new counterpart are marked as such. Styles were SASS, and they are CSS custom properties now.

## Update the Package

Replace the package of the theme and the import of the factory:

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

The new theme keeps the `defaultTheme` export name, so an existing `import { defaultTheme } from '@vuepress/theme-default'` keeps working after the upgrade. The layout and the theme options change, so migrate them as described below.

## Migrate the Theme Options

### General

| Classic            | New                       | Notes                                                                                                                                                            |
| ------------------ | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `hostname`         | `hostname`                | Same. It enables the SEO and the sitemap plugins.                                                                                                                |
| `locales`          | `locales`                 | Add `label`, `lang` and `link` to each locale, since they drive the language menu.                                                                               |
| `colorMode`        | `appearance`              | Mapped at build time, see [Color Mode](#color-mode). Logs a deprecation warning.                                                                                 |
| `logo`             | `logo`                    | A string, or a `ThemeableImage` object.                                                                                                                          |
| `logoDark`         | `logo: { light, dark }`   | The dark variant of the logo.                                                                                                                                    |
| `logoAlt`          | `logo: { alt }`           | The alternative text of the logo.                                                                                                                                |
| `home`             | `logoLink`                | The link of the logo in the navbar, and the home page of the site. The 404 button uses `notFound.link`.                                                          |
| `repo`             | `socialLinks`             | Accepted and mapped at build time. A brand icon is added automatically for GitHub, GitLab, Gitee and Bitbucket, so `socialLinks` is only needed for other hosts. |
| `repoLabel`        | `socialLinks[].ariaLabel` | The label of the repository link. It defaults to the repository type, such as `GitHub`.                                                                          |
| `navbar`           | `navbar`                  | Same key and same item syntax. See [Navbar](#navbar).                                                                                                            |
| `sidebar`          | `sidebar`                 | Same key and same item syntax. The default is now `false`. See [Sidebar](#sidebar).                                                                              |
| `externalLinkIcon` | `externalLinkIcon`        | Same, defaults to `false`.                                                                                                                                       |
| `themePlugins`     | `themePlugins`            | See [Theme Plugins](#theme-plugins).                                                                                                                             |

### Navbar

The navbar keeps the `navbar` key and the classic item syntax: string items, `children`, `prefix` and `activeMatch` are normalized at build time. `navbar: false` hides the navbar.

| Classic                      | New                              | Notes                                                                               |
| ---------------------------- | -------------------------------- | ----------------------------------------------------------------------------------- |
| `navbar: []` (default)       | `navbar` omitted                 | Both render a navbar without items.                                                 |
| `navbar: false`              | `navbar: false`                  | Hides the navbar itself.                                                            |
| `'/guide/'` (a string entry) | same                             | The text is resolved from the title of the page at runtime.                         |
| `{ text, link }`             | same                             | Same.                                                                               |
| `{ text, children }`         | same, or `{ text, items }`       | `children` is a deprecated alias of `items`.                                        |
| `{ text, prefix, children }` | same, or `{ text, base, items }` | `prefix` is a deprecated alias of `base`. The base applies to the child links only. |
| `{ text, activeMatch }`      | same                             | Same, as a regular expression string.                                               |
| `{ text, ariaLabel }`        | —                                | Not supported; add an `icon` or keep the text.                                      |
| —                            | `{ exact }`                      | Makes the item active only on the exact page of its link.                           |
| —                            | `{ component, props }`           | Renders a custom component in the navbar.                                           |
| —                            | `socialLinks`                    | The social links are separate from the navbar items.                                |

`navbarLabel` and `pageNavbarLabel` were the accessible labels of the navigation. Use `navMenuLabel` for the navbar; the page navbar no longer has a label of its own.

### Sidebar

The sidebar keeps the `sidebar` key and the classic item syntax, including string items, `children`, `prefix` and `collapsible`. The default is `false`, so a site without a sidebar config no longer generates the heading sidebar. The `'heading'` mode and the `sidebarDepth` option are removed: use `@vuepress/plugin-toc` for a table of contents.

| Classic                                | New                              | Notes                                                                     |
| -------------------------------------- | -------------------------------- | ------------------------------------------------------------------------- |
| `'/guide/'` (a string entry)           | same                             | The text is resolved from the title of the page at runtime.               |
| `{ text, link }`                       | same                             | Same.                                                                     |
| `{ text, children }`                   | same, or `{ text, items }`       | `children` is a deprecated alias of `items`.                              |
| `{ text, prefix, children }`           | same, or `{ text, base, items }` | `prefix` is a deprecated alias of `base`.                                 |
| `{ text, collapsible }`                | same                             | `expanded: true` makes the group start expanded.                          |
| `{ text, collapsed }`                  | —                                | Removed; use `collapsible` with `expanded`.                               |
| `{ text, ariaLabel }`                  | —                                | Not supported.                                                            |
| —                                      | `{ icon }`                       | The icon of the item.                                                     |
| —                                      | `{ activeMatch, exact }`         | Control when the item is active.                                          |
| —                                      | `{ docFooterText }`              | The text used by the previous/next links.                                 |
| sidebar object keyed by the page paths | same                             | Each value can be an array, `false`, `'structure'`, or `{ items, base }`. |

### Document Footer

| Classic            | New                            | Notes                                                                                 |
| ------------------ | ------------------------------ | ------------------------------------------------------------------------------------- |
| `editLink`         | `editLink`                     | `false` disables the link. `true` is mapped to a pattern from the repository options. |
| `editLinkText`     | `editLink.text`                | Accepted and mapped at build time.                                                    |
| `editLinkPattern`  | `editLink.pattern`             | Accepted and mapped at build time. `:path` is the only placeholder.                   |
| `docsRepo`         | `getEditLinkPattern({ repo })` | Accepted and mapped at build time. The helper builds the pattern outside the config.  |
| `docsBranch`       | —                              | Accepted and mapped into the pattern at build time.                                   |
| `docsDir`          | —                              | Accepted and mapped into the pattern at build time.                                   |
| `lastUpdated`      | `lastUpdated`                  | Same, or an object with `text` and `formatOptions`.                                   |
| `lastUpdatedText`  | `lastUpdated.text`             | Defaults to `'Last updated'`.                                                         |
| `contributors`     | `contributors`                 | Same, defaults to `true`.                                                             |
| `contributorsText` | `contributorsText`             | Same, defaults to `'Contributors'`.                                                   |
| `prev`             | `docFooter.prev`               | A string label, or `false` to hide the previous link.                                 |
| `next`             | `docFooter.next`               | A string label, or `false` to hide the next link.                                     |

### Color Mode

| Classic              | New                                                        |
| -------------------- | ---------------------------------------------------------- |
| `colorMode: 'auto'`  | `appearance: true`                                         |
| `colorMode: 'light'` | `appearance: { initialValue: 'light' }`                    |
| `colorMode: 'dark'`  | `appearance: 'dark'`                                       |
| —                    | `appearance: 'force-dark'` (always dark)                   |
| —                    | `appearance: 'force-auto'` (follows the system, no switch) |

`colorModeSwitch: false` is mapped at build time: with `colorMode: 'light'` it becomes `appearance: false`, with `'dark'` it becomes `'force-dark'`, and without `colorMode` it becomes `'force-auto'`. The switch is hidden when the appearance is fixed.

The storage key is still `vuepress-color-scheme`, but the dark mode is now driven by the `data-theme` attribute on `<html>` rather than a `dark` class. A stylesheet that targets `.dark` must target `[data-theme='dark']`.

### Home Page and 404

Other than `home`, the classic home keys keep their names. `home: true` is deprecated in favor of `type: home` and logs a warning; the flat fields below are read as the matching `hero` fields. The nested `hero` shape is still available and takes precedence when both are set. `heroHeight` is not configurable.

| Classic (frontmatter)           | New (frontmatter)                                      | Notes                                                                     |
| ------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------- |
| `home: true`                    | `type: home`                                           | `home: true` is still accepted, but deprecated and logs a warning.        |
| `heroImage`                     | `heroImage`                                            | A string, or `{ src }` when using `hero.image`.                           |
| `heroImageDark`                 | `heroImageDark`                                        | The dark variant of the image.                                            |
| `heroAlt`                       | `heroAlt`                                              | The alternative text.                                                     |
| `heroHeight`                    | —                                                      | Not configurable.                                                         |
| `heroText`                      | `heroText`                                             | The name of the project.                                                  |
| `tagline`                       | `tagline`                                              | The text of the hero.                                                     |
| `actions[{ text, link, type }]` | `actions[{ text, link, type }]`                        | `type: 'primary'` is supported, and `theme: 'brand' \| 'alt'` also works. |
| `features[{ title, details }]`  | `features[{ title, details }]`                         | The new items also accept `icon`, `link` and `linkText`.                  |
| `footer`                        | `footer`                                               | A string renders the page footer; a boolean controls the site footer.     |
| `footerHtml`                    | `footerHtml`                                           | Whether to render the string footer as HTML.                              |
| `notFound` (string array)       | `notFound` (object)                                    | See below.                                                                |
| `backToHome`                    | `notFound.linkText`                                    | Defaults to `'Take me home'`.                                             |
| —                               | `notFound.title`, `quote`, `link`, `linkLabel`, `code` | The pieces of the 404 page.                                               |

The classic theme rendered one of the messages of `notFound` at random. The new theme has a single `quote`, so pick one of the former messages:

```ts
defaultTheme({
  notFound: {
    title: 'PAGE NOT FOUND',
    quote: "There's nothing here.",
    linkText: 'Take me home',
  },
})
```

### Accessibility Labels

| Classic                   | New                                                                          |
| ------------------------- | ---------------------------------------------------------------------------- |
| `toggleColorMode`         | `darkModeSwitchLabel`, plus `lightModeSwitchTitle` and `darkModeSwitchTitle` |
| `toggleSidebar`           | `sidebarMenuLabel` and `mobileMenuLabel`                                     |
| `selectLanguageText`      | `langMenuLabel`                                                              |
| `selectLanguageAriaLabel` | `langMenuLabel`                                                              |
| `selectLanguageName`      | `locales.<localePath>.label`                                                 |
| `navbarLabel`             | `navMenuLabel`                                                               |
| `pageNavbarLabel`         | —                                                                            |
| `openInNewWindow`         | —                                                                            |
| —                         | `returnToTopLabel`, `extraMenuLabel`, `skipToContentLabel`                   |

When `locales.<localePath>.label` is missing, the language switcher falls back to the locale path, so set it while migrating a locale that only configured `selectLanguageText`.

### Theme Plugins

| Classic             | New                          | Notes                                                                                   |
| ------------------- | ---------------------------- | --------------------------------------------------------------------------------------- |
| `activeHeaderLinks` | `activeHeaderLinks`          | Boolean only.                                                                           |
| `backToTop`         | `backToTop`                  | Same options.                                                                           |
| `copyCode`          | `copyCode`                   | Same options.                                                                           |
| `git`               | `git`                        | Same options.                                                                           |
| `hint`              | `markdownPlugins.hint`       | Same options, moved to `markdownPlugins`.                                               |
| `linksCheck`        | `markdownPlugins.linksCheck` | Same options, moved to `markdownPlugins`.                                               |
| `mediumZoom`        | `mediumZoom`                 | Same meaning, options object accepted.                                                  |
| `nprogress`         | `nprogress`                  | Same.                                                                                   |
| `prismjs`           | `markdownPlugins.shiki`      | The highlighter changed. Set `shiki: false` and register `prismjsPlugin` to keep Prism. |
| `seo`               | `seo`                        | Same options, requires `hostname`.                                                      |
| `sitemap`           | `sitemap`                    | Same options, requires `hostname`.                                                      |
| `tab`               | `markdownPlugins.tab`        | Code tabs are on by default; `::: tabs` needs `tab: { tabs: true }`.                    |
| —                   | `icon`                       | Renders icons with Iconify.                                                             |
| `markdownExt`       | `markdownPlugins.ext`        | GFM, footnotes, task lists and the `v-pre` container.                                   |
| `markdownRaw`       | `markdownPlugins.raw`        | The `raw` container with style isolation.                                               |

The SASS palette is gone. `@vuepress/plugin-palette` is not wired, since the theme is styled with CSS custom properties that a site overrides in `.vuepress/styles/index.css`. See [Styles](#styles).

A plugin is disabled with `false` and configured with an object, as before:

```ts
defaultTheme({
  themePlugins: {
    sitemap: false,
  },
  markdownPlugins: {
    linksCheck: { exclude: [/^#\//u] },
    shiki: { themes: { light: 'nord', dark: 'nord' } },
  },
})
```

To keep Prism as the highlighter, disable Shiki and register the Prism plugin yourself:

```ts
import { prismjsPlugin } from '@vuepress/plugin-prismjs'

export default defineUserConfig({
  plugins: [prismjsPlugin()],
  theme: defaultTheme({
    markdownPlugins: { shiki: false },
  }),
})
```

## Migrate the Frontmatter

| Classic             | New                 | Notes                                                                                                      |
| ------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------- |
| `home: true`        | `type: home`        | `home: true` is still accepted, but deprecated and logs a warning; the other pages default to `type: doc`. |
| `navbar`            | `navbar`            | Same.                                                                                                      |
| `externalLinkIcon`  | `externalLinkIcon`  | Same.                                                                                                      |
| `pageClass`         | `pageClass`         | Same, and the class is added on the page container.                                                        |
| `editLink`          | `editLink`          | A boolean that enables or disables the link of the page.                                                   |
| `editLinkPattern`   | —                   | The pattern is a theme option now.                                                                         |
| `lastUpdated`       | `lastUpdated`       | Same, a boolean or a timestamp.                                                                            |
| `contributors`      | `contributors`      | Same.                                                                                                      |
| `sidebar`           | `sidebar`           | Same shapes, including the classic item syntax.                                                            |
| `prev` / `next`     | `prev` / `next`     | A string is the text, an object accepts `text`, `link`, `target` and `rel`, and `false` hides the link.    |
| `footer` (a string) | `footer` (a string) | The string is rendered as the page footer.                                                                 |
| `footerHtml`        | `footerHtml`        | Whether to render the string footer as HTML.                                                               |
| —                   | `footer: false`     | Hides the site footer on this page.                                                                        |

The behaviour of the previous/next frontmatter changed. In the classic theme a string was a path to a page file and was converted to a link. In the new theme a string is the text of the link, and the target comes from the sidebar order:

```diff
- prev: /guide/getting-started.md
+ prev: { text: 'Get started', link: '/guide/getting-started.html' }
```

## Styles

The classic theme used SASS: `.vuepress/styles/palette.scss` for the variables and `.vuepress/styles/index.scss` for the rules. The new theme uses plain CSS and CSS custom properties, so the palette plugin is not needed anymore:

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

The custom rules move from `.vuepress/styles/index.scss` to `.vuepress/styles/index.css`, which the theme imports automatically. Since the file is plain CSS, keep SCSS only if the site itself sets up a preprocessor.

The variable names of the classic theme are kept as aliases (`--vp-c-accent`, `--vp-c-text`, `--vp-c-control`, and so on), so the styles of the ecosystem plugins keep working. A site that overrides a classic variable should override the new variable it aliases, which is the one the theme itself uses. See [Styles](./styles.md).

## Custom Layouts and Components

The `@theme/*` alias of the classic theme does not exist in the new theme, and the internal components are not exported. The two things that replace them are the `theme.Layout` component and the [slots](./extending.md#layout-slots) of the layout:

```diff
- import ParentLayout from '@vuepress/theme-classic/layouts/Layout.vue'
+ import theme from '@vuepress/theme-default/client'
+
+ const ParentLayout = theme.Layout
```

A layout of the classic theme imports its components from `@vuepress/theme-classic/components/*` or through `@theme/*`. The new theme only exports the public components, under their `VP` names: `VPBadge`, `VPButton`, `VPImage`, `VPLink`, the home components, the team components and the sponsor components. Replace an internal component with a slot when the slot exists, and with your own markup otherwise. See [Built-in Components](./components.md).

## Types

| Classic                             | New                                                     |
| ----------------------------------- | ------------------------------------------------------- |
| `ClassicThemeOptions`               | `ThemeOptions`                                          |
| `ClassicThemeData`                  | `ThemeConfig`                                           |
| `ClassicThemeLocaleData`            | `ThemeConfig`                                           |
| `ClassicThemePageData`              | `ThemePageData`                                         |
| `ClassicThemePageFrontmatter`       | `ThemePageFrontmatter`                                  |
| `ClassicThemeHomePageFrontmatter`   | `ThemePageFrontmatter` (with `type: 'home'` and `hero`) |
| `ClassicThemeNormalPageFrontmatter` | `ThemePageFrontmatter` (with `type: 'doc'`)             |
| `ClassicThemePluginsOptions`        | `ThemePluginsOptions`                                   |
| `NavbarOptions`                     | `NavItem[]`                                             |
| `SidebarOptions`                    | `Sidebar`                                               |

The nav items, sidebar items, hero and features, footer, team members and sponsors are exported as plain types from the package. Import them to annotate a configuration object:

```ts
import type { NavItem } from '@vuepress/theme-default'

const navbar: NavItem[] = [{ text: 'Guide', link: '/guide/' }]
```

## Client API

| Classic                | New                                                        |
| ---------------------- | ---------------------------------------------------------- |
| `useData()`            | `useThemePageData()` and the `vuepress/client` composables |
| `useThemeData()`       | `useThemeData()` (same name)                               |
| `useThemeLocaleData()` | `useThemeLocaleData()` (same name)                         |
| `useDarkMode()`        | `useDarkMode()` (returns whether the dark mode is on)      |
| `darkModeSymbol`       | `themeDarkModeSymbol`                                      |
| `useEditLink()`        | —                                                          |
| `useHeaders()`         | `useLayout().headers`                                      |
| `useSidebarItems()`    | `useLayout().sidebar` and `useLayout().sidebarGroups`      |
| `useNavbarConfig()`    | —                                                          |
| `useNavbarRepo()`      | —                                                          |

The new theme does not re-export the composables of `vuepress/client`. Import `usePageData`, `usePageFrontmatter`, `useRouteLocale`, `useSiteData` and the others from `vuepress/client` directly.

## Features Without a New Equivalent

A few classic features were dropped rather than renamed:

* The `repo` item of the navbar. The repository is mapped to a `socialLinks` entry with its brand icon, which is the only place v1 renders social links.
* The randomized 404 quote list. Only the first message of the classic list is used as the `quote`.
* The `openInNewWindow` text of external links. The new theme only has the `externalLinkIcon` boolean.
* The `@theme/*` aliases and the replaceable internal components. Use slots and layouts instead.
* The `pageNavbarLabel` label.
* The SASS palette. Use CSS custom properties.

## Checklist

1. Replace `@vuepress/theme-classic` with `@vuepress/theme-default` and `classicTheme` with `defaultTheme`.
2. Keep the `navbar` and `sidebar` configs as they are: the default theme accepts the classic syntax, see the compatibility tables above. The classic options are accepted too, so the site builds before the options are migrated; the build log lists every deprecated option it still finds.
3. Convert `colorMode` / `colorModeSwitch` to `appearance`, and the language switcher options to `locales.<path>.label` and `langMenuLabel`.
4. Convert `home: true` to `type: home`, and `notFound` / `backToHome`; the other classic home keys keep their names.
5. Rename the Markdown plugin switches to `markdownPlugins`, and opt out of Shiki if the site must keep Prism. Remove the options that now log a deprecation warning: `colorMode`, `colorModeSwitch`, `home`, `navbarLabel`, `logoDark`, `logoAlt`, `repo`, `repoLabel`, `selectLanguage*`, `sidebarDepth`, `editLink*`, `docsRepo`, `docsBranch`, `docsDir`, `lastUpdatedText`, `backToHome`, `openInNewWindow`, `toggleColorMode`, `toggleSidebar`, `prev`, `next` and the classic `themePlugins.markdown*` / `themePlugins.hint` / `themePlugins.tab` / `themePlugins.prismjs` keys.
6. Move the SASS palette to CSS variables in `.vuepress/styles/index.css`.
7. Replace `ParentLayout` and the `@theme/*` imports with `theme.Layout` and the public components.
8. Update the type names.
9. Run the site and check the navbar, the sidebar, the home page, the 404 page and the dark mode.
