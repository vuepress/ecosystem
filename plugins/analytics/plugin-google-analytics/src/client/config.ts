import type { ClientConfig } from 'vuepress/client'
import { defineClientConfig } from 'vuepress/client'

import type { GoogleAnalyticsPluginOptions } from '../shared/index.js'
import { useGoogleAnalytics } from './composables/index.js'

declare const __GA_OPTIONS__: GoogleAnalyticsPluginOptions

const options = __GA_OPTIONS__

const clientConfig: ClientConfig = defineClientConfig({
  enhance() {
    useGoogleAnalytics(options)
  },
})

export default clientConfig
