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

## Self-hosting MeiliSearch

MeiliSearch 提供了一个服务器程序，支持使用云服务器的用户的自部署选项。为了简化在服务器端运行 MeiliSearch 的过程，你可以使用 Docker 进行安装和管理。

```sh
docker pull getmeili/meilisearch:latest
```

在第一次启动时，默认情况下将生成一个主密钥。**不要暴露此密钥**；它应该只用于内部服务器访问，因为它拥有完全的操作权限。

```sh
docker run -it --rm \
  -p 7700:7700 \
  -v $(pwd)/meili_data:/meili_data \
  getmeili/meilisearch:v1.11
```

要创建只允许搜索操作的访问密钥，请使用以下请求。`indexes`数组指定该密钥可以访问哪些索引，`expiresAt`设置密钥的过期时间。

```sh
curl \
  -X POST 'http://localhost:7700/keys' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer MASTER_KEY' \
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

  - [更多](https://www.meilisearch.com/docs/reference/api/search#search-parameters)

## 组件

- SearchBox
