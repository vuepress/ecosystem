import type { LocaleData } from 'vuepress/shared'

/**
 * Locale data value
 *
 * Locale data can be a plain object, or a primitive value such as a string
 * template.
 *
 * 本地化数据值
 *
 * 本地化数据可以是普通对象，也可以是字符串模板等原始值。
 */
export type LocaleDataValue = LocaleData | string

/**
 * Generate locale config with exact locale data, which can be an object or a
 * primitive value such as a string
 *
 * 使用精确的本地化数据生成配置，本地化数据可以是对象或字符串等原始值
 */
export type ExactLocaleConfig<T = LocaleData> = Record<string, T>
