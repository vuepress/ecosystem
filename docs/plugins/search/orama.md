---
icon: search
---

# Orama

<NpmBadge package="@vuepress/plugin-orama" />

A powerful client-side search plugin featuring custom indexing and full-text search support.

## Usage

```bash
npm i -D @vuepress/plugin-orama@next
```

```ts title=".vuepress/config.ts"
import { oramaPlugin } from '@vuepress/plugin-orama'

export default {
  plugins: [
    oramaPlugin({
      // options
    }),
  ],
}
```

## Guide

### Search Index

Powered by [Orama](https://docs.orama.com/docs/orama-js/), this plugin provides fast search capabilities, even for large documentation sites.

By default, the plugin indexes only headings, article excerpts, and any custom fields you configure. If you wish to index the full content of your pages, set `indexContent: true` in the plugin options.

To exclude a specific page from the index, set `search: false` in its frontmatter. For programmatic filtering (e.g., excluding pages based on paths), use the [`filter` option](#filter).

### Custom Fields

Whether you are a theme developer or a user, it is common to attach extra metadata to pages via frontmatter or the `extendsPage` lifecycle hook. You can add this data to the search index using the `customFields` option.

The `customFields` option accepts an array of configuration objects. Each object consists of two parts:

- `getter`: A function that receives the `page` object and returns the value to be indexed. It can return a string, an array of strings, or `null`/`undefined` if the field is missing.
- `formatter`: A string or object defining how the item appears in search results. The placeholder `$content` is replaced by the value returned by the `getter`. If your site supports multiple languages, you can provide an object mapping locale paths to format strings.

::: tip Example: Adding Author to Index

Suppose you define an author in your frontmatter:

```md
---
author: Your name
---

Your Markdown content...
```

You can add this author information to the search index like this:

```ts title=".vuepress/config.ts"
import { oramaPlugin } from '@vuepress/plugin-orama'

export default {
  plugins: [
    oramaPlugin({
      customFields: [
        {
          getter: (page) => page.frontmatter.author,
          formatter: 'Author: $content',
        },
      ],
    }),
  ],
}
```

:::

::: tip Example: Adding Update Time

Suppose you are using the `@vuepress/plugin-git` plugin and host Chinese docs under `/zh/` and English docs under `/`.

You can index the last updated time with locale-specific formatting:

```ts title=".vuepress/config.ts"
import { oramaPlugin } from '@vuepress/plugin-orama'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  // Assuming the following locale config
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

## Options

:::: fields
@`indexContent` type=boolean

Whether to index the full content of pages.

::: tip

By default, only page headings, excerpts, and custom fields are indexed. Set this to `true` only if you need to search the entire body text of your pages.

:::

See also: [Search Index](#search-index).

@`preserveTags` type=`string[]` default=`[]`

Tags whose inner content should be preserved when the surrounding tag would otherwise be skipped by the indexer.

The indexer only traverses a built-in whitelist of standard HTML tags when extracting text content. Unknown or custom tags (including many Vue components) are skipped by default, which also drops their children from the index. Some tags such as `script`, `style`, `pre`, or `code` also have their contents excluded on purpose.

By listing a tag name in `preserveTags`, you tell the indexer to keep and traverse that tag's child text even if the tag itself is not part of the default traversal set. Tag names are matched in lowercase.

For custom Vue components that render slot content by default (like `<human-only>contents</human-only>`), you can add their tag names to this option to preserve their content in the search index.

@`suggestion` type=boolean default=`true`

Whether to display search suggestions while typing.

@`customFields` type=`CustomFieldOptions[]`

Configuration for indexing custom fields.

See also: [Custom Fields](#custom-fields).

@@`customFields[*].getter` type=`(page: Page) => string[] | string | null | undefined` required

A function that receives the `page` object and returns the value to be indexed. It can return a string, an array of strings, or `null`/`undefined` if the field is missing.

@@`customFields[*].formatter` type=`Record<string, string> | string` default=`'$content'`

How the item appears in search results. The placeholder `$content` is replaced by the value returned by the `getter`. If your site supports multiple languages, provide an object mapping locale paths to format strings.

@`hotKeys` type=`(KeyOptions | string)[]` default=`[{ key: 'k', ctrl: true }, { key: '/', ctrl: true }]`

Specify the [event.key](http://keycode.info/) for hotkeys. Pressing these keys will focus the search input. Set to an empty array `[]` to disable hotkeys.

@@`hotKeys[*].key` type=string required

Value of `event.key` to trigger the hot key.

@@`hotKeys[*].ctrl` type=boolean

Whether to press `event.ctrlKey` at the same time.

@@`hotKeys[*].shift` type=boolean

Whether to press `event.shiftKey` at the same time.

@@`hotKeys[*].alt` type=boolean

Whether to press `event.altKey` at the same time.

@@`hotKeys[*].meta` type=boolean

Whether to press `event.metaKey` at the same time.

@`queryHistoryCount` type=number default=`5`

The maximum number of search query history items to store. Set to `0` to disable.

@`resultHistoryCount` type=number default=`5`

The maximum number of matched result history items to store. Set to `0` to disable.

@`searchDelay` type=number default=`150`

The delay (in milliseconds) before starting a search after input.

::: note

Client-side searching on sites with massive content can be resource-intensive. You may need to increase this value to ensure the user has finished typing before the search triggers.

:::

@`suggestDelay` type=number default=`0`

The delay (in milliseconds) before providing auto suggestions after input.

@`filter` type=`(page: Page) => boolean` default=`() => true`

A function to filter which pages are included in the index.

@`sortStrategy` type=`'max' | 'total'` default=`'max'`

The strategy used to sort search results. When multiple results match, `max` places pages with the highest single-match score first, and `total` places pages with the highest cumulative score first.

@`worker` type=string default=`'orama.worker.js'`

The filename for the output Worker script.

@`hotReload` type=boolean default="Same as the --debug flag status"

Whether to enable hot reloading of the search index in the development server.

::: note

It is disabled by default because rebuilding the index on every file change can severely impact performance on large sites.

:::

@`indexOptions` type=OramaIndexOptions

Options passed to Orama during index creation.

See also: [Tokenization](#tokenization), [Customize Index Generation](#customize-index-generation).

@@`indexOptions.tokenizer` type=`(language: string) => Tokenizer`

Custom tokenizer factory. When not provided, an out-of-the-box tokenizer is created for the language of the locale.

::: warning

When you provide a custom `tokenizer`, you must also set the [`querySplitter`](#definesearchconfig) option to split words the same way, otherwise the queries will not match the index.

:::

@`indexLocaleOptions` type=`Record<string, OramaIndexOptions>`

Options for index creation per locale. The object keys should correspond to the locale path.

@`locales` type=`LocaleConfig<SearchLocaleData>`

Multilingual configuration for the search UI. Any text used by the search UI can be overridden per locale path.

::: details Built-in Supported Languages

- **Simplified Chinese** (zh-CN)
- **Traditional Chinese** (zh-TW)
- **English (United States)** (en-US)
- **German** (de-DE)
- **Russian** (ru-RU)
- **Ukrainian** (uk-UA)
- **Vietnamese** (vi-VN)
- **Portuguese** (pt)
- **Polish** (pl-PL)
- **French** (fr-FR)
- **Spanish** (es-ES)
- **Slovak** (sk-SK)
- **Japanese** (ja-JP)
- **Turkish** (tr-TR)
- **Korean** (ko-KR)
- **Finnish** (fi-FI)
- **Indonesian** (id-ID)
- **Dutch** (nl-NL)

:::

@@`locales.<localePath>.placeholder` type=string

Search box placeholder.

@@`locales.<localePath>.search` type=string

Search text label.

@@`locales.<localePath>.clear` type=string

Clear search text label.

@@`locales.<localePath>.remove` type=string

Remove current item label.

@@`locales.<localePath>.searching` type=string

Searching status text.

@@`locales.<localePath>.cancel` type=string

Cancel text label.

@@`locales.<localePath>.defaultTitle` type=string

Default title.

@@`locales.<localePath>.select` type=string

Select hint.

@@`locales.<localePath>.navigate` type=string

Navigate hint.

@@`locales.<localePath>.autocomplete` type=string

Autocomplete hint.

@@`locales.<localePath>.exit` type=string

Close hint.

@@`locales.<localePath>.loading` type=string

Loading hint.

@@`locales.<localePath>.queryHistory` type=string

Search query history title.

@@`locales.<localePath>.resultHistory` type=string

Search result history title.

@@`locales.<localePath>.emptyHistory` type=string

Empty history hint.

@@`locales.<localePath>.emptyResult` type=string

Empty result hint.
::::

## Frontmatter

### search

- Type: `boolean`
- Default: `true`

Whether to include this page in the search index.

## Advanced

### Tokenization

Each locale index is tokenized with the tokenizer of its own language, which is detected from the `lang` of the locale.

The tokenizer is chosen automatically:

- Chinese and Japanese use the official [`@orama/tokenizers`](https://docs.orama.com/docs/orama-js/supported-languages/using-chinese-with-orama) tokenizers, which segment words with `Intl.Segmenter` instead of splitting on whitespace.
- The languages supported by Orama use its built-in tokenizer.
- Any other language falls back to `Intl.Segmenter`.

Tokens are lowercased, [stop-words](https://docs.orama.com/docs/orama-js/text-analysis/stop-words) are removed and diacritics are folded, so that `VuePress` matches `vuepress` and `Café` matches `cafe`.

::: tip

Stop-words are embedded into the search index, so only the languages your site actually uses are shipped to the browser.

:::

::: note

Orama's documentation lists Korean, Polish, Slovak and Vietnamese as supported, but none of its packages actually implement them. These languages fall back to `Intl.Segmenter`, which still splits them into words, but does not remove their stop-words.

:::

::: warning Browser support

Tokenizing the languages that are not separated by whitespace (Chinese, Japanese, Korean, Thai, ...) relies on the [`Intl.Segmenter`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter) API, which is available in Chrome 87+, Edge 87+, Safari 14.1+ and Firefox 125+.

On older browsers the query is split into single characters, which no longer match the words of the index, so **searching those languages returns no result or unrelated results**. Languages separated by whitespace are not affected.

:::

### Customize Index Generation

You can customize the index generation process using `indexOptions` and `indexLocaleOptions`. This allows you to fine-tune indexing results globally or for specific locales.

You can provide a custom `tokenizer` to improve search accuracy for specific languages. When you do, set the [`querySplitter`](#definesearchconfig) option to split words the same way, otherwise the queries will not match the index.

### Using with API

To access the search functionality programmatically, import the `createSearchWorker` function from `@vuepress/plugin-orama/client`:

```ts
import { createSearchWorker } from '@vuepress/plugin-orama/client'
import { defineClientConfig } from 'vuepress/client'

const { all, suggest, search, terminate } = createSearchWorker()

// Suggest terms based on input
suggest('key').then((suggestions) => {
  // Handle search suggestions
})

// Search for content
search('keyword').then((results) => {
  // Handle search results
})

// Get both suggestions and results
all('key').then(({ suggestions, results }) => {
  // Handle suggestions and results
})

// Terminate the worker when no longer needed
terminate()
```

### Limitations in DevServer

The search service runs in a Web Worker. In development mode, we cannot bundle the worker file like in production.

To load search indexes in the dev server, we use a modern Service Worker with `type: "module"`. If you want to test search functionality locally, please ensure your browser supports ES Module Workers (see [CanIUse](https://caniuse.com/mdn-api_worker_worker_ecmascript_modules)).

For performance reasons, adding, editing, or deleting Markdown content will **not** trigger a search index update in development mode by default. If you are refining search results, you can enable hot reloading by setting `hotReload: true`.

### Comparing with Server-Search

Client-side search offers benefits like zero backend dependencies and ease of integration, but it also comes with trade-offs.

::: warning Disadvantages

1. **Build Time:** Indexes are generated during the build, which increases deployment time and the size of the output bundle.
1. **Bandwidth:** Users must download the search index before they can search. The more content you have, the larger the index file, which consumes more bandwidth.
1. **Latency:** Users must wait for the index to be downloaded and parsed locally. This initial load can be slower than a direct API request to a server-side search engine.
1. **Device Performance:** Since the search logic runs on the user's device, speed is dependent on their hardware capabilities.

:::

If you are building a very large site, it is recommended to use a dedicated search service provider like [Algolia](https://www.algolia.com/), or host an open-source search crawler on your own server. This approach is more scalable as users only send search queries over the network rather than downloading the entire dataset.

Notably, [DocSearch](https://docsearch.algolia.com/) is a free service by Algolia for open-source projects. If you maintain open-source documentation or a technical blog, you can [apply for it](https://docsearch.algolia.com/apply/) and use the [`@vuepress/plugin-docsearch`](./docsearch.md) plugin.

## Client Config

### defineSearchConfig

Customize [search options](https://docs.orama.com/docs/orama-js/search/). Accepts a plain object, a ref, or a getter function.

Since searching is performed inside a Web Worker, you cannot pass function-typed options directly to Orama.

However, to provide more accurate queries, suggestions, and results, we expose `querySplitter`, `suggestionsFilter`, and `resultsFilter` options in the client config. You can set these for specific languages or globally:

```ts
interface SearchLocaleOptions extends WorkerSearchOptions {
  /** A function to split words */
  querySplitter?: (query: string, lang: string) => Promise<string[]>

  /** A function to filter suggestions */
  suggestionsFilter?: (
    suggestions: string[],
    query: string,
    locale: string,
    pageData: PageData,
  ) => string[]

  /** A function to filter search results */
  resultsFilter?: (
    results: SearchResult[],
    query: string,
    locale: string,
    pageData: PageData,
  ) => SearchResult[]
}

interface SearchOptions extends SearchLocaleOptions {
  /** Setting different options per locale */
  locales?: Record<string, SearchLocaleOptions>
}

export const defineSearchConfig: (
  options: MaybeRefOrGetter<SearchOptions>,
) => void
```

```ts title=".vuepress/client.ts"
import { defineSearchConfig } from '@vuepress/plugin-orama/client'

defineSearchConfig({
  // global search options here

  locales: {
    '/zh/': {
      // set different options for Chinese
    },
  },
})
```

## Components

- SearchBox
