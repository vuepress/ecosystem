---
url: /plugins/features/back-to-top.md
---
# back-to-top

This plugin will add a *back to top* button to your site. The button will be displayed in the bottom right corner of the page when scrolling down. By clicking the button, the page will scroll to the top.

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

* Type: `number`
* Default: `100`
* Details: Scroll threshold distance to display back to top button (in pixels)

### progress

* Type: `boolean`
* Default: `true`
* Details: Whether display progress bar around icon

## Styles

You can customize the style of the *back to top* button via CSS variables:

@[code css](@vuepress/plugin-back-to-top/src/client/styles/vars.css)
