---
url: /plugins/blog/blog/config.md
---
# Config

## Plugin Options

### getInfo

* Type: `(page: Page) => Record<string, unknown>`
* Reference:
  * [Guide → Article Collection](./guide.md#gathering-info)
* Details:

  A function to extract article information from pages.

  The extracted information is injected into the route meta, making it accessible via client-side composables.

### filter

* Type: `(page: Page) => boolean`
* Default: `(page) => Boolean(page.filePathRelative) && !page.frontmatter.home`
* Reference:
  * [Guide → Article Collection](./guide.md#collecting-articles)
* Details:

  A function to determine which pages are treated as blog articles.

  By default, it includes all pages generated from Markdown files, excluding the homepage.

### category

* Type: `BlogCategoryOptions[]`
* Reference:
  * [Guide → Categories and Types](./guide.md#customizing-categories-and-types)
* Details: Category configurations. See [Category Config](#blog-category-config).

### type

* Type: `BlogTypeOptions[]`
* Reference:
  * [Guide → Categories and Types](./guide.md#customizing-categories-and-types)
* Details: Type configurations. See [Type Config](#blog-type-config).

### slugify

* Type: `(name: string) => string`
* Default: `(name) => name.replace(/ _/g, '-').replace(/[:?*|\\/<>]/g, "").toLowerCase()`
* Details: A function that converts strings into URL-friendly slugs for route registration.

### excerpt

* Type: `boolean`
* Default: `true`
* Reference: [Guide → Excerpt Generation](./guide.md#generating-excerpt)
* Details: Enables or disables excerpt generation for pages.

### excerptSeparator

* Type: `string`
* Default: `<!-- more -->`
* Reference:
  * [Guide → Excerpt Generation](./guide.md#generating-excerpt)
* Details: The separator used to manually define excerpts within the content.

### excerptLength

* Type: `number`
* Default: `300`
* Reference:
  * [Guide → Excerpt Generation](./guide.md#generating-excerpt)
* Details:

  The target length for auto-generated excerpts.

  ::: tip

  The generator will cut the text at the nearest position meeting or exceeding this length.

  Set to `0` to disable automatic excerpt generation.

  :::

### excerptFilter

* Type: `(page: Page) => boolean`
* Default: Same as the `filter` option
* Reference:
  * [Guide → Excerpt Generation](./guide.md#generating-excerpt)
* Details:

  A function to filter pages for excerpt generation.

  ::: tip

  Use this to exclude pages from automatic excerpt generation. For instance, if `excerpt` or `description` is already defined in the frontmatter, you might prefer to use those values directly.

  :::

### isCustomElement

* Type: `(tagName: string) => boolean`
* Default: `() => false`
* Reference:
  * [Guide → Generating Excerpt](./guide.md#generating-excerpt)
* Details:

  A function to identify custom elements.

  This is used to distinguish custom elements from unknown tags, which are otherwise stripped during excerpt generation.

### metaScope

* Type: `string`
* Default: `"_blog"`
* Details:

  The key under which the extracted information is injected into the route meta.

  ::: tip

  Setting this to an empty string will inject the information directly into the route meta root, rather than nesting it under a field.

  :::

### hotReload

* Type: `boolean`
* Default: Enabled if the `--debug` flag is used
* Details:

  Enables hot reload support in the development server.

  ::: tip To theme developers

  This is disabled by default due to potential performance impacts on sites with extensive categories and types. It may also slow down hot updates when editing Markdown.

  It is recommended to enable this only when users are actively adding or organizing categories/tags. For general use, keep it disabled.

  Alternatively, you can detect the number of pages in the user's project and decide whether to enable it programmatically.

  :::

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
   * @description `:key` will be replaced by the "slugify" result of the original key
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
   * @description When providing a string, `:key` and `:name` will be replaced by the "slugify" result of the original key and name
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

* Blog category

  ```ts
  const useBlogCategory: <
    T extends Record<string, unknown> = Record<string, unknown>,
  >(
    key?: string,
  ) => ComputedRef<BlogCategoryData<T>>
  ```

  The `key` argument represents the unique category key.

  If no key is provided, the plugin attempts to infer the key from the current route.

* Blog type

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
