import type { ExactLocaleConfig } from '@vuepress/helper/client'
import { defineClientConfig } from 'vuepress/client'
import { setupCopyright } from './composables/index.js'
import type { CopyrightPluginClientOptions } from './typings.js'
import type { CopyrightPluginLocaleData } from '../shared/index.js'

declare const __COPYRIGHT_OPTIONS__: CopyrightPluginClientOptions

declare const __COPYRIGHT_LOCALES__: ExactLocaleConfig<CopyrightPluginLocaleData>

export default defineClientConfig({
  setup: () => {
    setupCopyright(__COPYRIGHT_OPTIONS__, __COPYRIGHT_LOCALES__)
  },
})
