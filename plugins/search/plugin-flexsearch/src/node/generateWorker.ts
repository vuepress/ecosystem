import { generateSearchWorker } from '@vuepress/search-helper'
import type { App } from 'vuepress/core'

import { encodeIndex } from '../shared/index.js'
import type { SearchIndexStore } from '../shared/index.js'
import type { FlexSearchPluginOptions } from './options.js'
import { WORKER_FILE } from './utils.js'

/**
 * Generate the search worker of the plugin.
 *
 * 生成插件的搜索工作线程。
 *
 * @param app - VuePress app VuePress 应用实例
 * @param options - Plugin options 插件选项
 * @param searchIndexStore - Index store 索引存储
 */
export const generateWorker = async (
  app: App,
  options: FlexSearchPluginOptions,
  searchIndexStore: SearchIndexStore,
): Promise<void> => {
  await generateSearchWorker(app, {
    workerFile: WORKER_FILE,
    outputFile: options.worker ?? 'flexsearch.worker.js',
    indexPlaceholder: '__FLEXSEARCH_INDEX__',
    sortPlaceholder: '__FLEXSEARCH_SORT_STRATEGY__',
    encode: encodeIndex,
    sortStrategy: options.sortStrategy,
    searchIndexStore,
  })
}
