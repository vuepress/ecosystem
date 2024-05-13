<script setup lang="ts">
import VPSponsorsGrid from '@theme/VPSponsorsGrid.vue'
import { computed } from 'vue'
import type { Sponsor, Sponsors } from '../../shared/index.js'
import type { GridSize } from '../composables/sponsor-grid.js'

interface Props {
  mode?: 'normal' | 'aside'
  tier?: string
  size?: GridSize
  data: Sponsors[] | Sponsor[]
}
const props = withDefaults(defineProps<Props>(), {
  mode: 'normal',
  tier: undefined,
  size: undefined,
})

const sponsors = computed(() => {
  const isSponsors = props.data.some((s) => {
    return 'items' in s
  })

  if (isSponsors) {
    return props.data as Sponsors[]
  }

  return [
    { tier: props.tier, size: props.size, items: props.data as Sponsor[] },
  ]
})
</script>

<template>
  <div class="vpSponsors vp-sponsor" :class="[mode]">
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
