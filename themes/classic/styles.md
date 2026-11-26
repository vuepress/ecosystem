---
url: /themes/classic/styles.md
---
# Styles

The classic theme uses [SASS](https://sass-lang.com/) as the CSS pre-processor.

Users can customize style variables via a [palette file](#palette-file),
and add extra styles via a [style file](#style-file).

## Palette File

The path of the palette file is `.vuepress/styles/palette.scss`.

You can make use of it to override predefined SASS variables of the classic theme.

::: details Click to expand SASS variables
@[code{3-} scss](@vuepress/theme-classic/src/client/styles/_variables.scss)
:::

## Style File

The path of the style file is `.vuepress/styles/index.scss`.

You can add extra styles here, or override the default styles:

```scss
:root {
  scroll-behavior: smooth;
}
```

You can also make use of it to override predefined CSS variables of the classic theme.

:::: code-tabs

@tab Light

@[code](@vuepress/theme-classic/src/client/styles/vars.scss)

@tab Dark

@[code](@vuepress/theme-classic/src/client/styles/vars-dark.scss)

::::
