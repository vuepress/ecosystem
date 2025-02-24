<script setup lang="ts">
import VPFeatures from '@theme/VPFeatures.vue'
import { usePageFrontmatter } from 'vuepress/client'
import type { DefaultThemeHomePageFrontmatter } from '../../shared/index.js'

const frontmatter = usePageFrontmatter<DefaultThemeHomePageFrontmatter>()
</script>

<template>
  <VPFeatures
    v-if="frontmatter.features"
    class="vp-home-features"
    :features="frontmatter.features"
  />
</template>
