<script setup lang="ts">
import VPNavbarItems from '@theme/VPNavbarItems.vue'
import VPSidebarItems from '@theme/VPSidebarItems.vue'

defineSlots<{
  top?: (props: Record<never, never>) => any
  bottom?: (props: Record<never, never>) => any
}>()
</script>

<template>
  <aside class="sidebar">
    <VPNavbarItems />
    <slot name="top" />
    <VPSidebarItems />
    <slot name="bottom" />
  </aside>
</template>
