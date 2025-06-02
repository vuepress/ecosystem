/**
 * Options for @vuepress/plugin-google-analytics
 */
export interface GoogleAnalyticsPluginOptions {
  /**
   * Google Analytics 4 Measurement ID
   *
   * @description The Measurement ID starting with 'G-' from Google Analytics 4
   */
  id: string

  /**
   * Enable debug mode
   *
   * @description When enabled, events will be sent to DebugView for testing
   * @default false
   */
  debug?: boolean
}
