import type { DeepRequired } from '@vuepress/helper/shared'
import type { DocSearchOptions } from 'meilisearch-docsearch'
import type { LocaleConfig } from 'vuepress/shared'

export type MeiliSearchLocaleData = DeepRequired<
  Exclude<DocSearchOptions['translations'], undefined>
>

export type MeiliSearchDocSearchLocaleOptions = Omit<
  DocSearchOptions,
  'container' | 'environment'
>

export interface MeiliSearchOptions extends MeiliSearchDocSearchLocaleOptions {
  locales?: LocaleConfig<MeiliSearchDocSearchLocaleOptions>
}
