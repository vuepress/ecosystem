import type { NavbarItem } from '@vuepress/theme-classic/client'
import { useNavbarSelectLanguage as _useNavbarSelectLanguage } from '@vuepress/theme-classic/client'
import type { ComputedRef } from 'vue'
import { computed } from 'vue'

export const useNavbarSelectLanguage = (): ComputedRef<NavbarItem[]> => {
  const navbarSelectLanguage = _useNavbarSelectLanguage()

  return computed(() => [
    {
      ...navbarSelectLanguage.value[0],
      icon: 'languages',
    },
  ])
}
