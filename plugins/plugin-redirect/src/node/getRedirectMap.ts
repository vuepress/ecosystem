import {
  entries,
  fromEntries,
  isArray,
  isFunction,
  isPlainObject,
} from '@vuepress/helper'
import type { App, Page } from 'vuepress/core'
import type { RedirectPluginFrontmatterOption } from './frontmatter.js'
import { normalizePath } from './normalizePath.js'
import type { RedirectOptions } from './options.js'

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
    ...fromEntries(entries(config).map((item) => item.map(normalizePath))),
  }
}
