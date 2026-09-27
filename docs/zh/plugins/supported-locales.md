---
icon: languages
---

# 多语言配置

所有官方插件都内置了多语言数据，因此插件的文本对下列语言已经开箱即用地翻译好了。只有在你想修改某个内置文本，或想翻译一个没有内置数据的语言时，才需要使用 `locales` 选项。

## 支持的语言

- **英文(美国)** (en-US)
- **简体中文** (zh-CN)
- **繁体中文** (zh-TW)
- **德语** (de-DE)
- **德语(奥地利)** (de-AT)
- **越南语** (vi-VN)
- **乌克兰语** (uk-UA)
- **俄语** (ru-RU)
- **葡萄牙语** (pt)
- **葡萄牙语(巴西)** (pt-BR)
- **波兰语** (pl-PL)
- **斯洛伐克语** (sk-SK)
- **法语** (fr-FR)
- **西班牙语** (es-ES)
- **意大利语** (it-IT)
- **日语** (ja-JP)
- **土耳其语** (tr-TR)
- **韩语** (ko-KR)
- **芬兰语** (fi-FI)
- **匈牙利语** (hu-HU)
- **印尼语** (id-ID)
- **荷兰语** (nl-NL)

::: tip

语言会按语言环境 (`lang`)，从最具体的语言代码逐级回退到语言代码：`de-AT` 使用奥地利德语的数据，`de-CH` 回退到 `de-DE`，`zh-HK` 回退到 `zh-CN`。

:::

## 配置方式

多语言文本在两处配置，且它们使用的语言路径必须一致：

- [站点配置](https://v2.vuepress.vuejs.org/zh/reference/config.html#locales)中的 `locales` 声明语言路径以及各自的 `lang`。
- 插件选项中的 `locales` 覆盖插件的文本，以相同的语言路径为键。

对每个站点语言环境，插件会先按其 `lang` 查找内置数据，再把你的配置合并到内置数据之上。因此你只需要写出想修改的字段。

### 覆盖内置文本

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
        // 键必须与站点语言路径一致
        '/zh/': {
          // 只写你想修改的文本，
          // 其余文本保持内置的中文值
          placeholder: '搜索文档',
        },
      },
    }),
  ],
}
```

### 添加不支持的语言

`lang` 没有内置数据的语言环境会回退到英文，并输出一条警告。要翻译它，请提供该语言的完整多语言数据：

```ts title=".vuepress/config.ts"
import { examplePlugin } from '@vuepress/plugin-example'

export default {
  locales: {
    '/': {
      lang: 'en-US',
    },
    '/xx/': {
      // 一个没有内置数据的语言
      lang: 'mm-NN',
    },
  },

  plugins: [
    examplePlugin({
      locales: {
        '/xx/': {
          // 提供插件的全部文本
          placeholder: '...',
        },
      },
    }),
  ],
}
```

::: tip

各个插件的 `locales` 选项记录了它的多语言数据包含哪些字段，你可以据此了解哪些内容可以覆盖。

:::
