---
icon: chart-no-axes-combined
---

# umami-analytics

<NpmBadge package="@vuepress/plugin-umami-analytics" />

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

## Guide

### Reporting Events

Out of the box, the plugin automatically captures page view events during initial visits and subsequent route changes.

For advanced tracking needs, the global `umami` object is exposed on the `window` instance. You can utilize this to trigger [custom events](https://umami.is/docs/tracker-functions) programmatically via `umami.track()`.

## Options

::: fields
@`id` type=string required

The unique Website ID provided by your Umami dashboard.

@`link` type=string default=`'https://us.umami.is/script.js'`

The source URL of the Umami tracking script.

@`autoTrack` type=boolean default=`true`

Whether to track pageviews and events automatically.

Set this to `false` if you wish to disable automatic data collection and rely solely on manual tracking functions.

@`cache` type=boolean

Whether to cache the tracking script to improve its performance.

**Note:** This feature utilizes Session Storage. Depending on your region's regulations, you may need to disclose this usage to your visitors.

@`domains` type=`string[]`

A list of allowed domains. Tracking will only occur when the site is accessed via these specific domains.

@`hostUrl` type=string default=`link`

A custom endpoint for sending analytics data. If not specified, it defaults to the script location defined in [link](#link).

:::
