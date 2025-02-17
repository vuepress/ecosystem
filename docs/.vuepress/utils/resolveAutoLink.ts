import type { AutoLinkOptions } from '@vuepress/theme-default/client'
import { resolveRoute } from 'vuepress/client'

/**
 * Resolve AutoLink props from string
 *
 * @example
 * - Input: '/README.md'
 * - Output: { text: 'Home', icon: 'home', link: '/' }
 */
export const resolveAutoLink = (
  config: string,
  currentPath?: string,
): AutoLinkOptions => {
  const { notFound, meta, path } = resolveRoute<{
    title?: string
    icon?: string
  }>(config, currentPath)

  return notFound
    ? { text: path, link: path }
    : {
        text: meta.title || path,
        ...(meta.icon ? { icon: meta.icon } : {}),
        link: path,
      }
}
