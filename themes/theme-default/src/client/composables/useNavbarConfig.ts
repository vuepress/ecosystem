import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import { isString } from 'vuepress/shared'
import type {
  NavbarGroup,
  NavbarItem,
  ResolvedNavbarItem,
} from '../../shared/index.js'
import { getAutoLink } from '../utils/index.js'
import { useThemeLocaleData } from './useThemeData.js'

const resolveNavbarItem = (
  item: NavbarItem | NavbarGroup | string,
): ResolvedNavbarItem => {
  if (isString(item)) {
    return getAutoLink(item)
  }
  if ((item as NavbarGroup).children) {
    return {
      ...item,
      children: (item as NavbarGroup).children.map((item) =>
        resolveNavbarItem(item),
      ),
    }
  }
  return item as ResolvedNavbarItem
}

export const useNavbarConfig = (): ComputedRef<ResolvedNavbarItem[]> => {
  const themeLocale = useThemeLocaleData()

  return computed(() =>
    (themeLocale.value.navbar || []).map((item) => resolveNavbarItem(item)),
  )
}
