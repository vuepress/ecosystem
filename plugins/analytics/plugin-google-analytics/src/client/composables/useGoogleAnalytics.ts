import type { GoogleAnalyticsPluginOptions } from '../../shared/index.js'

/**
 * Initialize Google Analytics 4 tracking
 *
 * 初始化 Google Analytics 4 追踪
 *
 * @param options - Google Analytics plugin options
 *
 * @description Injects gtag.js and configures Google Analytics 4.
 * Enhanced measurement automatically tracks page views and other events.
 * The global `gtag()` function will be available for custom event tracking.
 *
 * 注入 gtag.js 并配置 Google Analytics 4。
 * 增强测量功能会自动追踪页面浏览和其他事件。
 * 全局 `gtag()` 函数可用于自定义事件追踪。
 *
 * @see https://developers.google.com/analytics/devguides/collection/gtagjs
 * @see https://developers.google.com/analytics/devguides/collection/ga4/events
 * @see https://support.google.com/analytics/answer/9216061
 */
export const useGoogleAnalytics = (
  options: GoogleAnalyticsPluginOptions,
): void => {
  if (__VUEPRESS_SSR__) return

  // avoid duplicated import
  if (window.dataLayer && window.gtag) return

  // insert gtag `<script>` tag
  const gtagScript = document.createElement('script')
  gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${options.id}`
  gtagScript.async = true
  document.head.appendChild(gtagScript)

  // insert gtag snippet
  window.dataLayer = window.dataLayer ?? []
  // the gtag function must use `arguments` object to forward parameters
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments)
  }

  window.gtag('js', new Date())

  if (options.debug) {
    window.gtag('config', options.id, { debug_mode: true })
  } else {
    window.gtag('config', options.id)
  }
}
