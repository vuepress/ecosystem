<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import type { CarbonAdsOptions } from '../../shared/index.js'
import { useData } from '../composables/data.js'

defineProps<{
  /**
   * Carbon Ads options
   */
  carbonAds: CarbonAdsOptions
}>()

const { theme } = useData()

const VPCarbonAds = theme.value.carbonAds
  ? defineAsyncComponent(() => import('@theme/VPCarbonAds.vue'))
  : () => null
</script>

<template>
  <div class="vp-doc-aside-carbon-ads">
    <VPCarbonAds :carbon-ads="carbonAds" />
  </div>
</template>
