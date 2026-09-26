---
icon: https://docsearch.algolia.com/img/favicon.ico
---

# docsearch

<NpmBadge package="@vuepress/plugin-docsearch" />

Integrate [Algolia DocSearch](https://docsearch.algolia.com/) into VuePress to provide a full-text search experience for your documentation site.

## Usage

```bash
npm i -D @vuepress/plugin-docsearch@next
```

```ts title=".vuepress/config.ts"
import { docsearchPlugin } from '@vuepress/plugin-docsearch'

export default {
  plugins: [
    docsearchPlugin({
      // options
    }),
  ],
}
```

## Guide

### Get Search Index

Before using this plugin, you need to prepare your search index. There are two ways to achieve this:

1. **Join the Official Program:**

   [Submit your site URL](https://docsearch.algolia.com/apply/) to the DocSearch program. Once your site is indexed, the DocSearch team will send the [apiKey](#apikey) and name of [indices](#indices) to your email. You can then configure this plugin with those credentials.

2. **Run Your Own Crawler:**
   You can [run your own crawler](https://docsearch.algolia.com/docs/run-your-own/) to generate the index. In this case, you will use your own [appId](#appid), [apiKey](#apikey), and name of [indices](#indices) to configure the plugin.

::: details Official crawler config

```js{35-50,59}
new Crawler({
  appId: 'YOUR_APP_ID',
  apiKey: 'YOUR_API_KEY',
  rateLimit: 8,
  startUrls: [
    // These are urls which Algolia starts to crawl
    // If your site is divided into multiple parts,
    // you may want to set multiple entry links
    'https://YOUR_WEBSITE_URL/',
  ],
  sitemaps: [
    // if you are using sitemap plugins (e.g.: @vuepress-plugin/sitemap), you may provide one
    'https://YOUR_WEBSITE_URL/sitemap.xml',
  ],
  ignoreCanonicalTo: false,
  exclusionPatterns: [
    // You can use this to stop algolia crawing some paths
  ],
  discoveryPatterns: [
    // These are urls which Algolia is looking for,
    'https://YOUR_WEBSITE_URL/**',
  ],
  // Crawler schedule, set it according to your docs update frequency
  schedule: 'at 02:00 every 1 day',
  actions: [
    // you may have multiple actions, especially when you are deploying multiple docs under one domain
    {
      // name the index with name you like
      indexName: 'YOUR_INDEX_NAME',
      // paths where the index take effect
      pathsToMatch: ['https://YOUR_WEBSITE_URL/**'],
      // controls how algolia extracts records from your site
      recordExtractor: ({ $, helpers }) => {
        // options for @vuepress/theme-default
        return helpers.docsearch({
          recordProps: {
            lvl0: {
              selectors: '.vp-sidebar-heading.active',
              defaultValue: 'Documentation',
            },
            lvl1: '[vp-content] h1',
            lvl2: '[vp-content] h2',
            lvl3: '[vp-content] h3',
            lvl4: '[vp-content] h4',
            lvl5: '[vp-content] h5',
            lvl6: '[vp-content] h6',
            content: '[vp-content] p, [vp-content] li',
          },
          indexHeadings: true,
        })
      },
    },
  ],
  initialIndexSettings: {
    // controls how indexes are initialized
    // only has effects before index are initialize
    // you may need to delete your index and recraw after modification
    YOUR_INDEX_NAME: {
      attributesForFaceting: ['type', 'lang'],
      attributesToRetrieve: ['hierarchy', 'content', 'anchor', 'url'],
      attributesToHighlight: ['hierarchy', 'hierarchy_camel', 'content'],
      attributesToSnippet: ['content:10'],
      camelCaseAttributes: ['hierarchy', 'hierarchy_radio', 'content'],
      searchableAttributes: [
        'unordered(hierarchy_radio_camel.lvl0)',
        'unordered(hierarchy_radio.lvl0)',
        'unordered(hierarchy_radio_camel.lvl1)',
        'unordered(hierarchy_radio.lvl1)',
        'unordered(hierarchy_radio_camel.lvl2)',
        'unordered(hierarchy_radio.lvl2)',
        'unordered(hierarchy_radio_camel.lvl3)',
        'unordered(hierarchy_radio.lvl3)',
        'unordered(hierarchy_radio_camel.lvl4)',
        'unordered(hierarchy_radio.lvl4)',
        'unordered(hierarchy_radio_camel.lvl5)',
        'unordered(hierarchy_radio.lvl5)',
        'unordered(hierarchy_radio_camel.lvl6)',
        'unordered(hierarchy_radio.lvl6)',
        'unordered(hierarchy_camel.lvl0)',
        'unordered(hierarchy.lvl0)',
        'unordered(hierarchy_camel.lvl1)',
        'unordered(hierarchy.lvl1)',
        'unordered(hierarchy_camel.lvl2)',
        'unordered(hierarchy.lvl2)',
        'unordered(hierarchy_camel.lvl3)',
        'unordered(hierarchy.lvl3)',
        'unordered(hierarchy_camel.lvl4)',
        'unordered(hierarchy.lvl4)',
        'unordered(hierarchy_camel.lvl5)',
        'unordered(hierarchy.lvl5)',
        'unordered(hierarchy_camel.lvl6)',
        'unordered(hierarchy.lvl6)',
        'content',
      ],
      distinct: true,
      attributeForDistinct: 'url',
      customRanking: [
        'desc(weight.pageRank)',
        'desc(weight.level)',
        'asc(weight.position)',
      ],
      ranking: [
        'words',
        'filters',
        'typo',
        'attribute',
        'proximity',
        'exact',
        'custom',
      ],
      highlightPreTag: '<span class="algolia-docsearch-suggestion--highlight">',
      highlightPostTag: '</span>',
      minWordSizefor1Typo: 3,
      minWordSizefor2Typos: 7,
      allowTyposOnNumericTokens: false,
      minProximity: 1,
      ignorePlurals: true,
      advancedSyntax: true,
      attributeCriteriaComputedByMinProximity: true,
      removeWordsIfNoResults: 'allOptional',
    },
  },
})
```

The `recordProps` above is configured for the default theme. You may need to adjust the selectors to match your custom theme structure.

**Note:** The `initialIndexSettings.YOUR_INDEX_NAME.attributesForFaceting` field must include `'lang'` for this plugin to function correctly with multi-language support.
:::

::: tip
If you are not using the default theme or encounter issues with search results, check the crawler configuration above. You can go to the [Algolia Crawler](https://crawler.algolia.com/admin/crawlers/), and use the 'Editor' panel in the project sidebar to debug and modify your config.
:::

## Options

::: fields
@appId@ type=string required

The Application ID of your Algolia application.

See also: [DocSearch > Options > appId](https://docsearch.algolia.com/docs/api#appid).

@apiKey@ type=string required

The Search API Key provided by the DocSearch team or generated in your Algolia dashboard.

See also: [DocSearch > Options > apiKey](https://docsearch.algolia.com/docs/api#apikey).

@indices@ type=`Array<string | DocSearchIndex>` required

A list of indices to use for keyword search. You can also provide optional `searchParameters` for each index.

See also: [DocSearch > Options > indices](https://docsearch.algolia.com/docs/api#indices).

@placeholder@ type=string default=`'Search docs'`

The placeholder text displayed in the search input field.

@disableUserPersonalization@ type=boolean

Whether to disable personalized features, such as recent searches and favorite searches.

@initialQuery@ type=string

The initial search query to pre-fill when the modal opens.

@maxResultsPerGroup@ type=number default=`5`

The maximum number of search results to display per group (e.g., per hierarchy level).

@translations@ type=`Partial<DocSearchTranslations>`

Allows you to override the default text and labels used in the DocSearch button or modal.

@locales@ type=`LocaleConfig<DocSearchLocaleOptions>`

Configuration for different locales. Every option above can be overridden for a specific locale path.

```ts title=".vuepress/config.ts"
export default {
  plugins: [
    docsearchPlugin({
      appId: '<APP_ID>',
      apiKey: '<API_KEY>',
      indexName: '<INDEX_NAME>',
      locales: {
        '/': {
          placeholder: 'Search Documentation',
          translations: {
            button: {
              buttonText: 'Search Documentation',
            },
          },
        },
        '/zh/': {
          placeholder: '搜索文档',
          translations: {
            button: {
              buttonText: '搜索文档',
            },
          },
        },
      },
    }),
  ],
}
```

See also: [Guide > I18n](https://vuejs.press/guide/i18n.html).

@indexBase@ type=string default="The site base"

The base path of the site that generated the search index.

This is useful if you deploy your documentation to multiple domains (e.g., different versions or mirrors) but want to share a single search index. You don't need to crawl every deployment. Instead, designate one domain as the **index domain**, let Algolia crawl it, and reuse that index across all deployments.

If the [base](https://vuejs.press/reference/config.html#base) paths differ between the index domain and other deployments, set this option to the `base` of the index domain. This ensures that search result links are generated correctly for the current site.

@injectStyles@ type=boolean default=`true`

Whether to inject the default DocSearch styles.

If the default styles conflict with your theme or you want to fully customize the appearance, you can set this to `false`.

**Note:** When disabled, you are responsible for importing your own styles. Customizations made via CSS variables in the [Styles](#styles) section will no longer apply.

:::

## Client Config

### defineDocSearchConfig

```ts
type DocSearchClientLocaleOptions = Partial<DocSearchProps>

interface DocSearchClientOptions extends DocSearchClientLocaleOptions {
  locales?: Record<string, DocSearchClientLocaleOptions>
}

const defineDocSearchConfig: (
  options: MaybeRefOrGetter<DocSearchClientOptions>,
) => void
```

Customize DocSearch client options. Accepts a plain object, a ref, or a getter.

::: warning

To support VuePress routing and optimizations, the internal configuration handles `transformItems`, `hitComponent`, `navigator`, and `transformSearchClient`. Overriding these options directly may break the search functionality or navigation.

If you must customize them, please review the [internal implementation](https://github.com/vuepress/ecosystem/blob/main/plugins/search/plugin-docsearch/src/client/composables/useDocSearchSlim.ts) first to ensure compatibility.

:::

## Styles

You can customize the appearance using CSS variables provided by [@docsearch/css](https://docsearch.algolia.com/docs/styling).

The plugin overrides some variables to match the VuePress default theme styles.

## Components

- SearchBox
