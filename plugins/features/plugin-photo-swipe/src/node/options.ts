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
  selector?: string | string[]

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
   * The delay of photo-swipe fetching page images, in ms
   *
   * If the theme you are using has a switching animation, it is recommended to configure this option to `Switch animation duration + 200`
   *
   * photo-swipe 抓取页面图片的延时，单位 ms
   *
   * 如果你使用的主题有切换动画，建议配置此选项为 `切换动画时长 + 200`
   *
   * @default 800
   */
  delay?: number

  /**
   * Locale config
   *
   * 国际化配置
   */
  locales?: LocaleConfig<PhotoSwipePluginLocaleData>
}
