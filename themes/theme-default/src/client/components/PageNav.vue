<script setup lang="ts">
import AutoLink from '@theme/AutoLink.vue'
import { computed } from 'vue'
import type { Router } from 'vuepress/client'
import { usePageFrontmatter, useRoute, useRouter } from 'vuepress/client'
import { isPlainObject, isString } from 'vuepress/shared'
import type {
  DefaultThemeNormalPageFrontmatter,
  NavLink,
  ResolvedSidebarItem,
} from '../../shared/index.js'
import { useSidebarItems, useThemeLocaleData } from '../composables/index.js'
import { getNavLink } from '../utils/index.js'

/**
 * Resolve `prev` or `next` config from frontmatter
 */
const resolveFromFrontmatterConfig = (
  router: Router,
  conf: unknown,
): null | false | NavLink => {
  if (conf === false) {
    return null
  }

  if (isString(conf)) {
    return getNavLink(router, conf)
  }

  if (isPlainObject<NavLink>(conf)) {
    return conf
  }

  return false
}

/**
 * Resolve `prev` or `next` config from sidebar items
 */
const resolveFromSidebarItems = (
  sidebarItems: ResolvedSidebarItem[],
  currentPath: string,
  offset: number,
): null | NavLink => {
  const index = sidebarItems.findIndex((item) => item.link === currentPath)
  if (index !== -1) {
    const targetItem = sidebarItems[index + offset]
    if (!targetItem?.link) {
      return null
    }
    return targetItem as NavLink
  }

  for (const item of sidebarItems) {
    if (item.children) {
      const childResult = resolveFromSidebarItems(
        item.children,
        currentPath,
        offset,
      )
      if (childResult) {
        return childResult
      }
    }
  }

  return null
}

const frontmatter = usePageFrontmatter<DefaultThemeNormalPageFrontmatter>()
const sidebarItems = useSidebarItems()
const route = useRoute()
const router = useRouter()

const prevNavLink = computed(() => {
  const prevConfig = resolveFromFrontmatterConfig(
    router,
    frontmatter.value.prev,
  )
  if (prevConfig !== false) {
    return prevConfig
  }

  return resolveFromSidebarItems(sidebarItems.value, route.path, -1)
})

const nextNavLink = computed(() => {
  const nextConfig = resolveFromFrontmatterConfig(
    router,
    frontmatter.value.next,
  )
  if (nextConfig !== false) {
    return nextConfig
  }

  return resolveFromSidebarItems(sidebarItems.value, route.path, 1)
})

const navbarLabel = computed(() => {
  const themeLocale = useThemeLocaleData()
  return themeLocale.value.pageNavbarLabel ?? 'page navigation'
})
</script>

<template>
  <nav
    v-if="prevNavLink || nextNavLink"
    class="page-nav"
    :aria-label="navbarLabel"
  >
    <p class="inner">
      <span v-if="prevNavLink" class="prev">
        <AutoLink :item="prevNavLink" />
      </span>

      <span v-if="nextNavLink" class="next">
        <AutoLink :item="nextNavLink" />
      </span>
    </p>
  </nav>
</template>
