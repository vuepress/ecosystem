import { entries, fromEntries } from '@vuepress/helper'
import type { Page } from 'vuepress/core'
import { colors } from 'vuepress/utils'
import type {
  CategoryData,
  CategoriesData,
  CategoryLocaleData,
} from '../../shared/index.js'
import type { PagesMap } from '../getPagesMap.js'
import { logger } from '../logger.js'
import type { BlogCategoryOptions } from '../options.js'

/**
 * Get category
 *
 * 获取分类
 *
 * @param pagesMap - Pages map / 页面映射
 * @param categoryOptions - Category options / 分类选项
 * @param isDebug - Whether in debug mode / 是否处于调试模式
 * @returns Object containing categories map and page options / 包含分类映射和页面选项的对象
 */
export const collectCategoryData = (
  pagesMap: PagesMap,
  categoryOptions: BlogCategoryOptions[],
  isDebug: boolean,
): CategoriesData => {
  const result = categoryOptions.map(
    ({ key, getter, sorter = (): number => -1 }) => {
      if (isDebug) logger.info(`Collecting ${colors.cyan(key)} category.\n`)

      const categoryData: CategoryData = {}

      for (const [localePath, pages] of entries(pagesMap)) {
        const pageMapStore: Record<string, Page[]> = {}

        // get category of each page and store page in category map
        for (const page of pages) {
          const categories = getter(page)

          for (const category of categories) {
            ;(pageMapStore[category] ??= []).push(page)
          }
        }

        const currentLocaleData: CategoryLocaleData = {}

        // oxlint-disable-next-line guard-for-in
        for (const category in pageMapStore) {
          currentLocaleData[category] = pageMapStore[category]
            .sort(sorter)
            .map(({ path: pagePath }) => pagePath)
        }

        if (isDebug) {
          let infoMessage = `${key} category in locale ${localePath}:\n`

          for (const [category, items] of entries(currentLocaleData))
            infoMessage += `. ${category}: collected ${items.length} items\n`

          logger.info(infoMessage)
        }

        categoryData[localePath] = currentLocaleData
      }

      return {
        key,
        categoriesData: categoryData,
      }
    },
  )

  return fromEntries(
    result.map(({ key, categoriesData }) => [key, categoriesData]),
  )
}
