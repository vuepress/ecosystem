import { entries } from '@vuepress/helper'
import {
  collectPageIndex,
  createWordTokenizer,
  getLocaleLanguage,
} from '@vuepress/search-helper'
import type { PathStore } from '@vuepress/search-helper'
import { addAllAsync, createIndex } from 'slimsearch'
import type { App } from 'vuepress/core'

import { INDEX_FIELD_CONFIG } from '../shared/index.js'
import type {
  IndexItem,
  SearchIndex,
  SearchIndexStore,
} from '../shared/index.js'
import type { SlimSearchPluginOptions } from './options.js'

/**
 * Create the SlimSearch index of a locale.
 *
 * 创建某个语言环境的 SlimSearch 索引。
 *
 * @param app - VuePress app VuePress 应用实例
 * @param options - Plugin options 插件选项
 * @param localePath - Path of the locale 语言环境的路径
 * @returns SlimSearch index 该语言环境的 SlimSearch 索引
 */
export const createLocaleIndex = (
  app: App,
  options: SlimSearchPluginOptions,
  localePath: string,
): SearchIndex => {
  // The same tokenizer has to be used for the index and the queries, see
  // the `createWordTokenizer` helper
  const tokenize = createWordTokenizer(getLocaleLanguage(app, localePath))

  return createIndex<string, IndexItem, IndexItem>({
    tokenize: (text, fieldName) =>
      fieldName === 'id' ? [text] : tokenize(text),
    ...options.indexOptions,
    ...options.indexLocaleOptions?.[localePath],
    ...INDEX_FIELD_CONFIG,
  })
}

/**
 * Create the SlimSearch index of every locale.
 *
 * 创建各语言环境的 SlimSearch 索引。
 *
 * @param app - VuePress app VuePress 应用实例
 * @param options - Plugin options 插件选项
 * @param store - Path store 路径存储
 * @param indexesByPage - Map to fill with the index ids of each page 用于填充每个页面索引
 *   id 的映射
 * @returns Index store 索引存储
 */
export const getSearchIndexStore = async (
  app: App,
  options: SlimSearchPluginOptions,
  store: PathStore,
  indexesByPage: Map<string, string[]>,
): Promise<SearchIndexStore> => {
  const { indexesByLocale } = collectPageIndex(
    app,
    options,
    store,
    indexesByPage,
  )
  const searchIndex: SearchIndexStore = {}

  await Promise.all(
    entries(indexesByLocale).map(async ([localePath, indexes]) => {
      const index = createLocaleIndex(app, options, localePath)

      await addAllAsync(index, indexes)

      searchIndex[localePath] = index
    }),
  )

  return searchIndex
}
