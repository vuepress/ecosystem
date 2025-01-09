import { resolveAutoLink } from '@theme/resolveAutoLink'
import { resolvePrefix } from '@theme/resolvePrefix'
import { useThemeLocaleData } from '@theme/useThemeData'
import { isLinkRelative } from '@vuepress/helper/client'
import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import { isString } from 'vuepress/shared'
import type {
  NavbarGroupOptions,
  NavbarLinkOptions,
} from '../../shared/navbar.js'
import type { NavbarItem } from '../typings.js'

const resolveNavbarItem = (
  item: NavbarGroupOptions | NavbarLinkOptions,
  prefix = '',
): NavbarItem => {
  if (isString(item)) {
    return resolveAutoLink(resolvePrefix(prefix, item))
  }

  if ('children' in item) {
    return {
      ...item,
      children: item.children.map((child) =>
        resolveNavbarItem(child, resolvePrefix(prefix, item.prefix)),
      ),
    }
  }

  return {
    ...item,
    link: isLinkRelative(item.link)
      ? resolveAutoLink(resolvePrefix(prefix, item.link)).link
      : item.link,
  }
}

export const useNavbarConfig = (): ComputedRef<NavbarItem[]> => {
  const themeLocale = useThemeLocaleData()

  return computed(() =>
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    (themeLocale.value.navbar || []).map((item) => resolveNavbarItem(item)),
  )
}
