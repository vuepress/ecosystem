<script setup lang="ts">
import VPLink from '@theme/VPLink.vue'
import type { ResolvedNavItemWithLink } from '@vuepress/theme-default/client'
import { inject } from 'vue'

const { item } = defineProps<{
  /**
   * Menu item
   */
  item: ResolvedNavItemWithLink
}>()

const closeScreen: () => void = inject('close-screen')!
</script>

<template>
  <VPLink
    class="vp-nav-screen-menu-group-link"
    :href="item.link"
    :target="item.target"
    :rel="item.rel"
    @click="closeScreen"
  >
    <VPIcon v-if="item.icon" :icon="item.icon" class="link-icon" />
    {{ item.text }}
  </VPLink>
</template>

<style scoped>
.vp-nav-screen-menu-group-link {
  display: block;

  margin-left: 12px;

  color: var(--vp-c-text);

  font-weight: 400;
  font-size: 14px;
  line-height: 32px;

  transition: color 0.25s;
}

.vp-nav-screen-menu-group-link:hover {
  color: var(--vp-c-accent);
}

.link-icon {
  margin-inline-end: 0.25em;
}
</style>
