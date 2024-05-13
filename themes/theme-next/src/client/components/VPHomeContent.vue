<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'

const { width: vw } = useWindowSize({
  initialWidth: 0,
  includeScrollbar: false,
})
</script>

<template>
  <div
    class="vp-doc container"
    :style="vw ? { '--vp-offset': `calc(50% - ${vw / 2}px)` } : {}"
  >
    <slot />
  </div>
</template>

<style scoped>
.container {
  margin: auto;
  width: 100%;
  max-width: 1280px;
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

.vp-doc :deep(.vpHomeSponsors),
.vp-doc :deep(.vpTeamPage) {
  margin-left: var(--vp-offset, calc(50% - 50vw));
  margin-right: var(--vp-offset, calc(50% - 50vw));
}

.vp-doc :deep(.vpHomeSponsors h2) {
  border-top: none;
  letter-spacing: normal;
}

.vp-doc :deep(.vpHomeSponsors a),
.vp-doc :deep(.vpTeamPage a) {
  text-decoration: none;
}
</style>
