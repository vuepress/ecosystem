<script lang="ts" setup>
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
      vpNavBarMenuLink: true,
      active: isActive(
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
.vpNavBarMenuLink {
  display: flex;
  align-items: center;
  padding: 0 12px;
  line-height: var(--vp-nav-height);
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  transition: color 0.25s;
}

.vpNavBarMenuLink.active {
  color: var(--vp-c-brand-1);
}

.vpNavBarMenuLink:hover {
  color: var(--vp-c-brand-1);
}
</style>
