---
icon: https://docsearch.algolia.com/img/favicon.ico
---

# docsearch

<NpmBadge package="@vuepress/plugin-docsearch" />

将 [Algolia DocSearch](https://docsearch.algolia.com/) 集成到 VuePress 中，为你的文档网站提供搜索功能。

## 使用方法

```bash
npm i -D @vuepress/plugin-docsearch@next
```

```ts title=".vuepress/config.ts"
import { docsearchPlugin } from '@vuepress/plugin-docsearch'

export default {
  plugins: [
    docsearchPlugin({
      // 配置项
    }),
  ],
}
```

## 获取搜索索引

你需要 [提交你的网站 URL](https://docsearch.algolia.com/apply/) 来加入 DocSearch 项目。当你的索引成功创建后， DocSearch 团队会将 [apiKey](#apikey) 和 [indices](#indices) 发送到你的邮箱。接下来，你就可以配置该插件，在 VuePress 中启用 DocSearch 了。

或者，你也可以 [运行你自己的爬虫](https://docsearch.algolia.com/docs/run-your-own/) 来创建索引，然后使用你自己的 [appId](#appid), [apiKey](#apikey) 和 [indices](#indices) 来配置该插件。

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

上述 `recordProps` 是用于默认主题的配置，你可以根据你使用的主题来修改它们。

注意 `initialIndexSettings.YOUR_INDEX_NAME.attributesForFaceting` 字段**必须**包含 `'lang'`，否则该插件将无法正常工作。

:::

::: tip
如果你使用的不是默认主题，或者在使用 DocSearch 的时候遇到了任何问题，你也可以检查上述的爬虫配置示例，然后前往 [Algolia Crawler](https://crawler.algolia.com/admin/crawlers/) 仓库，在你项目侧边栏中的 Editor 页面中修改你的配置。
:::

## 配置项

### appId

- 类型：`string`
- 必填：是
- 详情：用于设置你的 Application ID。

- 参考：
  - [DocSearch > Options > appId](https://docsearch.algolia.com/docs/api#appid)

### apiKey

- 类型：`string`
- 必填：是
- 详情：从 DocSearch 团队收到的 `apiKey` ，或者由你自己生成。

- 参考：
  - [DocSearch > Options > apiKey](https://docsearch.algolia.com/docs/api#apikey)

### indices

- 类型：`Array<string | DocSearchIndex>`
- 必填：是
- 详情：要用于关键字搜索的索引及其可选的 searchParameters 列表。

- 参考：
  - [DocSearch > Options > indexName](https://docsearch.algolia.com/docs/api#indices)

::: tip indexName

`indexName` 也可以作为 `indices` 的简写形式，但它将会在未来的版本中废弃。详见 [DocSearch > Options > indexName](https://docsearch.algolia.com/docs/api#indexname)。

:::

### placeholder

- 类型：`string`
- 默认值：`'Search docs'`
- 详情：搜索输入框的 placeholder 属性。

- 参考：
  - [DocSearch > Options > placeholder](https://docsearch.algolia.com/docs/api#placeholder)

### disableUserPersonalization

- 类型：`boolean`
- 默认值：`false`
- 详情：是否禁用所有的个性化功能：最近的搜索、收藏的搜索结果等。

- 参考：
  - [DocSearch > Options > disableUserPersonalization](https://docsearch.algolia.com/docs/api#disableuserpersonalization)

### initialQuery

- 类型：`string`
- 详情：打开弹窗时的初始请求。

- 参考：
  - [DocSearch > Options > initialQuery](https://docsearch.algolia.com/docs/api#initialquery)

### translations

- 类型：`Partial<DocSearchTranslations>`
- 详情：允许替换 DocSearch 按钮和弹窗内的默认文字。

- 参考：
  - [DocSearch > Options > translations](https://docsearch.algolia.com/docs/api/#translations)

### maxResultsPerGroup

- 类型：`number`
- 默认值：`5`
- 详情：每个组的最大结果数。

- 参考：
  - [DocSearch > Options > maxResultsPerGroup](https://docsearch.algolia.com/docs/api#maxresultspergroup)

### locales

- 类型：`Record<string, DocSearchPluginOptions>`
- 详情：在不同 locales 下对该插件进行不同的配置。该插件的所有其他选项都可以在 locale 中进行配置。

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
- 详情：搜索索引基础路径。

  如果你需要把你的站点部署到不同的域名上，你不需要把它们全都提交到 DocSearch 上来分别生成搜索索引。你可以选择其中一个域名作为 _索引域名_ ，并且仅将 _索引域名_ 提交到 DocSearch 上来爬取搜索索引。然后，你就可以在不同的部署域名下复用索引。

  如果你不同部署域名下的 [base](https://vuejs.press/zh/reference/config.html#base) 是不一样的，你就需要将这个配置设置成 _索引域名_ 的 [base](https://vuejs.press/zh/reference/config.html#base) ，这样其他的部署域名就可以正确复用索引了。

### injectStyles

- 类型：`boolean`
- 默认值：`true`
- 详情：是否注入 DocSearch 的默认样式。

  如果你认为 DocSearch 的默认样式和你的站点不兼容，你可以尝试覆盖默认样式，或者将该选项设置为 `false` 来完全移除默认样式。

  当该选项被禁用时，你需要为 DocSearch 引入你自己的样式。同时要注意，你也无法再使用 [样式](#样式) 章节中提到的样式自定义能力。

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

自定义 DocSearch 选项，支持普通对象，Ref 或 Getter。

::: warning

为了支持 VuePress 的路由与其他优化，`transformItems`, `hitComponent` `navigator` 和 `transformSearchClient` 选项已被内部配置。直接覆盖它们可能会导致非预期行为。

如果你需要自定义它们，你可能需要先理解 [VuePress 的适配](https://github.com/vuepress/ecosystem/blob/main/plugins/search/plugin-docsearch/src/client/composables/useDocSearchSlim.ts) 并确保不破坏它们。

:::

## 样式

你可以通过 [@docsearch/css](https://docsearch.algolia.com/docs/styling) 提供的 CSS 变量来自定义样式。

为了适配 VuePress 其他部分的样式，插件覆盖了一些原有 CSS 变量。

## 组件

- SearchBox
