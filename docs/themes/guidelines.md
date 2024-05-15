# Theme Guidelines

To avoid theme developers and users setting unneeded options, we have a set of guidelines that should be followed when creating a theme.

## DOM Structure

A theme must implement the following DOM structure:

- Container: An element which contains the entire theme. This element should have the id `vp-container`.
- Content: An element which holds markdown render results. This element should have the id `vp-content`.

A theme may have the following optional elements:

- Navbar: An element which is the navbar of the theme. This element should have the id `vp-navbar`.
- Sidebar: An element which is the sidebar of the theme. This element should have the id `vp-sidebar`.
- Outline: An element which holds headings or outline of the main content. This element should have the id `vp-outline`.
- Comment: An element which holds comment service. This element should have the id `vp-comment`.
- Footer: An element which is the footer of the theme. This element should have the id `vp-footer`.

If a theme has darkmode and lightmode, it must:

- Set `data-theme` to `dark` on html in darkmode.
- Set `data-theme` to `light` on html in lightmode.

## Color Variables

A theme must implement the following color variables:

TODO

<!--
- `--vp-bg-color`: Background color of the theme.
- `--vp-text-color`: Text color of the theme.
- `--vp-brand-color`: Theme color of the theme.
- `--vp-brand-hover`: Theme color used hover state.
- `--vp-brand-bg`: Theme color used in bg, must have enough contrast. -->
