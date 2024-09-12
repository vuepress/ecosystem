import type { DocSearchProps } from '@docsearch/react'
import type { LocaleConfig } from 'vuepress/shared'

export type DocSearchLocaleOptions = Partial<
  Pick<
    DocSearchProps,
    | 'apiKey'
    | 'appId'
    | 'disableUserPersonalization'
    | 'indexName'
    | 'initialQuery'
    | 'maxResultsPerGroup'
    | 'placeholder'
    | 'searchParameters'
    | 'translations'
  >
>

export interface DocSearchOptions extends DocSearchLocaleOptions {
  locales?: LocaleConfig<DocSearchLocaleOptions>
}
