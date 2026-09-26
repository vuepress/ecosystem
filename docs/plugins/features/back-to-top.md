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

::: fields
@threshold@ type=number default=`100`

Scroll threshold distance to display the back to top button (in pixels).

@progress@ type=boolean default=`true`

Whether to display scroll progress.

@locales@ type=`LocaleConfig<BackToTopPluginLocaleData>`

Locale config of the plugin.

@@locales.backToTop@ type=string

Label text of the back to top button.

:::

## Styles

You can customize the style of the _back to top_ button via CSS variables:

@[code css](@vuepress/plugin-back-to-top/src/client/styles/vars.scss)
