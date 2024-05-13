<script lang="ts" setup>
import VPMenuGroup from '@theme/VPMenuGroup.vue'
import VPMenuLink from '@theme/VPMenuLink.vue'

defineProps<{
  items?: any[]
}>()
</script>

<template>
  <div class="vpMenu">
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
.vpMenu {
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

.vpMenu :deep(.group) {
  margin: 0 -12px;
  padding: 0 12px 12px;
}

.vpMenu :deep(.group + .group) {
  border-top: 1px solid var(--vp-c-divider);
  padding: 11px 12px 12px;
}

.vpMenu :deep(.group:last-child) {
  padding-bottom: 0;
}

.vpMenu :deep(.group + .item) {
  border-top: 1px solid var(--vp-c-divider);
  padding: 11px 16px 0;
}

.vpMenu :deep(.item) {
  padding: 0 16px;
  white-space: nowrap;
}

.vpMenu :deep(.label) {
  flex-grow: 1;
  line-height: 28px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  transition: color 0.5s;
}

.vpMenu :deep(.action) {
  padding-left: 24px;
}
</style>
