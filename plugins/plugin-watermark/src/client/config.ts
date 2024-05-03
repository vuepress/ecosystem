import { defineClientConfig } from 'vuepress/client'
import type { ClientConfig } from 'vuepress/client'
import { setupWatermark } from './composables/watermark.js'

export default defineClientConfig({
  setup() {
    if (__VUEPRESS_SSR__) return
    setupWatermark()
  },
}) as ClientConfig
