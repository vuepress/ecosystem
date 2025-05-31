<script setup lang="ts">
import type { Slot } from '@vuepress/helper/client'

defineSlots<{
  default?: Slot
}>()

const setHeight = (item: Element): void => {
  // explicitly set height so that it can be transitioned
  ;(item as HTMLElement).style.height = `${item.scrollHeight}px`
}

const unsetHeight = (item: Element): void => {
  ;(item as HTMLElement).style.height = ''
}
</script>

<template>
  <Transition
    name="vp-dropdown"
    @enter="setHeight"
    @after-enter="unsetHeight"
    @before-leave="setHeight"
  >
    <slot />
  </Transition>
</template>

<style lang="scss">
.vp-dropdown {
  &-enter-from,
  &-leave-to {
    height: 0 !important;
    opacity: 0;
  }

  &-enter-active {
    transition:
      height 0.3s ease-in-out,
      opacity 0.6s ease-out;
  }
}
</style>
