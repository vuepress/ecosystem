---
icon: github
---

# Giscus

Giscus is a commenting system based on GitHub Discussions that is easy to set up.

<!-- more -->

## Usage

Set `provider: "Giscus"` and pass the values obtained from the [Giscus page](https://giscus.app/) to the `repo`, `repoId`, `category` and `categoryId` options:

```ts title=".vuepress/config.ts"
import { commentPlugin } from '@vuepress/plugin-comment'

export default {
  plugins: [
    commentPlugin({
      provider: 'Giscus',
      repo: 'owner/repo',
      repoId: 'repo-id',
      category: 'Announcements',
      categoryId: 'category-id',
    }),
  ],
}
```

### Preparation

1. Create a public repository and open the discussion panel, to store the comments.
1. Install the [Giscus App](https://github.com/apps/giscus) so that it has permission to access the repository.
1. Go to the [Giscus page](https://giscus.app/) to get your settings.

   Fill in the repository and the discussion category, then scroll to the "Enable giscus" section at the bottom of the page, where you can get the `data-repo`, `data-repo-id`, `data-category` and `data-category-id` attributes.

### Theme

By default, the Giscus theme is `light` or `dark`, based on the dark mode state.

::: tip Dark Mode

To let Giscus apply the correct theme, you need to pass a boolean to the `darkmode` prop of `<CommentService />`, indicating whether dark mode is currently enabled.

:::

To customize the theme in light and dark mode, set the [lightTheme](#lighttheme) and [darkTheme](#darktheme) options with a built-in theme keyword or a custom CSS link starting with `https://`.

## Options

::: fields
@`repo` type=string required

The name of the repository to store the discussions, in the `owner/repo` format.

See also: [Preparation](#preparation).

@`repoId` type=string required

The ID of the repository to store the discussions, generated on the [Giscus page](https://giscus.app/).

@`category` type=string required

The name of the discussion category.

@`categoryId` type=string required

The ID of the discussion category, generated on the [Giscus page](https://giscus.app/).

@`mapping` type=`'number' | 'og:title' | 'pathname' | 'specific' | 'title' | 'url'` default=`'pathname'`

The mapping between pages and discussions. See the [Giscus page](https://giscus.app/) for details.

@`strict` type=boolean default=`true`

Whether to enable strict mapping.

@`lazyLoading` type=boolean default=`true`

Whether to enable lazy loading.

@`reactionsEnabled` type=boolean default=`true`

Whether to enable reactions.

@`inputPosition` type=`'top' | 'bottom'` default=`'top'`

The position of the input box.

@`lightTheme` type=GiscusTheme default=`'light'`

The Giscus theme used in light mode. Should be a built-in theme keyword or a CSS link starting with `https://`.

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

See also: [Theme](#theme).

@`darkTheme` type=GiscusTheme default=`'dark'`

The Giscus theme used in dark mode. Should be a built-in theme keyword or a CSS link starting with `https://`.

See `lightTheme` for the available themes.

See also: [Theme](#theme).

:::

## Client Config

You can use the `defineGiscusConfig` function to customize Giscus:

```ts title=".vuepress/client.ts"
import { defineGiscusConfig } from '@vuepress/plugin-comment/client'
import { defineClientConfig } from 'vuepress/client'

defineGiscusConfig({
  // Giscus config
})
```
