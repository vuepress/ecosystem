---
icon: image-play
---

# photo-swipe

<NpmBadge package="@vuepress/plugin-photo-swipe" />

This plugin provides image gallery functionality with PhotoSwipe, allowing users to view images in an elegant fullscreen lightbox with zoom, navigation, and sharing capabilities.

## Usage

```bash
npm i -D @vuepress/plugin-photo-swipe@next
```

```ts title=".vuepress/config.ts"
import { photoSwipePlugin } from '@vuepress/plugin-photo-swipe'

export default {
  plugins: [
    photoSwipePlugin({
      // options
    }),
  ],
}
```

## Guide

### Preview Mode

In preview mode, you can:

- Swipe left and right to preview other pictures on the page in order
- View the description of the picture
- Zoom in and out of the picture
- View pictures in fullscreen
- Download pictures
- Share pictures

::: tip

- Besides clicking "×" in the upper right corner to exit preview mode, scrolling up and down more than a certain distance will also exit preview mode.
- On mobile devices or when using a PC trackpad, you can use pan and zoom gestures in preview mode.

:::

## Options

:::: fields
@`selector` type=`string | string[]` default=`'[vp-content] :not(a) > img:not([no-view])'`

Image selector.

@`download` type=boolean default=`true`

Whether to show the download button.

@`fullscreen` type=boolean default=`true`

Whether to show the fullscreen button.

@`scrollToClose` type=boolean default=`true`

Whether to close the current image when scrolling.

@`locales` type=`PhotoSwipePluginLocaleConfig`

Locale config of the plugin.

::: details Built-in Supported Languages

- **Simplified Chinese** (zh-CN)
- **Traditional Chinese** (zh-TW)
- **English (United States)** (en-US)
- **German** (de-DE)
- **Russian** (ru-RU)
- **Ukrainian** (uk-UA)
- **Vietnamese** (vi-VN)
- **Portuguese** (pt)
- **Polish** (pl-PL)
- **French** (fr-FR)
- **Spanish** (es-ES)
- **Slovak** (sk-SK)
- **Japanese** (ja-JP)
- **Turkish** (tr-TR)
- **Korean** (ko-KR)
- **Finnish** (fi-FI)
- **Indonesian** (id-ID)
- **Dutch** (nl-NL)

:::

@@`locales.<localePath>.close` type=string

Label text of the close button.

@@`locales.<localePath>.download` type=string

Label text of the download button.

@@`locales.<localePath>.fullscreen` type=string

Label text of the fullscreen button.

@@`locales.<localePath>.zoom` type=string

Label text of the zoom button.

@@`locales.<localePath>.arrowPrev` type=string

Label text of the previous image button.

@@`locales.<localePath>.arrowNext` type=string

Label text of the next image button.

```ts title=".vuepress/config.ts"
import { photoSwipePlugin } from '@vuepress/plugin-photo-swipe'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  locales: {
    '/': {
      // this is a supported language
      lang: 'en-US',
    },
    '/xx/': {
      // the plugin does not support this language
      lang: 'mm-NN',
    },
  },

  plugins: [
    photoSwipePlugin({
      locales: {
        '/': {
          // Override close label text
          close: 'Close Image',
        },

        '/xx/': {
          // Complete locale config for `mm-NN` language here
        },
      },
    }),
  ],
})
```

::::

## Frontmatter

### photoSwipe

- Type: `string | false`
- Details: Image selector for the current page, or `false` to disable photo-swipe on the current page

## Client Config

### definePhotoSwipeConfig

Options passed to [`photo-swipe`](http://photoswipe.com/)

```ts title=".vuepress/client.ts"
import { definePhotoSwipeConfig } from '@vuepress/plugin-photo-swipe/client'

definePhotoSwipeConfig({
  // set photoswipe options here
})
```

## API

You can also call PhotoSwipe with APIs.

`createPhotoSwipe` allows you to programmatically view image links with PhotoSwipe:

```vue
<script setup lang="ts">
import { createPhotoSwipe } from '@vuepress/plugin-photo-swipe/client'
import { onMounted, onUnmounted } from 'vue'

let state: PhotoSwipeState | null = null

const openPhotoSwipe = (index: number): void => {
  state?.open(index - 1)
}

onMounted(async () => {
  // Create a new PhotoSwipe instance with image links
  state = await createPhotoSwipe(
    [
      'https://example.com/image1.png',
      'https://example.com/image2.png',
      'https://example.com/image3.png',
    ],
    {
      // PhotoSwipe options
    },
  )
})

onUnmounted(() => {
  state?.destroy()
})
</script>

<template>
  <button v-for="i in 3" :key="i" type="button" @click="openPhotoSwipe(i)">
    Open photo {{ i }}
  </button>
</template>
```

## Styles

You can customize the style via CSS variables:

@[code css](@vuepress/plugin-photo-swipe/src/client/styles/vars.css)
