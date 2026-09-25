import { fromEntries } from '@vuepress/helper'
import type { App } from 'vuepress/core'
import { fs, path } from 'vuepress/utils'

import type { SearchIndexStore, SearchSortStrategy } from '../shared/index.js'

/** Options for generating the search worker. 生成搜索工作线程的选项。 */
export interface GenerateWorkerOptions<TIndex> {
  /**
   * Path of the worker template file
   *
   * Worker 模板文件的路径
   */
  workerFile: string

  /**
   * Name of the output worker file
   *
   * 输出 Worker 文件的名称
   */
  outputFile: string

  /**
   * Placeholder of the encoded search index in the template
   *
   * 模板中搜索索引的占位符
   */
  indexPlaceholder: string

  /**
   * Placeholder of the sort strategy in the template
   *
   * 模板中排序策略的占位符
   */
  sortPlaceholder: string

  /**
   * Encode an index into a string that the worker can decode
   *
   * 将索引编码为工作线程可以解码的字符串
   *
   * @param index - Live index 实时的索引
   * @returns Encoded index 编码后的索引
   */
  encode: (index: TIndex) => string

  /**
   * Sort strategy of the results
   *
   * 结果的排序策略
   *
   * @default 'max'
   */
  sortStrategy?: SearchSortStrategy

  /** Search index of every locale 所有语言环境的搜索索引 */
  searchIndexStore: SearchIndexStore<TIndex>
}

/**
 * Generate the search worker of the plugin into the output directory.
 *
 * The worker is built as a standalone file that embeds the search index, so it
 * must be generated on the `onGenerated` hook, once every index is built.
 *
 * 将插件的搜索工作线程生成到输出目录。
 *
 * 该工作线程会被构建为内嵌搜索索引的独立文件，因此必须在 `onGenerated` 钩子中、所有索引构建完成后生成。
 *
 * @example
 *   import { generateSearchWorker } from '@vuepress/search-helper'
 *
 *   onGenerated: () =>
 *     generateSearchWorker(app, {
 *       workerFile: WORKER_FILE,
 *       outputFile: options.worker ?? 'orama.worker.js',
 *       indexPlaceholder: '__ORAMA_INDEX__',
 *       sortPlaceholder: '__ORAMA_SORT_STRATEGY__',
 *       encode: encodeIndex,
 *       searchIndexStore: searchIndexStore!,
 *     })
 *
 * @param app - VuePress app VuePress 应用实例
 * @param options - Generate options 生成选项
 */
export const generateSearchWorker = async <TIndex>(
  app: App,
  {
    workerFile,
    outputFile,
    indexPlaceholder,
    sortPlaceholder,
    encode,
    sortStrategy = 'max',
    searchIndexStore,
  }: GenerateWorkerOptions<TIndex>,
): Promise<void> => {
  const workerFilePath = app.dir.dest(outputFile)
  const searchIndexContent = JSON.stringify(
    fromEntries(
      Object.entries(searchIndexStore).map(([locale, index]) => [
        locale,
        encode(index),
      ]),
    ),
  )

  const workerFileContent = await fs.readFile(workerFile, 'utf-8')

  await fs.ensureDir(path.dirname(workerFilePath))
  await fs.writeFile(
    workerFilePath,
    workerFileContent
      .replaceAll(indexPlaceholder, () => JSON.stringify(searchIndexContent))
      .replaceAll(sortPlaceholder, JSON.stringify(sortStrategy)),
  )
}
