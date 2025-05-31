<script setup lang="ts">
import VPNavScreenMenuGroupLink from '@theme/VPNavScreenMenuGroupLink.vue'
import type { ResolvedNavItemWithLink } from '@vuepress/theme-default/client'

const {
  text = '',
  items,
  icon = '',
} = defineProps<{
  /**
   * Group text
   */
  text?: string
  /**
   * Group icon
   */
  icon?: string
  /**
   * Group items
   */
  items: ResolvedNavItemWithLink[]
}>()
</script>

<template>
  <div class="vp-nav-screen-menu-group-section">
    <p v-if="text" class="title">
      <VPIcon v-if="icon" :icon="icon" class="icon" />
      {{ text }}
    </p>
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

  transition: color 0.25s;
}

.title .icon {
  margin-inline-end: 0.25em;
}
</style>
