<script setup lang="ts">
import { useData } from '@theme/data'
import { defineAsyncComponent } from 'vue'
import type { CarbonAdsOptions } from '../../shared/index.js'

const { carbonAds } = defineProps<{
  /**
   * Carbon Ads options
   */
  carbonAds: CarbonAdsOptions
}>()

const { themeLocale } = useData()

const VPCarbonAds = themeLocale.value.carbonAds
  ? defineAsyncComponent(() => import('@theme/VPCarbonAds.vue'))
  : () => null
</script>

<template>
  <div class="vp-doc-aside-carbon-ads">
    <VPCarbonAds :carbon-ads="carbonAds" />
  </div>
</template>
