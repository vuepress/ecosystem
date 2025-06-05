---
icon: database
---

# theme-data

<NpmBadge package="@vuepress/plugin-theme-data" />

为你的主题提供客户端数据，包含 VuePress 的 [多语言支持](https://vuejs.press/zh/guide/i18n.html)。

该插件主要用于开发主题，并且已经集成到默认主题中。大部分情况下你不需要直接使用它。

对于主题作者，该插件可以提供与 VuePress 及默认主题相同的多语言支持机制。但是如果你的主题不需要提供多语言支持，或者你想用自己的方式来实现多语言支持，那么你不需要使用该插件。

## 使用方法

```bash
npm i -D @vuepress/plugin-theme-data@next
```

```ts title=".vuepress/config.ts"
import { themeDataPlugin } from '@vuepress/plugin-theme-data'

export default {
  plugins: [
    themeDataPlugin({
      // 配置项
    }),
  ],
}
```

## 配置项

### themeData

- 类型：`ThemeData`

- 必填：是

- 详情：

  你希望在客户端中使用的主题数据对象。

  你可以通过该配置项，在 Node 端提供主题数据，然后在客户端通过 [useThemeData](#usethemedata) 和 [useThemeLocaleData](#usethemelocaledata) 来使用主题数据。

- 示例：

```ts title=".vuepress/config.ts"
export default {
  plugins: [
    themeDataPlugin({
      themeData: {
        foo: 'foo',
        locales: {
          '/zh/': {
            foo: 'zh-foo',
          },
        },
      },
    }),
  ],
}
```

::: warning
主题数据对象在传递到客户端之前，会使用 `JSON.stringify()` 进行处理，因此你需要保证你提供的是一个可以被 JSON 序列化的对象。
:::

## Composition API

### useThemeData

- 详情：

  返回主题数据的响应式引用对象。

  数据是通过 [themeData](#themedata) 配置项提供的。

- 示例：

```ts
import type { ThemeData } from '@vuepress/plugin-theme-data/client'
import { useThemeData } from '@vuepress/plugin-theme-data/client'

type MyThemeData = ThemeData<{
  foo: string
}>

export default {
  setup(): void {
    const themeData = useThemeData<MyThemeData>()
    console.log(themeData.value)
  },
}
```

### useThemeLocaleData

- 详情：

  返回当前语言环境下主题数据的响应式引用对象。

  当前语言环境中的字段已被合并到顶层字段中。

- 示例：

```ts
import type { ThemeData } from '@vuepress/plugin-theme-data/client'
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/client'

type MyThemeData = ThemeData<{
  foo: string
}>

export default {
  setup(): void {
    const themeLocaleData = useThemeLocaleData<MyThemeData>()
    console.log(themeLocaleData.value)
  },
}
```
