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
  <div class="vpMenuLink">
    <VPLink
      :class="{
        active: isActive(
          page.path,
          item.activeMatch || resolveRoutePath(item.link),
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
.vpMenuGroup + .vpMenuLink {
  margin: 12px -12px 0;
  border-top: 1px solid var(--vp-c-divider);
  padding: 12px 12px 0;
}

.link {
  display: block;
  border-radius: 6px;
  padding: 0 12px;
  line-height: 32px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  transition:
    background-color 0.25s,
    color 0.25s;
}

.link:hover {
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-default-soft);
}

.link.active {
  color: var(--vp-c-brand-1);
}
</style>
