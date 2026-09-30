import type { PwaPluginLocaleConfig } from '../../src/client/types.js'
import { pwaLocaleInfo } from '../../src/node/locales.js'

/**
 * Locale data for the root locale, extracted from the built-in locale table
 *
 * 从内置语言表提取的根语言数据
 */
export const pwaLocales: PwaPluginLocaleConfig = {
  '/': pwaLocaleInfo[0][1],
}
