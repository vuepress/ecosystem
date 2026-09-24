import {
  createSearchClientConfig,
  isCJKLang,
} from '@vuepress/search-helper/client'

import { store } from '@temp/slimsearch/store.js'

import { customFieldConfig, locales, options } from './define.js'

export default createSearchClientConfig({
  options,
  locales,
  customFieldConfig,
  store,
  // SlimSearch matches prefixes, so prefix search is enabled for languages
  // that are not separated by whitespace
  getLocaleSearchOptions: (lang) => ({ prefix: !isCJKLang(lang) }),
  devWorker: new URL('worker/dev.js', import.meta.url),
})
