---
icon: chart-no-axes-combined
---

# google-analytics

<NpmBadge package="@vuepress/plugin-google-analytics" />

为你的 VuePress 站点无缝集成 [Google Analytics 4](https://analytics.google.com/) (GA4)。

该插件通过引入 [Global Site Tag (gtag.js)](https://developers.google.com/analytics/devguides/collection/gtagjs) 来支持强大的流量分析与用户追踪功能。

## Usage

```bash
npm i -D @vuepress/plugin-google-analytics@next
```

```ts title=".vuepress/config.ts"
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'

export default {
  plugins: [
    googleAnalyticsPlugin({
      // 选项
    }),
  ],
}
```

### 上报事件

Google Analytics 4 默认[自动收集多种事件](https://support.google.com/analytics/answer/9234069)，例如 `page_view`（页面浏览）、`first_visit`（首次访问）和 `scroll`（滚动）等。

如果你只需要收集基础的站点数据，只需配置正确的 [Measurement ID](#id)（测定 ID）即可。

如需更高级的追踪能力，该插件会在 `window` 对象上暴露全局 `gtag()` 函数。你可以利用该函数，基于用户在站点内的交互行为，通过编程方式上报[自定义事件](https://developers.google.com/analytics/devguides/collection/ga4/events)。

## Options

### id

- 类型：`string`
- 必填：是

- 详情：

  Google Analytics 4 的测定 ID（Measurement ID），通常以 `'G-'` 开头。

  请参考[官方指南](https://support.google.com/analytics/answer/9539598)查找你的测定 ID。请注意区分 Google Analytics 4 的测定 ID（"G-" ID）与 Universal Analytics 的追踪 ID（"UA-" ID）。

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
  设置为 `true` 以启用向 Google Analytics DebugView 发送事件的功能。这对于在开发过程中验证配置和调试事件数据非常有用。[了解更多关于 DebugView 的信息](https://support.google.com/analytics/answer/7201382)。

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
