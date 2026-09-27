# Giscus Options

## Options

::: fields
@`repo` type=string required

The name of repository to store discussions.

@`repoId` type=string required

The ID of repository to store discussions. Generate through [Giscus Page](https://giscus.app/).

@`category` type=string required

The name of the discussion category.

@`categoryId` type=string required

The ID of the discussion category. Generate through [Giscus Page](https://giscus.app/).

@`mapping` type=`'number' | 'og:title' | 'pathname' | 'specific' | 'title' | 'url'` default=`'pathname'`

Page - Discussion mapping. For details see [Giscus Page](https://giscus.app/).

@`strict` type=boolean default=`true`

Whether to enable strict mapping.

@`lazyLoading` type=boolean default=`true`

Whether to enable lazy loading.

@`reactionsEnabled` type=boolean default=`true`

Whether to enable reactions.

@`inputPosition` type=`'top' | 'bottom'` default=`'top'`

Input position.

@`lightTheme` type=GiscusTheme default=`'light'`

Giscus theme used in light mode. Should be a built-in theme keyword or a CSS link starting with `https://`.

Available themes:

- `'catppuccin_frappe'`
- `'catppuccin_latte'`
- `'catppuccin_macchiato'`
- `'catppuccin_mocha'`
- `'cobalt'`
- `'dark_dimmed'`
- `'dark_high_contrast'`
- `'dark_protanopia'`
- `'dark_tritanopia'`
- `'dark'`
- `'fro'`
- `'gruvbox_dark'`
- `'gruvbox_light'`
- `'gruvbox'`
- `'light_high_contrast'`
- `'light_protanopia'`
- `'light_tritanopia'`
- `'light'`
- `'noborder_dark'`
- `'noborder_gray'`
- `'noborder_light'`
- `'preferred_color_scheme'`
- `'purple_dark'`
- `'transparent_dark'`

@`darkTheme` type=GiscusTheme default=`'dark'`

Giscus theme used in dark mode. Should be a built-in theme keyword or a CSS link starting with `https://`.

See `lightTheme` for the available themes.

:::

## Plugin Config

You can directly configure serializable options in the plugin options:

```ts title=".vuepress/config.ts"
import { commentPlugin } from '@vuepress/plugin-comment'

export default {
  plugins: [
    commentPlugin({
      provider: 'Giscus',
      // other options
      // ...
    }),
  ],
}
```

## Client Config

You can use the `defineGiscusConfig` function to customize Giscus:

```ts title=".vuepress/client.ts"
import { defineGiscusConfig } from '@vuepress/plugin-comment/client'
import { defineClientConfig } from 'vuepress/client'

defineGiscusConfig({
  // Giscus config
})
```
