# watermark

<NpmBadge package="@vuepress/plugin-watermark" />

将 [watermark-js-plus](https://github.com/zhensherlock/watermark-js-plus) 到 VuePress 中。

此插件可在在页面中添加水印，可以选择为 全局页面 或 部分页面添加水印，还可以选择添加 文字水印 或 图片水印。

## 使用

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

## 配置项

### global

- 类型： `boolean`

- 默认值： `true`

- 详情：是否全局启用水印。

  当全局启用时，所有页面都会添加水印。

  当不全局启用时，需要通过 [pageFilter](#pagefilter) 来指定哪些页面需要添加水印。

### pageFilter

- 类型： `(page: Page) => boolean`

- 默认值： `() => true`

- 详情：指定哪些页面需要添加水印。

  返回 `true` 的页面将会被添加水印。

### delay

- 类型： `number`

- 默认值： `500`

- 详情：添加水印的延时。以毫秒为单位。

  该延迟仅会在添加水印到页面某个元素时生效。

  在切换路由后，需要延迟一段时间后才能添加水印。

### watermarkOptions

- 类型： `WatermarkOptions`

- 默认值： `undefined`

- 详情： 配置项请参考 [watermark-js-plus](https://zhensherlock.github.io/watermark-js-plus/zh/config/)。

#### watermarkOptions.parent

- 类型： `string`

- 默认值： `body`

- 详情：添加水印的父元素选择器。

  默认插入到 body 中，可以指定插入到页面的某个元素中。

## Frontmatter

### watermark

- 类型: `boolean | WatermarkOptions`

- 详情：

  当类型为 `boolean` 时，表示是否启用水印。

  当类型为 `WatermarkOptions` 时，表示当前页面水印配置。

  可以参考 [watermark-js-plus](https://zhensherlock.github.io/watermark-js-plus/zh/config/) 。

```md
---
watermark:
  width: 200
  height: 200
  content: Your content
  opacity: 0.5
---
```

## 客户端配置

### defineWatermarkConfig(config)

- 类型： `(config: MaybeRefOrGetter<WatermarkOptions>) => void`

传递给 [watermark-js-plus](https://zhensherlock.github.io/watermark-js-plus/zh/config/) 的额外配置。

```ts
import { defineWatermarkConfig } from '@vuepress/plugin-watermark/client'

defineWatermarkConfig({
  // 在此设置额外的 watermark 配置
})
```
