---
icon: arrow-up-to-line
---

# back-to-top

<NpmBadge package="@vuepress/plugin-back-to-top" />

This plugin adds a _back to top_ button to your site. The button appears in the bottom right corner when scrolling down and scrolls the page to the top when clicked.

This plugin has been integrated into the default theme.

## Usage

```bash
npm i -D @vuepress/plugin-back-to-top@next
```

```ts title=".vuepress/config.ts"
import { backToTopPlugin } from '@vuepress/plugin-back-to-top'

export default {
  plugins: [backToTopPlugin()],
}
```

## Options

### threshold

- Type: `number`
- Default: `100`
- Details: Scroll threshold distance to display the back to top button (in pixels)

### progress

- Type: `boolean`
- Default: `true`
- Details: Whether to display scroll progress

## Styles

You can customize the style of the _back to top_ button via CSS variables:

@[code css](@vuepress/plugin-back-to-top/src/client/styles/vars.css)
