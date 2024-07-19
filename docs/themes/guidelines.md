# Theme Guidelines

To avoid theme developers and users setting unneeded options, we have a set of guidelines that should be followed when creating a theme.

## DOM Structure

A theme must implement the following DOM structure:

- Container: An element which contains the entire theme. This element should have an attribute `vp-container`.
- Content: An element which holds markdown render results. This element should have an attribute `vp-content`.

A theme may have the following optional elements:

- Navbar: Navbar of the site. This element should have an attribute `vp-navbar`.
- Sidebar: Sidebar of the site. This element should have an attribute `vp-sidebar`.
- Outline: Headings or outline of the main content. This element should have an attribute `vp-outline`.
- Comment: Comment service (comment box and comment list). This element should have an attribute `vp-comment`.
- Footer: Footer of the site. This element should have an attribute `vp-footer`.

A theme must:

- Set `data-theme` to `dark` on html in darkmode.
- Set `data-theme` to `light` on html in lightmode.

If it only have one color scheme, it still needs to set `data-theme` to `light` or `dark` to indicate the default color scheme.

## Color Variables

A theme must implement the following color variables:

### Text

- `--vp-c-text`: Default text color.
- `--vp-c-text-mute`: Colors for muted texts, such as "inactive menu" or "info texts".

### Background

- `--vp-c-bg`: The bg color used for main screen.
- `--vp-c-bg-alt`: The alternative bg color used in places such as "sidebar", or "code block".
- `--vp-c-bg-elv`: The elevated bg color. This is used at parts where it "floats", such as "dialog".
- `--vp-c-bg-soft`: The bg color to slightly distinguish some components from the page. Used for things like "carbon ads" or "table".

### Accent

Accent color and brand colors which used for interactive components.

- `--vp-c-accent`: The most solid color used mainly for colored text. It must satisfy the contrast ratio against when used on top of `--vp-c-accent-soft`.
- `--vp-c-accent-hover`: Color used for hover state.
- `--vp-c-accent-bg`: Color used for solid background. It must satisfy the contrast ratio with `--vp-c-accent-text` on top of it.
- `--vp-c-accent-text`: Color used for text with `--vp-c-accent-bg` background. It must satisfy the contrast ratio with `--vp-c-accent-bg`.
- `--vp-c-accent-soft`: The color used for subtle background such as custom container or badges. It must satisfy the contrast ratio when putting `--vp-c-accent` colors on top of it.

  The soft color must be semi transparent alpha channel. This is crucial because it allows adding multiple "soft" colors on top of each other to create a accent, such as when having inline code block inside custom containers.

## Borders

- `--vp-c-border`: Border color for interactive components. For example this should be used for a button outline.
- `--vp-c-divider`: Color for separators, used to divide sections within the same components, such as having separator on "h2" heading.
- `--vp-c-gutter`: Colors for gutter, used to divide components in the page. For example the header and the lest of the page.

## Controls

- `--vp-c-control-text`: Text color for focus state of interactive controls.
- `--vp-c-control`: Background color for interactive controls, such as buttons or checkboxes.
- `--vp-c-control-hover`: Background color for hover state of interactive controls.
- `--vp-c-control-active`: Background color for active or focus state of interactive controls.
- `--vp-c-control-disabled`: Color for disabled state of interactive controls.
