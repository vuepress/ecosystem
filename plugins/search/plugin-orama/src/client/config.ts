import type { ClientConfig } from 'vuepress/client'
import { defineClientConfig } from 'vuepress/client'

import SearchBox from './components/SearchBox.js'
import SearchModal from './components/SearchModal.js'
import { injectSearchConfig } from './helpers/index.js'

const clientConfig: ClientConfig = defineClientConfig({
  enhance({ app }) {
    injectSearchConfig(app)
    app.component('SearchBox', SearchBox)
  },
  rootComponents: [SearchModal],
})

export default clientConfig
