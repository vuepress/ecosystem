---
url: /plugins/blog/comment/twikoo.md
---
# Twikoo

A concise, safe and free comment system for static sites, based on [Tencent Cloud Development](https://curl.qcloud.com/KnnJtUom).

## Usage

```bash
npm i -D twikoo
```

Set `provider: "Twikoo"` and pass your server address to the `envId` option:

```ts title=".vuepress/config.ts"
import { commentPlugin } from '@vuepress/plugin-comment'

export default {
  plugins: [
    commentPlugin({
      provider: 'Twikoo',
      envId: 'https://twikoo.example.com',
    }),
  ],
}
```

### Deploy Backend

Deploy the backend according to the [official documentation](https://twikoo.js.org/backend.html).

::: tip

The plugin automatically sets `lang` (to `zh-CN` or `en`), `path` (the identifier of the page) and `el`.

:::

## Options

::: fields
@`envId` type=string required

The Vercel address or the Tencent CloudBase environment ID.

See also: [Deploy Backend](#deploy-backend).

@`region` type=string default=`'ap-shanghai'`

The Tencent Cloud region.

:::

## Client Config

You can use the `defineTwikooConfig` function to customize Twikoo:

```ts title=".vuepress/client.ts"
import { defineTwikooConfig } from '@vuepress/plugin-comment/client'
import { defineClientConfig } from 'vuepress/client'

defineTwikooConfig({
  // Twikoo config
})
```
