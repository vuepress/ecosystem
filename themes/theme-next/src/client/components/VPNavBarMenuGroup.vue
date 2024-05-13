<script lang="ts" setup>
import VPFlyout from '@theme/VPFlyout.vue'
import { computed } from 'vue'
import { resolveRoutePath } from 'vuepress/client'
import type {
  ResolvedNavItem,
  ResolvedNavItemWithChildren,
} from '../../shared/resolved/navbar.js'
import { useData } from '../composables/data.js'
import { isActive } from '../utils/index.js'

const props = defineProps<{
  item: ResolvedNavItemWithChildren
}>()

const { page } = useData()

const isChildActive = (navItem: ResolvedNavItem): boolean => {
  if ('link' in navItem) {
    return isActive(
      page.value.path,
      resolveRoutePath(navItem.link),
      !!props.item.activeMatch,
    )
  } else {
    return navItem.items.some(isChildActive)
  }
}

const childrenActive = computed(() => isChildActive(props.item))
</script>

<template>
  <VPFlyout
    :class="{
      vpNavBarMenuGroup: true,
      active:
        isActive(page.path, item.activeMatch, !!item.activeMatch) ||
        childrenActive,
    }"
    :button="item.text"
    :items="item.items"
  />
</template>
