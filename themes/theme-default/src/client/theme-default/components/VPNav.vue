<script setup lang="ts">
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/client'
import { computed, provide, watchEffect } from 'vue'

import { inBrowser } from '../../composables/inBrowser.js'
import { useThemePageFrontmatter } from '../../composables/useThemePageData.js'
import { navInjectionKey, useNav } from '../composables/useNav.js'
import type { ThemeConfig } from '../shared.js'
import VPNavBar from './VPNavBar.vue'
import VPNavScreen from './VPNavScreen.vue'

const { isScreenOpen, closeScreen, toggleScreen } = useNav()
const frontmatter = useThemePageFrontmatter()
const theme = useThemeLocaleData<ThemeConfig>()

const hasNavbar = computed(() => {
  return frontmatter.value.navbar !== false && theme.value.navbar !== false
})

provide(navInjectionKey, { closeScreen })

watchEffect(() => {
  if (inBrowser) {
    document.documentElement.classList.toggle('hide-nav', !hasNavbar.value)
  }
})
</script>

<template>
  <header v-if="hasNavbar" class="vp-nav">
    <VPNavBar :is-screen-open="isScreenOpen" @toggle-screen="toggleScreen">
      <template #nav-bar-title-before
        ><slot name="nav-bar-title-before"
      /></template>
      <template #nav-bar-title-after
        ><slot name="nav-bar-title-after"
      /></template>
      <template #nav-bar-content-before
        ><slot name="nav-bar-content-before"
      /></template>
      <template #nav-bar-content-after
        ><slot name="nav-bar-content-after"
      /></template>
    </VPNavBar>
    <VPNavScreen :open="isScreenOpen">
      <template #nav-screen-content-before
        ><slot name="nav-screen-content-before"
      /></template>
      <template #nav-screen-content-after
        ><slot name="nav-screen-content-after"
      /></template>
    </VPNavScreen>
  </header>
</template>

<style scoped>
.vp-nav {
  position: relative;
  inset-inline-start: 0;
  top: var(--vp-layout-top-height, 0);
  z-index: var(--vp-z-index-nav);

  width: 100%;

  pointer-events: none;
}

@media (min-width: 60rem) {
  .vp-nav {
    position: fixed;
  }
}
</style>
