<script setup lang="ts">
import VPDocAsideCarbonAds from '@theme/VPDocAsideCarbonAds.vue'
import VPDocAsideOutline from '@theme/VPDocAsideOutline.vue'
import { useData } from '../composables/data.js'

const { theme } = useData()
</script>

<template>
  <div class="vpDocAside">
    <slot name="aside-top" />

    <slot name="aside-outline-before" />
    <VPDocAsideOutline />
    <slot name="aside-outline-after" />

    <div class="spacer" />

    <slot name="aside-ads-before" />
    <VPDocAsideCarbonAds v-if="theme.carbonAds" :carbon-ads="theme.carbonAds" />
    <slot name="aside-ads-after" />

    <slot name="aside-bottom" />
  </div>
</template>

<style scoped>
.vpDocAside {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.spacer {
  flex-grow: 1;
}

.vpDocAside :deep(.spacer + .vpDocAsideSponsors),
.vpDocAside :deep(.spacer + .vpDocAsideCarbonAds) {
  margin-top: 24px;
}

.vpDocAside :deep(.vpDocAsideSponsors + .vpDocAsideCarbonAds) {
  margin-top: 16px;
}
</style>
