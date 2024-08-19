<script setup lang="ts">
import type { VNode } from 'vue'

defineOptions({
  name: 'CodeGroupItem',
})

defineProps<{
  /**
   * The title of the code group item
   */
  // eslint-disable-next-line vue/no-unused-properties, vue/require-prop-comment
  title: string
  /**
   * Whether the code group item is active
   */
  active?: boolean
}>()

defineSlots<{
  default?: () => VNode | VNode[] | null
}>()
</script>

<template>
  <div class="code-group-item" :class="{ active }" role="tabpanel">
    <slot />
  </div>
</template>
