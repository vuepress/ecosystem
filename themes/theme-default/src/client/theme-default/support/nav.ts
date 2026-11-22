import { resolveRoute } from 'vuepress/client'

import type { DefaultTheme } from '../shared.js'
import { isExternal } from '../shared.js'

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
export const resolveNavData = (
  items: DefaultTheme.NavItem[],
): DefaultTheme.NavItem[] =>
  items.map((item) => {
    if ('component' in item) return item

    if (!('link' in item)) {
      return {
        ...item,
        items: resolveNavData(item.items) as DefaultTheme.NavItemWithLink[],
      }
    }

    const { link } = item

    if (typeof link !== 'string' || isExternal(link)) return item

    const { notFound, meta } = resolveRoute<{
      title?: string
      icon?: string
    }>(link)

    if (notFound) return item

    return {
      ...item,
      ...(!item.text && meta.title ? { text: meta.title } : {}),
      ...(!item.icon && meta.icon ? { icon: meta.icon } : {}),
    }
  })
