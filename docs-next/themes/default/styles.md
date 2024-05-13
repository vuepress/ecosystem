# Styles

<NpmBadge package="@vuepress/theme-default" />

Users can customize style variables via a [palette file](#palette-file),
and add extra styles via a [style file](#style-file).

## Palette File

The path of the palette file is `.vuepress/styles/index.css`.

You can make use of it to override predefined SASS variables of the default theme.

::: details Click to expand CSS variables
@[code scss](@vuepress/theme-default/src/client/styles/vars.css)
:::

## Style File

The path of the style file is `.vuepress/styles/index.scss`.

You can add extra styles here, or override the default styles:

```scss
:root {
  scroll-behavior: smooth;
}
```
