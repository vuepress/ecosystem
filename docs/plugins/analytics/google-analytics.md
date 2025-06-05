---
icon: chart-no-axes-combined
---

# google-analytics

<NpmBadge package="@vuepress/plugin-google-analytics" />

Integrate [Google Analytics](https://analytics.google.com/) into VuePress.

This plugin imports [gtag.js](https://developers.google.com/analytics/devguides/collection/gtagjs) to enable [Google Analytics 4](https://support.google.com/analytics/answer/10089681) tracking.

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

Google Analytics [automatically collects some events](https://support.google.com/analytics/answer/9234069), such as `page_view`, `first_visit`, etc.

If you only need to collect basic site data, simply set the [Measurement ID](#id) correctly.

After using this plugin, the global `gtag()` function is available on the `window` object for [custom event reporting](https://developers.google.com/analytics/devguides/collection/ga4/events).

## Options

### id

- Type: `string`
- Required: Yes

- Details:

  Google Analytics 4 Measurement ID, which should start with `'G-'`.

  You can follow the instructions [here](https://support.google.com/analytics/answer/9539598) to find your Measurement ID. Note the difference between Google Analytics 4 Measurement ID ("G-" ID) and Universal Analytics Tracking ID ("UA-" ID).

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
  Set to `true` to enable sending events to DebugView. [See more information on DebugView](https://support.google.com/analytics/answer/7201382).

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
