/**
 * Options for @vuepress/plugin-umami-analytics
 *
 * @vuepress/plugin-umami-analytics 插件选项
 */
export interface UmamiOptions {
  /**
   * Umami Analytics website ID
   *
   * Umami Analytics 网站 ID
   *
   * @description The website ID from your Umami Analytics dashboard
   *
   * 从 Umami Analytics 仪表板获取的网站 ID
   */
  id: string

  /**
   * Umami Analytics script URL
   *
   * Umami Analytics 脚本链接
   *
   * @description URL to the Umami tracking script
   *
   * Umami 追踪脚本的 URL
   *
   * @default 'https://us.umami.is/script.js'
   */
  link?: string

  /**
   * Enable automatic tracking
   *
   * 启用自动追踪
   *
   * @description When enabled, Umami automatically tracks pageviews and events.
   * Set to `false` to use manual tracking with tracker functions.
   *
   * 启用时，Umami 会自动追踪页面浏览和事件。
   * 设为 `false` 可使用手动追踪功能。
   *
   * @default true
   */
  autoTrack?: boolean

  /**
   * Enable data caching
   *
   * 启用数据缓存
   *
   * @description Cache data to improve tracking script performance.
   * Uses session storage and may require user notification.
   *
   * 缓存数据以提高追踪脚本性能。
   * 使用会话存储，可能需要通知用户。
   *
   * @default false
   */
  cache?: boolean

  /**
   * Restrict tracking to specific domains
   *
   * 限制追踪到特定域名
   *
   * @description Array of domains where tracking should be active
   *
   * 限制追踪活跃的域名数组
   */
  domains?: string[]

  /**
   * Data collection endpoint
   *
   * 数据收集端点
   *
   * @description Custom URL for sending tracking data
   *
   * 发送追踪数据的自定义 URL
   *
   * @default link
   */
  hostUrl?: string
}
