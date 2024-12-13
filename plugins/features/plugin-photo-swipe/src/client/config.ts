import { defineClientConfig } from 'vuepress/client'
import type { PhotoSwipePluginLocaleData } from '../shared/index.js'
import { usePhotoSwipe } from './composables/index.js'
import { injectPhotoSwipeConfig } from './helpers/index.js'

import './styles/vars.css'

declare const __PS_SELECTOR__: string[] | string
declare const __PS_LOCALES__: Record<
  string,
  Record<`${keyof PhotoSwipePluginLocaleData}Title`, string>
>
declare const __PS_DOWNLOAD__: boolean
declare const __PS_FULLSCREEN__: boolean
declare const __PS_SCROLL_TO_CLOSE__: boolean

const selector = __PS_SELECTOR__
const locales = __PS_LOCALES__
const download = __PS_DOWNLOAD__
const fullscreen = __PS_FULLSCREEN__
const scrollToClose = __PS_SCROLL_TO_CLOSE__

export default defineClientConfig({
  enhance: ({ app }) => {
    injectPhotoSwipeConfig(app)
  },
  setup: () => {
    usePhotoSwipe({
      selector,
      locales,
      download,
      fullscreen,
      scrollToClose,
    })
  },
})
