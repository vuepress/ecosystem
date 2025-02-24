import type { ZoomOptions } from 'medium-zoom'

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
   * Options for medium-zoom
   *
   * @see https://github.com/francoischalifour/medium-zoom#options
   */
  zoomOptions?: ZoomOptions
}
