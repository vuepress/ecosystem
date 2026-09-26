---
url: /ecosystem/plugins/seo/seo/index.md
---
# seo

## Usage

```bash
npm i -D @vuepress/plugin-seo@next
```

```ts title=".vuepress/config.ts"
import { seoPlugin } from '@vuepress/plugin-seo'

export default {
  plugins: [
    seoPlugin({
      // options
    }),
  ],
}
```
