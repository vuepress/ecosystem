/**
 * Options for `@vuepress/plugin-google-analytics`
 *
 * `@vuepress/plugin-google-analytics` 插件选项
 */
export interface GoogleAnalyticsPluginOptions {
  /**
   * Google Analytics 4 Measurement ID
   *
   * Google Analytics 4 测量 ID
   *
   * @description The Measurement ID starting with 'G-' from Google Analytics 4
   */
  id: string

  /**
   * Enable debug mode
   *
   * 启用调试模式
   *
   * @description When enabled, events will be sent to DebugView for testing
   * @default false
   */
  debug?: boolean
}
