---
url: /plugins/features/watermark.md
---
# watermark

Integrate [watermark-js-plus](https://github.com/zhensherlock/watermark-js-plus) into VuePress.

This plugin can add watermarks to pages. You can choose to add watermarks globally or on specific pages. You can also choose to add text watermarks or image watermarks.

## Usage

```sh
npm i -D @vuepress/plugin-watermark@next
```

```ts title=".vuepress/config.ts"
import { watermarkPlugin } from '@vuepress/plugin-watermark'

export default {
  plugins: [
    watermarkPlugin({
      enabled: true,
      watermarkOptions: {
        content: 'My Site',
      },
    }),
  ],
}
```

## Options

### enabled

* Type: `boolean | ((page: Page) => boolean)`

* Default: `true`

* Details:

  Specify which pages should have watermarks added.

  Pages with a `true` value will have watermarks added.

### watermarkOptions

* Type: `WatermarkOptions`

* Default: `undefined`

* Details: Configuration options. Please refer to [watermark-js-plus](https://zhensherlock.github.io/watermark-js-plus/config/) for details.

#### watermarkOptions.parent

* Type: `string`

* Default: `'body'`

* Details: Parent element selector for watermark insertion.

  By default, watermarks are inserted into the body element, but you can specify a different parent element on the page.

## Frontmatter

### watermark

* Type: `boolean | WatermarkOptions`

* Details:

  When the type is `boolean`, it indicates whether watermarks are enabled.

  When the type is `WatermarkOptions`, it represents the watermark configuration for the current page.

  Refer to [watermark-js-plus](https://zhensherlock.github.io/watermark-js-plus/config/) for configuration options.

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

Additional configuration to pass to [watermark-js-plus](https://zhensherlock.github.io/watermark-js-plus/config/).

```ts title=".vuepress/client.ts"
import { defineWatermarkConfig } from '@vuepress/plugin-watermark/client'

defineWatermarkConfig({
  // Set up additional watermark configurations here
})
```

In most cases, options should be defined in the Node.js configuration,
but there are special situations where client-side configuration is needed. For example,
you may need to control different watermark opacities or font colors
in **dark/light mode**, or pass callbacks such as `onSuccess` and `extraDrawFunc`.

```ts title=".vuepress/client.ts"
import { useDarkMode } from '@vuepress/helper/client'
import { defineWatermarkConfig } from '@vuepress/plugin-watermark/client'
import { computed } from 'vue'
import { defineClientConfig } from 'vuepress/client'

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
