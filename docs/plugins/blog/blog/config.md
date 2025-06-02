---
icon: settings-2
---

# Config

## Plugin Options

### getInfo

- Type: `(page: Page) => Record<string, unknown>`
- Reference:
  - [Guide → Article Collection](./guide.md#gathering-info)
- Details:

  Function to extract article information from pages.

  Article info will be injected into route meta, making it available in client composables.

### filter

- Type: `(page: Page) => boolean`
- Default: `(page) => Boolean(page.filePathRelative) && !page.frontmatter.home`
- Reference:
  - [Guide → Article Collection](./guide.md#collecting-articles)
- Details:

  Function to filter pages for blog articles.

  By default, all pages generated from Markdown files except homepage are included.

### category

- Type: `BlogCategoryOptions[]`
- Reference:
  - [Guide → Categories and Types](./guide.md#customizing-categories-and-types)
- Details: Category configurations. See [Category Config](#blog-category-config).

### type

- Type: `BlogTypeOptions[]`
- Reference:
  - [Guide → Categories and Types](./guide.md#customizing-categories-and-types)
- Details: Type configurations. See [Type Config](#blog-type-config).

### slugify

- Type: `(name: string) => string`
- Default: `(name) => name.replace(/ _/g, '-').replace(/[:?*|\\/<>]/g, "").toLowerCase()`
- Details: Function to convert strings to URL-friendly slugs for route registration.

### excerpt

- Type: `boolean`
- Default: `true`
- Reference: [Guide → Excerpt Generation](./guide.md#generating-excerpt)
- Details: Whether to generate excerpt for pages.

### excerptSeparator

- Type: `string`
- Default: `<!-- more -->`
- Reference:
  - [Guide → Excerpt Generation](./guide.md#generating-excerpt)
- Details: Separator for manual excerpt in content.

### excerptLength

- Type: `number`
- Default: `300`
- Reference:
  - [Guide → Excerpt Generation](./guide.md#generating-excerpt)
- Details:

  Target length for auto-generated excerpts.

  ::: tip

  Excerpt length will be the minimal possible length reaching this value.

  Set to `0` to disable auto excerpt generation.

  :::

### excerptFilter

- Type: `(page: Page) => boolean`
- Default: Same as `filter` option
- Reference:
  - [Guide → Excerpt Generation](./guide.md#generating-excerpt)
- Details:

  Function to filter pages for excerpt generation.

  ::: tip

  Use this to skip pages that don't need excerpt generation. For example, if users set `excerpt` or `description` in frontmatter, you may want to use them directly.

  :::

### isCustomElement

- Type: `(tagName: string) => boolean`
- Default: `() => false`
- Reference:
  - [Guide → Generating Excerpt](./guide.md#generating-excerpt)
- Details:

  Tags which is considered as custom elements.

  This is used to determine whether a tag is a custom element since all unknown tags are removed in excerpt.

### metaScope

- Type: `string`
- Default: `"_blog"`
- Details:

  Key used when injecting info to route meta.

  ::: tip

  Setting to an empty key will inject to route meta directly instead of a field.

  :::

### hotReload

- Type: `boolean`
- Default: Whether using `--debug` flag
- Details:

  Whether enable hotReload in devServer.

  ::: tip To theme developers

  It's disabled by default because it does have performance impact in sites with a lot of categories and types. And it can slow down hotReload speed when editing Markdown.

  If users are adding or organizing your categories or tags, you may tell them to enable this, for the rest it's better to keep it disabled.

  Also, you can try to detect number of pages in users project and decide whether to enable it.

  :::

## Blog Category Config

Blog category config should be an array, while each item is controlling a "category" rule.

```ts
interface BlogCategoryOptions {
  /**
   * Unique category name
   */
  key: string

  /**
   * Function getting category from page
   */
  getter: (page: Page) => string[]

  /**
   * A custom function to sort the pages
   */
  sorter?: (pageA: Page, pageB: Page) => number

  /**
   * Path pattern of page to be registered
   *
   * @description `:key` will be replaced by the "slugify" result of the original key
   *
   * @default `/:key/`
   */
  path?: string

  /**
   * Page layout name
   *
   * @default 'Layout'
   */
  layout?: string

  /**
   * Frontmatter
   */
  frontmatter?: (localePath: string) => Record<string, string>

  /**
   * Item page path pattern or custom function to be registered
   *
   * @description When filling in a string, `:key` and `:name` will be replaced by the "slugify" result of the original key and name
   *
   * @default `/:key/:name/`
   */
  itemPath?: string | ((name: string) => string)

  /**
   * Item page layout name
   *
   * @default 'Layout'
   */
  itemLayout?: string

  /**
   * Items Frontmatter
   */
  itemFrontmatter?: (name: string, localePath: string) => Record<string, string>
}
```

## Blog Type Config

Blog type config should be an array, while each item is controlling a "type" rule.

```ts
interface BlogTypeOptions {
  /**
   * Unique type name
   */
  key: string

  /**
   * A filter function to determine whether a page should be the type
   */
  filter: (page: Page) => boolean

  /**
   * A custom function to sort the pages
   */
  sorter?: (pageA: Page, pageB: Page) => number

  /**
   * Page path to be registered
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
   * Frontmatter
   */
  frontmatter?: (localePath: string) => Record<string, string>
}
```

## Composition API

You can import the following API from `@vuepress/plugin-blog/client`.

- Blog category

  ```ts
  const useBlogCategory: <
    T extends Record<string, unknown> = Record<string, unknown>,
  >(
    key?: string,
  ) => ComputedRef<BlogCategoryData<T>>
  ```

  Argument `key` should be the category unique key.

  If no key is passed, the plugin will try to use the key in current path.

- Blog category

  ```ts
  const useBlogType: <
    T extends Record<string, unknown> = Record<string, unknown>,
  >(
    key?: string,
  ) => ComputedRef<BlogTypeData<T>>
  ```

  Argument `key` should be the type unique key.

  If no key is passed, the plugin will try to use the key in current path.

Returning values are:

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
   * Only available when current route matches an item path
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
