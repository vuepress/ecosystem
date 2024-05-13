<script setup lang="ts">
import VPDoc from '@theme/VPDoc.vue'
import VPHome from '@theme/VPHome.vue'
import VPPage from '@theme/VPPage.vue'
import { useData } from '../composables/data.js'
import { useSidebar } from '../composables/sidebar.js'

const { frontmatter } = useData()
const { hasSidebar } = useSidebar()
</script>

<template>
  <div
    id="VPContent"
    class="vpContent theme-default-content"
    :class="{
      'has-sidebar': hasSidebar,
      'is-home': frontmatter.pageLayout === 'home' || frontmatter.home,
    }"
  >
    <VPPage v-if="frontmatter.pageLayout === 'page'">
      <template #page-top><slot name="page-top" /></template>
      <template #page-bottom><slot name="page-bottom" /></template>
    </VPPage>

    <VPHome v-else-if="frontmatter.pageLayout === 'home' || frontmatter.home">
      <template #home-hero-before><slot name="home-hero-before" /></template>
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
      <template #home-hero-after><slot name="home-hero-after" /></template>
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
      <template #doc-top><slot name="doc-top" /></template>
      <template #doc-bottom><slot name="doc-bottom" /></template>

      <template #doc-footer-before><slot name="doc-footer-before" /></template>
      <template #doc-before><slot name="doc-before" /></template>
      <template #doc-after><slot name="doc-after" /></template>

      <template #aside-top><slot name="aside-top" /></template>
      <template #aside-outline-before>
        <slot name="aside-outline-before" />
      </template>
      <template #aside-outline-after>
        <slot name="aside-outline-after" />
      </template>
      <template #aside-ads-before><slot name="aside-ads-before" /></template>
      <template #aside-ads-after><slot name="aside-ads-after" /></template>
      <template #aside-bottom><slot name="aside-bottom" /></template>
    </VPDoc>
  </div>
</template>

<style scoped>
.vpContent {
  flex-grow: 1;
  flex-shrink: 0;
  margin: var(--vp-layout-top-height, 0px) auto 0;
  width: 100%;
}

.vpContent.is-home {
  width: 100%;
  max-width: 100%;
}

.vpContent.has-sidebar {
  margin: 0;
}

@media (min-width: 960px) {
  .vpContent {
    padding-top: var(--vp-nav-height);
  }

  .vpContent.has-sidebar {
    margin: var(--vp-layout-top-height, 0px) 0 0;
    padding-left: var(--vp-sidebar-width);
  }
}

@media (min-width: 1440px) {
  .vpContent.has-sidebar {
    padding-right: calc((100vw - var(--vp-layout-max-width)) / 2);
    padding-left: calc(
      (100vw - var(--vp-layout-max-width)) / 2 + var(--vp-sidebar-width)
    );
  }
}
</style>
