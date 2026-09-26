---
url: /ecosystem/plugins/development/active-header-links.md
---
# active-header-links

This plugin will listen to page scroll event. When the page scrolls to a certain *header anchor*, this plugin will change the route hash to that *header anchor* if there is a corresponding *header link*.

This plugin is mainly used to develop themes, and has been integrated into the default theme. You won't need to use it directly in most cases.

## Usage

```bash
npm i -D @vuepress/plugin-active-header-links@next
```

```ts title=".vuepress/config.ts"
import { activeHeaderLinksPlugin } from '@vuepress/plugin-active-header-links'

export default {
  plugins: [
    activeHeaderLinksPlugin({
      // options
    }),
  ],
}
```

## Options

### headerLinkSelector

* Type: `string`

* Default: `'a.vp-sidebar-item'`

* Details:

  Selector of *header link*.

  If a *header anchor* does not have a corresponding *header link*, this plugin won't change the route hash to that anchor when scrolling to it.

### headerAnchorSelector

* Type: `string`

* Default: `'.header-anchor'`

* Details:

  Selector of *header anchor*.

  You don't need to specify this option unless you have changed the `permalinkClass` option of [markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor#readme) via [markdown.anchor](https://vuejs.press/reference/config.html#markdown-anchor).

* Also see:
  * [Guide > Markdown > Syntax Extensions > Header Anchors](https://vuejs.press/guide/markdown.html#header-anchors)

### delay

* Type: `number`

* Default: `200`

* Details:

  The delay of the debounced scroll event listener.

### offset

* Type: `number`

* Default: `5`

* Details:

  Even if you click the link of the *header anchor* directly, the `scrollTop` might not be exactly equal to `offsetTop` of the *header anchor*, so we add an offset to avoid the error.
