import { entries } from '@vuepress/helper/client'
import type {
  RedirectLocaleConfig,
  RedirectPluginLocaleConfig,
} from '../shared/index.js'

declare const __REDIRECT_LOCALE_CONFIG__: RedirectLocaleConfig
declare const __REDIRECT_LOCALES__: RedirectPluginLocaleConfig
declare const __REDIRECT_LOCALE_SWITCH__: boolean

export const redirectLocaleConfig = __REDIRECT_LOCALE_CONFIG__
export const redirectLocaleEntries = entries(redirectLocaleConfig.localeConfig)
export const redirectLocales = __REDIRECT_LOCALES__
export const enableLocaleSwitch = __REDIRECT_LOCALE_SWITCH__
