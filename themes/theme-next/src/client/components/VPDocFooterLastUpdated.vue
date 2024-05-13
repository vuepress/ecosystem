<script setup lang="ts">
import { useLastUpdated } from '../composables/last-updated.js'

const { lastUpdatedText, isoDatetime, datetime } = useLastUpdated()
</script>

<template>
  <p v-if="datetime" class="vpLastUpdated">
    {{ lastUpdatedText }}:
    <time :datetime="isoDatetime">{{ datetime }}</time>
  </p>
</template>

<style scoped>
.vpLastUpdated {
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

@media (min-width: 640px) {
  .vpLastUpdated {
    line-height: 32px;
    font-size: 14px;
    font-weight: 500;
  }
}
</style>
