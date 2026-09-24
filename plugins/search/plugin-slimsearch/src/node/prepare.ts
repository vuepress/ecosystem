import { encodeData } from '@vuepress/helper'
import {
  generatePageIndex,
  prepareSearchIndex as prepareIndex,
  prepareStore as preparePathStore,
  prepareWorkerOptions as prepareSortStrategy,
  writeLocaleIndex,
  writeLocaleRegistry,
} from '@vuepress/search-helper'
import type {
  PathStore,
  SearchIndexStore as BaseSearchIndexStore,
} from '@vuepress/search-helper'
import { addAll, discard, vacuum } from 'slimsearch'
import type { App, Page } from 'vuepress/core'

import type { SearchIndex } from '../shared/index.js'
import type { SlimSearchPluginOptions } from './options.js'
import { TEMP_DIR } from './utils.js'

type SearchIndexStore = BaseSearchIndexStore<SearchIndex>

/**
 * Encode a SlimSearch index into a string that the client can decode.
 *
 * A SlimSearch index is JSON serializable on its own, so it only needs to be
 * compressed and encoded.
 *
 * 将 SlimSearch 索引编码为客户端可以解码的字符串。
 *
 * SlimSearch 索引本身即可 JSON 序列化，因此只需压缩后编码。
 *
 * @param index - Live index 实时的索引
 * @returns Encoded index 编码后的索引
 */
export const encodeIndex = (index: SearchIndex): string =>
  encodeData(JSON.stringify(index))

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
  options: SlimSearchPluginOptions,
): Promise<void> => {
  await prepareSortStrategy(app, TEMP_DIR, options.sortStrategy ?? 'max')
}

/**
 * Rewrite the temp files of a locale after its index changed.
 *
 * The path store is rewritten as well, because a page that is added during a
 * hot reload gets a new index id, which the client could not resolve
 * otherwise.
 *
 * 语言环境索引变化后重写其临时文件。
 *
 * 路径存储也会被重写，因为热重载期间新增的页面会获得新的索引 id，否则客户端无法解析它。
 *
 * @param app - VuePress app VuePress 应用实例
 * @param searchIndexStore - Index store 索引存储
 * @param store - Path store 路径存储
 * @param localePath - Path of the locale 语言环境的路径
 * @param index - Index of the locale 该语言环境的索引
 */
const writeDevFiles = async (
  app: App,
  searchIndexStore: SearchIndexStore,
  store: PathStore,
  localePath: string,
  index: SearchIndex,
): Promise<void> => {
  await Promise.all([
    writeLocaleIndex(app, prepareOptions, localePath, index),
    writeLocaleRegistry(app, TEMP_DIR, Object.keys(searchIndexStore)),
    prepareStore(app, store),
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
  options: SlimSearchPluginOptions,
  { searchIndexStore, store, indexesByPage }: DevContext,
  page: Page<{ excerpt?: string }>,
): Promise<void> => {
  const pageIndexes = generatePageIndex(page, store, options)
  const { pathLocale } = page
  const localeSearchIndex = searchIndexStore[pathLocale]

  // Remove previous index
  for (const id of indexesByPage.get(page.path) ?? [])
    discard(localeSearchIndex, id)

  indexesByPage.set(
    page.path,
    pageIndexes.map(({ id }) => id),
  )

  addAll(localeSearchIndex, pageIndexes)

  await vacuum(localeSearchIndex)

  await writeDevFiles(
    app,
    searchIndexStore,
    store,
    pathLocale,
    localeSearchIndex,
  )
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

  for (const id of indexesByPage.get(page.path) ?? [])
    discard(localeSearchIndex, id)

  indexesByPage.delete(page.path)
  store.deletePath(page.path)

  await vacuum(localeSearchIndex)

  await writeDevFiles(
    app,
    searchIndexStore,
    store,
    pathLocale,
    localeSearchIndex,
  )
}
