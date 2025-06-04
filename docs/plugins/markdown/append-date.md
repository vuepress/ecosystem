---
icon: calendar
---

# append-date

<NpmBadge package="@vuepress/plugin-append-date" />

This plugin will append writing date to frontmatter based on [@vuepress/plugin-git](../development/git.md).

## Usage

```bash
npm i -D @vuepress/plugin-append-date@next
```

```ts title=".vuepress/config.ts"
import { appendDatePlugin } from '@vuepress/plugin-append-date'

export default {
  plugins: [appendDatePlugin()],
}
```

## Options

### key

- Type: `string`
- Default: `"date"`
- Details: Frontmatter key to use when appending date

### format

- Type: `"date" | "time" | "full"`
- Default: `"date"`
- Details:

  Format of the date value when appending date:

  - `"date"`: YYYY-MM-DD format
  - `"time"`: HH:MM:SS format
  - `"full"`: YYYY-MM-DD HH:MM:SS format
