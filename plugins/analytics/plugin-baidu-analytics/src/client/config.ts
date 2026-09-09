import type { ClientConfig } from 'vuepress/client'
import { defineClientConfig } from 'vuepress/client'

import { useBaiduAnalytics } from './composables/index.js'

declare const __BD_ID__: string

const clientConfig: ClientConfig = defineClientConfig({
  setup() {
    useBaiduAnalytics(__BD_ID__)
  },
})

export default clientConfig
