<script setup lang="ts">
import VPDocAsideOutline from './VPDocAsideOutline.vue'
</script>

<template>
  <div class="vp-doc-aside">
    <slot name="aside-top" />

    <slot name="aside-outline-before" />
    <VPDocAsideOutline />
    <slot name="aside-outline-after" />

    <div class="spacer" />

    <slot name="aside-ads-before" />
    <slot name="aside-ads-after" />

    <slot name="aside-bottom" />
  </div>
</template>

<style scoped>
.vp-doc-aside {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
}

.spacer {
  flex-grow: 1;
}

.vp-doc-aside :deep(.spacer + .vp-doc-aside-sponsors) {
  margin-top: 1.5rem;
}
</style>
