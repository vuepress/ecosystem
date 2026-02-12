---
url: /plugins/development/sass-palette/config.md
---
# Config

## Options

### id

* Type: `string`
* Required: Yes
* Details: The unique identifier for the plugin instance. This is used to scope the style system and avoid conflicts between different plugins or themes.

### config

* Type: `string`
* Default: `` `.vuepress/styles/${id}-config.scss` ``
* Details: The path to the user's Sass configuration file, relative to the source directory.

::: tip

This file is where users define Sass variables.

The default filename is prefixed with the `id` defined above.

:::

### defaultConfig

* Type: `string`
* Default: `"@vuepress/plugin-sass-palette/styles/default/config.scss"`
* Details: The absolute path to the default Sass configuration file.

::: tip

As a plugin developer, you should use this file to provide fallback values for variables using the `!default` flag.

:::

### palette

* Type: `string`
* Default: `` `.vuepress/styles/${id}-palette.scss` ``
* Details: The path to the user's palette file, relative to the source directory.

::: tip

This file allows users to control injected CSS variables. All variables defined here will be converted to kebab-case and injected into the CSS root.

The default filename is prefixed with the `id` defined above.

:::

### defaultPalette

* Type: `string`
* Details: The absolute path to the default palette file.

::: tip

As a plugin developer, you should use this file to provide default CSS variables via Sass variables using the `!default` flag. These will also be converted to kebab-case and injected.

:::

### generator

* Type: `string`
* Details:

  The absolute path to a custom generator file. This is used to derive new values based on the palette configuration.

  For example, you can use this to generate a `$theme-color-light` variable based on the `$theme-color` provided by the user.

### style

* Type: `string`
* Details: The path to the user's custom style file, relative to the source directory. This is used for standard CSS/Sass customization.

## Alias

The following aliases are available for import:

* **config**: `@sass-palette/${id}-config` (Derived from `id`)
* **palette**: `@sass-palette/${id}-palette` (Derived from `id`)
* **style**: `@sass-palette/${id}-style` (Only available when the `style` option is set)
* **helper**: `@sass-palette/helper`
