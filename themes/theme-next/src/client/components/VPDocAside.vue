<script setup lang="ts">
import VPDocAsideCarbonAds from '@theme/VPDocAsideCarbonAds.vue'
import VPDocAsideOutline from '@theme/VPDocAsideOutline.vue'
import { useData } from '@theme/data'
import type { Slot } from '../types.js'

defineSlots<{
  'aside-top'?: Slot
  'aside-bottom'?: Slot
  'aside-outline-before'?: Slot
  'aside-outline-after'?: Slot
  'aside-ads-before'?: Slot
  'aside-ads-after'?: Slot
}>()

const { themeLocale } = useData()
</script>

<template>
  <div class="vp-doc-aside">
    <slot name="aside-top" />

    <slot name="aside-outline-before" />
    <VPDocAsideOutline />
    <slot name="aside-outline-after" />

    <div class="spacer" />

    <slot name="aside-ads-before" />
    <VPDocAsideCarbonAds
      v-if="themeLocale.carbonAds"
      :carbon-ads="themeLocale.carbonAds"
    />
    <slot name="aside-ads-after" />

    <slot name="aside-bottom" />
  </div>
</template>

<style scoped>
.vp-doc-aside {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
}

.spacer {
  flex-grow: 1;
}

.vp-doc-aside :deep(.spacer + .vp-doc-aside-sponsors),
.vp-doc-aside :deep(.spacer + .vp-doc-aside-carbon-ads) {
  margin-top: 24px;
}

.vp-doc-aside :deep(.vp-doc-aside-sponsors + .vp-doc-aside-carbon-ads) {
  margin-top: 16px;
}
</style>
