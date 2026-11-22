import type { DefaultTheme } from '../shared.js'
import { isActive, isExternal } from '../shared.js'
import { ensureStartingSlash } from './utils.js'

export interface SidebarLink {
  text: string
  link: string
  docFooterText?: string
  rel?: string
  target?: string
}

type SidebarItem = DefaultTheme.SidebarItem

/**
 * The page information used to resolve the `heading` sidebar
 *
 * 用于解析 `heading` 侧边栏的页面信息
 */
export interface SidebarPage {
  /** Title of the page / 页面标题 */
  title: string
  /** Headings of the page / 页面的标题列表 */
  headers: DefaultTheme.OutlineItem[]
}

/**
 * Convert the page headings to sidebar items
 *
 * 将页面标题转换为侧边栏条目
 *
 * @param headers - Headings of the page / 页面的标题列表
 * @returns The sidebar items / 侧边栏条目
 */
const resolveHeadingItems = (
  headers: DefaultTheme.OutlineItem[],
): SidebarItem[] =>
  headers.map(({ title, link, children }) => ({
    text: title,
    link,
    ...(children?.length ? { items: resolveHeadingItems(children) } : {}),
  }))

/**
 * Resolve the sidebar items from the page headings
 *
 * 从页面标题解析侧边栏条目
 *
 * @param page - Page information / 页面信息
 * @returns The sidebar items / 侧边栏条目
 */
export const resolveHeadingSidebar = (
  page: SidebarPage | undefined,
): SidebarItem[] =>
  page ? [{ text: page.title, items: resolveHeadingItems(page.headers) }] : []

/**
 * Get the `Sidebar` from sidebar option. This method will ensure to get correct
 * sidebar config from `MultiSideBarConfig` with various path combinations such
 * as matching `guide/` and `/guide/`. If no matching config was found, it will
 * return empty array.
 */
export function getSidebar(
  _sidebar: DefaultTheme.Sidebar | 'heading' | false | undefined,
  path: string,
  page?: SidebarPage,
): SidebarItem[] {
  if (_sidebar === 'heading') return resolveHeadingSidebar(page)
  if (_sidebar === false || _sidebar == null) return []
  if (Array.isArray(_sidebar)) return addBase(_sidebar)

  path = ensureStartingSlash(path)

  const dir = Object.keys(_sidebar)
    .sort((a, b) => {
      return b.split('/').length - a.split('/').length
    })
    .find((dir) => {
      // make sure the multi sidebar key starts with slash too
      return path.startsWith(ensureStartingSlash(dir))
    })

  const sidebar = dir ? (_sidebar[dir] ?? []) : []

  if (sidebar === 'heading') return resolveHeadingSidebar(page)

  return Array.isArray(sidebar)
    ? addBase(sidebar)
    : addBase(sidebar.items, sidebar.base)
}

/** Get or generate sidebar group from the given sidebar items. */
export function getSidebarGroups(sidebar: SidebarItem[]): SidebarItem[] {
  const groups: SidebarItem[] = []

  let lastGroupIndex: number = 0

  for (const item of sidebar) {
    if (item.items) {
      lastGroupIndex = groups.push(item)
      continue
    }

    let group = groups[lastGroupIndex]

    if (!group) {
      group = { items: [] }
      groups.push(group)
    }

    group.items?.push(item)
  }

  return groups
}

export function getFlatSideBarLinks(sidebar: SidebarItem[]): SidebarLink[] {
  const links: SidebarLink[] = []

  function recursivelyExtractLinks(items: SidebarItem[]) {
    for (const item of items) {
      if (item.text && item.link) {
        links.push({
          text: item.text,
          link: item.link,
          docFooterText: item.docFooterText,
          rel: item.rel,
          target: item.target,
        })
      }

      if (item.items) {
        recursivelyExtractLinks(item.items)
      }
    }
  }

  recursivelyExtractLinks(sidebar)

  return links
}

/** Check if the given sidebar item contains any active link. */
export function hasActiveLink(
  path: string,
  hash: string,
  items: SidebarItem | SidebarItem[],
  skipHashCheck = false,
): boolean {
  if (Array.isArray(items)) {
    return items.some((item) => hasActiveLink(path, hash, item, skipHashCheck))
  }
  if (items.link) {
    if (items.link.startsWith('#')) {
      if (items.link === hash) return true
    } else if (isActive(path, hash, items.link, false, skipHashCheck)) {
      return true
    }
  }
  if (items.items) {
    return hasActiveLink(path, hash, items.items, skipHashCheck)
  }
  return false
}

function addBase(items: SidebarItem[], _base?: string): SidebarItem[] {
  return [...items].map((_item) => {
    const item = { ..._item }
    const base = item.base || _base
    if (base && item.link && !isExternal(item.link))
      item.link = base + item.link.replace(/^\//, base.endsWith('/') ? '' : '/')
    if (item.items) item.items = addBase(item.items, base)
    return item
  })
}
