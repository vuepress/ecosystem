---
icon: search
---

# slimsearch

<NpmBadge package="@vuepress/plugin-slimsearch" />

一个强大的客户端搜索插件，支持自定义索引和全文搜索。

## 使用方法

```bash
npm i -D @vuepress/plugin-slimsearch@next
```

```ts title=".vuepress/config.ts"
import { slimsearchPlugin } from '@vuepress/plugin-slimsearch'

export default {
  plugins: [
    slimsearchPlugin({
      // 选项
    }),
  ],
}
```

## 搜索索引

基于 [`slimsearch`](https://mister-hope.github.io/slimsearch/)，该插件能够提供超快的搜索体验，即使在大型站点上也是如此。

默认情况下，插件只会索引标题、文章摘要以及你配置的自定义字段。如果你希望索引页面的全部内容，需要在插件选项中设置 `indexContent: true`。

如果要防止某个页面被索引，可以在其 Frontmatter 中设置 `search: false`。如果需要通过编程方式过滤页面（例如根据路径排除），可以使用 [`filter` 选项](#filter)。

## 自定义字段

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
import { slimsearchPlugin } from '@vuepress/plugin-slimsearch'

export default {
  plugins: [
    slimsearchPlugin({
      customFields: [
        {
          name: 'author',
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
import { slimsearchPlugin } from '@vuepress/plugin-slimsearch'
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
    slimsearchPlugin({
      customFields: [
        {
          name: 'updateTime',
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

### indexContent

- 类型: `boolean`
- 默认值: `false`

是否启用内容索引。

::: tip

默认情况下，只会索引页面的标题、摘要以及你的自定义字段。如果需要索引页面的正文内容，请将此选项设置为 `true`。

:::

### suggestion

- 类型: `boolean`
- 默认值: `true`

是否在搜索时显示建议。

### customFields

- 类型: `CustomFieldOptions[]`

  ```ts
  interface CustomFieldOptions {
    /**
     * 自定义字段获取器
     */
    getter: (page: Page) => string[] | string | null | undefined

    /**
     * 展示内容
     *
     * @description `$content` 会被 `getter` 返回的内容替换
     *
     * @default `$content`
     */
    formatter?: Record<string, string> | string
  }
  ```

自定义索引字段配置。

### hotKeys

- 类型: `(KeyOptions | string)[]`

  @[code ts](@vuepress/helper/src/shared/key.ts)

- 默认值: `[{ key: "k", ctrl: true }, { key: "/", ctrl: true }]`

指定热键的 [event.key](http://keycode.info/)。

当按下热键时，搜索框输入框将获得焦点。设置为空数组以禁用热键。

### queryHistoryCount

- 类型: `number`
- 默认值: `5`

最大存储的搜索查询历史记录数量，设置为 `0` 以禁用。

### resultHistoryCount

- 类型: `number`
- 默认值: `5`

最大存储的匹配结果历史记录数量，设置为 `0` 以禁用。

### searchDelay

- 类型: `number`
- 默认值: `150`

输入后开始搜索的延迟时间（毫秒）。

::: note

在内容庞大的站点上进行客户端搜索可能会较慢，在这种情况下，你可能需要增加此值，以确保用户在搜索开始前已完成输入。

:::

### filter

- 类型: `(page: Page) => boolean`
- 默认值: `() => true`

用于过滤页面的函数。

### sortStrategy

- 类型: `"max" | "total"`
- 默认值: `"max"`

结果排序策略。

当有多个匹配结果时，结果将按此策略排序。`max` 表示具有更高最大分数的页面将排在前面。`total` 表示具有更高总分数的页面将排在前面。

### worker

- 类型: `string`
- 默认值: `slimsearch.worker.js`

输出 Worker 的文件名。

### hotReload

- 类型: `boolean`
- 默认值: 是否启用了 `--debug` 标志

是否在开发服务器中启用热重载。

::: note

默认情况下它是禁用的，因为对于内容庞大的站点，此功能会对性能产生巨大影响，并在编辑 Markdown 时显著降低热重载速度。

:::

### indexOptions

- 类型: `SlimSearchIndexOptions`

  ```ts
  interface SlimSearchIndexOptions {
    /**
     * 用于对索引字段项进行分词的函数。
     */
    tokenize?: (text: string, fieldName?: string) => string[]
    /**
     * 用于处理或标准化索引字段中词条的函数。
     */
    processTerm?: (term: string) => string[] | string | false | null | undefined
  }
  ```

用于创建索引的选项。

### indexLocaleOptions

- 类型: `Record<string, SlimSearchIndexOptions>`

每个语言环境用于创建索引的选项，对象键应为语言环境路径。

### locales

- 类型: `SlimSearchLocaleConfig`

  ```ts
  interface SlimSearchLocaleData {
    /**
     * 搜索框占位符
     */
    placeholder: string

    /**
     * 搜索文字
     */
    search: string

    /**
     * 清空搜索文字
     */
    clear: string

    /**
     * 移除当前条目
     */
    remove: string

    /**
     * 搜索中文字
     */
    searching: string

    /**
     * 取消文字
     */
    cancel: string

    /**
     * 默认标题
     */
    defaultTitle: string

    /**
     * 选择提示
     */
    select: string

    /**
     * 切换提示
     */
    navigate: string

    /**
     * 自动补全提示
     */
    autocomplete: string

    /**
     * 关闭提示
     */
    exit: string

    /**
     * 加载提示
     */
    loading: string

    /**
     * 搜索查询历史标题
     */
    queryHistory: string

    /**
     * 搜索结果历史标题
     */
    resultHistory: string

    /**
     * 搜索历史为空提示
     */
    emptyHistory: string

    /**
     * 结果为空提示
     */
    emptyResult: string
  }

  interface SlimSearchLocaleConfig {
    [localePath: string]: SlimSearchLocaleData
  }
  ```

搜索插件的多语言配置。

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

## Frontmatter

### search

- 类型: `boolean`
- 默认值: `true`

是否索引该页面。

## 进阶

### 自定义索引生成

你可以通过 `indexOptions` 和 `indexLocaleOptions` 自定义索引生成过程，以便获得更好的索引结果，并可针对每个语言环境单独设置。

目前我们使用 `Intl.Segmenter` API 在构建搜索索引时进行分词。这在大多数语言中效果良好，但为了获得更高的准确性，你可能希望通过 `tokenize` 选项自定义分词过程。

### 使用 API

如果你想访问搜索 API，你需要从 `@vuepress/plugin-slimsearch/client` 导入 `createSearchWorker` 函数：

```ts
import { createSearchWorker } from '@vuepress/plugin-slimsearch/client'
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

自定义 [搜索选项](https://mister-hope.github.io/slimsearch/interfaces/SearchOptions.html)，接受普通对象、Ref 或 Getter 函数作为参数。

由于搜索是在 Web Worker 中完成的，因此不支持直接为 `slimsearch` 设置函数类型的选项。

为了提供更准确的搜索查询、建议和结果，我们提供了 `querySplitter`、`suggestionsFilter` 和 `resultsFilter` 选项。你可以为特定语言或所有语言设置它们：

```ts
interface SearchLocaleOptions extends Omit<
  SearchOptions,
  'boostDocument' | 'fields' | 'filter' | 'processTerm' | 'tokenize'
> {
  /** 分词函数 */
  querySplitter?: (query: string) => Promise<string[]>

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
import { defineSearchConfig } from '@vuepress/plugin-slimsearch/client'

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
