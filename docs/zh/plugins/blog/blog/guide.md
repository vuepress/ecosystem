---
icon: lightbulb
---

# 指南

为 VuePress 主题赋予博客功能，包含文章收集、分类和摘要生成。

## 文章收集

插件使用 `filter` 选项来决定哪些页面应被视为文章。

::: tip
默认情况下，除主页外，所有从 Markdown 文件生成的页面都被视为文章。
:::

## 收集信息

使用 `getInfo` 选项定义一个函数，用于从页面中提取文章元数据。

插件会将收集到的信息注入 `routeMeta` 字段，使其可以通过组合式 API (Composition API) 访问。

::: details 示例

```ts title="主题入口"
import { blogPlugin } from '@vuepress/plugin-blog'

export default {
  name: 'vuepress-theme-xxx',
  plugins: [
    blogPlugin({
      filter: ({ filePathRelative, frontmatter }) => {
        // 排除非文件生成的页面
        if (!filePathRelative) return false

        // 排除 `archives` 目录下的页面
        if (filePathRelative.startsWith('archives/')) return false

        // 排除未使用默认布局的页面
        if (frontmatter.home || frontmatter.layout) return false

        return true
      },

      getInfo: ({ frontmatter, title, git = {}, data = {} }) => {
        // 提取页面信息
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

## 自定义分类与类型 (Customizing Categories and Types)

本插件允许你将文章组织成两种主要的集合类型：

- **Category (分类)**：基于标签（如“标签”、“分类”）对文章进行分组。
- **Type (类型)**：基于特定条件筛选文章（如“日记”条目、“星标”文章）。

你可以使用 `category` 和 `type` 数组选项进行配置。

### Category 配置

使用 `category` 选项创建基于标签的分组。

例如，如果你想根据 Frontmatter 中定义的 `tags` 对文章进行分组，在 `/tag/` 生成一个映射页面（使用 `TagMap` 布局），并在 `/tag/:tagName` 列出特定标签的文章（使用 `TagList` 布局），你可以使用以下配置：

```ts title="主题入口"
import { blogPlugin } from '@vuepress/plugin-blog'

export default {
  name: 'vuepress-theme-xxx',
  plugins: [
    blogPlugin({
      // 其他选项 ...
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

### Type 配置

使用 `type` 选项创建特定的集合列表。

例如，要在 `/star/` 路径下使用 `StarList` 布局显示“星标”文章列表（在 Frontmatter 中标记为 `star: true`）：

```ts title="主题入口"
import { blogPlugin } from '@vuepress/plugin-blog'

export default {
  name: 'vuepress-theme-xxx',
  plugins: [
    blogPlugin({
      // 其他选项 ...
      type: [
        {
          key: 'star',
          filter: ({ frontmatter }) => frontmatter.star,
          path: '/star/',
          layout: 'StarList',
          frontmatter: () => ({ title: '星标页面' }),
        },
      ],
    }),
    // 其他插件 ...
  ],
}
```

如需完整的选项列表，请参阅 [Category 配置](./config.md#blog-category-config) 和 [Type 配置](./config.md#blog-type-config)。

## 在客户端使用组合式 API

在页面生成过程中，插件会将以下信息注入到 `frontmatter.blog` 中：

```ts
interface BlogFrontmatterOptions {
  /** 当前页面的类型 */
  type: 'category' | 'type'
  /** 当前分类或标签下的唯一 key */
  key: string
  /**
   * 当前分类名称
   *
   * @description 仅在分类子项页面可用
   */
  name?: string
}
```

你可以使用 `useBlogCategory()` 和 `useBlogType()` 钩子来获取绑定到当前路由的数据。或者，你可以传递一个特定的 `key` 作为参数来检索与该 key 相关的数据。

基于上面的配置示例，以下是如何在客户端获取标签和星标信息的方法：

`TagMap` 布局：

```vue
<script setup lang="ts">
import { useBlogCategory } from '@vuepress/plugin-blog/client'
import { RouteLink } from 'vuepress/client'

const categoryMap = useBlogCategory('tag')
</script>

<template>
  <div>
    <h1>标签页</h1>
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

`TagList` 布局：

```vue
<script setup lang="ts">
import { useBlogCategory } from '@vuepress/plugin-blog/client'
import { RouteLink } from 'vuepress/client'

const categoryMap = useBlogCategory('tag')
</script>

<template>
  <div>
    <h1>标签页</h1>
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
      <div v-if="!categoryMap.currentItems.length">这里没有文章。</div>
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
          <span v-if="info.author" class="author">作者: {{ info.author }}</span>
          <span v-if="info.date" class="date"
            >日期: {{ new Date(info.date).toLocaleDateString() }}</span
          >
          <span v-if="info.category" class="category"
            >分类: {{ info.category.join(', ') }}</span
          >
          <span v-if="info.tag" class="tag"
            >标签: {{ info.tag.join(', ') }}</span
          >
        </div>
        <div v-if="info.excerpt" class="excerpt" v-html="info.excerpt" />
      </article>
    </div>
  </div>
</template>
```

`StarList` 布局：

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
        <span v-if="info.author" class="author">作者: {{ info.author }}</span>
        <span v-if="info.date" class="date"
          >日期: {{ new Date(info.date).toLocaleDateString() }}</span
        >
        <span v-if="info.category" class="category"
          >分类: {{ info.category.join(', ') }}</span
        >
        <span v-if="info.tag" class="tag">标签: {{ info.tag.join(', ') }}</span>
      </div>
      <div v-if="info.excerpt" class="excerpt" v-html="info.excerpt" />
    </article>
  </div>
  <div v-else>这里没有文章。</div>
</template>
```

关于返回类型详情，请参阅 [组合式 API 返回类型](./config.md#composition-api)。

## 国际化支持

本插件支持原生国际化。你的配置会自动应用于每个语言环境。

例如，如果你在配置中定义了以下语言环境：

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

插件将自动生成 `/zh/star/` 和 `/star/`。每个路径下只会显示属于对应语言环境的文章。

## 生成摘要

本插件包含一个内置的摘要生成器，通过设置 `excerpt: true` 启用。

::: tip 摘要的限制

摘要是一个用于展示文章简短预览的 HTML 片段。请注意以下限制：

- **语法支持**：未知标签（包括 Vue 组件）和 Vue 特有的语法将在生成过程中被移除。若要保留自定义非 Vue 元素，请使用 `isCustomElement` 选项。
- **资源引用**：由于摘要是 HTML 片段，图片相对路径和别名将被移除。为确保图片在摘要中正确显示，请使用绝对路径（基于 `.vuepress/public`）或完整的 URL。

:::

生成器优先使用分隔符来确定摘要。默认分隔符为 `<!-- more -->`，可以通过 `excerptSeparator` 选项进行自定义。

如果未找到有效的分隔符，生成器将提取文件开头的内容，直到达到指定长度（默认：`300` 个字符）。该长度可以通过 `excerptLength` 选项调整。

若要控制哪些页面需要生成摘要，请使用 `excerptFilter` 选项。

::: tip 示例

你可能更倾向于在 `frontmatter.description` 存在时直接使用它作为摘要，你可以配置过滤函数，当 `frontmatter.description` 存在时返回 `false`，从而跳过这些页面的自动生成。

:::
