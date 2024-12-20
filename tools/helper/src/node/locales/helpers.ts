/* eslint-disable @typescript-eslint/no-deprecated */
import type { App } from 'vuepress/core'
import type { LocaleConfig, LocaleData } from 'vuepress/shared'
import type { ExactLocaleConfig } from '../../shared/index.js'
import { deepAssign, fromEntries, keys } from '../../shared/index.js'
import { Logger } from '../utils/index.js'
import { lang2PathConfig, path2langConfig } from './config.js'
import type { KnownLangCode } from './types.js'

/**
 * @deprecated
 *
 * Infer language from locale path
 */
export const inferLocaleLang = (
  localePath = '',
  debug = false,
): KnownLangCode => {
  if (localePath in path2langConfig) return path2langConfig[localePath]

  if (debug)
    // eslint-disable-next-line no-console
    console.warn(
      `${localePath} isn’t assign with a lang, and will return "en-US" instead.`,
    )

  return 'en-US'
}

/**
 * @deprecated
 *
 * Infer locale path from language
 */
export const inferLocalePath = (lang = '', debug = false): string => {
  if (lang in lang2PathConfig) return lang2PathConfig[lang as KnownLangCode]

  if (debug)
    // eslint-disable-next-line no-console
    console.warn(`${lang} has no path config, and will return "/" instead.`)

  return '/'
}

/**
 * @deprecated
 *
 * Get language of root directory
 *
 * @param app VuePress Node App
 * @returns root language
 */
export const getRootLang = (app: App): string => {
  // infer from siteLocale
  const siteLocales = app.siteData.locales

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (siteLocales['/']?.lang) return siteLocales['/'].lang

  return app.siteData.lang
}

/**
 * @deprecated
 *
 * Infer locale path from root directory language
 *
 * @param app VuePress Node App
 * @returns inferred locale path of root directory
 */
export const inferRootLocalePath = (app: App): string =>
  inferLocalePath(getRootLang(app), app.env.isDebug)

/**
 * @deprecated
 *
 * Get locale paths
 *
 * @param app VuePress Node app
 * @returns locale paths
 */
export const getLocalePaths = (app: App): string[] =>
  Array.from(new Set(keys(app.siteData.locales)))

/** @deprecated */
export interface LocaleConfigOptions<T extends LocaleData> {
  /** VuePress Node app */
  app: App
  /** Default locale config */
  default: ExactLocaleConfig<T>
  /** user locale config */
  config?: LocaleConfig<T> | undefined
  /** plugin name */
  name?: string
}

/**
 * @deprecated
 *
 * Get final locale config for client
 *
 * @returns final locale config
 */
export const getLocaleConfig = <T extends LocaleData>({
  app,
  name,
  default: defaultLocalesConfig,
  config: userLocalesConfig = {},
}: LocaleConfigOptions<T>): ExactLocaleConfig<T> => {
  const rootLocalePath = inferRootLocalePath(app)
  const logger = new Logger(name)

  const fallbackLocaleData =
    // fallback to the root locale config
    defaultLocalesConfig[rootLocalePath] ??
    // fallback to the first locale config
    Object.values(defaultLocalesConfig).shift()

  return fromEntries([
    ...getLocalePaths(app)
      .filter((localePath) => localePath !== '/')
      .map<[string, T]>((localePath) => {
        const defaultLocaleData =
          (defaultLocalesConfig[localePath] as T | undefined) ??
          (inferLocalePath(app.siteData.locales[localePath].lang) === '/'
            ? null
            : defaultLocalesConfig[
                inferLocalePath(app.siteData.locales[localePath].lang)
              ])

        if (!defaultLocaleData)
          logger.warn(`Locale ${localePath} is missing it's i18n config`)

        return [
          localePath,
          deepAssign(
            {},
            defaultLocaleData ?? fallbackLocaleData,
            userLocalesConfig[localePath] ?? {},
          ),
        ]
      }),
    [
      '/',
      deepAssign(
        {},
        fallbackLocaleData,
        (userLocalesConfig['/'] as T | undefined) ??
          (userLocalesConfig[rootLocalePath] as T | undefined) ??
          {},
      ),
    ],
  ])
}
