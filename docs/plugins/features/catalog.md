---
icon: list-tree
---

# catalog

<NpmBadge package="@vuepress/plugin-catalog" />

This plugin automatically generates catalog pages and provides catalog components.

## Usage

```bash
npm i -D @vuepress/plugin-catalog@next
```

```ts title=".vuepress/config.ts"
import { catalogPlugin } from '@vuepress/plugin-catalog'

export default {
  plugins: [
    catalogPlugin({
      // Your options
    }),
  ],
}
```

## Guide

### Catalog Info

First, you should set catalog info in `routeMeta`:

```ts title=".vuepress/config.ts"
import { catalogPlugin } from '@vuepress/plugin-catalog'

export default {
  extendsPage: (page) => {
    // Set catalog info in routeMeta
    page.routeMeta = {
      // Catalog title
      title: page.title,
      // ... other information
    }
  },
}
```

You can then import `defineCatalogInfoGetter` from `@vuepress/plugin-catalog/client` and use it in [client config file][client-config] to extract catalog info from route meta.

```ts title=".vuepress/client.ts"
import { defineCatalogInfoGetter } from '@vuepress/plugin-catalog/client'

defineCatalogInfoGetter((meta) => (meta.title ? { title: meta.title } : null))
```

Catalog info should contain:

- `title`: Catalog title
- `order`: Catalog order (optional)
- `content`: Catalog content component (optional)

### Sorting with Order

The plugin sorts pages by `order` in the following sequence:

```:no-line-numbers
// Positive numbers from small to large
Project with order 1
Project with order 2
...
Project with order 10
...
// Projects without order
Project without order
Project without order
...
// Negative numbers from small to large
Project with order -10
// ...
Project with order -2
Project with order -1
```

## Options

:::: fields
@`level` type=`1 | 2 | 3` default=`3` built-in="Component only"

Maximum depth of catalog items.

@`index` type=boolean built-in="Component only"

Whether to show index numbers for catalog items.

@`frontmatter` type=`(path: string) => PageFrontmatter`

Frontmatter getter for generated pages.

```ts title=".vuepress/config.ts"
import { catalogPlugin } from '@vuepress/plugin-catalog'

export default {
  plugins: [
    catalogPlugin({
      frontmatter: (path) => ({
        // Frontmatter you want
        // You may customize title, author, time, etc.
      }),
    }),
  ],
}
```

@`exclude` type=`(RegExp | string)[]` default=`[]`

Catalog page path to be excluded during generation.

- `"/foo/"` means only exclude catalog page generation at the `/foo/` folder.
- `/^\/foo\//` means exclude catalog page generation at the `/foo/` folder and its subfolders.

::: tip 404 pages will be automatically excluded.

:::

@`component` type=string

Component name to use as the catalog component.

By default the plugin registers and uses a `<Catalog />` component.

@`locales` type=`CatalogPluginLocaleConfig`

Locale config of the catalog component.

::: details Built-in Supported Languages

- **Simplified Chinese** (zh-CN)
- **Traditional Chinese** (zh-TW)
- **English (United States)** (en-US)
- **German** (de-DE)
- **Russian** (ru-RU)
- **Ukrainian** (uk-UA)
- **Vietnamese** (vi-VN)
- **Portuguese** (pt)
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

@@`locales.<localePath>.title` type=string

Catalog title text.

@@`locales.<localePath>.empty` type=string

Empty hint text.
::::

## Client Options

### defineCatalogInfoGetter

```ts
interface CatalogInfo {
  /** Catalog title */
  title: string
  /** Catalog order */
  order?: number
  /** Catalog content */
  content?: Component
}

type CatalogInfoGetter = (meta: Record<string, unknown>) => CatalogInfo | null

const defineCatalogInfoGetter: (options: CatalogInfoGetter) => void
```

Customizes how to extract catalog info from route meta.

## Components

### Catalog

- Details:

  This plugin globally registers a `<Catalog />` component by default (unless you set the `component` option).

  You can use `<Catalog />` in theme layouts or directly in Markdown files.

  The component supports four props:
  - `level`: Changes the display depth (maximum 3 levels), default is `3`.
  - `base`: Displays catalog of the specified folder, default is the current folder.
  - `index`: Adds index numbers to catalog items, default is no numbers.
  - `hideHeading`: Hides the component title, default is to display the `Catalog` title.

[client-config]: https://vuejs.press/guide/configuration.html#client-config-file

## Styles

You can customize catalog styles via CSS variables:

@[code css](@vuepress/plugin-catalog/src/client/styles/vars.css)
