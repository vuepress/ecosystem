<script setup lang="ts">
import VPSponsorsGrid from '@theme/VPSponsorsGrid.vue'
import type { GridSize } from '@theme/sponsor-grid'
import { computed } from 'vue'
import type { Sponsor, Sponsors } from '../../shared/index.js'

interface Props {
  /**
   * Sponsor mode
   */
  mode?: 'aside' | 'normal'
  /**
   * Sponsor tier
   */
  tier?: string
  /**
   * Sponsor size
   */
  size?: GridSize
  /**
   * Sponsor data
   */
  data: Sponsor[] | Sponsors[]
}
const {
  mode = 'normal',
  tier = undefined,
  size = undefined,
  data,
} = defineProps<Props>()

const sponsors = computed(() => {
  const isSponsors = data.some((s: Sponsor | Sponsors) => 'items' in s)

  if (isSponsors) {
    return data as Sponsors[]
  }

  return [{ tier, size, items: data as Sponsor[] }]
})
</script>

<template>
  <div class="vp-sponsor" :class="[mode]">
    <section
      v-for="(sponsor, index) in sponsors"
      :key="index"
      class="vp-sponsor-section"
    >
      <h3 v-if="sponsor.tier" class="vp-sponsor-tier">{{ sponsor.tier }}</h3>
      <VPSponsorsGrid :size="sponsor.size" :data="sponsor.items" />
    </section>
  </div>
</template>
