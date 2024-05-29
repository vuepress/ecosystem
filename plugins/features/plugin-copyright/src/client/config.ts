import type { ClientConfig } from 'vuepress/client'
import { defineClientConfig } from 'vuepress/client'
import { setupCopyright } from './composables/index.js'

export default defineClientConfig({
  setup: () => {
    setupCopyright()
  },
}) as ClientConfig
