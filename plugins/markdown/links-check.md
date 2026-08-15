---
url: /ecosystem/plugins/markdown/links-check.md
---
# links-check

This plugin checks for dead links in your markdown files.

This plugin has been integrated into the default theme.

## Usage

```bash
npm i -D @vuepress/plugin-links-check@next
```

```ts title=".vuepress/config.ts"
import { linksCheckPlugin } from '@vuepress/plugin-links-check'

export default {
  plugins: [
    linksCheckPlugin({
      // options
    }),
  ],
}
```

## Options

### dev

* Type: `boolean`

* Default: `true`

* Details:

  Whether to check dead links in markdown in dev server.

### build

* Type: `boolean | 'error'`

* Default: `true`

* Details:

  Whether to check dead links in markdown during build. If set to `'error'`, the build will fail when dead links are found.

### exclude

* Type: `(string | RegExp)[] | ((link: string, isDev: boolean) => boolean)`

* Details:

  Links to exclude from checking. You can use a list of strings or regular expressions, or a function that returns a boolean.

* Example:

  ```ts title=".vuepress/config.ts"
  import { linksCheckPlugin } from '@vuepress/plugin-links-check'

  export default {
    plugins: [
      linksCheckPlugin({
        exclude: [
          // exclude links by string
          '/exclude-link',
          // exclude links by regex
          /\/exclude-link-regex/,
        ],

        // or exclude links by function
        exclude: (link, isDev) => {
          if (isDev) {
            return link.startsWith('/exclude-link-dev')
          }
          return link.startsWith('/exclude-link-build')
        },
      }),
    ],
  }
  ```
