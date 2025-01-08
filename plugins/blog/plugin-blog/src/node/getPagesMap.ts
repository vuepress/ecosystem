import type { App, Page } from 'vuepress/core'

export type PagesMap = Record<string, Page[]>

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
        page.path.substring(page.pathLocale.length - 1) !== '/404.html',
    )
    .forEach((page) => {
      pagesMap[page.pathLocale].push(page)
    })

  return pagesMap
}
