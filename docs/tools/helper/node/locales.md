---
icon: languages
---

# Locales Related

These functions are only available in `@vuepress/helper`.

## getFullLocaleConfig

A helper function to get full locale config from built-in locale info and user configuration.

```ts
export type LocaleDataValue = LocaleData | string

export interface GetLocaleConfigOption<T extends LocaleDataValue> {
  app: App
  default: DefaultLocaleInfo<T>
  config?: LocaleDataConfig<T> | undefined
  name?: string
}

export const getFullLocaleConfig: <T extends LocaleDataValue>(
  options: GetLocaleConfigOption<T>,
) => ExactLocaleConfig<T extends string ? string : T>
```

`LocaleDataConfig<T>` is `Record<string, string>` when `T` is a string, and `Record<string, Partial<T>>` otherwise.

- The `app` parameter is the VuePress Node app instance.
- The `default` parameter is the default locale info, where this should be an array of locale info settings.

  Each locale info setting should be a tuple with two elements:
  - The first element is an array of lang code that the locale info setting belongs to.
  - The second element is the locale data, which can be a plain object or a primitive value such as a string.

  An example of `default` parameter:

  ```ts
  const defaultLocaleInfo = [
    [
      ['en'],
      { title: 'VuePress', description: 'Vue-powered Static Site Generator' },
    ],
    [
      ['zh', 'zh-CN'],
      { title: 'VuePress', description: 'Vue 驱动的静态网站生成器' },
    ],
    [['zh-TW'], { title: 'VuePress', description: 'Vue 驅動的靜態網站生成器' }],
  ]
  ```

  An example with string locale data:

  ```ts
  const defaultLocaleInfo = [
    [['en'], 'Search: $content'],
    [['zh', 'zh-CN'], '分类: $content'],
  ]
  ```

- The `config` parameter is the user locale config, which is optional.

  It should be an object with localePath as key. For object locale data, the value is a partial locale info setting; for primitive locale data, the value is the full locale data.

  An example of `config` parameter:

  ```ts
  const userLocaleConfig = {
    '/zh/': { description: '由 Vue 驱动的静态网站生成器' },
    '/zh-TW/': { description: '由 Vue 驅動的靜態網站生成器' },
  }
  ```

  With string locale data, the config looks like this:

  ```ts
  const userLocaleConfig = {
    '/zh/': '搜索: $content',
  }
  ```

- The `name` parameter is the plugin name, which is optional, only used for logging.

The function will automatically merge the default locale info and user locale config, and return the final locale config, where the user locale config will override the default locale info.

When the locale data is a plain object, it is deeply merged with the user locale config. When it is a primitive value such as a string, it is returned as-is, and the user locale config value overrides it when present.

The default locale info will be chosen based on the current language of each locale in site config, and when a locale's lang code is not found in the default locale info, it will fallback to the first one of the following that exists:

- locale info of `en-US`
- locale info of `en`
- locale info of first element in the default locale info
