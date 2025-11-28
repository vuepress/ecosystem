---
url: /plugins/development/palette.md
---
# palette

Provide palette support for your theme.

This plugin is primarily designed for theme development and has been integrated into the default theme. You typically won't need to use it directly in most cases.

For theme authors, this plugin provides users with the ability to customize styles.

## Usage

```bash
npm i -D @vuepress/plugin-palette@next
```

```ts title=".vuepress/config.ts"
import { palettePlugin } from '@vuepress/plugin-palette'

export default {
  plugins: [
    palettePlugin({
      // options
    }),
  ],
}
```

## Palette and Style

This plugin provides a `@vuepress/plugin-palette/palette` (palette file) and a `@vuepress/plugin-palette/style` (style file) for import in your theme styles.

The palette file is used to define style variables, so it's typically imported at the beginning of your theme styles. For example, users can define [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties), [SASS variables](https://sass-lang.com/documentation/variables), [LESS variables](http://lesscss.org/features/#variables-feature), or [Stylus variables](https://stylus-lang.com/docs/variables.html) in the palette, and then you can use those variables in your theme styles.

The style file is used to override default styles or add extra styles, so it's typically imported at the end of your theme styles.

## Usage

Use this plugin in your theme, assuming you're using SASS:

```ts
import { palettePlugin } from '@vuepress/plugin-palette'

export default {
  // ...
  plugins: [
    palettePlugin({ preset: 'sass' }),
    // ...
  ],
}
```

### Usage of Palette

Import the plugin's palette file wherever your theme needs to use the corresponding variables, such as in the `Layout.vue` file:

```vue
<template>
  <h1 class="palette-title">Hello, Palette!</h1>
</template>

<style lang="scss">
/* import variables from the plugin's palette file */
@use '@vuepress/plugin-palette/palette' as *;

/* set default value for variables */
$color: red !default;

/* use variables in your styles */
.palette-title {
  color: $color;
}
</style>
```

Then users can customize variables in `.vuepress/styles/palette.scss`:

```scss
$color: green;
```

### Usage of Style

Import the plugin's style file after your theme's styles, for example, in the `clientConfigFile`:

```ts
// import your theme's style file
import 'path/to/your/theme/style'
// import the plugin's style file
import '@vuepress/plugin-palette/style'
```

Then users can add extra styles in `.vuepress/styles/index.scss` and override your theme's default styles:

```scss
h1 {
  font-size: 2.5rem;
}
```

## Options

### preset

* Type: `'css' | 'less' | 'sass' | 'stylus'`

* Default: `'css'`

* Details:

  Set preset for other options.

  If you don't need advanced customization of the plugin, it's recommended to set only this option and omit others.

### userPaletteFile

* Type: `string`

* Default:
  * css: `'.vuepress/styles/palette.css'`
  * less: `'.vuepress/styles/palette.less'`
  * sass: `'.vuepress/styles/palette.scss'`
  * stylus: `'.vuepress/styles/palette.styl'`

* Details:

  File path of the user palette file, relative to source directory.

  The default value depends on the [preset](#preset) option.

  This file is where users define style variables, and it's recommended to keep the default file path as a convention.

### tempPaletteFile

* Type: `string`

* Default:
  * css: `'styles/palette.css'`
  * less: `'styles/palette.less'`
  * sass: `'styles/palette.scss'`
  * stylus: `'styles/palette.styl'`

* Details:

  File path of the generated palette temp file, relative to temp directory.

  The default value depends on the [preset](#preset) option.

  You should import the palette file via `'@vuepress/plugin-palette/palette'` alias, so you don't need to change this option in most cases.

### userStyleFile

* Type: `string`

* Default:
  * css: `'.vuepress/styles/index.css'`
  * less: `'.vuepress/styles/index.less'`
  * sass: `'.vuepress/styles/index.scss'`
  * stylus: `'.vuepress/styles/index.styl'`

* Details:

  File path of the user style file, relative to source directory.

  The default value depends on the [preset](#preset) option.

  This file is where users override default styles or add extra styles, and it's recommended to keep the default file path as a convention.

### tempStyleFile

* Type: `string`

* Default:
  * css: `'styles/index.css'`
  * less: `'styles/index.less'`
  * sass: `'styles/index.scss'`
  * stylus: `'styles/index.styl'`

* Details:

  File path of the generated style temp file, relative to temp directory.

  The default value depends on the [preset](#preset) option.

  You should import the style file via `'@vuepress/plugin-palette/style'` alias, so you don't need to change this option in most cases.

### importCode

* Type: `(filePath: string) => string`

* Default:
  * css: `` (filePath) => `@import '${filePath}';\n` ``
  * less: `` (filePath) => `@import '${filePath}';\n` ``
  * sass: `` (filePath) => `@forward 'file:///${filePath}';\n` ``
  * stylus: `` (filePath) => `@require '${filePath}';\n` ``

* Details:

  Function to generate import code.

  The default value depends on the [preset](#preset) option.

  This option is used for generating [tempPaletteFile](#temppalettefile) and [tempStyleFile](#tempstylefile), and you don't need to change this option in most cases.
