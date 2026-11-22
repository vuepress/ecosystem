<script setup lang="ts">
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/client'

import { useThemePageFrontmatter } from '../../composables/useThemePageData.js'
import type { ThemeConfig } from '../shared.js'
import VPHomeContent from './VPHomeContent.vue'
import VPHomeFeatures from './VPHomeFeatures.vue'
import VPHomeHero from './VPHomeHero.vue'

const theme = useThemeLocaleData<ThemeConfig>()
const frontmatter = useThemePageFrontmatter()
</script>

<template>
  <div
    class="vp-home"
    :class="{ 'external-link-icon-enabled': theme.externalLinkIcon }"
  >
    <slot name="home-hero-before" />
    <VPHomeHero>
      <template #home-hero-info-before
        ><slot name="home-hero-info-before"
      /></template>
      <template #home-hero-info><slot name="home-hero-info" /></template>
      <template #home-hero-info-after
        ><slot name="home-hero-info-after"
      /></template>
      <template #home-hero-actions-after
        ><slot name="home-hero-actions-after"
      /></template>
      <template #home-hero-actions-before-actions
        ><slot name="home-hero-actions-before-actions"
      /></template>
      <template #home-hero-image><slot name="home-hero-image" /></template>
    </VPHomeHero>
    <slot name="home-hero-after" />

    <slot name="home-features-before" />
    <VPHomeFeatures />
    <slot name="home-features-after" />

    <VPHomeContent v-if="frontmatter.markdownStyles !== false">
      <Content />
    </VPHomeContent>
    <Content v-else />
  </div>
</template>

<style scoped>
.vp-home {
  overflow-x: clip;
  margin-bottom: 6rem;
}

@media (min-width: 48rem) {
  .vp-home {
    margin-bottom: 8rem;
  }
}
</style>
