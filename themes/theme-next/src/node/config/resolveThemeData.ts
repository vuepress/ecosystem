import { entries, fromEntries, getFullLocaleConfig } from '@vuepress/helper'
import type { App } from 'vuepress'
import type {
  DefaultThemeLocaleData,
  DefaultThemeLocaleOptions,
} from '../../shared/index.js'
import { LOCALES_OPTIONS } from '../locales/index.js'
import { THEME_NAME } from '../utils/index.js'

const EXCLUDE_LIST = ['locales', 'container']

const FALLBACK_OPTIONS: DefaultThemeLocaleData = {
  appearance: true,
  // outline
  outline: [2, 3],
  aside: true,
  scrollOffset: 134,
  editLink: true,
  lastUpdated: true,
  contributors: true,
  externalLinkIcon: true,
}

const resolveOptions = (
  options: DefaultThemeLocaleData,
): DefaultThemeLocaleData =>
  fromEntries(entries(options).filter(([key]) => !EXCLUDE_LIST.includes(key)))

export const resolveThemeData = (
  app: App,
  options: DefaultThemeLocaleOptions,
): DefaultThemeLocaleOptions => {
  const resolved = resolveOptions(options)

  const themeData: DefaultThemeLocaleOptions = {
    ...FALLBACK_OPTIONS,
    ...resolved,
    locales: getFullLocaleConfig({
      app,
      name: THEME_NAME,
      default: LOCALES_OPTIONS,
      config: fromEntries(
        entries<DefaultThemeLocaleOptions>({
          '/': {},
          ...options.locales,
        }).map(([locale, opt]) => [
          locale,
          { ...resolved, ...resolveOptions(opt) },
        ]),
      ),
    }),
  }

  return themeData
}
