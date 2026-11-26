<script setup lang="ts">
import { withBase } from 'vuepress/client'

import type { ThemeableImage } from '../shared.js'

defineProps<{
  image: ThemeableImage
  alt?: string
}>()

defineOptions({ inheritAttrs: false })
</script>

<template>
  <template v-if="image">
    <img
      v-if="typeof image === 'string' || 'src' in image"
      class="vp-image"
      v-bind="typeof image === 'string' ? $attrs : { ...image, ...$attrs }"
      :src="withBase(typeof image === 'string' ? image : image.src)"
      :alt="alt ?? (typeof image === 'string' ? '' : image.alt || '')"
    />
    <template v-else>
      <VPImage
        class="dark"
        :image="image.dark"
        :alt="alt ?? image.alt"
        v-bind="$attrs"
      />
      <VPImage
        class="light"
        :image="image.light"
        :alt="alt ?? image.alt"
        v-bind="$attrs"
      />
    </template>
  </template>
</template>

<style scoped>
html:not([data-theme='dark']) .vp-image.dark {
  display: none;
}

html[data-theme='dark'] .vp-image.light {
  display: none;
}
</style>
