import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import { useRoutes } from 'vuepress/client'

/**
 * Composables for route paths
 *
 * 获取路由路径的组合函数
 *
 * @returns Computed reference to route paths / 路由路径的计算引用
 */
export const useRoutePaths = (): ComputedRef<string[]> => {
  const routes = useRoutes()

  return computed(() => Object.keys(routes.value))
}
