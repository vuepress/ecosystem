import type { UmamiOptions } from '../../shared/index.js'

declare global {
  interface Window {
    umami: {
      track: {
        (payload?: Record<string, unknown>): void
        (name: string, data?: Record<string, unknown>): void
      }
    }
  }
}

/**
 * Add umami analytics to the site
 *
 * @see https://umami.is/docs/install
 * @see https://umami.is/docs/tracker-functions
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
  script.setAttribute('data-website-id', id)

  if (autoTrack === false) script.setAttribute('data-auto-track', 'false')
  if (cache) script.setAttribute('data-cache', 'true')
  if (domains) script.setAttribute('data-domains', domains.join(','))
  if (hostUrl) script.setAttribute('data-hostUrl', hostUrl)

  document.head.appendChild(script)
}
