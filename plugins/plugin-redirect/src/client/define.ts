import { entries } from '@vuepress/helper/client'
import type {
  RedirectLocaleConfig,
  RedirectPluginLocaleConfig,
} from '../shared/index.js'

declare const REDIRECT_LOCALE_CONFIG: RedirectLocaleConfig
declare const REDIRECT_LOCALES: RedirectPluginLocaleConfig
declare const REDIRECT_LOCALE_SWITCH: boolean

export const redirectLocaleConfig = REDIRECT_LOCALE_CONFIG
export const redirectLocaleEntries = entries(redirectLocaleConfig.localeConfig)
export const redirectLocales = REDIRECT_LOCALES
export const enableLocaleSwitch = REDIRECT_LOCALE_SWITCH
