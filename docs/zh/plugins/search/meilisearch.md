---
icon: https://www.meilisearch.com/favicon.ico
---

# meilisearch

<NpmBadge package="@vuepress/plugin-meilisearch" />

将 [MeiliSearch](https://www.meilisearch.com/) 集成到 VuePress 中，为你的文档网站提供搜索功能。

## 使用方法

```bash
npm i -D @vuepress/plugin-meilisearch@next
```

```ts
import { meilisearchPlugin } from '@vuepress/plugin-meilisearch'

export default {
  plugins: [
    meilisearchPlugin({
      // 配置项
      host: '',
      apiKey: '',
      indexUid: '',
    }),
  ],
}
```

## 在服务器上运行 MeiliSearch

MeiliSearch 提供了一个服务器程序，支持使用云服务器的用户的自部署选项。为了简化在服务器端运行 MeiliSearch 的过程，你可以使用 Docker 进行安装和管理。

```sh
docker pull getmeili/meilisearch:latest
```

在第一次启动时，默认情况下将生成一个主密钥（MASTER_KEY）。**不要暴露此密钥**；它应该只用于内部服务器访问，因为它拥有完全的操作权限。

```sh
docker run -it --rm \
  -p 7700:7700 \
  -v $(pwd)/meili_data:/meili_data \
  getmeili/meilisearch:latest
```

> 参考 <https://www.meilisearch.com/docs/guides/misc/docker>

## 抓取网站

MeiliSearch 提供了一个 Docker 爬虫来抓取文档。在此之前，保证 MeiliSearch 已经运行。

这是抓取 VuePress 官方文档的示例配置，保存在本地：

```json{18-68}
{
  "index_uid": "YOUR_INDEX_NAME",
  "start_urls": ["https://YOUR_WEBSITE_URL/"],
  "sitemap_urls": ["https://YOUR_WEBSITE_URL/sitemap.xml"],
  "selectors": {
    "lvl0": {
      "selector": ".vp-sidebar-heading.active",
      "global": true,
      "default_value": "Documentation"
    },
    "lvl1": "[vp-content] h1",
    "lvl2": "[vp-content] h2",
    "lvl3": "[vp-content] h3",
    "lvl4": "[vp-content] h4",
    "lvl5": "[vp-content] h5",
    "lvl6": "[vp-content] h6",
    "content": "[vp-content] p, [vp-content] li",
    "lang": {
      "selector": "/html/@lang",
      "global": true,
      "type": "xpath"
    }
  },
  "custom_settings": {
    "searchableAttributes": [
      "hierarchy_radio_lvl0",
      "hierarchy_radio_lvl1",
      "hierarchy_radio_lvl2",
      "hierarchy_radio_lvl3",
      "hierarchy_radio_lvl4",
      "hierarchy_radio_lvl5",
      "hierarchy_lvl0",
      "hierarchy_lvl1",
      "hierarchy_lvl2",
      "hierarchy_lvl3",
      "hierarchy_lvl4",
      "hierarchy_lvl5",
      "hierarchy_lvl6",
      "content",
      "lang",
      "objectID",
      "page_rank",
      "level",
      "position"
    ],
    "displayedAttributes": [
      "hierarchy_radio_lvl0",
      "hierarchy_radio_lvl1",
      "hierarchy_radio_lvl2",
      "hierarchy_radio_lvl3",
      "hierarchy_radio_lvl4",
      "hierarchy_radio_lvl5",
      "hierarchy_lvl0",
      "hierarchy_lvl1",
      "hierarchy_lvl2",
      "hierarchy_lvl3",
      "hierarchy_lvl4",
      "hierarchy_lvl5",
      "hierarchy_lvl6",
      "anchor",
      "url",
      "lang",
      "content",
      "objectID"
    ],
    "filterableAttributes": ["lang"]
  }
}
```

::: info

你可以根据你正在使用的主题修改它们。但是，18 到 68 行的配置不要更改，你可以添加其他字段到`filterableAttributes`中，但是必须包含`lang`字段，否则插件可能无法工作

:::

开始抓取文档，`MEILISEARCH_HOST_URL`是运行 MeiliSearch 的主机地址，`<MASTER_KEY>`是主密钥，`<absolute-path-to-your-config-file>`是抓取配置文件的绝对路径：

```sh
docker run -t --rm \
  --network=host \
  -e MEILISEARCH_HOST_URL='<MEILISEARCH_HOST_URL>' \
  -e MEILISEARCH_API_KEY='<MASTER_KEY>' \
  -v <absolute-path-to-your-config-file>:/docs-scraper/config.json \
  getmeili/docs-scraper:latest pipenv run ./docs_scraper config.json
```

抓取完成后，MeiliSearch 将在指定的索引中存储抓取到的文档。

> 参考 <https://www.meilisearch.com/docs/guides/front_end/search_bar_for_docs#scrape-your-content>

## 获取搜索索引和 apikey

要创建只允许搜索操作的访问密钥，请使用以下请求。`indexes`数组指定该密钥可以访问哪些索引，`expiresAt`设置密钥的过期时间。

```sh
curl \
  -X POST 'http://localhost:7700/keys' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <MASTER_KEY>' \
  --data-binary '{
    "description": "Search records key",
    "actions": ["search"],
    "indexes": ["YOUR_INDEX_NAME"],
    "expiresAt": "2025-01-01T00:00:00Z"
  }'
```

如果成功，响应将如下所示：

```json
{
  "name": null,
  "description": "Search records key",
  "key": "adaf72e2a6d6f428ec465bc786ec41de868bbd53121997e89ba2299e9566c88213",
  "uid": "b84d1be5-caa5-4752-b078-8f40be39051d",
  "actions": ["search"],
  "indexes": ["YOUR_INDEX_NAME"],
  "expiresAt": "2025-01-01T00:00:00Z",
  "createdAt": "2024-01-27T06:50:33.668329328Z",
  "updatedAt": "2024-01-27T06:50:33.668329328Z"
}
```

该密钥可以根据需要在外部公开和使用，填入到你的插件选项中：

```ts
meilisearchPlugin({
  host: 'YOUR_HOST',
  apiKey: 'adaf72e2a6d6f428ec465bc786ec41de868bbd53121997e89ba2299e9566c88213',
  indexUid: 'YOUR_INDEX_NAME',
})
```

## 选项

### host

- 类型：`string`

- 是否必需：`true`

- 详情：

  提供 MeiliSearch API 的 HTTP 地址。

### apiKey

- 类型：`string`

- 是否必需：`true`

- 详情：

  MeiliSearch 生成的 API 密钥。

### indexUid

- 类型：`string`

- 是否必需：`true`

- 详情：

  指定用于搜索的索引名称。

### translations

- 类型：`DocSearchTranslations`

- 详情：

  允许你替换 DocSearch 按钮和弹出框中的默认文本。

### hotKeys

- 类型：`string[] |`

- 默认值: `['ctrl+k', 's', '/']`

- 详情：

  触发搜索框的热键数组, 当设置 `false` 时无法用任何快捷键触发搜索框。

### debounceDuration

- 类型：`number | false`

- 默认值: `200`

- 详情：

  在按键之间等待的毫秒数，以确定是否应该进行搜索。设置 `0` 或者 `false` 逻辑上是等效的。

### searchParams

- 类型：`SearchParams`

- 详情：

  - [Meilisearch API 文档](https://www.meilisearch.com/docs/reference/api/search#search-parameters)

## 组件

- SearchBox
