---
icon: message-circle-more
---

# comment

<NpmBadge package="@vuepress/plugin-comment" />

Comment plugin for VuePress supporting multiple providers.

## Usage

```bash
npm i -D @vuepress/plugin-comment@next
```

```ts title=".vuepress/config.ts"
import { commentPlugin } from '@vuepress/plugin-comment'

export default {
  plugins: [
    commentPlugin({
      provider: 'Waline', // Artalk | Giscus | Waline | Twikoo
      // provider-specific options
    }),
  ],
}
```

## Supported Providers

- [Artalk](./artalk/)
- [Giscus](./giscus/)
- [Twikoo](./twikoo/)
- [Waline](./waline/)

## Guide

See [Guide](./guide.md) for detailed configuration.
