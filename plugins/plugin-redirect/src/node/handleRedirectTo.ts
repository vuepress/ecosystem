import {
  isLinkAbsolute,
  isLinkHttp,
  removeEndingSlash,
  removeLeadingSlash,
} from '@vuepress/helper'
import type { App } from 'vuepress/core'
import type { RedirectPluginFrontmatterOption } from './frontmatter.js'
import { normalizePath } from './normalizePath.js'
import type { RedirectOptions } from './options.js'

export const handleRedirectTo = (
  app: App,
  { hostname }: RedirectOptions,
): void => {
  const { base } = app.options
  const resolvedHostname = hostname
    ? removeEndingSlash(isLinkHttp(hostname) ? hostname : `https://${hostname}`)
    : ''

  app.pages.forEach(({ frontmatter }) => {
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
  })
}
