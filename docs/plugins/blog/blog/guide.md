---
icon: lightbulb
---

# Guide

Adds blog functionality to VuePress themes with article collection, categorization, and excerpt generation.

## Article Collection

The plugin filters pages using the `filter` option to determine which pages should be treated as articles.

::: tip
By default, all pages generated from Markdown files except the homepage are considered articles.
:::

## Gathering Info

Set the `getInfo` option with a function that extracts article information from pages.

The plugin injects collected information into the `routeMeta` field, making it available through Composition API.

::: details Demo

```ts title="theme entrance"
import { blogPlugin } from '@vuepress/plugin-blog'

export default {
  name: 'vuepress-theme-xxx',
  plugins: [
    blogPlugin({
      filter: ({ filePathRelative, frontmatter }) => {
        // drop those pages which is NOT generated from file
        if (!filePathRelative) return false

        // drop those pages in `archives` directory
        if (filePathRelative.startsWith('archives/')) return false

        // drop those pages which do not use default layout
        if (frontmatter.home || frontmatter.layout) return false

        return true
      },

      getInfo: ({ frontmatter, title, git = {}, data = {} }) => {
        // get page info
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

Basically, you would want 2 types of collections in your blog:

- Category:

  "Category" means grouping articles with their labels.

  For example, each article may have "categories" and "tags".

- Type:

  "Type" means identifying articles with conditions.

  For example, you may want to describe some of your articles as diary.

After understanding the description of these 2 types, you can set the `category` and `type` options, each accepts an array, and each element represents a configuration.

Let's start with 2 examples here.

Imagine you are setting tags for each article with the `tag` field in page frontmatter. You want a tag mapping page in `/tag/` with `TagMap` layout, and group each tag list with tagName in `/tag/tagName` with `TagList` layout, you probably need a configuration like this:

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

Also, you may want to star some of your articles and display them to visitors. When you are setting `star: true` in frontmatter to mark them, you probably need a configuration like this to display them in the `/star/` path with `StarList` layout:

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

See, setting these 2 types is easy. For full options, please see [Category Config](./config.md#blog-category-config) and [Type Config](./config.md#blog-type-config).

## Using Composition API in Client-side

When generating each page, the plugin will set the following information under `frontmatter.blog`:

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

So you can invoke `useBlogCategory()` and `useBlogType()` directly, and the result will be the category or type bound to the current route.

Also, you can pass the `key` you want as an argument, then you will get information bound to that key.

So with the node side settings above, you can get information about "tag" and "star" in the client side:

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
      <div v-if="!categoryMap.currentItems.length">Nothing in here.</div>
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
  <div v-else>Nothing in here.</div>
</template>
```

For return types, please see [Composition API Return Types](./config.md#composition-api).

## I18n Support

This plugin adds native i18n support, so your settings will be automatically applied to each language.

For example, if the user has the following locales config, and you are setting the "star" example above:

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

Then `/zh/star/` and `/star/` will both be available, and only articles under the correct locale will appear.

## Generating Excerpt

This plugin provides a built-in excerpt generator, which can be enabled by setting the `excerpt` option to `true`.

::: tip Excerpt introduction

An excerpt is an HTML fragment that is used to display a short description of an article in the blog list, so the excerpt has the following restrictions:

- It doesn't support any unknown tags (including all Vue components) and Vue syntax, so these contents will be removed when generating. If you have custom components (non-Vue components), set the `isCustomElement` option.
- Since the excerpt is an HTML fragment, you will not be able to import any images via relative paths or aliases, they will be removed directly. If you want to keep images, please use absolute paths based on `.vuepress/public` or full URLs to ensure they can be accessed in other places.

:::

The excerpt generator will try to find a valid excerpt separator from markdown contents, if it finds one, it will use content before the separator. The separator is default `<!-- more -->`, and you can customize it by setting the `excerptSeparator` option.

If it cannot find a valid separator, it will parse content from the beginning of the markdown file, and stop till its length reaches a preset value. The value is default `300`, and you can customize it by setting the `excerptLength` option.

To choose which page should generate excerpt, you can use the `excerptFilter` option.

::: tip Example

Normally you may want to use `frontmatter.description` if users set them, so you can let the filter function return `false` if `frontmatter.description` is not empty.

:::
