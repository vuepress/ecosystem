<script setup lang="ts">
import { ref } from 'vue'
import type { Sponsor } from '../../shared/index.js'
import type { GridSize } from '../composables/sponsor-grid.js'
import { useSponsorsGrid } from '../composables/sponsor-grid.js'

interface Props {
  /**
   * Sponsor size
   */
  size?: GridSize
  /**
   * Sponsor data
   */
  data: Sponsor[]
}
const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
})

const el = ref<HTMLElement | null>(null)

// eslint-disable-next-line vue/no-setup-props-reactivity-loss
useSponsorsGrid({ el, size: props.size })
</script>

<template>
  <div ref="el" class="vp-sponsor-grid" :class="[size]">
    <div
      v-for="sponsor in data"
      :key="sponsor.name"
      class="vp-sponsor-grid-item"
    >
      <a
        class="vp-sponsor-grid-link"
        :href="sponsor.url"
        target="_blank"
        rel="sponsored noopener noreferrer"
      >
        <article class="vp-sponsor-grid-box">
          <h4 class="visually-hidden">{{ sponsor.name }}</h4>
          <img
            class="vp-sponsor-grid-image"
            :src="sponsor.img"
            :alt="sponsor.name"
          />
        </article>
      </a>
    </div>
  </div>
</template>
