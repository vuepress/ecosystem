import type { App } from 'vuepress'
import type { LocaleConfig, LocaleData } from 'vuepress/shared'
import type { ExactLocaleConfig } from '../../shared/index.js'
import { deepAssign, fromEntries } from '../../shared/index.js'
import { Logger } from '../utils/index.js'
import type { DefaultLocaleInfo } from './types.js'

/**
 * Get locale info
 *
 * @param app VuePress App
 * @param logger Logger
 */
export const getLocaleInfo = (
  app: App,
  logger?: Logger,
): [localePath: string, lang: string][] => {
  const localeEntries = Object.entries(app.options.locales)

  if (!localeEntries.length) return [['/', app.options.lang]]

  return localeEntries.map(([path, { lang }]) => {
    if (lang) return [path, lang]

    if (app.options.debug) {
      ;(logger ?? console).warn(
        `Locale ${path} is missing lang config, fallback to root lang ${app.options.lang}`,
      )
    }

    return [path, app.options.lang]
  })
}

export const getLocaleData = <T extends LocaleData>(
  info: DefaultLocaleInfo<T>,
  lang: string,
  logger?: Logger,
): T => {
  const isShortLang = !lang.includes('-')

  // full search
  const localeData = info.find(([langs]) => langs.includes(lang))

  // find exact match
  if (localeData) return localeData[1]

  if (!isShortLang) {
    // find short lang match
    const shortLang = lang.split('-')[0]

    const shortLocaleData = info.find(([langs]) => langs.includes(shortLang))

    if (shortLocaleData) return shortLocaleData[1]
  }

  ;(logger ?? console).warn(`${lang} is missing it's i18n config`)

  return (
    // en-US
    (info.find(([langs]) => langs.includes('en-US')) ??
      // en
      info.find(([langs]) => langs.some((item) => item.startsWith('en'))) ??
      // first one
      info[0])[1]
  )
}

export interface GetLocaleConfigOption<T extends LocaleData> {
  /** VuePress Node app */
  app: App
  /** Default locale config */
  default: DefaultLocaleInfo<T>
  /** user locale config */
  config?: LocaleConfig<T> | undefined
  /** plugin name */
  name?: string
}

/**
 *
 * Get final locale config for client
 *
 * @returns final locale config
 */
export const getFullLocaleConfig = <T extends LocaleData>({
  app,
  name,
  default: defaultLocaleData,
  config: userLocalesConfig = {},
}: GetLocaleConfigOption<T>): ExactLocaleConfig<T> => {
  const logger = new Logger(name)
  const localeInfo = getLocaleInfo(app, logger)

  return fromEntries(
    localeInfo.map<[string, T]>(([localePath, lang]) => [
      localePath,
      deepAssign(
        {},
        getLocaleData(defaultLocaleData, lang, logger),
        (userLocalesConfig[localePath] ?? {}) as T,
      ),
    ]),
  )
}
