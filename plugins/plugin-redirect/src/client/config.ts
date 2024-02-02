import type { ClientConfig } from 'vuepress/client'
import { defineClientConfig } from 'vuepress/client'
import LanguageSwitch from './components/LanguageSwitch.js'
import { setupDevServerRedirect } from './composables/setupDevServerRedirect.js'
import { enableLocaleSwitch } from './define.js'

export default defineClientConfig({
  setup() {
    if (__VUEPRESS_DEV__) setupDevServerRedirect()
  },
  rootComponents: enableLocaleSwitch ? [LanguageSwitch] : [],
}) as ClientConfig
