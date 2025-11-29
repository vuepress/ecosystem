---
icon: chart-no-axes-combined
---

# google-analytics

<NpmBadge package="@vuepress/plugin-google-analytics" />

Seamlessly integrate [Google Analytics 4](https://analytics.google.com/) (GA4) into your VuePress site.

This plugin leverages the [Global Site Tag (gtag.js)](https://developers.google.com/analytics/devguides/collection/gtagjs) to enable robust traffic analysis and user tracking.

## Usage

```bash
npm i -D @vuepress/plugin-google-analytics@next
```

```ts title=".vuepress/config.ts"
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'

export default {
  plugins: [
    googleAnalyticsPlugin({
      // options
    }),
  ],
}
```

### Reporting Events

Google Analytics 4 [automatically collects a wide range of events](https://support.google.com/analytics/answer/9234069) by default, such as `page_view`, `first_visit`, and `scroll`.

For standard metric collection, simply set the [Measurement ID](#id).

If you require advanced tracking capabilities, this plugin exposes the global `gtag()` function on the `window` object. You can utilize this function to report [custom events](https://developers.google.com/analytics/devguides/collection/ga4/events) programmatically based on user interactions within your site.

## Options

### id

- Type: `string`
- Required: Yes

- Details:

  The Google Analytics 4 Measurement ID (must start with `'G-'`).

  Please refer to the [official guide](https://support.google.com/analytics/answer/9539598) to locate your Measurement ID. Ensure you are using a GA4 Measurement ID (`G-XXXXXXXXXX`) rather than a Universal Analytics Tracking ID (`UA-XXXXXXXX`).

- Example:

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

- Type: `boolean`
- Details:
  Enables the sending of events to the Google Analytics DebugView. This is useful for verifying your setup and troubleshooting event data during development. [Learn more about DebugView](https://support.google.com/analytics/answer/7201382).

- Example:

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
