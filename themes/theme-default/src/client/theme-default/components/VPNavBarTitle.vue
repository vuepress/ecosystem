<script setup lang="ts">
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/client'
import { computed } from 'vue'
import { RouteLink, useSiteLocaleData } from 'vuepress/client'

import { useLangs } from '../composables/useLangs.js'
import { useLayout } from '../composables/useLayout.js'
import type { ThemeConfig } from '../shared.js'
import { normalizeLink } from '../support/utils.js'
import VPImage from './VPImage.vue'

const theme = useThemeLocaleData<ThemeConfig>()
const site = useSiteLocaleData()
const { hasSidebar } = useLayout()
const { currentLang } = useLangs()

const link = computed(() =>
  typeof theme.value.logoLink === 'string'
    ? theme.value.logoLink
    : theme.value.logoLink?.link,
)

/**
 * Whether the title links to another page of the current site, so that the
 * client router handles it instead of reloading the page
 *
 * 标题是否链接到站内页面，此时由客户端路由处理而不是刷新页面
 */
const isInternalRoute = computed(
  () => !link.value || !/^[a-z][a-z+.-]*:/iu.test(link.value),
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

// strip tags until the string stops changing: a single pass over a string
// like `"<scr<script>ipt>"` can leave a tag behind
const stripTags = (value: string): string => {
  let text = value
  let previous: string

  do {
    previous = text
    text = text.replace(/<[^>]+>/g, '')
  } while (text !== previous)

  return text
}

// plain-text form of the rendered title (`siteTitle` may contain HTML),
// surfaced as a native tooltip since the sidebar column truncates it
const textTitle = computed(() => {
  if (theme.value.siteTitle === false) return undefined
  const raw = theme.value.siteTitle ?? site.value.title
  return stripTags(raw).trim() || undefined
})
</script>

<template>
  <div class="vp-navbar-title" :class="{ 'has-sidebar': hasSidebar }">
    <RouteLink
      v-if="isInternalRoute"
      class="title"
      :to="link ?? currentLang.link"
      :title="textTitle"
    >
      <slot name="nav-bar-title-before" />
      <VPImage v-if="theme.logo" class="logo" :image="theme.logo" />
      <span v-if="theme.siteTitle" dir="auto" v-html="theme.siteTitle"></span>
      <span v-else-if="theme.siteTitle === undefined">{{ site.title }}</span>
      <slot name="nav-bar-title-after" />
    </RouteLink>
    <a
      v-else
      class="title"
      :href="normalizeLink(link ?? currentLang.link)"
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

  color: var(--vp-c-text);

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
