---
icon: message-circle-more
---

# comment

<NpmBadge package="@vuepress/plugin-comment" />

Comment plugin for VuePress, supports multiple comment providers.

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
      // provider options
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

For detailed configuration and usage, see [Guide](./guide.md).
