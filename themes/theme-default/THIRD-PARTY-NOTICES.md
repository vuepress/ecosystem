# Third-party notices

## VitePress default theme

The files under `src/client/theme-default` are vendored from the VitePress default theme
(`vitepress@2.0.0-alpha.21`, `src/client/theme-default`), with these changes:

- imports rewritten to the native VuePress client APIs (`vuepress/client`,
  `@vuepress/plugin-theme-data/client`, `@vuepress/helper/client`) and `.js` extensions added
- public CSS classes renamed from the VitePress `VP` prefix to the ecosystem `vp-` prefix
- search UI and Carbon ads components removed; the navbar mounts the global `SearchBox`
  registered by a VuePress search plugin instead

VitePress is licensed under the MIT License. The license text is included in
[LICENSE.vitepress](./LICENSE.vitepress).

## Inter font

The webfonts under `src/client/theme-default/fonts` are the Inter font files bundled by VitePress.
Inter is licensed under the SIL Open Font License, Version 1.1. The license text is bundled with
the fonts at `dist/client/theme-default/fonts/LICENSE.txt`.

## Lucide icons

The internal UI icons inlined in `src/client/theme-default/styles/icons.css` are adapted from
[Lucide](https://lucide.dev/), used under the ISC License.

## Icons

Iconify icons are rendered at runtime by `@vuepress/plugin-icon` through the
[Iconify](https://iconify.design) `<iconify-icon>` web component; the icon data is loaded from the
Iconify CDN and is not bundled with this theme. The theme's own UI icons (arrows, sun / moon, …) are
inlined as CSS data URIs in `src/client/theme-default/styles/icons.css`.
