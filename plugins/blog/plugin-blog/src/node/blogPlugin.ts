import { addViteSsrNoExternal, getPageExcerpt } from '@vuepress/helper'
import type { Page, PageOptions, PluginFunction } from 'vuepress/core'
import { createPage, preparePageChunk, prepareRoutes } from 'vuepress/core'
import type { CategoriesMap, TypesMap } from '../shared/index.js'
import {
  getCategory,
  getCategoryOptions,
  prepareCategoriesMap,
} from './category/index.js'
import { getPageMap } from './getPagesMap.js'
import { PLUGIN_NAME, logger } from './logger.js'
import type { BlogPluginOptions } from './options.js'
import { Store, prepareStore } from './store.js'
import { getType, getTypeOptions, prepareTypesMap } from './type/index.js'

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
    // Paths of virtual pages created by this plugin (category/type listing pages)
    let blogPagePaths: string[] = []
    // Current category and type maps; used in onPrepared and kept in sync by onPageUpdated
    let categoriesMap: CategoriesMap = {}
    let typesMap: TypesMap = {}

    // Build category/type maps and page options for all virtual blog pages
    // from the current set of app pages.
    // 从当前 app 页面集合中计算分类/类型映射和所有虚拟博客页面的配置。
    const buildBlog = (): {
      categoriesMap: CategoriesMap
      typesMap: TypesMap
      pageOptions: PageOptions[]
    } => {
      const pageMap = getPageMap(app, filter)

      const {
        categoriesMap: newCategoriesMap,
        pageOptions: categoryPageOptions,
      } = getCategory(pageMap, store, categoryOptions, slugify, app.env.isDebug)

      const { typesMap: newTypesMap, pageOptions: typePageOptions } = getType(
        pageMap,
        store,
        typeOptions,
        slugify,
        app.env.isDebug,
      )

      return {
        categoriesMap: newCategoriesMap,
        typesMap: newTypesMap,
        pageOptions: [...categoryPageOptions, ...typePageOptions],
      }
    }

    // Sync virtual blog pages in `app.pages`: add pages that are new and remove
    // pages that no longer exist. Returns `true` when `app.pages` was mutated.
    // 同步 `app.pages` 中的虚拟博客页面：添加新页面，删除不再存在的页面。
    const syncBlogPages = async (
      pageOptions: PageOptions[],
    ): Promise<boolean> => {
      const newPagePathSet = new Set(pageOptions.map(({ path }) => path!))
      const oldPagePathSet = new Set(blogPagePaths)

      const toAdd = pageOptions.filter(({ path }) => !oldPagePathSet.has(path!))
      const toRemove = blogPagePaths.filter((path) => !newPagePathSet.has(path))

      if (toRemove.length > 0) {
        if (app.env.isDebug)
          logger.info(`Removing blog pages: ${toRemove.join(', ')}`)

        for (const pagePath of toRemove) {
          const idx = app.pages.findIndex(({ path }) => path === pagePath)

          if (idx !== -1) app.pages.splice(idx, 1)
        }
      }

      if (toAdd.length > 0) {
        if (app.env.isDebug) {
          logger.info(
            `Adding blog pages: ${toAdd.map(({ path }) => path).join(', ')}`,
          )
        }

        await Promise.all(
          toAdd.map(async (opts) => {
            const page = await createPage(app, opts)

            await preparePageChunk(app, page)
            app.pages.push(page)
          }),
        )
      }

      // Keep blogPagePaths in sync with the new set
      blogPagePaths = pageOptions.map(({ path }) => path!)

      return toAdd.length > 0 || toRemove.length > 0
    }

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

        // Inject meta information
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
        const result = buildBlog()

        // Store maps for onPrepared
        ;({ categoriesMap, typesMap } = result)
        blogPagePaths = result.pageOptions.map(({ path }) => path!)

        // Add all virtual blog pages to app.pages
        await Promise.all(
          result.pageOptions.map(async (pageOptions) => {
            const existingIndex = app.pages.findIndex(
              ({ path }) => path === pageOptions.path,
            )

            if (existingIndex === -1) {
              app.pages.push(await createPage(app, pageOptions))
            } else {
              logger.warn('Overriding existing page:', pageOptions.path)
              app.pages.splice(
                existingIndex,
                1,
                await createPage(app, pageOptions),
              )
            }
          }),
        )

        if (app.env.isDebug) logger.info('blog initialized')
      },

      onPrepared: async () => {
        await prepareStore(app, store)
        await prepareCategoriesMap(app, categoriesMap)
        await prepareTypesMap(app, typesMap)

        if (app.env.isDebug) logger.info('temp file generated')
      },

      onPageUpdated: async (_, _type, page) => {
        const hotReload =
          'hotReload' in options ? options.hotReload : app.env.isDebug

        // Skip if hot reload is disabled, or if the changed page is one of the
        // virtual blog pages created by this plugin (to avoid re-entrant updates)
        if (!hotReload || blogPagePaths.includes(page.path)) return

        const result = buildBlog()

        ;({ categoriesMap, typesMap } = result)

        const pagesChanged = await syncBlogPages(result.pageOptions)

        // Write all temp files so the dev client receives HMR updates
        await prepareStore(app, store)
        await prepareCategoriesMap(app, categoriesMap)
        await prepareTypesMap(app, typesMap)

        if (pagesChanged) await prepareRoutes(app)

        if (app.env.isDebug) logger.info('blog updated')
      },
    }
  }
