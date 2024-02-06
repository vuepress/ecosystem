import type { ClientConfig } from 'vuepress/client'
import { defineClientConfig } from 'vuepress/client'
import type { CopyCodeLocaleConfig } from '../shared/index.js'
import { useCopyCode } from './composables/index.js'

import './styles/copy-code.css'
import './styles/vars.css'

declare const __CC_DELAY__: number
declare const __CC_DURATION__: number
declare const __CC_LOCALES__: CopyCodeLocaleConfig
declare const __CC_SELECTOR__: string[]
declare const __CC_SHOW_IN_MOBILE__: boolean

const delay = __CC_DELAY__
const duration = __CC_DURATION__
const locales = __CC_LOCALES__
const selector = __CC_SELECTOR__
const showInMobile = __CC_SHOW_IN_MOBILE__

export default defineClientConfig({
  setup: () => {
    useCopyCode({
      selector,
      locales,
      duration,
      delay,
      showInMobile,
    })
  },
}) as ClientConfig
