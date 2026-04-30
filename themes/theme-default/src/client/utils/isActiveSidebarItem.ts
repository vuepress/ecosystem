import { normalizePath } from '@vuepress/helper/client'
import type { RouteLocationNormalizedLoaded } from 'vuepress/client'

import type { SidebarItem } from '../typings.js'

const isActiveLink = (
  link: string,
  route: RouteLocationNormalizedLoaded,
): boolean => {
  if (route.hash === link) return true

  const currentPath = normalizePath(route.path, true)
  const targetPath = normalizePath(link, true)
  return currentPath === targetPath
}

export const isActiveSidebarItem = (
  item: SidebarItem,
  route: RouteLocationNormalizedLoaded,
): boolean => {
  if (item.link && isActiveLink(item.link, route)) return true

  if ('children' in item)
    return item.children.some((child) => isActiveSidebarItem(child, route))

  return false
}
