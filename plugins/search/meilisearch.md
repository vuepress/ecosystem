---
url: /ecosystem/plugins/search/meilisearch.md
---
# meilisearch

Integrate [MeiliSearch](https://www.meilisearch.com/) into VuePress, which can provide search to your documentation site.

## Setup MeiliSearch

To use MeiliSearch for free, you need to self-host it on your own server, otherwise you need to pay for MeiliSearch Cloud.

::: info MeiliSearch Cloud

To use MeiliSearch Cloud, you need to create an account and set up a new instance. You can find the instructions in the [MeiliSearch Cloud documentation](https://www.meilisearch.com/docs/cloud/getting_started).

:::

### Starting MeiliSearch

::: tip

In this section, we use Docker to self-host Meilisearch, see [MeiliSearch Docker docs](https://www.meilisearch.com/docs/guides/misc/docker) for details.

If you don't have Docker installed, you may also [install MeiliSearch manually](https://www.meilisearch.com/docs/learn/self_hosted/getting_started_with_self_hosted_meilisearch#setup-and-installation).

:::

First pull latest MeiliSearch docker image:

```sh
docker pull getmeili/meilisearch:latest
```

Then start the docker:

```sh :no-line-numbers
docker run -it --rm \
  # set container name to "MeiliSearch"
  --name MeiliSearch \
  # set your own master key
  # replace <YOUR_MASTER_KEY> with your own master key
  -e MEILI_MASTER_KEY='<YOUR_MASTER_KEY>' \
  # switch to production mode
  -e MEILI_ENV=production \
  # disable meilisearch analytics
  -e MEILI_NO_ANALYTICS=1 \
  # mapping 7700 port to host
  -p 7700:7700 \
  # mounting index database to host
  # you can change the path to anywhere you want
  -v $(pwd)/meili_data:/meili_data \
  getmeili/meilisearch:latest
```

Here `<YOUR_MASTER_KEY>` is the master key for MeiliSearch that you should set yourself (required >= 16 bytes), which is used to access the MeiliSearch API.

::: important Never expose Master Key

Search key can be generated for public access, which only allows search operations.

Your Master Key should only be used for internal server access (including scraping), as it grants full operational permissions. Do not mix use them and **never expose this key**!

:::

### Setting up the Scraper

::: tip

If you don't have Docker installed, you can [run scraper from source code](https://github.com/jqiue/docs-scraper?tab=readme-ov-file#from-source-code-).

:::

First, pull the latest MeiliSearch Scraper image:

```sh
docker pull jqiue/docs-scraper:latest
```

Then, create a **correct configuration file** for the scraper. Here, we provide a sample, which you should save it locally and modify according to your needs:

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
    "filterableAttributes": ["lang"]
  }
}
```

* `index_uid` should be a unique name for your index, which will be used to search.
* `start_urls` and `sitemap_urls` (optional) shall be customized according to the website to be scraped.
* `selectors` field can be customized according to third-party theme DOM structure.
* You can add new fields to `custom_settings` according to your needs.

::: important Requirements for the configuration file

To let the plugin work:

* `lang` selector must be kept as is in `selectors` filed
* All fields that are currently in `custom_settings` must not be removed.

:::

Make sure MeiliSearch is currently running, then start scraping the document by running the docker:

```sh
docker run -t --rm \
  --network=host \
  -e MEILISEARCH_HOST_URL='<MEILISEARCH_HOST_URL>' \
  -e MEILISEARCH_API_KEY='<MEILISEARCH_MASTER_KEY>' \
  -v <absolute-path-to-your-config-file>:/docs-scraper/config.json \
  jqiue/docs-scraper:latest pipenv run ./docs_scraper config.json
```

Here:

* `<MEILISEARCH_HOST_URL>` should be the host URL of your MeiliSearch instance
* `<MEILISEARCH_MASTER_KEY>` shall be the master key you provided.
* `<absolute-path-to-your-config-file>` is the absolute path to the configuration file you created above.

When the scraper completes, MeiliSearch will update the existing index with latest document content.

Each time the scraper deletes and recreates the index. During this process, all the documents will be deleted and re-added. This might be slow for too many documents. However, when we only need to update part of the document content, we can use `only_urls` to tell the scraper to update only the specified urls instead of crawling all of them once.

```json
{
  "only_urls": ["https://<YOUR_WEBSITE_URL>/specifies/"]
}
```

Using `npx gous <docsDir> <replaceUrl> <scraperPath>` in your project can automatically generate `only_urls` for your scraper configuration file.

::: tip description

If your project is not managed using Git or the os does not have Git installed, it cannot run.

* `docsDir` The parent directory of `.vuepress`. For example, if your directory is `docs/.vuepress`, then this value is `docs`
* `replaceUrl` The URL of your document.
* `scraperPath` The path of the scraper configuration file

:::

### Setting up the Plugin

A search-only access key shall be generated for the plugin to work. This key can be generated using the MeiliSearch API.
You can use the following command to create a search-only access key:

```sh
curl \
  # Replace <YOUR_HOST> with your MeiliSearch host URL
  -X POST '<YOUR_HOST>/keys' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <MASTER_KEY>' \
  # description f
  --data-binary '{
    "indexes": ["<YOUR_INDEX_NAME>"],
    "actions": ["search"],
    "expiresAt": null,
    "description": "Search key for <YOUR_INDEX_NAME>"
  }'
```

Here:

* `<YOUR_HOST>` is the host URL of your MeiliSearch instance
* `<MASTER_KEY>` is the master key generated by MeiliSearch
* `<YOUR_INDEX_NAME>` is the name of the index you created
* `actions` specifies the actions that this key can perform. In this case, it is set to `["search"]`, which means it can only perform search operations.
* `expiresAt` sets the expiration date for the key, allowing you to control how long the key remains valid, `null` means it will never expire.

If successful, the response would look like this:

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

Now, you can use the `key` in the plugin configuration. Install the plugin in your VuePress project and then provide required options:

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

### Automatic Re-scraping with Github Actions

Place your scraper config file somewhere in your project.

Then go to `Settings` -> `Secrets and variables` -> `Actions` in your Github repository. Click `New repository secret` and set `MEILISEARCH_MASTER_KEY` with your meilisearch master key.

Next add a new step `scrape` in your Github Actions workflow file, which will run after the deployment step. Here is an example of how to do this:

```yml
name: Deploy and Scrape

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      # deploy your documentation here
      # ...

  scrape:
    needs: deploy
    runs-on: ubuntu-latest
    name: re-scrape documentation for Meilisearch
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Run scraper
        env:
          # replace with your own MeiliSearch host URL
          HOST_URL: <YOUR_MEILISEARCH_HOST_URL>
          API_KEY: ${{ secrets.MEILISEARCH_MASTER_KEY }}
          # replace it with the path to your config file
          CONFIG_FILE_PATH: ${{ github.workspace }}/<path/to/your/scraper/config.json>
        run: |
          docker run -t --rm \
            -e MEILISEARCH_HOST_URL=$HOST_URL \
            -e MEILISEARCH_API_KEY=$API_KEY \
            -v $CONFIG_FILE_PATH:/docs-scraper/config.json \
            jqiue/docs-scraper:latest pipenv run ./docs_scraper config.json
```

::: tip Key for Scraper

To secure your MeiliSearch instance, you can create a new key with limited permissions for the scraper. Similar to search key above, this key should only have access to these actions: `["search","indexes.create","indexes.delete","settings.update","documents.add"]`

:::

## Options

### host

* Type: `string`

* Required: `true`

* Details:

  Provide the HTTP address of the MeiliSearch API.

### apiKey

* Type: `string`

* Required: `true`

* Details:

  API key generated by MeiliSearch.

### indexUid

* Type: `string`

* Required: `true`

* Details:

  Specify the index name used for searching.

### translations

* Type: `DocSearchTranslations`

* Details:

  Allows you to replace the default text in the DocSearch button and popup.

### hotKeys

* Type: `string[] | false`

* Default: `['ctrl+k', 's', '/']`

* Details:

  An array of hotkeys to trigger the search modal. When the value is `false`, the search modal cannot be triggered with any key.

### debounceDuration

* Type: `number | false`

* Default: `200`

* Details:

  The number of milliseconds that wait between keystrokes to determine whether a search should be performed, Setting the value here to `0` or `false` is logically equivalent.

### searchParams

* Type: `SearchParams`

* Required: `false`

* Details:

  Parameters of MeiliSearch API.

* Also see:
  * [Meilisearch API docs](https://www.meilisearch.com/docs/reference/api/search#search-parameters)

## Components

* SearchBox
