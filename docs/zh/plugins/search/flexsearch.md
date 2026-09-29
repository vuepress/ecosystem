---
icon: search
---

# FlexSearch

<NpmBadge package="@vuepress/plugin-flexsearch" />

一个强大的客户端搜索插件，支持自定义索引和全文搜索，由 [FlexSearch](https://github.com/nextapps-de/flexsearch) 提供支持。

## 使用方法 {#usage}

```bash
npm i -D @vuepress/plugin-flexsearch@next
```

```ts title=".vuepress/config.ts"
import { flexsearchPlugin } from '@vuepress/plugin-flexsearch'

export default {
  plugins: [
    flexsearchPlugin({
      // 选项
    }),
  ],
}
```

## 指南 {#guide}

### 搜索索引 {#search-index}

基于 [FlexSearch](https://github.com/nextapps-de/flexsearch)，该插件能够提供快速的搜索体验，即使在大型站点上也是如此。

默认情况下，插件只会索引标题、文章摘要以及你配置的自定义字段。如果你希望索引页面的全部内容，需要在插件选项中设置 `indexContent: true`。

搜索词中的每个单词都必须能在页面的同一部分——页面标题、某个段落或某个自定义字段——中找到，但这些单词可以分布在该部分的各个字段里，因此「段落标题中的一个词 + 段落正文中的一个词」这样的查询也能匹配。一个单词还会匹配所有以它开头的已索引单词，因此 `vuep` 能匹配 `VuePress`。

如果要防止某个页面被索引，可以在其 Frontmatter 中设置 `search: false`。如果需要通过编程方式过滤页面（例如根据路径排除），可以使用 [`filter` 选项](#filter)。

### 自定义字段 {#custom-fields}

无论你是主题开发者还是普通用户，通过 Frontmatter 或 `extendsPage` 生命周期为页面添加额外数据是很常见的，在大多数情况下，你可能也希望索引这些数据。

`customFields` 选项接受一个数组，每个元素代表一个自定义搜索索引配置项。每个配置项包含两个部分：

- `getter`: 该自定义字段的获取器。这个函数接收 `page` 对象作为参数，并返回需要被索引的值（可以是字符串、字符串数组，或者在缺失时返回 `null`/`undefined`）。
- `formatter`: 控制该条目在搜索结果中如何显示的格式字符串或对象。其中 `$content` 会被替换为 `getter` 返回的实际值。如果你的站点支持多语言，也可以将其设置为对象，以便为每种语言单独设置显示格式。

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
import { flexsearchPlugin } from '@vuepress/plugin-flexsearch'

export default {
  plugins: [
    flexsearchPlugin({
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
import { flexsearchPlugin } from '@vuepress/plugin-flexsearch'
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
    flexsearchPlugin({
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

## 选项 {#options}

:::: fields
@`indexContent` type=boolean

是否索引页面的全部内容。

::: tip

默认情况下，只会索引页面的标题、摘要以及你的自定义字段。如果需要索引页面的正文内容，请将此选项设置为 `true`。

:::

参见：[搜索索引](#search-index)。

@`preserveTags` type=`string[]` default=`[]`

需要在索引时保留内部内容的标签。

默认情况下，索引器只会遍历一组内置的 HTML 标签来提取文本内容，并且会索引诸如 `pre`、`code` 中的代码内容。像 `script`、`style` 这类标签，以及不在这组内置标签中的自定义标签 / 组件，其内部内容会被整体跳过，不会进入索引。

将标签名添加到 `preserveTags`，可以让索引器保留并遍历该标签的子文本，即使该标签本身不在默认的遍历集合中。标签名按小写匹配。

对于一些会将其插槽内容渲染为普通文本的自定义 Vue 组件（如 `<human-only>contents</human-only>`），你可以将其标签名添加到这里，以便在搜索索引中保留其内部内容。

@`suggestion` type=boolean default=`true`

是否在搜索时显示建议。

@`customFields` type=`CustomFieldOptions[]`

自定义索引字段配置。

参见：[自定义字段](#custom-fields)。

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

@`worker` type=string default=`'flexsearch.worker.js'`

输出 Worker 的文件名。

@`hotReload` type=boolean default="同 --debug 标志的状态"

是否在开发服务器中启用热重载。

::: note

默认情况下它是禁用的，因为对于内容庞大的站点，此功能会对性能产生巨大影响。

:::

@`indexOptions` type=FlexSearchIndexOptions

用于创建索引的选项。

参见：[自定义索引生成](#customize-index-generation)。

@@`indexOptions.tokenize` type=`'strict' | 'exact' | 'default' | 'tolerant' | 'forward' | 'reverse' | 'bidirectional' | 'full'` default=`'forward'`

页面的单词如何被索引。`forward` 还会索引一个单词的所有前缀，这正是部分单词能够匹配、以及建议能够生成的原因；而 `strict` 只匹配完整单词，索引体积要小得多。

@@`indexOptions.resolution` type=number default=`9`

内容被划分的评分槽的最大数量。较低的值会减小索引体积，但也会让结果的相关度排序更不精确。

@`indexLocaleOptions` type=`Record<string, FlexSearchIndexOptions>`

每个语言环境用于创建索引的选项，对象键应为语言环境路径。

@`locales` type=`LocaleConfig<SearchLocaleData>`

搜索界面的多语言配置。搜索界面使用的任何文字都可以按语言环境路径覆盖。

参考：[多语言配置](../supported-locales.md)。

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

::: fields
@`search` type=boolean default=`true`

是否索引该页面。

:::

## 进阶 {#advanced}

### 分词 {#tokenization}

每个语言环境的索引都会使用其自身语言的分词器进行分词，语言由该语言环境的 `lang`
检测得到。

单词使用 [`Intl.Segmenter`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter) 分词，因此不以空格分词的语言（中文、日文、韩文、泰文等）会被拆分为单词而不是字符。词条会被转换为小写，带变音符号的字母会被折叠，因此 `VuePress` 能匹配 `vuepress`，`Café` 能匹配 `cafe`。折叠后不是 ASCII 字母的字母会保持不变，因为折叠它们会改变其文本被拆分成单词的方式。

插件启用了前缀搜索，因此一个搜索词也会匹配以它开头的已索引单词，例如 `vuep` 能匹配 `VuePress`。它同时也是建议的生成依据，因此把 [`indexOptions.tokenize`](#indexoptions-tokenize) 设为 `strict` 会同时禁用这两者。

::: note

搜索词中的每个单词都必须能在页面的同一部分中找到，且插件不会移除停用词，因此向搜索词中添加一个非常常见的单词可能会过滤掉相关的页面。

:::

::: warning 浏览器支持

在不支持 `Intl.Segmenter` 的浏览器（Chrome < 87、Edge < 87、Safari < 14.1 与 Firefox < 125）中，不以空格分词的语言的单词会被拆分为单个字符。它们仍会作为前缀被匹配，因此搜索依然可用，但结果可能不完整。以空格分词的语言不受影响。

:::

### 自定义索引生成 {#customize-index-generation}

你可以通过 `indexOptions` 和 `indexLocaleOptions` 自定义索引生成过程，以便获得更好的索引结果，并可针对每个语言环境单独设置。

将 [`tokenize`](#indexoptions-tokenize) 设置为 `strict` 会禁用前缀搜索并只索引完整单词，在包含长单词的站点上可以大幅减小索引体积。

### 使用 API {#using-with-api}

如果你想访问搜索 API，你需要从 `@vuepress/plugin-flexsearch/client` 导入 `createSearchWorker` 函数：

```ts
import { createSearchWorker } from '@vuepress/plugin-flexsearch/client'
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

### 开发服务器中的限制 {#limitations-in-devserver}

搜索服务由 Worker 提供支持，在开发模式下，我们无法像生产环境那样打包 Worker 文件。

为了在开发模式下加载搜索索引，我们使用了 `type: "module"` 的现代 Web Worker。因此，如果你想在 DevServer 中尝试搜索，请确保你使用的浏览器支持该特性（查看 [CanIUse](https://caniuse.com/mdn-api_worker_worker_ecmascript_modules) 了解支持详情）。

为了获得更好的性能，在开发模式下添加/编辑/删除 Markdown 内容默认不会触发搜索索引的更新。如果你正在校对或优化搜索结果，可以通过设置 `hotReload: true` 选项来启用热重载。

### 与服务端搜索对比 {#comparing-with-server-search}

客户端搜索具有无需后端服务且易于添加等优势，但你也应该了解其缺点。

::: warning 缺点

1. **构建时间**：你需要在构建阶段索引你的网站，这会增加网站部署时间和打包体积。
1. **带宽压力**：用户在搜索前需要从你的服务器获取完整的搜索索引，这将给你的服务器带来额外的流量和带宽压力。站点内容越多，搜索索引就越大。
1. **延迟**：要执行搜索，用户必须等待搜索索引下载并在本地解析。这可能比通过简单的网络请求从服务端搜索获取结果要慢得多。
1. **设备性能**：由于搜索是在用户设备上完成的，速度完全取决于设备的性能。

:::

在大多数情况下，如果你正在构建一个大型站点，如果条件允许，应该选择服务提供商为你的站点提供搜索服务（如 [Algolia](https://www.algolia.com/)），或者选择开源的搜索爬虫工具并将其托管在自己的服务器上，以提供搜索服务并定期爬取你的站点。这对于大型站点是必要的，因为用户通过网络请求将搜索词发送到搜索 API 并直接获取搜索结果。

特别地，[DocSearch](https://docsearch.algolia.com/) 是 Algolia 为开源项目提供的免费搜索服务。如果你正在创建开源项目文档或开源技术博客，你可以[申请使用](https://docsearch.algolia.com/apply/)，并使用 [`@vuepress/plugin-docsearch`](./docsearch.md) 插件来提供搜索功能。

## 客户端配置 {#client-config}

### defineSearchConfig

自定义 FlexSearch 的[搜索选项](https://github.com/nextapps-de/flexsearch/blob/master/doc/document-search.md)，接受普通对象、Ref 或 Getter 函数作为参数。

由于搜索是在 Web Worker 中完成的，因此不支持直接为 FlexSearch 设置函数类型的选项。

搜索选项按其所生效的语言环境分组：

```ts
interface SearchLocaleOptions extends WorkerSearchOptions {
  /** 拆分搜索词的函数 */
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

FlexSearch 自身的 `cache` 选项会原样传递给它，而它的 `limit`、`offset` 与 `suggest` 则由插件重新实现，因为插件是分别搜索查询中的各个单词的：

- `limit` 与 `offset` 作用于合并后的结果，而不是每个字段各自的结果。
- `suggest` 会让搜索词的最后一个单词变为可选，因此一个完全无法匹配的查询仍会返回匹配其前面单词的页面。它是「一次搜索」的选项，与插件的 [`suggestion` 选项](#suggestion)无关，后者只控制搜索框是否在输入时显示建议。
- `resolution` 不可用，因为它是一个针对单次搜索的评分选项，而插件使用自己的评分方式。

此外还提供两个选项：

- `properties`: 需要搜索的页面字段。默认为所有字段，也可以设置为 `'*'` 以表示相同的行为。只接受索引中存在的字段（`h`、`t` 与 `c`），因此 `'id'` 会被忽略而不会被搜索。它同时也会限制收集建议时所使用的字段。
- `boost`: 各个字段的相关度权重，默认为 `{ c: 4, h: 2, t: 1 }`。传入的对象会整体替换默认值而不是与它合并，因此传 `{ h: 5 }` 也会把 `c` 的权重从 `4` 降到 `1`，只想改一个字段时需要展开默认值。FlexSearch 不会为其结果评分，因此结果的分数由其命中的各个字段的权重以及它在每个字段中的排名推导而来。

查询在发往工作线程之前会先用客户端配置中的 [`querySplitter`](#definesearchconfig) 进行拆分，因此实际被搜索的单词由它决定。

```ts title=".vuepress/client.ts"
import { defineSearchConfig } from '@vuepress/plugin-flexsearch/client'

defineSearchConfig({
  // 在此处设置全局搜索选项
  properties: ['h', 't'],

  locales: {
    '/zh/': {
      // 为中文设置不同的选项
    },
  },
})
```

## 组件 {#components}

- SearchBox
