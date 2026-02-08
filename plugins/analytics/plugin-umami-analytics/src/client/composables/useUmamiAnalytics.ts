import type { UmamiOptions } from '../../shared/index.js'
// oxlint-disable-next-line import/no-unassigned-import
import './declare.js'

/**
 * Initialize Umami Analytics tracking
 *
 * 初始化 Umami Analytics 追踪
 *
 * @param options - Umami Analytics options
 *
 * @description Injects Umami tracking script and configures tracking behavior.
 * The global `umami.track()` function will be available for custom event tracking.
 *
 * 注入 Umami 追踪脚本并配置追踪行为。
 * 全局 `umami.track()` 函数可用于自定义事件追踪。
 *
 * @see https://umami.is/docs/tracker-functions
 * @see https://umami.is/docs/tracker-configuration
 */
export const useUmamiAnalytics = ({
  link = 'https://us.umami.is/script.js',
  id,
  domains,
  autoTrack,
  cache,
  hostUrl,
}: UmamiOptions): void => {
  // avoid duplicated import
  if ('umami' in window) return

  const script = document.createElement('script')
  script.src = link!
  script.async = true
  script.dataset.websiteId = id

  if (autoTrack === false) script.dataset.autoTrack = 'false'
  if (cache) script.dataset.cache = 'true'
  if (domains) script.dataset.domains = domains.join(',')
  if (hostUrl) script.dataset.hostUrl = hostUrl

  document.head.append(script)
}
