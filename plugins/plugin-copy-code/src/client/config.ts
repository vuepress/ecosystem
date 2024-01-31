import type { ClientConfig } from 'vuepress/client'
import { defineClientConfig } from 'vuepress/client'
import { setupCopyCode } from './composables/index.js'

import './styles/copy-code.css'
import './styles/var.css'

export default defineClientConfig({
  setup: () => {
    setupCopyCode()
  },
}) as ClientConfig
