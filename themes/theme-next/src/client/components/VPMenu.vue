<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import VPMenuGroup from '@theme/VPMenuGroup.vue'
import VPMenuLink from '@theme/VPMenuLink.vue'
import type { Slot } from '../types.js'

defineProps<{
  /**
   * Menu items
   */
  items?: any[]
}>()

defineSlots<{ default?: Slot }>()
</script>

<template>
  <div class="vp-menu">
    <div v-if="items" class="items">
      <template v-for="item in items" :key="item.text">
        <VPMenuLink v-if="'link' in item" :item="item" />
        <VPMenuGroup v-else :text="item.text" :items="item.items" />
      </template>
    </div>

    <slot />
  </div>
</template>

<style scoped>
.vp-menu {
  overflow-y: auto;

  min-width: 128px;
  max-height: calc(100vh - var(--vp-nav-height));
  padding: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;

  background-color: var(--vp-c-bg-elv);
  box-shadow: var(--vp-shadow-3);

  transition: background-color 0.5s;
}

.vp-menu :deep(.group) {
  margin: 0 -12px;
  padding: 0 12px 12px;
}

.vp-menu :deep(.group + .group) {
  padding: 11px 12px 12px;
  border-top: 1px solid var(--vp-c-divider);
}

.vp-menu :deep(.group:last-child) {
  padding-bottom: 0;
}

.vp-menu :deep(.group + .item) {
  padding: 11px 16px 0;
  border-top: 1px solid var(--vp-c-divider);
}

.vp-menu :deep(.item) {
  padding: 0 16px;
  white-space: nowrap;
}

.vp-menu :deep(.label) {
  flex-grow: 1;

  color: var(--vp-c-text-mute);

  font-weight: 500;
  font-size: 12px;
  line-height: 28px;

  transition: color 0.5s;
}

.vp-menu :deep(.action) {
  padding-left: 24px;
}
</style>
