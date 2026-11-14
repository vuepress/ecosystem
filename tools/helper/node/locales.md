---
url: /ecosystem/tools/helper/node/locales.md
---
# Locales Related

These functions are only available in `@vuepress/helper`.

## getFullLocaleConfig

A helper function to get full locale config from built-in locale info and user configuration.

```ts
export interface GetLocaleConfigOption<T extends LocaleData> {
  app: App
  default: DefaultLocaleInfo<T>
  config?: LocaleConfig<T> | undefined
  name?: string
}

export const getFullLocaleConfig: <T extends LocaleData>(
  options: GetLocaleConfigOption<T>,
) => ExactLocaleConfig<T>
```

* The `app` parameter is the VuePress Node app instance.

* The `default` parameter is the default locale info, where this should be an array of locale info settings.

  Each locale info setting should be an tuple with two elements:

  * The first element are an array of lang code that the locale info setting belongs to.
  * The second element are the locale info setting.

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

* The `config` parameter is the user locale config, which is optional.

  It should be an object with localePath as key and partial locale info setting as value.

  An example of `config` parameter:

  ```ts
  const userLocaleConfig = {
    '/zh/': { description: '由 Vue 驱动的静态网站生成器' },
    '/zh-TW/': { description: '由 Vue 驅動的靜態網站生成器' },
  }
  ```

* The `name` parameter is the plugin name, which is optional, only used for logging.

The function will automatically merge the default locale info and user locale config, and return the final locale config, where the user locale config will override the default locale info.

The default locale info will be chosen based on the current language of each locale in site config, and when a locale's lang code is not found in the default locale info, it will fallback to the first one of the following that exists:

* locale info of `en-US`
* locale info of `en`
* locale info of first element in the default locale info
