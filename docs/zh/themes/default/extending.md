---
icon: puzzle
---

# 继承 {#extending}

主题通过一个布局组件渲染所有页面。页面之间以[页面类型](./frontmatter.md#page-type)区分，而不是以布局名称区分，布局的各个部分则以插槽的形式暴露出来。因此，无论是自定义页面还是自定义布局，都只需要注册一个组件；如果想保留主题的布局，再把它包一层即可。

<NpmBadge package="@vuepress/theme-default" />

## 自定义布局 {#custom-layouts}

主题注册了两个布局：`Layout` 和 `NotFound`。`layout` frontmatter 会按名称选择已注册的布局之一，默认值为 `Layout`：

```md
---
layout: CommentPage
---
```

布局在站点的客户端配置文件 `.vuepress/client.ts` 中注册：

```ts
import { defineClientConfig } from 'vuepress/client'

import CommentPage from './layouts/CommentPage.vue'

export default defineClientConfig({
  layouts: {
    CommentPage,
  },
})
```

布局的名称必须已注册，否则页面渲染时 VuePress 会抛出 `Cannot resolve layout: <name>`。在这里注册的布局会替该页面替换主题的布局，因此它负责整页的标记结构。

## 包装主题布局 {#wrapping-the-theme-layout}

最常见的自定义布局会保留主题布局并在其上添加内容。`@vuepress/theme-default/client` 的默认导出以 `Layout` 暴露布局组件，因此包装组件可以渲染它并填充它的一个或多个插槽：

```vue
<!-- .vuepress/layouts/CommentPage.vue -->
<script setup lang="ts">
import theme, { useDarkMode } from '@vuepress/theme-default/client'

const ParentLayout = theme.Layout
const isDarkMode = useDarkMode()
</script>

<template>
  <ParentLayout>
    <template #page-bottom>
      <CommentService :darkmode="isDarkMode" />
    </template>
  </ParentLayout>
</template>
```

包装组件会继承主题的页面类型、侧边栏、导航栏和暗色模式，因此 `page-bottom` 会在每个渲染它的页面类型中被填充。

## 布局插槽 {#layout-slots}

下面的插槽由主题的布局转发。插槽只会在渲染其所属区域的页面类型上渲染：首页插槽在 `type: home` 页面上渲染，文档插槽在 `type: doc` 页面上渲染，页面插槽在 `type: page` 页面上渲染。

### Layout {#layout}

| 插槽            | 说明                           |
| --------------- | ------------------------------ |
| `layout-top`    | 导航栏之上，位于页面容器内部。 |
| `layout-bottom` | 页脚之下，位于页面容器内部。   |

### 导航栏 {#navbar}

| 插槽                        | 说明                                 |
| --------------------------- | ------------------------------------ |
| `nav-bar-title-before`      | logo 和站点标题之前。                |
| `nav-bar-title-after`       | logo 和站点标题之后。                |
| `nav-bar-content-before`    | 导航项之前。                         |
| `nav-bar-content-after`     | 导航项之后，外观切换和社交链接之前。 |
| `nav-screen-content-before` | 移动端菜单的顶部。                   |
| `nav-screen-content-after`  | 移动端菜单的底部。                   |

### 侧边栏 {#sidebar}

| 插槽                 | 说明               |
| -------------------- | ------------------ |
| `sidebar-nav-before` | 侧边栏导航项之上。 |
| `sidebar-nav-after`  | 侧边栏导航项之下。 |

### 文档页面 {#document-page}

| 插槽                | 说明                                   |
| ------------------- | -------------------------------------- |
| `doc-top`           | 内容和侧栏之上。                       |
| `doc-before`        | 内容之上，文档标题之下。               |
| `doc-after`         | 内容之下，文档页脚之上。               |
| `doc-bottom`        | 内容和侧栏之下。                       |
| `doc-footer-before` | 编辑链接、最后更新时间和页面导航之上。 |

### 侧栏 {#aside}

| 插槽                   | 说明                         |
| ---------------------- | ---------------------------- |
| `aside-top`            | 大纲之上。                   |
| `aside-outline-before` | 大纲列表之上，大纲标题之下。 |
| `aside-outline-after`  | 大纲列表之下。               |
| `aside-ads-before`     | 侧栏广告之上，大纲之下。     |
| `aside-ads-after`      | 侧栏广告之下。               |
| `aside-bottom`         | 侧栏中其他所有内容之下。     |

### 页面 {#page}

| 插槽          | 说明                                       |
| ------------- | ------------------------------------------ |
| `page-top`    | 页面内容之上，位于页面容器内部。           |
| `page-bottom` | 页面内容之下，位于页面容器内部。           |
| `not-found`   | 404 页面的内容。它会替换默认的未找到内容。 |

### 首页 {#home-page}

| 插槽                               | 说明                                  |
| ---------------------------------- | ------------------------------------- |
| `home-hero-before`                 | hero 区块之上。                       |
| `home-hero-info-before`            | hero 信息的顶部。                     |
| `home-hero-info`                   | hero 信息。它会替换名称、文本和标语。 |
| `home-hero-info-after`             | hero 信息的底部。                     |
| `home-hero-actions-before-actions` | hero 操作按钮之上。                   |
| `home-hero-actions-after`          | hero 操作按钮之下。                   |
| `home-hero-image`                  | hero 图片。                           |
| `home-hero-after`                  | hero 区块之下。                       |
| `home-features-before`             | 特性区块之上。                        |
| `home-features-after`              | 特性区块之下，内容之上。              |

## 增强应用 {#enhancing-the-app}

站点的客户端配置文件还可以全局注册组件，或在应用创建时执行代码：

```ts
import { defineClientConfig } from 'vuepress/client'

import MyComponent from './components/MyComponent.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component('MyComponent', MyComponent)
  },
})
```

主题对 `Badge` 组件也做了同样的事，因此在 Markdown 中无需导入就能使用 `<Badge text="new" />`。

::: tip
增强逻辑会在服务端和客户端都执行。请用 `onMounted` 保护仅限浏览器的代码，或用 `<ClientOnly>` 包裹组件，以免服务端渲染失败。
:::

## 自定义页面 {#custom-pages}

`type: content` 的页面会在不套用主题布局的情况下渲染内容 —— 没有导航栏、没有侧边栏、也没有页脚。它适合落地页，或那些标记结构完全写在 Markdown 文件里的嵌入页面：

```md
---
type: content
---
```

如果页面需要主题的外壳，就保留默认布局，并通过 Markdown 文件或插槽添加内容。在首页上，Markdown 正文会渲染在 hero 和特性区块之下，位于首页内容容器内部：

```md
---
type: home

hero:
  name: My Project
  text: A short description.
---

Any Markdown content here is rendered below the features section.
```

## 读取布局状态 {#reading-the-layout-state}

自定义布局可以用 `@vuepress/theme-default/client` 的 `useLayout()` 读取布局状态：

```ts
import { useLayout } from '@vuepress/theme-default/client'

const {
  isHome,
  sidebar,
  sidebarGroups,
  hasSidebar,
  isSidebarEnabled,
  hasAside,
  leftAside,
  headers,
  hasLocalNav,
} = useLayout()
```

`headers` 是当前页面的大纲树，`sidebarGroups` 是按区块分组的侧边栏条目，`hasAside` / `leftAside` 表示侧栏是否渲染以及渲染在哪一侧。

## 扩展主题配置项 {#extending-the-theme-options}

主题工厂返回一个可以被装饰的主题对象，因为 `defaultTheme()` 返回的就是 VuePress 消费的那个对象。可以向其中添加插件，例如：

```ts
import { defaultTheme } from '@vuepress/theme-default'

import { myPlugin } from './plugins/myPlugin.js'

const theme = defaultTheme({
  siteTitle: 'My Project',
})

export default {
  ...theme,
  plugins: [...(theme.plugins ?? []), myPlugin()],
}
```

请保留基础主题的 `clientConfigFile`：它注册了 `Layout` 和 `NotFound`，并提供暗色模式状态。主题的布局并非由可替换的别名构建 —— 与经典主题不同，默认主题不暴露 `@theme/*` 别名 —— 因此请通过它的插槽来扩展，或编写一个自行渲染标记的布局。

## 下一步 {#next}

- [内置组件](./components.md) —— 主题导出的组件。
- [Frontmatter](./frontmatter.md) —— `layout` 和 `type` frontmatter。
- [配置](./config.md) —— 主题配置项。
