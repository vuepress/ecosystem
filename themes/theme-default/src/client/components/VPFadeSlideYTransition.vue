<script setup lang="ts">
import type { VNode } from 'vue'
import '@vuepress/helper/transition/fade-in-down.css'

defineEmits<{
  beforeEnter: []
  beforeLeave: []
}>()
defineSlots<{
  default: () => VNode | string | null
}>()
</script>

<template>
  <Transition
    name="fade-in-down"
    mode="out-in"
    @before-enter="$emit('beforeEnter')"
    @before-leave="$emit('beforeLeave')"
  >
    <slot />
  </Transition>
</template>
