import type { App } from 'vuepress'

import type { ExactLocaleConfig, LocaleDataValue } from '../../shared/index.js'
import { deepAssign, fromEntries, isPlainObject } from '../../shared/index.js'
import { Logger } from '../utils/index.js'
import type { DefaultLocaleInfo, LocaleDataConfig } from './types.js'

/**
 * Get locale info
 *
 * 获取本地化信息
 *
 * @param app - VuePress App / VuePress 应用
 * @param logger - Logger / 日志记录器
 * @returns Array of locale path and language pairs / 本地化路径和语言对的数组
 */
export const getLocaleInfo = (
  app: App,
  logger?: Logger,
): [localePath: string, lang: string][] => {
  const localeEntries = Object.entries(app.options.locales)

  if (localeEntries.length === 0) return [['/', app.options.lang]]

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

export const getLocaleData = <Locale extends LocaleDataValue>(
  info: DefaultLocaleInfo<Locale>,
  lang: string,
  logger?: Logger,
): Locale => {
  const isShortLang = !lang.includes('-')

  // full search
  const localeData = info.find(([langs]) => langs.includes(lang))

  // find exact match
  if (localeData) return localeData[1]

  if (!isShortLang) {
    // find short lang match
    const [shortLang] = lang.split('-')

    const shortLocaleData = info.find(([langs]) => langs.includes(shortLang))

    if (shortLocaleData) return shortLocaleData[1]
  }
  ;(logger ?? console).warn(`${lang} is missing it's i18n config`)

  return (
    // en-US
    (
      info.find(([langs]) => langs.includes('en-US')) ??
      // en
      info.find(([langs]) => langs.some((item) => item.startsWith('en'))) ??
      // first one
      info[0]
    )[1]
  )
}

export interface GetLocaleConfigOption<
  Locale extends LocaleDataValue = LocaleDataValue,
> {
  /** VuePress Node app */
  app: App
  /** Default locale config */
  default: DefaultLocaleInfo<Locale>
  /** User locale config */
  config?: LocaleDataConfig<Locale> | undefined
  /** Plugin name */
  name?: string
}

/**
 * Get final locale config for client
 *
 * 获取客户端的最终本地化配置
 *
 * The locale data can be a plain object or a primitive value such as a string.
 * Plain objects are deeply merged with the user config, while primitive values
 * are used as-is and the user config overrides them when present.
 *
 * 本地化数据可以是普通对象，也可以是字符串等原始值。普通对象会与用户配置深度合并，而原始值会直接使用，存在用户配置时会覆盖它。
 *
 * @param options - Configuration options / 配置选项
 * @returns Final locale config / 最终本地化配置
 */
export const getFullLocaleConfig = <
  Locale extends LocaleDataValue = LocaleDataValue,
>({
  app,
  name,
  default: defaultLocaleData,
  config: userLocalesConfig = {},
}: GetLocaleConfigOption<Locale>): ExactLocaleConfig<
  Locale extends string ? string : Locale
> => {
  const logger = new Logger(name)
  const localeInfo = getLocaleInfo(app, logger)

  return fromEntries(
    localeInfo.map<[string, Locale]>(([localePath, lang]) => {
      const defaultData = getLocaleData(defaultLocaleData, lang, logger)
      const userData = userLocalesConfig[localePath] as
        | Partial<Locale>
        | undefined

      // Deep merging only applies to plain objects. Primitive locale data
      // (e.g. a string template) is used as-is, otherwise `deepAssign` would
      // iterate it and turn it into an object of its characters.
      if (isPlainObject(defaultData) && isPlainObject(userData ?? {})) {
        return [
          localePath,
          deepAssign({}, defaultData, userData ?? {}) as unknown as Locale,
        ]
      }

      return [localePath, (userData ?? defaultData) as Locale]
    }),
  ) as ExactLocaleConfig<Locale extends string ? string : Locale>
}
