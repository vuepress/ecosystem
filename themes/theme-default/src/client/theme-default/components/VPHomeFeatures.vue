<script setup lang="ts">
import { useThemePageFrontmatter } from '../../composables/useThemePageData.js'
import VPFeatures from './VPFeatures.vue'

const fm = useThemePageFrontmatter()
</script>

<template>
  <VPFeatures
    v-if="fm.features"
    class="vp-home-features"
    :features="fm.features"
  />
</template>
