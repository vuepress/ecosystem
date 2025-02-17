import type { LocaleConfig } from 'vuepress/shared'
import type { PhotoSwipePluginLocaleData } from '../shared/index.js'

export interface PhotoSwipePluginOptions {
  /**
   * Image selector
   *
   * 图片选择器
   *
   * @default "[vp-content] :not(a) > img:not([no-view])"
   */
  selector?: string[] | string

  /**
   * Whether to enable the download button
   *
   * 是否启用下载按钮
   *
   * @default true
   */
  download?: boolean

  /**
   * Whether to enable the fullscreen button
   *
   * 是否启用全屏按钮
   *
   * @default true
   */
  fullscreen?: boolean

  /**
   * Whether close the current image when scrolling.
   *
   * 是否在滚动时关闭当前图片。
   *
   * @default true
   */
  scrollToClose?: boolean

  /**
   * Locale config
   *
   * 国际化配置
   */
  locales?: LocaleConfig<PhotoSwipePluginLocaleData>
}
