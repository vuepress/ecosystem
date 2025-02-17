---
icon: languages
---

# 多语言相关

这些函数仅在 `@vuepress/helper` 中可用。

## getFullLocaleConfig

一个从内置的 locale 信息和用户配置中获取完整 locale 配置的辅助函数。

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

- `app` 参数是 VuePress Node app 实例。
- `default` 参数是默认的 locale 信息，应该是一个 locale 信息设置的数组。

  每个 locale 信息设置应该是一个包含两个元素的元组：

  - 第一个元素是 locale 信息设置所属的语言代码数组。
  - 第二个元素是 locale 信息设置。

  `default` 参数的示例：

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

- `config` 参数是用户 locale 配置，是可选的。

  它应该是一个以 localePath 为键，以部分 locale 信息设置为值的对象。

  `config` 参数的示例：

  ```ts
  const userLocaleConfig = {
    '/zh/': { description: '由 Vue 驱动的静态网站生成器' },
    '/zh-TW/': { description: '由 Vue 驅動的靜態網站生成器' },
  }
  ```

- `name` 参数是插件名称，是可选的，仅用于日志记录。

函数将自动合并默认的 locale 信息和用户 locale 配置，并返回最终的 locale 配置，其中用户 locale 配置将覆盖默认的 locale 信息。

默认的 locale 信息将根据站点配置中每个 locale 的当前语言选择，当 locale 的语言代码在默认的 locale 信息中找不到时，它将回退到以下存在的第一个：

- `en-US` 的 locale 信息
- `en` 的 locale 信息
- 默认 locale 信息的第一个元素
