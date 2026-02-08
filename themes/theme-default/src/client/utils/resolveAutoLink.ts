import { resolveRoute } from 'vuepress/client'
import type { AutoLinkOptions } from '../../shared/index.js'

/**
 * Resolve AutoLink props from string
 *
 * 从字符串解析 AutoLink 属性
 *
 * @param config - The string to resolve / 要解析的字符串
 * @param currentPath - The current route path / 当前路由路径
 * @returns Resolved AutoLink options / 解析后的 AutoLink 选项
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
