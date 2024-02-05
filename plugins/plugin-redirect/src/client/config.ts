import type { ClientConfig } from 'vuepress/client'
import { defineClientConfig } from 'vuepress/client'
import LanguageSwitch from './components/LanguageSwitch.js'
import { setupDevServerRedirect } from './composables/setupDevServerRedirect.js'

import './styles/vars.css'

declare const __REDIRECT_LOCALE_SWITCH__: boolean

export default defineClientConfig({
  setup() {
    if (__VUEPRESS_DEV__) setupDevServerRedirect()
  },
  rootComponents: __REDIRECT_LOCALE_SWITCH__ ? [LanguageSwitch] : [],
}) as ClientConfig
