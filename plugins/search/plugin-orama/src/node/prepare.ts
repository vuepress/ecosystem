import { insertMultiple, removeMultiple } from '@orama/orama'
import {
  generatePageIndex,
  prepareSearchIndex as prepareIndex,
  prepareStore as preparePathStore,
  prepareWorkerOptions as prepareSortStrategy,
  writeLocaleIndex,
  writeLocaleRegistry,
} from '@vuepress/search-helper'
import type { PathStore } from '@vuepress/search-helper'
import type { App, Page } from 'vuepress/core'

import { encodeIndex } from '../shared/index.js'
import type { SearchIndexStore } from '../shared/index.js'
import { createLocaleIndex } from './generateIndex.js'
import type { OramaPluginOptions } from './options.js'
import { TEMP_DIR } from './utils.js'

const prepareOptions = { tempDir: TEMP_DIR, encode: encodeIndex }

/**
 * Write the path store of the plugin into a temp file.
 *
 * 将插件的路径存储写入临时文件。
 *
 * @param app - VuePress app VuePress 应用实例
 * @param store - Path store 路径存储
 */
export const prepareStore = async (
  app: App,
  store: PathStore,
): Promise<void> => {
  await preparePathStore(app, TEMP_DIR, store)
}

/**
 * Write the search indexes of every locale as temp chunks.
 *
 * 将所有语言环境的搜索索引写入临时分块。
 *
 * @param app - VuePress app VuePress 应用实例
 * @param searchIndexStore - Index store 索引存储
 */
export const prepareSearchIndex = async (
  app: App,
  searchIndexStore: SearchIndexStore,
): Promise<void> => {
  await prepareIndex(app, prepareOptions, searchIndexStore)
}

/**
 * Write the worker options into a temp file.
 *
 * 将工作线程选项写入临时文件。
 *
 * @param app - VuePress app VuePress 应用实例
 * @param options - Plugin options 插件选项
 */
export const prepareWorkerOptions = async (
  app: App,
  options: OramaPluginOptions,
): Promise<void> => {
  await prepareSortStrategy(app, TEMP_DIR, options.sortStrategy ?? 'max')
}

/**
 * Rewrite the temp files of a locale after its index changed.
 *
 * 语言环境索引变化后重写其临时文件。
 *
 * @param app - VuePress app VuePress 应用实例
 * @param searchIndexStore - Index store 索引存储
 * @param localePath - Path of the locale 语言环境的路径
 * @param index - Index of the locale 该语言环境的索引
 */
const writeDevFiles = async (
  app: App,
  searchIndexStore: SearchIndexStore,
  localePath: string,
  index: SearchIndexStore[string],
): Promise<void> => {
  await Promise.all([
    writeLocaleIndex(app, prepareOptions, localePath, index),
    writeLocaleRegistry(app, TEMP_DIR, Object.keys(searchIndexStore)),
  ])
}

/** Context of the dev server. 开发服务器的上下文。 */
export interface DevContext {
  /** Index store 索引存储 */
  searchIndexStore: SearchIndexStore
  /** Path store 路径存储 */
  store: PathStore
  /** Index ids of each page 每个页面的索引 id */
  indexesByPage: Map<string, string[]>
}

/**
 * Update the search index of a single page in dev mode.
 *
 * The index ids of a page are tracked in `indexesByPage`, so that its stale
 * documents can be removed before the new ones are added.
 *
 * 在开发模式下更新单个页面的搜索索引。
 *
 * 页面的索引 id 会被记录在 `indexesByPage` 中，从而可以在添加新文档之前移除其过期文档。
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
    (await createLocaleIndex(app, options, pathLocale))
  searchIndexStore[pathLocale] = localeSearchIndex

  // Remove previous index
  await removeMultiple(localeSearchIndex, indexesByPage.get(page.path) ?? [])

  indexesByPage.set(
    page.path,
    pageIndexes.map(({ id }) => id),
  )

  await insertMultiple(localeSearchIndex, pageIndexes)

  await writeDevFiles(app, searchIndexStore, pathLocale, localeSearchIndex)
}

/**
 * Remove the search index of a single page in dev mode.
 *
 * 在开发模式下移除单个页面的搜索索引。
 *
 * @param app - VuePress app VuePress 应用实例
 * @param context - Dev context 开发环境上下文
 * @param page - The page to remove 需要移除的页面
 */
export const removeSearchIndex = async (
  app: App,
  { searchIndexStore, store, indexesByPage }: DevContext,
  page: Page<{ excerpt?: string }>,
): Promise<void> => {
  const { pathLocale } = page
  const localeSearchIndex = searchIndexStore[pathLocale]

  await removeMultiple(localeSearchIndex, indexesByPage.get(page.path) ?? [])

  indexesByPage.delete(page.path)
  store.deletePath(page.path)

  await writeDevFiles(app, searchIndexStore, pathLocale, localeSearchIndex)
}
