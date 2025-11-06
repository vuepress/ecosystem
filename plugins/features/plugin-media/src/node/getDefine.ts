import { getFullLocaleConfig } from '@vuepress/helper'
import type { App } from 'vuepress/core'

import { vidstackLocaleInfo } from './locales/index.js'
import type { MediaPluginOptions } from './options.js'
import { isInstalled } from './utils.js'

export const getDefine =
  (options: MediaPluginOptions): ((app: App) => Record<string, unknown>) =>
  (app) => {
    const result: Record<string, unknown> = {}

    if (options.artplayer || options.vidstack) {
      result.DASHJS_INSTALLED = isInstalled('dashjs')
      result.HLS_JS_INSTALLED = isInstalled('hls.js')
    }

    if (options.artplayer) {
      result.ART_PLAYER_OPTIONS = {
        fullscreen: true,
        playbackRate: true,
        setting: true,
        ...componentOptions.artPlayer,
      }
      result.MPEGTS_JS_INSTALLED = isInstalled('mpegts.js')
    }

    if (options.pdf) {
      result.PDF_LOCALES = getFullLocaleConfig({
        app,
        name: 'pdf',
        default: pdfLocaleInfo,
        config: locales.pdf,
      })
      result.PDFJS_URL =
        typeof componentOptions.pdf?.pdfjs === 'string'
          ? componentOptions.pdf.pdfjs
          : componentOptions.pdf?.pdfjs === false
            ? null
            : 'https://theme-hope-assets.vuejs.press/pdfjs/'
    }

    if (options.vidstack)
      result.VIDSTACK_LOCALES = getFullLocaleConfig({
        app,
        name: 'vidstack',
        default: vidstackLocaleInfo,
        config: locales.vidstack,
      })

    return result
  }
