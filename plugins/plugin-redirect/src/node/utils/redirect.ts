import {
  entries,
  fromEntries,
  isArray,
  isFunction,
  isLinkAbsolute,
  isLinkHttp,
  isPlainObject,
  removeEndingSlash,
  removeLeadingSlash,
} from '@vuepress/helper'
import type { App, Page } from 'vuepress/core'
import type { RedirectPluginFrontmatterOption } from '../frontmatter.js'
import type { RedirectOptions } from '../options.js'
import { normalizePath } from './normalizePath.js'

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

export const getRedirectMap = (
  app: App,
  options: RedirectOptions,
): Record<string, string> => {
  const config = isFunction(options.config)
    ? options.config(app)
    : isPlainObject(options.config)
      ? options.config
      : {}

  return {
    ...fromEntries(
      (
        app.pages as Page<
          Record<string, never>,
          RedirectPluginFrontmatterOption
        >[]
      )
        .map<[string, string][]>(({ frontmatter, path }) =>
          isArray(frontmatter.redirectFrom)
            ? frontmatter.redirectFrom.map((from) => [
                normalizePath(from),
                path,
              ])
            : frontmatter.redirectFrom
              ? [[normalizePath(frontmatter.redirectFrom), path]]
              : [],
        )
        .flat(),
    ),
    ...fromEntries(
      entries(config).map(([from, to]) => [
        normalizePath(from),
        normalizePath(to),
      ]),
    ),
  }
}
