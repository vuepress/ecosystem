<script setup lang="ts">
import VPHomeContent from '@theme/VPHomeContent.vue'
import VPHomeFeatures from '@theme/VPHomeFeatures.vue'
import VPHomeHero from '@theme/VPHomeHero.vue'
import { usePageFrontmatter } from 'vuepress/client'
import type { DefaultThemeHomePageFrontmatter } from '../../shared/index.js'

const frontmatter = usePageFrontmatter<DefaultThemeHomePageFrontmatter>()
</script>

<template>
  <div class="vpHome">
    <slot name="home-hero-before" />
    <VPHomeHero>
      <template #home-hero-info-before>
        <slot name="home-hero-info-before" />
      </template>
      <template #home-hero-info><slot name="home-hero-info" /></template>
      <template #home-hero-info-after>
        <slot name="home-hero-info-after" />
      </template>
      <template #home-hero-actions-after>
        <slot name="home-hero-actions-after" />
      </template>
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
.vpHome {
  margin-bottom: 96px;
}

@media (min-width: 768px) {
  .vpHome {
    margin-bottom: 128px;
  }
}
</style>
