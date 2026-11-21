import type { LocaleDataValue } from '../../shared/index.js'

/**
 * Default locale info item, a tuple of language codes and their locale data
 *
 * 默认本地化信息项，是语言代码与其本地化数据的元组
 *
 * The locale data type defaults to `LocaleDataValue`, so both plain objects and
 * strings are accepted.
 *
 * 本地化数据的类型默认为 `LocaleDataValue`，因此普通对象和字符串都可以使用。
 */
export type DefaultLocaleInfoItem<
  Locale extends LocaleDataValue = LocaleDataValue,
> = [lang: string[], data: Locale]

/**
 * Default locale info, an array of locale info items
 *
 * 默认本地化信息，是本地化信息项的数组
 *
 * The locale data type defaults to `LocaleDataValue`, so both plain objects and
 * strings are accepted.
 *
 * 本地化数据的类型默认为 `LocaleDataValue`，因此普通对象和字符串都可以使用。
 */
export type DefaultLocaleInfo<
  Locale extends LocaleDataValue = LocaleDataValue,
> = DefaultLocaleInfoItem<Locale>[]

/**
 * User locale config that supports string locale data
 *
 * 支持字符串本地化数据的用户配置
 *
 * A locale path maps to the partial locale data object for object data, and to
 * the full string for string data, since `Partial<T>` is `T` itself when `T` is
 * a string.
 *
 * 当本地化数据为对象时，locale 路径映射到部分本地化数据对象；当本地化数据为字符串时，映射到完整字符串，因为 `T` 为字符串时
 * `Partial<T>` 就是 `T` 本身。
 */
export type LocaleDataConfig<Locale extends LocaleDataValue> = Record<
  string,
  Partial<Locale>
>
