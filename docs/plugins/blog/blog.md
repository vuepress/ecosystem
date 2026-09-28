---
icon: la:blog
---

# blog

<NpmBadge package="@vuepress/plugin-blog" />

Blog plugin for VuePress, providing article collection, categorization, type filtering, and excerpt generation.

## Usage

```bash
npm i -D @vuepress/plugin-blog@next
```

```ts title=".vuepress/config.ts"
import { blogPlugin } from '@vuepress/plugin-blog'

export default {
  plugins: [
    blogPlugin({
      // options
    }),
  ],
}
```

## Guide

### Article Collection

The [filter](#filter) option determines which pages are treated as blog articles. By default, all pages generated from a Markdown file are articles, except the homepage.

### Gathering Info

The [getInfo](#getinfo) option extracts article metadata from pages. The collected information is injected into the route meta, so it is accessible from the client side.

By default, the information is stored under the `_blog` key of the route meta, which is controlled by the [metaScope](#metascope) option. Setting `metaScope` to an empty string injects the information directly into the root of the route meta.

::: details Demo

```ts title="theme entrance"
import { blogPlugin } from '@vuepress/plugin-blog'

export default {
  name: 'vuepress-theme-xxx',
  plugins: [
    blogPlugin({
      filter: ({ filePathRelative, frontmatter }) => {
        // Exclude pages not generated from files
        if (!filePathRelative) return false

        // Exclude pages in the `archives` directory
        if (filePathRelative.startsWith('archives/')) return false

        // Exclude pages that do not use the default layout
        if (frontmatter.home || frontmatter.layout) return false

        return true
      },

      getInfo: ({ frontmatter, title, git = {}, data = {} }) => {
        // Extract page info
        const info: Record<string, unknown> = {
          title,
          author: frontmatter.author || '',
          categories: frontmatter.categories || [],
          date: frontmatter.date || git.createdTime || null,
          tags: frontmatter.tags || [],
          excerpt: data.excerpt || '',
        }

        return info
      },
    }),
    // other plugins ...
  ],
}
```

:::

### Categories and Types

The plugin organizes articles into two kinds of collections:

- **Category**: groups articles by a label, such as a tag or a category.
- **Type**: collects articles matching a condition, such as starred posts.

Configure them with the [category](#category) and [type](#type) options. The route paths are generated from the keys and the item names with the [slugify](#slugify) function.

#### Category Configuration

Use the [category](#category) option to group articles by a label. For example, to group articles by the `tag` frontmatter, generate a map page at `/tag/` with the `TagMap` layout, and list the articles of each tag at `/tag/:tagName/` with the `TagList` layout:

```ts title="theme entrance"
import { blogPlugin } from '@vuepress/plugin-blog'

export default {
  name: 'vuepress-theme-xxx',
  plugins: [
    blogPlugin({
      // other options ...
      category: [
        {
          key: 'tag',
          getter: ({ frontmatter }) => frontmatter.tag || [],
          path: '/tag/',
          layout: 'TagMap',
          frontmatter: () => ({ title: 'Tag page' }),
          itemPath: '/tag/:name/',
          itemLayout: 'TagList',
          itemFrontmatter: (name) => ({ title: `Tag ${name}` }),
        },
      ],
    }),
    // other plugins ...
  ],
}
```

#### Type Configuration

Use the [type](#type) option to create a list of articles matching a condition. For example, to list the starred articles (marked with `star: true` in the frontmatter) at `/star/` with the `StarList` layout:

```ts title="theme entrance"
import { blogPlugin } from '@vuepress/plugin-blog'

export default {
  name: 'vuepress-theme-xxx',
  plugins: [
    blogPlugin({
      // other options ...
      type: [
        {
          key: 'star',
          filter: ({ frontmatter }) => frontmatter.star,
          path: '/star/',
          layout: 'StarList',
          frontmatter: () => ({ title: 'Star page' }),
        },
      ],
    }),
    // other plugins ...
  ],
}
```

### Generating Excerpt

Excerpt generation is enabled by default and produces an HTML fragment used as a short preview of an article. Note the following limitations:

- Unknown tags, including Vue components, and Vue-specific syntax are removed. Use the [isCustomElement](#iscustomelement) option to preserve custom non-Vue elements.
- Relative paths and aliases of images are removed. Use absolute paths (based on `.vuepress/public`) or full URLs so that images display correctly in excerpts.

The generator first looks for the [excerptSeparator](#excerptseparator) (default `<!-- more -->`) in the content. If no separator is found, it takes the content from the beginning up to [excerptLength](#excerptlength) characters (default `300`), cutting at the nearest position reaching that length. Set `excerptLength` to `0` to disable automatic generation.

Use the [excerptFilter](#excerptfilter) option to control which pages generate excerpts. For example, when `frontmatter.description` is present, you may prefer to use it as the excerpt, so the filter can return `false` for those pages to skip the automatic generation.

### I18n Support

The plugin supports i18n out of the box, and the configuration is applied to every locale. For example, with the following locales:

```ts title=".vuepress/config.ts"
export default {
  locales: {
    '/': {
      lang: 'en-US',
    },
    '/zh/': {
      lang: 'zh-CN',
    },
  },
}
```

The plugin generates `/zh/star/` alongside `/star/`, and each path only shows the articles of its locale.

### Hot Reload

During development, the [hotReload](#hotreload) option rebuilds the blog data on file changes, and it is enabled by default when the `--debug` flag is used.

Enabling it may impact performance on sites with many categories and types, and slow down hot updates when editing Markdown. It is recommended to enable it only when actively adding or organizing categories and tags, or to detect the number of pages and enable it programmatically.

### Client-side Usage

During page generation, the plugin injects the type of the current page into `frontmatter.blog`:

```ts
interface BlogCategoryFrontmatterOptions {
  /** Current page type */
  type: 'category'
  /** Unique key of the current category */
  key: string
  /** Category name, only available in category item pages */
  name?: string
}

interface BlogTypeFrontmatterOptions {
  /** Current page type */
  type: 'type'
  /** Unique key of the current type */
  key: string
}
```

Use the [useBlogCategory](#useblogcategory) and [useBlogType](#useblogtype) composables to get the data bound to the current route, or pass a specific key to get the data of that key. Based on the configurations above, here is how to access the `tag` and `star` data:

`TagMap` layout:

```vue
<script setup lang="ts">
import { useBlogCategory } from '@vuepress/plugin-blog/client'
import { RouteLink } from 'vuepress/client'

const categoryMap = useBlogCategory('tag')
</script>

<template>
  <div>
    <h1>Tag page</h1>
    <ul>
      <li v-for="({ items, path }, name) in categoryMap.map" :key="path">
        <RouteLink :key="name" :to="path" class="category">
          {{ name }}
          <span class="category-num">
            {{ items.length }}
          </span>
        </RouteLink>
      </li>
    </ul>
  </div>
</template>
```

`TagList` layout:

```vue
<script setup lang="ts">
import { useBlogCategory } from '@vuepress/plugin-blog/client'
import { RouteLink } from 'vuepress/client'

const categoryMap = useBlogCategory('tag')
</script>

<template>
  <div>
    <h1>Tag page</h1>
    <div class="category-wrapper">
      <RouteLink
        v-for="({ items, path }, name) in categoryMap.map"
        :key="name"
        :to="path"
        class="category"
      >
        {{ name }}
        <span class="category-num">
          {{ items.length }}
        </span>
      </RouteLink>
    </div>
    <div v-if="categoryMap.currentItems" class="article-wrapper">
      <div v-if="!categoryMap.currentItems.length">No articles found.</div>
      <article
        v-for="{ info, path } in categoryMap.currentItems"
        :key="path"
        class="article"
        @click="$router.push(path)"
      >
        <header class="title">
          {{ info.title }}
        </header>
        <hr />
        <div class="article-info">
          <span v-if="info.author" class="author"
            >Author: {{ info.author }}</span
          >
          <span v-if="info.date" class="date"
            >Date: {{ new Date(info.date).toLocaleDateString() }}</span
          >
          <span v-if="info.category" class="category"
            >Category: {{ info.category.join(', ') }}</span
          >
          <span v-if="info.tag" class="tag"
            >Tag: {{ info.tag.join(', ') }}</span
          >
        </div>
        <div v-if="info.excerpt" class="excerpt" v-html="info.excerpt" />
      </article>
    </div>
  </div>
</template>
```

`StarList` layout:

```vue
<script setup lang="ts">
import { useBlogType } from '@vuepress/plugin-blog/client'

const stars = useBlogType('star')
</script>

<template>
  <div v-if="stars.items?.length" class="article-wrapper">
    <article
      v-for="{ info, path } in stars.items"
      :key="path"
      class="article"
      @click="$router.push(path)"
    >
      <header class="title">
        {{ info.title }}
      </header>
      <hr />
      <div class="article-info">
        <span v-if="info.author" class="author">Author: {{ info.author }}</span>
        <span v-if="info.date" class="date"
          >Date: {{ new Date(info.date).toLocaleDateString() }}</span
        >
        <span v-if="info.category" class="category"
          >Category: {{ info.category.join(', ') }}</span
        >
        <span v-if="info.tag" class="tag">Tag: {{ info.tag.join(', ') }}</span>
      </div>
      <div v-if="info.excerpt" class="excerpt" v-html="info.excerpt" />
    </article>
  </div>
  <div v-else>No articles found.</div>
</template>
```

See also: [Composables](#composables).

## Options

::: fields
@`getInfo` type=`(page: Page) => Record<string, unknown>` default=`() => ({})`

A function to extract article information from pages.

The information is injected into the route meta, making it accessible via the client-side composables.

See also: [Gathering Info](#gathering-info).

@`filter` type=`(page: Page) => boolean` default=`(page) => Boolean(page.filePathRelative) && !page.frontmatter.home`

A function to determine which pages are treated as blog articles.

See also: [Article Collection](#article-collection).

@`category` type=`BlogCategoryOptions[]` default=`[]`

The category configurations, each grouping articles by a label such as a tag or a category.

See also: [Category Configuration](#category-configuration).

@@`category[*].key` type=string required

The unique category name.

@@`category[*].getter` type=`(page: Page) => string[]` required

A function to get the categories of a page.

@@`category[*].sorter` type=`(pageA: Page, pageB: Page) => number`

A function to sort the pages of the same category.

@@`category[*].path` type=`string | false` default=`'/:key/'`

The path pattern of the category page, where `:key` is replaced by the slugified category key. Set it to `false` to skip generating the page.

@@`category[*].layout` type=string default=`'Layout'`

The layout name of the category page.

@@`category[*].frontmatter` type=`(localePath: string) => Record<string, unknown>`

The frontmatter of the category page.

@@`category[*].itemPath` type=`string | false | ((name: string) => string)` default=`'/:key/:name/'`

The path pattern of the category item page, where `:key` and `:name` are replaced by the slugified category key and item name. It can also be a function returning the path for an item name, or `false` to skip generating item pages.

@@`category[*].itemLayout` type=string default=`'Layout'`

The layout name of the category item page.

@@`category[*].itemFrontmatter` type=`(name: string, localePath: string) => Record<string, unknown>`

The frontmatter of the category item page, where `name` is the item name.

@`type` type=`BlogTypeOptions[]` default=`[]`

The type configurations, each collecting the articles matching a condition.

See also: [Type Configuration](#type-configuration).

@@`type[*].key` type=string required

The unique type name.

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

A function to convert strings into URL-friendly slugs for route registration.

See also: [Categories and Types](#categories-and-types).

@`excerpt` type=boolean default=`true`

Whether to generate excerpts for pages.

See also: [Generating Excerpt](#generating-excerpt).

@`excerptSeparator` type=string default=`'<!-- more -->'`

The separator used to define an excerpt manually in the content.

See also: [Generating Excerpt](#generating-excerpt).

@`excerptLength` type=number default=`300`

The target length of the auto-generated excerpts.

See also: [Generating Excerpt](#generating-excerpt).

@`excerptFilter` type=`(page: Page) => boolean` default="Same as the `filter` option"

A function to filter the pages that generate excerpts.

See also: [Generating Excerpt](#generating-excerpt).

@`isCustomElement` type=`(tagName: string) => boolean` default=`() => false`

A function to identify custom elements, used to distinguish them from the unknown tags that are stripped during excerpt generation.

See also: [Generating Excerpt](#generating-excerpt).

@`metaScope` type=string default=`'_blog'`

The key of the route meta under which the information extracted by [getInfo](#getinfo) is injected.

See also: [Gathering Info](#gathering-info).

@`hotReload` type=boolean default="Enabled when the `--debug` flag is used"

Whether to enable hot reload in the development server.

See also: [Hot Reload](#hot-reload).

:::

## Composables

The following composables are available via `@vuepress/plugin-blog/client`.

### useBlogCategory

```ts
const useBlogCategory: <
  Info extends Record<string, unknown> = Record<string, unknown>,
>(
  key?: string,
) => ComputedRef<BlogCategoryData<Info>>
```

Returns the category data bound to the current route, or to the given `key`. When no key is given, the plugin infers it from the current route.

### useBlogType

```ts
const useBlogType: <
  Info extends Record<string, unknown> = Record<string, unknown>,
>(
  key?: string,
) => ComputedRef<BlogTypeData<Info>>
```

Returns the type data bound to the current route, or to the given `key`. When no key is given, the plugin infers it from the current route.

### Return Types

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
    /** Unique key under the current category */
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

  /** Items under the current type */
  items: Article<Info>[]
}
```
