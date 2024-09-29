import type { ExactLocaleConfig } from '@vuepress/helper/client'
import { defineClientConfig } from 'vuepress/client'
import type { CopyrightPluginLocaleData } from '../shared/index.js'
import { setupCopyright } from './composables/index.js'
import type { CopyrightPluginClientOptions } from './typings.js'

declare const __COPYRIGHT_OPTIONS__: CopyrightPluginClientOptions

declare const __COPYRIGHT_LOCALES__: ExactLocaleConfig<CopyrightPluginLocaleData>

export default defineClientConfig({
  setup: () => {
    setupCopyright(__COPYRIGHT_OPTIONS__, __COPYRIGHT_LOCALES__)
  },
})
