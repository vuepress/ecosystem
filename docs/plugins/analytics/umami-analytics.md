---
icon: chart-no-axes-combined
---

# umami-analytics

<NpmBadge package="@vuepress/plugin-umami-analytics" />

Integrate [Umami Analytics](https://umami.is/) into VuePress.

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

You can use [Umami Cloud](https://cloud.umami.is/login) or [Self-host Umami](https://umami.is/docs/install).

### Reporting Events

The plugin automatically reports page view events on page visits and route changes.

A global `umami` object is available on the `window` object, and you can call `umami.track` for [custom tracking](https://umami.is/docs/tracker-functions).

## Options

### id

- Type: `string`
- Required: Yes
- Details: The website ID from Umami Analytics

### link

- Type: `string`
- Default: `'https://us.umami.is/script.js'`
- Details: URL to the Umami Analytics tracking script

### autoTrack

- Type: `boolean`
- Default: `true`
- Details:

  By default, Umami tracks all pageviews and events automatically.

  Set to `false` to disable automatic tracking and use manual tracking functions.

### cache

- Type: `boolean`
- Details:

  Cache data to improve tracking script performance.

  Note: This will use session storage so you may need to inform your users.

### domains

- Type: `string[]`
- Details: Restrict tracking to specific domains only.

### hostUrl

- Type: `string`
- Default: `link`
- Details: Custom endpoint for sending tracking data.
