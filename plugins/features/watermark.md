---
url: /ecosystem/plugins/features/watermark.md
---
# watermark

Integrate [watermark-js-plus](https://github.com/zhensherlock/watermark-js-plus) into VuePress。

This plugin can add watermark to the pages, you can choose between add watermark globally or on specific pages. You can also choose between add text watermark or image watermark.

## Usage

```sh
npm i -D @vuepress/plugin-watermark@next
```

```ts title=".vuepress/config.ts"
import { watermarkPlugin } from '@vuepress/plugin-watermark'

export default {
  plugins: [
    watermarkPlugin({
      // options
    }),
  ],
}
```

## Options

### enabled

* Type: `boolean | ((page: Page) => boolean)`

* Default: `false`

* Details:

  Specify which pages need to have watermarks added.

  Pages with `true` value will have watermarks added.

### watermarkOptions

* Type: `WatermarkOptions`

* Default: `undefined`

* Details: Please refer to the [watermark-js-plus](https://zhensherlock.github.io/watermark-js-plus/zh/config/) configuration options.

#### watermarkOptions.parent

* Type: `string`

* Default: `body`

* Details: Parent element selector for adding watermark.

  By default, it is inserted into the body, but you can specify inserting it into a specific element on the page.

## Frontmatter

### watermark

* Type: `boolean | WatermarkOptions`

* Details:

  When the type is `boolean`, it indicates whether the watermark is enabled.

  When the type is `WatermarkOptions`, it represents the current page's watermark configuration.

  You can refer to [watermark-js-plus](https://zhensherlock.github.io/watermark-js-plus/zh/config/).

```md
---
watermark:
  width: 200
  height: 200
  content: Your content
  opacity: 0.5
---
```

## Client Config

### defineWatermarkConfig(config)

* Type: `(config: MaybeRefOrGetter<WatermarkOptions>) => void`

Additional configuration passed to [watermark-js-plus](https://zhensherlock.github.io/watermark-js-plus/en/config/).

```ts title=".vuepress/client.ts"
import { defineWatermarkConfig } from '@vuepress/plugin-watermark/client'

defineWatermarkConfig({
  // Set up additional watermark configurations here.
})
```

In most cases, the majority of options should be defined in Node,
but there are some special situations. For example,
it may be necessary to control different watermark opacities, font colors,
etc., in **dark/light mode** , or to pass in callbacks such as `onSuccess`, `extraDrawFunc`, and so on.

```ts
import { useDarkMode } from '@vuepress/helper/client'
import { computed } from 'vue'

export default defineClientConfig({
  setup() {
    const isDark = useDarkMode()

    const watermarkConfig = computed(() => ({
      fontColor: isDark.value ? '#fff' : '#000',
      onSuccess: () => {
        console.log('success')
      },
    }))

    defineWatermarkConfig(watermarkConfig)
  },
})
```
