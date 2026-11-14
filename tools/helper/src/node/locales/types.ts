import type { LocaleData } from 'vuepress/shared'

import type { LocaleDataValue } from '../../shared/index.js'

export type DefaultLocaleInfoItem<Locale extends LocaleDataValue = LocaleData> =
  [lang: string[], data: Locale]

export type DefaultLocaleInfo<Locale extends LocaleDataValue = LocaleData> =
  DefaultLocaleInfoItem<Locale>[]

/**
 * User locale config that supports primitive locale data
 *
 * 支持原始本地化数据的用户配置
 *
 * The value of a locale path is a partial locale data object for object data,
 * and the full locale data value for primitive data.
 *
 * 当本地化数据为对象时，locale 路径的值是部分本地化数据对象；当本地化数据为原始值时，locale 路径的值是完整的本地化数据值。
 */
export type LocaleDataConfig<Locale extends LocaleDataValue> = [
  Locale,
] extends [string]
  ? Record<string, string>
  : Record<string, Partial<Locale>>
