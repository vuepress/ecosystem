<script setup lang="ts">
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/client'
import { computed } from 'vue'
import { useRoute, useSiteData } from 'vuepress/client'

import { useRuntimeBase } from '../../composables/site.js'
import { useLayout } from '../composables/layout.js'
import { isRelativeBase, type DefaultTheme } from '../shared.js'
import VPDocAside from './VPDocAside.vue'
import VPDocFooter from './VPDocFooter.vue'

const theme = useThemeLocaleData<DefaultTheme.Config>()
const site = useSiteData()
const runtimeBase = useRuntimeBase()
const route = useRoute()
const { hasSidebar, hasAside, leftAside } = useLayout()

const pageName = computed(() => {
  // the mount point is unknown at build time, so the class must come from
  // the site-relative path or ssr and hydration disagree
  const path = isRelativeBase(site.value.base)
    ? '/' + route.path.slice(runtimeBase.value.length)
    : route.path
  return path.replace(/[./]+/g, '_').replace(/_html$/, '')
})
</script>

<template>
  <div
    class="vp-doc"
    :class="{ 'has-sidebar': hasSidebar, 'has-aside': hasAside }"
  >
    <slot name="doc-top" />
    <div class="container">
      <div v-if="hasAside" class="aside" :class="{ 'left-aside': leftAside }">
        <div class="aside-curtain" />
        <div class="aside-container">
          <div class="aside-content">
            <VPDocAside>
              <template #aside-top><slot name="aside-top" /></template>
              <template #aside-bottom><slot name="aside-bottom" /></template>
              <template #aside-outline-before
                ><slot name="aside-outline-before"
              /></template>
              <template #aside-outline-after
                ><slot name="aside-outline-after"
              /></template>
              <template #aside-ads-before
                ><slot name="aside-ads-before"
              /></template>
              <template #aside-ads-after
                ><slot name="aside-ads-after"
              /></template>
            </VPDocAside>
          </div>
        </div>
      </div>

      <div class="content">
        <div class="content-container">
          <slot name="doc-before" />
          <main class="main">
            <Content
              class="vp-doc"
              :class="[
                pageName,
                theme.externalLinkIcon && 'external-link-icon-enabled',
              ]"
            />
          </main>
          <VPDocFooter>
            <template #doc-footer-before
              ><slot name="doc-footer-before"
            /></template>
          </VPDocFooter>
          <slot name="doc-after" />
        </div>
      </div>
    </div>
    <slot name="doc-bottom" />
  </div>
</template>

<style scoped>
.vp-doc {
  width: 100%;
  padding: 2rem 1.5rem 6rem;
}

@media (min-width: 48rem) {
  .vp-doc {
    padding: 3rem 2rem 8rem;
  }
}

@media (min-width: 60rem) {
  .vp-doc {
    padding: 3rem 2rem 0;
  }

  .vp-doc:not(.has-sidebar) .container {
    display: flex;
    justify-content: center;
    max-width: 62rem;
  }

  .vp-doc:not(.has-sidebar) .content {
    max-width: 47rem;
  }
}

@media (min-width: 80rem) {
  .vp-doc .container {
    display: flex;
    justify-content: center;
  }

  .vp-doc .aside {
    display: block;
  }
}

@media (min-width: 90rem) {
  .vp-doc:not(.has-sidebar) .content {
    max-width: 49rem;
  }

  .vp-doc:not(.has-sidebar) .container {
    max-width: 69rem;
  }
}

.container {
  width: 100%;
  margin: 0 auto;
}

.aside {
  position: relative;

  display: none;
  flex-grow: 1;
  order: 2;

  width: 100%;
  max-width: 16rem;
  padding-inline-start: 2rem;
}

.left-aside {
  order: 1;
  padding-inline-start: unset;
  padding-inline-end: 2rem;
}

.aside-container {
  --vp-doc-aside-offset: calc(
    var(--vp-layout-top-height, 0px) + var(--vp-doc-top-height, 0px)
  );
  position: fixed;
  top: 0;

  overflow: hidden auto;

  width: 14rem;
  height: 100vh;
  padding-top: calc(var(--vp-nav-height) + var(--vp-doc-aside-offset) + 3rem);

  overscroll-behavior: contain;

  scrollbar-width: none;
}

.aside-container::-webkit-scrollbar {
  display: none;
}

.aside-curtain {
  position: fixed;
  bottom: 0;
  z-index: 10;

  width: 14rem;
  height: 2rem;

  background: linear-gradient(transparent, var(--vp-c-bg) 70%);

  pointer-events: none;
}

.aside-content {
  display: flex;
  flex-direction: column;
  min-height: calc(
    100vh - (var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 3rem)
  );
  padding-bottom: 2rem;
}

.content {
  position: relative;
  width: 100%;
  margin: 0 auto;
}

@media (min-width: 60rem) {
  .content {
    padding: 0 2rem 8rem;
  }
}

@media (min-width: 80rem) {
  .content {
    order: 1;
    min-width: 40rem;
    margin: 0;
  }
}

.content-container {
  margin: 0 auto;
}

.vp-doc.has-aside .content-container {
  max-width: 43rem;
}
</style>
