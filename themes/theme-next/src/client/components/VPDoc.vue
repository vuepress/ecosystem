<script setup lang="ts">
import VPDocAside from '@theme/VPDocAside.vue'
import VPDocFooter from '@theme/VPDocFooter.vue'
import { computed, nextTick, ref, watch } from 'vue'
import { useRoute } from 'vuepress/client'
import { useData } from '../composables/data.js'
import { useSidebar } from '../composables/sidebar.js'
import type { Slot } from '../types.js'

defineSlots<{
  'doc-top'?: Slot
  'doc-bottom'?: Slot
  'doc-footer-before'?: Slot
  'doc-before'?: Slot
  'doc-after'?: Slot
  'aside-top'?: Slot
  'aside-bottom'?: Slot
  'aside-outline-before'?: Slot
  'aside-outline-after'?: Slot
  'aside-ads-before'?: Slot
  'aside-ads-after'?: Slot
}>()

const { theme, frontmatter } = useData()

const route = useRoute()
const { hasSidebar, hasAside, leftAside } = useSidebar()

const pageName = computed(() =>
  route.path.replace(/[./]+/g, '_').replace(/_html$/, ''),
)
const enabledExternalLinkIcon = computed(
  () =>
    theme.value.externalLinkIcon &&
    frontmatter.value.externalLinkIcon !== false,
)

const asideEl = ref<HTMLElement>()

watch(
  () => route.hash,
  (hash) =>
    nextTick(() => {
      if (!asideEl.value) return
      const activeItem = asideEl.value.querySelector(
        `.outline-link[href="${hash}"]`,
      )
      if (!activeItem || !hash) {
        asideEl.value.scrollTop = 0
        return
      }

      const { top: navTop, height: navHeight } =
        asideEl.value.getBoundingClientRect()
      const { top: activeTop, height: activeHeight } =
        activeItem.getBoundingClientRect()

      if (activeTop < navTop || activeTop + activeHeight > navTop + navHeight)
        activeItem.scrollIntoView({ block: 'center' })
    }),
  { immediate: true },
)
</script>

<template>
  <div
    class="vp-doc-container"
    :class="{ 'has-sidebar': hasSidebar, 'has-aside': hasAside }"
  >
    <slot name="doc-top" />
    <div class="container">
      <div
        v-if="hasAside"
        vp-outline
        class="aside"
        :class="{ 'left-aside': leftAside }"
      >
        <div class="aside-curtain" />
        <div ref="asideEl" class="aside-container">
          <div class="aside-content">
            <VPDocAside>
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
                enabledExternalLinkIcon && 'external-link-icon-enabled',
              ]"
            />
          </main>
          <VPDocFooter>
            <template #doc-footer-before>
              <slot name="doc-footer-before" />
            </template>
          </VPDocFooter>
          <slot name="doc-after" />
        </div>
      </div>
    </div>
    <slot name="doc-bottom" />
  </div>
</template>

<style scoped>
.vp-doc-container {
  width: 100%;
  padding: 32px 24px 96px;
}

@media (min-width: 768px) {
  .vp-doc-container {
    padding: 48px 32px 128px;
  }
}

@media (min-width: 960px) {
  .vp-doc-container {
    padding: 48px 32px 0;
  }

  .vp-doc-container:not(.has-sidebar) .container {
    display: flex;
    justify-content: center;
    max-width: 992px;
  }

  .vp-doc-container:not(.has-sidebar) .content {
    max-width: 752px;
  }
}

@media (min-width: 1280px) {
  .vp-doc-container .container {
    display: flex;
    justify-content: center;
  }

  .vp-doc-container .aside {
    display: block;
  }
}

@media (min-width: 1440px) {
  .vp-doc-container:not(.has-sidebar) .content {
    max-width: 784px;
  }

  .vp-doc-container:not(.has-sidebar) .container {
    max-width: 1104px;
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
  max-width: 256px;
  padding-left: 32px;
}

.left-aside {
  order: 1;
  padding-right: 32px;
  padding-left: unset;
}

.aside-container {
  position: fixed;
  top: 0;

  overflow-x: hidden;
  overflow-y: auto;

  width: 224px;
  height: 100vh;
  padding-top: calc(
    var(--vp-nav-height) + var(--vp-layout-top-height, 0px) +
      var(--vp-doc-top-height, 0px) + 48px
  );

  scrollbar-width: none;
}

.aside-container::-webkit-scrollbar {
  display: none;
}

.aside-curtain {
  position: fixed;
  bottom: 0;
  z-index: 10;

  width: 224px;
  height: 32px;

  background: linear-gradient(transparent, var(--vp-c-bg) 70%);
}

.aside-content {
  display: flex;
  flex-direction: column;
  min-height: calc(
    100vh - (var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 48px)
  );
  padding-bottom: 32px;
}

.content {
  position: relative;
  width: 100%;
  margin: 0 auto;
}

@media (min-width: 960px) {
  .content {
    padding: 0 32px 128px;
  }
}

@media (min-width: 1280px) {
  .content {
    order: 1;
    min-width: 640px;
    margin: 0;
  }
}

.content-container {
  margin: 0 auto;
}

.vp-doc-container.has-aside .content-container {
  max-width: 688px;
}
</style>
