import { resolveRoute } from 'vuepress/client'

import type { NavItem, NavItemWithLink } from '../shared.js'
import { isExternal, joinPath } from '../shared.js'

const ensureEndingSlash = (path: string): string =>
  path.endsWith('/') ? path : `${path}/`

/**
 * Prepend the `base` of the parent group to a link
 *
 * 将父分组的 `base` 拼接到链接前
 */
const withBase = (
  link: string | undefined,
  base: string | undefined,
): string | undefined => {
  if (
    !link ||
    !base ||
    link.startsWith('/') ||
    link.startsWith('#') ||
    isExternal(link)
  )
    return link

  return `${ensureEndingSlash(base)}${link}`
}

/**
 * Resolve the nav items
 *
 * Fills the text and the icon of the items that do not define them from the
 * page metadata, so a nav item only needs its link.
 *
 * 解析导航栏条目
 *
 * 未定义文本和图标的条目会从页面元数据中补全，因此导航栏条目只需要填写链接。
 *
 * @param items - Nav items / 导航栏条目
 * @returns Resolved nav items / 解析后的导航栏条目
 */
export const resolveNavData = (items: NavItem[], base?: string): NavItem[] =>
  items.map((item) => {
    if ('component' in item) return item

    if ('items' in item && item.items) {
      const itemBase = item.base
        ? ensureEndingSlash(
            item.base.startsWith('/')
              ? item.base
              : joinPath(base ?? '/', item.base),
          )
        : base

      return {
        ...item,
        items: resolveNavData(item.items, itemBase) as NavItemWithLink[],
      }
    }

    const { link } = item

    if (typeof link !== 'string' || isExternal(link)) return item

    const resolvedLink = withBase(link, base)

    if (!resolvedLink) return item

    const { notFound, meta } = resolveRoute<{
      title?: string
      icon?: string
    }>(resolvedLink)

    if (notFound)
      return { ...item, link: resolvedLink, text: item.text ?? resolvedLink }

    return {
      ...item,
      link: resolvedLink,
      ...(!item.text && meta.title ? { text: meta.title } : {}),
      ...(!item.icon && meta.icon ? { icon: meta.icon } : {}),
    }
  })
