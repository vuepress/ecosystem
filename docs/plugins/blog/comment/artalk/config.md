# Artalk Options

## Options

Artalk options are inherited from [Artalk Configuration](https://artalk.js.org/guide/frontend/config.html). All serializable Artalk options can be set directly in the plugin options.

The following options are reserved for the plugin and will be automatically inferred from VuePress config:

::: fields
@`el` type=`string | HTMLElement` managed-by="Plugin"

The container element, inferred from the VuePress config.

@`pageTitle` type=string managed-by="Plugin"

The page title, inferred from the VuePress page.

@`pageKey` type=string managed-by="Plugin"

The page key, inferred from the VuePress route.

@`site` type=string managed-by="Plugin"

The site name, inferred from the VuePress site config.

:::

::: tip

The two function options `imgUploader` and `avatarURLBuilder` can only be set on the client side. See [Client Config](#client-config).

:::

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
