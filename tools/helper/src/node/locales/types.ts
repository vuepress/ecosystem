import type { LocaleData } from 'vuepress/shared'

export type DefaultLocaleInfoItem<T extends LocaleData = LocaleData> = [
  lang: string[],
  data: T,
]

export type DefaultLocaleInfo<T extends LocaleData = LocaleData> =
  DefaultLocaleInfoItem<T>[]
