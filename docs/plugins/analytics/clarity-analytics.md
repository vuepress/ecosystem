---
icon: chart-no-axes-combined
---

# clarity-analytics

<NpmBadge package="@vuepress/plugin-clarity-analytics" />

Integrate [Clarity Analytics](https://clarity.microsoft.com/) into VuePress.

## Usage

```bash
npm i -D @vuepress/plugin-clarity-analytics@next
```

```ts title=".vuepress/config.ts"
import { clarityAnalyticsPlugin } from '@vuepress/plugin-clarity-analytics'

export default {
  plugins: [
    clarityAnalyticsPlugin({
      // options
    }),
  ],
}
```

### Reporting Events

The plugin helps you understand user interaction with your website.

[Supported Features](https://learn.microsoft.com/en-us/clarity/setup-and-installation/about-clarity#supported-features)

- Session recordings
- Heatmaps
- Event and funnel tracking
- Chat and summarize with Copilot

After using this plugin, the global `clarity()` function is available on the `window` object for [advanced features](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-api).

## Options

### id

- Type: `string`
- Required: Yes
- Details: Clarity Analytics project ID.

### crossOrigin

- Type: `string`
- Default: `undefined`
- Details: The `crossorigin` attribute, provides support for `CORS`.
