import { insertMultiple, removeMultiple } from '@orama/orama'
import { entries, keys } from '@vuepress/helper'
import type { App, Page } from 'vuepress/core'

import { createIndex, serializeIndex } from '../shared/index.js'
import type { SearchIndex, SearchIndexStore } from '../shared/index.js'
import { generatePageIndex } from './generateIndex.js'
import type { OramaPluginOptions } from './options.js'
import type { PathStore } from './pathStore.js'
import { getLocaleChunkName } from './utils.js'

export const prepareStore = async (
  app: App,
  store: PathStore,
): Promise<void> => {
  await app.writeTemp(
    `orama/store.js`,
    `\
export const store = ${store.toJSON()}
`,
  )
}

export const prepareSearchIndex = async (
  app: App,
  searchIndexStore: SearchIndexStore,
): Promise<void> => {
  await Promise.all(
    entries(searchIndexStore).map(([locale, index]) =>
      app.writeTemp(
        `orama/${getLocaleChunkName(locale)}.js`,
        `export default ${JSON.stringify(JSON.stringify(serializeIndex(index)))}`,
      ),
    ),
  )

  await app.writeTemp(
    `orama/index.js`,
    `export default {${keys(searchIndexStore)
      .map(
        (locale) =>
          `${JSON.stringify(locale)}: () => import('./${getLocaleChunkName(
            locale,
          )}.js')`,
      )
      .join(',')}}`,
  )
}

export const prepareWorkerOptions = async (
  app: App,
  options: OramaPluginOptions,
): Promise<void> => {
  await app.writeTemp(
    `orama/worker-options.js`,
    `\
export const sortStrategy = "${options.sortStrategy ?? 'max'}"
`,
  )
}

export interface DevContext {
  searchIndexStore: SearchIndexStore
  store: PathStore
  indexesByPage: Map<string, string[]>
}

const writeLocaleIndex = async (
  app: App,
  locale: string,
  index: SearchIndex,
): Promise<void> => {
  await app.writeTemp(
    `orama/${getLocaleChunkName(locale)}.js`,
    `export default ${JSON.stringify(JSON.stringify(serializeIndex(index)))}`,
  )
}

/**
 * Rewrite the locale chunk, the locale registry and the path store in dev mode
 * after the search index changes.
 *
 * 在开发模式下搜索索引变化后，重写语言分块、语言注册表与路径存储。
 *
 * @param app - VuePress app VuePress 应用实例
 * @param context - Dev context 开发环境上下文
 * @param locale - The locale to rewrite 需要重写的语言环境
 * @param index - The index of the locale 该语言环境的索引
 */
const writeDevFiles = async (
  app: App,
  { searchIndexStore, store }: DevContext,
  locale: string,
  index: SearchIndex,
): Promise<void> => {
  await Promise.all([
    writeLocaleIndex(app, locale, index),
    app.writeTemp(
      `orama/index.js`,
      `export default {${keys(searchIndexStore)
        .map(
          (localePath) =>
            `${JSON.stringify(localePath)}: () => import('./${getLocaleChunkName(
              localePath,
            )}.js')`,
        )
        .join(',')}}`,
    ),
    prepareStore(app, store),
  ])
}

/**
 * Update the search index of a single page in dev mode.
 *
 * `indexesByPage` in the context maps each page path to the document ids that
 * belong to it, allowing us to remove stale documents when a page changes.
 *
 * 在开发模式下更新单个页面的搜索索引。
 *
 * 上下文中的 `indexesByPage` 将每个页面路径映射到属于它的文档 id，从而在页面变化时能够移除过期的文档。
 *
 * @param app - VuePress app VuePress 应用实例
 * @param options - Plugin options 插件选项
 * @param context - Dev context 开发环境上下文
 * @param page - The page to update 需要更新的页面
 */
export const updateSearchIndex = async (
  app: App,
  options: OramaPluginOptions,
  { searchIndexStore, store, indexesByPage }: DevContext,
  page: Page<{ excerpt?: string }>,
): Promise<void> => {
  const pageIndexes = generatePageIndex(page, store, options)
  const { pathLocale } = page

  // Lazily create the locale index when a page moves to a new locale
  const localeSearchIndex =
    searchIndexStore[pathLocale] ??
    createIndex(
      app.options.locales[pathLocale]?.lang ?? app.options.lang,
      null,
      {
        tokenizer:
          options.indexLocaleOptions?.[pathLocale]?.tokenizer ??
          options.indexOptions?.tokenizer,
      },
    )
  searchIndexStore[pathLocale] = localeSearchIndex

  // Remove previous index
  await removeMultiple(localeSearchIndex, indexesByPage.get(page.path) ?? [])

  indexesByPage.set(
    page.path,
    pageIndexes.map(({ id }) => id),
  )

  await insertMultiple(localeSearchIndex, pageIndexes)

  // Rewrite dev files
  await writeDevFiles(
    app,
    { searchIndexStore, store, indexesByPage },
    pathLocale,
    localeSearchIndex,
  )
}

export const removeSearchIndex = async (
  app: App,
  { searchIndexStore, store, indexesByPage }: DevContext,
  page: Page<{ excerpt?: string }>,
): Promise<void> => {
  const { pathLocale } = page
  const localeSearchIndex = searchIndexStore[pathLocale]

  // Remove previous index
  await removeMultiple(localeSearchIndex, indexesByPage.get(page.path) ?? [])

  indexesByPage.delete(page.path)
  store.deletePath(page.path)

  // Rewrite dev files
  await writeDevFiles(
    app,
    { searchIndexStore, store, indexesByPage },
    pathLocale,
    localeSearchIndex,
  )
}
