<script setup lang="ts">
import { useContributors } from '../composables/contributors.js'
import { useData } from '../composables/data.js'

defineProps<{
  /**
   * Contributors align
   */
  align: 'left' | 'right'
}>()

const { theme } = useData()
const contributors = useContributors()
</script>

<template>
  <p
    v-if="contributors?.length"
    class="vp-contributors"
    :style="{ '--vp-contributors-align': align }"
  >
    {{ theme.contributorsText || 'Contributors' }}:
    <template
      v-for="(contributor, index) in contributors"
      :key="contributor.name + index"
    >
      <span class="contributor" :title="`email: ${contributor.email}`">
        {{ contributor.name }}
      </span>
      <template v-if="index !== contributors.length - 1">, </template>
    </template>
  </p>
</template>

<style scoped>
.vp-contributors {
  color: var(--vp-c-text-mute);
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
}

.vp-contributors .contributor {
  color: var(--vp-c-text-subtle);
}

@media (min-width: 640px) {
  .vp-contributors {
    font-weight: 500;
    font-size: 14px;
    line-height: 32px;
    text-align: var(--vp-contributors-align, right);
  }
}
</style>
