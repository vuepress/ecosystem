import type { ExactLocaleConfig } from '@vuepress/helper/client'
import type {
  SearchClientConfig,
  SearchClientOptions,
  SearchCustomFieldFormatter,
  SearchLocaleData,
} from '@vuepress/search-helper/client'

import { store } from '@temp/flexsearch/store.js'

declare const __FLEXSEARCH_CUSTOM_FIELDS__: Record<
  string,
  SearchCustomFieldFormatter
>
declare const __FLEXSEARCH_OPTIONS__: SearchClientOptions
declare const __FLEXSEARCH_LOCALES__: ExactLocaleConfig<SearchLocaleData>

/** Formatters of the custom fields. 自定义字段的格式化配置。 */
export const customFieldConfig = __FLEXSEARCH_CUSTOM_FIELDS__

/** Options of the search client. 搜索客户端的选项。 */
export const options = __FLEXSEARCH_OPTIONS__

/** Locales of the search box. 搜索框的多语言配置。 */
export const locales = __FLEXSEARCH_LOCALES__

/** Config of the search client. 搜索客户端的配置。 */
export const searchConfig: SearchClientConfig = {
  options,
  locales,
  customFieldConfig,
  store,
}
