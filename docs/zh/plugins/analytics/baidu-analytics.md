---
icon: chart-no-axes-combined
---

# baidu-analytics

<NpmBadge package="@vuepress/plugin-baidu-analytics" />

将 [百度统计](https://tongji.baidu.com/) 集成到 VuePress 中，用于统计网站流量与用户行为。

::: tip

请 **不要** 在百度统计后台开启 [SPA 模式](https://tongji.baidu.com/web/help/article?id=324&type=0)。

本插件会自动监听页面路由切换并正确上报页面浏览（PV）数据。同时开启百度统计原生的 SPA 模式可能会导致数据重复或统计异常。

:::

## Usage

```bash
npm i -D @vuepress/plugin-baidu-analytics@next
```

```ts title=".vuepress/config.ts"
import { baiduAnalyticsPlugin } from '@vuepress/plugin-baidu-analytics'

export default {
  plugins: [
    baiduAnalyticsPlugin({
      // 选项s
    }),
  ],
}
```

### 事件追踪

配置完成后，插件会自动在用户访问页面及路由切换时上报页面浏览（PV）事件。

对于更高级的统计需求，百度统计的全局对象 `_hmt` 已挂载在 `window` 对象上。你可以通过它来[手动上报自定义事件](https://tongji.baidu.com/holmes/Analytics/%E6%8A%80%E6%9C%AF%E6%8E%A5%E5%85%A5%E6%8C%87%E5%8D%97/JS%20API/JS%20API%20%E4%BD%BF%E7%94%A8%E6%89%8B%E5%86%8C)。

```ts
// 示例：手动上报一个自定义事件
window._hmt = window._hmt || []
window._hmt.push(['_trackEvent', 'category', 'action', 'label', 'value'])
```

## 选项

### id

- 类型：`string`
- 必填：是
- 详情：百度统计的 ID。通常是百度统计提供的代码中 `hm.js` 链接后的字符串参数（例如 `hm.js?your_tracking_id`）。
