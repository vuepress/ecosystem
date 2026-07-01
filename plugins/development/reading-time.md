---
url: /plugins/development/reading-time.md
---
# reading-time

This plugin analyzes your page content to generate word counts and estimated reading times.

## Usage

```bash
npm i -D @vuepress/plugin-reading-time@next
```

```ts title=".vuepress/config.ts"
import { readingTimePlugin } from '@vuepress/plugin-reading-time'

export default {
  plugins: [
    readingTimePlugin({
      // options
    }),
  ],
}
```

## Page Data (Node.js Side)

The plugin calculates statistics for every page and injects them into the `page.data.readingTime` property. This object contains:

* `minutes`: The estimated reading time in minutes (`number`).
* `words`: The total word count (`number`).

You can access this data directly within Node.js during the build process, such as inside the `extendsPage` or `onInitialized` lifecycles:

```ts
export default {
  // ...
  extendsPage: (page) => {
    // Access reading time data for the current page being processed
    console.log(page.data.readingTime) // { minutes: 3.2, words: 934 }
  },

  onInitialized: (app) => {
    // Iterate through all pages in the VuePress app
    app.pages.forEach((page) => {
      console.log(page.data.readingTime) // { minutes: 3.2, words: 934 }
    })
  },
}
```

## Composition API (Client Side)

To display reading time information in your theme or components, you can use the composition APIs provided by the client module.

Import `useReadingTimeData` for raw numbers or `useReadingTimeLocale` for localized strings:

```vue
<script setup lang="ts">
import {
  useReadingTimeData,
  useReadingTimeLocale,
} from '@vuepress/plugin-reading-time/client'

// Get raw values (e.g., for custom logic or sorting)
const readingTimeData = useReadingTimeData() // { minutes: 1.1, words: 100 }

// Get localized text based on current site configuration
const readingTimeLocale = useReadingTimeLocale() // { time: "1 minute", words: "100 words" }
</script>
```

## Options

### wordPerMinute

* Type: `number`
* Default: `300`
* Details: Reading speed in words per minute.

### locales

* Type: `ReadingTimePluginLocaleConfig`

  ```ts
  interface ReadingTimePluginLocaleData {
    /**
     * Word template, `$word` will be automatically replaced by actual words
     */
    word: string

    /**
     * Text for less than one minute
     */
    less1Minute: string

    /**
     * Time template, `$time` will be automatically replaced by actual time
     */
    time: string
  }

  interface ReadingTimePluginLocaleConfig {
    [localePath: string]: Partial<ReadingTimePluginLocaleData>
  }
  ```

* Details: Locale config for reading time text and word count text.

::: details Built-in Supported Languages

* **Simplified Chinese** (zh-CN)
* **Traditional Chinese** (zh-TW)
* **English (United States)** (en-US)
* **German** (de-DE)
* **Russian** (ru-RU)
* **Ukrainian** (uk-UA)
* **Vietnamese** (vi-VN)
* **Portuguese** (pt)
* **Polish** (pl-PL)
* **French** (fr-FR)
* **Spanish** (es-ES)
* **Slovak** (sk-SK)
* **Japanese** (ja-JP)
* **Turkish** (tr-TR)
* **Korean** (ko-KR)
* **Finnish** (fi-FI)
* **Indonesian** (id-ID)
* **Dutch** (nl-NL)

:::

## Client API

You can import and use these APIs from `@vuepress/plugin-reading-time/client`:

::: tip These APIs won't throw errors even if you disable the plugin.

:::

### useReadingTimeData

```ts
interface ReadingTime {
  /** Expected reading time in minutes */
  minutes: number
  /** Words count of content */
  words: number
}

const useReadingTimeData: () => ComputedRef<ReadingTime | null>
```

Returns `null` when the plugin is disabled.

### useReadingTimeLocale

```ts
interface ReadingTimeLocale {
  /** Expected reading time text in locale */
  time: string
  /** Word count text in locale */
  words: string
}

const useReadingTimeLocale: () => ComputedRef<ReadingTimeLocale>
```

## Theme Integration

For plugin and theme authors, a programmatic "Use API" is available. This approach is recommended over adding the plugin to the `plugins` array directly in your theme, as it handles registration ordering and prevents duplicate registration.

```js title="your plugin or theme entry"
import { useReadingTimePlugin } from '@vuepress/plugin-reading-time'

export default (options) => (app) => {
  useReadingTimePlugin(app, {
    // your options
  })

  return {
    name: 'vuepress-plugin-xxx', // or vuepress-theme-xxx
  }
}
```

::: tip Why use the "Use API"?

1. **Singleton Pattern**: VuePress warns if a plugin is registered multiple times (where only the first takes effect). `useReadingTimePlugin` checks for existing instances and skips registration if already present.
2. **Execution Order**: If you rely on reading time data within the `extendsPage` lifecycle, the reading time plugin must execute *before* your code. `useReadingTimePlugin` ensures the correct initialization order so `page.data.readingTime` is available when you need it.

:::

If you need to force a specific configuration or reset the plugin state, you can use `removeReadingTimePlugin`:

```js title="your plugin or theme entry"
import { useReadingTimePlugin } from '@vuepress/plugin-reading-time'

export default (options) => (app) => {
  // Remove any previously registered instances of the reading time plugin
  removeReadingTimePlugin(app)

  // Register the plugin again to ensure your specific options take precedence
  useReadingTimePlugin(app, {
    // your options
  })

  return {
    name: 'vuepress-plugin-xxx', // or vuepress-theme-xxx
  }
}
```
