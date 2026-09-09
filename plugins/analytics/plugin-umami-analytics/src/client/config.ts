import type { ClientConfig } from 'vuepress/client'
import { defineClientConfig } from 'vuepress/client'

import type { UmamiOptions } from '../shared/index.js'
import { useUmamiAnalytics } from './composables/index.js'

declare const __UMM_OPTIONS__: UmamiOptions

const clientConfig: ClientConfig = defineClientConfig({
  setup() {
    if (__VUEPRESS_SSR__) return
    useUmamiAnalytics(__UMM_OPTIONS__)
  },
})

export default clientConfig
