import {
  deepAssign,
  entries,
  fromEntries,
  isArray,
  isPlainObject,
  keys,
} from '@vuepress/helper'
import type { App } from 'vuepress/core'
import { colors } from 'vuepress/utils'
import type { RedirectBehaviorConfig } from '../shared/index.js'
import { logger } from './logger.js'
import type { RedirectPluginOptions } from './types/index.js'

const AVAILABLE_FALLBACK = ['defaultLocale', 'homepage', '404'] as const

export const getRedirectBehaviorConfig = (
  app: App,
  options: RedirectPluginOptions,
): RedirectBehaviorConfig => {
  const { locales } = app.siteData

  const config = deepAssign(
    fromEntries(
      entries(locales)
        .filter(([key, { lang }]) => {
          if (!lang) {
            logger.error(
              `Missing ${colors.magenta(
                'lang',
              )} option for locale "${key}", this locale will be ignored!`,
            )

            return false
          }

          return true
        })
        .map(([key, { lang }]) => [key, [lang!]]),
    ),
    isPlainObject(options.localeConfig)
      ? fromEntries(
          entries(options.localeConfig).map(([routePath, lang]) => [
            routePath,
            isArray(lang) ? lang : [lang],
          ]),
        )
      : {},
  )

  return {
    config,
    autoLocale: options.autoLocale ?? false,
    defaultLocale: options.defaultLocale || keys(config).pop()!,
    localeFallback: options.localeFallback ?? true,
    defaultBehavior:
      options.defaultBehavior &&
      AVAILABLE_FALLBACK.includes(options.defaultBehavior)
        ? options.defaultBehavior
        : 'defaultLocale',
  }
}
