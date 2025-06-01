# Styles

<NpmBadge package="@vuepress/theme-default" />

The default theme is styled using CSS, with CSS Variables defining the style variables.

Users can override the default CSS variables and write additional styles through the [style file](#style-file).

## CSS Variable File

You can override the default CSS variables in the [style file](#style-file).

::: details Click to expand CSS variables
@[code scss](@vuepress/theme-default/src/client/styles/vars.css)
:::

## Style File

The path of the style file is `.vuepress/styles/index.css`.

You can add extra styles here, or override the default styles:

```scss
:root {
  scroll-behavior: smooth;
}
```
