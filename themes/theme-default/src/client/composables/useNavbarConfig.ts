import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import { isString } from 'vuepress/shared'
import type {
  NavbarGroup,
  NavbarItem,
  ResolvedNavbarItem,
} from '../../shared/index.js'
import { getAutoLink, isLinkInternal, resolvePrefix } from '../utils/index.js'
import { useThemeLocaleData } from './useThemeData.js'

const resolveNavbarItem = (
  item: NavbarItem | NavbarGroup | string,
  prefix = '',
): ResolvedNavbarItem => {
  if (isString(item)) {
    return getAutoLink(resolvePrefix(prefix, item))
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
    link: isLinkInternal(item.link)
      ? getAutoLink(resolvePrefix(prefix, item.link)).link
      : item.link,
  }
}

export const useNavbarConfig = (): ComputedRef<ResolvedNavbarItem[]> => {
  const themeLocale = useThemeLocaleData()

  return computed(() =>
    (themeLocale.value.navbar || []).map((item) => resolveNavbarItem(item)),
  )
}
