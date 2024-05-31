<script setup lang="ts">
import VPLink from '@theme/VPLink.vue'
import { inject } from 'vue'
import type { ResolvedNavItemWithLink } from '../../shared/resolved/navbar.js'

defineProps<{
  item: ResolvedNavItemWithLink
}>()

const closeScreen = inject('close-screen') as () => void
</script>

<template>
  <VPLink
    class="vp-nav-screen-menu-group"
    :href="item.link"
    :target="item.target"
    :rel="item.rel"
    @click="closeScreen"
  >
    {{ item.text }}
  </VPLink>
</template>

<style scoped>
.vp-nav-screen-menu-group {
  display: block;
  margin-left: 12px;
  line-height: 32px;
  font-size: 14px;
  font-weight: 400;
  color: var(--vp-c-text-1);
  transition: color 0.25s;
}

.vp-nav-screen-menu-group:hover {
  color: var(--vp-c-brand-1);
}
</style>
