import { resolveRoute } from 'vuepress/client'
import type { AutoLinkConfig } from 'vuepress/client'

/**
 * Resolve AutoLink props from string
 *
 * @example
 * - Input: '/README.md'
 * - Output: { text: 'Home', link: '/' }
 */
export const getAutoLink = (config: string): AutoLinkConfig => {
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
