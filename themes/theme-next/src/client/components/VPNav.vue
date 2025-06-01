<script setup lang="ts">
import VPNavBar from '@theme/VPNavBar.vue'
import VPNavScreen from '@theme/VPNavScreen.vue'
import { inBrowser } from '@theme/constants'
import { useData } from '@theme/data'
import { useNav } from '@theme/nav'
import { computed, provide, watchEffect } from 'vue'
import type { Slot } from '../types.js'

defineSlots<{
  'nav-bar-title-before'?: Slot
  'nav-bar-title-after'?: Slot
  'nav-bar-content-before'?: Slot
  'nav-bar-content-after'?: Slot
  'nav-screen-content-before'?: Slot
  'nav-screen-content-after'?: Slot
}>()

const { isScreenOpen, closeScreen, toggleScreen } = useNav()
const { frontmatter } = useData()

const hasNavbar = computed(() => frontmatter.value.navbar !== false)

provide('close-screen', closeScreen)

watchEffect(() => {
  if (inBrowser) {
    document.documentElement.classList.toggle('hide-nav', !hasNavbar.value)
  }
})
</script>

<template>
  <header v-if="hasNavbar" vp-navbar class="vp-nav">
    <VPNavBar :is-screen-open="isScreenOpen" @toggle-screen="toggleScreen">
      <template #nav-bar-title-before>
        <slot name="nav-bar-title-before" />
      </template>
      <template #nav-bar-title-after>
        <slot name="nav-bar-title-after" />
      </template>
      <template #nav-bar-content-before>
        <slot name="nav-bar-content-before" />
      </template>
      <template #nav-bar-content-after>
        <slot name="nav-bar-content-after" />
      </template>
    </VPNavBar>
    <VPNavScreen :open="isScreenOpen">
      <template #nav-screen-content-before>
        <slot name="nav-screen-content-before" />
      </template>
      <template #nav-screen-content-after>
        <slot name="nav-screen-content-after" />
      </template>
    </VPNavScreen>
  </header>
</template>

<style scoped>
.vp-nav {
  position: relative;
  top: var(--vp-layout-top-height, 0);

  /* rtl:ignore */
  left: 0;
  z-index: var(--vp-z-index-nav);

  width: 100%;

  pointer-events: none;

  transition: background-color 0.5s;
}

@media (min-width: 960px) {
  .vp-nav {
    position: fixed;
  }
}
</style>
