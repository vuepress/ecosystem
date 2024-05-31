<script setup lang="ts">
import { useEventListener } from '@vueuse/core'
import { computed } from 'vue'
import {
  AutoLink,
  resolveRoute,
  usePageFrontmatter,
  useRoute,
} from 'vuepress/client'
import type { AutoLinkConfig } from 'vuepress/client'
import { isPlainObject, isString } from 'vuepress/shared'
import type {
  DefaultThemeNormalPageFrontmatter,
  ResolvedSidebarItem,
} from '../../shared/index.js'
import {
  useNavigate,
  useSidebarItems,
  useThemeLocaleData,
} from '../composables/index.js'

/**
 * Resolve `prev` or `next` config from frontmatter
 */
const resolveFromFrontmatterConfig = (
  conf: unknown,
  current: string,
): null | false | AutoLinkConfig => {
  if (conf === false) {
    return null
  }

  if (isString(conf)) {
    const { notFound, meta, path } = resolveRoute<{
      title?: string
    }>(conf, current)

    return notFound
      ? { text: path, link: path }
      : {
          text: meta.title || path,
          link: path,
        }
  }

  if (isPlainObject<AutoLinkConfig>(conf)) {
    return {
      ...conf,
      link: resolveRoute(conf.link, current).path,
    }
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
): null | AutoLinkConfig => {
  const index = sidebarItems.findIndex((item) => item.link === currentPath)
  if (index !== -1) {
    const targetItem = sidebarItems[index + offset]
    if (!targetItem?.link) {
      return null
    }
    return targetItem as AutoLinkConfig
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
const navigate = useNavigate()

const prevNavLink = computed(() => {
  const prevConfig = resolveFromFrontmatterConfig(
    frontmatter.value.prev,
    route.path,
  )
  if (prevConfig !== false) {
    return prevConfig
  }

  return resolveFromSidebarItems(sidebarItems.value, route.path, -1)
})

const nextNavLink = computed(() => {
  const nextConfig = resolveFromFrontmatterConfig(
    frontmatter.value.next,
    route.path,
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
    <AutoLink v-if="prevNavLink" class="prev" :config="prevNavLink">
      <div class="hint">
        <span class="arrow left" />
        {{ themeLocale.prev ?? 'Prev' }}
      </div>
      <div class="link">
        <span>{{ prevNavLink.text }}</span>
      </div>
    </AutoLink>

    <AutoLink v-if="nextNavLink" class="next" :config="nextNavLink">
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
@import '../styles/variables';

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
