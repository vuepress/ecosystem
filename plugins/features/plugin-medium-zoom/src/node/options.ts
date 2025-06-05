import type { ZoomOptions } from 'medium-zoom'

/**
 * Options for @vuepress/plugin-medium-zoom
 *
 * @vuepress/plugin-medium-zoom 的配置项
 */
export interface MediumZoomPluginOptions {
  /**
   * Selector of zoomable images
   *
   * 可缩放图片的选择器
   *
   * @default '[vp-content] > img, [vp-content] :not(a) > img'
   */
  selector?: string

  /**
   * Options for medium-zoom
   *
   * medium-zoom 的配置项
   *
   * @see https://github.com/francoischalifour/medium-zoom#options
   */
  zoomOptions?: ZoomOptions
}
