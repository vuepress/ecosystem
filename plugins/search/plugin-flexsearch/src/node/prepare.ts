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
import type { FlexSearchPluginOptions } from './options.js'
import { TEMP_DIR } from './utils.js'

const prepareOptions = { tempDir: TEMP_DIR, encode: encodeIndex }

/** Page with the data that is indexed. 带有被索引数据的页面。 */
type IndexablePage = Page<{ excerpt?: string }>

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
  options: FlexSearchPluginOptions,
): Promise<void> => {
  await prepareSortStrategy(app, TEMP_DIR, options.sortStrategy ?? 'max')
}

/**
 * Rewrite the temp files of the locales whose index changed.
 *
 * The path store is rewritten as well, because a page that is added during a
 * hot reload gets a new index id, which the client could not resolve otherwise.
 * A locale without an index is skipped, but the registry and the path store are
 * still rewritten, so that a removed page does not leave its id behind.
 *
 * 索引发生变化的语言环境的临时文件会被重写。
 *
 * 路径存储也会被重写，因为热重载期间新增的页面会获得新的索引 id，否则客户端无法解析它。
 * 没有索引的语言环境会被跳过，但注册表与路径存储仍会被重写，因此被移除的页面不会留下它的 id。
 *
 * @param app - VuePress app VuePress 应用实例
 * @param searchIndexStore - Index store 索引存储
 * @param store - Path store 路径存储
 * @param localePaths - Paths of the locales to rewrite 需要重写的语言环境的路径
 */
const writeDevFiles = async (
  app: App,
  searchIndexStore: SearchIndexStore,
  store: PathStore,
  localePaths: Iterable<string>,
): Promise<void> => {
  await Promise.all([
    ...[...new Set(localePaths)].map((localePath) => {
      const index = searchIndexStore[localePath]

      return index && writeLocaleIndex(app, prepareOptions, localePath, index)
    }),
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
 * Remove the index ids that are registered for a path.
 *
 * The path itself is kept in the path store: the page is registered there by
 * `generatePageIndex` when it is indexed again, so only the entry of a page
 * that is gone for good has to be deleted, see `removePathIndex`.
 *
 * 移除某个路径下登记的索引 id。
 *
 * 路径本身会保留在路径存储中：页面被重新索引时会由 `generatePageIndex` 登记它，因此只有彻底消失的页面才需要删除其条目，见
 * `removePathIndex`。
 *
 * @param searchIndexStore - Index store 索引存储
 * @param indexesByPage - Map of the index ids of each page 每个页面的索引 id 的映射
 * @param path - Path the documents were indexed under 文档被索引时所用的路径
 * @param pathLocale - Locale the documents were indexed in 文档被索引时所用的语言环境
 * @returns Path of the locale to rewrite 需要重写的语言环境的路径
 */
const removeDocuments = (
  searchIndexStore: SearchIndexStore,
  indexesByPage: Map<string, string[]>,
  path: string,
  pathLocale: string,
): string => {
  const localeSearchIndex = searchIndexStore[pathLocale]

  for (const id of indexesByPage.get(path) ?? []) localeSearchIndex?.remove(id)

  indexesByPage.delete(path)

  return pathLocale
}

/**
 * Remove the documents of a page that was indexed under a path, and forget the
 * path itself.
 *
 * VuePress identifies pages by their file path, so a page whose path changed
 * keeps its documents under its previous path. The caller passes the path and
 * the locale the documents were indexed in, which are not necessarily the ones
 * of the new page.
 *
 * The path store is cleaned up as well, because a page whose locale has no
 * index (all of its pages are filtered out) is still registered in it.
 *
 * 移除以某个路径被索引的页面的文档，并一并忘记该路径。
 *
 * VuePress 以文件路径来标识页面，因此路径发生变化的页面会以旧路径保留其文档。调用方传入文档被索引时所用的路径与语言环境，它们不一定是新页面的那个。
 *
 * 路径存储也会被清理，因为语言环境没有索引（其所有页面都被过滤掉）的页面仍会被登记在其中。
 *
 * @param searchIndexStore - Index store 索引存储
 * @param indexesByPage - Map of the index ids of each page 每个页面的索引 id 的映射
 * @param store - Path store 路径存储
 * @param path - Path the documents were indexed under 文档被索引时所用的路径
 * @param pathLocale - Locale the documents were indexed in 文档被索引时所用的语言环境
 * @returns Path of the locale to rewrite 需要重写的语言环境的路径
 */
const removePathIndex = (
  searchIndexStore: SearchIndexStore,
  indexesByPage: Map<string, string[]>,
  store: PathStore,
  path: string,
  pathLocale: string,
): string => {
  const locale = removeDocuments(
    searchIndexStore,
    indexesByPage,
    path,
    pathLocale,
  )

  store.deletePath(path)

  return locale
}

/**
 * Update the search index of a single page in dev mode.
 *
 * The index ids of a page are tracked in `indexesByPage`, so that its stale
 * documents can be removed before the new ones are added.
 *
 * A page whose path changed has to be removed by the path and the locale it was
 * indexed under, which are the ones of the old page: both are derived from the
 * file path, so they can not be guessed from the new page.
 *
 * 在开发模式下更新单个页面的搜索索引。
 *
 * 页面的索引 id 会被记录在 `indexesByPage` 中，从而可以在添加新文档之前移除其过期文档。
 *
 * 路径发生变化的页面必须以它被索引时所用的路径与语言环境来移除，也就是旧页面的那两个：两者都由文件路径推导而来，无法从新页面推断。
 *
 * @param app - VuePress app VuePress 应用实例
 * @param options - Plugin options 插件选项
 * @param context - Dev context 开发环境上下文
 * @param newPage - The page to update 需要更新的页面
 * @param oldPage - The page before the update, provided when it existed
 *   更新前的页面，存在时提供
 */
export const updateSearchIndex = async (
  app: App,
  options: FlexSearchPluginOptions,
  { searchIndexStore, store, indexesByPage }: DevContext,
  newPage: IndexablePage,
  oldPage?: IndexablePage,
): Promise<void> => {
  const pageIndexes = generatePageIndex(newPage, store, options)
  const { pathLocale } = newPage

  // Lazily create the locale index when a page moves to a new locale
  const localeSearchIndex =
    searchIndexStore[pathLocale] ?? createLocaleIndex(app, options, pathLocale)

  searchIndexStore[pathLocale] = localeSearchIndex

  const changedLocales = new Set<string>([pathLocale])

  // A page whose path changed keeps its documents under its previous path,
  // which can belong to another locale
  if (oldPage) {
    changedLocales.add(
      removePathIndex(
        searchIndexStore,
        indexesByPage,
        store,
        oldPage.path,
        oldPage.pathLocale,
      ),
    )
  }

  removeDocuments(searchIndexStore, indexesByPage, newPage.path, pathLocale)

  indexesByPage.set(
    newPage.path,
    pageIndexes.map(({ id }) => id),
  )

  // The index items are spread into fresh documents, so that FlexSearch does
  // not keep a reference to the objects of the page index
  for (const item of pageIndexes) localeSearchIndex.add({ ...item })

  await writeDevFiles(app, searchIndexStore, store, changedLocales)
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
  page: IndexablePage,
): Promise<void> => {
  const locale = removePathIndex(
    searchIndexStore,
    indexesByPage,
    store,
    page.path,
    page.pathLocale,
  )

  await writeDevFiles(app, searchIndexStore, store, [locale])
}
