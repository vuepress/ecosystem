<script setup lang="ts">
import VPSponsors from '@theme/VPSponsors.vue'
import type { Sponsor, Sponsors } from '../../shared/index.js'

defineProps<{
  tier?: string
  size?: 'xmini' | 'mini' | 'small'
  data: Sponsors[] | Sponsor[]
}>()
</script>

<template>
  <div class="vp-doc-aside-sponsors">
    <VPSponsors mode="aside" :tier="tier" :size="size" :data="data" />
  </div>
</template>
