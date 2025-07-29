import { defineClientConfig } from 'vuepress/client'
import type { ClarityOptions } from '../shared/index.js'
import { useClarityAnalytics } from './composables/index.js'

declare const __CLARITY_OPTIONS__: ClarityOptions

export default defineClientConfig({
  setup() {
    if (__VUEPRESS_SSR__) return
    useClarityAnalytics(__CLARITY_OPTIONS__)
  },
})
