---
icon: chart-no-axes-combined
---

# baidu-analytics

<NpmBadge package="@vuepress/plugin-baidu-analytics" />

This plugin integrates [Baidu Analytics](https://tongji.baidu.com/) (Baidu Tongji) into your VuePress site, allowing you to track visitor traffic and user interactions.

::: tip

Please **disable** the [SPA mode](https://tongji.baidu.com/web/help/article?id=324&type=0) in your Baidu Analytics settings.

This plugin automatically handles page view reporting on route changes. Enabling Baidu's built-in SPA mode may result in duplicate data or incorrect statistics.

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
      // options
    }),
  ],
}
```

### Event Tracking

Once configured, the plugin will automatically report page view (PV) events for both initial page loads and subsequent route navigations.

For advanced usage, the global `_hmt` array is exposed on the `window` object. You can utilize this to push [custom events](https://tongji.baidu.com/holmes/Analytics/%E6%8A%80%E6%9C%AF%E6%8E%A5%E5%85%A5%E6%8C%87%E5%8D%97/JS%20API/JS%20API%20%E4%BD%BF%E7%94%A8%E6%89%8B%E5%86%8C) manually.

```ts
// Example: Manually reporting a custom event
window._hmt = window._hmt || []
window._hmt.push(['_trackEvent', 'category', 'action', 'label', 'value'])
```

## Options

### id

- Type: `string`
- Required: Yes
- Details: The tracking ID for your Baidu Analytics account. This is usually the string found in the `hm.js` script URL provided by Baidu (e.g., `hm.js?your_tracking_id`).
