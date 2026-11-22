---
icon: arrow-right-left
---

# Migrating from Classic

`@vuepress/theme-classic` is the theme that used to be the default theme of VuePress. It still works and it keeps its own look, but the new default theme is `@vuepress/theme-default`, a thin layout layer ported from VitePress.

This page maps the options, the frontmatter and the styles of the classic theme to the new theme. Most options were renamed to match VitePress, and the ones that relied on SASS were replaced by CSS custom properties.

<NpmBadge package="@vuepress/theme-default" />

## Update the Package

Replace the package of the theme and the import of the factory:

```diff
- npm install -D @vuepress/theme-classic@next
+ npm install -D @vuepress/theme-default@next
```

```diff
- import { themeClassic } from '@vuepress/theme-classic'
+ import { themeDefault } from '@vuepress/theme-default'

  export default defineUserConfig({
-   theme: themeClassic({ /* ... */ }),
+   theme: themeDefault({ /* ... */ }),
  })
```

If your site still imports `defaultTheme` from the former `@vuepress/theme-default`, replace it with `themeDefault` and install the new package, since that import name no longer exists.

## Migrate the Theme Options

### General

| Classic            | New                       | Notes                                                                                                   |
| ------------------ | ------------------------- | ------------------------------------------------------------------------------------------------------- |
| `hostname`         | `hostname`                | Same. It enables the SEO and the sitemap plugins.                                                       |
| `locales`          | `locales`                 | Add `label`, `lang` and `link` to each locale, since they drive the language menu.                      |
| `colorMode`        | `appearance`              | See [Color Mode](#color-mode).                                                                          |
| `logo`             | `logo`                    | A string, or a `ThemeableImage` object.                                                                 |
| `logoDark`         | `logo: { light, dark }`   | The dark variant of the logo.                                                                           |
| `logoAlt`          | `logo: { alt }`           | The alternative text of the logo.                                                                       |
| `home`             | `logoLink`                | The link of the logo in the navbar, and the home page of the site. The 404 button uses `notFound.link`. |
| `repo`             | `socialLinks`             | `socialLinks: [{ icon: 'github', link: 'https://github.com/example/repo' }]`.                           |
| `repoLabel`        | `socialLinks[].ariaLabel` | The label of the repository link.                                                                       |
| `navbar`           | `nav`                     | See [Navbar](#navbar).                                                                                  |
| `sidebar`          | `sidebar`                 | Same default (`'heading'`), new item shape.                                                             |
| `sidebarDepth`     | `sidebarDepth`            | Same, and only used when `sidebar` is `'heading'`.                                                      |
| `externalLinkIcon` | `externalLinkIcon`        | Same, defaults to `false`.                                                                              |
| `themePlugins`     | `themePlugins`            | See [Theme Plugins](#theme-plugins).                                                                    |

### Navbar

The classic `navbar` option is the new `nav` option. Its items are `NavItem` objects, which accept `text`, `link`, `icon`, `activeMatch` and, for a dropdown, `items`:

| Classic                       | New                           | Notes                                                                                      |
| ----------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------ |
| `navbar: []` (default)        | `nav` omitted                 | Both render a navbar without items.                                                        |
| `navbar: false`               | `nav: []`                     | Hides the navigation items. The navbar itself is configured with the `navbar` frontmatter. |
| `{ text, link }`              | `{ text, link }`              | Same.                                                                                      |
| `{ text, children }`          | `{ text, items }`             | The dropdown items.                                                                        |
| `{ text, prefix, children }`  | `{ text, items }`             | No prefix: write the full link of each item.                                               |
| `{ text, link, activeMatch }` | `{ text, link, activeMatch }` | Same, as a regular expression.                                                             |
| `{ text, ariaLabel }`         | —                             | Not supported; add an `icon` or keep the text.                                             |
| —                             | `{ component, props }`        | Renders a custom component in the navbar.                                                  |
| —                             | `socialLinks`                 | The social links are separate from the nav items.                                          |

`navbarLabel` and `pageNavbarLabel` were the accessible labels of the navigation. Use `navMenuLabel` for the navbar; the page navbar no longer has a label of its own.

### Sidebar

The sidebar item shape changed, since the theme now uses the same item type in the sidebar and in the navbar:

| Classic                                | New                     | Notes                                                                                      |
| -------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------ |
| `'/guide/'` (a string entry)           | `{ link: '/guide/' }`   | The text is resolved from the title of the page at runtime.                                |
| `{ text, link }`                       | `{ text, link }`        | Same.                                                                                      |
| `{ text, children }`                   | `{ text, items }`       | The nested items.                                                                          |
| `{ text, prefix, children }`           | `{ text, base, items }` | `base` is the prefix of the links of the items.                                            |
| `{ text, collapsible }`                | `{ text, collapsed }`   | A group is collapsible when `collapsed` is set, and it starts collapsed when it is `true`. |
| `{ text, ariaLabel }`                  | —                       | Not supported.                                                                             |
| —                                      | `{ icon }`              | The icon of the item.                                                                      |
| —                                      | `{ docFooterText }`     | The text used by the previous/next links.                                                  |
| sidebar object keyed by the page paths | same                    | Each value can be an array, `'heading'`, or `{ items, base }`.                             |

### Document Footer

| Classic            | New                | Notes                                                                                      |
| ------------------ | ------------------ | ------------------------------------------------------------------------------------------ |
| `editLink`         | `editLink`         | The link is rendered when `editLink.pattern` is set.                                       |
| `editLinkText`     | `editLink.text`    | Defaults to `'Edit this page'`.                                                            |
| `editLinkPattern`  | `editLink.pattern` | A URL template with `:path`, or a function of the page data.                               |
| `docsRepo`         | —                  | Build the pattern yourself, for example `https://github.com/example/repo/edit/main/:path`. |
| `docsBranch`       | —                  | Same.                                                                                      |
| `docsDir`          | —                  | Same.                                                                                      |
| `lastUpdated`      | `lastUpdated`      | Same, or an object with `text` and `formatOptions`.                                        |
| `lastUpdatedText`  | `lastUpdated.text` | Defaults to `'Last updated'`.                                                              |
| `contributors`     | `contributors`     | Same, defaults to `true`.                                                                  |
| `contributorsText` | `contributorsText` | Same, defaults to `'Contributors'`.                                                        |
| `prev`             | `docFooter.prev`   | A string label, or `false` to hide the previous link.                                      |
| `next`             | `docFooter.next`   | A string label, or `false` to hide the next link.                                          |

### Color Mode

| Classic              | New                                                                |
| -------------------- | ------------------------------------------------------------------ |
| `colorMode: 'auto'`  | `appearance: true`                                                 |
| `colorMode: 'light'` | `appearance: false`                                                |
| `colorMode: 'dark'`  | `appearance: 'dark'`                                               |
| —                    | `appearance: 'force-dark'` (always dark)                           |
| —                    | `appearance: 'force-auto'` (follows the system, no switch)         |
| —                    | `appearance: { initialValue: 'dark' }` (starts dark, switch shown) |

`colorModeSwitch: false` has no direct equivalent. The switch is hidden when the appearance is fixed, so use `appearance: false`, `'dark'`, `'force-dark'` or `'force-auto'` to hide it. To keep the switch and change only the initial value, use the object form.

The storage key is still `vuepress-color-scheme`, but the dark mode is now driven by the `data-theme` attribute on `<html>` rather than a `dark` class. A stylesheet that targets `.dark` must target `[data-theme='dark']`.

### Home Page and 404

| Classic (frontmatter)           | New (frontmatter)                                      | Notes                                                                      |
| ------------------------------- | ------------------------------------------------------ | -------------------------------------------------------------------------- |
| `home: true`                    | `type: home`                                           | The page type replaces the boolean flag.                                   |
| `heroImage`                     | `hero.image`                                           | A string, or `{ src }`.                                                    |
| `heroImageDark`                 | `hero.image: { light, dark }`                          | The two variants of the image.                                             |
| `heroAlt`                       | `hero.image: { alt }`                                  | The alternative text.                                                      |
| `heroHeight`                    | —                                                      | Not configurable.                                                          |
| `heroText`                      | `hero.name`                                            | The name of the project.                                                   |
| `tagline`                       | `hero.text`                                            | The text of the hero.                                                      |
| `actions[{ text, link, type }]` | `hero.actions[{ text, link, theme }]`                  | `type: 'primary'` becomes `theme: 'brand'`, `'secondary'` becomes `'alt'`. |
| `features[{ title, details }]`  | `features[{ title, details }]`                         | The new items also accept `icon`, `link` and `linkText`.                   |
| `footer`                        | `footer.message` (theme option)                        | The home footer is the site footer now.                                    |
| `footerHtml`                    | —                                                      | The footer content is always rendered as HTML.                             |
| `notFound` (string array)       | `notFound` (object)                                    | See below.                                                                 |
| `backToHome`                    | `notFound.linkText`                                    | Defaults to `'Take me home'`.                                              |
| —                               | `notFound.title`, `quote`, `link`, `linkLabel`, `code` | The pieces of the 404 page.                                                |

The classic theme rendered one of the messages of `notFound` at random. The new theme has a single `quote`, so pick one of the former messages:

```ts
themeDefault({
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

### Theme Plugins

| Classic             | New                 | Notes                                                                                 |
| ------------------- | ------------------- | ------------------------------------------------------------------------------------- |
| `activeHeaderLinks` | `activeHeaderLinks` | Boolean only.                                                                         |
| `backToTop`         | `backToTop`         | Same options.                                                                         |
| `copyCode`          | `copyCode`          | Same options.                                                                         |
| `git`               | `git`               | Same options.                                                                         |
| `hint`              | `markdownHint`      | Same options.                                                                         |
| `linksCheck`        | `linksCheck`        | Same options.                                                                         |
| `mediumZoom`        | `mediumZoom`        | Same meaning, options object accepted.                                                |
| `nprogress`         | `nprogress`         | Same.                                                                                 |
| `prismjs`           | `shiki`             | The highlighter changed. Opt out of Shiki and register `prismjsPlugin` to keep Prism. |
| `seo`               | `seo`               | Same options, requires `hostname`.                                                    |
| `sitemap`           | `sitemap`           | Same options, requires `hostname`.                                                    |
| `tab`               | `markdownTab`       | Code tabs are on by default; `::: tabs` needs `markdownTab: { tabs: true }`.          |
| —                   | `icon`              | Renders icons with Iconify.                                                           |
| —                   | `markdownExt`       | GFM, footnotes, task lists and the `v-pre` container.                                 |
| —                   | `markdownRaw`       | The `raw` container with style isolation.                                             |

The SASS palette is gone. `@vuepress/plugin-palette` is not wired, since the theme is styled with CSS custom properties that a site overrides in `.vuepress/styles/index.css`. See [Styles](#styles).

A plugin is disabled with `false` and configured with an object, as before:

```ts
themeDefault({
  themePlugins: {
    shiki: { themes: { light: 'nord', dark: 'nord' } },
    linksCheck: { exclude: [/^#\//u] },
    sitemap: false,
  },
})
```

To keep Prism as the highlighter, disable Shiki and register the Prism plugin yourself:

```ts
import { prismjsPlugin } from '@vuepress/plugin-prismjs'

export default defineUserConfig({
  plugins: [prismjsPlugin()],
  theme: themeDefault({
    themePlugins: { shiki: false },
  }),
})
```

## Migrate the Frontmatter

| Classic             | New                             | Notes                                                                                                   |
| ------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `home: true`        | `type: home`                    | The other pages default to `type: doc`.                                                                 |
| `navbar`            | `navbar`                        | Same.                                                                                                   |
| `externalLinkIcon`  | `externalLinkIcon`              | Same.                                                                                                   |
| `pageClass`         | `pageClass`                     | Same, and the class is added on the page container.                                                     |
| `editLink`          | `editLink`                      | A boolean that enables or disables the link of the page.                                                |
| `editLinkPattern`   | —                               | The pattern is a theme option now.                                                                      |
| `lastUpdated`       | `lastUpdated`                   | Same, a boolean or a timestamp.                                                                         |
| `contributors`      | `contributors`                  | Same.                                                                                                   |
| `sidebar`           | `sidebar`                       | Same shapes, with the item changes above.                                                               |
| `sidebarDepth`      | `sidebarDepth`                  | Same.                                                                                                   |
| `prev` / `next`     | `prev` / `next`                 | A string is the text, an object accepts `text`, `link`, `target` and `rel`, and `false` hides the link. |
| `footer` (a string) | `footer.message` (theme option) | The home footer is the site footer now.                                                                 |
| `footerHtml`        | —                               | The footer content is always rendered as HTML.                                                          |
| —                   | `footer: false`                 | Hides the site footer on this page.                                                                     |

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
| `NavbarOptions`                     | `DefaultTheme.NavItem[]`                                |
| `SidebarOptions`                    | `DefaultTheme.Sidebar`                                  |

The `DefaultTheme` namespace of the new theme holds the types of nav items, sidebar items, hero and features, footer, team members and sponsors. Import it as a type to annotate a configuration object:

```ts
import type { DefaultTheme } from '@vuepress/theme-default'

const nav: DefaultTheme.NavItem[] = [{ text: 'Guide', link: '/guide/' }]
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

- The `repo` icon and its label in the navbar. Use a `socialLinks` entry instead.
- The automatic edit link built from `docsRepo`, `docsBranch` and `docsDir`. Build the `editLink.pattern` yourself.
- The randomized 404 quote list. The new theme has a single `quote`.
- The `openInNewWindow` text of external links. The new theme only has the `externalLinkIcon` boolean.
- The `@theme/*` aliases and the replaceable internal components. Use slots and layouts instead.
- The `pageNavbarLabel` label.
- The SASS palette. Use CSS custom properties.

## Checklist

1. Replace `@vuepress/theme-classic` with `@vuepress/theme-default` and `themeClassic` with `themeDefault`.
2. Convert `navbar` to `nav`, and the sidebar items to the new shape.
3. Convert `colorMode` / `colorModeSwitch` to `appearance`, and the language switcher options to `locales.<path>.label` and `langMenuLabel`.
4. Convert `notFound`, `backToHome` and the home frontmatter to the new frontmatter.
5. Rename the theme plugin switches, and opt out of Shiki if the site must keep Prism.
6. Move the SASS palette to CSS variables in `.vuepress/styles/index.css`.
7. Replace `ParentLayout` and the `@theme/*` imports with `theme.Layout` and the public components.
8. Update the type names.
9. Run the site and check the navbar, the sidebar, the home page, the 404 page and the dark mode.
