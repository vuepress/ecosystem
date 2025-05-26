---
url: /plugins/search/slimsearch.md
---
# slimsearch

A powerful client-side search plugin with custom indexing and full-text search support.

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

With [`slimsearch`](https://mister-hope.github.io/slimsearch/), searching is ultra fast, even on large sites.

By default, the plugin will only index headings, article excerpt and custom fields you add. If you want to index all content, you should set `indexContent: true` in the plugin options.

To prevent a page from being indexed, you can set `search: false` in it's frontmatter. TO programmatically filter pages, you can set [`filter` option](#filter).

::: important Tokenize every language correctly

When indexing languages that is not word based, like Chinese, Japanese or Korean, you should set `indexOptions` and `indexLocaleOptions` to perform correct word-splitting, see [Customize Index Generation](#customize-index-generation).

Meanwhile, for better client search experience, you should customize the `querySplitter` option to split the input query through `defineSearchConfig`, introducing a NLP\[^nlp] API could be a good choice.

:::

## Custom Fields

Whether you are a theme developer or a user, adding extra data for a page through page frontmatter or the `extendsPage` lifecycle is common, and in most cases you may want to index these data as well.

The `customFields` options accepts an array, each element represents a custom search index configuration item. Each configuration item contains 2 parts:

* `getter`: The getter for this custom field. This function takes `page` object as a parameter and returns the value of the custom field as a string (single), an array of strings (multiple), `null` (the item is missing).
* `formatter`: a string controlling how the item is displayed in the custom search result, where `$content` is replaced with the actual value returned by `getter`. If you're using multiple languages, you can also set it as an object to set the display format for each language individually.

These data will be added to indexes and the search result will contain them.

::: tip Example: Adding author to index

Assuming you add author information via `author` in frontmatter:

```md
---
author: Your name
---

Your Markdown content...
```

You can add author information to the index by setting:

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

Supposed you are using the `@vuepress/plugin-git` plugin and you are putting Chinese and English docs under `/zh/` and `/` respectively.

Then you can set the following to index the update time:

```ts title=".vuepress/config.ts"
import { slimsearchPlugin } from '@vuepress/plugin-slimsearch'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  // We assume you are using the following multilingual
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

Whether to enable content indexing.

::: tip

By default, only headings and excerpt of the page will be indexed along with your custom fields. If you need to index the content of the page, set this option to `true`

:::

### suggestion

* Type: `boolean`
* Default: `true`

Whether to show suggestions while searching.

### customFields

* Type: `CustomFieldOptions[]`

  ```ts
  interface CustomFieldOptions {
    /**
     * Custom field getter
     */
    getter: (page: Page) => string[] | string | null | undefined

    /**
     * Display content
     *
     * @description `$content` will be replaced by the content returned by `getter`
     *
     * @default `$content`
     */
    formatter?: Record<string, string> | string
  }
  ```

* Required: No

Customize index fields.

### hotKeys

* Type: `(KeyOptions | string)[]`

  @[code ts](@vuepress/helper/src/shared/key.ts)

* Default: `[{ key: "k", ctrl: true }, { key: "/", ctrl: true }]`

Specify the [event.key](http://keycode.info/) of the hotkeys.

When hotkeys are pressed, the search box input will be focused. Set to an empty array to disable hotkeys.

### queryHistoryCount

* Type: `number`
* Default: `5`

Max stored query history count, set `0` to disable it.

### resultHistoryCount

* Type: `number`
* Default: `5`

Max stored matched result history count, set `0` to disable it.

### searchDelay

* Type: `number`
* Default: `150`

Delay to start searching after input.

::: note

Performing client search with huge contents could be slow, so under this case you might need to increase this value to ensure user finish input before searching.

:::

### filter

* Type: `(page: Page) => boolean`
* Default: `() => true`

Function used to filter pages.

### sortStrategy

* Type: `"max" | "total"`
* Default: `"max"`

Result Sort strategy.

When there are multiple matched results, the result will be sorted by the strategy. `max` means that page having higher total score will be placed in front. `total` means that page having higher max score will be placed in front.

### worker

* Type: `string`
* Default: `slimsearch.worker.js`

Output Worker filename

### hotReload

* Type: `boolean`
* Default: Whether using `--debug` flag

Whether to enable hot reload in the development server.

::: note

It is disabled by default because this feature can have a huge performance impact on sites with huge content and drastically increases the speed of hot reloads when editing Markdown.

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

* Required: No

Options used to create index.

### indexLocaleOptions

* Type: `Record<string, SlimSearchIndexOptions>`
* Required: No

Options used to create index per locale, the object keys should be the locale path.

### locales

* Type: `SlimSearchLocaleConfig`

  ```ts
  interface SlimSearchLocaleData {
    /**
     * Search box placeholder
     */
    placeholder: string

    /**
     * Search text
     */
    search: string

    /**
     * Clear search text
     */
    clear: string

    /**
     * Remove current item
     */
    remove: string

    /**
     * Searching text
     */
    searching: string

    /**
     * Cancel text
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
     * Choose hint
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
     * Search history empty hint
     */
    emptyHistory: string

    /**
     * Empty hint
     */
    emptyResult: string
  }

  interface SlimSearchLocaleConfig {
    [localePath: string]: SlimSearchLocaleData
  }
  ```

* Required: No

Multilingual configuration of the search plugin.

::: details Built-in Supported Languages

* **Simplified Chinese** (zh-CN)
* **Traditional Chinese** (zh-TW)
* **English (United States)** (en-US)
* **German** (de-DE)
* **Russian** (ru-RU)
* **Ukrainian** (uk-UA)
* **Vietnamese** (vi-VN)
* **Portuguese (Brazil)** (pt-BR)
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

Whether to index this page.

## Advanced

### Customize Index Generation

If you are indexing other language which is not using "Words", like Chinese, Japanese or Korean, you should set `indexOptions` and `indexLocaleOptions` to perform correct word-splitting.

If you are building a Chinese docs, you can use [nodejs-jieba](https://github.com/Mister-Hope/nodejs-jieba) to perform word splitting. (Japanese and Korean do not have built-in dictionary, but you can provide your own dictionary and split words with `nodejs-jieba`).

If your docs only contain Chinese, you can tokenize the content like this:

```ts title=".vuepress/config.ts"
import { slimsearchPlugin } from '@vuepress/plugin-slimsearch'
import { cut } from 'nodejs-jieba'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  lang: 'zh-CN',

  plugins: [
    slimsearchPlugin({
      // index all content
      indexContent: true,
      indexOptions: {
        // tokenize the content with nodejs-jieba
        tokenize: (text, fieldName) =>
          fieldName === 'id' ? [text] : cut(text, true),
      },
    }),
  ],
})
```

If you need word splitting in some locales, you can set `indexLocaleOptions`:

```ts title=".vuepress/config.ts"
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
          // tokenize the content with nodejs-jieba
          tokenize: (text, fieldName) =>
            fieldName === 'id' ? [text] : cut(text, true),
        },
      },
    }),
  ],
})
```

### Using with API

If you want to access the search API, you need to import the `createSearchWorker` function from `@vuepress/plugin-slimsearch/client`:

```ts
import { createSearchWorker } from '@vuepress/plugin-slimsearch/client'
import { defineClientConfig } from 'vuepress/client'

const { all, suggest, search, terminate } = createSearchWorker()

// suggest something
suggest('key').then((suggestions) => {
  // display search suggestions
})

// search something
search('keyword').then((results) => {
  // display search results
})

// return both suggestions and results
all('key').then(({ suggestions, results }) => {
  // display search suggestions and results
})

// terminate the worker when you don't need it
terminate()
```

### Limitations in DevServer

The search service is powered by a worker, and in dev mode we cannot bundle the worker file.

In order to load search indexes in dev mode, we are using a modern service worker with `type: "module"`, so if you want to try searching in devServer, you should use a supported browser, see [CanIUse](https://caniuse.com/mdn-api_worker_worker_ecmascript_modules) for support details.

For better performance, adding/editing/deleting markdown contents will not trigger update for search index in dev mode. If you are proofreading or refining your search results, you can enable hot reloading by setting the `hotReload: true` option.

### Comparing with Server-Search

Client-side search has advantages, like no backend services and easy to add, but you should be aware that it has disadvantages.

::: warning Disadvantages

1. You need to index your website during the build stage, which increases website deployment time and website bundle size.
2. Users need to fetch the entire search index from your server before searching, which will bring additional traffic and bandwidth pressure to your server. The more content you hold on your site, the larger search index will be.
3. To perform a search, users must wait for the search index to be downloaded and parsed locally. This may be much slower than performing a simple web request to get results via Server-search.
4. Since searching is done on users devices, the speed is totally based on device performance.

:::

In most cases, if you are building a large site, you should choose a service provider to provide search services for your site if possible, such as [Algolia](https://www.algolia.com/), or choose an open source search crawler tool and host it on your own server to provide a search service and regularly craw your site. This is necessary for large sites because users send search terms to the search API via network requests and get search results directly.

In particular, [DocSearch](https://docsearch.algolia.com/) is a free search service provided by Algolia for open source projects. If you are creating open source project documentation or an open source technical blog, you can [apply for it](https://docsearch.algolia.com/apply/), and use [`@vuepress/plugin-docsearch`](./docsearch.md) plugin to provide search features.

## Client Config

### defineSearchConfig

Customize [search options](https://mister-hope.github.io/slimsearch/interfaces/SearchOptions.html), accepts plain object, ref or getter functions as parameters.

Since searching is done in a Web Worker, setting function-typed options for `slimsearch` is not supported.

For more accurate search queries, suggestions, and results, we provide `querySplitter`, `suggestionsFilter`, and `resultsFilter` options. You can set them for specific or all languages:

```ts
interface SearchLocaleOptions
  extends Omit<
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
  // search options here

  locales: {
    '/zh/': {
      // set different options for Chinese
    },
  },
})
```

## Components

* SearchBox

\[^nlp]: **N**atural **L**anguage **P**rocessing
