<script setup lang="ts">
import VPImage from '@theme/VPImage.vue'
import VPLink from '@theme/VPLink.vue'
import { computed } from 'vue'
import { useSiteLocaleData } from 'vuepress/client'
import { useData } from '../composables/data.js'
import { useLangs } from '../composables/langs.js'
import { useSidebar } from '../composables/sidebar.js'

const site = useSiteLocaleData()
const { theme } = useData()
const { hasSidebar } = useSidebar()
const { currentLang } = useLangs()

const link = computed(() =>
  typeof theme.value.logoLink === 'string'
    ? theme.value.logoLink
    : theme.value.logoLink?.link,
)

const rel = computed(() =>
  typeof theme.value.logoLink === 'string'
    ? undefined
    : theme.value.logoLink?.rel,
)

const target = computed(() =>
  typeof theme.value.logoLink === 'string'
    ? undefined
    : theme.value.logoLink?.target,
)
</script>

<template>
  <div class="vpNavBarTitle" :class="{ 'has-sidebar': hasSidebar }">
    <VPLink
      class="title"
      :href="link ?? currentLang.link"
      :rel="rel"
      :target="target"
    >
      <slot name="nav-bar-title-before" />
      <VPImage v-if="theme.logo" class="logo" :image="theme.logo" />
      <template v-if="theme.siteTitle">
        <span>{{ theme.siteTitle }}</span>
      </template>
      <template v-else-if="theme.siteTitle === undefined">
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
  border-bottom: 1px solid transparent;
  width: 100%;
  height: var(--vp-nav-height);
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  transition: opacity 0.25s;
}

@media (min-width: 960px) {
  .title {
    flex-shrink: 0;
  }

  .vpNavBarTitle.has-sidebar .title {
    border-bottom-color: var(--vp-c-divider);
  }
}

:deep(.logo) {
  margin-right: 8px;
  height: var(--vp-nav-logo-height);
}
</style>
