import { entries, fromEntries, removeLeadingSlash } from '@vuepress/helper'
import type { PageOptions } from 'vuepress/core'
import { colors } from 'vuepress/utils'
import type { TypeMap, TypesMap } from '../../shared/index.js'
import type { PagesMap } from '../getPagesMap.js'
import { logger } from '../logger.js'
import type { BlogTypeOptions } from '../options.js'
import type { Store } from '../store.js'
import { getPagePath } from '../utils.js'

/**
 * Compute type indexes and page options for initial setup
 *
 * 计算类型索引和页面选项（用于初始化）
 *
 * @param pagesMap - Pages grouped by locale / 按语言环境分组的页面
 * @param store - Blog store / 博客存储
 * @param type - Type options / 类型选项
 * @param slugify - Slugify function / Slugify 函数
 * @param isDebug - Whether in debug mode / 是否处于调试模式
 * @returns Types map and page options / 类型映射和页面选项
 */
export const getType = (
  pagesMap: PagesMap,
  store: Store,
  type: BlogTypeOptions[],
  slugify: (name: string) => string,
  isDebug = false,
): {
  typesMap: TypesMap
  pageOptions: PageOptions[]
} => {
  const result = type.map(
    ({
      key,
      sorter = (): number => -1,
      filter = (): boolean => true,
      path = '/:key/',
      layout = 'Layout',
      frontmatter = (): Record<string, string> => ({}),
    }) => {
      if (isDebug) logger.info(`Generating ${colors.cyan(key)} type.\n`)

      const pageOptions: PageOptions[] = []
      const typeMap: TypeMap = {}

      entries(pagesMap).forEach(([localePath, pages]) => {
        // get type page path
        const pagePath = path
          ? `${localePath}${removeLeadingSlash(
              path.replaceAll(':key', slugify(key)),
            )}`
          : ''

        // get type indexes
        const indexes = store.addItems(
          // get page paths
          pages
            .filter((page) => filter(page))
            .sort(sorter)
            .map(({ path: itemPagePath }) => itemPagePath),
        )

        if (pagePath) {
          pageOptions.push({
            path: pagePath,
            frontmatter: {
              ...frontmatter(localePath),
              blog: {
                type: 'type',
                key,
              },
              layout,
            },
          })
        }

        if (isDebug) {
          logger.info(
            `${key} type in locale ${localePath}: found ${indexes.length} items\n`,
          )
        }

        typeMap[localePath] = { path: getPagePath(pagePath), indexes }
      })

      return { key, typeMap, pageOptions }
    },
  )

  return {
    typesMap: fromEntries(result.map(({ key, typeMap }) => [key, typeMap])),
    pageOptions: result.flatMap(({ pageOptions }) => pageOptions),
  }
}

/**
 * Update type indexes only (no page management)
 *
 * 仅更新类型索引（不管理页面）
 *
 * @description This recomputes which pages belong to each type and updates
 * the store indexes accordingly. Type pages themselves are static and don't
 * need to be added or removed during incremental updates.
 *
 * 重新计算每个类型包含哪些页面，并相应更新存储索引。
 * 类型页面本身是静态的，在增量更新时不需要添加或删除。
 *
 * @param pagesMap - Pages grouped by locale / 按语言环境分组的页面
 * @param store - Blog store / 博客存储
 * @param type - Type options / 类型选项
 * @param slugify - Slugify function / Slugify 函数
 * @param isDebug - Whether in debug mode / 是否处于调试模式
 * @returns Updated types map / 更新后的类型映射
 */
export const updateTypesMap = (
  pagesMap: PagesMap,
  store: Store,
  type: BlogTypeOptions[],
  slugify: (name: string) => string,
  isDebug = false,
): TypesMap =>
  fromEntries(
    type.map(
      ({
        key,
        sorter = (): number => -1,
        filter = (): boolean => true,
        path = '/:key/',
      }) => {
        const typeMap: TypeMap = {}

        entries(pagesMap).forEach(([localePath, pages]) => {
          const pagePath = path
            ? `${localePath}${removeLeadingSlash(
                path.replaceAll(':key', slugify(key)),
              )}`
            : ''

          const indexes = store.addItems(
            pages
              .filter((page) => filter(page))
              .sort(sorter)
              .map(({ path: itemPagePath }) => itemPagePath),
          )

          if (isDebug) {
            logger.info(
              `${key} type in locale ${localePath}: found ${indexes.length} items\n`,
            )
          }

          typeMap[localePath] = { path: getPagePath(pagePath), indexes }
        })

        return [key, typeMap]
      },
    ),
  )
