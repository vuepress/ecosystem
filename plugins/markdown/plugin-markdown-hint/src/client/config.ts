import { useEventListener } from '@vueuse/core'
import { defineClientConfig } from 'vuepress/client'

import './styles/hint.css'
import './styles/vars.css'

export default defineClientConfig({
  setup() {
    // Toggle all <details> open before print
    useEventListener('beforeprint', () => {
      document.querySelectorAll('details').forEach((detail) => {
        detail.open = true
      })
    })
  },
})
