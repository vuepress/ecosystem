<script setup lang="ts">
import VPBackdrop from '@theme/VPBackdrop.vue'
import VPContent from '@theme/VPContent.vue'
import VPFooter from '@theme/VPFooter.vue'
import VPLocalNav from '@theme/VPLocalNav.vue'
import VPNav from '@theme/VPNav.vue'
import VPSidebar from '@theme/VPSidebar.vue'
import VPSkipLink from '@theme/VPSkipLink.vue'
import { computed, provide, useSlots, watch } from 'vue'
import { useRoute } from 'vuepress/client'
import {
  useCloseSidebarOnEscape,
  useData,
  useSidebar,
} from '../composables/index.js'
import type { Slot } from '../types.js'

defineSlots<{
  'layout-top'?: Slot
  'layout-bottom'?: Slot
  'custom-content'?: Slot
  'page-top'?: Slot
  'page-bottom': Slot
  'home-hero-before'?: Slot
  'home-hero-info-before'?: Slot
  'home-hero-info'?: Slot
  'home-hero-info-after'?: Slot
  'home-hero-actions-after'?: Slot
  'home-hero-image'?: Slot
  'home-hero-after'?: Slot
  'home-features'?: Slot
  'home-features-after'?: Slot
  'home-features-before'?: Slot
  'doc-top'?: Slot
  'doc-bottom'?: Slot
  'doc-before'?: Slot
  'doc-footer-before'?: Slot
  'doc-after'?: Slot
  'aside-top'?: Slot
  'aside-bottom'?: Slot
  'aside-outline-before'?: Slot
  'aside-outline-after'?: Slot
  'aside-ads-before'?: Slot
  'aside-ads-after'?: Slot
  'nav-bar-title-before'?: Slot
  'nav-bar-title-after'?: Slot
  'nav-bar-content-before'?: Slot
  'nav-bar-content-after'?: Slot
  'nav-screen-content-before'?: Slot
  'nav-screen-content-after'?: Slot
  'sidebar-nav-before'?: Slot
  'sidebar-nav-after'?: Slot
}>()

const route = useRoute()

const {
  isOpen: isSidebarOpen,
  open: openSidebar,
  close: closeSidebar,
} = useSidebar()

watch(() => route.path, closeSidebar)

useCloseSidebarOnEscape(isSidebarOpen, closeSidebar)

const { frontmatter } = useData()

const slots = useSlots()
const heroImageSlotExists = computed(() => !!slots['home-hero-image'])

provide('hero-image-slot-exists', heroImageSlotExists)
</script>

<template>
  <div
    v-if="frontmatter.pageLayout !== false"
    class="vp-layout"
    :class="frontmatter.pageClass"
  >
    <slot name="layout-top" />

    <VPSkipLink />

    <VPBackdrop class="backdrop" :show="isSidebarOpen" @click="closeSidebar" />

    <VPNav>
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
      <template #nav-screen-content-before>
        <slot name="nav-screen-content-before" />
      </template>
      <template #nav-screen-content-after>
        <slot name="nav-screen-content-after" />
      </template>
    </VPNav>

    <VPLocalNav :open="isSidebarOpen" @open-menu="openSidebar" />

    <VPSidebar :open="isSidebarOpen">
      <template #sidebar-nav-before>
        <slot name="sidebar-nav-before" />
      </template>
      <template #sidebar-nav-after>
        <slot name="sidebar-nav-after" />
      </template>
    </VPSidebar>

    <slot name="custom-content">
      <VPContent>
        <template #page-top>
          <slot name="page-top" />
        </template>
        <template #page-bottom>
          <slot name="page-bottom" />
        </template>
        <template #home-hero-before>
          <slot name="home-hero-before" />
        </template>
        <template #home-hero-info-before>
          <slot name="home-hero-info-before" />
        </template>
        <template #home-hero-info>
          <slot name="home-hero-info" />
        </template>
        <template #home-hero-info-after>
          <slot name="home-hero-info-after" />
        </template>
        <template #home-hero-actions-after>
          <slot name="home-hero-actions-after" />
        </template>
        <template #home-hero-image>
          <slot name="home-hero-image" />
        </template>
        <template #home-hero-after>
          <slot name="home-hero-after" />
        </template>
        <template #home-features-before>
          <slot name="home-features-before" />
        </template>
        <template #home-features-after>
          <slot name="home-features-after" />
        </template>

        <template #doc-footer-before>
          <slot name="doc-footer-before" />
        </template>
        <template #doc-before>
          <slot name="doc-before" />
        </template>
        <template #doc-after>
          <slot name="doc-after" />
        </template>
        <template #doc-top>
          <slot name="doc-top" />
        </template>
        <template #doc-bottom>
          <slot name="doc-bottom" />
        </template>

        <template #aside-top>
          <slot name="aside-top" />
        </template>
        <template #aside-bottom>
          <slot name="aside-bottom" />
        </template>
        <template #aside-outline-before>
          <slot name="aside-outline-before" />
        </template>
        <template #aside-outline-after>
          <slot name="aside-outline-after" />
        </template>
        <template #aside-ads-before>
          <slot name="aside-ads-before" />
        </template>
        <template #aside-ads-after>
          <slot name="aside-ads-after" />
        </template>
      </VPContent>
    </slot>
    <VPFooter />
    <slot name="layout-bottom" />
  </div>

  <Content v-else />
</template>

<style scoped>
.vp-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
