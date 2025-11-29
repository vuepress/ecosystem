---
icon: book-open-text
---

# reading-time

<NpmBadge package="@vuepress/plugin-reading-time" />

该插件通过分析你的页面内容，生成字数统计和预计阅读时间。

## 使用方法

```bash
npm i -D @vuepress/plugin-reading-time@next
```

```ts title=".vuepress/config.ts"
import { readingTimePlugin } from '@vuepress/plugin-reading-time'

export default {
  plugins: [
    readingTimePlugin({
      // 选项
    }),
  ],
}
```

## 页面数据（Node.js 端）

初始化后，插件会计算每个页面的统计信息，并将它们注入到 `page.data.readingTime` 属性中。该对象包含：

- `minutes`: 预计阅读时间，单位为分钟 (`number`)。
- `words`: 总字数 (`number`)。

你可以在 Node.js 端的构建过程中直接访问此数据，例如在 `extendsPage` 或 `onInitialized` 生命周期中：

```ts
export default {
  // ...
  extendsPage: (page) => {
    // 访问当前正在处理页面的阅读时间数据
    console.log(page.data.readingTime) // { minutes: 3.2, words: 934 }
  },

  onInitialized: (app) => {
    // 遍历 VuePress 应用中的所有页面
    app.pages.forEach((page) => {
      console.log(page.data.readingTime) // { minutes: 3.2, words: 934 }
    })
  },
}
```

## 组合式 API (客户端)

要在主题或组件中显示阅读时间信息，你可以使用客户端模块提供的组合式 API（Composables）。

引入 `useReadingTimeData` 获取原始数值，或引入 `useReadingTimeLocale` 获取本地化的文本字符串：

```vue
<script setup lang="ts">
import {
  useReadingTimeData,
  useReadingTimeLocale,
} from '@vuepress/plugin-reading-time/client'

// 获取原始值（例如用于自定义逻辑或排序）
const readingTimeData = useReadingTimeData() // { minutes: 1.1, words: 100 }

// 根据当前站点配置获取本地化文本
const readingTimeLocale = useReadingTimeLocale() // { time: "1 minute", words: "100 words" }
</script>
```

## 选项

### wordPerMinute

- 类型：`number`
- 默认值：`300`
- 详情：每分钟阅读的字数。

### locales

- 类型：`ReadingTimePluginLocaleConfig`

  ```ts
  interface ReadingTimePluginLocaleData {
    /**
     * 字数模板，`$word` 会被自动替换为实际字数
     */
    word: string

    /**
     * 小于一分钟时的文本
     */
    less1Minute: string

    /**
     * 时间模板，`$time` 会被自动替换为实际时间
     */
    time: string
  }

  interface ReadingTimePluginLocaleConfig {
    [localePath: string]: Partial<ReadingTimePluginLocaleData>
  }
  ```

- 详情：阅读时间和字数文本的多语言配置。

::: details 内置支持语言

- **简体中文** (zh-CN)
- **繁体中文** (zh-TW)
- **英文(美国)** (en-US)
- **德语** (de-DE)
- **俄语** (ru-RU)
- **乌克兰语** (uk-UA)
- **越南语** (vi-VN)
- **葡萄牙语** (pt)
- **波兰语** (pl-PL)
- **法语** (fr-FR)
- **西班牙语** (es-ES)
- **斯洛伐克** (sk-SK)
- **日语** (ja-JP)
- **土耳其语** (tr-TR)
- **韩语** (ko-KR)
- **芬兰语** (fi-FI)
- **印尼语** (id-ID)
- **荷兰语** (nl-NL)

:::

## 客户端 API

你可以从 `@vuepress/plugin-reading-time/client` 导入并使用这些 API：

::: tip 即便你禁用了插件，使用这些 API 也不会报错。

:::

### useReadingTimeData

```ts
interface ReadingTime {
  /** 预计阅读时间（分钟） */
  minutes: number
  /** 内容字数 */
  words: number
}

const useReadingTimeData: () => ComputedRef<ReadingTime | null>
```

当插件被禁用时返回 `null`。

### useReadingTimeLocale

```ts
interface ReadingTimeLocale {
  /** 本地化的预计阅读时间文本 */
  time: string
  /** 本地化的字数统计文本 */
  words: string
}

const useReadingTimeLocale: () => ComputedRef<ReadingTimeLocale>
```

## 主题集成

对于插件和主题开发者，我们提供了一个编程式的 "Use API"。相比于直接在你的主题 `plugins` 数组中添加该插件，我们更推荐这种方式，因为它能处理注册顺序并防止重复注册。

```js title="your plugin or theme entry"
import { useReadingTimePlugin } from '@vuepress/plugin-reading-time'

export default (options) => (app) => {
  useReadingTimePlugin(app, {
    // 你的配置选项
  })

  return {
    name: 'vuepress-plugin-xxx', // or vuepress-theme-xxx
  }
}
```

::: tip 为什么要使用 "Use API"？

1. **单例模式**：当一个插件被注册多次时，VuePress 会发出警告，且只有第一个生效。`useReadingTimePlugin` 会自动检测插件是否已注册，避免重复注册。
2. **执行顺序**：如果你在 `extendsPage` 生命周期中访问阅读时间数据，那么 `@vuepress/plugin-reading-time` 必须在你的代码*之前*执行。`useReadingTimePlugin` 能够确保正确的初始化顺序，从而保证 `page.data.readingTime` 在你需要时已经可用。

:::

如果你需要强制应用特定配置或重置插件状态，可以使用 `removeReadingTimePlugin`：

```js title="your plugin or theme entry"
import { useReadingTimePlugin } from '@vuepress/plugin-reading-time'

export default (options) => (app) => {
  // 移除此时任何已存在的阅读时间插件实例
  removeReadingTimePlugin(app)

  // 重新注册插件，以确保你的特定配置生效
  useReadingTimePlugin(app, {
    // 你的配置选项
  })

  return {
    name: 'vuepress-plugin-xxx', // or vuepress-theme-xxx
  }
}
```
