<script setup lang="ts">
defineSlots<{
  default?: (props: Record<never, never>) => any
}>()

const setHeight = (items): void => {
  // explicitly set height so that it can be transitioned
  items.style.height = items.scrollHeight + 'px'
}

const unsetHeight = (items): void => {
  items.style.height = ''
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
  }
}
</style>
