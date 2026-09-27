---
icon: settings-2
---

# Config

## Options

:::: fields
@`getInfo` type=`(page: Page) => Record<string, unknown>`

A function to extract article information from pages.

The extracted information is injected into the route meta, making it accessible via client-side composables.

See also: [Gathering Info](./guide.md#gathering-info).

@`filter` type=`(page: Page) => boolean` default=`(page) => Boolean(page.filePathRelative) && !page.frontmatter.home`

A function to determine which pages are treated as blog articles.

By default, it includes all pages generated from Markdown files, excluding the homepage.

See also: [Article Collection](./guide.md#article-collection).

@`category` type=`BlogCategoryOptions[]`

Category configurations. Each item groups articles by a label, such as a tag or a category.

See also: [Category Configuration](./guide.md#category-configuration).

@@`category[*].key` type=string required

Unique category name.

@@`category[*].getter` type=`(page: Page) => string[]` required

A function to retrieve the categories of a page.

@@`category[*].sorter` type=`(pageA: Page, pageB: Page) => number`

A function to sort the pages of the same category.

@@`category[*].path` type=`string | false` default=`'/:key/'`

The path pattern of the category page, where `:key` is replaced by the slugified category key. Set it to `false` to skip generating the page.

@@`category[*].layout` type=string default=`'Layout'`

The layout name of the category page.

@@`category[*].frontmatter` type=`(localePath: string) => Record<string, unknown>`

The frontmatter of the category page.

@@`category[*].itemPath` type=`string | false | ((name: string) => string)` default=`'/:key/:name/'`

The path pattern of the category item page, where `:key` and `:name` are replaced by the slugified category key and the item name.

It can also be a function that returns the path for a given item name, or `false` to skip generating item pages.

@@`category[*].itemLayout` type=string default=`'Layout'`

The layout name of the category item page.

@@`category[*].itemFrontmatter` type=`(name: string, localePath: string) => Record<string, unknown>`

The frontmatter of the category item page, where `name` is the item name.

@`type` type=`BlogTypeOptions[]`

Type configurations. Each item collects articles matching a condition.

See also: [Type Configuration](./guide.md#type-configuration).

@@`type[*].key` type=string required

Unique type name.

@@`type[*].filter` type=`(page: Page) => boolean` required

A function to determine whether a page belongs to this type.

@@`type[*].sorter` type=`(pageA: Page, pageB: Page) => number`

A function to sort the pages of this type.

@@`type[*].path` type=`string | false` default=`'/:key/'`

The path pattern of the type page, where `:key` is replaced by the slugified type key. Set it to `false` to skip generating the page.

@@`type[*].layout` type=string default=`'Layout'`

The layout name of the type page.

@@`type[*].frontmatter` type=`(localePath: string) => Record<string, unknown>`

The frontmatter of the type page.

@`slugify` type=`(name: string) => string` default=`(name) => name.replaceAll(/[ _]/gu, '-').replaceAll(/[:?*|\\/<>]/gu, '').toLowerCase()`

A function that converts strings into URL-friendly slugs for route registration.

@`excerpt` type=boolean default=`true`

Enables or disables excerpt generation for pages.

See also: [Generating Excerpt](./guide.md#generating-excerpt).

@`excerptSeparator` type=string default=`'<!-- more -->'`

The separator used to manually define excerpts within the content.

See also: [Generating Excerpt](./guide.md#generating-excerpt).

@`excerptLength` type=number default=`300`

The target length for auto-generated excerpts.

See also: [Generating Excerpt](./guide.md#generating-excerpt).

::: tip

The generator will cut the text at the nearest position meeting or exceeding this length.

Set to `0` to disable automatic excerpt generation.

:::

@`excerptFilter` type=`(page: Page) => boolean` default="Same as the filter option"

A function to filter pages for excerpt generation.

See also: [Generating Excerpt](./guide.md#generating-excerpt).

::: tip

Use this to exclude pages from automatic excerpt generation. For instance, if `excerpt` or `description` is already defined in the frontmatter, you might prefer to use those values directly.

:::

@`isCustomElement` type=`(tagName: string) => boolean` default=`() => false`

A function to identify custom elements.

This is used to distinguish custom elements from unknown tags, which are otherwise stripped during excerpt generation.

See also: [Generating Excerpt](./guide.md#generating-excerpt).

@`metaScope` type=string default=`'_blog'`

The key under which the extracted information is injected into the route meta.

::: tip

Setting this to an empty string will inject the information directly into the route meta root, rather than nesting it under a field.

:::

@`hotReload` type=boolean default="Enabled if the --debug flag is used"

Enables hot reload support in the development server.

::: tip To theme developers

This is disabled by default due to potential performance impacts on sites with extensive categories and types. It may also slow down hot updates when editing Markdown.

It is recommended to enable this only when users are actively adding or organizing categories/tags. For general use, keep it disabled.

Alternatively, you can detect the number of pages in the user's project and decide whether to enable it programmatically.

:::

::::

## Composition API

The following APIs are available via `@vuepress/plugin-blog/client`.

- Blog category

  ```ts
  const useBlogCategory: <
    Info extends Record<string, unknown> = Record<string, unknown>,
  >(
    key?: string,
  ) => ComputedRef<BlogCategoryData<Info>>
  ```

  The `key` argument represents the unique category key.

  If no key is provided, the plugin attempts to infer the key from the current route.

- Blog type

  ```ts
  const useBlogType: <
    Info extends Record<string, unknown> = Record<string, unknown>,
  >(
    key?: string,
  ) => ComputedRef<BlogTypeData<Info>>
  ```

  The `key` argument represents the unique type key.

  If no key is provided, the plugin attempts to infer the key from the current route.

The return values are:

```ts
interface Article<
  Info extends Record<string, unknown> = Record<string, unknown>,
> {
  /** Article path */
  path: string
  /** Article info */
  info: Info
}

interface BlogCategoryData<
  Info extends Record<string, unknown> = Record<string, unknown>,
> {
  /** Category path */
  path: string

  /**
   * Available only when the current route matches a specific item path
   */
  currentItems?: Article<Info>[]

  /** Category map */
  map: {
    /** Unique key under current category */
    [key: string]: {
      /** Category path of the key */
      path: string
      /** Category items of the key */
      items: Article<Info>[]
    }
  }
}

interface BlogTypeData<
  Info extends Record<string, unknown> = Record<string, unknown>,
> {
  /** Type path */
  path: string

  /** Items under current type */
  items: Article<Info>[]
}
```
