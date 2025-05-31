<script setup lang="ts">
import VPImage from '@theme/VPImage.vue'
import VPLink from '@theme/VPLink.vue'
import { useData } from '@theme/data'
import { useLangs } from '@theme/langs'
import { useSidebar } from '@theme/sidebar'
import { computed } from 'vue'
import { useSiteLocaleData } from 'vuepress/client'
import type { Slot } from '../types.js'

defineSlots<{
  'nav-bar-title-before'?: Slot
  'nav-bar-title-after'?: Slot
}>()

const site = useSiteLocaleData()
const { themeLocale } = useData()
const { hasSidebar } = useSidebar()
const { currentLang } = useLangs()

const link = computed(() =>
  typeof themeLocale.value.logoLink === 'string'
    ? themeLocale.value.logoLink
    : themeLocale.value.logoLink?.link,
)

const rel = computed(() =>
  typeof themeLocale.value.logoLink === 'string'
    ? undefined
    : themeLocale.value.logoLink?.rel,
)

const target = computed(() =>
  typeof themeLocale.value.logoLink === 'string'
    ? undefined
    : themeLocale.value.logoLink?.target,
)
</script>

<template>
  <div class="vp-navbar-title" :class="{ 'has-sidebar': hasSidebar }">
    <VPLink
      class="title"
      :href="link ?? currentLang.link"
      :rel="rel"
      :target="target"
    >
      <slot name="nav-bar-title-before" />
      <VPImage v-if="themeLocale.logo" class="logo" :image="themeLocale.logo" />
      <template v-if="themeLocale.siteTitle">
        <span>{{ themeLocale.siteTitle }}</span>
      </template>
      <template v-else-if="themeLocale.siteTitle === undefined">
        <span>{{ site.title }}</span>
      </template>
      <slot name="nav-bar-title-after" />
    </VPLink>
  </div>
</template>

<style scoped>
.title {
  display: flex;
  align-items: center;

  width: 100%;
  height: var(--vp-nav-height);
  border-bottom: 1px solid transparent;

  color: var(--vp-c-text);

  font-weight: 600;
  font-size: 16px;

  transition: opacity 0.25s;
}

@media (min-width: 960px) {
  .title {
    flex-shrink: 0;
  }

  .vp-navbar-title.has-sidebar .title {
    border-bottom-color: var(--vp-c-divider);
  }
}

:deep(.logo) {
  height: var(--vp-nav-logo-height);
  margin-right: 8px;
}
</style>
