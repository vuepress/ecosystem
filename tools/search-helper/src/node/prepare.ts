import { entries, keys } from '@vuepress/helper'
import type { App } from 'vuepress/core'

import type { SearchIndexStore } from '../shared/index.js'
import type { PathStore } from './pathStore.js'
import { getLocaleChunkName } from './utils.js'

/** Options for preparing the temp files of a search index. 准备搜索索引临时文件的选项。 */
export interface PrepareIndexOptions<TIndex> {
  /**
   * Name of the temp directory of the plugin
   *
   * 插件的临时目录名称
   */
  tempDir: string

  /**
   * Encode an index into a string that the client can decode
   *
   * 将索引编码为客户端可以解码的字符串
   *
   * @param index - Live index 实时的索引
   * @returns Encoded index 编码后的索引
   */
  encode: (index: TIndex) => string
}

/**
 * Write the path store of the plugin into a temp file.
 *
 * The path store maps the numeric page id used by the index to the real page
 * path, so that the client can link search results back to their pages.
 *
 * 将插件的路径存储写入临时文件。
 *
 * 路径存储将索引使用的数字页面 id 映射到真实的页面路径，以便客户端能把搜索结果链接回对应页面。
 *
 * @param app - VuePress app VuePress 应用实例
 * @param tempDir - Name of the temp directory 临时目录名称
 * @param store - Path store 路径存储
 */
export const prepareStore = async (
  app: App,
  tempDir: string,
  store: PathStore,
): Promise<void> => {
  await app.writeTemp(
    `${tempDir}/store.js`,
    `\
export const store = ${store.toJSON()}
`,
  )
}

/**
 * Write a locale index into its own temp chunk.
 *
 * 将语言环境索引写入其独立的临时分块。
 *
 * @param app - VuePress app VuePress 应用实例
 * @param options - Prepare options 准备选项
 * @param locale - Path of the locale 语言环境的路径
 * @param index - Index of the locale 该语言环境的索引
 */
export const writeLocaleIndex = async <TIndex>(
  app: App,
  { tempDir, encode }: PrepareIndexOptions<TIndex>,
  locale: string,
  index: TIndex,
): Promise<void> => {
  await app.writeTemp(
    `${tempDir}/${getLocaleChunkName(locale)}.js`,
    `export default ${JSON.stringify(encode(index))}`,
  )
}

/**
 * Write the registry that lazily imports the temp chunk of each locale.
 *
 * 写入懒加载各语言环境临时分块的注册表。
 *
 * @param app - VuePress app VuePress 应用实例
 * @param tempDir - Name of the temp directory 临时目录名称
 * @param locales - Paths of the locales 语言环境的路径
 */
export const writeLocaleRegistry = async (
  app: App,
  tempDir: string,
  locales: string[],
): Promise<void> => {
  await app.writeTemp(
    `${tempDir}/index.js`,
    `export default {${locales
      .map(
        (locale) =>
          `${JSON.stringify(locale)}: () => import('./${getLocaleChunkName(
            locale,
          )}.js')`,
      )
      .join(',')}}`,
  )
}

/**
 * Write the search indexes of every locale as temp chunks.
 *
 * 将所有语言环境的搜索索引写入临时分块。
 *
 * @param app - VuePress app VuePress 应用实例
 * @param options - Prepare options 准备选项
 * @param searchIndexStore - Index store 索引存储
 */
export const prepareSearchIndex = async <TIndex>(
  app: App,
  options: PrepareIndexOptions<TIndex>,
  searchIndexStore: SearchIndexStore<TIndex>,
): Promise<void> => {
  await Promise.all(
    entries(searchIndexStore).map(([locale, index]) =>
      writeLocaleIndex(app, options, locale, index),
    ),
  )

  await writeLocaleRegistry(app, options.tempDir, keys(searchIndexStore))
}

/**
 * Write the worker options into a temp file.
 *
 * 将工作线程选项写入临时文件。
 *
 * @param app - VuePress app VuePress 应用实例
 * @param tempDir - Name of the temp directory 临时目录名称
 * @param sortStrategy - Sort strategy of the results 结果的排序策略
 */
export const prepareWorkerOptions = async (
  app: App,
  tempDir: string,
  sortStrategy: string,
): Promise<void> => {
  await app.writeTemp(
    `${tempDir}/worker-options.js`,
    `\
export const sortStrategy = "${sortStrategy}"
`,
  )
}
