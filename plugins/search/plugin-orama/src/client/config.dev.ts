import { createSearchClientConfig } from '@vuepress/search-helper/client'

import { searchConfig } from './define.js'

export default createSearchClientConfig({
  ...searchConfig,
  createDevWorker: () =>
    new Worker(new URL('worker/dev.js', import.meta.url), { type: 'module' }),
})
