---
icon: image-play
---

# photo-swipe

<NpmBadge package="@vuepress/plugin-photo-swipe" />

此插件使用 PhotoSwipe 提供图片画廊功能，允许用户在优雅的全屏灯箱中查看图片，支持缩放、导航和分享功能。

## 使用方法

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

## 选项

### selector

- 类型：`string | string[]`
- 默认值：`"[vp-content] :not(a) > img:not([no-view])"`
- 详情：图片选择器

### download

- 类型：`boolean`
- 默认值：`true`
- 详情：是否显示下载按钮

### fullscreen

- 类型：`boolean`
- 默认值：`true`
- 详情：是否显示全屏按钮

### scrollToClose

- 类型：`boolean`
- 默认值：`true`
- 详情：是否在滚动时关闭当前图片

### locales

- 类型：`PhotoSwipePluginLocaleConfig`

  ```ts
  interface PhotoSwipePluginLocaleData {
    /**
     * 关闭按钮标签文字
     */
    close: string

    /**
     * 下载按钮标签文字
     */
    download: string

    /**
     * 全屏按钮标签文字
     */
    fullscreen: string

    /**
     * 缩放按钮标签文字
     */
    zoom: string

    /**
     * 上一张图片按钮标签文字
     */
    arrowPrev: string

    /**
     * 下一张图片按钮标签文字
     */
    arrowNext: string
  }

  interface PhotoSwipePluginLocaleConfig {
    [localePath: string]: Partial<PhotoSwipePluginLocaleData>
  }
  ```

- 详情：Photo Swipe 插件的国际化配置

- 示例：

  ```ts title=".vuepress/config.ts"
  import { photoSwipePlugin } from '@vuepress/plugin-photo-swipe'
  import { defineUserConfig } from 'vuepress'

  export default defineUserConfig({
    locales: {
      '/': {
        // 这是一个支持的语言
        lang: 'zh-CN',
      },
      '/xx/': {
        // 插件不支持这个语言
        lang: 'mm-NN',
      },
    },

    plugins: [
      photoSwipePlugin({
        locales: {
          '/': {
            // 覆盖关闭标签文字
            close: '关闭图片',
          },

          '/xx/': {
            // 在这里完整设置 `mm-NN` 的多语言配置
          },
        },
      }),
    ],
  })
  ```

::: details 内置支持语言

- **简体中文** (zh-CN)
- **繁体中文** (zh-TW)
- **英文(美国)** (en-US)
- **德语** (de-DE)
- **俄语** (ru-RU)
- **乌克兰语** (uk-UA)
- **越南语** (vi-VN)
- **葡萄牙语(巴西)** (pt-BR)
- **波兰语** (pl-PL)
- **法语** (fr-FR)
- **西班牙语** (es-ES)
- **斯洛伐克** (sk-SK)
- **日语** (ja-JP)
- **土耳其语** (tr-TR)
- **韩语** (ko-KR)
- **芬兰语** (fi-FI)
- **印尼语** (id-ID)
- **荷兰语** (nl-NL)

:::

## Frontmatter

### photoSwipe

- 类型：`string | false`
- 详情：当前页面的图片选择器，或 `false` 以在当前页面禁用 photo-swipe

## 客户端配置

### definePhotoSwipeConfig

传递给 [`photo-swipe`](http://photoswipe.com/) 的选项

```ts title=".vuepress/client.ts"
import { definePhotoSwipeConfig } from '@vuepress/plugin-photo-swipe/client'

definePhotoSwipeConfig({
  // 在此设置 PhotoSwipe 选项
})
```

## API

你也可以通过 API 调用 PhotoSwipe。

`createPhotoSwipe` 允许你以编程方式使用 PhotoSwipe 查看图片链接：

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

## 样式

你可以通过 CSS 变量自定义样式：

@[code css](@vuepress/plugin-photo-swipe/src/client/styles/vars.css)
