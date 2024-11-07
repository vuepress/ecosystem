import type { App } from 'vuepress/core'
import { fs, path } from 'vuepress/utils'

import type { SearchIndexStore } from '../shared/index.js'
import type { SlimSearchPluginOptions } from './options.js'
import { WORKER_FILE } from './utils.js'

export const generateWorker = async (
  app: App,
  options: SlimSearchPluginOptions,
  searchStore: SearchIndexStore,
): Promise<void> => {
  const workerFilePath = app.dir.dest(options.worker ?? 'slimsearch.worker.js')
  const searchIndexContent = JSON.stringify(searchStore)

  const workerFileContent = await fs.readFile(WORKER_FILE, 'utf8')

  await fs.ensureDir(path.dirname(workerFilePath))
  await fs.writeFile(
    workerFilePath,
    workerFileContent
      .replace('SLIMSEARCH_INDEX', () => JSON.stringify(searchIndexContent))
      .replace(
        'SLIMSEARCH_SORT_STRATEGY',
        JSON.stringify(options.sortStrategy ?? 'max'),
      ),
  )
}
