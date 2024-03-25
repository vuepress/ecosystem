<script setup lang="ts">
import AutoLink from '@theme/AutoLink.vue'
import { useEventListener } from '@vueuse/core'
import { computed } from 'vue'
import type { Router } from 'vuepress/client'
import { usePageFrontmatter, useRoute, useRouter } from 'vuepress/client'
import { isPlainObject, isString } from 'vuepress/shared'
import type {
  DefaultThemeNormalPageFrontmatter,
  NavLink,
  ResolvedSidebarItem,
} from '../../shared/index.js'
import {
  useNavigate,
  useSidebarItems,
  useThemeLocaleData,
} from '../composables/index.js'
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
const themeLocale = useThemeLocaleData()
const route = useRoute()
const router = useRouter()
const navigate = useNavigate()

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

useEventListener('keydown', (event): void => {
  if (event.altKey)
    if (event.key === 'ArrowRight') {
      if (nextNavLink.value) {
        navigate(nextNavLink.value.link)
        event.preventDefault()
      }
    } else if (event.key === 'ArrowLeft') {
      if (prevNavLink.value) {
        navigate(prevNavLink.value.link)
        event.preventDefault()
      }
    }
})
</script>

<template>
  <nav
    v-if="prevNavLink || nextNavLink"
    class="vp-page-nav"
    :aria-label="navbarLabel"
  >
    <AutoLink v-if="prevNavLink" class="prev" :item="prevNavLink">
      <div class="hint">
        <span class="arrow left" />
        {{ themeLocale.prev ?? 'Prev' }}
      </div>
      <div class="link">
        <span>{{ prevNavLink.text }}</span>
      </div>
    </AutoLink>

    <AutoLink v-if="nextNavLink" class="next" :item="nextNavLink">
      <div class="hint">
        {{ themeLocale.next ?? 'Next' }}
        <span class="arrow right" />
      </div>
      <div class="link">
        <span>{{ nextNavLink.text }}</span>
      </div>
    </AutoLink>
  </nav>
</template>

<style lang="scss">
@import '../styles/_variables';

.vp-page-nav {
  display: flex;
  flex-wrap: wrap;

  max-width: var(--content-width, 740px);
  min-height: 2rem;
  margin-inline: auto;
  margin-top: 0;
  padding-block: 0.5rem;
  padding-inline: 2rem;
  border-top: 1px solid var(--c-border);

  transition: border-top var(--t-color);

  @media (max-width: $MQNarrow) {
    padding-inline: 1rem;
  }

  @media print {
    display: none;
  }

  padding-top: 1rem;
  padding-bottom: 0;

  @media print {
    display: none;
  }

  .route-link {
    display: inline-block;
    flex-grow: 1;

    margin: 0.25rem;
    padding: 0.25rem 0.5rem;
    border: 1px solid var(--c-border);
    border-radius: 0.25rem;

    &:hover {
      background: var(--c-bg-light);
    }

    .hint {
      color: var(--c-text-quote);
      font-size: 0.875rem;
      line-height: 2;
    }
  }

  .prev {
    text-align: start;
  }

  .next {
    text-align: end;
  }
}
</style>
