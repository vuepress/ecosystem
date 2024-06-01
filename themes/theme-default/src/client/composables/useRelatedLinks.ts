import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import { resolveRoute, usePageFrontmatter, useRoute } from 'vuepress/client'
import type { AutoLinkConfig } from 'vuepress/client'
import { isPlainObject, isString } from 'vuepress/shared'
import type { DefaultThemeNormalPageFrontmatter } from '../../shared/index.js'
import type { SidebarItem } from '../typings.js'
import { useSidebarItems } from './useSidebarItems.js'

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
  sidebarItems: SidebarItem[],
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
    if ('children' in item) {
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

interface RelatedLinks {
  prevLink: ComputedRef<AutoLinkConfig | null>
  nextLink: ComputedRef<AutoLinkConfig | null>
}

export const useRelatedLinks = (): RelatedLinks => {
  const frontmatter = usePageFrontmatter<DefaultThemeNormalPageFrontmatter>()
  const sidebarItems = useSidebarItems()
  const route = useRoute()

  const prevLink = computed(() => {
    const prevConfig = resolveFromFrontmatterConfig(
      frontmatter.value.prev,
      route.path,
    )
    if (prevConfig !== false) {
      return prevConfig
    }

    return resolveFromSidebarItems(sidebarItems.value, route.path, -1)
  })

  const nextLink = computed(() => {
    const nextConfig = resolveFromFrontmatterConfig(
      frontmatter.value.next,
      route.path,
    )
    if (nextConfig !== false) {
      return nextConfig
    }

    return resolveFromSidebarItems(sidebarItems.value, route.path, 1)
  })

  return {
    prevLink,
    nextLink,
  }
}
