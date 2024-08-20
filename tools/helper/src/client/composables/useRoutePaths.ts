import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import { useRoutes } from 'vuepress/client'

export const useRoutePaths = (): ComputedRef<string[]> => {
  const routes = useRoutes()

  return computed(() => Object.keys(routes.value))
}
