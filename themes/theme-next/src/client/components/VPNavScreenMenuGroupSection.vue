<script setup lang="ts">
import VPNavScreenMenuGroupLink from '@theme/VPNavScreenMenuGroupLink.vue'
import type { ResolvedNavItemWithLink } from '../../shared/index.js'

const { text = '', items } = defineProps<{
  /**
   * Group text
   */
  text?: string
  /**
   * Group items
   */
  items: ResolvedNavItemWithLink[]
}>()
</script>

<template>
  <div class="vp-nav-screen-menu-group-section">
    <p v-if="text" class="title">{{ text }}</p>
    <VPNavScreenMenuGroupLink
      v-for="item in items"
      :key="item.text"
      :item="item"
    />
  </div>
</template>

<style scoped>
.vp-nav-screen-menu-group-section {
  display: block;
}

.title {
  color: var(--vp-c-text-mute);

  font-weight: 700;
  font-size: 13px;
  line-height: 32px;

  transition: color var(--vp-t-color);
}
</style>
