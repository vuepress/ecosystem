<script setup lang="ts">
import VPSponsors from '@theme/VPSponsors.vue'
import type { Sponsor, Sponsors } from '../../shared/index.js'

defineProps<{
  /**
   * Sponsor tier
   */
  tier?: string
  /**
   * Sponsor size
   */
  size?: 'mini' | 'small' | 'xmini'
  /**
   * Sponsor data
   */
  data: Sponsor[] | Sponsors[]
}>()
</script>

<template>
  <div class="vp-doc-aside-sponsors">
    <VPSponsors mode="aside" :tier="tier" :size="size" :data="data" />
  </div>
</template>
