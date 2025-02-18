<script setup lang="ts">
import { useLastUpdated } from '../composables/last-updated.js'

const { lastUpdatedText, isoDatetime, datetime } = useLastUpdated()
</script>

<template>
  <p v-if="datetime" class="vp-last-updated">
    {{ lastUpdatedText }}:
    <time :datetime="isoDatetime">{{ datetime }}</time>
  </p>
</template>

<style scoped>
.vp-last-updated {
  color: var(--vp-c-text-mute);
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
}

@media (min-width: 640px) {
  .vp-last-updated {
    font-weight: 500;
    font-size: 14px;
    line-height: 32px;
  }
}
</style>
