import { ensureEndingSlash } from '@vuepress/helper/client'
import { getSidebarStructure } from '@vuepress/theme-helper/client'
import { resolveRoute } from 'vuepress/client'

import type { DefaultTheme } from '../shared.js'
import { isExternal, isLinkActive } from '../shared.js'
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
 * Normalize the route scope of an item to start and end with a slash
 *
 * 将条目的路由范围规范化为以斜线开头和结尾
 *
 * @param base - The `base` of the item, which may be relative to `scope` / 条目的
 *   `base`，可能相对于 `scope`
 * @param scope - The route scope of the parent / 父级的路由范围
 * @returns The normalized route scope / 规范化后的路由范围
 */
const resolveItemScope = (base: string | undefined, scope: string): string =>
  base
    ? ensureEndingSlash(base.startsWith('/') ? base : `${scope}${base}`)
    : scope

/**
 * Get the sidebar generated from the file structure of a route scope
 *
 * 获取根据路由范围的文件结构生成的侧边栏
 *
 * @param scope - The route scope / 路由范围
 * @returns The sidebar items / 侧边栏条目
 */
const resolveStructureSidebar = (scope: string): SidebarItem[] =>
  getSidebarStructure<SidebarItem>(scope)

/**
 * Get the `Sidebar` from sidebar option. This method will ensure to get correct
 * sidebar config from `MultiSideBarConfig` with various path combinations such
 * as matching `guide/` and `/guide/`. If no matching config was found, it will
 * return empty array.
 */
export function getSidebar(
  _sidebar: DefaultTheme.Sidebar | false | undefined,
  path: string,
  routeLocale = '/',
): SidebarItem[] {
  if (_sidebar === 'structure') return resolveStructureSidebar(routeLocale)
  if (_sidebar === false || _sidebar == null) return []
  if (Array.isArray(_sidebar)) return addBase(_sidebar, undefined, routeLocale)

  path = ensureStartingSlash(path)

  const dir = Object.keys(_sidebar)
    .sort((a, b) => {
      return b.split('/').length - a.split('/').length
    })
    .find((dir) => {
      // make sure the multi sidebar key starts with slash too
      return path.startsWith(ensureStartingSlash(dir))
    })

  const dirScope = dir
    ? ensureEndingSlash(dir.startsWith('/') ? dir : `/${dir}`)
    : '/'
  const sidebar = dir ? (_sidebar[dir] ?? []) : []

  if (sidebar === false) return []
  if (sidebar === 'structure') return resolveStructureSidebar(dirScope)
  // the matched scope also acts as the base, so that the links of the items
  // can stay relative to it
  if (Array.isArray(sidebar)) return addBase(sidebar, dirScope, dirScope)

  const itemScope = resolveItemScope(sidebar.base, routeLocale)

  // tolerate `{ items: 'structure' }`, which is not part of the public types
  // but may come from a hand written config
  if ((sidebar.items as unknown) === 'structure')
    return resolveStructureSidebar(itemScope)

  return addBase(sidebar.items, sidebar.base, itemScope)
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
  if (
    items.link &&
    isLinkActive(path, hash, items.link, {
      activeMatch: items.activeMatch,
      // sidebar links are exact by default, sub paths are active only when
      // `exact: false` is set explicitly
      exact: items.exact ?? true,
      skipHashCheck,
    })
  ) {
    return true
  }
  if (items.items) {
    return hasActiveLink(path, hash, items.items, skipHashCheck)
  }
  return false
}

function addBase(
  items: DefaultTheme.SidebarArray,
  _base?: string,
  scope = '/',
): SidebarItem[] {
  return items.map((_item) => {
    const itemScope = resolveItemScope(_item.base, scope)
    const base = _item.base || _base

    if ('items' in _item && _item.items === 'structure') {
      const { items: _children, ...item } = _item

      return { ...item, items: resolveStructureSidebar(itemScope) }
    }

    const item: SidebarItem = { ..._item }

    // only the relative links are prefixed with the base, absolute and hash
    // links are already resolvable
    if (
      base &&
      item.link &&
      !isExternal(item.link) &&
      !item.link.startsWith('/') &&
      !item.link.startsWith('#')
    )
      item.link = ensureEndingSlash(base) + item.link
    if (item.items) item.items = addBase(item.items, base, itemScope)

    return item
  })
}

/**
 * Resolve the text and icon of the sidebar items from the page meta.
 *
 * The link of a sidebar item points to a page, whose title and icon live in the
 * route meta. Items that already define the text or the icon keep them.
 *
 * 从页面元信息解析侧边栏条目的文本和图标。
 *
 * 侧边栏条目的链接指向一个页面，页面标题和图标保存在路由元信息中。 已经定义了文本或图标的条目保持不变。
 *
 * @param items - The sidebar items / 侧边栏条目
 * @returns The resolved sidebar items / 解析后的侧边栏条目
 */
export const resolveSidebarData = (items: SidebarItem[]): SidebarItem[] =>
  items.map((item) => {
    const children = item.items?.length
      ? { items: resolveSidebarData(item.items) }
      : {}

    if (!item.link || isExternal(item.link)) return { ...item, ...children }

    const { notFound, meta } = resolveRoute<{
      title?: string
      icon?: string
    }>(item.link)

    if (notFound)
      // keep the item visible when the page metadata is missing, the link is
      // the only information left (the classic theme did the same)
      return { ...item, ...children, text: item.text ?? item.link }

    return {
      ...item,
      ...(!item.text && meta.title ? { text: meta.title } : {}),
      ...(!item.icon && meta.icon ? { icon: meta.icon } : {}),
      ...children,
    }
  })
