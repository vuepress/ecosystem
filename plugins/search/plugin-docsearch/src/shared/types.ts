import type { DocSearchProps } from '@docsearch/react'
import type { LocaleConfig } from 'vuepress/shared'

export type DocsearchLocaleOptions = Partial<
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

export interface DocsearchOptions extends DocsearchLocaleOptions {
  locales?: LocaleConfig<DocsearchLocaleOptions>
}
