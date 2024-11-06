import type docsearch from '@docsearch/js'
import type { LocaleConfig } from 'vuepress/shared'

export type DocSearchProps = typeof docsearch extends (
  options: infer T,
) => unknown
  ? T
  : never

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
