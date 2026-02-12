---
url: /plugins/search/slimsearch.md
---
# slimsearch

A powerful client-side search plugin featuring custom indexing and full-text search support.

## Usage

```bash
npm i -D @vuepress/plugin-slimsearch@next
```

```ts title=".vuepress/config.ts"
import { slimsearchPlugin } from '@vuepress/plugin-slimsearch'

export default {
  plugins: [
    slimsearchPlugin({
      // options
    }),
  ],
}
```

## Search Index

Powered by [`slimsearch`](https://mister-hope.github.io/slimsearch/), this plugin provides ultra-fast search capabilities, even for large documentation sites.

By default, the plugin indexes only headings, article excerpts, and any custom fields you configure. If you wish to index the full content of your pages, set `indexContent: true` in the plugin options.

To exclude a specific page from the index, set `search: false` in its frontmatter. For programmatic filtering (e.g., excluding pages based on paths), use the [`filter` option](#filter).

## Custom Fields

Whether you are a theme developer or a user, it is common to attach extra metadata to pages via frontmatter or the `extendsPage` lifecycle hook. You can add this data to the search index using the `customFields` option.

The `customFields` option accepts an array of configuration objects. Each object consists of two parts:

* `getter`: A function that receives the `page` object and returns the value to be indexed. It can return a string, an array of strings, or `null`/`undefined` if the field is missing.
* `formatter`: A string or object defining how the item appears in search results. The placeholder `$content` is replaced by the value returned by the `getter`. If your site supports multiple languages, you can provide an object mapping locale paths to format strings.

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
import { slimsearchPlugin } from '@vuepress/plugin-slimsearch'

export default {
  plugins: [
    slimsearchPlugin({
      customFields: [
        {
          name: 'author',
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
import { slimsearchPlugin } from '@vuepress/plugin-slimsearch'
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

## Options

### indexContent

* Type: `boolean`
* Default: `false`

Whether to enable full content indexing.

::: tip

By default, only page headings, excerpts, and custom fields are indexed. Set this to `true` only if you need to search the entire body text of your pages.

:::

### suggestion

* Type: `boolean`
* Default: `true`

Whether to display search suggestions while typing.

### customFields

* Type: `CustomFieldOptions[]`

  ```ts
  interface CustomFieldOptions {
    /**
     * Custom field getter
     */
    getter: (page: Page) => string[] | string | null | undefined

    /**
     * Display content format
     *
     * @description `$content` will be replaced by the value returned by `getter`
     *
     * @default `$content`
     */
    formatter?: Record<string, string> | string
  }
  ```

Configuration for indexing custom fields.

### hotKeys

* Type: `(KeyOptions | string)[]`

  @[code ts](@vuepress/helper/src/shared/key.ts)

* Default: `[{ key: "k", ctrl: true }, { key: "/", ctrl: true }]`

Specify the [event.key](http://keycode.info/) for hotkeys.

Pressing these keys will focus the search input. Set to an empty array `[]` to disable hotkeys.

### queryHistoryCount

* Type: `number`
* Default: `5`

The maximum number of search query history items to store. Set to `0` to disable.

### resultHistoryCount

* Type: `number`
* Default: `5`

The maximum number of matched result history items to store. Set to `0` to disable.

### searchDelay

* Type: `number`
* Default: `150`

The delay (in milliseconds) before starting a search after input.

::: note

Client-side searching on sites with massive content can be resource-intensive. You may need to increase this value to ensure the user has finished typing before the search triggers.

:::

### filter

* Type: `(page: Page) => boolean`
* Default: `() => true`

A function to filter which pages are included in the index.

### sortStrategy

* Type: `"max" | "total"`
* Default: `"max"`

The strategy used to sort search results.

When multiple results match, this determines the order. `max` places pages with the highest single-match score first. `total` places pages with the highest cumulative score first.

### worker

* Type: `string`
* Default: `slimsearch.worker.js`

The filename for the output Worker script.

### hotReload

* Type: `boolean`
* Default: Same as the `--debug` flag status

Whether to enable hot reloading of the search index in the development server.

::: note

This is disabled by default because rebuilding the index on every file change can severely impact performance on large sites.

:::

### indexOptions

* Type: `SlimSearchIndexOptions`

  ```ts
  interface SlimSearchIndexOptions {
    /**
     * Function to tokenize the index field item.
     */
    tokenize?: (text: string, fieldName?: string) => string[]
    /**
     * Function to process or normalize terms in the index field.
     */
    processTerm?: (term: string) => string[] | string | false | null | undefined
  }
  ```

Options passed to `slimsearch` during index creation.

### indexLocaleOptions

* Type: `Record<string, SlimSearchIndexOptions>`

Options for index creation per locale. The object keys should correspond to the locale path.

### locales

* Type: `SlimSearchLocaleConfig`

  ```ts
  interface SlimSearchLocaleData {
    /**
     * Search box placeholder
     */
    placeholder: string

    /**
     * Search text label
     */
    search: string

    /**
     * Clear search text label
     */
    clear: string

    /**
     * Remove current item label
     */
    remove: string

    /**
     * Searching status text
     */
    searching: string

    /**
     * Cancel text label
     */
    cancel: string

    /**
     * Default title
     */
    defaultTitle: string

    /**
     * Select hint
     */
    select: string

    /**
     * Navigate hint
     */
    navigate: string

    /**
     * Autocomplete hint
     */
    autocomplete: string

    /**
     * Close hint
     */
    exit: string

    /**
     * Loading hint
     */
    loading: string

    /**
     * Search query history title
     */
    queryHistory: string

    /**
     * Search result history title
     */
    resultHistory: string

    /**
     * Empty history hint
     */
    emptyHistory: string

    /**
     * Empty result hint
     */
    emptyResult: string
  }

  interface SlimSearchLocaleConfig {
    [localePath: string]: SlimSearchLocaleData
  }
  ```

Multilingual configuration for the search UI.

::: details Built-in Supported Languages

* **Simplified Chinese** (zh-CN)
* **Traditional Chinese** (zh-TW)
* **English (United States)** (en-US)
* **German** (de-DE)
* **Russian** (ru-RU)
* **Ukrainian** (uk-UA)
* **Vietnamese** (vi-VN)
* **Portuguese** (pt)
* **Polish** (pl-PL)
* **French** (fr-FR)
* **Spanish** (es-ES)
* **Slovak** (sk-SK)
* **Japanese** (ja-JP)
* **Turkish** (tr-TR)
* **Korean** (ko-KR)
* **Finnish** (fi-FI)
* **Indonesian** (id-ID)
* **Dutch** (nl-NL)

:::

## Frontmatter

### search

* Type: `boolean`
* Default: `true`

Whether to include this page in the search index.

## Advanced

### Customize Index Generation

You can customize the index generation process using `indexOptions` and `indexLocaleOptions`. This allows you to fine-tune indexing results globally or for specific locales.

We use the `Intl.Segmenter` API for tokenization (word-splitting) by default. While this works well for most languages, you might want to provide a custom `tokenize` function for specific languages to improve search accuracy.

### Using with API

To access the search functionality programmatically, import the `createSearchWorker` function from `@vuepress/plugin-slimsearch/client`:

```ts
import { createSearchWorker } from '@vuepress/plugin-slimsearch/client'
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
2. **Bandwidth:** Users must download the search index before they can search. The more content you have, the larger the index file, which consumes more bandwidth.
3. **Latency:** Users must wait for the index to be downloaded and parsed locally. This initial load can be slower than a direct API request to a server-side search engine.
4. **Device Performance:** Since the search logic runs on the user's device, speed is dependent on their hardware capabilities.

:::

If you are building a very large site, it is recommended to use a dedicated search service provider like [Algolia](https://www.algolia.com/), or host an open-source search crawler on your own server. This approach is more scalable as users only send search queries over the network rather than downloading the entire dataset.

Notably, [DocSearch](https://docsearch.algolia.com/) is a free service by Algolia for open-source projects. If you maintain open-source documentation or a technical blog, you can [apply for it](https://docsearch.algolia.com/apply/) and use the [`@vuepress/plugin-docsearch`](./docsearch.md) plugin.

## Client Config

### defineSearchConfig

Customize [search options](https://mister-hope.github.io/slimsearch/interfaces/SearchOptions.html). Accepts a plain object, a ref, or a getter function.

Since searching is performed inside a Web Worker, you cannot pass function-typed options directly to `slimsearch`.

However, to provide more accurate queries, suggestions, and results, we expose `querySplitter`, `suggestionsFilter`, and `resultsFilter` options in the client config. You can set these for specific languages or globally:

```ts
interface SearchLocaleOptions extends Omit<
  SearchOptions,
  'boostDocument' | 'fields' | 'filter' | 'processTerm' | 'tokenize'
> {
  /** A function to split words */
  querySplitter?: (query: string) => Promise<string[]>

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
import { defineSearchConfig } from '@vuepress/plugin-slimsearch/client'

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

* SearchBox
