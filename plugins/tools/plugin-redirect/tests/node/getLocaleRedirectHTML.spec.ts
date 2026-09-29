import { runInNewContext } from 'node:vm'

import { describe, expect, it } from 'vitest'

import { getLocaleRedirectHTML } from '../../src/node/generate/getLocaleRedirectHTML.js'
import type { RedirectBehaviorConfig } from '../../src/shared/index.js'

const config = {
  '/': ['en-US'],
  '/de/': ['de-DE'],
  '/zh/': ['zh-CN'],
}

// only the non-root locales exposing the page reach the generated file
const availableLocales = ['/de/', '/zh/']

const buildHTML = (options: Partial<RedirectBehaviorConfig> = {}): string =>
  getLocaleRedirectHTML(
    {
      autoLocale: true,
      config,
      defaultBehavior: 'defaultLocale',
      defaultLocale: '/',
      localeFallback: true,
      ...options,
    },
    availableLocales,
    '/',
  )

const extractScript = (html: string): string =>
  /<script>(?<code>[\s\S]+?)<\/script>/u.exec(html)!.groups!.code

const redirectTo = (
  html: string,
  languages: string[],
  { pathname = '/page.html', hash = '' } = {},
): string => {
  const location = {
    hash,
    href: '',
    origin: 'https://example.com',
    pathname,
  }

  runInNewContext(extractScript(html), {
    location,
    window: { location, navigator: { languages } },
  })

  return location.href
}

describe('generated locale redirect HTML', () => {
  it('redirects to the page of a matched locale', () => {
    const html = buildHTML()

    expect(redirectTo(html, ['zh-CN'], { hash: '#title' })).toBe(
      'https://example.com/zh/page.html#title',
    )
  })

  it('redirects to the default locale page when it exists', () => {
    const html = buildHTML({ defaultLocale: '/zh/' })

    expect(redirectTo(html, ['fr-FR'])).toBe('https://example.com/zh/page.html')
  })

  it('falls back to the first available locale page when the default locale has no page', () => {
    // the root locale is never part of availableLocales, so a site using the
    // default `defaultLocale: '/'` always falls back
    const html = buildHTML({ defaultLocale: '/' })

    expect(redirectTo(html, ['fr-FR'])).toBe('https://example.com/de/page.html')
  })
})
