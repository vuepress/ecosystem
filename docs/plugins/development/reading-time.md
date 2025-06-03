---
icon: book-open-text
---

# reading-time

<NpmBadge package="@vuepress/plugin-reading-time" />

This plugin generates word count and estimated reading time for each page.

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

The plugin injects reading time information into the `readingTime` field of page data:

- `readingTime.minutes`: estimated reading time in minutes (`number`)
- `readingTime.words`: word count (`number`)

### Getting Data on Node Side

For any page, you can get estimated reading time and word count from `page.data.readingTime`:

```ts
page.data.readingTime // { minutes: 3.2, words: 934 }
```

You can access it for further processing in the `extendsPage` lifecycle and other lifecycles:

```js
export default {
  // ...
  extendsPage: (page) => {
    page.data.readingTime // { minutes: 3.2, words: 934 }
  },

  onInitialized: (app) => {
    app.pages.forEach((page) => {
      page.data.readingTime // { minutes: 3.2, words: 934 }
    })
  },
}
```

### Getting Data on Client Side

You can import `useReadingTimeData` and `useReadingTimeLocale` from `@vuepress/plugin-reading-time/client` to get the reading time data and locale data of the current page:

```vue
<script setup lang="ts">
import {
  useReadingTimeData,
  useReadingTimeLocale,
} from '@vuepress/plugin-reading-time/client'

const readingTimeData = useReadingTimeData() // { minutes: 1.1, words: 100 }
const readingTimeLocale = useReadingTimeLocale() // { time: "1 minute", words: "100 words" }
</script>
```

## Options

### wordPerMinute

- Type: `number`
- Default: `300`
- Details: Reading speed in words per minute.

### locales

- Type: `ReadingTimePluginLocaleConfig`

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

- Details: Locale config for reading time text and word count text.

::: details Built-in Supported Languages

- **Simplified Chinese** (zh-CN)
- **Traditional Chinese** (zh-TW)
- **English (United States)** (en-US)
- **German** (de-DE)
- **Russian** (ru-RU)
- **Ukrainian** (uk-UA)
- **Vietnamese** (vi-VN)
- **Portuguese (Brazil)** (pt-BR)
- **Polish** (pl-PL)
- **French** (fr-FR)
- **Spanish** (es-ES)
- **Slovak** (sk-SK)
- **Japanese** (ja-JP)
- **Turkish** (tr-TR)
- **Korean** (ko-KR)
- **Finnish** (fi-FI)
- **Indonesian** (id-ID)
- **Dutch** (nl-NL)

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

## Advanced Usage

This plugin targets plugin and theme developers, so we provide a "Use API":

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

::: tip Why you should use the "Use API"

1. When you register a plugin multiple times, VuePress gives you a warning that only the first one takes effect. The `useReadingTimePlugin` automatically detects if the plugin is registered and avoids registering multiple times.
1. If you access reading time data in the `extendsPage` lifecycle, then `@vuepress/plugin-reading-time` must be called before your theme or plugin, otherwise you will get `undefined` for `page.data.readingTime`. The `useReadingTimePlugin` ensures that `@vuepress/plugin-reading-time` is called before your theme or plugin.

:::

We also provide a `removeReadingTimePlugin` API to remove the plugin. You can use this to ensure your call takes effect or clear the plugin:

```js title="your plugin or theme entry"
import { useReadingTimePlugin } from '@vuepress/plugin-reading-time'

export default (options) => (app) => {
  // this removes any existing reading time plugin at this time
  removeReadingTimePlugin(app)

  // so this will take effect even if there is a reading time plugin registered before
  useReadingTimePlugin(app, {
    // your options
  })

  return {
    name: 'vuepress-plugin-xxx', // or vuepress-theme-xxx
  }
}
```
