<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import VPMenuLink from '@theme/VPMenuLink.vue'

const { text = '', items } = defineProps<{
  /**
   * Menu group
   */
  text?: string
  /**
   * Menu items
   */
  items: any[]
}>()
</script>

<template>
  <div class="vp-menu-group">
    <p v-if="text" class="title">{{ text }}</p>

    <template v-for="item in items">
      <VPMenuLink v-if="'link' in item" :key="item.link" :item="item" />
    </template>
  </div>
</template>

<style scoped>
.vp-menu-group {
  margin: 12px -12px 0;
  padding: 12px 12px 0;
  border-top: 1px solid var(--vp-c-divider);
}

.vp-menu-group:first-child {
  margin-top: 0;
  padding-top: 0;
  border-top: 0;
}

.vp-menu-group + .vp-menu-group {
  margin-top: 12px;
  border-top: 1px solid var(--vp-c-divider);
}

.title {
  padding: 0 12px;

  color: var(--vp-c-text-mute);

  font-weight: 600;
  font-size: 14px;
  line-height: 32px;
  white-space: nowrap;

  transition: color 0.25s;
}
</style>
