import { addViteSsrNoExternal, getPageExcerpt } from '@vuepress/helper'
import type { Page, PluginFunction } from 'vuepress/core'
import { createPage, preparePageChunk, prepareRoutes } from 'vuepress/core'

import type { CategoriesMap, TypesMap } from '../shared/index.js'
import {
  getCategory,
  getCategoryOptions,
  prepareCategoriesMap,
} from './category/index.js'
import { getPageMap } from './getPagesMap.js'
import { PLUGIN_NAME, logger } from './logger.js'
import type {
  BlogCategoryOptions,
  BlogPluginOptions,
  BlogTypeOptions,
} from './options.js'
import { Store, prepareStore } from './store.js'
import { getType, getTypeOptions, prepareTypesMap } from './type/index.js'

/**
 * Check if blog-relevant data changed between old and new page
 *
 * 检查旧页面和新页面之间的博客相关数据是否发生变化
 */
const hasBlogDataChanged = (
  oldPage: Page,
  newPage: Page,
  categoryOptions: BlogCategoryOptions[],
  typeOptions: BlogTypeOptions[],
): boolean => {
  for (const { getter, sorter } of categoryOptions) {
    // If a sorter is provided, we can't reliably detect sort-affecting changes,
    // so conservatively treat the data as changed
    if (sorter) return true

    const oldCategories = [...getter(oldPage)].sort()
    const newCategories = [...getter(newPage)].sort()

    if (
      oldCategories.length !== newCategories.length ||
      oldCategories.some((category, index) => category !== newCategories[index])
    )
      return true
  }

  for (const { filter: typeFilter, sorter } of typeOptions) {
    // If a sorter is provided, conservatively treat the data as changed
    if (sorter) return true

    const filterFn = typeFilter ?? ((): boolean => true)

    if (filterFn(oldPage) !== filterFn(newPage)) return true
  }

  return false
}

/**
 * Blog plugin for VuePress
 *
 * VuePress 的博客插件
 *
 * Adds blog functionality including article collection, categorization, type
 * filtering, and excerpt generation
 *
 * 添加博客功能，包括文章收集、分类、类型过滤和摘要生成
 *
 * @example
 *   import { blogPlugin } from '@vuepress/plugin-blog'
 *
 *   export default {
 *     plugins: [
 *       blogPlugin({
 *         filter: (page) => Boolean(page.filePathRelative),
 *         excerpt: true,
 *       }),
 *     ],
 *   }
 */
export const blogPlugin =
  (options: BlogPluginOptions): PluginFunction =>
  (app) => {
    if (app.env.isDebug) logger.info('Options:', options)

    const {
      getInfo = (): Record<string, never> => ({}),
      filter = (page: Page): boolean =>
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
    const hotReload = options.hotReload ?? app.env.isDebug
    const categoryOptions = getCategoryOptions(category)
    const typeOptions = getTypeOptions(type)
    const store = new Store()
    let blogPagePaths: string[] = []
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
        blogPagePaths = [
          ...categoryResult.pageOptions,
          ...typeResult.pageOptions,
        ].map((page) => page.path!)
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

      onPageUpdated: async (_app, updateType, newPage, oldPage) => {
        if (!hotReload) return

        // For update type, check if blog-relevant data changed
        if (updateType === 'update') {
          const isFiltered = filter(newPage!)
          const wasFiltered = filter(oldPage!)

          // If page wasn't and still isn't a blog page, skip
          if (!isFiltered && !wasFiltered) return

          // If filter status and path unchanged, check structural changes
          if (
            isFiltered &&
            wasFiltered &&
            newPage!.path === oldPage!.path &&
            !hasBlogDataChanged(
              oldPage!,
              newPage!,
              categoryOptions,
              typeOptions,
            )
          )
            return
        }

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
        const newPageOptions = [
          ...categoryResult.pageOptions,
          ...typeResult.pageOptions,
        ]

        // Write updated temp files
        await Promise.all([
          prepareStore(app, store),
          prepareCategoriesMap(app, categoryResult.categoriesMap),
          prepareTypesMap(app, typeResult.typesMap),
        ])

        const pagesToBeAdded = newPageOptions.filter(
          (pageOptions) => !blogPagePaths.includes(pageOptions.path!),
        )
        const pagesToBeRemoved = blogPagePaths.filter((pagePath) =>
          newPageOptions.every((pageOption) => pageOption.path !== pagePath),
        )

        // add new pages
        if (pagesToBeAdded.length > 0) {
          if (app.env.isDebug) {
            logger.info(
              `Adding new pages: ${pagesToBeAdded.map(({ path }) => path).join(', ')}`,
            )
          }

          // Prepare page files
          await Promise.all(
            pagesToBeAdded.map(async (pageOptions) => {
              const page = await createPage(app, pageOptions)

              app.pages.push(page)
              await preparePageChunk(app, page)
            }),
          )
        }

        // Remove pages
        if (pagesToBeRemoved.length > 0) {
          if (app.env.isDebug) {
            logger.info(
              `Removing following pages: ${pagesToBeRemoved.join(', ')}`,
            )
          }

          pagesToBeRemoved.forEach((pagePath) => {
            const index = app.pages.findIndex(({ path }) => path === pagePath)

            if (index !== -1) app.pages.splice(index, 1)
          })
        }

        // Prepare routes only if pages changed
        if (pagesToBeAdded.length > 0 || pagesToBeRemoved.length > 0)
          await prepareRoutes(app)

        if (app.env.isDebug) logger.info('blog data updated incrementally')

        blogPagePaths = newPageOptions.map((pageOption) => pageOption.path!)
      },
    }
  }
