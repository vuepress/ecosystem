<script setup lang="ts">
import VPLink from '@theme/VPLink.vue'
import { inject } from 'vue'
import type { ResolvedNavItemWithLink } from '../../shared/index.js'

const { item } = defineProps<{
  /**
   * Menu item
   */
  item: ResolvedNavItemWithLink
}>()

const closeScreen: () => void = inject('close-screen')!
</script>

<template>
  <VPLink
    class="vp-nav-screen-menu-group-link"
    :href="item.link"
    :target="item.target"
    :rel="item.rel"
    @click="closeScreen"
  >
    {{ item.text }}
  </VPLink>
</template>

<style scoped>
.vp-nav-screen-menu-group-link {
  display: block;

  margin-left: 12px;

  color: var(--vp-c-text);

  font-weight: 400;
  font-size: 14px;
  line-height: 32px;

  transition: color var(--vp-t-color);
}

.vp-nav-screen-menu-group-link:hover {
  color: var(--vp-c-accent);
}
</style>
