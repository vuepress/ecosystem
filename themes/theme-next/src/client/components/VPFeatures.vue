<script setup lang="ts">
import VPFeature from '@theme/VPFeature.vue'
import { computed } from 'vue'
import type { Feature } from '../../shared/index.js'

const props = defineProps<{
  /**
   * The list of features
   */
  features: Feature[]
}>()

const grid = computed(() => {
  const { length } = props.features

  if (!length) {
    return ''
  }
  if (length === 2) {
    return 'grid-2'
  }
  if (length === 3) {
    return 'grid-3'
  }
  if (length % 3 === 0) {
    return 'grid-6'
  }
  if (length > 3) {
    return 'grid-4'
  }
  return ''
})
</script>

<template>
  <div v-if="features" class="vp-features">
    <div class="container">
      <div class="items">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="item"
          :class="[grid]"
        >
          <VPFeature
            :icon="feature.icon"
            :title="feature.title"
            :details="feature.details"
            :link="feature.link"
            :link-text="feature.linkText"
            :rel="feature.rel"
            :target="feature.target"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vp-features {
  position: relative;
  padding: 0 24px;
}

@media (min-width: 640px) {
  .vp-features {
    padding: 0 48px;
  }
}

@media (min-width: 960px) {
  .vp-features {
    padding: 0 64px;
  }
}

.container {
  max-width: 1152px;
  margin: 0 auto;
}

.items {
  display: flex;
  flex-wrap: wrap;
  margin: -8px;
}

.item {
  width: 100%;
  padding: 8px;
}

@media (min-width: 640px) {
  /* stylelint-disable-next-line rule-empty-line-before */
  .item.grid-2,
  .item.grid-4,
  .item.grid-6 {
    width: calc(100% / 2);
  }
}

@media (min-width: 768px) {
  /* stylelint-disable-next-line rule-empty-line-before */
  .item.grid-2,
  .item.grid-4 {
    width: calc(100% / 2);
  }

  .item.grid-3,
  .item.grid-6 {
    width: calc(100% / 3);
  }
}

@media (min-width: 960px) {
  .item.grid-4 {
    width: calc(100% / 4);
  }
}
</style>
