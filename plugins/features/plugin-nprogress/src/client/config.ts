import type { ClientConfig } from 'vuepress/client'
import { defineClientConfig } from 'vuepress/client'
import { useNprogress } from './composables/index.js'

export default defineClientConfig({
  setup() {
    useNprogress()
  },
}) as ClientConfig
