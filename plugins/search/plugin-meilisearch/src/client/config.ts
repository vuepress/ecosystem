import { h } from 'vue'
import { defineClientConfig } from 'vuepress/client'

import type { MeiliSearchDocSearchOptions } from '../shared/index.js'
import { MeiliSearch } from './components/index.js'

declare const __MM_SEARCH__: MeiliSearchDocSearchOptions

export default defineClientConfig({
  enhance({ app }) {
    app.component('SearchBox', () => h(MeiliSearch, { options: __MM_SEARCH__ }))
  },
})
