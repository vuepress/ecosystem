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

<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <VPLink
    class="vp-nav-screen-menu-link"
    :href="item.link"
    :target="item.target"
    :rel="item.rel"
    @click="closeScreen"
    v-html="item.text"
  />
</template>

<style scoped>
.vp-nav-screen-menu-link {
  display: block;

  padding: 12px 0 11px;
  border-bottom: 1px solid var(--vp-c-divider);

  color: var(--vp-c-text);

  font-weight: 500;
  font-size: 14px;
  line-height: 24px;

  transition:
    border-color 0.25s,
    color 0.25s;
}

.vp-nav-screen-menu-link:hover {
  color: var(--vp-c-accent);
}
</style>
