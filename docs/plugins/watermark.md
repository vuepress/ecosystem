# watermark

<NpmBadge package="@vuepress/plugin-watermark" />

Integrate [watermark-js-plus](https://github.com/zhensherlock/watermark-js-plus) into VuePress。

This plugin can add watermark to the pages, you can choose between add watermark globally or on specific pages. You can also choose between add text watermark or image watermark.

## Usage

```sh
npm i -D @vuepress/plugin-watermark@next
```

```ts
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

### global

- Type： `boolean`

- Default： `true`

- Details：Enable watermark globally.

  When enabled globally, a watermark will be added to all pages.

  If not enabled globally, specify which pages need the watermark using [pageFilter](#pagefilter).

### pageFilter

- Type： `(page: Page) => boolean`

- Default： `() => true`

- Details：Specify which pages need to have watermarks added.

  Pages that return `true` will have watermarks added.

### delay

- Type： `number`

- Default： `500`

- Details：Delay for adding watermarks. In milliseconds.

  This delay will only take effect when adding watermarks to a specific element on the page.

  After switching routes, a delay is required before adding watermarks.

### watermarkOptions

- Type： `WatermarkOptions`

- Default： `undefined`

- Details： Please refer to the [watermark-js-plus](https://zhensherlock.github.io/watermark-js-plus/zh/config/) configuration options.

#### watermarkOptions.parent

- Type： `string`

- Default： `body`

- Details：Parent element selector for adding watermark.

  By default, it is inserted into the body, but you can specify inserting it into a specific element on the page.

## Frontmatter

### watermark

- Type: `boolean | WatermarkOptions`

- Details：

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

- Type： `(config: MaybeRefOrGetter<WatermarkOptions>) => void`

Additional configuration passed to [watermark-js-plus](https://zhensherlock.github.io/watermark-js-plus/en/config/).

```ts
import { defineWatermarkConfig } from '@vuepress/plugin-watermark/client'

defineWatermarkConfig({
  // Set up additional watermark configurations here.
})
```
