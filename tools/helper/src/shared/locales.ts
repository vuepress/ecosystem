import type { LocaleData } from 'vuepress/shared'

/**
 * Locale data value
 *
 * Locale data can be a plain object or a string template.
 *
 * 本地化数据值
 *
 * 本地化数据可以是普通对象或字符串模板。
 */
export type LocaleDataValue = LocaleData | string

/**
 * Generate locale config with exact locale data, which can be a plain object or
 * a string
 *
 * 使用精确的本地化数据生成配置，本地化数据可以是普通对象或字符串
 */
export type ExactLocaleConfig<T extends LocaleDataValue = LocaleData> = Record<
  string,
  T
>
