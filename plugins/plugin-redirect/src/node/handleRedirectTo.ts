import {
  isLinkAbsolute,
  isLinkHttp,
  removeEndingSlash,
  removeLeadingSlash,
} from '@vuepress/helper'
import type { App, Page } from 'vuepress/core'
import { normalizePath } from '../shared/normalizePath.js'
import type { RedirectPluginFrontmatterOption } from './frontmatter.js'
import type { RedirectOptions } from './options.js'

export const handleRedirectTo = (
  { frontmatter }: Page,
  app: App,
  { hostname }: RedirectOptions,
): void => {
  const { base } = app.options
  const resolvedHostname = hostname
    ? removeEndingSlash(isLinkHttp(hostname) ? hostname : `https://${hostname}`)
    : ''

  const { redirectTo } = frontmatter as RedirectPluginFrontmatterOption

  if (redirectTo) {
    const redirectUrl = normalizePath(
      isLinkAbsolute(redirectTo)
        ? `${resolvedHostname}${base}${removeLeadingSlash(redirectTo)}`
        : redirectTo,
    )

    ;(frontmatter.head ??= []).unshift([
      'script',
      {},
      `{\
const anchor = window.location.hash.substring(1);\
location.href=\`${redirectUrl}\${anchor? \`#\${anchor}\`: ""}\`;\
}`,
    ])
  }
}
