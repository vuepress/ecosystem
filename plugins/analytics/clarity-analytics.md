---
url: /plugins/analytics/clarity-analytics.md
---
s

# clarity-analytics

Seamlessly integrate [Microsoft Clarity](https://clarity.microsoft.com/) into your VuePress project.

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

## Features

Microsoft Clarity is a behavioral analysis tool that helps you understand how users interact with your website. This plugin simplifies the setup process, enabling you to capture actionable insights without complex configuration.

Key features include:

* **Session Recordings:** Watch playbacks of user sessions to see exactly how they navigate your site.
* **Heatmaps:** Visualize clicks, scrolls, and area engagement to identify what content matters most.
* **Smart Insights:** Leverage AI-powered analysis with Copilot to summarize user behavior and trends.

For more details on capabilities, please refer to the [Clarity Features Overview](https://learn.microsoft.com/en-us/clarity/setup-and-installation/about-clarity#supported-features).

### Advanced Usage

Once the plugin is enabled, the `clarity()` function is exposed on the global `window` object. You can use this to interact with the [Clarity Client API](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-api) for advanced tasks, such as:

* Identifying users.
* Tracking custom events.
* Managing cookie consent.

## Options

### id

* Type: `string`
* Required: Yes
* Details: The Project ID assigned by Microsoft Clarity. You can find this in your Clarity dashboard under Settings.

### crossOrigin

* Type: `string`
* Default: `undefined`
* Details: The `crossorigin` attribute for the injected script tag. This configures the [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) setting for loading the Clarity resources.
