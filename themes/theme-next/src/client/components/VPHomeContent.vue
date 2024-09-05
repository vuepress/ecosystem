<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import type { Slot } from '../types.js'

defineSlots<{ default?: Slot }>()

const { width: vw } = useWindowSize({
  initialWidth: 0,
  includeScrollbar: false,
})
</script>

<template>
  <div
    class="vp-doc container"
    vp-content
    :style="vw ? { '--vp-offset': `calc(50% - ${vw / 2}px)` } : {}"
  >
    <slot />
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  max-width: 1280px;
  margin: auto;
  padding: 0 24px;
}

@media (min-width: 640px) {
  .container {
    padding: 0 48px;
  }
}

@media (min-width: 960px) {
  .container {
    width: 100%;
    padding: 0 64px;
  }
}

.vp-doc :deep(.vp-home-sponsors),
.vp-doc :deep(.vp-team-page) {
  margin-right: var(--vp-offset, calc(50% - 50vw));
  margin-left: var(--vp-offset, calc(50% - 50vw));
}

.vp-doc :deep(.vp-home-sponsors h2) {
  border-top: none;
  letter-spacing: normal;
}

.vp-doc :deep(.vp-home-sponsors a),
.vp-doc :deep(.vp-team-page a) {
  text-decoration: none;
}
</style>
