<script setup lang="ts">
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/client'
import { computed } from 'vue'
import { useSiteLocaleData } from 'vuepress/client'

import { useLangs } from '../composables/langs.js'
import { useLayout } from '../composables/layout.js'
import type { DefaultTheme } from '../shared.js'
import { normalizeLink } from '../support/utils.js'
import VPImage from './VPImage.vue'

const theme = useThemeLocaleData<DefaultTheme.Config>()
const site = useSiteLocaleData()
const { hasSidebar } = useLayout()
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

// plain-text form of the rendered title (`siteTitle` may contain HTML),
// surfaced as a native tooltip since the sidebar column truncates it
const textTitle = computed(() => {
  if (theme.value.siteTitle === false) return undefined
  const raw = theme.value.siteTitle ?? site.value.title
  return raw.replace(/<[^>]+>/g, '').trim() || undefined
})
</script>

<template>
  <div class="vp-navbar-title" :class="{ 'has-sidebar': hasSidebar }">
    <a
      class="title"
      :href="link ?? normalizeLink(currentLang.link)"
      :rel
      :target
      :title="textTitle"
    >
      <slot name="nav-bar-title-before" />
      <VPImage v-if="theme.logo" class="logo" :image="theme.logo" />
      <span v-if="theme.siteTitle" dir="auto" v-html="theme.siteTitle"></span>
      <span v-else-if="theme.siteTitle === undefined">{{ site.title }}</span>
      <slot name="nav-bar-title-after" />
    </a>
  </div>
</template>

<style scoped>
.title {
  display: flex;
  align-items: center;

  width: 100%;
  height: var(--vp-nav-height);

  color: var(--vp-c-text-1);

  font-weight: 600;
  font-size: 1rem;

  transition: opacity 0.25s;
}

/* wherever the bar runs out of room, the title text gives way first */
.title > span {
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (min-width: 60rem) {
  .title {
    flex-shrink: 0;
  }

  /* the sidebar column has a fixed width — truncate at the divider
     segment's edge (2rem inset from the column); the outer column box
     keeps its full reserved width */
  .vp-navbar-title.has-sidebar {
    max-width: calc(var(--vp-sidebar-width) - 4rem);
  }
}

:deep(.logo) {
  flex: none;
  height: var(--vp-nav-logo-height);
  margin-inline-end: 0.5rem;
}
</style>
