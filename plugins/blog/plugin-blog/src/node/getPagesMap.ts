import type { App, Page } from 'vuepress/core'

/**
 * Map of locale paths to their matching blog pages
 *
 * 语言环境路径到其匹配的博客页面的映射
 */
export type PagesMap = Record<string, Page[]>

/**
 * Build a map of filtered blog pages grouped by locale
 *
 * 构建按语言环境分组的已过滤博客页面映射
 *
 * @param app - VuePress app instance / VuePress 应用实例
 * @param filter - Page filter function / 页面过滤函数
 * @returns Pages grouped by locale path / 按语言环境路径分组的页面
 */
export const getPageMap = (
  app: App,
  filter: (page: Page) => boolean,
): PagesMap => {
  const pagesMap: PagesMap = {
    '/': [],
    ...Object.fromEntries(
      Object.keys(app.siteData.locales).map((localePath) => [localePath, []]),
    ),
  }

  app.pages
    .filter(
      (page) =>
        filter(page) &&
        // filter 404
        page.path.slice(page.pathLocale.length - 1) !== '/404.html',
    )
    .forEach((page) => {
      pagesMap[page.pathLocale].push(page)
    })

  return pagesMap
}
