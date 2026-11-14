---
url: /ecosystem/plugins/development/sass-palette.md
---
# sass-palette

Provide advanced styling capabilities for plugin and theme developers, based on [`@vuepress/plugin-palette`](./palette.md).

Compared to the palette plugin, it offers:

* **Derived styles**: generate related styles based on the user config.
* **Theme-like customization**: allow plugins to provide style customization similar to themes.
* **Style isolation and sharing**: group the style system of plugins and themes with the `id` option.

::: tip Dependencies

You should manually install these deps in your project:

* When using Vite bundler: `sass-embedded`
* When using Webpack bundler: `sass-embedded` and `sass-loader`

:::

## Usage

```bash
npm i -D @vuepress/plugin-sass-palette@next
```

The `useSassPalettePlugin` function must be invoked when your plugin is initialized:

```js title="Your plugin or theme entry"
import { useSassPalettePlugin } from '@vuepress/plugin-sass-palette'

export const yourPlugin = (options) => (app) => {
  useSassPalettePlugin(app, {
    id: 'your-plugin',
  })

  return {
    // your plugin api
  }
}
```

## Guide

To use the plugin, you should understand the [id](#id) option, and the three concepts: [Config](#config), [Palette](#palette) and [Generator](#generator).

### Id

Unlike the palette plugin which is restricted to themes, this plugin works for both plugins and themes. The `id` option is the key to this: `useSassPalettePlugin` sets up a style system scoped by the id, and all generated aliases and module names are prefixed with it.

It allows you to:

* **Share the style system**

  Using the same id, multiple plugins (or a theme and its plugins) share the style variables, so that users can configure the variables, breakpoints and other settings in a single file, and have the changes applied everywhere.

  For example, `vuepress-theme-hope` and its related plugins all use the id `hope`, so the styles the user configures for the theme are also applied to those plugins.

* **Isolate the styles**

  Using different ids, plugins do not affect each other. You should set the `id` to your plugin name.

  By default, the user configures your styles with the Sass files prefixed with the id, and you access the variables via the `${id}-config` and `${id}-palette` modules.

  For example, `vuepress-theme-hope` using the id `hope` and a plugin using the id `abc` are fully independent, they access their own variables via `hope-config`/`hope-palette` and `abc-config`/`abc-palette`.

* **Avoid side effects**

  Calling the plugin multiple times with the same id is safe.

### Config

The **Config** file only contains **Sass variables**, which are available via the `${id}-config` module.

You provide a default config file with the [defaultConfig](#defaultconfig) option, where the variables should be marked with `!default` so that the user config can override them.

```scss title="Default config"
$navbar-height: 2rem !default;
$sidebar-width: 18rem !default;
```

```scss title="User config (.vuepress/styles/abc-config.scss)"
$navbar-height: 3.5rem;
```

```scss title="Usage"
// in a `<style lang="scss">` block or a directly imported Sass file
@debug abc-config.$navbar-height; // 3.5rem
@debug abc-config.$sidebar-width; // 18rem
```

::: warning Import limitation

The `${id}-config` module is injected with the `additionalData` option of the bundler, so it is only available in:

* `<style lang="scss">` blocks of Vue SFC files.
* Sass files imported directly by script files, e.g. `import './styles.scss'`.

When a Sass file is imported by another Sass file with `@use` or `@import`, the module is not available automatically, you must import it manually with `@use "@sass-palette/${id}-config";`.

:::

### Palette

The **Palette** file contains **CSS variables**. Every variable is converted to kebab-case and injected into the root stylesheet.

You provide default values with the [defaultPalette](#defaultpalette) option, also marked with `!default`.

```scss title="Default palette"
$color-a: blue !default;
$color-b: green !default;
```

```scss title="User palette (.vuepress/styles/abc-palette.scss)"
$color-a: red;
```

```scss title="Generated CSS"
:root {
  --color-a: red;
  --color-b: green;
}
```

To support the light and dark modes, a color variable can be a map with `light` and `dark` keys, then the CSS variables of both modes are generated.

```scss
$text-color: (
  light: #222,
  dark: #999,
);
```

```scss
:root {
  --text-color: #222;
}

[data-theme='dark'] {
  --text-color: #999;
}
```

Only **colors** (including light/dark maps), **lengths** and **strings** are allowed in the palette, other types are discarded to keep the generated CSS variables valid. Complex values should be strings.

```scss
// ❌ Regarded as a Sass list, triggers a warning and is dropped
$moveTransition: width 0.3s ease;

// ✅ :root { --move-transition: width 0.3s ease; }
$moveTransition: 'width 0.3s ease';
```

The palette module is named `${id}-palette`, which also includes the values from the generator, and shares the same import limitation as the config module.

### Generator

The **Generator** file generates derived values based on the palette and config variables. Its variables are injected as CSS variables like the palette, and are also available in the palette module.

For example, you may want a lighter version of the user's theme color:

```scss
@use 'sass:color';
@use '@sass-palette/helper';

$theme-color-light: (
  light: color.scale(helper.get-color($theme-color), $lightness: 10%),
  dark: color.scale(helper.get-dark-color($theme-color), $lightness: 10%),
) !default;
```

Config variables are also available:

```scss
@use 'sass:color';
@use '@sass-palette/abc-config';
@use '@sass-palette/helper';

$code-c-bg: abc-config.$highlighter == 'shiki' ? #fff : #f8f8f8;
```

### Helper

The internal Sass functions of the plugin are exposed via the `@sass-palette/helper` module.

## Options

::: fields
@`id` type=string required

The unique identifier of the plugin instance, used to scope the style system.

See also: [Id](#id).

@`config` type=string default=`.vuepress/styles/${id}-config.scss`

The path of the user config file, relative to the source directory.

See also: [Config](#config).

@`defaultConfig` type=string default="@vuepress/plugin-sass-palette/styles/default/config.scss"

The absolute path of the default config file.

See also: [Config](#config).

@`palette` type=string default=`.vuepress/styles/${id}-palette.scss`

The path of the user palette file, relative to the source directory.

See also: [Palette](#palette).

@`defaultPalette` type=string

The absolute path of the default palette file.

See also: [Palette](#palette).

@`generator` type=string

The absolute path of the generator file.

See also: [Generator](#generator).

:::

## Alias

The following aliases are available for import:

* **config**: `@sass-palette/${id}-config`
* **palette**: `@sass-palette/${id}-palette`
* **helper**: `@sass-palette/helper`
