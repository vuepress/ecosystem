import { useEventListener } from '@vueuse/core'
import type { ClientConfig } from 'vuepress/client'
import { defineClientConfig } from 'vuepress/client'

import './styles/hint.scss'
import './styles/vars.css'

const clientConfig: ClientConfig = defineClientConfig({
  setup() {
    // Toggle all <details> open before print
    useEventListener(
      'beforeprint',
      () => {
        document.querySelectorAll('details').forEach((detail) => {
          detail.open = true
        })
      },
      { passive: true },
    )
  },
})

export default clientConfig
