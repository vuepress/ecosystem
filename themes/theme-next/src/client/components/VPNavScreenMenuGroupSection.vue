<script lang="ts" setup>
import VPNavScreenMenuGroupLink from '@theme/VPNavScreenMenuGroupLink.vue'
import type { ResolvedNavItemWithLink } from '../../shared/resolved/navbar.js'

defineProps<{
  text?: string
  items: ResolvedNavItemWithLink[]
}>()
</script>

<template>
  <div class="vpNavScreenMenuGroupSection">
    <p v-if="text" class="title">{{ text }}</p>
    <VPNavScreenMenuGroupLink
      v-for="item in items"
      :key="item.text"
      :item="item"
    />
  </div>
</template>

<style scoped>
.vpNavScreenMenuGroupSection {
  display: block;
}

.title {
  line-height: 32px;
  font-size: 13px;
  font-weight: 700;
  color: var(--vp-c-text-2);
  transition: color 0.25s;
}
</style>
