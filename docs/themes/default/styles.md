---
icon: paintbrush-vertical
---

# Styles

The theme is styled with plain CSS — no SASS or SCSS is involved, and no style preprocessor is needed to customize it. Colors, sizes and transitions are CSS custom properties, so a site can restyle the theme by overriding variables and adding rules in one file.

<NpmBadge package="@vuepress/theme-default" />

The client entry imports the styles of the theme in this order:

1. The Inter webfont and the `--vp-font-family-*` variables.
2. The shared color variables of `@vuepress/helper`.
3. `vars.css` — the variables of the theme.
4. `base.css` — the reset and the shared rules.
5. The component styles, for example `vp-doc.css` for the document content.

## Custom Styles

The theme declares `.vuepress/styles/index.css` as its [`userStyle`](https://vuepress.vuejs.org/reference/config.html#userstyle). VuePress imports that file after the styles of the theme when it exists, so it is the place for custom CSS:

```css
/* .vuepress/styles/index.css */
:root {
  --vp-c-brand: #0f766e;
  --vp-c-brand-hover: #0d9488;
  --vp-c-brand-bg: #14b8a6;
  --vp-c-brand-soft: rgb(20 184 166 / 14%);
}

[data-theme='dark'] {
  --vp-c-brand: #5eead4;
  --vp-c-brand-hover: #2dd4bf;
  --vp-c-brand-bg: #14b8a6;
}

.vp-doc h2 {
  border-block-start-color: var(--vp-c-divider);
}
```

The dark mode is selected by the `data-theme` attribute on `<html>`, whose value is `'dark'` or `'light'`. There is no `dark` class and no `prefers-color-scheme` media query to target, so `[data-theme='dark']` is the selector for the dark values.

::: tip
The theme does not include a SASS palette plugin. Every color is a CSS variable, so overriding variables in `.vuepress/styles/index.css` replaces what the `palette` option of the classic theme did.
:::

Use the [`pageClass`](./frontmatter.md) frontmatter to scope rules to one page, since that class is added to the container of the page:

```css
.my-page .vp-doc h1 {
  font-size: 3rem;
}
```

## CSS Variables

The variables below are defined in `vars.css`. Their names are stable, and the theme uses them everywhere, so overriding one changes every place it is used.

### Brand Colors

The theme uses the indigo palette as its brand color. `--vp-c-brand` is the primary color, `--vp-c-brand-hover` is its hover state, `--vp-c-brand-bg` is the solid background state, and `--vp-c-brand-soft` is a translucent version for backgrounds.

::: fields
@`--vp-c-brand` type=color default=`#3451b2`

The main brand color, used for the links, the active outline entry and the code links. Dark value: `#a8b1ff`.

@`--vp-c-brand-hover` type=color default=`#3a5ccc`

The hover state of the brand color. Dark value: `#5c73e7`.

@`--vp-c-brand-bg` type=color default=`#5672cd`

The strongest background state of the brand color, used by the brand button. Dark value: `#3e63dd`.

@`--vp-c-brand-soft` type=color default=`rgb(100 108 255 / 14%)`

A translucent brand color, used for the highlighted code lines and the soft backgrounds. Dark value: `rgb(100 108 255 / 16%)`.

:::

### Functional Colors

The hint containers, the badges and the diff markers are colored by function rather than by palette, so they can be restyled in one place:

| Variable             | Default            | Used by                          |
| -------------------- | ------------------ | -------------------------------- |
| `--vp-c-default-*`   | the gray palette   | neutral surfaces                 |
| `--vp-c-tip-*`       | the brand palette  | tips and notes                   |
| `--vp-c-note-*`      | the brand palette  | notes                            |
| `--vp-c-success-*`   | the green palette  | the diff additions               |
| `--vp-c-important-*` | the purple palette | important containers             |
| `--vp-c-warning-*`   | the yellow palette | warnings                         |
| `--vp-c-danger-*`    | the red palette    | dangers and the diff removals    |
| `--vp-c-caution-*`   | the red palette    | cautions, the `danger` container |

Each group has the `<group>`, `<group>-hover`, `<group>-bg` and `<group>-soft` variants, following the same naming as the brand color: the first one is the text color, `-hover` is the hover state, `-bg` is the solid background state, and `-soft` is the translucent background. A group is defined as an alias of a palette, so overriding the palette changes the group too.

The numeric names of the VitePress port (`--vp-c-brand-1`, `--vp-c-text-2`, `--vp-c-gray-3`, …) are still available as compatibility aliases for the ecosystem plugins. New styles should use the semantic names above.

When [`gradedContainers`](./config.md#basic-config) is enabled, the theme remaps the warning colors to the orange palette and the caution colors to the yellow palette, which gives a green → orange → yellow → red scale.

### Palette

The palette variables are the source of the functional colors. The gray palette also uses semantic names (`--vp-c-gray`, `--vp-c-gray-light` and `--vp-c-gray-dark`); the steps are ordered relative to the surface, so the steps that are the lightest in the light mode are the darkest in the dark mode. The other palettes keep the numbered scale where `-1` is the darkest variant and `-3` the lightest:

| Variable            | Light     | Dark      |
| ------------------- | --------- | --------- |
| `--vp-c-gray`       | `#dddde3` | `#515c67` |
| `--vp-c-gray-light` | `#e4e4e9` | `#414853` |
| `--vp-c-gray-dark`  | `#ebebef` | `#32363f` |
| `--vp-c-indigo-1`   | `#3451b2` | `#a8b1ff` |
| `--vp-c-indigo-2`   | `#3a5ccc` | `#5c73e7` |
| `--vp-c-indigo-3`   | `#5672cd` | `#3e63dd` |
| `--vp-c-purple-1`   | `#6f42c1` | `#c8abfa` |
| `--vp-c-purple-2`   | `#7e4cc9` | `#a879e6` |
| `--vp-c-purple-3`   | `#8e5cd9` | `#8e5cd9` |
| `--vp-c-green-1`    | `#18794e` | `#3dd68c` |
| `--vp-c-green-2`    | `#299764` | `#30a46c` |
| `--vp-c-green-3`    | `#30a46c` | `#298459` |
| `--vp-c-yellow-1`   | `#915930` | `#f9b44e` |
| `--vp-c-yellow-2`   | `#946300` | `#da8b17` |
| `--vp-c-yellow-3`   | `#9f6a00` | `#a46a0a` |
| `--vp-c-orange-1`   | `#9a4224` | `#fb8c00` |
| `--vp-c-orange-2`   | `#b95a00` | `#e46a02` |
| `--vp-c-orange-3`   | `#c16200` | `#b45309` |
| `--vp-c-red-1`      | `#b8272c` | `#f66f81` |
| `--vp-c-red-2`      | `#d5393e` | `#f14158` |
| `--vp-c-red-3`      | `#e0575b` | `#b62a3c` |
| `--vp-c-sponsor`    | `#db2777` | `#db2777` |

Each palette also has a translucent `-soft` variant, used for the backgrounds.

The solid colors are `--vp-c-white` (`#fff`), `--vp-c-black` (`#000`), `--vp-c-neutral` — which is black in the light mode and white in the dark mode — and `--vp-c-neutral-inverse`, which is the opposite.

### Text

| Variable             | Light     | Dark      | Description                    |
| -------------------- | --------- | --------- | ------------------------------ |
| `--vp-c-text`        | `#3c3c43` | `#dfdfd6` | body text and headings         |
| `--vp-c-text-mute`   | `#67676c` | `#98989f` | secondary text and code blocks |
| `--vp-c-text-subtle` | `#929295` | `#6a6a71` | muted text and placeholders    |

### Background

| Variable         | Light     | Dark      | Description                               |
| ---------------- | --------- | --------- | ----------------------------------------- |
| `--vp-c-bg`      | `#fff`    | `#1b1b1f` | the page background                       |
| `--vp-c-bg-alt`  | `#f6f6f7` | `#161618` | the sidebar and the code block background |
| `--vp-c-bg-elv`  | `#fff`    | `#202127` | the elevated surfaces                     |
| `--vp-c-bg-soft` | `#f6f6f7` | `#202127` | the soft surfaces                         |

### Borders

| Variable         | Light     | Dark      | Description                    |
| ---------------- | --------- | --------- | ------------------------------ |
| `--vp-c-border`  | `#c2c2c4` | `#3c3f44` | borders with a strong contrast |
| `--vp-c-divider` | `#e2e2e3` | `#2e2e32` | dividers between sections      |
| `--vp-c-gutter`  | `#e2e2e3` | `#000`    | the gutter lines               |

### Typography

::: fields
@`--vp-font-family-base` type=string default=`'Inter', -apple-system, blinkmacsystemfont, sans-serif, …, 'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji'`

The font family of the text. The client entry loads the Inter webfont from Google Fonts and declares the self-hosted subsets of the font.

@`--vp-font-family-mono` type=string default=`'ui-monospace', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', monospace`

The font family of the code.
:::

The base font size is the one of the browser, `1rem = 16px` by default. The theme does not scale the page with `rem` variables beyond the ones below.

### Layout

| Variable                    | Default  | Description                          |
| --------------------------- | -------- | ------------------------------------ |
| `--vp-layout-max-width`     | `90rem`  | the maximum width of the layout      |
| `--vp-nav-height`           | `4rem`   | the height of the navbar             |
| `--vp-nav-logo-height`      | `1.5rem` | the height of the logo in the navbar |
| `--vp-sidebar-width`        | `17rem`  | the width of the sidebar             |
| `--vp-header-anchor-symbol` | `'#'`    | the symbol of a heading anchor       |

The z-index of the layout layers is exposed as `--vp-z-index-footer` (`10`), `--vp-z-index-local-nav` (`20`), `--vp-z-index-nav` (`30`), `--vp-z-index-layout-top` (`40`), `--vp-z-index-backdrop` (`50`) and `--vp-z-index-sidebar` (`60`, `25` on wide screens).

### Navbar, Sidebar and Backdrop

| Variable                       | Default               | Description                                   |
| ------------------------------ | --------------------- | --------------------------------------------- |
| `--vp-nav-bg-color`            | `var(--vp-c-bg)`      | the background of the navbar                  |
| `--vp-nav-home-bg-color`       | `transparent`         | the background of the navbar on the home page |
| `--vp-nav-divider-color`       | `var(--vp-c-gutter)`  | the line under the navbar                     |
| `--vp-nav-screen-bg-color`     | `var(--vp-c-bg)`      | the background of the mobile menu             |
| `--vp-nav-backdrop-filter`     | `none`                | the backdrop filter of the navbar             |
| `--vp-local-nav-bg-color`      | the navbar background | the background of the local nav               |
| `--vp-local-nav-divider-color` | the navbar divider    | the line under the local nav                  |
| `--vp-sidebar-bg-color`        | `var(--vp-c-bg-alt)`  | the background of the sidebar                 |
| `--vp-backdrop-bg-color`       | `rgb(0 0 0 / 60%)`    | the backdrop of the mobile menu               |

The `.hide-nav` class on `<html>` sets `--vp-nav-height` to `0`. It is applied by the theme when the `navbar` frontmatter of the current page is `false`, and it also shrinks the navbar offset of the sidebar.

### Buttons and Badges

The three button themes have their own variables, named `--vp-button-{brand,alt,sponsor}-{border,text,bg,hover-border,hover-text,hover-bg,active-border,active-text,active-bg}`. The badge types have `--vp-badge-{type}-{border,text,bg}` for `info`, `note`, `tip`, `important`, `caution`, `warning` and `danger`.

### Code Blocks

The code block variables are consumed by the theme CSS and by `@vuepress/plugin-shiki`:

| Variable                           | Default                    | Description                                |
| ---------------------------------- | -------------------------- | ------------------------------------------ |
| `--vp-code-line-height`            | `1.7`                      | the line height of the code                |
| `--vp-code-font-size`              | `0.875em`                  | the font size of the code                  |
| `--vp-code-color`                  | `var(--vp-c-brand)`        | the color of the inline code               |
| `--vp-code-bg`                     | `var(--vp-c-default-soft)` | the background of the inline code          |
| `--vp-code-block-color`            | `var(--vp-c-text-mute)`    | the text color of the code blocks          |
| `--vp-code-block-bg`               | `var(--vp-c-bg-alt)`       | the background of the code blocks          |
| `--vp-code-block-divider-color`    | `var(--vp-c-gutter)`       | the divider of the code blocks             |
| `--vp-code-lang-color`             | `var(--vp-c-text-mute)`    | the color of the language label            |
| `--vp-code-line-highlight-color`   | `var(--vp-c-default-soft)` | the background of a highlighted line       |
| `--vp-code-line-number-color`      | `var(--vp-c-text-mute)`    | the color of the line numbers              |
| `--vp-code-line-diff-add-color`    | `var(--vp-c-success-soft)` | the background of a diff addition          |
| `--vp-code-line-diff-remove-color` | `var(--vp-c-danger-soft)`  | the background of a diff removal           |
| `--vp-code-line-warning-color`     | `var(--vp-c-warning-soft)` | the background of a warning line           |
| `--vp-code-line-error-color`       | `var(--vp-c-danger-soft)`  | the background of an error line            |
| `--vp-code-copy-code-bg`           | `var(--vp-c-bg-soft)`      | the background of the copy button          |
| `--vp-code-copy-code-hover-bg`     | `var(--vp-c-bg)`           | the background of the copy button on hover |
| `--vp-code-copy-code-active-text`  | `var(--vp-c-text-mute)`    | the text color of the copy button          |
| `--vp-code-tab-text-color`         | `var(--vp-c-text-mute)`    | the text color of the code tab             |
| `--vp-code-tab-active-text-color`  | `var(--vp-c-text)`         | the text color of the active code tab      |
| `--vp-code-tab-active-bar-color`   | `var(--vp-c-brand)`        | the bar of the active code tab             |

The light and dark themes of Shiki are emitted as the `--shiki-light` and `--shiki-dark` inline variables of each token, so overriding the code block variables does not replace the syntax colors. See [Shiki](../../plugins/markdown/shiki.md) to change the two themes.

### Hint Containers

The hint containers are styled by `@vuepress/plugin-markdown-hint`, which maps its own `--{type}-c-*` variables onto the theme colors:

| Variable               | Default                 | Description                         |
| ---------------------- | ----------------------- | ----------------------------------- |
| `--tip-c-accent`       | `var(--vp-c-green-bg)`  | the accent of a tip                 |
| `--note-c-accent`      | `var(--vp-c-grey-bg)`   | the accent of a note                |
| `--info-c-accent`      | `var(--vp-c-blue-bg)`   | the accent of an info               |
| `--important-c-accent` | `var(--vp-c-purple-bg)` | the accent of an important block    |
| `--warning-c-accent`   | `var(--vp-c-yellow-bg)` | the accent of a warning             |
| `--caution-c-accent`   | `var(--vp-c-red-bg)`    | the accent of a caution             |
| `--detail-c-bg`        | `var(--vp-c-control)`   | the background of a details block   |
| `--hint-font-size`     | `0.875rem`              | the font size of the container text |

Each container type also has `-c-text` and `-c-soft` variants.

### Home Hero

| Variable                                | Default                                             | Description                      |
| --------------------------------------- | --------------------------------------------------- | -------------------------------- |
| `--vp-home-hero-name-color`             | `transparent`                                       | the color of the hero name       |
| `--vp-home-hero-name-background`        | `linear-gradient(120deg, #3eaf7c 30%, #1b1b1f)`     | the background of the hero name  |
| `--vp-home-hero-image-background-image` | `linear-gradient(-45deg, #3eaf7c 50%, #232327 50%)` | the background of the hero image |
| `--vp-home-hero-image-filter`           | `blur(44px)`                                        | the filter of the hero image     |

The name uses a gradient clipped to the text, which is why its color is transparent. Override `--vp-home-hero-name-background` with another gradient, or set the name color to a solid color and clear the background.

### Transitions and Plugin Compatibility

::: fields
@`--vp-t-color` type=string default=`0.3s ease`

The transition of the colors and the backgrounds, applied by the theme surfaces. The classic theme used the same name.

@`--vp-t-transform` type=string default=`0.3s ease`

The transition of the transforms, such as the mobile menu.

@`--vp-c-accent` type=color default=`var(--vp-c-brand)`

The former generic accent color. Together with `--vp-c-accent-hover`, `--vp-c-accent-bg`, `--vp-c-accent-text` and `--vp-c-accent-soft`, it is kept for the plugin styles of the ecosystem, which styled themselves against the classic theme. The text colors are canonical (`--vp-c-text`, `--vp-c-text-mute`, `--vp-c-text-subtle`), so they need no alias.

@`--vp-c-control` type=color default=`var(--vp-c-bg-soft)`

The background of the form controls, kept with `--vp-c-control-hover` and `--vp-c-control-disabled` for the plugin styles.
:::

The palette also exposes the former names `--vp-c-grey-{text,soft}`, `--vp-c-green-text`, `--vp-c-indigo-text`, `--vp-c-purple-text`, `--vp-c-red-text`, `--vp-c-yellow-text`, `--vp-c-blue-{text,bg,soft}` and `--vp-c-shadow`. They are aliases of the variables above, so a plugin that styles itself against the classic theme keeps working, and a site that overrides one of them should override the variable it aliases instead.

## RTL

The layout keeps its direction in variables: `--vp-direction-multiplier` is `1` in LTR and `-1` in RTL, and `--vp-direction-mark` is the LTR or RTL mark. The theme switches those with `[dir='rtl']`, and the same selector drives the logical properties of the layout. To render a site in RTL, use `@vuepress/plugin-rtl`.
