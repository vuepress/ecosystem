import { defineClientConfig } from 'vuepress/client'
import { useRtl } from './composables/index.js'

declare const __RTL_LOCALES__: string[]
declare const __RTL_SELECTOR__: Record<string, Record<string, string>>

export default defineClientConfig({
  setup() {
    useRtl(__RTL_LOCALES__, __RTL_SELECTOR__)
  },
})
