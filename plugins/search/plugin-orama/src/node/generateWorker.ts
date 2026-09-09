import { entries, fromEntries } from '@vuepress/helper'
import type { App } from 'vuepress/core'
import { fs, path } from 'vuepress/utils'

import { serializeIndex } from '../shared/index.js'
import type { SearchIndexStore } from '../shared/index.js'
import type { OramaPluginOptions } from './options.js'
import { WORKER_FILE } from './utils.js'

export const generateWorker = async (
  app: App,
  options: OramaPluginOptions,
  searchStore: SearchIndexStore,
): Promise<void> => {
  const workerFilePath = app.dir.dest(options.worker ?? 'orama.worker.js')
  const searchIndexContent = JSON.stringify(
    fromEntries(
      entries(searchStore).map(([locale, index]) => [
        locale,
        serializeIndex(index),
      ]),
    ),
  )

  const workerFileContent = await fs.readFile(WORKER_FILE, 'utf-8')

  await fs.ensureDir(path.dirname(workerFilePath))
  await fs.writeFile(
    workerFilePath,
    workerFileContent
      .replaceAll('__ORAMA_INDEX__', () => JSON.stringify(searchIndexContent))
      .replaceAll(
        '__ORAMA_SORT_STRATEGY__',
        JSON.stringify(options.sortStrategy ?? 'max'),
      ),
  )
}
