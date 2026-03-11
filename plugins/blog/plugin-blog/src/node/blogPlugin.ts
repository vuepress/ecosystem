import { addViteSsrNoExternal, getPageExcerpt } from '@vuepress/helper'
import type { Page, PageOptions, PluginFunction } from 'vuepress/core'
import { createPage, preparePageChunk, prepareRoutes } from 'vuepress/core'
import type { CategoriesMap, TypesMap } from '../shared/index.js'
import {
  getCategory,
  getCategoryItemPagePaths,
  getCategoryOptions,
  prepareCategoriesMap,
  updateCategoriesMap,
} from './category/index.js'
import { getPageMap } from './getPagesMap.js'
import { PLUGIN_NAME, logger } from './logger.js'
import type { BlogCategoryOptions, BlogPluginOptions } from './options.js'
import { Store, prepareStore } from './store.js'
import {
  getType,
  getTypeOptions,
  prepareTypesMap,
  updateTypesMap,
} from './type/index.js'

/**
 * Build page options for a category item page
 *
 * 为分类子项页面构建页面选项
 *
 * @param pagePath - Item page path / 子项页面路径
 * @param categoriesMap - Current categories map / 当前分类映射
 * @param categoryOpts - Category options / 分类选项
 * @returns Page options or null if not found / 页面选项或 null
 */
const buildCategoryItemPageOptions = (
  pagePath: string,
  categoriesMap: CategoriesMap,
  categoryOpts: BlogCategoryOptions[],
): PageOptions | null => {
  for (const opt of categoryOpts) {
    const {
      key,
      itemLayout = 'Layout',
      itemFrontmatter = (): Record<string, string> => ({}),
    } = opt

    const categoryMap = categoriesMap[key]

    if (!categoryMap) continue

    for (const [localePath, localeConfig] of Object.entries(categoryMap)) {
      for (const [categoryName, config] of Object.entries(localeConfig.map)) {
        if (config.path === pagePath) {
          return {
            path: pagePath,
            frontmatter: {
              ...itemFrontmatter(categoryName, localePath),
              blog: {
                type: 'category',
                name: categoryName,
                key,
              },
              layout: itemLayout,
            },
          }
        }
      }
    }
  }

  return null
}

/**
 * Blog plugin for VuePress
 *
 * VuePress 的博客插件
 *
 * @description Adds blog functionality including article collection, categorization, type filtering, and excerpt generation
 *
 * 添加博客功能，包括文章收集、分类、类型过滤和摘要生成
 *
 * @example
 * ```ts
 * import { blogPlugin } from '@vuepress/plugin-blog'
 *
 * export default {
 *   plugins: [
 *     blogPlugin({
 *       filter: (page) => Boolean(page.filePathRelative),
 *       excerpt: true
 *     })
 *   ]
 * }
 * ```
 */
export const blogPlugin =
  (options: BlogPluginOptions): PluginFunction =>
  (app) => {
    if (app.env.isDebug) logger.info('Options:', options)

    const {
      getInfo = (): Record<string, never> => ({}),
      filter = (page): boolean =>
        Boolean(page.filePathRelative) && !page.frontmatter.home,
      metaScope = '_blog',
      excerpt = true,
      excerptSeparator = '<!-- more -->',
      excerptLength = 300,
      excerptFilter = filter,
      isCustomElement = (): boolean => false,
      category = [],
      type = [],
      slugify = (name: string): string =>
        name
          .replaceAll(/[ _]/g, '-')
          .replaceAll(/[:?*|\\/<>]/g, '')
          .toLowerCase(),
    } = options

    const categoryOptions = getCategoryOptions(category)
    const typeOptions = getTypeOptions(type)
    const store = new Store()
    let categoriesMap: CategoriesMap = {}
    let typesMap: TypesMap = {}

    return {
      name: PLUGIN_NAME,

      define: () => ({
        __BLOG_META_SCOPE__: metaScope,
      }),

      extendsBundlerOptions: (bundlerOptions: unknown) => {
        addViteSsrNoExternal(bundlerOptions, app, '@vuepress/helper')
      },

      extendsPage: (page) => {
        // Generate page excerpt
        if (
          excerpt &&
          excerptFilter(page) &&
          !(page as Page<{ excerpt?: string }>).data.excerpt
        ) {
          ;(page as Page<{ excerpt?: string }>).data.excerpt = getPageExcerpt(
            app,
            page,
            {
              isCustomElement,
              separator: excerptSeparator,
              length: excerptLength,
            },
          )
        }

        // inject meta information
        if (filter(page)) {
          page.routeMeta = {
            ...(metaScope === ''
              ? getInfo(page)
              : { [metaScope]: getInfo(page) }),
            ...page.routeMeta,
          }
        }
      },

      onInitialized: async () => {
        const pageMap = getPageMap(app, filter)

        const categoryResult = getCategory(
          pageMap,
          store,
          categoryOptions,
          slugify,
          app.env.isDebug,
        )

        const typeResult = getType(
          pageMap,
          store,
          typeOptions,
          slugify,
          app.env.isDebug,
        )

        await Promise.all(
          [...categoryResult.pageOptions, ...typeResult.pageOptions].map(
            async (pageOptions) => {
              const index = app.pages.findIndex(
                (page) => page.path === pageOptions.path,
              )

              if (index === -1) {
                app.pages.push(await createPage(app, pageOptions))
              } else {
                logger.warn('Overriding existing page:', pageOptions.path)

                app.pages.splice(index, 1, await createPage(app, pageOptions))
              }
            },
          ),
        )

        // store data for onPrepared and onPageUpdated
        ;({ categoriesMap } = categoryResult)
        ;({ typesMap } = typeResult)
      },

      onPrepared: async () => {
        await Promise.all([
          prepareStore(app, store),
          prepareCategoriesMap(app, categoriesMap),
          prepareTypesMap(app, typesMap),
        ])

        if (app.env.isDebug) logger.info('temp file generated')
      },

      onPageUpdated: async (_, _type, _page) => {
        const hotReload =
          'hotReload' in options ? options.hotReload : app.env.isDebug

        if (!hotReload) return

        const pageMap = getPageMap(app, filter)

        // Update types incrementally (store indexes only, no page changes)
        typesMap = updateTypesMap(
          pageMap,
          store,
          typeOptions,
          slugify,
          app.env.isDebug,
        )

        // Update categories incrementally with delta comparison
        const oldCategoryItemPaths = getCategoryItemPagePaths(
          categoriesMap,
          categoryOptions,
        )
        categoriesMap = updateCategoriesMap(
          pageMap,
          store,
          categoryOptions,
          slugify,
          app.env.isDebug,
        )
        const newCategoryItemPaths = getCategoryItemPagePaths(
          categoriesMap,
          categoryOptions,
        )

        // Determine item pages to add/remove based on delta
        const pagesToBeAdded = newCategoryItemPaths.filter(
          (pagePath) => !oldCategoryItemPaths.includes(pagePath),
        )
        const pagesToBeRemoved = oldCategoryItemPaths.filter(
          (pagePath) => !newCategoryItemPaths.includes(pagePath),
        )

        // Write updated temp files
        await Promise.all([
          prepareStore(app, store),
          prepareCategoriesMap(app, categoriesMap),
          prepareTypesMap(app, typesMap),
        ])

        // Add new category item pages
        if (pagesToBeAdded.length > 0) {
          if (app.env.isDebug) {
            logger.info(
              `Adding category item pages: ${pagesToBeAdded.join(', ')}`,
            )
          }

          await Promise.all(
            pagesToBeAdded.map(async (pagePath) => {
              const pageOpts = buildCategoryItemPageOptions(
                pagePath,
                categoriesMap,
                categoryOptions,
              )

              if (pageOpts) {
                const newPage = await createPage(app, pageOpts)

                await preparePageChunk(app, newPage)
                app.pages.push(newPage)
              }
            }),
          )
        }

        // Remove deleted category item pages
        if (pagesToBeRemoved.length > 0) {
          if (app.env.isDebug) {
            logger.info(
              `Removing category item pages: ${pagesToBeRemoved.join(', ')}`,
            )
          }

          pagesToBeRemoved.forEach((pagePath) => {
            const idx = app.pages.findIndex(({ path }) => path === pagePath)

            if (idx !== -1) app.pages.splice(idx, 1)
          })
        }

        // Prepare routes only if pages changed
        if (pagesToBeAdded.length > 0 || pagesToBeRemoved.length > 0)
          await prepareRoutes(app)

        if (app.env.isDebug) logger.info('blog data updated incrementally')
      },
    }
  }
