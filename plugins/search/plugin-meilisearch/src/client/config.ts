import { h } from 'vue'
import { defineClientConfig } from 'vuepress/client'

import type {
  MeiliSearchDocSearchLocaleOptions,
  MeiliSearchOptions,
} from '../shared/index.js'
import { MeiliSearch } from './components/index.js'

declare const __ML_SEARCH_OPTIONS__: MeiliSearchOptions
declare const __ML_SEARCH_LOCALES__: MeiliSearchDocSearchLocaleOptions

export default defineClientConfig({
  enhance({ app }) {
    app.component('SearchBox', () =>
      h(MeiliSearch, {
        options: __ML_SEARCH_OPTIONS__,
        locales: __ML_SEARCH_LOCALES__,
      }),
    )
  },
})
