<script lang="ts" setup>
import VPMenuLink from '@theme/VPMenuLink.vue'

defineProps<{
  text?: string
  items: any[]
}>()
</script>

<template>
  <div class="vpMenuGroup">
    <p v-if="text" class="title">{{ text }}</p>

    <template v-for="item in items">
      <VPMenuLink v-if="'link' in item" :key="item.link" :item="item" />
    </template>
  </div>
</template>

<style scoped>
.vpMenuGroup {
  margin: 12px -12px 0;
  border-top: 1px solid var(--vp-c-divider);
  padding: 12px 12px 0;
}

.vpMenuGroup:first-child {
  margin-top: 0;
  border-top: 0;
  padding-top: 0;
}

.vpMenuGroup + .vpMenuGroup {
  margin-top: 12px;
  border-top: 1px solid var(--vp-c-divider);
}

.title {
  padding: 0 12px;
  line-height: 32px;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  transition: color 0.25s;
}
</style>
