import {
  entries,
  fromEntries,
  isFunction,
  isString,
  removeLeadingSlash,
} from '@vuepress/helper'
import type { Page, PageOptions } from 'vuepress/core'
import { colors } from 'vuepress/utils'
import type { CategoriesMap, CategoryMap } from '../../shared/index.js'
import type { PagesMap } from '../getPagesMap.js'
import { logger } from '../logger.js'
import type { BlogCategoryOptions } from '../options.js'
import type { Store } from '../store.js'
import { getPagePath } from '../utils.js'

/**
 * Get category
 *
 * 获取分类
 *
 * @param pagesMap - Pages map / 页面映射
 * @param store - Blog store / 博客存储
 * @param categoryOptions - Category options / 分类选项
 * @param slugify - Slugify function / Slugify 函数
 * @param isDebug - Whether in debug mode / 是否处于调试模式
 * @returns Object containing categories map and page options / 包含分类映射和页面选项的对象
 */
// oxlint-disable-next-line max-lines-per-function
export const getCategory = (
  pagesMap: PagesMap,
  store: Store,
  categoryOptions: BlogCategoryOptions[],
  slugify: (name: string) => string,
  isDebug: boolean,
): {
  categoriesMap: CategoriesMap
  pageOptions: PageOptions[]
} => {
  const result = categoryOptions.map(
    // oxlint-disable-next-line max-lines-per-function, complexity, max-statements
    ({
      key,
      getter,
      sorter = (): number => -1,
      path = '/:key/',
      layout = 'Layout',
      frontmatter = (): Record<string, string> => ({}),
      itemPath: itemPathOptions = '/:key/:name/',
      itemLayout = 'Layout',
      itemFrontmatter = (): Record<string, string> => ({}),
    }) => {
      if (isDebug) logger.info(`Generating ${colors.cyan(key)} category.\n`)

      const getItemPath = isFunction(itemPathOptions)
        ? itemPathOptions
        : isString(itemPathOptions)
          ? (name: string): string =>
              itemPathOptions
                .replaceAll(':key', slugify(key))
                .replaceAll(':name', slugify(name))
          : (): null => null

      const categoryMap: CategoryMap = {}
      const pageOptions: PageOptions[] = []

      for (const [localePath, pages] of entries(pagesMap)) {
        if (path) {
          const pagePath = `${localePath}${removeLeadingSlash(
            path.replaceAll(':key', slugify(key)),
          )}`

          pageOptions.push({
            path: pagePath,
            frontmatter: {
              ...frontmatter(localePath),
              blog: {
                type: 'category',
                key,
              },
              layout,
            },
          })

          categoryMap[localePath] = {
            path: getPagePath(pagePath),
            map: {},
          }
        } else {
          categoryMap[localePath] = {
            path: '',
            map: {},
          }
        }

        const { map } = categoryMap[localePath]
        const pageMapStore: Record<string, Page[]> = {}

        for (const page of pages) {
          const categories = getter(page)

          for (const category of categories) {
            if (!(category in map)) {
              const itemPath = getItemPath(category)

              // oxlint-disable-next-line max-depth
              if (itemPath) {
                const itemPagePath = `${localePath}${removeLeadingSlash(itemPath)}`

                pageOptions.push({
                  path: itemPagePath,
                  frontmatter: {
                    ...itemFrontmatter(category, localePath),
                    blog: {
                      type: 'category',
                      name: category,
                      key,
                    },
                    layout: itemLayout,
                  },
                })

                map[category] = {
                  path: getPagePath(itemPagePath),
                  indexes: [],
                }
              } else {
                map[category] = {
                  path: '',
                  indexes: [],
                }
              }

              pageMapStore[category] = []
            }

            pageMapStore[category].push(page)
          }
        }

        for (const [category, categoryPages] of entries(pageMapStore))
          map[category].indexes = store.addItems(
            categoryPages.sort(sorter).map(({ path: pagePath }) => pagePath),
          )

        if (isDebug) {
          let infoMessage = `${key} category in locale ${localePath}:\n`

          for (const [
            category,
            { path: categoryPath, indexes: items },
          ] of entries(map)) {
            infoMessage += `${category}: found ${items.length} items${
              categoryPath ? ` in path: ${categoryPath}` : ''
            }\n`
          }

          logger.info(infoMessage)
        }
      }

      return {
        key,
        categoryMap,
        pageOptions,
      }
    },
  )

  return {
    categoriesMap: fromEntries(
      result.map(({ key, categoryMap }) => [key, categoryMap]),
    ),
    pageOptions: result.flatMap(({ pageOptions }) => pageOptions),
  }
}
