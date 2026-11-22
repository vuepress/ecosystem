<script lang="ts" setup>
defineProps<{
  show: boolean
}>()
</script>

<template>
  <transition name="fade">
    <div v-if="show" class="vp-backdrop" />
  </transition>
</template>

<style scoped>
.vp-backdrop {
  position: fixed;
  inset: 0;
  z-index: var(--vp-z-index-backdrop);

  background: var(--vp-backdrop-bg-color);

  transition: opacity 0.5s;
}

.vp-backdrop.fade-enter-from,
.vp-backdrop.fade-leave-to {
  opacity: 0;
}

.vp-backdrop.fade-leave-active {
  transition-duration: 0.25s;
}

@media (min-width: 80rem) {
  .vp-backdrop {
    display: none;
  }
}
</style>
