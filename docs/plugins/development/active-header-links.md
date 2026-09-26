---
icon: link-2
---

# active-header-links

<NpmBadge package="@vuepress/plugin-active-header-links" />

This plugin will listen to page scroll event. When the page scrolls to a certain _header anchor_, this plugin will change the route hash to that _header anchor_ if there is a corresponding _header link_.

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

::: fields
@`headerLinkSelector` type=string default=`'a.vp-sidebar-item'`

Selector of _header link_.

If a _header anchor_ does not have a corresponding _header link_, this plugin won't change the route hash to that anchor when scrolling to it.

@`headerAnchorSelector` type=string default=`'.header-anchor'`

Selector of _header anchor_.

You don't need to specify this option unless you have changed the `permalinkClass` option of [markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor#readme) via [markdown.anchor](https://vuejs.press/reference/config.html#markdown-anchor).

See also: [Guide > Markdown > Syntax Extensions > Header Anchors](https://vuejs.press/guide/markdown.html#header-anchors).

@`delay` type=number default=`200`

The delay in milliseconds of the debounced scroll event listener.

@`offset` type=number default=`5`

The offset in pixels when a _header anchor_ is determined as active.

Even if you click the link of the _header anchor_ directly, the `scrollTop` might not be exactly equal to `offsetTop` of the _header anchor_, so we add an offset to avoid the error.

:::
