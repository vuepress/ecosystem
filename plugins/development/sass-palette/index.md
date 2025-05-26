---
url: /plugins/development/sass-palette/index.md
---
# sass-palette

This plugin is mainly facing plugin and theme developers, it is more powerful than [`@vuepress/plugin-palette`](../palette.md).

::: tip

You should manually install these deps in your project:

* When using Vite bundler: `sass-embedded`
* When using Webpack bundler: `sass-embedded` and `sass-loader`

:::

## Usage

You must invoke `useSassPalettePlugin` function during plugin initialization to use this plugin.

```bash
npm i -D @vuepress/plugin-sass-palette@next
```

```js title="Your plugin or theme entry"
import { useSassPalettePlugin } from 'vuepress-plugin-sass-palette'

export const yourPlugin = (options) => (app) => {
  useSassPalettePlugin(app, {
    // plugin options
  })

  return {
    // your plugin api
  }
}
```
