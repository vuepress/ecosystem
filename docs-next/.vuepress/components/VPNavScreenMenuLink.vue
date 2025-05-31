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

<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <VPLink
    class="vp-nav-screen-menu-link"
    :href="item.link"
    :target="item.target"
    :rel="item.rel"
    @click="closeScreen"
  >
    <VPIcon v-if="item.icon" :icon="item.icon" class="link-icon" />
    <span v-html="item.text"></span>
  </VPLink>
</template>

<style scoped>
.vp-nav-screen-menu-link {
  display: block;

  padding: 12px 0 11px;
  border-bottom: 1px solid var(--vp-c-divider);

  color: var(--vp-c-text);

  font-weight: 500;
  font-size: 14px;
  line-height: 24px;

  transition:
    border-color 0.25s,
    color 0.25s;
}

.vp-nav-screen-menu-link:hover {
  color: var(--vp-c-accent);
}

.link-icon {
  margin-inline-end: 0.25em;
}
</style>
