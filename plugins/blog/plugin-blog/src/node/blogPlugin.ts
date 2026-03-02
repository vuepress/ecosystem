import { addViteSsrNoExternal, getPageExcerpt } from '@vuepress/helper'
import { watch } from 'chokidar'
import type { Page, PluginFunction } from 'vuepress/core'
import {
  createPage,
  preparePageChunk,
  preparePageComponent,
  prepareRoutes,
} from 'vuepress/core'
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

              if (index !== -1) {
                logger.warn('Overriding existing page:', pageOptions.path)

                const existingIndex = app.pages.findIndex(
                  (page) => page.path === pageOptions.path,
                )

                app.pages.splice(
                  existingIndex,
                  1,
                  await createPage(app, pageOptions),
                )
              }

              app.pages.push(await createPage(app, pageOptions))
            },
          ),
        )

        // store data for onPrepared and onWatched
        blogPagePaths = [
          ...categoryResult.pageOptions,
          ...typeResult.pageOptions,
        ].map((page) => page.path!)
        ;({ categoriesMap } = categoryResult)
        ;({ typesMap } = typeResult)
      },

      onPrepared: async () => {
        // Prepare store
        await prepareStore(app, store)
        // Prepare category
        await prepareCategoriesMap(app, categoriesMap)
        // Prepare type
        await prepareTypesMap(app, typesMap)

        if (app.env.isDebug) logger.info('temp file generated')
      },

      onWatched: (_, watchers) => {
        const hotReload =
          'hotReload' in options ? options.hotReload : app.env.isDebug

        if (hotReload) {
          const pageDataWatcher = watch('pages', {
            cwd: app.dir.temp(),
            ignoreInitial: true,
            // only watch js files
            ignored: (path, stats) =>
              Boolean(stats?.isFile() && !path.endsWith('.js')),
          })

          const updateBlog = async (): Promise<void> => {
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

            await prepareCategoriesMap(app, categoryResult.categoriesMap)
            await prepareTypesMap(app, typeResult.typesMap)

            const pagesToBeAdded = newPageOptions.filter(
              (pageOptions) => !blogPagePaths.includes(pageOptions.path!),
            )
            const pagesToBeRemoved = blogPagePaths.filter((path) =>
              newPageOptions.every((page) => page.path !== path),
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

                  await preparePageComponent(app, page)
                  await preparePageChunk(app, page)
                  app.pages.push(page)
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
                app.pages.splice(
                  app.pages.findIndex(({ path }) => path === pagePath),
                  1,
                )
              })
            }

            // Prepare pages entry
            if (pagesToBeRemoved.length > 0 || pagesToBeAdded.length > 0)
              await prepareRoutes(app)

            // store blog pages for next update
            blogPagePaths = newPageOptions.map((page) => page.path!)

            if (app.env.isDebug) logger.info('temp file updated')
          }

          pageDataWatcher.on('add', () => {
            void updateBlog()
          })
          pageDataWatcher.on('change', () => {
            void updateBlog()
          })
          pageDataWatcher.on('unlink', () => {
            void updateBlog()
          })

          watchers.push(pageDataWatcher)
        }
      },
    }
  }
