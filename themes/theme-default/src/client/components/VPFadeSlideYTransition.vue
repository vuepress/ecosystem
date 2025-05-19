<script setup lang="ts">
import type { SingleSlot } from '@vuepress/helper/client'
import '@vuepress/helper/transition/fade-in-down.css'

defineEmits<{
  beforeEnter: []
  beforeLeave: []
}>()
defineSlots<{
  default: SingleSlot
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
