/**
 * Based on the sidebar configuration, generate the TOC for llmstxt.
 *
 * 根据 sidebar 配置，生成 llmstxt 的 TOC 。
 */

import type { GenerateTOCOptions, PreparedPage } from '@vuepress/plugin-llms'
import { generateTOCLink as rawGenerateTOCLink } from '@vuepress/plugin-llms'
import type {
  AutoLinkOptions,
  SidebarItemOptions,
} from '@vuepress/theme-default'
import { ensureEndingSlash, isLinkHttp } from 'vuepress/shared'
import { sidebarEn as sidebarConfig } from './sidebar/en.js'

const externalLinks: { link: string; text: string }[] = []

const normalizePath = (prefix: string, path = ''): string => {
  if (path.startsWith('/')) return path

  return `${ensureEndingSlash(prefix)}${path}`
}

const flattenSidebar = (
  items: SidebarItemOptions[],
  prefix: string,
): string[] => {
  const result: string[] = []
  items.forEach((item) => {
    if (typeof item === 'string') {
      result.push(normalizePath(prefix, item))
    } else {
      if (item.link) {
        if (isLinkHttp(item.link)) {
          externalLinks.push({ link: item.link, text: item.text })
          result.push(item.link)
        } else {
          result.push(normalizePath(prefix, item.link))
        }
      }
      if ('children' in item && item.children.length) {
        result.push(
          ...flattenSidebar(item.children, normalizePath(prefix, item.prefix)),
        )
      }
    }
  })
  return result
}

export const customGenerateTOC = (
  preparedPages: PreparedPage[],
  options: GenerateTOCOptions,
): string => {
  let tableOfContent = ''
  const usagePages: PreparedPage[] = []

  const generateTOCLink = (path: string): string => {
    if (isLinkHttp(path)) {
      const item = externalLinks.find((external) => external.link === path)!
      return `- [${item.text}](${item.link})\n`
    }
    const link = path.endsWith('/') ? `${path}index.html` : `${path}.html`
    const page = preparedPages.find((item) => item.path === link)
    if (page) {
      usagePages.push(page)
      return rawGenerateTOCLink(page, options)
    }
    return ''
  }

  const appendTOC = (title: string, key: string): void => {
    tableOfContent += `### ${title}\n\n`
    tableOfContent += flattenSidebar(
      sidebarConfig[key] as SidebarItemOptions[],
      key,
    )
      .map(generateTOCLink)
      .filter(Boolean)
      .join('')
    tableOfContent += '\n'
  }

  // Themes
  appendTOC('Themes', '/themes/')
  // Plugins
  ;(sidebarConfig['/plugins/'] as AutoLinkOptions[]).forEach(
    ({ text, link }) => {
      appendTOC(`Plugins of ${text}`, `/plugins/${link}`)
    },
  )
  // Tools
  appendTOC('Tools', '/tools/')
  // Others
  const unUsagePages = preparedPages.filter(
    (page) => !usagePages.includes(page),
  )
  if (unUsagePages.length) {
    tableOfContent += '### Others\n\n'
    tableOfContent += unUsagePages
      .map((page) => rawGenerateTOCLink(page, options))
      .join('')
  }

  return tableOfContent
}
