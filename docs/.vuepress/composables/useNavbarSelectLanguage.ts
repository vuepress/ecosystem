import {
  useNavbarSelectLanguage as _useNavbarSelectLanguage,
  type NavbarItem,
} from '@vuepress/theme-default/client'
import { computed, type ComputedRef } from 'vue'

export const useNavbarSelectLanguage = (): ComputedRef<NavbarItem[]> => {
  const navbarSelectLanguage = _useNavbarSelectLanguage()

  return computed(() => [
    {
      ...navbarSelectLanguage.value[0],
      icon: 'languages',
    },
  ])
}
