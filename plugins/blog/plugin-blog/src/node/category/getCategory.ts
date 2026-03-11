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
 * Resolve item path getter from category options
 *
 * 从分类选项中解析子项路径获取器
 *
 * @param itemPathOptions - Item path option / 子项路径选项
 * @param key - Category key / 分类键名
 * @param slugify - Slugify function / Slugify 函数
 * @returns Function that returns the item path / 返回子项路径的函数
 */
const resolveGetItemPath = (
  itemPathOptions: BlogCategoryOptions['itemPath'],
  key: string,
  slugify: (name: string) => string,
): ((name: string) => string | null) =>
  isFunction(itemPathOptions)
    ? itemPathOptions
    : isString(itemPathOptions)
      ? (name: string): string =>
          itemPathOptions
            .replaceAll(':key', slugify(key))
            .replaceAll(':name', slugify(name))
      : (): null => null

/**
 * Build category map data for a single category key across all locales
 *
 * 为单个分类键在所有语言环境下构建分类映射数据
 *
 * @param pagesMap - Pages grouped by locale / 按语言环境分组的页面
 * @param store - Blog store / 博客存储
 * @param options - Category options / 分类选项
 * @param slugify - Slugify function / Slugify 函数
 * @param isDebug - Whether in debug mode / 是否处于调试模式
 * @returns Category map for this key / 此键的分类映射
 */
const buildCategoryMap = (
  pagesMap: PagesMap,
  store: Store,
  options: BlogCategoryOptions,
  slugify: (name: string) => string,
  isDebug: boolean,
): CategoryMap => {
  const {
    key,
    getter,
    sorter = (): number => -1,
    path = '/:key/',
    itemPath: itemPathOptions = '/:key/:name/',
  } = options
  const getItemPath = resolveGetItemPath(itemPathOptions, key, slugify)
  const categoryMap: CategoryMap = {}

  for (const [localePath, pages] of entries(pagesMap)) {
    if (path) {
      const pagePath = `${localePath}${removeLeadingSlash(
        path.replaceAll(':key', slugify(key)),
      )}`

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

    for (const [category, categoryPages] of entries(pageMapStore)) {
      map[category].indexes = store.addItems(
        categoryPages.sort(sorter).map(({ path: pagePath }) => pagePath),
      )
    }

    if (isDebug) {
      let infoMessage = `${key} category in locale ${localePath}:\n`

      for (const [category, { path: categoryPath, indexes: items }] of entries(
        map,
      )) {
        infoMessage += `${category}: found ${items.length} items${
          categoryPath ? ` in path: ${categoryPath}` : ''
        }\n`
      }

      logger.info(infoMessage)
    }
  }

  return categoryMap
}

/**
 * Compute categories and page options for initial setup
 *
 * 计算分类和页面选项（用于初始化）
 *
 * @param pagesMap - Pages grouped by locale / 按语言环境分组的页面
 * @param store - Blog store / 博客存储
 * @param categoryOptions - Category options / 分类选项
 * @param slugify - Slugify function / Slugify 函数
 * @param isDebug - Whether in debug mode / 是否处于调试模式
 * @returns Object containing categories map and page options / 包含分类映射和页面选项的对象
 */
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
  const result = categoryOptions.map((options) => {
    const {
      key,
      path = '/:key/',
      layout = 'Layout',
      frontmatter = (): Record<string, string> => ({}),
      itemPath: itemPathOptions = '/:key/:name/',
      itemLayout = 'Layout',
      itemFrontmatter = (): Record<string, string> => ({}),
    } = options

    if (isDebug) logger.info(`Generating ${colors.cyan(key)} category.\n`)

    const getItemPath = resolveGetItemPath(itemPathOptions, key, slugify)
    const categoryMap = buildCategoryMap(
      pagesMap,
      store,
      options,
      slugify,
      isDebug,
    )
    const pageOptions: PageOptions[] = []

    for (const [localePath, localeConfig] of entries(categoryMap)) {
      // Add main category page
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
      }

      // Add item pages for each category name
      for (const [categoryName, config] of entries(localeConfig.map)) {
        if (config.path) {
          const itemPath = getItemPath(categoryName)

          if (itemPath) {
            const itemPagePath = `${localePath}${removeLeadingSlash(itemPath)}`

            pageOptions.push({
              path: itemPagePath,
              frontmatter: {
                ...itemFrontmatter(categoryName, localePath),
                blog: {
                  type: 'category',
                  name: categoryName,
                  key,
                },
                layout: itemLayout,
              },
            })
          }
        }
      }
    }

    return {
      key,
      categoryMap,
      pageOptions,
    }
  })

  return {
    categoriesMap: fromEntries(
      result.map(({ key, categoryMap }) => [key, categoryMap]),
    ),
    pageOptions: result.flatMap(({ pageOptions }) => pageOptions),
  }
}

/**
 * Update categories map incrementally (indexes only, no page management)
 *
 * 增量更新分类映射（仅更新索引，不管理页面）
 *
 * @description Recomputes which pages belong to each category and updates
 * the store indexes. Category item pages are managed separately through
 * delta comparison with {@link getCategoryItemPagePaths}.
 *
 * 重新计算每个分类包含哪些页面，并更新存储索引。
 * 分类子项页面通过 {@link getCategoryItemPagePaths} 的增量比较单独管理。
 *
 * @param pagesMap - Pages grouped by locale / 按语言环境分组的页面
 * @param store - Blog store / 博客存储
 * @param categoryOptions - Category options / 分类选项
 * @param slugify - Slugify function / Slugify 函数
 * @param isDebug - Whether in debug mode / 是否处于调试模式
 * @returns Updated categories map / 更新后的分类映射
 */
export const updateCategoriesMap = (
  pagesMap: PagesMap,
  store: Store,
  categoryOptions: BlogCategoryOptions[],
  slugify: (name: string) => string,
  isDebug: boolean,
): CategoriesMap =>
  fromEntries(
    categoryOptions.map((options) => [
      options.key,
      buildCategoryMap(pagesMap, store, options, slugify, isDebug),
    ]),
  )

/**
 * Collect non-empty item page paths from a category locale map
 *
 * 从分类区域映射中收集非空的子项页面路径
 *
 * @param map - Category locale map / 分类区域映射
 * @param paths - Array to collect paths into / 收集路径的数组
 */
const collectItemPaths = (
  map: Record<string, { path: string }>,
  paths: string[],
): void => {
  for (const config of Object.values(map))
    if (config.path) paths.push(config.path)
}

/**
 * Extract all category item page paths from a categories map
 *
 * 从分类映射中提取所有分类子项页面路径
 *
 * @description Collects all non-empty item page paths from categories that
 * have `itemPath` configured. Used to compute delta for incremental page updates.
 *
 * 收集所有配置了 `itemPath` 的分类中非空的子项页面路径。
 * 用于计算增量页面更新的差异。
 *
 * @param categoriesMap - Current categories map / 当前分类映射
 * @param categoryOptions - Category options / 分类选项
 * @returns Array of item page paths / 子项页面路径数组
 */
export const getCategoryItemPagePaths = (
  categoriesMap: CategoriesMap,
  categoryOptions: BlogCategoryOptions[],
): string[] => {
  const paths: string[] = []

  for (const { key, itemPath } of categoryOptions) {
    // Skip categories without itemPath configured
    if (itemPath === false) continue

    const categoryMap = categoriesMap[key]

    if (!categoryMap) continue

    for (const localeConfig of Object.values(categoryMap))
      collectItemPaths(localeConfig.map, paths)
  }

  return paths
}
