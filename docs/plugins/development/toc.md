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

Similar to the [Table of Contents Markdown Syntax](https://vuejs.press/guide/markdown.html#table-of-contents), the TOC component that provided by this plugin could be used in your markdown content directly:

```md
<!-- markdown toc syntax -->

[[toc]]

<!-- vue toc component -->
<Toc />
```

Both of them can be pre-rendered correctly in build mode. However, there are some differences between them.

The markdown syntax `[[toc]]` could only be used in markdown files. It is parsed by markdown-it, and the generated TOC is static content.

The component `<Toc/>` could be used in both markdown files and vue files. It is loaded by vue, and the generated TOC is a vue component.

This plugin could work together with [@vuepress/plugin-active-header-links](./active-header-links.md) by setting the [headerLinkSelector](./active-header-links.md#headerlinkselector) to match the `linkClass` option. When the page scroll to a certain header anchor, this corresponding link will be added `linkActiveClass` class name.

Therefore, this plugin is more useful for theme developers.

## Options

### componentName

- Type: `string`

- Default: `'Toc'`

- Details:

  Specify the name of the TOC component.

### headersOptions

- Type: `Partial<GetHeadersOptions>`

- Default: `{}`

- Details:

  Override the default values of the component [headersOptions](#headersoptions-1) prop.

### propsOptions

- Type: `Partial<TocPropsOptions>`

- Default: `{}`

- Details:

  Override the default values of the component [propsOptions](#propsoptions-1) prop.

## Component Props

The TOC component also accepts props for customization.

```vue
<template>
  <Toc :headers="headers" :options="options" />
</template>
```

### headers

- Type: `PageHeader[]`

```ts
interface PageHeader {
  level: number
  title: string
  slug: string
  children: PageHeader[]
}
```

- Details:

  Specify the headers array to render.

  If this prop is not specified, the headers of current page will be used.

### headersOptions

- Type: `Partial<GetHeadersOptions>`

  See [GetHeadersOptions](../../tools/helper/client.md#getheaders)

- Default:

  See [GetHeadersOptions](../../tools/helper/client.md#getheaders), it can be overridden by [headersOptions](#headaersoptions) in plugin options.

- Details:

  Customize header extracting behavior.

### propsOptions

- Type: `Partial<TocPropsOptions>`

```ts
interface TocPropsOptions {
  containerTag: string
  containerClass: string
  listClass: string
  itemClass: string
  linkTag: 'a' | 'RouteLink' | 'RouterLink'
  linkClass: string
  linkActiveClass: string
  linkChildrenActiveClass: string
}
```

- Default:

  Following default values can be overridden by [propsOptions](#propsoptions) in plugin options.

```ts
const defaultOptions = {
  containerTag: 'nav',
  containerClass: 'vuepress-toc',
  listClass: 'vuepress-toc-list',
  itemClass: 'vuepress-toc-item',
  linkTag: 'RouteLink',
  linkClass: 'vuepress-toc-link',
  linkActiveClass: 'active',
  linkChildrenActiveClass: 'active',
}
```

- Details:

  Customize TOC component render behavior.

  If the `containerTag` is set to an empty string `''`, the `<nav>` container will be removed totally.

- Example:

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
