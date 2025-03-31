import { defineAsyncComponent } from 'vue'
import { defineClientConfig } from 'vuepress/client'

export default defineClientConfig({
  enhance({ app }) {
    app.component(
      'SearchBox',
      defineAsyncComponent(() => import('./MeiliSearch.vue')),
    )
  },
})
