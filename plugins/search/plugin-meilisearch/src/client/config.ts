import { defineAsyncComponent, h } from 'vue'
import { defineClientConfig } from 'vuepress/client'
import type { MeiliSearchDocSearchOptions } from '../shared/index.js'

declare const __MM_SEARCH__: MeiliSearchDocSearchOptions

export default defineClientConfig({
  enhance({ app }) {
    app.component(
      'SearchBox',
      defineAsyncComponent(() =>
        import('./components/index.js').then(
          ({ MeiliSearch }) =>
            () =>
              h(MeiliSearch, { options: __MM_SEARCH__ }),
        ),
      ),
    )
  },
})
