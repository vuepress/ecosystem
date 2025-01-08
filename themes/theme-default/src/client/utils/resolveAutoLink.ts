import { resolveRoute } from 'vuepress/client'
import type { AutoLinkOptions } from '../../shared/index.js'

/**
 * Resolve AutoLink props from string
 *
 * @example
 * - Input: '/README.md'
 * - Output: { text: 'Home', link: '/' }
 */
export const resolveAutoLink = (
  config: string,
  currentPath?: string,
): AutoLinkOptions => {
  const { notFound, meta, path } = resolveRoute<{
    title?: string
  }>(config, currentPath)

  return notFound
    ? { text: path, link: path }
    : {
        text: meta.title || path,
        link: path,
      }
}
