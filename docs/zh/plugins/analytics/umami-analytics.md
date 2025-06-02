---
icon: chart-no-axes-combined
---

# umami-analytics

<NpmBadge package="@vuepress/plugin-umami-analytics" />

将 [Umami Analytics](https://umami.is/) 集成到 VuePress 中。

## 使用方法

```bash
npm i -D @vuepress/plugin-umami-analytics@next
```

```ts title=".vuepress/config.ts"
import { umamiAnalyticsPlugin } from '@vuepress/plugin-umami-analytics'

export default {
  plugins: [
    umamiAnalyticsPlugin({
      // 配置项
    }),
  ],
}
```

你可以使用 [Umami Cloud](https://cloud.umami.is/login) 或 [自行托管 Umami](https://umami.is/docs/install)。

### 事件上报

插件会自动上报页面访问和路由切换事件。

此外，全局 `umami` 对象会挂载到 `window`，可使用 `umami.track` 进行 [自定义追踪](https://umami.is/docs/tracker-functions)。

## 选项

### id

- 类型：`string`
- 必填：是
- 详情：Umami Analytics 中的网站 ID。

### link

- 类型：`string`
- 默认值：`'https://us.umami.is/script.js'`
- 详情：Umami Analytics 脚本链接。

### autoTrack

- 类型：`boolean`
- 默认值：`true`
- 详情：

  默认情况下，Umami 会自动追踪所有页面浏览和事件。设为 `false` 可禁用自动追踪，改用手动追踪功能。

### cache

- 类型：`boolean`
- 详情：

  缓存数据以提高追踪脚本的性能。

  注意：这将使用会话存储，因此你可能需要通知你的用户。

### domains

- 类型：`string[]`
- 详情：限制追踪器仅在指定域名上运行。

### hostUrl

- 类型：`string`
- 默认值：`link`
- 详情：数据发送的目标地址。
