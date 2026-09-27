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

See also: [Locales](../supported-locales.md).

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

::::

## Frontmatter

::: fields
@`photoSwipe` type=`boolean | string`

Image selector for the current page.

A string overrides the [selector](#selector) option for the current page, `false` disables the plugin on the current page, and `true` or leaving it unset uses the plugin option.

:::

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

### createPhotoSwipe

You can also call PhotoSwipe with APIs. `createPhotoSwipe` allows you to programmatically view image links with PhotoSwipe. It takes the image links and the PhotoSwipe options, and resolves to a [PhotoSwipeState](#photoswipestate):

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

### PhotoSwipeState

The state returned by `createPhotoSwipe`, which controls the PhotoSwipe instance it creates:

::: fields
@`open` type=`(index: number) => void`

Open PhotoSwipe at the given image index.

@`close` type=`() => void`

Close the PhotoSwipe instance.

@`destroy` type=`() => void`

Release the listeners of the state. Call it when the state is no longer needed, e.g. when the component that holds it is unmounted.

:::

## Styles

You can customize the style via CSS variables:

@[code css](@vuepress/plugin-photo-swipe/src/client/styles/vars.css)
