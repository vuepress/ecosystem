---
icon: https://artalk.js.org/favicon.png
---

# Artalk

Artalk is a clean self-hosted commenting system that you can easily deploy on your server and integrate into your front-end pages.

Deploy the Artalk comment box on your blog or any other page to add rich social functionality.

<!-- more -->

## Usage

```bash
npm i -D artalk
```

Set `provider: "Artalk"` and pass your server address to the `server` option:

```ts title=".vuepress/config.ts"
import { commentPlugin } from '@vuepress/plugin-comment'

export default {
  plugins: [
    commentPlugin({
      provider: 'Artalk',
      server: 'https://artalk.example.com',
    }),
  ],
}
```

Artalk options are inherited from [Artalk Configuration](https://artalk.js.org/guide/frontend/config.html). All serializable options can be set directly in the plugin options.

### Deploy Server

See the [Artalk documentation](https://artalk.js.org/guide/deploy.html).

### Dark Mode

To let Artalk apply the correct theme, pass a boolean to the `darkmode` prop of `<CommentService />`, indicating whether dark mode is currently enabled. The plugin forwards it to the Artalk `darkMode` option.

## Options

The following options are reserved for the plugin and are automatically inferred from the VuePress context:

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

The two function options `imgUploader` and `avatarURLBuilder` can only be set in the [client config](#client-config).

:::

## Client Config

You can use the `defineArtalkConfig` function to customize Artalk:

```ts title=".vuepress/client.ts"
import { defineArtalkConfig } from '@vuepress/plugin-comment/client'
import { defineClientConfig } from 'vuepress/client'

defineArtalkConfig({
  // Artalk config
})
```
