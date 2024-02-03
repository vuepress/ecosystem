import { resolveRoute } from '@vuepress/client'
import type { NavLink } from '../../shared/index.js'

interface RouteMeta {
  title?: string
}

/**
 * Resolve NavLink props from string
 *
 * @example
 * - Input: '/README.md'
 * - Output: { text: 'Home', link: '/' }
 */
export const getNavLink = (path: string): NavLink => {
  const resolved = resolveRoute<RouteMeta>(path)

  return {
    text: resolved.meta.title || path,
    link: resolved.name === '404' ? path : resolved.fullPath,
  }
}
