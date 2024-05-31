# Theme Guidelines

To avoid theme developers and users setting unneeded options, we have a set of guidelines that should be followed when creating a theme.

## DOM Structure

A theme must implement the following DOM structure:

- Container: An element which contains the entire theme. This element should have the id `vp-container`.
- Content: An element which holds markdown render results. This element should have the id `vp-content`.

A theme may have the following optional elements:

- Navbar: Navbar of the site. This element should have the id `vp-navbar`.
- Sidebar: Sidebar of the site. This element should have the id `vp-sidebar`.
- Outline: Headings or outline of the main content. This element should have the id `vp-outline`.
- Comment: Comment service (comment box and comment list). This element should have the id `vp-comment`.
- Footer: Footer of the site. This element should have the id `vp-footer`.

A theme must:

- Set `data-theme` to `dark` on html in darkmode.
- Set `data-theme` to `light` on html in lightmode.

If it only have one color scheme, it still needs to set `data-theme` to `light` or `dark` to indicate the default color scheme.

## Color Variables

A theme must implement the following color variables:

TODO

<!--
- `--vp-bg-color`: Background color of the theme.
- `--vp-text-color`: Text color of the theme.
- `--vp-brand-color`: Theme color of the theme.
- `--vp-brand-hover`: Theme color used hover state.
- `--vp-brand-bg`: Theme color used in bg, must have enough contrast. -->
