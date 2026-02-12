---
url: /plugins/blog/comment/giscus/config.md
---
# Giscus Options

## Config

### repo

* Type: `string`
* Required: Yes
* Details: The name of repository to store discussions

### repoId

* Type: `string`
* Required: Yes
* Details: The ID of repository to store discussions. Generate through [Giscus Page](https://giscus.app/)

### category

* Type: `string`
* Required: Yes
* Details: The name of the discussion category

### categoryId

* Type: `string`
* Required: Yes
* Details: The ID of the discussion category. Generate through [Giscus Page](https://giscus.app/)

### mapping

* Type: `string`
* Default: `"pathname"`
* Details: Page - Discussion mapping. For details see [Giscus Page](https://giscus.app/)

### strict

* Type: `boolean`
* Default: `true`
* Details: Whether to enable strict mapping

### lazyLoading

* Type: `boolean`
* Default: `true`
* Details: Whether to enable lazy loading

### reactionsEnabled

* Type: `boolean`
* Default: `true`
* Details: Whether to enable reactions

### inputPosition

* Type: `"top" | "bottom"`
* Default: `"top"`
* Details: Input position

### lightTheme

* Type: `GiscusTheme`

  ```ts
  type GiscusTheme =
    | 'dark_dimmed'
    | 'dark_high_contrast'
    | 'dark_protanopia'
    | 'dark'
    | 'light_high_contrast'
    | 'light_protanopia'
    | 'light'
    | 'preferred_color_scheme'
    | 'transparent_dark'
    | `https://${string}`
  ```

* Default: `"light"`

* Details:

  Giscus theme used in light mode

  Should be a built-in theme keyword or a CSS link starting with `https://`.

### darkTheme

* Type: `GiscusTheme`

  ```ts
  type GiscusTheme =
    | 'dark_dimmed'
    | 'dark_high_contrast'
    | 'dark_protanopia'
    | 'dark'
    | 'light_high_contrast'
    | 'light_protanopia'
    | 'light'
    | 'preferred_color_scheme'
    | 'transparent_dark'
    | `https://${string}`
  ```

* Default: `"dark"`

* Details:

  Giscus theme used in dark mode

  Should be a built-in theme keyword or a CSS link starting with `https://`.

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
