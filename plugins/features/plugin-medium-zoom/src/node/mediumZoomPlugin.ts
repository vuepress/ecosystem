import type { ZoomOptions } from 'medium-zoom'
import type { Plugin } from 'vuepress/core'
import { getDirname, path } from 'vuepress/utils'

const __dirname = import.meta.dirname || getDirname(import.meta.url)

/**
 * Options for @vuepress/plugin-medium-zoom
 */
export interface MediumZoomPluginOptions {
  /**
   * Selector of zoomable images
   *
   * @default '[vp-content] > img, [vp-content] :not(a) > img'
   */
  selector?: string

  /**
   * Delay in milliseconds
   *
   * @default 500
   */
  delay?: number

  /**
   * Options for medium-zoom
   *
   * @see https://github.com/francoischalifour/medium-zoom#options
   */
  zoomOptions?: ZoomOptions
}

export const mediumZoomPlugin = ({
  selector = '[vp-content] > img, [vp-content] :not(a) > img',
  zoomOptions = {},
  delay = 500,
}: MediumZoomPluginOptions = {}): Plugin => ({
  name: '@vuepress/plugin-medium-zoom',

  clientConfigFile: path.resolve(__dirname, '../client/config.js'),

  define: {
    __MZ_SELECTOR__: selector,
    __MZ_ZOOM_OPTIONS__: zoomOptions,
    __MZ_DELAY__: delay,
  },
})
