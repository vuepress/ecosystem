<script setup lang="ts">
import VPLink from '@theme/VPLink.vue'
import { useData } from '@theme/data'
import { isActive } from '@theme/isActive'
import type { ResolvedNavItemWithLink } from '@vuepress/theme-default/client'
import { resolveRouteFullPath } from 'vuepress/client'

const { item } = defineProps<{
  /**
   * Menu item
   */
  item: ResolvedNavItemWithLink
}>()

const { page } = useData()
</script>

<template>
  <VPLink
    class="vp-navbar-menu-link"
    :class="{
      active: isActive(
        page.path,
        item.activeMatch || resolveRouteFullPath(item.link),
        !!item.activeMatch,
      ),
    }"
    :href="item.link"
    :no-icon="item.noIcon"
    :target="item.target"
    :rel="item.rel"
    tabindex="0"
  >
    <VPIcon v-if="item.icon" :icon="item.icon" class="link-icon" />
    <span v-html="item.text"></span>
  </VPLink>
</template>

<style scoped>
.vp-navbar-menu-link {
  display: flex;
  align-items: center;

  padding: 0 12px;

  color: var(--vp-c-text);

  font-weight: 500;
  font-size: 14px;

  transition: color 0.25s;
}

.vp-navbar-menu-link.active {
  color: var(--vp-c-accent);
}

.vp-navbar-menu-link:hover {
  color: var(--vp-c-accent);
}

.link-icon {
  margin-inline-end: 0.25em;
}
</style>
