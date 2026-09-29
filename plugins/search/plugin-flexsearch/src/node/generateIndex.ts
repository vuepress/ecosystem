import { entries, fromEntries } from '@vuepress/helper'
import { collectPageIndex, getLocaleLanguage } from '@vuepress/search-helper'
import type { PathStore } from '@vuepress/search-helper'
import type { App } from 'vuepress/core'

import { createIndex } from '../shared/index.js'
import type { SearchIndex, SearchIndexStore } from '../shared/index.js'
import type { FlexSearchPluginOptions } from './options.js'

/**
 * Create the index of a locale.
 *
 * 创建某个语言环境的索引。
 *
 * @param app - VuePress app VuePress 应用实例
 * @param options - Plugin options 插件选项
 * @param localePath - Path of the locale 语言环境的路径
 * @returns FlexSearch index FlexSearch 索引
 */
export const createLocaleIndex = (
  app: App,
  options: FlexSearchPluginOptions,
  localePath: string,
): SearchIndex =>
  createIndex(getLocaleLanguage(app, localePath), null, {
    ...options.indexOptions,
    ...options.indexLocaleOptions?.[localePath],
  })

/**
 * Create the FlexSearch index of every locale.
 *
 * 创建各语言环境的 FlexSearch 索引。
 *
 * @param app - VuePress app VuePress 应用实例
 * @param options - Plugin options 插件选项
 * @param store - Path store 路径存储
 * @param indexesByPage - Map to fill with the index ids of each page 用于填充每个页面索引
 *   id 的映射
 * @returns Index store 索引存储
 */
export const getSearchIndexStore = (
  app: App,
  options: FlexSearchPluginOptions,
  store: PathStore,
  indexesByPage: Map<string, string[]>,
): SearchIndexStore => {
  const { customFields, filter, indexContent, preserveTags } = options
  const { indexesByLocale } = collectPageIndex(
    app,
    { customFields, filter, indexContent, preserveTags },
    store,
    indexesByPage,
  )

  return fromEntries(
    entries(indexesByLocale).map(([localePath, indexes]) => {
      const index = createLocaleIndex(app, options, localePath)

      // The index items are spread into fresh documents, so that FlexSearch
      // does not keep a reference to the objects of the page index
      for (const item of indexes) index.add({ ...item })

      return [localePath, index]
    }),
  )
}
