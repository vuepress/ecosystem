<script setup lang="ts">
import { computed } from 'vue'

import type { DefaultTheme } from '../shared.js'
import VPFeature from './VPFeature.vue'

export interface Feature {
  icon?: DefaultTheme.FeatureIcon
  title: string
  details: string
  link?: string
  linkText?: string
  rel?: string
  target?: string
}

const props = defineProps<{
  features: Feature[]
}>()

const grid = computed(() => {
  const length = props.features.length

  if (!length) {
    return
  } else if (length === 2) {
    return 'grid-2'
  } else if (length === 3) {
    return 'grid-3'
  } else if (length % 3 === 0) {
    return 'grid-6'
  } else if (length > 3) {
    return 'grid-4'
  }
})
</script>

<template>
  <div v-if="features" class="vp-features">
    <div class="container">
      <ul class="items">
        <li
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
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.vp-features {
  position: relative;
  padding: 0 1.5rem;
}

@media (min-width: 40rem) {
  .vp-features {
    padding: 0 3rem;
  }
}

@media (min-width: 60rem) {
  .vp-features {
    padding: 0 4rem;
  }
}

.container {
  max-width: 72rem;
  margin: 0 auto;
}

.items {
  display: flex;
  flex-wrap: wrap;
  margin: -0.5rem;
}

.item {
  width: 100%;
  padding: 0.5rem;
}

@media (min-width: 40rem) {
  .item.grid-2,
  .item.grid-4,
  .item.grid-6 {
    width: calc(100% / 2);
  }
}

@media (min-width: 48rem) {
  .item.grid-2,
  .item.grid-4 {
    width: calc(100% / 2);
  }

  .item.grid-3,
  .item.grid-6 {
    width: calc(100% / 3);
  }
}

@media (min-width: 60rem) {
  .item.grid-4 {
    width: calc(100% / 4);
  }
}
</style>
