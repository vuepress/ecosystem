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

## Local Search Index

This plugin will generate search index from your pages locally, and load the search index file when users enter your site. In other words, this is a lightweight built-in search which does not require any external requests.

However, when your site has a large number of pages, the size of search index file would be very large, which could slow down the page loading speed. In this case, we recommend you to use a more professional solution - [docsearch](./docsearch.md).

## Options

### locales

- Type: `Record<string, { placeholder?: string }>`

- Details:

  The text of the search box in different locales.

- Example:

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

- Also see:
  - [Guide > I18n](https://vuejs.press/guide/i18n.html)

### hotKeys

- Type: `(string | KeyOptions)[]`

  @[code ts](@vuepress/helper/src/shared/key.ts)

- Default: `['s', '/']`

- Details:

  Specify the [event.key](http://keycode.info/) of the hotkeys.

  When hotkeys are pressed, the search box input will be focused.

  Set to an empty array to disable hotkeys.

### maxSuggestions

- Type: `number`

- Default: `5`

- Details:

  Specify the maximum number of search results.

### isSearchable

- Type: `(page: Page) => boolean`

- Default: `() => true`

- Details:

  A function to determine whether a page should be included in the search index.
  - Return `true` to include the page.
  - Return `false` to exclude the page.

- Example:

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

### getExtraFields

- Type: `(page: Page) => string[]`

- Default: `() => []`

- Details:

  A function to add extra fields to the search index of a page.

  By default, this plugin will use page title and headers as the search index. This option could help you to add more searchable fields.

- Example:

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

## Styles

You can customize the style of the search box via CSS variables:

@[code css](@vuepress/plugin-search/src/client/styles/vars.css)

## Components

- SearchBox
