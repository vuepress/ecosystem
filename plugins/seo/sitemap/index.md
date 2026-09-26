---
url: /ecosystem/plugins/seo/sitemap/index.md
---
# sitemap

## Usage

```bash
npm i -D @vuepress/plugin-sitemap@next
```

```ts title=".vuepress/config.ts"
import { sitemapPlugin } from '@vuepress/plugin-sitemap'

export default {
  plugins: [
    sitemapPlugin({
      // options
    }),
  ],
}
```
