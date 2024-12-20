import { isFunction, isString } from '@vuepress/helper'
import type { App } from 'vuepress/core'
import { removeEndingSlash } from 'vuepress/shared'
import type { ExtendPage } from '../../typings/index.js'
import type { SeoPluginOptions } from '../options.js'
import { getAlternatePaths } from './getAlternatePaths.js'
import { getUrl } from './getUrl.js'

export const getCanonicalLink = (
  page: ExtendPage,
  canonical: SeoPluginOptions['canonical'],
): string | null =>
  isFunction(canonical)
    ? canonical(page)
    : isString(canonical)
      ? `${removeEndingSlash(canonical)}${page.path}`
      : null

export const getAlternateLinks = (
  app: App,
  page: ExtendPage,
  hostname: string,
): { lang: string; path: string }[] =>
  getAlternatePaths(page, app).map(({ lang, path }) => ({
    lang,
    path: getUrl(hostname, app.siteData.base, path),
  }))
