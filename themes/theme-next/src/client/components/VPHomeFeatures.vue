<script setup lang="ts">
import VPFeatures from '@theme/VPFeatures.vue'
import { usePageFrontmatter } from 'vuepress/client'
import type { DefaultThemeHomePageFrontmatter } from '../../shared/index.js'

const fm = usePageFrontmatter<DefaultThemeHomePageFrontmatter>()
</script>

<template>
  <VPFeatures
    v-if="fm.features"
    class="vpHomeFeatures"
    :features="fm.features"
  />
</template>
