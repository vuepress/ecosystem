<script setup lang="ts">
import { useContributors } from '../composables/contributors.js'
import { useData } from '../composables/data.js'

defineProps<{
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
      :key="contributor + index"
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
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.vp-contributors .contributor {
  color: var(--vp-c-text-3);
}

@media (min-width: 640px) {
  .vp-contributors {
    line-height: 32px;
    font-size: 14px;
    font-weight: 500;
    text-align: var(--vp-contributors-align, right);
  }
}
</style>
