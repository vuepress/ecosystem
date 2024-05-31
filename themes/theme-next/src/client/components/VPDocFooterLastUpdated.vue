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
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

@media (min-width: 640px) {
  .vp-last-updated {
    line-height: 32px;
    font-size: 14px;
    font-weight: 500;
  }
}
</style>
