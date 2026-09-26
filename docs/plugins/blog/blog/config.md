---
icon: settings-2
---

# Config

## Options

:::: fields
@getInfo@ type=`(page: Page) => Record<string, unknown>`

A function to extract article information from pages.

The extracted information is injected into the route meta, making it accessible via client-side composables.

See also: [Gathering Info](./guide.md#gathering-info).

@filter@ type=`(page: Page) => boolean` default=`(page) => Boolean(page.filePathRelative) && !page.frontmatter.home`

A function to determine which pages are treated as blog articles.

By default, it includes all pages generated from Markdown files, excluding the homepage.

See also: [Article Collection](./guide.md#article-collection).

@category@ type=`BlogCategoryOptions[]`

Category configurations. See also: [Blog Category Config](#blog-category-config).

@type@ type=`BlogTypeOptions[]`

Type configurations. See also: [Blog Type Config](#blog-type-config).

@slugify@ type=`(name: string) => string` default=`(name) => name.replaceAll(/[ _]/gu, '-').replaceAll(/[:?*|\\/<>]/gu, '').toLowerCase()`

A function that converts strings into URL-friendly slugs for route registration.

@excerpt@ type=boolean default=`true`

Enables or disables excerpt generation for pages.

See also: [Generating Excerpt](./guide.md#generating-excerpt).

@excerptSeparator@ type=string default=`'<!-- more -->'`

The separator used to manually define excerpts within the content.

See also: [Generating Excerpt](./guide.md#generating-excerpt).

@excerptLength@ type=number default=`300`

The target length for auto-generated excerpts.

See also: [Generating Excerpt](./guide.md#generating-excerpt).

::: tip

The generator will cut the text at the nearest position meeting or exceeding this length.

Set to `0` to disable automatic excerpt generation.

:::

@excerptFilter@ type=`(page: Page) => boolean` default="Same as the filter option"

A function to filter pages for excerpt generation.

See also: [Generating Excerpt](./guide.md#generating-excerpt).

::: tip

Use this to exclude pages from automatic excerpt generation. For instance, if `excerpt` or `description` is already defined in the frontmatter, you might prefer to use those values directly.

:::

@isCustomElement@ type=`(tagName: string) => boolean` default=`() => false`

A function to identify custom elements.

This is used to distinguish custom elements from unknown tags, which are otherwise stripped during excerpt generation.

See also: [Generating Excerpt](./guide.md#generating-excerpt).

@metaScope@ type=string default=`'_blog'`

The key under which the extracted information is injected into the route meta.

::: tip

Setting this to an empty string will inject the information directly into the route meta root, rather than nesting it under a field.

:::

@hotReload@ type=boolean default="Enabled if the --debug flag is used"

Enables hot reload support in the development server.

::: tip To theme developers

This is disabled by default due to potential performance impacts on sites with extensive categories and types. It may also slow down hot updates when editing Markdown.

It is recommended to enable this only when users are actively adding or organizing categories/tags. For general use, keep it disabled.

Alternatively, you can detect the number of pages in the user's project and decide whether to enable it programmatically.

:::

::::

## Blog Category Config

The blog category configuration accepts an array, where each item defines a specific "category" rule.

```ts
interface BlogCategoryOptions {
  /**
   * Unique category name
   */
  key: string

  /**
   * Function to retrieve categories from a page
   */
  getter: (page: Page) => string[]

  /**
   * A custom function to sort the pages
   */
  sorter?: (pageA: Page, pageB: Page) => number

  /**
   * The path pattern for the registered page
   *
   * `:key` will be replaced by the "slugify" result of the original key
   *
   * @default `/:key/`
   */
  path?: string | false

  /**
   * Page layout name
   *
   * @default 'Layout'
   */
  layout?: string

  /**
   * Frontmatter configuration
   */
  frontmatter?: (localePath: string) => Record<string, string>

  /**
   * The path pattern or custom function for the item page
   *
   * When providing a string, `:key` and `:name` will be replaced by the "slugify" result of the original key and name
   *
   * @default `/:key/:name/`
   */
  itemPath?: string | false | ((name: string) => string)

  /**
   * Item page layout name
   *
   * @default 'Layout'
   */
  itemLayout?: string

  /**
   * Frontmatter configuration for items
   */
  itemFrontmatter?: (name: string, localePath: string) => Record<string, string>
}
```

## Blog Type Config

The blog type configuration accepts an array, where each item defines a specific "type" rule.

```ts
interface BlogTypeOptions {
  /**
   * Unique type name
   */
  key: string

  /**
   * A filter function to determine if a page belongs to this type
   */
  filter: (page: Page) => boolean

  /**
   * A custom function to sort the pages
   */
  sorter?: (pageA: Page, pageB: Page) => number

  /**
   * The path pattern for the registered page
   *
   * @default '/:key/'
   */
  path?: string

  /**
   * Layout name
   *
   * @default 'Layout'
   */
  layout?: string

  /**
   * Frontmatter configuration
   */
  frontmatter?: (localePath: string) => Record<string, string>
}
```

## Composition API

The following APIs are available via `@vuepress/plugin-blog/client`.

- Blog category

  ```ts
  const useBlogCategory: <
    T extends Record<string, unknown> = Record<string, unknown>,
  >(
    key?: string,
  ) => ComputedRef<BlogCategoryData<T>>
  ```

  The `key` argument represents the unique category key.

  If no key is provided, the plugin attempts to infer the key from the current route.

- Blog type

  ```ts
  const useBlogType: <
    T extends Record<string, unknown> = Record<string, unknown>,
  >(
    key?: string,
  ) => ComputedRef<BlogTypeData<T>>
  ```

  The `key` argument represents the unique type key.

  If no key is provided, the plugin attempts to infer the key from the current route.

The return values are:

```ts
interface Article<T extends Record<string, unknown> = Record<string, unknown>> {
  /** Article path */
  path: string
  /** Article info */
  info: T
}

interface BlogCategoryData<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  /** Category path */
  path: string

  /**
   * Available only when the current route matches a specific item path
   */
  currentItems?: Article<T>[]

  /** Category map */
  map: {
    /** Unique key under current category */
    [key: string]: {
      /** Category path of the key */
      path: string
      /** Category items of the key */
      items: Article<T>[]
    }
  }
}

interface BlogTypeData<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  /** Type path */
  path: string

  /** Items under current type */
  items: Article<T>[]
}
```
