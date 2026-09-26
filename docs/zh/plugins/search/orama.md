---
icon: search
---

# Orama

<NpmBadge package="@vuepress/plugin-orama" />

一个强大的客户端搜索插件，支持自定义索引和全文搜索。

## 使用方法

```bash
npm i -D @vuepress/plugin-orama@next
```

```ts title=".vuepress/config.ts"
import { oramaPlugin } from '@vuepress/plugin-orama'

export default {
  plugins: [
    oramaPlugin({
      // 选项
    }),
  ],
}
```

## 指南

### 搜索索引

基于 [Orama](https://docs.orama.com/docs/orama-js/)，该插件能够提供快速的搜索体验，即使在大型站点上也是如此。

默认情况下，插件只会索引标题、文章摘要以及你配置的自定义字段。如果你希望索引页面的全部内容，需要在插件选项中设置 `indexContent: true`。

如果要防止某个页面被索引，可以在其 Frontmatter 中设置 `search: false`。如果需要通过编程方式过滤页面（例如根据路径排除），可以使用 [`filter` 选项](#filter)。

### 自定义字段

无论你是主题开发者还是普通用户，通过 Frontmatter 或 `extendsPage` 生命周期为页面添加额外数据是很常见的，在大多数情况下，你可能也希望索引这些数据。

`customFields` 选项接受一个数组，每个元素代表一个自定义搜索索引配置项。每个配置项包含两个部分：

- `getter`: 该自定义字段的获取器。这个函数接收 `page` 对象作为参数，并返回需要被索引的值（可以是字符串、字符串数组，或者在缺失时返回 `null`/`undefined`）。
- `formatter`: 控制该条目在搜索结果中如何显示的格式字符串或对象。其中 `$content` 会被替换为 `getter` 返回的实际值。如果你的站点支持多语言，也可以将其设置为对象，以便为每种语言单独设置显示格式。

这些数据将被添加到索引中，并包含在搜索结果里。

::: tip 示例：将作者添加到索引

假设你在 Frontmatter 中通过 `author` 字段添加了作者信息：

```md
---
author: 你的名字
---

你的 Markdown 内容...
```

你可以通过如下设置将作者信息添加到索引中：

```ts title=".vuepress/config.ts"
import { oramaPlugin } from '@vuepress/plugin-orama'

export default {
  plugins: [
    oramaPlugin({
      customFields: [
        {
          getter: (page) => page.frontmatter.author,
          formatter: '作者: $content',
        },
      ],
    }),
  ],
}
```

:::

::: tip 示例：添加更新时间

假设你正在使用 `@vuepress/plugin-git` 插件，并且将中文和英文文档分别放置在 `/zh/` 和 `/` 目录下。

你可以通过以下设置来索引更新时间：

```ts title=".vuepress/config.ts"
import { oramaPlugin } from '@vuepress/plugin-orama'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  // 假设你使用如下多语言配置
  locales: {
    '/': {
      lang: 'en-US',
    },
    '/zh/': {
      lang: 'zh-CN',
    },
  },

  plugins: [
    oramaPlugin({
      customFields: [
        {
          getter: (page) => page.data.git?.updateTime.toLocaleString(),
          formatter: {
            '/': 'Update time: $content',
            '/zh/': '更新时间：$content',
          },
        },
      ],
    }),
  ],
})
```

:::

## 选项

:::: fields
@`indexContent` type=boolean

是否索引页面的全部内容。

::: tip

默认情况下，只会索引页面的标题、摘要以及你的自定义字段。如果需要索引页面的正文内容，请将此选项设置为 `true`。

:::

参见：[搜索索引](#搜索索引)。

@`preserveTags` type=`string[]` default=`[]`

需要在索引时保留内部内容的标签。

默认情况下，索引器只会遍历一组内置的 HTML 标签来提取文本内容，并且会索引诸如 `pre`、`code` 中的代码内容。像 `script`、`style` 这类标签，以及不在这组内置标签中的自定义标签 / 组件，其内部内容会被整体跳过，不会进入索引。

将标签名添加到 `preserveTags`，可以让索引器保留并遍历该标签的子文本，即使该标签本身不在默认的遍历集合中。标签名按小写匹配。

对于一些会将其插槽内容渲染为普通文本的自定义 Vue 组件（如 `<human-only>contents</human-only>`），你可以将其标签名添加到这里，以便在搜索索引中保留其内部内容。

@`suggestion` type=boolean default=`true`

是否在搜索时显示建议。

@`customFields` type=`CustomFieldOptions[]`

自定义索引字段配置。

参见：[自定义字段](#自定义字段)。

@@`customFields[*].getter` type=`(page: Page) => string[] | string | null | undefined` required

该自定义字段的获取器。这个函数接收 `page` 对象作为参数，并返回需要被索引的值（可以是字符串、字符串数组，或者在缺失时返回 `null`/`undefined`）。

@@`customFields[*].formatter` type=`Record<string, string> | string` default=`'$content'`

控制该条目在搜索结果中如何显示的格式字符串或对象。其中 `$content` 会被替换为 `getter` 返回的实际值。如果你的站点支持多语言，也可以将其设置为对象，以便为每种语言单独设置显示格式。

@`hotKeys` type=`(KeyOptions | string)[]` default=`[{ key: 'k', ctrl: true }, { key: '/', ctrl: true }]`

指定热键的 [event.key](http://keycode.info/)。当按下热键时，搜索框输入框将获得焦点。设置为空数组以禁用热键。

@@`hotKeys[*].key` type=string required

热键的 `event.key` 值。

@@`hotKeys[*].ctrl` type=boolean

是否同时按下 `event.ctrlKey`。

@@`hotKeys[*].shift` type=boolean

是否同时按下 `event.shiftKey`。

@@`hotKeys[*].alt` type=boolean

是否同时按下 `event.altKey`。

@@`hotKeys[*].meta` type=boolean

是否同时按下 `event.metaKey`。

@`queryHistoryCount` type=number default=`5`

最大存储的搜索查询历史记录数量，设置为 `0` 以禁用。

@`resultHistoryCount` type=number default=`5`

最大存储的匹配结果历史记录数量，设置为 `0` 以禁用。

@`searchDelay` type=number default=`150`

输入后开始搜索的延迟时间（毫秒）。

::: note

在内容庞大的站点上进行客户端搜索可能会较慢，在这种情况下，你可能需要增加此值，以确保用户在搜索开始前已完成输入。

:::

@`suggestDelay` type=number default=`0`

输入后开始自动建议的延迟时间（毫秒）。

@`filter` type=`(page: Page) => boolean` default=`() => true`

用于过滤页面的函数。

@`sortStrategy` type=`'max' | 'total'` default=`'max'`

结果排序策略。当有多个匹配结果时，`max` 表示具有更高最大分数的页面将排在前面，`total` 表示具有更高总分数的页面将排在前面。

@`worker` type=string default=`'orama.worker.js'`

输出 Worker 的文件名。

@`hotReload` type=boolean default="同 --debug 标志的状态"

是否在开发服务器中启用热重载。

::: note

默认情况下它是禁用的，因为对于内容庞大的站点，此功能会对性能产生巨大影响。

:::

@`indexOptions` type=OramaIndexOptions

用于创建索引的选项。

参见：[分词](#分词)、[自定义索引生成](#自定义索引生成)。

@@`indexOptions.tokenizer` type=`(language: string) => Tokenizer`

自定义分词器工厂。未提供时，会为语言环境的语言创建开箱即用的分词器。

::: warning

当你提供自定义 `tokenizer` 时，必须同时设置 [`querySplitter`](#definesearchconfig) 选项，使其以相同的方式拆分单词，否则查询将无法匹配索引。

:::

@`indexLocaleOptions` type=`Record<string, OramaIndexOptions>`

每个语言环境用于创建索引的选项，对象键应为语言环境路径。

@`locales` type=`LocaleConfig<SearchLocaleData>`

搜索界面的多语言配置。搜索界面使用的任何文字都可以按语言环境路径覆盖。

::: details 内置支持的语言

- **简体中文** (zh-CN)
- **繁体中文** (zh-TW)
- **英语 (美国)** (en-US)
- **德语** (de-DE)
- **俄语** (ru-RU)
- **乌克兰语** (uk-UA)
- **越南语** (vi-VN)
- **葡萄牙语** (pt)
- **波兰语** (pl-PL)
- **法语** (fr-FR)
- **西班牙语** (es-ES)
- **斯洛伐克语** (sk-SK)
- **日语** (ja-JP)
- **土耳其语** (tr-TR)
- **韩语** (ko-KR)
- **芬兰语** (fi-FI)
- **印尼语** (id-ID)
- **荷兰语** (nl-NL)

:::

@@`locales.<localePath>.placeholder` type=string

搜索框占位符。

@@`locales.<localePath>.search` type=string

搜索文字。

@@`locales.<localePath>.clear` type=string

清空搜索文字。

@@`locales.<localePath>.remove` type=string

移除当前条目。

@@`locales.<localePath>.searching` type=string

搜索中文字。

@@`locales.<localePath>.cancel` type=string

取消文字。

@@`locales.<localePath>.defaultTitle` type=string

默认标题。

@@`locales.<localePath>.select` type=string

选择提示。

@@`locales.<localePath>.navigate` type=string

切换提示。

@@`locales.<localePath>.autocomplete` type=string

自动补全提示。

@@`locales.<localePath>.exit` type=string

关闭提示。

@@`locales.<localePath>.loading` type=string

加载提示。

@@`locales.<localePath>.queryHistory` type=string

搜索查询历史标题。

@@`locales.<localePath>.resultHistory` type=string

搜索结果历史标题。

@@`locales.<localePath>.emptyHistory` type=string

搜索历史为空提示。

@@`locales.<localePath>.emptyResult` type=string

结果为空提示。
::::

## Frontmatter

### search

- 类型: `boolean`
- 默认值: `true`

是否索引该页面。

## 进阶

### 分词

每个语言环境的索引都会使用其自身语言的分词器进行分词，语言由该语言环境的 `lang` 检测得到。

分词器会自动选择：

- 中文与日文使用官方的 [`@orama/tokenizers`](https://docs.orama.com/docs/orama-js/supported-languages/using-chinese-with-orama) 分词器，它们使用 `Intl.Segmenter` 分词，而不是按空格拆分。
- Orama 支持的语言使用其内置分词器。
- 其他语言回退到 `Intl.Segmenter`。

词条会被转换为小写、移除[停用词](https://docs.orama.com/docs/orama-js/text-analysis/stop-words)并折叠变音符号，因此 `VuePress` 能匹配 `vuepress`，`Café` 能匹配 `cafe`。

::: tip

停用词会被内嵌到搜索索引中，因此只有你站点实际使用的语言会被发送到浏览器。

:::

::: note

Orama 的文档声称支持韩语、波兰语、斯洛伐克语与越南语，但其所有包都并未实现。这些语言会回退到 `Intl.Segmenter`，它仍能将它们分词，但不会移除其停用词。

:::

::: warning 浏览器支持

对不以空格分词的语言（中文、日文、韩文、泰文等）进行分词依赖 [`Intl.Segmenter`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter) API，它在 Chrome 87+、Edge 87+、Safari 14.1+ 与 Firefox 125+ 中可用。

在更旧的浏览器中，查询会被拆分为单个字符，与索引中的词不再匹配，因此**搜索这些语言会返回不到结果或无关结果**。以空格分词的语言不受影响。

:::

### 自定义索引生成

你可以通过 `indexOptions` 和 `indexLocaleOptions` 自定义索引生成过程，以便获得更好的索引结果，并可针对每个语言环境单独设置。

你可以提供自定义 `tokenizer` 来提升特定语言的搜索准确性。此时需设置 [`querySplitter`](#definesearchconfig) 选项，使其以相同的方式拆分单词，否则查询将无法匹配索引。

### 使用 API

如果你想访问搜索 API，你需要从 `@vuepress/plugin-orama/client` 导入 `createSearchWorker` 函数：

```ts
import { createSearchWorker } from '@vuepress/plugin-orama/client'
import { defineClientConfig } from 'vuepress/client'

const { all, suggest, search, terminate } = createSearchWorker()

// 建议某些内容
suggest('key').then((suggestions) => {
  // 显示搜索建议
})

// 搜索某些内容
search('keyword').then((results) => {
  // 显示搜索结果
})

// 同时返回建议和结果
all('key').then(({ suggestions, results }) => {
  // 显示搜索建议和结果
})

// 不需要时终止 worker
terminate()
```

### 开发服务器中的限制

搜索服务由 Worker 提供支持，在开发模式下，我们无法像生产环境那样打包 Worker 文件。

为了在开发模式下加载搜索索引，我们使用了 `type: "module"` 的现代 Service Worker。因此，如果你想在 DevServer 中尝试搜索，请确保你使用的浏览器支持该特性（查看 [CanIUse](https://caniuse.com/mdn-api_worker_worker_ecmascript_modules) 了解支持详情）。

为了获得更好的性能，在开发模式下添加/编辑/删除 Markdown 内容默认不会触发搜索索引的更新。如果你正在校对或优化搜索结果，可以通过设置 `hotReload: true` 选项来启用热重载。

### 与服务端搜索对比

客户端搜索具有无需后端服务且易于添加等优势，但你也应该了解其缺点。

::: warning 缺点

1. **构建时间**：你需要在构建阶段索引你的网站，这会增加网站部署时间和打包体积。
1. **带宽压力**：用户在搜索前需要从你的服务器获取完整的搜索索引，这将给你的服务器带来额外的流量和带宽压力。站点内容越多，搜索索引就越大。
1. **延迟**：要执行搜索，用户必须等待搜索索引下载并在本地解析。这可能比通过简单的网络请求从服务端搜索获取结果要慢得多。
1. **设备性能**：由于搜索是在用户设备上完成的，速度完全取决于设备的性能。

:::

在大多数情况下，如果你正在构建一个大型站点，如果条件允许，应该选择服务提供商为你的站点提供搜索服务（如 [Algolia](https://www.algolia.com/)），或者选择开源的搜索爬虫工具并将其托管在自己的服务器上，以提供搜索服务并定期爬取你的站点。这对于大型站点是必要的，因为用户通过网络请求将搜索词发送到搜索 API 并直接获取搜索结果。

特别地，[DocSearch](https://docsearch.algolia.com/) 是 Algolia 为开源项目提供的免费搜索服务。如果你正在创建开源项目文档或开源技术博客，你可以[申请使用](https://docsearch.algolia.com/apply/)，并使用 [`@vuepress/plugin-docsearch`](./docsearch.md) 插件来提供搜索功能。

## 客户端配置

### defineSearchConfig

自定义 [搜索选项](https://docs.orama.com/docs/orama-js/search/)，接受普通对象、Ref 或 Getter 函数作为参数。

由于搜索是在 Web Worker 中完成的，因此不支持直接为 Orama 设置函数类型的选项。

为了提供更准确的搜索查询、建议和结果，我们提供了 `querySplitter`、`suggestionsFilter` 和 `resultsFilter` 选项。你可以为特定语言或所有语言设置它们：

```ts
interface SearchLocaleOptions extends WorkerSearchOptions {
  /** 分词函数 */
  querySplitter?: (query: string, lang: string) => Promise<string[]>

  /** 建议过滤器函数 */
  suggestionsFilter?: (
    suggestions: string[],
    query: string,
    locale: string,
    pageData: PageData,
  ) => string[]

  /** 搜索结果过滤器函数 */
  resultsFilter?: (
    results: SearchResult[],
    query: string,
    locale: string,
    pageData: PageData,
  ) => SearchResult[]
}

interface SearchOptions extends SearchLocaleOptions {
  /** 为每个语言环境设置不同的选项 */
  locales?: Record<string, SearchLocaleOptions>
}

export const defineSearchConfig: (
  options: MaybeRefOrGetter<SearchOptions>,
) => void
```

```ts title=".vuepress/client.ts"
import { defineSearchConfig } from '@vuepress/plugin-orama/client'

defineSearchConfig({
  // 在此处设置全局搜索选项

  locales: {
    '/zh/': {
      // 为中文设置不同的选项
    },
  },
})
```

## 组件

- SearchBox
