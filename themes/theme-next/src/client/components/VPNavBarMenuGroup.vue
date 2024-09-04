<script setup lang="ts">
import VPFlyout from '@theme/VPFlyout.vue'
import { computed } from 'vue'
import { resolveRouteFullPath } from 'vuepress/client'
import type {
  ResolvedNavItem,
  ResolvedNavItemWithChildren,
} from '../../shared/resolved/navbar.js'
import { useData } from '../composables/data.js'
import { isActive } from '../utils/index.js'

const props = defineProps<{
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
      !!props.item.activeMatch,
    )
  }
  return navItem.items.some(isChildActive)
}

const active = computed(
  () =>
    isActive(
      page.value.path,
      props.item.activeMatch,
      !!props.item.activeMatch,
    ) || isChildActive(props.item),
)
</script>

<template>
  <VPFlyout
    class="vp-navbar-menu-group"
    :class="{ active }"
    :button="item.text"
    :items="item.items"
  />
</template>
