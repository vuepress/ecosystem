---
url: /ecosystem/plugins/blog/comment/index.md
---
# comment

## Usage

```bash
npm i -D @vuepress/plugin-comment@next
```

```ts title=".vuepress/config.ts"
import { commentPlugin } from '@vuepress/plugin-comment'

export default {
  plugins: [
    commentPlugin({
      // options
    }),
  ],
}
```
