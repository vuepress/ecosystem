---
icon: chart-no-axes-combined
---

# umami-analytics

<NpmBadge package="@vuepress/plugin-umami-analytics" />

将 [Umami Analytics](https://umami.is/)（一种注重隐私的开源网络分析解决方案）无缝集成到你的 VuePress 站点中。

## 使用方法

```bash
npm i -D @vuepress/plugin-umami-analytics@next
```

```ts title=".vuepress/config.ts"
import { umamiAnalyticsPlugin } from '@vuepress/plugin-umami-analytics'

export default {
  plugins: [
    umamiAnalyticsPlugin({
      // 选项
    }),
  ],
}
```

该插件同时支持 [Umami Cloud](https://cloud.umami.is/login) 和 [自托管（Self-host）](https://umami.is/docs/install) 实例。

### 上报事件

插件开箱即用，会自动捕获首次访问和后续路由切换时的页面浏览事件，从而确保单页应用（SPA）流量数据的准确性。

针对高级追踪需求，插件在 `window` 实例上暴露了全局 `umami` 对象。你可以通过调用 `umami.track()` 编程式地触发[自定义事件](https://umami.is/docs/tracker-functions)。

## 选项

### id

- 类型：`string`
- 必填： 是
- 详情： Umami 控制台提供的唯一网站 ID (Website ID)。

### link

- 类型：`string`
- 默认值：`'https://us.umami.is/script.js'`
- 详情： Umami 追踪脚本的源地址 URL。

### autoTrack

- 类型：`boolean`
- 默认值：`true`
- 详情：

  控制是否自动追踪页面浏览和事件。

  如果希望禁用自动数据收集并仅依赖手动追踪函数，请将此项设置为 `false`。

### cache

- 类型：`boolean`
- 详情：

  启用缓存以提高追踪脚本的性能。

  **注意：** 此功能会使用 Session Storage。根据你所在地区的法规，你可能需要向用户告知这一情况。

### domains

- 类型：`string[]`
- 详情：

  允许的域名列表。只有通过这些特定域名访问站点时，才会进行追踪。

### hostUrl

- 类型：`string`
- 默认值：`link`
- 详情：

  用于发送分析数据的自定义端点。如果未指定，默认使用 `link` 中定义的脚本位置。
