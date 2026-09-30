---
icon: la:blog
---

# blog

<NpmBadge package="@vuepress/plugin-blog" />

为 VuePress 提供博客功能的插件，包括文章收集、分类、类型过滤和摘要生成。

## 使用 {#usage}

```bash
npm i -D @vuepress/plugin-blog@next
```

```ts title=".vuepress/config.ts"
import { blogPlugin } from '@vuepress/plugin-blog'

export default {
  plugins: [
    blogPlugin({
      // 选项
    }),
  ],
}
```

## 指南 {#guide}

### 文章收集 {#article-collection}

[filter](#filter) 选项决定哪些页面被视为博客文章。默认情况下，除首页外，所有由 Markdown 文件生成的页面都是文章。

### 收集信息 {#gathering-info}

[getInfo](#getinfo) 选项用于从页面中提取文章元数据。收集到的信息会被注入到路由元数据中，因此可以在客户端访问。

默认情况下，信息存储在路由元数据的 `_blog` 键下，该键由 [metaScope](#metascope) 选项控制。将 `metaScope` 设置为空字符串会直接将信息注入到路由元数据的根对象中。

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

### 分类与类型 {#categories-and-types}

插件会将文章组织为两种集合：**分类 (Category)** 按标签对文章分组，**类型 (Type)** 收集满足条件的文章。

你可以使用 [category](#category) 和 [type](#type) 选项进行配置。路由路径由键名和子项名称通过 [slugify](#slugify) 函数生成。

#### Category 配置 {#category-configuration}

要根据 Frontmatter 中的 `tag` 对文章分组，在 `/tag/` 生成一个映射页面（使用 `TagMap` 布局），并在 `/tag/:tagName/` 列出每个标签的文章（使用 `TagList` 布局）：

```ts
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
})
```

#### Type 配置 {#type-configuration}

要在 `/star/` 使用 `StarList` 布局列出星标文章（在 Frontmatter 中标记为 `star: true`）：

```ts
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
})
```

### 生成摘要 {#generating-excerpt}

摘要生成默认启用，它会生成一个用于展示文章简短预览的 HTML 片段。请注意以下限制：

- 未知标签（包括 Vue 组件）和 Vue 特有的语法会被移除。若要保留自定义的非 Vue 元素，请使用 [isCustomElement](#iscustomelement) 选项。
- 图片的相对路径和别名会被移除。为确保图片在摘要中正确显示，请使用绝对路径（基于 `.vuepress/public`）或完整的 URL。

生成器会优先在内容中查找 [excerptSeparator](#excerptseparator)（默认为 `<!-- more -->`）。如果未找到分隔符，它会从文件开头提取内容，直到达到 [excerptLength](#excerptlength) 个字符（默认为 `300`），并在达到该长度的最近位置截断。将 `excerptLength` 设置为 `0` 可以禁用自动生成。

使用 [excerptFilter](#excerptfilter) 选项可以控制哪些页面生成摘要。例如，当 `frontmatter.description` 存在时，你可能更愿意直接用它作为摘要，因此可以让过滤函数对这些页面返回 `false`，跳过自动生成。

### 多语言支持 {#i18n-support}

插件原生支持国际化，配置会自动应用于每个语言环境。例如，使用以下语言环境：

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

插件会在生成 `/star/` 的同时生成 `/zh/star/`，并且每个路径只显示对应语言环境的文章。

### 热重载 {#hot-reload}

在开发过程中，[hotReload](#hotreload) 选项会在文件变更时重建博客数据，使用 `--debug` 标志时默认启用。

启用它可能会影响包含大量分类和类型的站点的性能，并减慢 Markdown 的热更新速度。建议仅在积极整理分类与标签时启用，或根据页面数量以编程方式决定。

### 客户端使用 {#client-side-usage}

在页面生成过程中，插件会将当前页面的类型注入到 `frontmatter.blog` 中：

::: details Frontmatter 类型

```ts
interface BlogCategoryFrontmatterOptions {
  /** 当前页面的类型 */
  type: 'category'
  /** 当前分类的唯一键名 */
  key: string
  /** 分类名称，仅在分类子项页面可用 */
  name?: string
}

interface BlogTypeFrontmatterOptions {
  /** 当前页面的类型 */
  type: 'type'
  /** 当前类型的唯一键名 */
  key: string
}
```

:::

使用 [useBlogCategory](#useblogcategory) 和 [useBlogType](#useblogtype) 组合式 API 可以获取绑定到当前路由的数据，或者传入特定的键名来获取该键名的数据：

::: code-tree title="主题布局" entry="layouts/TagMap.vue"

```vue title="layouts/TagMap.vue"
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

```vue title="layouts/TagList.vue"
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

```vue title="layouts/StarList.vue"
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

:::

参考：[组合式 API](#composables)。

## 选项 {#options}

::: fields
@`getInfo` type=`(page: Page) => Record<string, unknown>` default=`() => ({})`

用于从页面中提取文章信息的函数。

提取的信息会被注入到路由元数据中，使其可以通过客户端组合式 API 访问。

参考：[收集信息](#gathering-info)。

@`filter` type=`(page: Page) => boolean` default=`(page) => Boolean(page.filePathRelative) && !page.frontmatter.home`

用于确定哪些页面被视为博客文章的函数。

参考：[文章收集](#article-collection)。

@`category` type=`BlogCategoryOptions[]` default=`[]`

博客分类配置，每一项按标签对文章分组，例如标签或分类。

参考：[Category 配置](#category-configuration)。

@@`category[*].key` type=string required

唯一的分类名称。

@@`category[*].getter` type=`(page: Page) => string[]` required

从页面中获取分类的函数。

@@`category[*].sorter` type=`(pageA: Page, pageB: Page) => number`

同一分类下页面的排序函数。默认情况下，页面保持原始顺序。

@@`category[*].path` type=`string | false` default=`'/:key/'`

分类页面的路径模式，其中 `:key` 会被替换为经过 slugify 处理的分类键名。设置为 `false` 可跳过生成该页面。

@@`category[*].layout` type=string default=`'Layout'`

分类页面的布局名称。

@@`category[*].frontmatter` type=`(localePath: string) => Record<string, unknown>`

分类页面的 frontmatter。

@@`category[*].itemPath` type=`string | false | ((name: string) => string)` default=`'/:key/:name/'`

分类子项页面的路径模式，其中 `:key` 和 `:name` 会被替换为经过 slugify 处理的分类键名与子项名称。它也可以是一个根据子项名称返回路径的函数，或设置为 `false` 跳过生成子项页面。

@@`category[*].itemLayout` type=string default=`'Layout'`

分类子项页面的布局名称。

@@`category[*].itemFrontmatter` type=`(name: string, localePath: string) => Record<string, unknown>`

分类子项页面的 frontmatter，其中 `name` 为子项名称。

@`type` type=`BlogTypeOptions[]` default=`[]`

博客类型配置，每一项收集满足条件的文章。

参考：[Type 配置](#type-configuration)。

@@`type[*].key` type=string required

唯一的类型名称。

@@`type[*].filter` type=`(page: Page) => boolean` required

用于确定页面是否属于此类型的函数。

@@`type[*].sorter` type=`(pageA: Page, pageB: Page) => number`

该类型下页面的排序函数。默认情况下，页面保持原始顺序。

@@`type[*].path` type=`string | false` default=`'/:key/'`

类型页面的路径模式，其中 `:key` 会被替换为经过 slugify 处理的类型键名。设置为 `false` 可跳过生成该页面。

@@`type[*].layout` type=string default=`'Layout'`

类型页面的布局名称。

@@`type[*].frontmatter` type=`(localePath: string) => Record<string, unknown>`

类型页面的 frontmatter。

@`slugify` type=`(name: string) => string` default=`(name) => name.replaceAll(/[ _]/gu, '-').replaceAll(/[:?*|\\/<>]/gu, '').toLowerCase()`

将字符串转换为 URL 友好的 slug 的函数，用于路由注册。

参考：[分类与类型](#categories-and-types)。

@`excerpt` type=boolean default=`true`

是否为页面生成摘要。

参考：[生成摘要](#generating-excerpt)。

@`excerptSeparator` type=string default=`'<!-- more -->'`

内容中用于手动定义摘要的分隔符。

参考：[生成摘要](#generating-excerpt)。

@`excerptLength` type=number default=`300`

自动生成摘要的目标长度。

参考：[生成摘要](#generating-excerpt)。

@`excerptFilter` type=`(page: Page) => boolean` default="与 `filter` 选项相同"

用于过滤需要生成摘要的页面的函数。

参考：[生成摘要](#generating-excerpt)。

@`isCustomElement` type=`(tagName: string) => boolean` default=`() => false`

用于识别自定义元素的函数，以区别于摘要生成过程中会被剥离的未知标签。

参考：[生成摘要](#generating-excerpt)。

@`metaScope` type=string default=`'_blog'`

[getInfo](#getinfo) 提取的信息注入到路由元数据的键名。

参考：[收集信息](#gathering-info)。

@`hotReload` type=boolean default="使用 `--debug` 标志时启用"

是否在开发服务器中启用热重载。

参考：[热重载](#hot-reload)。

:::

## 组合式 API {#composables}

可以通过 `@vuepress/plugin-blog/client` 导入以下组合式 API。

### useBlogCategory

```ts
const useBlogCategory: <
  Info extends Record<string, unknown> = Record<string, unknown>,
>(
  key?: string,
) => ComputedRef<BlogCategoryData<Info>>
```

返回绑定到当前路由或指定 `key` 的分类数据。未提供 key 时，插件会从当前路由推断。

### useBlogType

```ts
const useBlogType: <
  Info extends Record<string, unknown> = Record<string, unknown>,
>(
  key?: string,
) => ComputedRef<BlogTypeData<Info>>
```

返回绑定到当前路由或指定 `key` 的类型数据。未提供 key 时，插件会从当前路由推断。

### 返回类型 {#return-types}

```ts
interface Article<
  Info extends Record<string, unknown> = Record<string, unknown>,
> {
  /** 文章路径 */
  path: string
  /** 文章信息 */
  info: Info
}

interface BlogCategoryData<
  Info extends Record<string, unknown> = Record<string, unknown>,
> {
  /** 分类路径 */
  path: string

  /**
   * 仅当当前路由匹配特定的子项路径时可用
   */
  currentItems?: Article<Info>[]

  /** 分类映射 */
  map: {
    /** 当前分类下唯一的 key */
    [key: string]: {
      /** 对应键值的分类路径 */
      path: string
      /** 对应键值的项目 */
      items: Article<Info>[]
    }
  }
}

interface BlogTypeData<
  Info extends Record<string, unknown> = Record<string, unknown>,
> {
  /** 类型路径 */
  path: string

  /** 当前类型下的项目 */
  items: Article<Info>[]
}
```
