---
icon: languages
---

# Locales

Every official plugin ships built-in locale data, so its texts are translated out of the box for the languages listed below. The `locales` option is only needed when you want to change a built-in text, or to translate a language that has no built-in data.

## Supported Languages

- **English (United States)** (en-US)
- **Simplified Chinese** (zh-CN)
- **Traditional Chinese** (zh-TW)
- **German** (de-DE)
- **German (Austria)** (de-AT)
- **Vietnamese** (vi-VN)
- **Ukrainian** (uk-UA)
- **Russian** (ru-RU)
- **Portuguese** (pt)
- **Portuguese (Brazil)** (pt-BR)
- **Polish** (pl-PL)
- **Slovak** (sk-SK)
- **French** (fr-FR)
- **Spanish** (es-ES)
- **Italian** (it-IT)
- **Japanese** (ja-JP)
- **Turkish** (tr-TR)
- **Korean** (ko-KR)
- **Finnish** (fi-FI)
- **Hungarian** (hu-HU)
- **Indonesian** (id-ID)
- **Dutch** (nl-NL)

::: tip

A language is matched by the `lang` of your locale, from the most specific code to the language code: `de-AT` uses the Austrian German data, `de-CH` falls back to `de-DE`, and `zh-HK` falls back to `zh-CN`.

:::

## Configuration

Locale texts are configured in two places, and the locale paths used by them must match:

- `locales` in the [site config](https://v2.vuepress.vuejs.org/reference/config.html#locales) declares the locale paths and the `lang` of each of them.
- `locales` in a plugin option overrides the texts of the plugin, keyed by the same locale paths.

For each site locale, the plugin looks up the built-in data by its `lang`, then merges your config on top of it. This is why you only write the fields you want to change.

### Overriding a Built-in Text

```ts title=".vuepress/config.ts"
import { examplePlugin } from '@vuepress/plugin-example'

export default {
  locales: {
    '/': {
      lang: 'en-US',
    },
    '/zh/': {
      lang: 'zh-CN',
    },
  },

  plugins: [
    examplePlugin({
      locales: {
        // the key must match a site locale path
        '/zh/': {
          // only the texts you want to change,
          // the others keep their built-in Chinese value
          placeholder: '搜索文档',
        },
      },
    }),
  ],
}
```

### Adding an Unsupported Language

A locale whose `lang` has no built-in data falls back to English and logs a warning. Provide the full locale data to translate it:

```ts title=".vuepress/config.ts"
import { examplePlugin } from '@vuepress/plugin-example'

export default {
  locales: {
    '/': {
      lang: 'en-US',
    },
    '/xx/': {
      // a language without built-in data
      lang: 'mm-NN',
    },
  },

  plugins: [
    examplePlugin({
      locales: {
        '/xx/': {
          // provide every text of the plugin
          placeholder: '...',
        },
      },
    }),
  ],
}
```

::: tip

The `locales` option of each plugin documents the fields its locale data contains, so you know what can be overridden.

:::
