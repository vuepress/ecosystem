---
icon: search
---

# search

<NpmBadge package="@vuepress/plugin-search" />

Provide local search to your documentation site.

## Usage

```bash
npm i -D @vuepress/plugin-search@next
```

```ts title=".vuepress/config.ts"
import { searchPlugin } from '@vuepress/plugin-search'

export default {
  plugins: [
    searchPlugin({
      // options
    }),
  ],
}
```

## Guide

### Local Search Index

This plugin will generate search index from your pages locally, and load the search index file when users enter your site. In other words, this is a lightweight built-in search which does not require any external requests.

However, when your site has a large number of pages, the size of search index file would be very large, which could slow down the page loading speed. In this case, we recommend you to use a more professional solution - [docsearch](./docsearch.md).

## Options

::: fields
@`locales` type=`LocaleConfig<SearchPluginLocaleData>` default=`{}`

The text of the search box in different locales.

@@`locales.<localePath>.placeholder` type=string

The placeholder of the search box.

```ts title=".vuepress/config.ts"
export default {
  plugins: [
    searchPlugin({
      locales: {
        '/': {
          placeholder: 'Search',
        },
        '/zh/': {
          placeholder: '搜索',
        },
      },
    }),
  ],
}
```

See also: [Guide > I18n](https://vuejs.press/guide/i18n.html).

@`hotKeys` type=`(KeyOptions | string)[]` default=`['s', '/']`

Specify the [event.key](http://keycode.info/) of the hotkeys. When hotkeys are pressed, the search box input will be focused. Set to an empty array to disable hotkeys.

@@`hotKeys[*].key` type=string required

Value of `event.key` to trigger the hot key.

@@`hotKeys[*].ctrl` type=boolean

Whether to press `event.ctrlKey` at the same time.

@@`hotKeys[*].shift` type=boolean

Whether to press `event.shiftKey` at the same time.

@@`hotKeys[*].alt` type=boolean

Whether to press `event.altKey` at the same time.

@@`hotKeys[*].meta` type=boolean

Whether to press `event.metaKey` at the same time.

@`maxSuggestions` type=number default=`5`

Specify the maximum number of search results.

@`isSearchable` type=`(page: Page) => boolean` default=`() => true`

A function to determine whether a page should be included in the search index.

- Return `true` to include the page.
- Return `false` to exclude the page.

```ts title=".vuepress/config.ts"
export default {
  plugins: [
    searchPlugin({
      // exclude the homepage
      isSearchable: (page) => page.path !== '/',
    }),
  ],
}
```

@`getExtraFields` type=`(page: Page) => string[]` default=`() => []`

A function to add extra fields to the search index of a page.

By default, this plugin will use page title and headers as the search index. This option could help you to add more searchable fields.

```ts title=".vuepress/config.ts"
export default {
  plugins: [
    searchPlugin({
      // allow searching the `tags` frontmatter
      getExtraFields: (page) => page.frontmatter.tags ?? [],
    }),
  ],
}
```

:::

## Styles

You can customize the style of the search box via CSS variables:

@[code css](@vuepress/plugin-search/src/client/styles/vars.css)

## Components

- SearchBox
