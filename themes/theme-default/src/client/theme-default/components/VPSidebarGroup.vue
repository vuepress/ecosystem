<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

import type { SidebarItem } from '../shared.js'
import VPSidebarItem from './VPSidebarItem.vue'

defineProps<{
  items: SidebarItem[]
}>()

const disableTransition = ref(true)

let timer: ReturnType<typeof setTimeout> | null = null

onMounted(() => {
  timer = setTimeout(() => {
    timer = null
    disableTransition.value = false
  }, 300)
})

onBeforeUnmount(() => {
  if (timer != null) {
    clearTimeout(timer)
    timer = null
  }
})
</script>

<template>
  <div
    v-for="item in items"
    :key="item.text"
    class="group"
    :class="{ 'no-transition': disableTransition }"
  >
    <VPSidebarItem :item :depth="0" />
  </div>
</template>

<style scoped>
.no-transition :deep(.caret-icon) {
  transition: none;
}

.group + .group {
  padding-top: 0.625rem;
  border-top: 1px solid var(--vp-c-divider);
}

@media (min-width: 60rem) {
  .group {
    width: calc(var(--vp-sidebar-width) - 4rem);
    padding-top: 0.625rem;
  }
}
</style>
