/**
 * Extra page data used by the share plugin
 *
 * 分享插件使用的额外页面数据
 */
export interface SharePageData extends Record<string, unknown> {
  /**
   * Cover of the page
   *
   * 页面封面
   */
  cover?: string

  /**
   * Summary of the page
   *
   * 页面综述
   */
  summary?: string

  /**
   * Excerpt of the page
   *
   * 页面摘要
   */
  excerpt?: string
}
