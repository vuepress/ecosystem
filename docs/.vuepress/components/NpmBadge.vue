<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  package: {
    type: String,
    required: true,
  },
  distTag: {
    type: String,
    default: 'next',
  },
})

const badgeLink = computed(
  () => `https://www.npmjs.com/package/${props.package}/v/next`,
)
const badgeLabel = computed(() => {
  if (props.distTag) {
    return `${props.package}@${props.distTag}`
  }
  return props.package
})
const badgeImg = computed(
  () =>
    `https://badgen.net/npm/v/${props.package}/${
      props.distTag
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
