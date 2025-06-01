<script setup lang="ts">
import VPDoc from '@theme/VPDoc.vue'
import VPHome from '@theme/VPHome.vue'
import VPPage from '@theme/VPPage.vue'
import { useData } from '@theme/data'
import { useSidebar } from '@theme/sidebar'
import type { Slot } from '../types.js'

defineSlots<{
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
}>()

const { frontmatter } = useData()
const { hasSidebar } = useSidebar()
</script>

<template>
  <div
    id="VPContent"
    class="vp-content"
    :class="{
      'has-sidebar': hasSidebar,
      'is-home': frontmatter.pageLayout === 'home' || frontmatter.home,
    }"
  >
    <VPPage v-if="frontmatter.pageLayout === 'page'">
      <template #page-top>
        <slot name="page-top" />
      </template>
      <template #page-bottom>
        <slot name="page-bottom" />
      </template>
    </VPPage>

    <VPHome v-else-if="frontmatter.pageLayout === 'home' || frontmatter.home">
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
    </VPHome>

    <component
      :is="frontmatter.pageLayout"
      v-else-if="frontmatter.pageLayout && frontmatter.pageLayout !== 'doc'"
    />

    <VPDoc v-else>
      <template #doc-top>
        <slot name="doc-top" />
      </template>
      <template #doc-bottom>
        <slot name="doc-bottom" />
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

      <template #aside-top>
        <slot name="aside-top" />
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
      <template #aside-bottom>
        <slot name="aside-bottom" />
      </template>
    </VPDoc>
  </div>
</template>

<style scoped>
.vp-content {
  flex-grow: 1;
  flex-shrink: 0;
  width: 100%;
  margin: var(--vp-layout-top-height, 0) auto 0;
}

.vp-content.is-home {
  width: 100%;
  max-width: 100%;
}

.vp-content.has-sidebar {
  margin: 0;
}

@media (min-width: 960px) {
  .vp-content {
    padding-top: var(--vp-nav-height);
  }

  .vp-content.has-sidebar {
    margin: var(--vp-layout-top-height, 0) 0 0;
    padding-left: var(--vp-sidebar-width);
  }
}

@media (min-width: 1440px) {
  .vp-content.has-sidebar {
    padding-right: calc((100vw - var(--vp-layout-max-width)) / 2);
    padding-left: calc(
      (100vw - var(--vp-layout-max-width)) / 2 + var(--vp-sidebar-width)
    );
  }
}
</style>
