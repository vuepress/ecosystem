import type { ExactLocaleConfig } from '@vuepress/helper/client'
import { h } from 'vue'
import { defineClientConfig } from 'vuepress/client'

import type {
  MeiliSearchLocaleData,
  MeiliSearchOptions,
} from '../shared/index.js'
import { MeiliSearch } from './components/index.js'

import 'meilisearch-docsearch/css/button'
import 'meilisearch-docsearch/css/modal'
import './styles/vars.css'

declare const __ML_SEARCH_OPTIONS__: MeiliSearchOptions
declare const __ML_SEARCH_LOCALES__: ExactLocaleConfig<MeiliSearchLocaleData>

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
