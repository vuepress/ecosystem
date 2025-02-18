<script setup lang="ts">
import VPLink from '@theme/VPLink.vue'
import { resolveRouteFullPath } from 'vuepress/client'
import type { ResolvedNavItemWithLink } from '../../shared/resolved/navbar.js'
import { useData } from '../composables/data.js'
import { isActive } from '../utils/index.js'

defineProps<{
  /**
   * Menu item
   */
  item: ResolvedNavItemWithLink
}>()

const { page } = useData()
</script>

<template>
  <div class="vp-menu-link">
    <VPLink
      :class="{
        active: isActive(
          page.path,
          item.activeMatch || resolveRouteFullPath(item.link),
          !!item.activeMatch,
        ),
      }"
      :href="item.link"
      :target="item.target"
      :rel="item.rel"
    >
      {{ item.text }}
    </VPLink>
  </div>
</template>

<style scoped>
.vp-menu-group + .vp-menu-link {
  margin: 12px -12px 0;
  padding: 12px 12px 0;
  border-top: 1px solid var(--vp-c-divider);
}

.link {
  display: block;

  padding: 0 12px;
  border-radius: 6px;

  color: var(--vp-c-text);

  font-weight: 500;
  font-size: 14px;
  line-height: 32px;
  white-space: nowrap;

  transition:
    background-color 0.25s,
    color 0.25s;
}

.link:hover {
  background-color: var(--vp-c-default-soft);
  color: var(--vp-c-accent);
}

.link.active {
  color: var(--vp-c-accent);
}
</style>
