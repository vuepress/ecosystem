import { isLinkAbsolute, removeLeadingSlash } from '@vuepress/helper'
import type { App, Page } from 'vuepress/core'
import { normalizePath } from '../shared/normalizePath.js'
import type { RedirectPluginFrontmatter } from './types/index.js'

export const handleRedirectTo = ({ frontmatter }: Page, app: App): void => {
  const { base } = app.siteData
  const { redirectTo } = frontmatter as RedirectPluginFrontmatter

  if (redirectTo) {
    const redirectUrl = normalizePath(
      isLinkAbsolute(redirectTo)
        ? `${base}${removeLeadingSlash(redirectTo)}`
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
