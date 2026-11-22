import { useSiteData, withBase } from 'vuepress/client'

import { CLEAN_URLS } from '../../composables/useRuntimeBase.js'
import { isExternal, isRelativeBase, treatAsHtml } from '../shared.js'

export function throttleAndDebounce(fn: () => void, delay: number): () => void {
  let timeoutId: number
  let called = false

  return () => {
    if (timeoutId) clearTimeout(timeoutId)

    if (!called) {
      fn()
      ;(called = true) && window.setTimeout(() => (called = false), delay)
    } else timeoutId = window.setTimeout(fn, delay)
  }
}

export function ensureStartingSlash(path: string): string {
  return path.startsWith('/') ? path : `/${path}`
}

export function isLinkExternal(
  href?: string,
  target?: string,
  external?: boolean,
): boolean {
  if (external !== undefined) {
    return external
  }

  return (!!href && isExternal(href)) || target === '_blank'
}

export function normalizeLink(url: string): string {
  const { pathname, search, hash, protocol } = new URL(url, 'http://a.com')

  if (
    isExternal(url) ||
    url.startsWith('#') ||
    !protocol.startsWith('http') ||
    !treatAsHtml(pathname)
  )
    return url

  const site = useSiteData()

  let normalizedPath =
    pathname.endsWith('/') || pathname.endsWith('.html')
      ? url
      : url.replace(
          /(?:(^\.+)\/)?.*$/,
          `$1${pathname.replace(
            /(\.md)?$/,
            CLEAN_URLS ? '' : '.html',
          )}${search}${hash}`,
        )

  if (isRelativeBase(site.value.base) && !CLEAN_URLS) {
    const pathPart = normalizedPath.replace(/[?#].*$/, '')
    if (pathPart.endsWith('/')) {
      normalizedPath =
        pathPart + 'index.html' + normalizedPath.slice(pathPart.length)
    }
  }

  return withBase(normalizedPath)
}

export function uniqBy<T>(array: T[], keyFn: (item: T) => any): T[] {
  const seen = new Set()
  return array.filter((item) => {
    const k = keyFn(item)
    return seen.has(k) ? false : seen.add(k)
  })
}
