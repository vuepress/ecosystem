---
icon: heading
---

# toc

<NpmBadge package="@vuepress/plugin-toc" />

该插件会提供一个目录 (table-of-contents, TOC) 组件。

## 使用方法

```bash
npm i -D @vuepress/plugin-toc@next
```

```ts title=".vuepress/config.ts"
import { tocPlugin } from '@vuepress/plugin-toc'

export default {
  plugins: [
    tocPlugin({
      // 配置项
    }),
  ],
}
```

## 与 Markdown 目录语法的区别

与 [Markdown 目录语法](https://vuejs.press/zh/guide/markdown.html#目录) 类似，该插件提供的目录组件可以直接在你的 Markdown 内容中使用：

```md
<!-- Markdown 目录语法 -->

[[toc]]

<!-- Vue 目录组件 -->
<Toc />
```

在 Build 模式中，它们都可以被正确地预渲染。然而，它们之间存在一些区别。

Markdown 语法 `[[toc]]` 仅能在 Markdown 文件中使用。它是由 markdown-it 解析的，生成的目录是静态内容。

组件 `<Toc/>` 既可以用在 Markdown 文件中，也可以用在 Vue 文件中。它是由 Vue 加载的，生成的目录是一个 Vue 组件。

该插件可以和 [@vuepress/plugin-active-header-links](./active-header-links.md) 协同工作，你只需要将 [headerLinkSelector](./active-header-links.md#headerlinkselector) 与该插件的 `linkClass` 匹配即可。当页面滚动至某个标题锚点后，对应的链接就会被加上 `linkActiveClass` 类名。

因此，该插件对于主题开发者来说更为有用。

## 选项

::: fields
@componentName@ type=string default=`'Toc'`

指定目录组件的名称。

@headersOptions@ type=GetHeadersOptions default=`{}`

覆盖组件 [headersOptions](#headersoptions-1) Prop 的默认值。

@renderOptions@ type=TocRenderOptions default=`{}`

覆盖组件 [renderOptions](#renderoptions-1) Prop 的默认值。

:::

## 组件 Props

目录组件可以通过 Props 来进行自定义。

```vue
<template>
  <Toc
    :headers="headers"
    :headers-options="headersOptions"
    :render-options="renderOptions"
  />
</template>
```

::: fields
@headers@ type=`PageHeader[]`

指定要渲染的标题数组。如果该 Prop 没有被设置，默认会使用当前页面的标题。

@@headers.level@ type=number

标题的级别。

@@headers.title@ type=string

标题的文本。

@@headers.slug@ type=string

标题的 slug。

@@headers.children@ type=`PageHeader[]`

标题的子标题。

@headersOptions@ type=GetHeadersOptions

自定义标题提取行为。

可用的选项详见 [GetHeadersOptions](../../tools/helper/client.md#getheaders)，它可以通过插件配置项中的 [headersOptions](#headersoptions) 来覆盖。

@renderOptions@ type=TocRenderOptions

自定义目录组件渲染行为。它可以通过插件配置项中的 [renderOptions](#renderoptions) 来覆盖。

使用默认配置的目录组件的渲染结果类似以下结构：

```vue
<template>
  <!-- container -->
  <nav class="vuepress-toc">
    <!-- list -->
    <ul class="vuepress-toc-list">
      <!-- item -->
      <li class="vuepress-toc-item">
        <!-- link -->
        <RouteLink class="vuepress-toc-link" to="#foo">Foo</RouteLink>
      </li>
      <!-- item with children -->
      <li class="vuepress-toc-item">
        <!-- link (children active) -->
        <RouteLink class="vuepress-toc-link active" to="#bar">Bar</RouteLink>
        <!-- list (children) -->
        <ul class="vuepress-toc-list">
          <!-- item -->
          <li class="vuepress-toc-item">
            <!-- link (active) -->
            <RouteLink class="vuepress-toc-link active" to="#bar-child">
              Bar Child
            </RouteLink>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>
```

@@renderOptions.containerTag@ type=string default=`'nav'`

容器标签名。如果 `containerTag` 设置为空字符串 `''`，那么最外层的 `<nav>` Container 会被完全移除。

@@renderOptions.containerClass@ type=string default=`'vuepress-toc'`

容器类名。

@@renderOptions.listClass@ type=string default=`'vuepress-toc-list'`

列表类名。

@@renderOptions.itemClass@ type=string default=`'vuepress-toc-item'`

列表项类名。

@@renderOptions.linkTag@ type=`'a' | 'RouteLink' | 'RouterLink'` default=`'RouteLink'`

链接标签类型。

@@renderOptions.linkClass@ type=string default=`'vuepress-toc-link'`

链接类名。

@@renderOptions.linkActiveClass@ type=string default=`'active'`

激活链接的类名。

@@renderOptions.linkChildrenActiveClass@ type=string default=`'active'`

子元素激活链接的类名。

:::
