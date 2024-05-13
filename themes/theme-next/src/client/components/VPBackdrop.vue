<script lang="ts" setup>
defineProps<{
  show: boolean
}>()
</script>

<template>
  <Transition name="fade">
    <div v-if="show" class="vpBackdrop" />
  </Transition>
</template>

<style scoped>
.vpBackdrop {
  position: fixed;
  top: 0;
  /*rtl:ignore*/
  right: 0;
  bottom: 0;
  /*rtl:ignore*/
  left: 0;
  z-index: var(--vp-z-index-backdrop);
  background: var(--vp-backdrop-bg-color);
  transition: opacity 0.5s;
}

.vpBackdrop.fade-enter-from,
.vpBackdrop.fade-leave-to {
  opacity: 0;
}

.vpBackdrop.fade-leave-active {
  transition-duration: 0.25s;
}

@media (min-width: 1280px) {
  .vpBackdrop {
    display: none;
  }
}
</style>
