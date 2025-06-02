---
icon: la:blog
---

# blog

<NpmBadge package="@vuepress/plugin-blog" />

Blog plugin for VuePress, providing article collection, categorization, type filtering, and excerpt generation.

## Usage

```bash
npm i -D @vuepress/plugin-blog@next
```

```ts title=".vuepress/config.ts"
import { blogPlugin } from '@vuepress/plugin-blog'

export default {
  plugins: [
    blogPlugin({
      // options
    }),
  ],
}
```
