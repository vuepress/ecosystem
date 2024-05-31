<script setup lang="ts">
import VPMenuGroup from '@theme/VPMenuGroup.vue'
import VPMenuLink from '@theme/VPMenuLink.vue'

defineProps<{
  items?: any[]
}>()
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
  border-radius: 12px;
  padding: 12px;
  min-width: 128px;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-elv);
  box-shadow: var(--vp-shadow-3);
  transition: background-color 0.5s;
  max-height: calc(100vh - var(--vp-nav-height));
  overflow-y: auto;
}

.vp-menu :deep(.group) {
  margin: 0 -12px;
  padding: 0 12px 12px;
}

.vp-menu :deep(.group + .group) {
  border-top: 1px solid var(--vp-c-divider);
  padding: 11px 12px 12px;
}

.vp-menu :deep(.group:last-child) {
  padding-bottom: 0;
}

.vp-menu :deep(.group + .item) {
  border-top: 1px solid var(--vp-c-divider);
  padding: 11px 16px 0;
}

.vp-menu :deep(.item) {
  padding: 0 16px;
  white-space: nowrap;
}

.vp-menu :deep(.label) {
  flex-grow: 1;
  line-height: 28px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  transition: color 0.5s;
}

.vp-menu :deep(.action) {
  padding-left: 24px;
}
</style>
