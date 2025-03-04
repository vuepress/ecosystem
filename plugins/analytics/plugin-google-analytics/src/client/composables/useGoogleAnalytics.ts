import type { GoogleAnalyticsPluginOptions } from '../../shared/index.js'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

/**
 * Add gtag.js to your site
 *
 * @see https://developers.google.com/analytics/devguides/collection/gtagjs
 * @see https://developers.google.com/analytics/devguides/collection/gtagjs/pages
 * @see https://developers.google.com/analytics/devguides/collection/gtagjs/single-page-applications
 *
 * The enhanced measurement will listen to browser history events (i.e `pushState`, `popState`, and `replaceState`)
 * to collect page_view event, so we do not need to report it manually
 *
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
