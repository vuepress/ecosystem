import { resolveRoute } from 'vuepress/client'

import type { AutoLinkOptions } from '../../shared/index.js'

/**
 * Resolve the text and the icon of a link from the metadata of its page
 *
 * 从页面元数据解析链接的文本与图标
 *
 * @param link - The link to resolve / 要解析的链接
 * @param currentPath - The current route path / 当前路由路径
 * @returns Resolved text and icon, empty when the page is not found /
 *   解析后的文本与图标，页面不存在时为空
 */
export const resolveLinkMeta = (
  link: string,
  currentPath?: string,
): Pick<Partial<AutoLinkOptions>, 'icon' | 'text'> => {
  const { notFound, meta } = resolveRoute<{
    title?: string
    icon?: string
  }>(link, currentPath)

  if (notFound) return {}

  return {
    ...(meta.title ? { text: meta.title } : {}),
    ...(meta.icon ? { icon: meta.icon } : {}),
  }
}

/**
 * Resolve AutoLink props from string
 *
 * 从字符串解析 AutoLink 属性
 *
 * @example
 *   - Input: '/README.md'
 *   - Output: { text: 'Home', link: '/' }
 *
 * @param config - The string to resolve / 要解析的字符串
 * @param currentPath - The current route path / 当前路由路径
 * @returns Resolved AutoLink options / 解析后的 AutoLink 选项
 */
export const resolveAutoLink = (
  config: string,
  currentPath?: string,
): AutoLinkOptions & { text: string } => {
  const { notFound, meta, path } = resolveRoute<{
    title?: string
    icon?: string
  }>(config, currentPath)

  return notFound
    ? { text: path, link: path }
    : {
        text: meta.title || path,
        link: path,
        ...(meta.icon ? { icon: meta.icon } : {}),
      }
}
