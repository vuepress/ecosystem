import type { NavbarItem } from '@vuepress/theme-default/client'
import { useNavbarRepo as _useNavbarRepo } from '@vuepress/theme-default/client'
import type { ComputedRef } from 'vue'
import { computed } from 'vue'

export const useNavbarRepo = (): ComputedRef<NavbarItem[]> => {
  const navbarRepo = _useNavbarRepo()

  return computed(() => [
    {
      ...navbarRepo.value[0],
      icon: 'github',
    },
  ])
}
