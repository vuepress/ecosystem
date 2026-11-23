---
icon: palette
---

# 经典主题 {#theme-classic}

<NpmBadge package="@vuepress/theme-classic" />

## 使用方法 {#usage}

安装经典主题：

```bash
npm i -D @vuepress/theme-classic@next
```

在配置文件中指定主题：

```ts title=".vuepress/config.ts"
import { classicTheme } from '@vuepress/theme-classic'

export default {
  theme: classicTheme({
    // 在这里添加主题配置
  }),
}
```
