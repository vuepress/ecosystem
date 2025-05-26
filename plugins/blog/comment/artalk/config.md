---
url: /plugins/blog/comment/artalk/config.md
---
# Artalk Options

## Config

See [Artalk Configuration](https://artalk.js.org/guide/frontend/config.html) for details.

* The `el` `pageTitle`, `pageKey` and `site` options are reserved for plugins, they will be inferred from VuePress config.

* Two function options `imgUploader` and `avatarURLBuilder` can only be set on client side.

## Plugin Config

You can directly configure serializable options in the plugin options:

```ts title=".vuepress/config.ts"
import { commentPlugin } from '@vuepress/plugin-comment'

export default {
  plugins: [
    commentPlugin({
      provider: 'Artalk',
      // other options
      // ...
    }),
  ],
}
```

## Client Config

You can use the `defineArtalkConfig` function to customize Artalk:

```ts title=".vuepress/client.ts"
import { defineArtalkConfig } from '@vuepress/plugin-comment/client'
import { defineClientConfig } from 'vuepress/client'

defineArtalkConfig({
  // Artalk config
})
```
