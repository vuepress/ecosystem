<script setup lang="ts">
import VPFlyout from '@theme/VPFlyout.vue'
import { useData } from '@theme/data'
import { isActive } from '@theme/isActive'
import type {
  ResolvedNavItem,
  ResolvedNavItemWithChildren,
} from '@vuepress/theme-default/client'
import { computed } from 'vue'
import { resolveRouteFullPath } from 'vuepress/client'

const { item } = defineProps<{
  /**
   * Menu item
   */
  item: ResolvedNavItemWithChildren
}>()

const { page } = useData()

const isChildActive = (navItem: ResolvedNavItem): boolean => {
  if ('link' in navItem) {
    return isActive(
      page.value.path,
      resolveRouteFullPath(navItem.link),
      !!item.activeMatch,
    )
  }
  return navItem.items.some(isChildActive)
}

const active = computed(
  () =>
    isActive(page.value.path, item.activeMatch, !!item.activeMatch) ||
    isChildActive(item),
)
</script>

<template>
  <VPFlyout
    class="vp-navbar-menu-group"
    :class="{ active }"
    :button="item.text"
    :items="item.items"
    :prefix-icon="item.icon"
  />
</template>
