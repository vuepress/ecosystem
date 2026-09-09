import type { ClientConfig } from 'vuepress/client'
import { defineClientConfig } from 'vuepress/client'

import type { ClarityOptions } from '../shared/index.js'
import { useClarityAnalytics } from './composables/index.js'

declare const __CLARITY_OPTIONS__: ClarityOptions

const clientConfig: ClientConfig = defineClientConfig({
  setup() {
    if (__VUEPRESS_SSR__) return
    useClarityAnalytics(__CLARITY_OPTIONS__)
  },
})

export default clientConfig
