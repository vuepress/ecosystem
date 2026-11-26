import { isLinkRelative } from '@vuepress/helper/client'
import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import { isString } from 'vuepress/shared'

import { resolveAutoLink } from '@theme/resolveAutoLink'
import { resolveLinkItem } from '@theme/resolveLinkItem'
import { resolvePrefix } from '@theme/resolvePrefix'
import { useData } from '@theme/useData'

import type {
  NavbarGroupOptions,
  NavbarLinkOptions,
} from '../../shared/navbar.js'
import type { NavbarItem, NavbarLinkItem } from '../typings.js'

const resolveNavbarItem = (
  item: NavbarGroupOptions | NavbarLinkOptions,
  prefix = '',
): NavbarItem => {
  if (isString(item)) return resolveAutoLink(resolvePrefix(prefix, item))

  if ('children' in item) {
    return {
      ...item,
      children: item.children.map((child) =>
        resolveNavbarItem(child, resolvePrefix(prefix, item.prefix)),
      ),
    }
  }

  if (isLinkRelative(item.link))
    return resolveLinkItem(item, resolvePrefix(prefix, item.link))

  const linkItem: NavbarLinkItem = { ...item, text: item.text || item.link }

  return linkItem
}

export const useNavbarConfig = (): ComputedRef<NavbarItem[]> => {
  const { themeLocale } = useData()

  return computed(() =>
    (themeLocale.value.navbar || []).map((item) => resolveNavbarItem(item)),
  )
}
