---
icon: https://www.meilisearch.com/favicon.ico
---

# meilisearch

<NpmBadge package="@vuepress/plugin-meilisearch" />

将 [MeiliSearch](https://www.meilisearch.com/) 集成到 VuePress 中，为你的文档网站提供搜索功能。

## 安装 MeiliSearch

要免费使用 MeiliSearch，你需要在自己的服务器上自托管它，否则需要付费使用 MeiliSearch Cloud。

::: info MeiliSearch Cloud

要使用 MeiliSearch Cloud，请创建一个账户并设置新的实例。你可以在 [MeiliSearch Cloud 文档](https://www.meilisearch.com/docs/cloud/getting_started) 中找到说明。

:::

### 启动 MeiliSearch

::: tip

在本节中，我们使用 Docker 来自托管 MeiliSearch，请参阅 [MeiliSearch Docker 文档](https://www.meilisearch.com/docs/guides/misc/docker) 以获取详细信息。

如果你尚未安装 Docker，也可以 [手动安装 MeiliSearch](https://www.meilisearch.com/docs/learn/self_hosted/getting_started_with_self_hosted_meilisearch#setup-and-installation)。

:::

首先拉取最新的 MeiliSearch Docker 镜像：

```sh
docker pull getmeili/meilisearch:latest
```

然后启动容器：

```sh :no-line-numbers
docker run -it --rm \
  # 将容器名称设置为 "MeiliSearch"
  --name MeiliSearch \
  # 设置你自己的主密钥
  # 替换 <YOUR_MASTER_KEY> 为你自己的主密钥
  -e MEILI_MASTER_KEY='<YOUR_MASTER_KEY>' \
  # 切换到生产模式
  -e MEILI_ENV=production \
  # 禁用 MeiliSearch 分析
  -e MEILI_NO_ANALYTICS=1 \
  # 将 7700 端口映射到主机
  -p 7700:7700 \
  # 挂载索引数据库到主机
  # 你可以将路径更改为任何位置
  -v $(pwd)/meili_data:/meili_data \
  getmeili/meilisearch:latest
```

此处 `<YOUR_MASTER_KEY>` 是你需要自行设置的 MeiliSearch 主密钥（需 >= 16 字节），用于访问 MeiliSearch API。

::: 重要 不要暴露主密钥

搜索密钥可以生成供公共访问，仅允许执行搜索操作。

你的主密钥应仅用于内部服务器访问（包括抓取），因为它授予完整的操作权限。不要混用它们，并且 **绝不要暴露此密钥**！

:::

### 设置抓取器

::: tip

MeiliSearch 提供了一个 Docker 抓取器镜像来抓取你的文档。有关详细信息，请参阅 [MeiliSearch：抓取内容](https://www.meilisearch.com/docs/guides/front_end/search_bar_for_docs#scrape-your-content)。

如果你没有安装 Docker，可以 [从源代码运行抓取器](https://github.com/meilisearch/docs-scraper?tab=readme-ov-file#from-source-code-)。

:::

首先，拉取最新的 MeiliSearch 抓取器镜像：

```sh
docker pull getmeili/docs-scraper:latest
```

然后为抓取器创建一个 **正确的配置文件**。这里提供了一个示例，你应将其保存在本地并根据需要进行修改：

```json :collapsed-lines=10
{
  "index_uid": "<YOUR_INDEX_NAME>",
  "start_urls": ["https://<YOUR_WEBSITE_URL>/"],
  "sitemap_urls": ["https://<YOUR_WEBSITE_URL>/sitemap.xml"],
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

- `index_uid` 应为你的索引分配一个唯一名称，用于搜索。
- `start_urls` 和 `sitemap_urls`（可选）应根据要抓取的网站进行自定义。
- `selectors` 字段可以根据第三方主题 DOM 结构进行自定义。
- 你可以根据需要向 `custom_settings` 中添加新字段。

::: important 配置文件要求

为了让插件正常工作：

- `lang` 选择器必须在 `selectors` 字段中保持不变
- `custom_settings` 中的所有当前字段不得删除。

:::

确保 MeiliSearch 正在运行，然后通过运行以下 Docker 命令来抓取文档：

```sh
docker run -t --rm \
  --network=host \
  -e MEILISEARCH_HOST_URL='<MEILISEARCH_HOST_URL>' \
  -e MEILISEARCH_API_KEY='<MEILISEARCH_MASTER_KEY>' \
  -v <absolute-path-to-your-config-file>:/docs-scraper/config.json \
  getmeili/docs-scraper:latest pipenv run ./docs_scraper config.json
```

此处：

- `<MEILISEARCH_HOST_URL>` 应为你的 MeiliSearch 实例的主机 URL
- `<MEILISEARCH_MASTER_KEY>` 是你提供的主密钥。
- `<absolute-path-to-your-config-file>` 是你创建的配置文件的绝对路径。

抓取完成后，MeiliSearch 将更新现有索引以包含最新的文档内容。

### 设置插件

为了使插件正常工作，需要为插件生成一个仅限搜索的访问密钥。此密钥可以通过 MeiliSearch API 创建。
你可以使用以下命令创建仅限搜索的访问密钥：

```sh
curl \
  # 将 <YOUR_HOST> 替换为你的 MeiliSearch 主机 URL
  -X POST '<YOUR_HOST>/keys' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <MASTER_KEY>' \
  # 描述 f
  --data-binary '{
    "indexes": ["<YOUR_INDEX_NAME>"]，
    "actions": ["search"],
    "expiresAt": null,
    "description": "Search key for <YOUR_INDEX_NAME>"
  }'
```

此处：

- `<YOUR_HOST>` 是你的 MeiliSearch 实例的主机 URL
- `<MASTER_KEY>` 是 MeiliSearch 生成的主密钥
- `<YOUR_INDEX_NAME>` 是你创建的索引名称
- `actions` 指定此密钥可以执行的操作。在此情况下，设置为 `["search"]`，表示它只能执行搜索操作。
- `expiresAt` 设置密钥的过期日期，允许你控制密钥的有效期限，`null` 表示永远不会过期。

如果成功，响应将如下所示：

```json
{
  "name": null,
  "description": "Search key for <YOUR_INDEX_NAME>",
  "key": "adaf72e2a6d6f428ec465bc786ec41de868bbd53121997e89ba2299e9566c88213",
  "uid": "b84d1be5-caa5-4752-b078-8f40be39051d",
  "actions": ["search"],
  "indexes": ["<YOUR_INDEX_NAME>"],
  "expiresAt": null,
  "createdAt": "2024-01-27T06:50:33.668329328Z",
  "updatedAt": "2024-01-27T06:50:33.668329328Z"
}
```

现在，你可以将 `key` 用于插件配置。在你的 VuePress 项目中安装插件并提供所需的选项：

```bash
npm i -D @vuepress/plugin-meilisearch@next
```

```ts
import { meilisearchPlugin } from '@vuepress/plugin-meilisearch'

export default {
  plugins: [
    meilisearchPlugin({
      host: '<MEILISEARCH_HOST_URL>',
      apiKey: '<YOUR_SEARCH_ONLY_KEY>',
      indexUid: '<YOUR_INDEX_NAME>',
    }),
  ],
}
```

### 使用 GitHub Actions 自动重新抓取

将你的抓取器配置文件放在项目中的某个位置。

然后转到 `Settings` -> `Secrets and variables` -> `Actions` 在你的 GitHub 仓库中。点击 `New repository secret` 并设置 `MEILISEARCH_MASTER_KEY` 为你自己的 MeiliSearch 主密钥。

接下来在你的 GitHub Actions 工作流文件中添加一个新的步骤 `scrape`，它将在部署步骤之后运行。以下是操作示例：

```yml
name: 部署和抓取

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      # 在此处部署你的文档
      # ...

  scrape:
    needs: deploy
    runs-on: ubuntu-latest
    name: 重新抓取 MeiliSearch 文档
    steps:
      - 名称：Checkout
        uses: actions/checkout@v4

      - 名称：运行抓取器
        env：
          # 替换为你自己的 MeiliSearch 主机 URL
          HOST_URL: <YOUR_MEILISEARCH_HOST_URL>
          API_KEY: ${{ secrets.MEILISEARCH_MASTER_KEY }}
          # 替换为配置文件的路径
          CONFIG_FILE_PATH: ${{ github.workspace }}/<path/to/your/scraper/config.json>
        run: |
          docker run -t --rm \
            -e MEILISEARCH_HOST_URL=$HOST_URL \
            -e MEILISEARCH_API_KEY=$API_KEY \
            -v $CONFIG_FILE_PATH:/docs-scraper/config.json \
            getmeili/docs-scraper:latest pipenv run ./docs_scraper config.json
```

::: tip 抓取器密钥

为了保护你的 MeiliSearch 实例，你可以为抓取器创建一个具有有限权限的新密钥。与上面的搜索密钥类似，此密钥应仅对以下操作具有访问权限：`["indexes.create","indexes.delete","settings.update","documents.add"]`。

:::

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
