---
icon: pajamas:progress
---

# nprogress {#nprogress-plugin}

<NpmBadge package="@vuepress/plugin-nprogress" />

Integrate [nprogress](https://github.com/rstacruz/nprogress) into VuePress, which provides a progress bar when navigating to another page.

This plugin has been integrated into the default theme.

## Usage

```bash
npm i -D @vuepress/plugin-nprogress@next
```

```ts title=".vuepress/config.ts"
import { nprogressPlugin } from '@vuepress/plugin-nprogress'

export default {
  plugins: [nprogressPlugin()],
}
```

## Styles

You can customize the style of the progress bar via CSS variables:

@[code css](@vuepress/plugin-nprogress/src/client/styles/vars.css)
