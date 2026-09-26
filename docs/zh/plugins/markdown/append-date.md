---
icon: calendar
---

# append-date

<NpmBadge package="@vuepress/plugin-append-date" />

该插件会基于 [@vuepress/plugin-git](../development/git.md) 为 frontmatter 追加写作日期。

## 使用方法

```bash
npm i -D @vuepress/plugin-append-date@next
```

```ts title=".vuepress/config.ts"
import { appendDatePlugin } from '@vuepress/plugin-append-date'

export default {
  plugins: [appendDatePlugin()],
}
```

## 选项

::: fields
@`key` type=string default=`"date"`

追加时间时使用的 frontmatter 键名。

@`format` type=`"date" | "time" | "full"` default=`"date"`

追加时间时使用的日期格式：

- `"date"`：YYYY-MM-DD 格式
- `"time"`：HH:MM:SS 格式
- `"full"`：YYYY-MM-DD HH:MM:SS 格式

:::
