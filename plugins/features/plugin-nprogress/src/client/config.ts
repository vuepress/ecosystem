import type { ClientConfig } from 'vuepress/client'
import { defineClientConfig } from 'vuepress/client'

import { useNprogress } from './composables/index.js'

const clientConfig: ClientConfig = defineClientConfig({
  setup() {
    useNprogress()
  },
})

export default clientConfig
