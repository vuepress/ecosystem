import type { LocaleData } from 'vuepress/shared'

export type DefaultLocaleInfoItem<Locale extends LocaleData = LocaleData> = [
  lang: string[],
  data: Locale,
]

export type DefaultLocaleInfo<Locale extends LocaleData = LocaleData> =
  DefaultLocaleInfoItem<Locale>[]
