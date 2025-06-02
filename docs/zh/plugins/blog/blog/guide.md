---
icon: lightbulb
---

# 指南

为 VuePress 主题添加博客功能，包括文章收集、分类和摘要生成。

## 收集文章

插件通过 `filter` 选项过滤页面，以确定哪些页面应被视为文章。

::: tip
默认情况下，所有从 Markdown 文件生成但不是主页的页面，都将被视作文章。
:::

## 收集信息

设置 `getInfo` 选项为从页面中提取文章信息的函数。

插件会将收集到的信息注入到 `routeMeta` 字段中，使其可通过组合式 API 获取。

::: details 示例

```ts title="主题入口"
import { blogPlugin } from '@vuepress/plugin-blog'

export default {
  name: 'vuepress-theme-xxx',
  plugins: [
    blogPlugin({
      filter: ({ filePathRelative, frontmatter }) => {
        // 舍弃那些不是从 Markdown 文件生成的页面
        if (!filePathRelative) return false

        // 舍弃 `archives` 文件夹的页面
        if (filePathRelative.startsWith('archives/')) return false

        // 舍弃那些没有使用默认布局的页面
        if (frontmatter.home || frontmatter.layout) return false

        return true
      },

      getInfo: ({ frontmatter, title, git = {}, data = {} }) => {
        // 获取页面信息
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
    // 其他插件 ...
  ],
}
```

:::

## 自定义类别和类型

基本上，你的博客中需要两种“类型”:

- 类别:

  “类别”是用文章的标签 (或类别) 对它们进行分组。

  例如，每篇文章可能都有对应的“分类”和“标签”。

- 类型:

  “类型”是过滤不同条件的文章。

  例如，你的帖子中可能有日记或笔记。当帖子带有写作日期信息时，它可以称为“时间线项目”。

了解这两种类型的描述后，你可以设置 `category` 和 `type` 选项，它们都接受一个数组，每个元素代表一个配置。

让我们从此处 2 个例子开始。

假设你想为每篇文章设置标签，并且你正在通过页面 frontmatter 中的 `tag` 字段设置它们。你想要在 `/tag/` 中使用 `TagMap` 布局的标签映射页面，并在 `/tag/tagName` 中使用 `TagList` 布局按标签名称分组每个标签列表，你可能需要这样的配置：

```ts title="主题入口"
import { blogPlugin } from '@vuepress/plugin-blog'

export default {
  name: 'vuepress-theme-xxx',
  plugins: [
    blogPlugin({
      // 其他配置 ...
      category: [
        {
          key: 'tag',
          getter: ({ frontmatter }) => frontmatter.tag || [],
          path: '/tag/',
          layout: 'TagMap',
          frontmatter: () => ({ title: '标签页' }),
          itemPath: '/tag/:name/',
          itemLayout: 'TagList',
          itemFrontmatter: (name) => ({ title: `标签 ${name}` }),
        },
      ],
    }),
    // 其他插件 ...
  ],
}
```

此外，你可能希望为你的一些文章加注星标并将其展示给访问者。当你在 frontmatter 中设置 `star: true` 来标记它们时，你可能需要这样的配置来在 `/star/` 路径中以 `StarList` 布局显示它们：

```ts title="主题入口"
import { blogPlugin } from '@vuepress/plugin-blog'

export default {
  name: 'vuepress-theme-xxx',
  plugins: [
    blogPlugin({
      // 其他配置 ...
      type: [
        {
          key: 'star',
          filter: ({ frontmatter }) => frontmatter.star,
          path: '/star/',
          layout: 'StarList',
          frontmatter: () => ({ title: '星标文章' }),
        },
      ],
    }),
    // 其他插件 ...
  ],
}
```

看，设置这两种类型很容易。有关完整选项，请参阅[博客分类配置](./config.md#博客分类配置)和[博客类型配置](./config.md#博客类型配置)。

## 在客户端使用组合 API

当生成每个页面时，插件将在 `frontmatter.blog` 中设置如下信息：

```ts
interface BlogFrontmatterOptions {
  /** 当前页面的类型 */
  type: 'category' | 'type'
  /** 在当前分类或类别下全局唯一的 key */
  key: string
  /**
   * 当前的分类名称
   *
   * @description 仅在分类子项目页面中可用
   */
  name?: string
}
```

所以你可以直接调用 `useBlogCategory()` 和 `useBlogType()`，结果将是当前路由绑定的类别或类型。

此外，你可以通过传递所需的 `key` 作为参数，来获得绑定到该 `key` 的信息。

对于上方的 Node 配置而言，你可以在客户端通过如下方式获取 tag 和 star 的信息：

`TagMap` 布局:

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

`TagList` 布局:

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

`StarList` 布局:

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

有关返回类型，请参阅 [Composition API 返回类型](./config.md#可组合式-API)。

## 多语言支持

该插件添加了原生多语言支持，因此你的设置将自动应用于每种语言。

例如，如果用户进行了以下 locales 配置，并且你正在设置上面的“star”示例:

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

那么 `/zh/star/` 和 `/star/` 都将可用，并且只会显示对应语言下的文章。

## 摘要生成

这个插件提供了一个内置的摘要生成器，可以通过将 `excerpt` 选项设置为 `true` 来启用。

::: tip 摘要介绍

摘要是一个 HTML 片段，被用于在博客列表中显示文章的简短描述，所以摘要有如下限制:

- 摘要不支持任何未知标签以及 Vue 语法，所以此类内容会在生成时被移除。如果你有自定义组件 (非 Vue 组件)，请配置 `isCustomElement` 选项。
- 由于摘要是一个 HTML 片段，所以你将无法通过相对路径或别名引入任何图片，这些图片会被直接移除。如果你想要保留图片，请使用基于 `.vuepress/public` 的绝对路径或完整路径以确保它们可以在其他地址被访问。

:::

摘要生成器将尝试从 Frontmatter 内容中找到有效的摘要分隔符，如果找到，它将使用分隔符之前的内容，分隔符默认为 `<!-- more -->`，并且你可以通过 `excerptSeparator` 选项来自定义它。

如果找不到有效的分隔符，它将从 Markdown 文件的开头开始解析内容，直到长度达到预设值时停止。该值默认为 `300`，你可以通过设置 `excerptLength` 选项来自定义它。

要选择哪个页面应该生成摘要，你可以使用 `excerptFilter` 选项。

::: tip 示例

通常，如果用户设置了 `frontmatter.description`，你可能希望使用它们，因此如果 `frontmatter.description` 不为空，你可以让过滤器函数返回 `false`。

:::
