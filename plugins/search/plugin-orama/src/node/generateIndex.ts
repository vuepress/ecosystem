import { insertMultiple } from '@orama/orama'
import { entries } from '@vuepress/helper'
import { collectPageIndex, getLocaleLanguage } from '@vuepress/search-helper'
import type { PathStore } from '@vuepress/search-helper'
import type { App } from 'vuepress/core'

import { createIndex, preloadTokenizers } from '../shared/index.js'
import type { SearchIndex, SearchIndexStore } from '../shared/index.js'
import type { OramaPluginOptions } from './options.js'
import { getStopWords } from './stopwords.js'

/**
 * Create the index of a locale.
 *
 * The tokenizer of the locale language is resolved first: the official
 * `@orama/tokenizers` tokenizers are loaded lazily, and the stop-words of the
 * language are embedded into the index.
 *
 * 创建某个语言环境的索引。
 *
 * 会先解析该语言环境的语言对应的分词器：官方的 `@orama/tokenizers` 分词器是懒加载的，且语言的停用词会被内嵌到索引中。
 *
 * @param app - VuePress app VuePress 应用实例
 * @param options - Plugin options 插件选项
 * @param localePath - Path of the locale 语言环境的路径
 * @returns Orama index Orama 索引
 */
export const createLocaleIndex = async (
  app: App,
  options: OramaPluginOptions,
  localePath: string,
): Promise<SearchIndex> => {
  const language = getLocaleLanguage(app, localePath)

  await preloadTokenizers([language])

  return createIndex(language, null, {
    tokenizer:
      options.indexLocaleOptions?.[localePath]?.tokenizer ??
      options.indexOptions?.tokenizer,
    stopWords: await getStopWords(language),
  })
}

/**
 * Create the Orama index of every locale.
 *
 * 创建各语言环境的 Orama 索引。
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
  options: OramaPluginOptions,
  store: PathStore,
  indexesByPage: Map<string, string[]>,
): Promise<SearchIndexStore> => {
  const { customFields, filter, indexContent, preserveTags } = options
  const { indexesByLocale } = collectPageIndex(
    app,
    { customFields, filter, indexContent, preserveTags },
    store,
    indexesByPage,
  )
  const searchIndex: SearchIndexStore = {}
  const locales = entries(indexesByLocale)

  // The official tokenizers are loaded lazily, so they have to be loaded before
  // the indexes are created
  await preloadTokenizers(
    locales.map(([localePath]) => getLocaleLanguage(app, localePath)),
  )

  await Promise.all(
    locales.map(async ([localePath, indexes]) => {
      const index = await createLocaleIndex(app, options, localePath)

      await insertMultiple(index, indexes)

      searchIndex[localePath] = index
    }),
  )

  return searchIndex
}
