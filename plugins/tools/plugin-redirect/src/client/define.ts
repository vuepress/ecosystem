import { entries } from '@vuepress/helper/client'
import type { RedirectLocaleConfig } from '../shared/index.js'

declare const __REDIRECT_LOCALE_CONFIG__: RedirectLocaleConfig

export const redirectLocaleConfig = __REDIRECT_LOCALE_CONFIG__
// eslint-disable-next-line @typescript-eslint/naming-convention
export const redirectLocaleEntries = entries(redirectLocaleConfig.localeConfig)
