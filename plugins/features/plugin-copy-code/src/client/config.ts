import { defineClientConfig } from 'vuepress/client'
import { useCopyCode } from './composables/index.js'
import type { CopyCodePluginLocaleConfig } from './types.js'

declare const __CC_DELAY__: number
declare const __CC_DURATION__: number
declare const __CC_LOCALES__: CopyCodePluginLocaleConfig
declare const __CC_SELECTOR__: string[]
declare const __CC_IGNORE_SELECTOR__: string[]
declare const __CC_SHOW_IN_MOBILE__: boolean

export default defineClientConfig({
  setup: () => {
    useCopyCode({
      selector: __CC_SELECTOR__,
      ignoreSelector: __CC_IGNORE_SELECTOR__,
      locales: __CC_LOCALES__,
      duration: __CC_DURATION__,
      delay: __CC_DELAY__,
      showInMobile: __CC_SHOW_IN_MOBILE__,
    })
  },
})
