import { createSearchClientConfig } from '@vuepress/search-helper/client'

import { store } from '@temp/orama/store.js'

import { customFieldConfig, locales, options } from './define.js'

export default createSearchClientConfig({
  options,
  locales,
  customFieldConfig,
  store,
  devWorker: new URL('worker/dev.js', import.meta.url),
})
