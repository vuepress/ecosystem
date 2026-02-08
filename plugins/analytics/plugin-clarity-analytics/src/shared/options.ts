/**
 * Options for `@vuepress/plugin-clarity-analytics`
 *
 * `@vuepress/plugin-clarity-analytics` 插件选项
 */
export interface ClarityOptions {
  /**
   * Clarity project ID
   *
   * Clarity 项目 ID
   *
   * @description The project ID from your Clarity dashboard
   *
   * 从 Clarity 仪表板获取的网站 ID
   */
  id: string

  /**
   * The crossorigin attribute for clarity script.
   *
   * clarity script 的 crossorigin 属性
   *
   * @description provides support for CORS, defining how the element handles cross-origin requests,
   * thereby enabling the configuration of the CORS requests for the element's fetched data.
   *
   * 提供对 CORS 的支持，定义该元素如何处理跨源请求，从而实现对该元素获取数据的 CORS 请求的配置。
   */
  crossOrigin?: '' | 'anonymous' | 'use-credentials'
}
