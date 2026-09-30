---
icon: image-play
---

# photo-swipe

<NpmBadge package="@vuepress/plugin-photo-swipe" />

此插件使用 PhotoSwipe 提供图片画廊功能，允许用户在优雅的全屏灯箱中查看图片，支持缩放、导航和分享功能。

## 使用方法 {#usage}

```bash
npm i -D @vuepress/plugin-photo-swipe@next
```

```ts title=".vuepress/config.ts"
import { photoSwipePlugin } from '@vuepress/plugin-photo-swipe'

export default {
  plugins: [
    photoSwipePlugin({
      // 选项
    }),
  ],
}
```

## 指南 {#guide}

### 预览模式 {#preview-mode}

在图片预览模式中，你可以:

- 左右滑动按顺序浏览页面内其他的图片
- 查看图片的描述
- 对图片进行缩放
- 全屏浏览图片
- 下载图片
- 分享图片

::: tip

- 除了点击右上角的 "×" 退出浏览模式外，在上下滚动超过一定距离后，会自动退出图片浏览模式。
- 在移动端，或使用 PC 触控板，你可以使用平移、缩放手势在浏览模式中平移、缩放图片。

:::

## 选项 {#options}

:::: fields
@`selector` type=`string | string[]` default=`'[vp-content] :not(a) > img:not([no-view])'`

图片选择器。

@`download` type=boolean default=`true`

是否显示下载按钮。

@`fullscreen` type=boolean default=`true`

是否显示全屏按钮。

@`scrollToClose` type=boolean default=`true`

是否在滚动时关闭当前图片。

@`locales` type=`PhotoSwipePluginLocaleConfig`

插件的多语言配置。

参考：[多语言配置](../supported-locales.md)。

@@`locales.<localePath>.close` type=string

关闭按钮标签文字。

@@`locales.<localePath>.download` type=string

下载按钮标签文字。

@@`locales.<localePath>.fullscreen` type=string

全屏按钮标签文字。

@@`locales.<localePath>.zoom` type=string

缩放按钮标签文字。

@@`locales.<localePath>.arrowPrev` type=string

上一张图片按钮标签文字。

@@`locales.<localePath>.arrowNext` type=string

下一张图片按钮标签文字。

@@`locales.<localePath>.errorMsg` type=string

图片加载失败时显示的文字。

::::

## Frontmatter

::: fields
@`photoSwipe` type=`boolean | string`

当前页面的图片选择器。

字符串会覆盖当前页面的 [selector](#selector) 选项，`false` 会在当前页面禁用插件，`true` 或不设置则使用插件选项。

:::

## 客户端配置 {#client-config}

### definePhotoSwipeConfig

传递给 [`photo-swipe`](http://photoswipe.com/) 的选项

```ts title=".vuepress/client.ts"
import { definePhotoSwipeConfig } from '@vuepress/plugin-photo-swipe/client'

definePhotoSwipeConfig({
  // 在此设置 PhotoSwipe 选项
})
```

## API

### createPhotoSwipe

你也可以通过 API 调用 PhotoSwipe。`createPhotoSwipe` 允许你以编程方式使用 PhotoSwipe 查看图片链接，它接收图片链接与 PhotoSwipe 选项，并返回一个 [PhotoSwipeState](#photoswipestate)：

```vue
<script setup lang="ts">
import { createPhotoSwipe } from '@vuepress/plugin-photo-swipe/client'
import { onMounted, onUnmounted } from 'vue'

let state: PhotoSwipeState | null = null

const openPhotoSwipe = (index: number): void => {
  state?.open(index - 1)
}

onMounted(async () => {
  // 通过图片链接创建一个新的 PhotoSwipe 实例
  state = await createPhotoSwipe(
    [
      'https://example.com/image1.png',
      'https://example.com/image2.png',
      'https://example.com/image3.png',
    ],
    {
      // PhotoSwipe 选项
    },
  )
})

onUnmounted(() => {
  state?.destroy()
})
</script>

<template>
  <button v-for="i in 3" :key="i" type="button" @click="openPhotoSwipe(i)">
    打开图片 {{ i }}
  </button>
</template>
```

### PhotoSwipeState

`createPhotoSwipe` 返回的状态，用于控制它所创建的 PhotoSwipe 实例：

::: fields
@`open` type=`(index: number) => void`

在指定图片索引处打开 PhotoSwipe。

@`close` type=`() => void`

关闭 PhotoSwipe 实例。

@`destroy` type=`() => void`

销毁该状态创建的 PhotoSwipe 实例并释放其监听器。当不再需要该状态时调用它，例如持有它的组件卸载时。

:::

## 样式 {#styles}

你可以通过 CSS 变量自定义样式：

@[code](@vuepress/plugin-photo-swipe/src/client/styles/vars.css)
