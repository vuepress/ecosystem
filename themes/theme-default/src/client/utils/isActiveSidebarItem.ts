import type { RouteLocationNormalizedLoaded } from 'vuepress/client'
import type { ResolvedSidebarItem } from '../../shared/index.js'

const normalizePath = (path: string): string =>
  decodeURI(path)
    .replace(/#.*$/, '')
    .replace(/(index)?\.(md|html)$/, '')

const isActiveLink = (
  link: string,
  route: RouteLocationNormalizedLoaded,
): boolean => {
  const currentPath = normalizePath(route.path)
  if (link.includes('#')) {
    const [linkPath, linkHash] = link.split('#')
    return (
      currentPath === normalizePath(linkPath) && route.hash === `#${linkHash}`
    )
  }
  // Otherwise, check if the link exactly matches the current path
  return currentPath === normalizePath(link)
}

export const isActiveSidebarItem = (
  item: ResolvedSidebarItem,
  route: RouteLocationNormalizedLoaded,
): boolean => {
  if (item.link && isActiveLink(item.link, route)) {
    return true
  }

  if (item.children) {
    return item.children.some((child) => isActiveSidebarItem(child, route))
  }

  return false
}
