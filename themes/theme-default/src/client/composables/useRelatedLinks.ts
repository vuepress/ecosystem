import { resolveAutoLink } from '@theme/resolveAutoLink'
import { useSidebarItems } from '@theme/useSidebarItems'
import { useThemeLocaleData } from '@theme/useThemeData'
import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import { resolveRoute, usePageFrontmatter, useRoute } from 'vuepress/client'
import { isPlainObject, isString } from 'vuepress/shared'
import type {
  AutoLinkOptions,
  DefaultThemeNormalPageFrontmatter,
} from '../../shared/index.js'
import type { SidebarItem } from '../typings.js'

const resolveFromFrontmatterConfig = (
  config: AutoLinkOptions | string | false | undefined,
  currentPath: string,
): AutoLinkOptions | false | null => {
  if (config === false) {
    return false
  }

  if (isString(config)) {
    return resolveAutoLink(config, currentPath)
  }

  if (isPlainObject(config)) {
    return {
      ...config,
      link: resolveAutoLink(config.link, currentPath).link,
    }
  }

  return null
}
/**
 * Resolve `prev` or `next` config from sidebar items
 */
const resolveFromSidebarItems = (
  sidebarItems: SidebarItem[],
  currentPath: string,
  offset: number,
): AutoLinkOptions | null => {
  const linkIndex = sidebarItems.findIndex((item) => item.link === currentPath)

  if (linkIndex !== -1) {
    const targetItem = sidebarItems[linkIndex + offset] as
      | SidebarItem
      | undefined

    if (!targetItem) return null

    if (targetItem.link) return targetItem as AutoLinkOptions

    if ('prefix' in targetItem && !resolveRoute(targetItem.prefix!).notFound)
      return {
        ...targetItem,
        link: targetItem.prefix!,
      }

    return null
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

  const prefixIndex = sidebarItems.findIndex(
    (item) => 'prefix' in item && item.prefix === currentPath,
  )

  if (prefixIndex !== -1) {
    const targetItem = sidebarItems[prefixIndex + offset] as
      | SidebarItem
      | undefined

    if (!targetItem) return null

    if (targetItem.link) return targetItem as AutoLinkOptions

    if ('prefix' in targetItem && !resolveRoute(targetItem.prefix!).notFound)
      return {
        ...targetItem,
        link: targetItem.prefix!,
      }

    return null
  }

  return null
}

interface RelatedLinks {
  prevLink: ComputedRef<AutoLinkOptions | null>
  nextLink: ComputedRef<AutoLinkOptions | null>
}

export const useRelatedLinks = (): RelatedLinks => {
  const frontmatter = usePageFrontmatter<DefaultThemeNormalPageFrontmatter>()
  const themeLocale = useThemeLocaleData()
  const sidebarItems = useSidebarItems()
  const route = useRoute()

  const prevLink = computed(() => {
    const prevConfig = resolveFromFrontmatterConfig(
      frontmatter.value.prev,
      route.path,
    )

    return prevConfig === false
      ? null
      : (prevConfig ??
          (themeLocale.value.prev === false
            ? null
            : resolveFromSidebarItems(sidebarItems.value, route.path, -1)))
  })

  const nextLink = computed(() => {
    const nextConfig = resolveFromFrontmatterConfig(
      frontmatter.value.next,
      route.path,
    )

    return nextConfig === false
      ? null
      : (nextConfig ??
          (themeLocale.value.next === false
            ? null
            : resolveFromSidebarItems(sidebarItems.value, route.path, 1)))
  })

  return {
    prevLink,
    nextLink,
  }
}
