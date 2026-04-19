import type { DocSearchProps } from '@docsearch/js'
import type { LocaleConfig } from 'vuepress/shared'

/**
 * DocSearch locale options
 *
 * DocSearch 多语言选项
 */
export type DocSearchLocaleOptions = Partial<
  Pick<
    DocSearchProps,
    | 'apiKey'
    | 'appId'
    | 'askAi'
    | 'disableUserPersonalization'
    /** @deprecated use `indices` instead */
    | 'indexName'
    | 'indices'
    | 'initialQuery'
    | 'maxResultsPerGroup'
    | 'placeholder'
    /** @deprecated use `indices` instead */
    | 'searchParameters'
    | 'translations'
  >
>

/**
 * DocSearch options
 *
 * DocSearch 选项
 */
export interface DocSearchOptions extends DocSearchLocaleOptions {
  /**
   * Locale options
   *
   * 多语言选项
   */
  // FIXME: https://github.com/oxc-project/tsgolint/issues/861
  locales?: LocaleConfig<DocSearchLocaleOptions>
}
