# flexsearch

<NpmBadge package="@vuepress/plugin-flexsearch" />

Provide local search to your documentation site.

Unlike the `search` plugin, the `flexsearch` plugin uses the [FlexSearch](https://github.com/nextapps-de/flexsearch) library and pre-indexes both the title and the content of the pages.

::: tip
Default theme will add search box to the navbar once you configure this plugin correctly.

This plugin may not be used directly in other themes, so you'd better refer to the documentation of your theme for more details.
:::

## Usage

```bash
npm i -D @vuepress/plugin-flexsearch@next
```

```ts
import { flexsearchPlugin } from '@vuepress/plugin-flexsearch'

export default {
  plugins: [
    flexsearchPlugin({
      // options
    }),
  ],
}
```

## Local Search Index

This plugin will generate search index from your pages locally, and load the search index file when users enter your site. In other words, this is a lightweight built-in search which does not require any external requests.

While this plugin should be able to handle more pages than the `search` plugin, as it is using an index, the limit of how many pages it can support has not been tested yet. Please refer to [FlexSearch](https://github.com/nextapps-de/flexsearch) benchmarks for more detailed info.

Another alternative to this plugin is to use a more professional solution - [docsearch](./docsearch.md).

## Options

### locales

- Type: `Record<string, { placeholder: string }>`

- Details:

  The text of the search box in different locales.

  If this option is not specified, it will fallback to default text.

- Example:

```ts
export default {
  plugins: [
    flexsearchPlugin({
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

- Type: `(string | HotKeyOptions)[]`

@[code ts](@vuepress/plugin-flexsearch/src/shared/hotKey.ts)

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

```ts
export default {
  plugins: [
    flexsearchPlugin({
      // exclude the homepage
      isSearchable: (page) => page.path !== '/',
    }),
  ],
}
```

## Styles

You can customize the style of the search box via CSS variables:

@[code css](@vuepress/plugin-flexsearch/src/client/styles/vars.css)

## Components

### SearchBox

- Details:

  This plugin will register a `<SearchBox />` component globally, and you can use it without any props.

  Put this component to where you want to place the search box. For example, default theme puts this component to the end of the navbar.

::: tip
This component is mainly used for theme development. You don't need to use it directly in most cases.
:::
