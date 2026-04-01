import RedirectComponent from '@vuepress/plugin-redirect/component'
import { h } from 'vue'
import type { VNode } from 'vue'
import { defineClientConfig } from 'vuepress/client'

import type { RedirectBehaviorConfig } from '../shared/index.js'
import { setupDevServerRedirect, setupRedirect } from './composables/index.js'
import type { RedirectPluginLocaleConfig } from './types.js'

import './styles/vars.css'

declare const __REDIRECT_COMPONENT__: boolean
declare const __REDIRECT_CONFIG__: RedirectBehaviorConfig
declare const __REDIRECT_LOCALES__: RedirectPluginLocaleConfig
declare const __REDIRECT_DIRECT__: boolean

export const config = __REDIRECT_CONFIG__

export default defineClientConfig({
  setup() {
    if (__REDIRECT_DIRECT__) setupRedirect(config)
    if (__VUEPRESS_DEV__) setupDevServerRedirect(config)
  },
  ...(__REDIRECT_COMPONENT__
    ? {
        rootComponents: [
          (): VNode =>
            h(RedirectComponent, {
              config,
              locales: __REDIRECT_LOCALES__,
            }),
        ],
      }
    : {}),
})
