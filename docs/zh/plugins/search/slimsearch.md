---
icon: search
---

# slimsearch

<NpmBadge package="@vuepress/plugin-slimsearch" />

一个强大的客户端搜索插件，支持自定义索引与全文搜索。

## 使用方法

```bash
npm i -D @vuepress/plugin-slimsearch@next
```

```ts
import { slimsearchPlugin } from '@vuepress/plugin-slimsearch'

export default {
  plugins: [
    slimsearchPlugin({
      // 配置项
    }),
  ],
}
```

## 搜索索引

通过 [`slimsearch`](https://mister-hope.github.io/slimsearch/)，搜索速度极快，即使在大型站点上也是如此。

默认情况下，插件仅索引标题，文章摘要和你添加的自定义字段。如果你想要索引文章的全部内容，你可以通过设置 `indexContent: true` 来开启。

为了阻止页面被索引，你可以在 Frontmatter 中设置 `search: false`。为了程序化地过滤页面，你可以设置 [`filter` 选项](#filter)。

::: important 正确的为每个语言分词

当索引不基于单词的语言时，例如中文、日语或韩语，你需要设置 `indexOptions` 和 `indexLocaleOptions` 以执行正确的分词，详见[自定义索引生成](#自定义索引生成)。

同时为了更好的客户端搜索体验，你应该通过 `defineSearchConfig` 来自定义 `querySplitter` 选项以对输入查询内容进行分词，引入一个 NLP[^nlp] API 是一个不错的选择。

:::

## 自定义索引项

无论是主题开发者还是用户，在 Frontmatter 中或者通过 `extendsPage` 生命周期为页面添加额外数据都是常见的，并且很多情况下你可能希望把这些数据也编入索引。

`customFields` 选项接受一个数组，其中每一项代表一项自定义搜索索引的配置项。每一个配置项包含两个部分:

- `getter`: 该自定义项目的获取器。此函数需要接受 `page` 对象作为参数，并以字符串 (单个)、字符串数组 (多个)、`null` (该项目缺失) 的形式返回该自定义项目的值。
- `formatter`: 一个字符串控制项目该如何在自定义搜索结果中显示，其中 `$content` 会替换成 `getter` 返回的项目值。如果你在使用多语言，你还可以将其设置为对象，以分别设置每一个语言的显示格式。

::: tip 案例：在索引中添加作者

假定你在 Frontmatter 中通过 `author` 添加作者:

```md
---
author: 你的名字
---

Markdown 内容...
```

你可以通过如下配置将作者添加到索引中:

```ts
import { slimsearchPlugin } from '@vuepress/plugin-slimsearch'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  plugins: [
    slimsearchPlugin({
      customFields: [
        {
          name: 'author',
          getter: (page) => page.frontmatter.author,
          formatter: '作者：$content',
        },
      ],
    }),
  ],
})
```

:::

::: tip 案例：添加更新时间

假设你在使用 `@vuepress/plugin-git` 插件并且在 `/zh/` 和 `/` 下分别放置了中文和英文文档。

你需要进行如下配置来索引更新时间：

```ts
import { slimsearchPlugin } from '@vuepress/plugin-slimsearch'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  // 我们假定你在使用如下多语言
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

## 配置项

### indexContent

- 类型: `boolean`
- 默认值: `false`

是否索引内容。

::: tip

默认情况下，插件只会索引页面的标题和摘要以及你的自定义索引项。如果需要索引页面的正文内容，将该选项设置为 `true`。

:::

### suggestion

- 类型: `boolean`
- 默认值: `false`

是否自动提示搜索建议。

### customFields

- 类型: `CustomFieldOptions[]`

  ```ts
  interface CustomFieldOptions {
    /**
     * 自定义项目的获取器
     */
    getter: (page: Page) => string[] | string | null | undefined

    /**
     * 展示的内容
     *
     * @description `$content` 会被 `getter` 返回的内容替换
     *
     * @default `$content`
     */
    formatter?: Record<string, string> | string
  }
  ```

- 必填: 否

自定义搜索索引项。

### hotKeys

- 类型: `(KeyOptions | string)[]`

  @[code ts](@vuepress/helper/src/shared/key.ts)

- 默认值: `[{ key: "k", ctrl: true }, { key: "/", ctrl: true }]`

指定热键的 [event.key](http://keycode.info/)。

当热键被按下时，搜索框的输入框会被聚焦，设置为空数组以禁用热键。

### queryHistoryCount

- 类型: `number`
- 默认值: `5`

存储搜索查询词历史的最大数量，可以设置为 `0` 以禁用。

### resultHistoryCount

- 类型: `number`
- 默认值: `5`

存储搜索结果历史的最大数量，可以设置为 `0` 以禁用。

### searchDelay

- 类型: `number`
- 默认值: `150`

结束输入到开始搜索的延时

::: note

有大量内容时，进行客户端搜索可能会很慢，在这种情况下你可能需要增加此值来确保开始搜索时用户已完成输入。

:::

### filter

- 类型: `(page: Page) => boolean`
- 默认值: `() => true`

用于过滤页面的函数。

### sortStrategy

- 类型: `"max" | "total"`
- 默认值: `"max"`

结果排序策略

当有多个匹配的结果时，会按照策略对结果进行排序。`max` 表示最高分更高的页面会排在前面。`total` 表示总分更高的页面会排在前面。

### worker

- 类型: `string`
- 默认值: `slimsearch.worker.js`

输出的 Worker 文件名称

### hotReload

- 类型: `boolean`
- 默认值: 是否使用 `--debug` 标记

是否在开发服务器中启用实时热重载。

::: note

它是默认禁用的，因为此功能会对内容巨大的站点产生极大性能影响，并且在编辑 Markdown 时剧烈增加热重载的速度。

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
     * 用于处理或规范索引字段中的术语的函数。
     */
    processTerm?: (term: string) => string[] | string | false | null | undefined
  }
  ```

- 必填: 否

创建索引选项。

### indexLocaleOptions

- 类型: `Record<string, SlimSearchIndexOptions>`
- 必填: 否

分语言的创建索引选项，键为语言路径。

### locales

- 类型: `SlimSearchLocaleConfig`

  ```ts
  interface SlimSearchLocaleData {
    /**
     * 搜索框占位符文字
     */
    placeholder: string

    /**
     * 搜索文字
     */
    search: string

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
     * 选择提示
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
     * 搜索文字历史 标题
     */
    queryHistory: string

    /**
     * 搜索结果历史 标题
     */
    resultHistory: string

    /**
     * 无搜索历史提示
     */
    emptyHistory: string

    /**
     * 无结果提示
     */
    emptyResult: string
  }

  interface SlimSearchLocaleConfig {
    [localePath: string]: Partial<SlimSearchLocaleData>
  }
  ```

- 必填: 否

搜索插件的多语言配置。

::: details 内置支持语言

- **简体中文** (zh-CN)
- **繁体中文** (zh-TW)
- **英文(美国)** (en-US)
- **德语** (de-DE)
- **俄语** (ru-RU)
- **乌克兰语** (uk-UA)
- **越南语** (vi-VN)
- **葡萄牙语(巴西)** (pt-BR)
- **波兰语** (pl-PL)
- **法语** (fr-FR)
- **西班牙语** (es-ES)
- **斯洛伐克** (sk-SK)
- **日语** (ja-JP)
- **土耳其语** (tr-TR)
- **韩语** (ko-KR)
- **芬兰语** (fi-FI)
- **印尼语** (id-ID)
- **荷兰语** (nl-NL)

:::

## Frontmatter

### search

- 类型：`boolean`
- 默认值：`true`

是否索引该页面。

## 高级

### 自定义索引生成

如果你正在索引其他不使用“单词”的语言，如中文、日语或韩语，你应该设置 `indexOptions` 和 `indexLocaleOptions` 以执行正确的分词。

如果你正在构建中文文档，则可以使用 [nodejs-jieba](https://github.com/Mister-Hope/nodejs-jieba) 进行分词。 (日语和韩语没有内置词典，但你可以提供自己的词典，并使用 `nodejs-jieba` 拆分单词)。

如果你的文档只包含中文，你可以像这样对内容进行标记：

```ts
import { slimsearchPlugin } from '@vuepress/plugin-slimsearch'
import { cut } from 'nodejs-jieba'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  lang: 'zh-CN',

  plugins: [
    slimsearchPlugin({
      // 索引全部内容
      indexContent: true,
      indexOptions: {
        // 使用 nodejs-jieba 进行分词
        tokenize: (text, fieldName) =>
          fieldName === 'id' ? [text] : cut(text, true),
      },
    }),
  ],
})
```

如果你需要在某些语言环境中进行分词，你可以设置 `indexLocaleOptions`:

```ts
import { slimsearchPlugin } from '@vuepress/plugin-slimsearch'
import { cut } from 'nodejs-jieba'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
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
      indexContent: true,
      indexLocaleOptions: {
        '/zh/': {
          // 使用 nodejs-jieba 进行分词
          tokenize: (text, fieldName) =>
            fieldName === 'id' ? [text] : cut(text, true),
        },
      },
    }),
  ],
})
```

::: tip

特别提示，我们没有办法在浏览器中使用分词功能，所以任何不基于单词的语言（如中文）的长文本搜索结果会明显表现不佳。

:::

### 通过 API 使用

如果你想要访问搜索 API，你可以从 `@vuepress/plugin-slimsearch/client` 中导入 `createSearchWorker` 来获取搜索结果:

```ts
import { createSearchWorker } from 'vuepress-plugin-search-pro/client'

const { all, suggest, search, terminate } = createSearchWorker()

// 自动建议
suggest('key').then((suggestions) => {
  // 显示建议
})

// 搜索
search('keyword').then((results) => {
  // 显示搜索结果
})

// 同时返回建议和搜索结果
all('key').then(({ suggestions, results }) => {
  // 显示建议和搜索结果
})

// 当不需要时终止 Worker
terminate()
```

### 开发服务器中的限制

搜索服务由 Worker 提供支持，在开发模式下我们无法捆绑 Worker 文件。

为了在开发模式下加载搜索索引，我们使用了带有 `type: "module"` 的现代 Worker。因此，如果你想尝试在开发服务器中搜索，你应该使用支持的浏览器，请参阅 [CanIUse](https://caniuse.com/mdn-api_worker_worker_ecmascript_modules) 了解支持详情。

为了更好的性能，在开发模式下添加/编辑/删除 Markdown 内容不会触发搜索索引的更新。如果你正在校对或优化你的搜索结果，你可以通过设置 `hotReload: true` 选项来启用热重载。

### 与服务端搜索比较

客户端搜索有优点，比如没有后台服务，容易添加，但你应该知道它也有缺点。

::: warning 缺点

1. 你需要在构建阶段为你的网站建立索引，这会增长网站部署时间与网站的构建体积。
1. 用户在搜索前需要从你的服务器拉取整个索引，会为你的网站服务器带来额外的流量与带宽压力。这通常比在服务端搜索下执行一个网络请求获得结果要慢得多。
1. 为了进行一次搜索，用户必须等待搜索索引下载并在本地解析完毕。这会为用户消耗不必要的流量、同时增加客户端耗电。
1. 由于搜索是在用户设备上执行的，速度完全取决于设备性能。

:::

在大多数情况，如果你在构建一个大型站点，你应该选择服务提供商为你的站点提供搜索服务，例如 [Algolia](https://www.algolia.com/)，或者选择开源工具在自己的服务器上加载搜索服务并定期为自己的网站生成索引。对于大型站点这很必要因为用户通过网络请求向搜索 API 发送搜索字词，并直接得到搜索结果。

特别提示，[DocSearch](https://docsearch.algolia.com/) 是 Algolia 为开源项目提供的免费搜索服务。如果你在创建开源项目文档或开源技术博客，你可 [申请它](https://docsearch.algolia.com/apply/)，并使用 [`@vuepress/plugin-docsearch`](./docsearch.md) 插件提供搜索。

## 客户端配置

### defineSearchConfig

自定义 [搜索选项](https://mister-hope.github.io/slimsearch/interfaces/SearchOptions.html)，接受普通对象，Ref 或 Getter。

由于搜索是在 Web Worker 中完成的，因此不支持 `slimsearch` 中需要被设置为函数的选项。

为了提供更准确的搜索查询、建议和结果，我们额外提供了 `querySplitter` `suggestionsFilter` 和 `resultsFilter` 选项，你可以为特定或所有语言设定它们：

```ts
interface SearchLocaleOptions
  extends Omit<
    SearchOptions,
    'boostDocument' | 'fields' | 'filter' | 'processTerm' | 'tokenize'
  > {
  /** 分词器 */
  querySplitter?: (query: string) => Promise<string[]>

  /** 过滤建议 */
  suggestionsFilter?: (
    suggestions: string[],
    query: string,
    locale: string,
    pageData: PageData,
  ) => string[]

  /** 过滤结果 */
  resultsFilter?: (
    results: SearchResult[],
    query: string,
    locale: string,
    pageData: PageData,
  ) => SearchResult[]
}

interface SearchOptions extends SearchLocaleOptions {
  /** 基于每个语言来设置选项 */
  locales?: Record<string, SearchLocaleOptions>
}

export const defineSearchConfig: (
  options: MaybeRefOrGetter<SearchOptions>,
) => void
```

```ts title=".vuepress/client.ts"
import { defineSearchConfig } from '@vuepress/plugin-slimsearch/client'

defineSearchConfig({
  // 此处放置搜索选项

  locales: {
    '/zh/': {
      // 为特定语言设置搜索选项
    },
  },
})

export default {}
```

## 组件

- SearchBox

[^nlp]: **N**atural **L**anguage **P**rocessing 自然语言处理
