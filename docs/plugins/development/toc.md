---
icon: heading
---

# toc

<NpmBadge package="@vuepress/plugin-toc" />

This plugin will provide a table-of-contents (TOC) component.

## Usage

```bash
npm i -D @vuepress/plugin-toc@next
```

```ts title=".vuepress/config.ts"
import { tocPlugin } from '@vuepress/plugin-toc'

export default {
  plugins: [
    tocPlugin({
      // options
    }),
  ],
}
```

## Differences with Markdown TOC Syntax

Similar to the [Table of Contents Markdown Syntax](https://vuejs.press/guide/markdown.html#table-of-contents), the TOC component provided by this plugin can be used in your markdown content directly:

```md
<!-- markdown toc syntax -->

[[toc]]

<!-- vue toc component -->
<Toc />
```

Both of them can be pre-rendered correctly in build mode. However, there are some differences between them.

The markdown syntax `[[toc]]` can only be used in markdown files. It is parsed by markdown-it, and the generated TOC is static content.

The component `<Toc/>` can be used in both markdown files and vue files. It is loaded by vue, and the generated TOC is a vue component.

This plugin can work together with [@vuepress/plugin-active-header-links](./active-header-links.md) by setting the [headerLinkSelector](./active-header-links.md#headerlinkselector) to match the `linkClass` option. When the page scrolls to a certain header anchor, the corresponding link will be added the `linkActiveClass` class name.

Therefore, this plugin is more useful for theme developers.

## Options

::: fields
@componentName@ type=string default=`'Toc'`

Specify the name of the TOC component.

@headersOptions@ type=GetHeadersOptions default=`{}`

Override the default values of the component [headersOptions](#headersoptions-1) prop.

@renderOptions@ type=TocRenderOptions default=`{}`

Override the default values of the component [renderOptions](#renderoptions-1) prop.

:::

## Component Props

The TOC component also accepts props for customization.

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

Specify the headers array to render. If this prop is not specified, the headers of current page will be used.

@@headers.level@ type=number

The level of the header.

@@headers.title@ type=string

The title of the header.

@@headers.slug@ type=string

The slug of the header.

@@headers.children@ type=`PageHeader[]`

The children headers.

@headersOptions@ type=GetHeadersOptions

Customize header extracting behavior.

See [GetHeadersOptions](../../tools/helper/client.md#getheaders) for the available options. It can be overridden by the [headersOptions](#headersoptions) option in plugin options.

@renderOptions@ type=TocRenderOptions

Customize TOC component render behavior. It can be overridden by the [renderOptions](#renderoptions) option in plugin options.

The rendered TOC component with default options looks like:

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

Container tag name. If the `containerTag` is set to an empty string `''`, the `<nav>` container will be removed totally.

@@renderOptions.containerClass@ type=string default=`'vuepress-toc'`

Container class name.

@@renderOptions.listClass@ type=string default=`'vuepress-toc-list'`

List class name.

@@renderOptions.itemClass@ type=string default=`'vuepress-toc-item'`

Item class name.

@@renderOptions.linkTag@ type=`'a' | 'RouteLink' | 'RouterLink'` default=`'RouteLink'`

Link tag type.

@@renderOptions.linkClass@ type=string default=`'vuepress-toc-link'`

Link class name.

@@renderOptions.linkActiveClass@ type=string default=`'active'`

Active link class name.

@@renderOptions.linkChildrenActiveClass@ type=string default=`'active'`

Active children link class name.

:::
