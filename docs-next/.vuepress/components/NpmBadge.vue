<script setup lang="ts">
import { computed } from 'vue'

const { package: packageName, distTag = 'next' } = defineProps<{
  /** package name */
  package: string
  /** dist tag */
  distTag?: string
}>()

const badgeLink = computed(
  () => `https://www.npmjs.com/package/${packageName}/v/next`,
)
const badgeLabel = computed(() => {
  if (distTag) {
    return `${packageName}@${distTag}`
  }
  return packageName
})
const badgeImg = computed(
  () =>
    `https://badgen.net/npm/v/${packageName}/${
      distTag
    }?label=${encodeURIComponent(badgeLabel.value)}`,
)
</script>

<template>
  <a
    class="npm-badge"
    :href="badgeLink"
    :title="package"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img :src="badgeImg" :alt="package" />
  </a>
</template>

<style lang="scss" scoped>
.npm-badge {
  margin-right: 0.5rem;

  &::after {
    display: none !important;
  }
}
</style>
