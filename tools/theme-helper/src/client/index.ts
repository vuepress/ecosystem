import { ensureEndingSlash } from '@vuepress/helper/client'

import { sidebarData } from '@temp/theme-helper/sidebar.js'

import type {
  SidebarStructureData,
  SidebarStructureItem,
} from '../shared/index.js'

export type * from '../shared/index.js'
export { sidebarData } from '@temp/theme-helper/sidebar.js'

/**
 * Get the sidebar structure items of a route scope
 *
 * The scope is normalized to start and end with a slash, so `/guide` and
 * `guide/` both resolve to `/guide/`.
 *
 * 获取路由范围的侧边栏结构条目
 *
 * 范围会被规范化为以斜线开头和结尾，因此 `/guide` 与 `guide/` 都会解析为 `/guide/`。
 *
 * @param scope - Route scope / 路由范围
 * @returns The sidebar structure items / 侧边栏结构条目
 */
export const getSidebarStructure = (scope: string): SidebarStructureItem[] => {
  const normalizedScope = ensureEndingSlash(
    scope.startsWith('/') ? scope : `/${scope}`,
  )

  const data = sidebarData as unknown as SidebarStructureData

  return data[normalizedScope] ?? []
}
