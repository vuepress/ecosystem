---
icon: settings-2
---

# Config

## Options

### id

- Type: `string`
- Required: Yes

Identifier for palette, used to avoid duplicate registration.

### config

- Type: `string`
- Default: `` `.vuepress/styles/${id}-config.scss` ``

User config file path, relative to source dir.

::: tip

This is the file where users set style variables.

The default filename starts with ID above.

:::

### defaultConfig

- Type: `string`
- Default: `"@vuepress/plugin-sass-palette/styles/default/config.scss"`

Default config file path, should be absolute path.

::: tip

This is the file you should use to provide default values with `!default`.

:::

### palette

- Type: `string`
- Default: `` `.vuepress/styles/${id}-palette.scss` ``

User palette file path, relative to source dir.

::: tip

This is the file where users control injected CSS variables. All the variables will be converted to kebab-case and injected.

The default filename starts with ID above.

:::

### defaultPalette

- Type: `string`

Default palette file path, should be absolute path.

::: tip

This is the file you should use to provide default CSS variables with `!default`. All the variables will be converted to kebab-case and injected.

:::

### generator

- Type: `string`

Custom generator used to generate derivative values with palette config.

For example: You may want to provide a `$theme-color-light` based on `$theme-color`.

### style

- Type: `string`

User style file path, relative to source dir.

## Alias

Available aliases are:

- config: `@sass-palette/${id}-config` (based on `id`)
- palette: `@sass-palette/${id}-palette` (based on `id`)
- style: `@sass-palette/${id}-style` (only available when `style` option is set)
- helper: `@sass-palette/helper`
