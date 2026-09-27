import type { ClientConfig } from 'vuepress/client'
import { defineClientConfig } from 'vuepress/client'

import { useCopyCode } from './composables/index.js'
import type {
  CopyCodeClientOptions,
  CopyCodePluginLocaleConfig,
} from './types.js'

declare const __CC_OPTIONS__: CopyCodeClientOptions
declare const __CC_LOCALES__: CopyCodePluginLocaleConfig

const clientConfig: ClientConfig = defineClientConfig({
  setup: () => {
    useCopyCode({
      options: __CC_OPTIONS__,
      locales: __CC_LOCALES__,
    })
  },
})

export default clientConfig
