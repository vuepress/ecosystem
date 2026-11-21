import { hasGlobalComponent } from '@vuepress/helper/client'
import type { ClientConfig } from 'vuepress/client'
import { defineClientConfig } from 'vuepress/client'

import Share from './components/Share.js'

const clientConfig: ClientConfig = defineClientConfig({
  enhance: ({ app }) => {
    if (!hasGlobalComponent('Share', app)) app.component('Share', Share)
  },
})

export default clientConfig
