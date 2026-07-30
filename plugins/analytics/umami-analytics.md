---
url: /ecosystem/plugins/analytics/umami-analytics.md
---
# umami-analytics

Seamlessly integrate [Umami Analytics](https://umami.is/)—a privacy-focused, open-source web analytics solution—into your VuePress site.

## Usage

```bash
npm i -D @vuepress/plugin-umami-analytics@next
```

```ts title=".vuepress/config.ts"
import { umamiAnalyticsPlugin } from '@vuepress/plugin-umami-analytics'

export default {
  plugins: [
    umamiAnalyticsPlugin({
      // options
    }),
  ],
}
```

This plugin supports both [Umami Cloud](https://cloud.umami.is/login) and [Self-hosted](https://umami.is/docs/install) instances.

### Reporting Events

Out of the box, the plugin automatically captures page view events during initial visits and subsequent route changes.

For advanced tracking needs, the global `umami` object is exposed on the `window` instance. You can utilize this to trigger [custom events](https://umami.is/docs/tracker-functions) programmatically via `umami.track()`.

## Options

### id

* Type: `string`
* Required: Yes
* Details: The unique Website ID provided by your Umami dashboard.

### link

* Type: `string`
* Default: `'https://us.umami.is/script.js'`
* Details: The source URL of the Umami tracking script.

### autoTrack

* Type: `boolean`
* Default: `true`
* Details:

  Controls whether to track pageviews and events automatically.

  Set this to `false` if you wish to disable automatic data collection and rely solely on manual tracking functions.

### cache

* Type: `boolean`
* Details:

  Enables caching to improve the tracking script's performance.

  **Note:** This feature utilizes Session Storage. Depending on your region's regulations, you may need to disclose this usage to your visitors.

### domains

* Type: `string[]`
* Details:

  A list of allowed domains. Tracking will only occur when the site is accessed via these specific domains.

### hostUrl

* Type: `string`
* Default: `link`
* Details:

  A custom endpoint for sending analytics data. If not specified, it defaults to the script location defined in `link`.
