import { isPlainObject } from '@vuepress/helper'

import type { MediaPluginOptions } from './options.js'
import { isInstalled } from './utils.js'

export const getDefine = ({
  artplayer,
  pdf,
  pdfLocales,
}: MediaPluginOptions): Record<string, unknown> => {
  const result: Record<string, unknown> = {}

  if (artplayer) {
    result.ART_PLAYER_OPTIONS = {
      fullscreen: true,
      playbackRate: true,
      setting: true,
      ...(isPlainObject(artplayer) ? artplayer : {}),
    }
    result.DASHJS_INSTALLED = isInstalled('dashjs')
    result.MPEGTS_JS_INSTALLED = isInstalled('mpegts.js')
    result.HLS_JS_INSTALLED = isInstalled('hls.js')
  }

  if (pdf) {
    result.PDF_OPTIONS = isPlainObject(pdf) ? pdf : {}
    result.PDF_LOCALES = pdfLocales ?? []
  }

  return result
}
