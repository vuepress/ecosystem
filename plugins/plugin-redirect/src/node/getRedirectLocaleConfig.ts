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
import type { RedirectLocaleConfig } from '../shared/index.js'
import { logger } from './logger.js'
import type { RedirectOptions } from './options.js'

const AVAILABLE_FALLBACK = ['defaultLocale', 'homepage', '404'] as const

export const getRedirectLocaleConfig = (
  app: App,
  options: RedirectOptions,
): RedirectLocaleConfig => {
  const { locales } = app.options

  const localeConfig = deepAssign(
    fromEntries(
      entries(locales)
        .filter(([key, { lang }]) => {
          if (key === '/') return false

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
      ? entries(options.localeConfig).map(([routePath, lang]) => [
          routePath,
          isArray(lang) ? lang : [lang],
        ])
      : {},
  )
  const defaultLocale = options.defaultLocale || keys(localeConfig).pop()!

  return {
    autoLocale: options.autoLocale ?? false,
    switchLocale: options.switchLocale ?? false,
    localeConfig,
    defaultLocale,
    localeFallback: options.localeFallback ?? true,
    defaultBehavior:
      options.defaultBehavior &&
      AVAILABLE_FALLBACK.includes(options.defaultBehavior)
        ? options.defaultBehavior
        : 'defaultLocale',
  }
}
