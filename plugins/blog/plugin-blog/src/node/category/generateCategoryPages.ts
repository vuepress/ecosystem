import {
  fromEntries,
  isFunction,
  isString,
  keys,
  removeLeadingSlash,
} from '@vuepress/helper'
import type { PageOptions } from 'vuepress/core'
import { colors } from 'vuepress/utils'
import type { CategoriesData } from '../../shared/index.js'
import type { PagesMap } from '../getPagesMap.js'
import { logger } from '../logger.js'
import type { BlogCategoryOptions } from '../options.js'
import { getPagePath } from '../utils.js'

/**
 * Get category
 *
 * 获取分类
 *
 * @param pagesMap - Pages map / 页面映射
 * @param categoriesData - Categories data / 分类数据
 * @param categoryOptions - Category options / 分类选项
 * @param slugify - Slugify function / Slugify 函数
 * @param isDebug - Whether in debug mode / 是否处于调试模式
 * @returns Object containing categories map and page options / 包含分类映射和页面选项的对象
 */
export const generateCategoryPages = (
  pagesMap: PagesMap,
  categoriesData: CategoriesData,
  categoryOptions: BlogCategoryOptions[],
  slugify: (name: string) => string,
  isDebug: boolean,
): {
  pathMap: Record<
    string,
    {
      path: string
      items: Record<string, string>
    }
  >
  pageOptions: PageOptions[]
} => {
  const result = categoryOptions.map(
    ({
      key,
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

      const pathMap: Record<
        string,
        {
          path: string
          items: Record<string, string>
        }
      > = {}
      const pageOptions: PageOptions[] = []

      keys(pagesMap).forEach((localePath) => {
        const categoryData = categoriesData[key][localePath]
        const localePathData: {
          path: string
          items: Record<string, string>
        } = {
          path: '',
          items: {},
        }

        // main category page
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

          localePathData.path = getPagePath(pagePath)
        }

        // oxlint-disable-next-line guard-for-in
        for (const category in categoryData) {
          const itemPath = getItemPath(category)

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
            localePathData.items[category] = getPagePath(itemPagePath)
          }
        }

        pathMap[localePath] = localePathData
      })

      return { key, pathMap, pageOptions }
    },
  )

  return {
    pathMap: fromEntries(result.map(({ key, pathMap }) => [key, pathMap])),
    pageOptions: result.flatMap(({ pageOptions }) => pageOptions),
  }
}
