<script setup lang="ts">
import VPLink from '@theme/VPLink.vue'
import { resolveRoutePath } from 'vuepress/client'
import type { ResolvedNavItemWithLink } from '../../shared/resolved/navbar.js'
import { useData } from '../composables/data.js'
import { isActive } from '../utils/index.js'

defineProps<{
  item: ResolvedNavItemWithLink
}>()

const { page } = useData()
</script>

<template>
  <VPLink
    :class="{
      'vp-navbar-menu-link': true,
      'active': isActive(
        page.path,
        item.activeMatch || resolveRoutePath(item.link),
        !!item.activeMatch,
      ),
    }"
    :href="item.link"
    :no-icon="item.noIcon"
    :target="item.target"
    :rel="item.rel"
    tabindex="0"
  >
    <span v-html="item.text"></span>
  </VPLink>
</template>

<style scoped>
.vp-navbar-menu-link {
  display: flex;
  align-items: center;

  padding: 0 12px;

  color: var(--vp-c-text-1);

  font-weight: 500;
  font-size: 14px;

  transition: color 0.25s;
}

.vp-navbar-menu-link.active {
  color: var(--vp-c-brand-1);
}

.vp-navbar-menu-link:hover {
  color: var(--vp-c-brand-1);
}
</style>
