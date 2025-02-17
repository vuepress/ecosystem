import type { LocaleData } from 'vuepress/shared'
import type { lang2PathConfig } from './config.js'

export type DefaultLocaleInfoItem<T extends LocaleData = LocaleData> = [
  lang: string[],
  data: T,
]

export type DefaultLocaleInfo<T extends LocaleData = LocaleData> =
  DefaultLocaleInfoItem<T>[]

/**
 * @deprecated
 *
 * Types for supported lang codes
 */
export type KnownLangCode = keyof typeof lang2PathConfig
