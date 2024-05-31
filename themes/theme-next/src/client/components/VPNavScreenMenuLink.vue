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
  border-bottom: 1px solid var(--vp-c-divider);
  padding: 12px 0 11px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  transition:
    border-color 0.25s,
    color 0.25s;
}

.vp-nav-screen-menu-link:hover {
  color: var(--vp-c-brand-1);
}
</style>
