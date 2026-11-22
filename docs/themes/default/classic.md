---
icon: arrow-right-left
---

# Equivalents to `@vuepress/theme-classic`

The theme has taken over from the former default theme: the former `@vuepress/theme-default` is now published as `@vuepress/theme-classic` (called classic below), and `@vuepress/theme-default` now points to this theme. The goal is **functional equivalence with classic**: the layout and the styles are new, but every classic option should have an equivalent here, while features that classic does not have are documented separately.

This page maps "option → equivalent → no equivalent". The field names do not have to match, only the capability.

## Options

### General

| classic (`@vuepress/theme-classic`) | `@vuepress/theme-default` equivalent | Note                                                                                                                               |
| ----------------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| `hostname`                          | None                                 | classic uses it to register `plugin-seo` and `plugin-sitemap` automatically; register these plugins in the site `plugins` instead  |
| `themePlugins`                      | `themePlugins`                       | Every entry can be disabled with `false`; entries with options accept an object (`activeHeaderLinks` and `nprogress` are booleans) |
| `locales`                           | `locales` (different keys)           | classic keys are route paths (`/`, `/zh/`); use VitePress-style keys (`root`, `zh`), which are converted to route paths internally |

### Color mode

| classic                  | New theme                                    | Note                                                                                                     |
| ------------------------ | -------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `colorMode: 'auto'`      | `appearance: true` (default, can be omitted) | Follow the system preference, switchable                                                                 |
| `colorMode: 'dark'`      | `appearance: 'dark'`                         | Start dark, switchable                                                                                   |
| `colorMode: 'light'`     | `appearance: false`                          | Always light                                                                                             |
| `colorModeSwitch: false` | No equivalent                                | The switch is shown by default; fix `appearance` to `false` / `'force-dark'` / `'force-auto'` to hide it |

New capability that classic does not have: `appearance: 'force-dark'` / `'force-auto'` (fixed dark / fixed system preference, switch hidden).

### Navbar

classic uses a `navbar` array of `AutoLinkOptions` with `prefix` and `children`; this theme uses the VitePress-style `nav`.

| classic                                                                 | New theme equivalent                                            |
| ----------------------------------------------------------------------- | --------------------------------------------------------------- |
| `navbar: ['/guide/']`                                                   | `nav: [{ text: 'Guide', link: '/guide/' }]`                     |
| `navbar: [{ text: 'Guide', link: '/guide/' }]`                          | `nav: [{ text: 'Guide', link: '/guide/' }]`                     |
| `navbar: [{ text: 'Guide', children: [...] }]`                          | `nav: [{ text: 'Guide', items: [...] }]` (`children` → `items`) |
| `navbar: [{ text: 'Guide', prefix: '/guide/', children: [...] }]`       | No direct equivalent, expand `prefix` into every child `link`   |
| `navbar: false`                                                         | `nav: []`                                                       |
| `navbarLabel` / `pageNavbarLabel`                                       | `navMenuLabel` / `mobileMenuLabel`                              |
| `logo` / `logoDark` / `logoAlt`                                         | `logo: string \| { light, dark, alt }`                          |
| `home`                                                                  | `logoLink` (logo link) and `notFound.link`                      |
| `siteTitle`                                                             | `siteTitle`                                                     |
| `repo` / `repoLabel`                                                    | `socialLinks: [{ icon: 'github', link: repo }]`                 |
| `selectLanguageText` / `selectLanguageAriaLabel` / `selectLanguageName` | `langMenuLabel` + `locales.<key>.label`                         |

New capabilities: `socialLinks`, `extraMenuLabel`, `skipToContentLabel`, `returnToTopLabel`, `gradedContainers`.

### Plugin switches

| classic                                                                                               | New theme equivalent                                                                                                                                                                                                                         |
| ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `themePlugins: { nprogress: false, mediumZoom: false }`                                               | Same                                                                                                                                                                                                                                         |
| `themePlugins: { copyCode: { ... }, git: { ... }, hint: { ... }, tab: { ... }, mediumZoom: { ... } }` | `themePlugins: { copyCode: { ... }, git: { ... }, markdownHint: { ... }, markdownTab: { ... }, icon: { ... }, mediumZoom: { ... } }`                                                                                                         |
| `themePlugins: { activeHeaderLinks: false }`                                                          | Same                                                                                                                                                                                                                                         |
| `themePlugins: { backToTop, linksCheck, prismjs, seo, sitemap }`                                      | No equivalent: register these plugins in the site `plugins`                                                                                                                                                                                  |
| — (classic does not provide `v-pre` / `raw`)                                                          | The theme additionally wires `@vuepress/plugin-markdown-ext` (`vPre: true`) and `@vuepress/plugin-markdown-raw` (style isolation enabled by default); configure or disable them with `themePlugins.markdownExt` / `themePlugins.markdownRaw` |

### Sidebar and document page

| classic                                                   | New theme equivalent                                         | Note                                                                                         |
| --------------------------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| `sidebar: 'heading'`                                      | `sidebar: 'heading'` (default)                               | Built from the headings of the current page                                                  |
| `sidebar: [...]` / `{ '/guide/': [...] }`                 | Same shape (VitePress-style objects)                         | Groups use `text` / `items` / `link`; string entries are not accepted                        |
| `sidebar: false`                                          | `sidebar: false`                                             | Supported                                                                                    |
| `sidebarDepth`                                            | `sidebarDepth` (defaults to 2)                               | Depth of the heading sidebar; the outline is controlled by `outline.level` (defaults to `2`) |
| `editLink: boolean`                                       | `editLink: { pattern, text }`                                | Omit the option to disable                                                                   |
| `editLinkText`                                            | `editLink.text`                                              |                                                                                              |
| `editLinkPattern`                                         | `editLink.pattern`, `:path` is replaced with the source path |                                                                                              |
| `docsRepo` / `docsBranch` / `docsDir`                     | No equivalent                                                | Write the full `editLink.pattern` instead                                                    |
| `lastUpdated: boolean`                                    | `lastUpdated: boolean \| { text, formatOptions }`            |                                                                                              |
| `lastUpdatedText`                                         | `lastUpdated.text`                                           |                                                                                              |
| `contributors` / `contributorsText`                       | Same names                                                   | The contributors are rendered in the doc footer, from `@vuepress/plugin-git`                 |
| `prev` / `next`                                           | `docFooter.prev` / `docFooter.next`                          | Accepts `string` / `false`                                                                   |
| `externalLinkIcon`                                        | `externalLinkIcon`                                           | Same                                                                                         |
| `tip` / `warning` / `danger` / `important` / `note` texts | Same theme options                                           | Passed to the `locales` of `@vuepress/plugin-markdown-hint`                                  |
| `backToTop` (classic plugin)                              | Built-in "Return to top"                                     | In the dropdown at the bottom right of a document page, `returnToTopLabel`                   |
| `prismjs` theme configuration                             | `@vuepress/plugin-shiki`                                     | Shiki with `github-light` / `github-dark`                                                    |
| `palettePlugin` / `userStyle`                             | No equivalent                                                | The theme has no Sass palette or user-style entry                                            |

### Home page and 404

| classic                                   | New theme equivalent                                          | Note                                         |
| ----------------------------------------- | ------------------------------------------------------------- | -------------------------------------------- |
| frontmatter `home: true`                  | frontmatter `type: home`                                      |                                              |
| `heroImage` / `heroImageDark` / `heroAlt` | `hero.image`                                                  |                                              |
| `heroText`                                | `hero.name`                                                   |                                              |
| `tagline`                                 | `hero.text`                                                   |                                              |
| `actions`                                 | `hero.actions`                                                | Each item `{ text, link, theme }`            |
| `features: [{ title, details }]`          | `features: [{ icon, title, details, link? }]`                 | Icons support emoji, images or Iconify names |
| `footer` (string on the home page)        | `footer.message` / `footer.copyright`                         |                                              |
| `notFound: string[]`                      | `notFound: { title, quote, link, linkLabel, linkText, code }` | Changed to an object                         |
| `backToHome`                              | `notFound.linkText`                                           |                                              |

New capabilities: the `VPTeamPage*` / `VPTeamMembers` and `VPSponsors*` components, plus the `VPHomeContent` block components.

### Accessibility texts

| classic           | New theme equivalent                                                                              |
| ----------------- | ------------------------------------------------------------------------------------------------- |
| `openInNewWindow` | No equivalent (built into the theme)                                                              |
| `toggleColorMode` | `darkModeSwitchLabel`                                                                             |
| `toggleSidebar`   | `sidebarMenuLabel`                                                                                |
| —                 | New: `navMenuLabel`, `mobileMenuLabel`, `langMenuLabel`, `skipToContentLabel`, `returnToTopLabel` |

## Page data and frontmatter

| classic                                                                   | New theme equivalent                                                                |
| ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `ClassicThemeData` / `ClassicThemeLocaleOptions`                          | `ThemeConfig` (`locales` supports per-language overrides)                           |
| `ClassicThemePageData` (`filePathRelative`, `git`)                        | `ThemePageData` (`path`, `title`, `lang`, `frontmatter`, `filePathRelative`, `git`) |
| `ClassicThemeNormalPageFrontmatter`                                       | `ThemePageFrontmatter` (adds `type`)                                                |
| `home: true`                                                              | `type: home`                                                                        |
| `navbar: false`                                                           | No equivalent (the navbar gets its items from the `nav` theme option)               |
| `sidebar` / `sidebarDepth` / `editLink` / `lastUpdated` / `prev` / `next` | Same names as the theme options                                                     |
| —                                                                         | New: `type`, `hero`, `features`, `outline`, `pageClass`                             |

## Client API and components

| classic export                                                                           | New theme equivalent                                                        | Note                                                                                             |
| ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `useData()`                                                                              | `useThemePageData()` + `useThemePageFrontmatter()` + `useThemeLocaleData()` | Composed from the native `vuepress/client` and `plugin-theme-data` APIs                          |
| `useDarkMode()`                                                                          | `useDarkMode()` + `darkModeSymbol`                                          | Interoperable through `darkModeSymbol` of `@vuepress/helper/client`                              |
| `useEditLink()`                                                                          | Theme internal                                                              | Not exported                                                                                     |
| `useHeaders()` / `setupHeaders()`                                                        | No equivalent                                                               | The outline reads the DOM directly                                                               |
| `useSidebarItems()`                                                                      | No equivalent                                                               | The sidebar state is maintained by internal composables                                          |
| `useNavbarConfig()` / `useNavbarRepo()` / `useNavbarSelectLanguage()`                    | No equivalent                                                               | The navbar and the language menu are maintained by internal composables                          |
| `useNavigate()` / `useRelatedLinks()` / `useScrollPromise()` / `useUpdateDeviceStatus()` | No equivalent                                                               | Kept internal                                                                                    |
| `resolveEditLink()`, `resolvePrefix()`, `resolveRepoType()`, `isActiveSidebarItem()`     | Theme internal                                                              | Not a public API                                                                                 |
| `@theme/*` component aliases (replaceable components)                                    | Not supported                                                               | The theme exposes components and styles through `exports`, but no per-file replacement mechanism |

The theme's public client API: the default export and the `VP*` components, `useLayout()`, `usePageType()`, the page data composables, `useThemeLocalePath()` / `useThemeLocales()`, the dark mode helpers, and the related types. See [Features](./features.md#public-api).

### Hint container texts

| classic              | New theme equivalent             |
| -------------------- | -------------------------------- |
| `tip` / `warning`    | Same options                     |
| `danger`             | `danger` (rendered as `caution`) |
| `important` / `note` | Same options                     |

The markdown hint containers are parsed and styled by `@vuepress/plugin-markdown-hint`; the theme only passes the texts above to the plugin `locales` per language.

## No equivalent yet

The following classic capabilities have no equivalent in this theme yet; they are recorded here and will be filled in by priority:

1. The repository icon / `repoLabel` of `repo`, and the automatic edit link from `docsRepo` / `docsBranch` / `docsDir` (a full `editLink.pattern` works instead).
2. The automatic SEO / Sitemap registration from `hostname`.
3. `palettePlugin` and the `userStyle` entry.
4. `colorModeSwitch`, `openInNewWindow` and the `home` behaviors.
5. The `@theme/*` component override mechanism.
6. Public `useHeaders` / `useSidebarItems` composables.
