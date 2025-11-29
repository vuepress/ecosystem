---
icon: https://docsearch.algolia.com/img/favicon.ico
---

# docsearch

<NpmBadge package="@vuepress/plugin-docsearch" />

将 [Algolia DocSearch](https://docsearch.algolia.com/) 集成到 VuePress 中，为你的文档站点提供全文搜索功能。

## Usage

```bash
npm i -D @vuepress/plugin-docsearch@next
```

```ts title=".vuepress/config.ts"
import { docsearchPlugin } from '@vuepress/plugin-docsearch'

export default {
  plugins: [
    docsearchPlugin({
      // 选项
    }),
  ],
}
```

## 获取搜索索引

在使用此插件之前，你需要准备好搜索索引。主要有两种方式：

1. **加入官方 DocSearch 计划：**
   [提交你的站点 URL](https://docsearch.algolia.com/apply/) 以加入 DocSearch 计划。一旦索引生成完毕，DocSearch 团队会将 [apiKey](#apikey) 和 [indices](#indices) 名称发送到你的邮箱。随后你可以使用这些信息来配置插件。

2. **运行你自己的爬虫：**
   你可以[运行你自己的爬虫](https://docsearch.algolia.com/docs/run-your-own/)来生成索引。在这种情况下，你需要使用你自己的 [appId](#appid)、[apiKey](#apikey) 和 [[indices](#indices) 名称来配置插件。

::: details 官方爬虫配置示例

```js{34-49,57}
new Crawler({
  appId: 'YOUR_APP_ID',
  apiKey: 'YOUR_API_KEY',
  rateLimit: 8,
  startUrls: [
    // 这是 Algolia 开始抓取网站的初始地址
    // 如果你的网站被分为多个独立部分，你可能需要在此设置多个入口链接
    'https://YOUR_WEBSITE_URL/',
  ],
  sitemaps: [
    // 如果你在使用 Sitemap 插件 (如: @vuepress-plugin/sitemap)，你可以提供 Sitemap 链接
    'https://YOUR_WEBSITE_URL/sitemap.xml',
  ],
  ignoreCanonicalTo: false,
  exclusionPatterns: [
    // 你可以通过它阻止 Algolia 抓取某些 URL
  ],
  discoveryPatterns: [
    // 这是 Algolia 抓取 URL 的范围
    'https://YOUR_WEBSITE_URL/**',
  ],
  // 爬虫执行的计划时间，可根据文档更新频率设置
  schedule: 'at 02:00 every 1 day',
  actions: [
    // 你可以拥有多个 action，特别是当你在一个域名下部署多个文档时
    {
      // 使用适当的名称为索引命名
      indexName: 'YOUR_INDEX_NAME',
      // 索引生效的路径
      pathsToMatch: ['https://YOUR_WEBSITE_URL/**'],
      // 控制 Algolia 如何抓取你的站点
      recordExtractor: ({ $, helpers }) => {
        // @vuepress/theme-default 的选项
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
    // 控制索引如何被初始化，这仅当索引尚未生成时有效
    // 你可能需要在修改后手动删除并重新生成新的索引
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

上述代码中的 `recordProps` 是针对默认主题的配置。你可以根据正在使用的主题结构进行相应的修改。

**注意：** 为了让插件正常工作（特别是多语言支持），`initialIndexSettings.YOUR_INDEX_NAME.attributesForFaceting` 字段必须包含 `'lang'`。
:::

::: tip
如果你没有使用默认主题，或者在使用 DocSearch 时遇到问题，可以检查上面的爬虫配置示例。此外，你可以前往 [Algolia Crawler](https://crawler.algolia.com/admin/crawlers/)，使用项目侧边栏中的 "Editor" 面板来调试和编辑你的配置。
:::

## 选项

### appId

- 类型：`string`
- 必填：是
- 详情：定义你的 Algolia 应用 ID (Application ID)。

- 参考：
  - [DocSearch > Options > appId](https://docsearch.algolia.com/docs/api#appid)

### apiKey

- 类型：`string`
- 必填：是
- 详情：DocSearch 团队提供的，或者你自己生成的搜索 API 密钥 (Search API Key)。

- 参考：
  - [DocSearch > Options > apiKey](https://docsearch.algolia.com/docs/api#apikey)

### indices

- 类型：`Array<string | DocSearchIndex>`
- 必填：是
- 详情：用于关键词搜索的索引列表，也可以为每个索引提供可选的 `searchParameters`。

- 参考：
  - [DocSearch > Options > indices](https://docsearch.algolia.com/docs/api#indices)

::: tip indexName

如果只使用单个索引，`indexName` 可以作为 `indices` 的简写，但它已经被弃用并会在未来版本中移除。详情请参阅 [DocSearch > Options > indexName](https://docsearch.algolia.com/docs/api#indexname)。

:::

### placeholder

- 类型：`string`
- 默认值：`'Search docs'`
- 详情：搜索输入框的占位符文本。

- 参考：
  - [DocSearch > Options > placeholder](https://docsearch.algolia.com/docs/api/#placeholder)

### disableUserPersonalization

- 类型：`boolean`
- 默认值：`false`
- 详情：是否禁用所有个性化功能，例如最近搜索和收藏的搜索。

- 参考：
  - [DocSearch > Options > disableUserPersonalization](https://docsearch.algolia.com/docs/api/#disableuserpersonalization)

### initialQuery

- 类型：`string`
- 详情：打开搜索模态框时的初始查询内容。

- 参考：
  - [DocSearch > Options > initialQuery](https://docsearch.algolia.com/docs/api/#initialquery)

### maxResultsPerGroup

- 类型：`number`
- 默认值：`5`
- 详情：每组（例如每个层级）显示的最大搜索结果数量。

- 参考：
  - [DocSearch > Options > maxResultsPerGroup](https://docsearch.algolia.com/docs/api/#maxresultspergroup)

### translations

- 类型：`Partial<DocSearchTranslations>`
- 详情：允许替换 DocSearch 按钮或模态框中的默认文本。

- 参考：
  - [DocSearch > Options > translations](https://docsearch.algolia.com/docs/api/#translations)

### locales

- 类型：`Record<string, DocSearchPluginOptions>`
- 详情：该插件在不同语言环境下的配置。所有上述选项均可在 locale 配置中进行重写。

- 示例：

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

- 参考：
  - [指南 > 多语言支持](https://vuejs.press/zh/guide/i18n.html)

### indexBase

- 类型：`string`
- 默认值：[base](https://vuejs.press/zh/reference/config.html#base)
- 详情：生成搜索索引时站点的基础路径 (base path)。

  如果你将站点部署到多个域名（例如不同的版本或镜像站），你不需要将所有域名都提交给 DocSearch 并分别为其生成索引。你可以选择其中一个域名作为**索引域名** (Index Domain)，仅提交该域名给 DocSearch 进行爬取。之后，你可以在所有部署中复用同一个搜索索引。

  但是，如果你的不同部署使用了不同的 [base](https://vuejs.press/reference/config.html#base) 路径，你需要将此选项设置为索引域名的 `base`，以确保在当前站点生成的搜索结果链接是正确的。

### injectStyles

- 类型：`boolean`
- 默认值：`true`
- 详情：是否注入 DocSearch 的默认样式。

  如果你认为 DocSearch 的默认样式与你的站点不兼容，或者你想完全自定义样式，可以将此选项设置为 `false`。

  **注意：** 禁用此选项后，你需要自行导入 DocSearch 的样式。同时，[样式](#样式) 章节中提到的 CSS 变量自定义也将失效。

## 客户端选项

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

自定义 DocSearch 客户端选项，支持普通对象，Ref 或 Getter。

::: warning

为了支持 VuePress 的路由和优化，插件内部已经配置了 `transformItems`、`hitComponent`、`navigator` 和 `transformSearchClient`。直接覆盖这些选项可能会导致意外的行为或功能异常。

如果你确实需要自定义它们，建议先阅读[内部实现代码](https://github.com/vuepress/ecosystem/blob/main/plugins/search/plugin-docsearch/src/client/composables/useDocSearchSlim.ts)以确保兼容性。

:::

## 样式

你可以通过 [@docsearch/css](https://docsearch.algolia.com/docs/styling) 提供的 CSS 变量来自定义样式。

为了适配 VuePress 的默认主题，本插件覆盖了部分 CSS 变量。

## 组件

- SearchBox
