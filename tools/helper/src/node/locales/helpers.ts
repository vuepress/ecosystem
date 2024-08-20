import type { App } from 'vuepress/core'
import type { LocaleConfig, LocaleData } from 'vuepress/shared'
import type { ExactLocaleConfig } from '../../shared/index.js'
import { deepAssign, fromEntries, keys } from '../../shared/index.js'
import { Logger } from '../utils/index.js'
import { lang2PathConfig, path2langConfig } from './config.js'
import type { KnownLangCode } from './types.js'

/** Get language from path */
export const path2Lang = (path = '', debug = false): KnownLangCode => {
  if (path in path2langConfig) return path2langConfig[path]

  if (debug)
    // eslint-disable-next-line no-console
    console.warn(
      `${path} isn’t assign with a lang, and will return "en-US" instead.`,
    )

  return 'en-US'
}

/** Get path from language */
export const lang2Path = (lang = '', debug = false): string => {
  if (lang in lang2PathConfig) return lang2PathConfig[lang as KnownLangCode]

  if (debug)
    // eslint-disable-next-line no-console
    console.warn(`${lang} has no path config, and will return "/" instead.`)

  return '/'
}

/**
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
 * Get the infer language path from root directory language
 *
 * @param app VuePress Node App
 * @returns infer language
 */
export const getRootLangPath = (app: App): string =>
  lang2Path(getRootLang(app), app.env.isDebug)

/**
 * Get locale paths
 *
 * @param app VuePress Node app
 * @returns locale paths
 */
export const getLocalePaths = (app: App): string[] =>
  Array.from(new Set(keys(app.siteData.locales)))

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
  const rootPath = getRootLangPath(app)
  const logger = new Logger(name)

  return fromEntries([
    ...getLocalePaths(app)
      .filter((localePath) => localePath !== '/')
      .map<[string, T]>((localePath) => {
        const defaultLocaleData =
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          defaultLocalesConfig[localePath] ||
          (lang2Path(app.options.locales[localePath].lang) === '/'
            ? null
            : defaultLocalesConfig[
                lang2Path(app.options.locales[localePath].lang)
              ])

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!defaultLocaleData)
          logger.warn(`Locale ${localePath} is missing it's i18n config`)

        return [
          localePath,
          deepAssign(
            {},
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            defaultLocaleData ?? defaultLocalesConfig[rootPath] ?? {},
            userLocalesConfig[localePath] ?? {},
          ),
        ]
      }),
    [
      '/',
      deepAssign(
        {},
        defaultLocalesConfig[rootPath],
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        userLocalesConfig['/'] ?? userLocalesConfig[rootPath] ?? {},
      ),
    ],
  ])
}
