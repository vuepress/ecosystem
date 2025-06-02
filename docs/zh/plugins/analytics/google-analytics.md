---
icon: chart-no-axes-combined
---

# google-analytics

<NpmBadge package="@vuepress/plugin-google-analytics" />

将 [Google Analytics](https://analytics.google.com/) 集成到 VuePress 中。

此插件通过引入 [gtag.js](https://developers.google.com/analytics/devguides/collection/gtagjs) 启用 [Google Analytics 4](https://support.google.com/analytics/answer/10089681) 追踪。

## 使用方法

```bash
npm i -D @vuepress/plugin-google-analytics@next
```

```ts title=".vuepress/config.ts"
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'

export default {
  plugins: [
    googleAnalyticsPlugin({
      // 配置项
    }),
  ],
}
```

### 事件上报

Google Analytics 会 [自动收集部分事件](https://support.google.com/analytics/answer/9234069)，如 `page_view`、`first_visit` 等。

因此，如果仅需收集站点基础数据，只需正确设置 [Measurement ID](#id) 即可。

引入插件后，全局 `gtag()` 函数会挂载到 `window` 对象，可用于 [自定义事件上报](https://developers.google.com/analytics/devguides/collection/ga4/events)。

## 选项

### id

- 类型：`string`
- 必填：是

- 详情：

  Google Analytics 4 的 Measurement ID，应以 `'G-'` 开头。

  可通过 [此指引](https://support.google.com/analytics/answer/9539598) 找到你的 Measurement ID。注意区分 Google Analytics 4 的 Measurement ID（"G-" 开头）和 Universal Analytics 的 Tracking ID（"UA-" 开头）。

- 示例：

```ts title=".vuepress/config.ts"
export default {
  plugins: [
    googleAnalyticsPlugin({
      id: 'G-XXXXXXXXXX',
    }),
  ],
}
```

### debug

- 类型：`boolean`
- 详情：

  设置为 `true` 可向 DebugView 发送事件。[了解更多 DebugView 信息](https://support.google.com/analytics/answer/7201382)。

- 示例：

```ts title=".vuepress/config.ts"
export default {
  plugins: [
    googleAnalyticsPlugin({
      id: 'G-XXXXXXXXXX',
      debug: true,
    }),
  ],
}
```
