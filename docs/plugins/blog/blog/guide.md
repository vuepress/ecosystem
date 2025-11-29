---
icon: lightbulb
---

# Guide

Empowers VuePress themes with blog functionality, including article collection, categorization, and excerpt generation.

## Article Collection

The plugin uses the `filter` option to determine which pages should be treated as articles.

::: tip
By default, all pages generated from Markdown files are considered articles, excluding the homepage.
:::

## Gathering Info

Use the `getInfo` option to define a function that extracts article metadata from pages.

The plugin injects this collected information into the `routeMeta` field, making it accessible via the Composition API.

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

## Customizing Categories and Types

This plugin allows you to organize articles into two primary collection types:

- **Category**: Groups articles based on labels (e.g., Tags, Categories).
- **Type**: Filters articles based on specific conditions (e.g., "Diary" entries, "Starred" posts).

You can configure these using the `category` and `type` array options.

### Category Configuration

Use the `category` option to create label-based groupings.

For example, if you want to group articles by "tags" defined in the frontmatter, generate a map page at `/tag/` (using a `TagMap` layout), and list articles for specific tags at `/tag/:tagName` (using a `TagList` layout), you would use the following configuration:

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

### Type Configuration

Use the `type` option to create specific collection lists.

For example, to display a list of "Starred" articles (marked by `star: true` in the frontmatter) at `/star/` using a `StarList` layout:

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

For a complete list of options, please refer to the [Category Config](./config.md#blog-category-config) and [Type Config](./config.md#blog-type-config).

## Using Composition API in Client-side

During page generation, the plugin injects the following information into `frontmatter.blog`:

```ts
interface BlogFrontmatterOptions {
  /** Current type of the page */
  type: 'category' | 'type'
  /** Unique key under current category or tag */
  key: string
  /**
   * Current category name
   *
   * @description Only available in category item page
   */
  name?: string
}
```

You can use the `useBlogCategory()` and `useBlogType()` hooks to retrieve the data bound to the current route. Alternatively, you can pass a specific `key` as an argument to retrieve data associated with that key.

Based on the configuration examples above, here is how you can access "tag" and "star" data on the client side:

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
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'

import ArticleList from '../components/ArticleList.vue'

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

For details on return types, please refer to [Composition API Return Types](./config.md#composition-api).

## I18n Support

This plugin features native Internationalization (i18n) support. Your configurations are automatically applied to each locale.

For example, if you define the following locales in your config:

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

The plugin will automatically generate `/zh/star/` alongside `/star/`. Each path will only display articles belonging to the corresponding locale.

## Generating Excerpt

The plugin includes a built-in excerpt generator, which can be enabled by setting `excerpt: true`.

::: tip Excerpt Limitations

An excerpt is an HTML fragment used to display a short preview of an article. Please note the following restrictions:

- **Syntax Support**: Unknown tags (including Vue components) and Vue-specific syntax will be removed during generation. To preserve custom non-Vue elements, use the `isCustomElement` option.
- **Assets**: As excerpts are HTML fragments, relative paths and aliases for images will be removed. To ensure images display correctly in excerpts, use absolute paths (based on `.vuepress/public`) or full URLs.

:::

The generator prioritizes the use of a separator to determine the excerpt. The default separator is `<!-- more -->`, which can be customized via the `excerptSeparator` option.

If no valid separator is found, the generator extracts content from the beginning of the file up to a specified length (default: `300` characters). This length can be adjusted using the `excerptLength` option.

To control which pages should generate excerpts, use the `excerptFilter` option.

::: tip Example

You may prefer to use `frontmatter.description` as excerpt when available, you can configure the filter function to return `false` whenever `frontmatter.description` is present, skipping the automatic generation for those pages.

:::
