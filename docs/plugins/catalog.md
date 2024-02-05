# catalog

<NpmBadge package="@vuepress/plugin-catalog" />

The plugin can automatically generate catalog pages and provide catalog components.

## Usage

```bash
npm i -D @vuepress/plugin-catalog@next
```

```ts
import { catalogPlugin } from '@vuepress/plugin-catalog'

export default {
  plugins: [
    catalogPlugin({
      // Your options
    }),
  ],
}
```

### Extracting Info

First, you should set catalog info in routeMeta:

```js title=".vuepress/config.js"
import { autoCatalogPlugin } from '@vuepress/plugin-catalog'

export default {
  extendsPage: (page) => {
    // set catalog info in routeMeta
    page.routeMeta = {
      // catalog title
      title: page.title,
      // ... other information
    }
  },
}
```

You can then import `defineCatalogInfoGetter` from `@vuepress/plugin-catalog/client` and use it in [client config file][client-config] to extract catalog info from meta.

@tab JS

```js title=".vuepress/client.js"
import { defineCatalogInfoGetter } from '@vuepress/plugin-catalog/client'

export default {
  setup: () => {
    defineCatalogInfoGetter((meta) =>
      meta.title ? { title: meta.title } : null,
    )
  },
}
```

Catalog info should contains:

- `title`: catalog title
- `order`: catalog order (optional)
- `content`: catalog content component (optional)

::: tip Sorting with order

The plugin will sort pages by `order` in the following way:

```:no-line-numbers
// order positive numbers from small to large
Project with order 1
Project with order 2
...
Project with order 10
...
// Project without order
Project without order
Project without order
...
// order negative numbers from small to large
Project with order -10
// ...
Project with order -2
Project with order -1
```

:::

## Using AutoCatalog Component

The plugin globally register and use `<AutoCatalog />` component by default.

- The `<AutoCatalog />` will render 3 levels of pages as catalog items by default, and you can change the level depth by setting `level` option (max 3 levels).
- To index to catalog item, add `index` prop.
- By default, `<AutoCatalog />` generates catalog for current folder. Set `base` props if you want catalog of another folder.

You can use `<AutoCatalog />` in your theme layout, or in your markdown files directly.

If you want to use your own, you can register your component globally and set `component` option with your component name. Auto catalog page will use your component.

## Config

### level <Badge text="Built-in component only" />

- Type: `1 | 2 | 3`
- Default: `3`
- Details: Max depth of catalog items.

### index <Badge text="Built-in component only" />

- Type: `boolean`
- Default: `false`
- Details: Whether show index for catalog

### frontmatter

- Type: `(path: string) => Record<string, any>`
- Required: No
- Details: Frontmatter getter for the generated page.
- Example:

  ```js title=".vuepress/config.js"
  import { autoCatalogPlugin } from '@vuepress/plugin-catalog'

  export default {
    plugins: [
      autoCatalogPlugin({
        frontmatter: (path) => ({
          // frontmatter you want
          // you may customize title, author. time, etc.
        }),
      }),
    ],
  }
  ```

### exclude

- Type: `(RegExp | string)[]`
- Default: `[]`
- Details:

  Catalog page path to be excluded during generation.

  - `"/foo/"` means only exclude catalog page generation at `/foo/` folder.
  - `/^\/foo\//` means exclude catalog page generation at `/foo/` folder and its subfolders.

  ::: tip 404 pages will be automatically excluded.

  :::

### component

- Type: `string`
- Required: No
- Details: Component name to use as catalog.

### locales

- Type: `AutoCatalogLocaleConfig`

  ```ts
  interface AutoCatalogLocaleData {
    /**
     * Catalog title
     */
    title: string

    /**
     * Empty hint
     */
    empty: string
  }

  interface AutoCatalogLocaleConfig {
    [localePath: string]: AutoCatalogLocaleData
  }
  ```

- Required: No

- Details: Locales config for catalog component.

::: details Built-in Supported Languages

- **Simplified Chinese** (zh-CN)
- **Traditional Chinese** (zh-TW)
- **English (United States)** (en-US)
- **German** (de-DE)
- **German (Australia)** (de-AT)
- **Russian** (ru-RU)
- **Ukrainian** (uk-UA)
- **Vietnamese** (vi-VN)
- **Portuguese (Brazil)** (pt-BR)
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

## Client options

### defineCatalogInfoGetter

```ts
interface AutoCatalogInfo {
  /** Catalog title */
  title: string
  /** Catalog order */
  order?: number
  /** Catalog content */
  content?: Component
}

type AutoCatalogInfoGetter = (
  meta: Record<string, unknown>,
) => AutoCatalogInfo | null

const defineCatalogInfoGetter: (options: AutoCatalogInfoGetter) => void
```

Customize how to extract catalog info from meta.

## AutoCatalog Component Props

### base

- Type: `string`
- Default: Folder of current route path
- Details: Catalog Base

### level

- Type: `1 | 2 | 3`
- Default: `3`
- Details: Max level of catalog.

### index

- Type: `boolean`
- Default: `false`
- Details: Whether display index number for catalog.

### hideHeading

- Type: `boolean`
- Default: `false`
- Details: Whether hide `Category` title.

[client-config]: https://vuejs.press/guide/configuration.html#client-config-file
