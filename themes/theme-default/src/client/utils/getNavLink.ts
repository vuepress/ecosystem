import { resolveRoute } from 'vuepress/client'
import type { NavLink } from '../../shared/index.js'

/**
 * Resolve NavLink props from string
 *
 * @example
 * - Input: '/README.md'
 * - Output: { text: 'Home', link: '/' }
 */
export const getNavLink = (config: string): NavLink => {
  const { notFound, meta, path } = resolveRoute<{
    title?: string
  }>(config)

  return notFound
    ? { text: path, link: path }
    : {
        text: meta.title || path,
        link: path,
      }
}
