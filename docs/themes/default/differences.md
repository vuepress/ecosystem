---
icon: git-compare
---

# Differences from VitePress

The theme intentionally does not aim at a byte-for-byte copy of the VitePress default theme. This page lists the differences by concern, with the reason for each choice, the benefits and the trade-offs.

## Migrating from VitePress

The theme borrows the layout and the styles of the VitePress default theme, but it is a VuePress theme, so a VitePress site is ported by moving its config and its content into VuePress instead of switching a package. The [VitePress documentation](https://vitepress.dev/) and the [VuePress guide](https://vuepress.vuejs.org/guide/) describe both sides, and [Migrating from Classic](./migrating-from-classic.md) covers the same kind of mapping for a site that used the former VuePress default theme.

## Class prefix: `vp-` instead of `VP`

- **Approach**: All public classes of the ported layer are renamed from `VPFoo` to `vp-foo` (`VPNavBar*` becomes `vp-navbar*`); the root classes are `vp-theme-container` and `vp-not-found`.
- **Reason**: The ecosystem requires all CSS classes to use the `vp-` prefix, and the site styles are already written with it.
- **Benefits**: Consistent with the ecosystem; no conflict with the classes of third-party VitePress plugins; the component scoped styles keep working, because the selectors are renamed together.
- **Trade-off**: VitePress example CSS targeting `.VPLayout`, `.VPButton` etc. does not apply, and custom styles have to be rewritten with the `vp-` names. Diffing against upstream is harder, so the vendored directory is excluded from some lint rules.

## Dark mode: `data-theme` only

- **Approach**: The state is written as `data-theme="light|dark"` on `<html>` instead of a `dark` class, and all `.dark` selectors of the ported styles are `[data-theme='dark']`. The storage key is `vuepress-color-scheme` (VitePress uses `vitepress-theme-appearance`). The state is created by `createDarkModeRef()` in `src/client/composables/useDarkMode.ts` (`usePreferredDark()` + `useStorage`, honoring `appearance` as `false` / `'force-dark'` / `'force-auto'` / object form) and provided both to the theme data and to `darkModeSymbol` from `@vuepress/helper/client`, so ecosystem plugins read the same state. `appearance` is written into `<html data-appearance="…">` at build time by the `templateBuildRenderer` of `themeDefault()`, and the inline script of `templates/build.html` sets `data-theme` before the first paint using the storage and the system preference, so `'force-dark'` / `'force-auto'` do not flash the wrong color in a built site; dev mode bypasses the build template, so the first paint is decided by the storage and the system preference.
- **Reason**: Ecosystem plugins and styles (`getDarkMode()` from `@vuepress/helper`, search styles, the Shiki light/dark themes) read and observe `document.documentElement.dataset.theme`.
- **Benefits**: A single source of truth; the `dark` class and `data-theme` cannot disagree; plugins get the correct dark state automatically.
- **Trade-off**: VitePress custom CSS written for `.dark` has to be rewritten with `[data-theme='dark']`, and the upstream dark rules cannot be reused as-is. In dev mode the site-level `appearance` may be inaccurate for the first paint, while the built site has no such issue.

## Search: the theme only provides the mount point

- **Approach**: The navbar renders `<SearchBox />` when a search plugin has registered that global component. The theme bundles no search implementation.
- **Reason**: The VitePress local search UI is tightly coupled with VitePress internals (index format, worker, modal component), while the ecosystem already has several search plugins with i18n and refreshable indexes.
- **Benefits**: Any backend can be used (slimsearch, orama, flexsearch, docsearch, meilisearch); the theme stays small; the index format is not maintained twice.
- **Trade-off**: The search UI looks different from the VitePress local search, and a new plugin may need an alias for the CSS variables exposed by `styles/vars.css`.

## Copy code: provided by a plugin

- **Approach**: `@vuepress/plugin-copy-code` is wired with the selector `[vp-content] ... pre`.
- **Reason**: VitePress implements the copy button in its Markdown pre-wrapper, which is core behavior rather than theme behavior; the ecosystem plugin is the official replacement with its own icon, texts and styles.
- **Benefits**: The implementation is shared, so the copy feedback, the mobile behavior and the fixes apply to every theme.
- **Trade-off**: The button markup and styles come from the plugin; a site that renders content outside the `vp-content` root needs an extra selector.

## Code groups: provided by the Markdown Tab plugin

- **Approach**: The theme enables `markdownTabPlugin({ codeTabs: true })`, so code groups use `::: code-tabs` + `@tab`. The plugin parses the markdown, renders the `<VPCodeTabs>` component and ships its own `.vp-code-tabs` styles and client-side switching. The theme no longer registers a `code-group` container renderer, and the VitePress `vp-code-group` styles are removed.
- **Reason**: The theme does not aim at full VitePress syntax compatibility, it only borrows the layout and the styles of VitePress. When a plugin already covers a feature, the feature is not re-implemented in the theme.
- **Benefits**: The plugin is ready to use and ships styles, persisted selection and same-`tab-id` syncing on its own; the theme has no own parsing or switching code; plugin improvements automatically reach the theme.
- **Trade-off**: The syntax differs from VitePress (`::: code-group` + `[title]` does not work here, it has to be written as `::: code-tabs` + `@tab`), and the DOM and styles differ from the VitePress theme.
- **Recorded plugin improvement**: The VitePress code group uses `<input type="radio">` + `<label>`, which gives native radio-group semantics, arrow-key switching and no-JavaScript switching. Our `VPCodeTabs` uses buttons with JavaScript switching. If the native radio approach turns out to be better for accessibility, `@vuepress/plugin-markdown-tab` can gain a radio mode instead of keeping a custom renderer in the theme.

## Icons: rendered by `@vuepress/plugin-icon` at runtime

- **Approach**: The theme enables `@vuepress/plugin-icon` with `assets: 'iconify'` and replaces the VitePress `useIcon` / `VPIcon` with the globally registered `VPIcon` of the plugin: social links render `<VPIcon :icon="'simple-icons:github'" />`, and the `features[].icon` names containing `:` are rendered by it too. The theme no longer generates icon CSS, and `src/node/icons.ts` plus the temporary client config are removed. The internal UI icons (arrows, sun / moon, ...) are still CSS masks in `styles/icons.css` and are not affected.
- **Reason**: Icons are a feature rather than layout, and the ecosystem already has a plugin. The icon rendering of the plugin (`<iconify-icon>` web component) conflicts with the `vpi-*` mask classes of the ported layer, so only one of them can be used — the plugin is chosen.
- **Benefits**: Any Iconify set and icon service is supported, no `@iconify-json/*` dependency and no build-time scanning are needed, and plugin improvements automatically reach the theme.
- **Trade-off**: Icons are rendered on the client, so the SSR HTML contains an empty `<iconify-icon>` element and icons appear after hydration; compared with the build-time CSS approach of VitePress, icons are not available without JavaScript. The feature itself is not missing: offline or intranet deployments can pass `icon: { offline: true }`, so the plugin scans the icons used by the site and bundles them at build time (the site has to install `iconify-icon` and the `@iconify-json/<prefix>` packages itself, and under strict pnpm resolution those packages have to be resolvable by the plugin).

## Markdown containers: provided by `@vuepress/plugin-markdown-hint`

- **Approach**: The theme enables `markdownHintPlugin({ hint: true, alert: true })`. `tip` / `info` / `warning` / `caution` / `note` / `important` / `danger` (rendered as `caution`, consistent with theme-classic) and `details` are parsed, rendered and styled by the plugin: `.hint-container`, `.hint-container-title`, an icon before the title, and `details` is a native collapsible `<details>`. The theme no longer registers container renderers or styles containers; it only does three things:
  1. Import `@vuepress/helper/colors.css`, because the plugin styles depend on the `--vp-c-*-bg` / `-text` / `-soft` palette, which is switched with `[data-theme='dark']` and matches the dark mode of the theme.
  2. Override a few variables in `styles/vars.css`: `--hint-font-size: 0.875rem` to match the VitePress container font size, and map the blue of the plugin palette to indigo (the VitePress info container uses indigo).
  3. The `v-pre` and `raw` containers are provided by `@vuepress/plugin-markdown-ext` (`vPre: true`) and `@vuepress/plugin-markdown-raw`: the former only outputs `<div v-pre>`; the latter outputs `<div class="vp-raw">` and the theme enables the style isolation by default (`isolateStyles: true`, which is an opt-in in `postcss.config` in VitePress). The theme also takes over the clicks of links inside the container, so they do not go through the SPA router, like in VitePress. Disabling `themePlugins.markdownRaw` makes `::: raw` render as plain text.
- **Reason**: Containers are a feature and should come from the official plugins; the styling is aligned by overriding the plugin CSS variables instead of replicating or mapping a set of VitePress container styles in the theme.
- **Benefits**: No container styles or rendering code in the theme; the container icons, the localized default titles and the auto-expanding `<details>` before printing are maintained by the plugin; the appearance matches theme-classic and is only affected by the theme palette; plugin improvements automatically reach the theme.
- **Trade-off (differences from VitePress)**:
  - The class names differ: VitePress uses `.custom-block` / `.custom-block-title`, here it is `.hint-container` / `.hint-container-title`; custom styles targeting the VitePress classes have to be rewritten.
  - There is an icon before the title (part of the plugin styles), while the VitePress container titles have no icon.
  - `::: tip {no-title}` renders a container without title (supported by the plugin, which only reads the marker at the end of the info string; `details` ignores it).
  - Additional attributes on the token (such as `id` or an extra `class`) are not passed through to the container.
  - The style isolation of `raw` is enabled by the theme by default and needs the site bundler to process the `vp-doc.css` / `base.css` of the theme with PostCSS: a site that customizes `css.postcss` (Vite) or the `postcss-loader` options has to make sure the plugin is merged. Use `themePlugins.markdownRaw: { isolateStyles: false }` to disable the isolation.
  - `::: danger` outputs the `caution` type (the title is "Caution"), consistent with the compatibility mapping of theme-classic.
- **Plugin improvements already made**: `@vuepress/plugin-markdown-hint` now supports `{no-title}` and exposes the container spacing and radius as `--hint-container-*` / `--hint-details-*` CSS variables, so the theme aligns the layout with variables only (see plugin PR #1136). The remaining difference is that additional attributes on the token (such as `id` or an extra `class`) are not passed through to the output DOM.

## Active heading: the scroll listener belongs to the plugin

- **Approach**: The theme enables `@vuepress/plugin-active-header-links` with `headerLinkSelector: '.outline-link'`, so the plugin keeps `route.hash` in sync while scrolling. `useActiveAnchor()` of `composables/useActiveAnchor.ts` registers no scroll listener anymore; it only watches `route.hash` to add the `active` class to the matching `.outline-link` and to move the outline marker.
- **Reason**: The theme should only be a thin layout layer; the scroll listener is reusable common logic and the ecosystem already provides it in a plugin.
- **Benefits**: The scroll and hash logic exists only once and matches the other themes of the ecosystem; the theme has less code.
- **Trade-off**: The responsibility boundary has one more hop (the plugin writes the hash, the theme reads it), so debugging involves both sides; the plugin default selector is not `.outline-link`, so it has to be configured explicitly.

## Client API: the native `vuepress/client` API

- **Approach**: The ported layer has no VitePress compatibility layer (the former `src/client/app/*`): the theme composables (`useThemePageData`, `useThemePageFrontmatter`, `usePageRelativePath`, and `useThemeLocaleData` from `@vuepress/plugin-theme-data/client`, ...) read the native data of `vuepress/client` and organize it into the theme data API (`ThemePageData`, `ThemePageFrontmatter`, `ThemeLayout`, ...), whose shape and semantics follow `@vuepress/theme-classic`, with new fields documented separately.
- **Reason**: A compatibility layer adds reactive wrapping and runtime overhead; the user asked for a native implementation with zero performance loss.
- **Benefits**: No intermediate layer and a direct data flow; the theme code matches the other themes of the ecosystem and is easier to maintain.
- **Trade-off**: The internal composables are the theme's own API and have to stay equivalent to the data shape and semantics of `@vuepress/theme-classic`; new or temporarily missing fields are documented in [Config](./config.md) and [Migrating from Classic](./migrating-from-classic.md), so that two parallel conventions do not appear.
- **Interface notes**:
  - The theme keeps neither the VitePress data shape nor the VitePress data composables (`useData`, `useRouter`, `useRoute`, ...). Site extensions use the native `vuepress/client` API; the theme's own layout state composable `useLayout()` returns the theme's `ThemeLayout` type for the ported components and for sites that extend the layout.
  - VitePress callback payloads such as `nav[].link` and `editLink.pattern` no longer construct `VitePressData`; they receive the native VuePress page data (`page`), whose fields differ (e.g. `filePath` vs `filePathRelative`). Adapt on the site side if a VitePress-compatible payload is needed.
  - i18n follows the VuePress model: the site declares languages in the VuePress `locales`, and the route locale is decided by the site `locales`; the theme neither overrides the `themeLocaleDataSymbol` of `@vuepress/plugin-theme-data` nor derives the language from the theme `locales` only. The theme `locales` only decides the theme config and texts of each language, and its keys are mapped to route locale paths at build time (`root` → `/`, others → `/<key>/` or the explicit `link`).

## Fonts

- **Approach**: The theme bundles the Inter webfont and keeps the Google Fonts `@import` of the upstream stylesheet.
- **Trade-off**: The external `@import` makes a network request; projects that must build fully offline should remove it.

## Theme options: an independent `ThemeConfig`

- **Approach**: The theme options are the theme's own `ThemeConfig` (`src/shared/types.ts`), containing only the fields the theme actually supports, exported from the package entries and used by `themeDefault(options: ThemeOptions)` and `useThemeData<ThemeConfig>()`. The nested types (`NavItem`, `Sidebar`, `Hero`, `Feature`, ...) stay in the `DefaultTheme` namespace for the components and the users.
- **Reason**: The VitePress default theme config contains many fields the theme does not implement or need; keeping its type would let users write configurations that pass the type check but do nothing at runtime. The option type should be the documentation, and a wrong field should fail at type-check time.
- **Benefits**: The option surface matches the implementation; VitePress-only fields are rejected by the type checker; the package entries export the full option types, so users get accurate hints while writing the config.
- **Trade-off**: A configuration written for the VitePress default theme cannot reuse the type as-is and has to be rewritten; the theme options do not automatically follow new VitePress fields.

## Layout resolution: a single `Layout` and the `type` field

- **Approach**: The theme registers only `Layout` (capitalized, following the ecosystem convention) and `NotFound`. The page type is decided by the theme's own frontmatter field `type` instead of VitePress' lowercase `layout`: `home` renders the home page, `doc` (default) the document page, `page` a blank page container, and `content` only the page content without the layout shell. `extendsPage` only fills in page data (`filePathRelative`, `routeMeta.title`) and does not rewrite the frontmatter; the components read the type through `usePageType()` (`useLayout().isHome`, `Layout.vue`, `VPContent.vue`). The VuePress `layout` frontmatter is only used as a registered layout name (custom layouts, `NotFound`).
- **Reason**: The user asked to keep only one layout when one is enough, instead of registering three layouts pointing at the same component; the explicit `type` replaces the VitePress compatibility layer and removes fields such as `originalLayout` that only existed for VitePress checks.
- **Benefits**: The layout registry is clean and the theme has a single layout entry; the page type is an explicit API and the component checks no longer depend on the VitePress frontmatter convention; `extendsPage` does not rewrite user data, so the behavior is predictable; custom layouts (e.g. `layout: CommentPage`) are not affected; the `NotFound` handling is decoupled from the home / doc checks.
- **Trade-off**: The page type is a theme-specific field; VitePress `layout: home|doc|page` is treated as a layout name by VuePress (which the theme does not register) and throws `[vuepress] Cannot resolve layout`, while `layout: false` is not a string and falls back to the full layout shell. The page type switching is handled entirely by `VPContent`; `NotFound` still has to be registered as a second layout, because VuePress sets `frontmatter.layout = 'NotFound'` only after `extendsPage` has run, so the theme cannot rewrite it earlier.

## Not ported from VitePress

Two features of the VitePress default theme are intentionally left out:

- **Carbon Ads**: the `carbonAds` option, the `VPCarbonAds` component and the `__CARBON__` build flag are not ported, and there is no equivalent.
- **Built-in search UI**: the local search box, the `@localSearchIndex` module, the search worker and the `search` theme option are not ported. Install one of the search plugins (`@vuepress/plugin-slimsearch`, `@vuepress/plugin-orama`, `@vuepress/plugin-flexsearch`, `@vuepress/plugin-search`, `@vuepress/plugin-meilisearch`, `@vuepress/plugin-docsearch`) instead — the theme mounts the `SearchBox` component they register.
