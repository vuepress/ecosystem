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
    | 'disableUserPersonalization'
    | 'indices'
    | 'initialQuery'
    | 'maxResultsPerGroup'
    | 'placeholder'
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
  locales?: LocaleConfig<DocSearchLocaleOptions>
}
