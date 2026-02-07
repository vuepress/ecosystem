import { isLinkAbsolute } from '@vuepress/helper'
import type { App, Page } from 'vuepress/core'
import { logger } from 'vuepress/utils'

/**
 * Check markdown links in a page and report broken links
 *
 * 检查页面中的 Markdown 链接并报告死链接
 *
 * @param page - The page to check / 要检查的页面
 * @param app - VuePress app instance / VuePress 应用实例
 * @param isIgnoreLink - Function to check if a link should be ignored / 检查链接是否应被忽略的函数
 *
 * @returns Whether any broken links were found / 是否发现了死链接
 */
export const checkMarkdownLink = (
  page: Page,
  app: App,
  isIgnoreLink: (link: string) => boolean,
): boolean => {
  const pagePath = page.filePathRelative ?? page.path

  const markdownLinks = page.links.filter(({ raw }) =>
    raw.match(/^.+.md((?:\?|#).*)?$/),
  )

  const brokenLinks = [
    ...markdownLinks
      // Relative markdown links
      .filter(({ raw }) => !isLinkAbsolute(raw))
      .filter(
        ({ relative }) =>
          // Check whether the page exists
          app.pages.every(
            ({ filePathRelative }) => filePathRelative !== decodeURI(relative),
          ) && !isIgnoreLink(relative),
      ),
    ...markdownLinks
      // Absolute markdown links
      .filter(({ raw }) => isLinkAbsolute(raw))
      .filter(
        ({ absolute }) =>
          // Check whether the page exists
          absolute &&
          app.pages.every(
            ({ filePathRelative }) =>
              !filePathRelative ||
              (`${app.siteData.base}${filePathRelative}` !==
                decodeURI(absolute) &&
                !isIgnoreLink(absolute)),
          ),
      ),
  ].map(({ raw }) => raw)

  if (brokenLinks.length > 0) {
    logger.warn(`Broken links found in ${pagePath}: ${brokenLinks.join(', ')}`)

    return true
  }

  return false
}
