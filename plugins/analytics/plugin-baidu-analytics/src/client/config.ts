import { defineClientConfig } from 'vuepress/client'
import { useBaiduAnalytics } from './composables/index.js'

declare const __BD_ID__: string

export default defineClientConfig({
  setup() {
    useBaiduAnalytics(__BD_ID__)
  },
})
