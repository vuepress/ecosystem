import type { ExactLocaleConfig } from '@vuepress/helper/client'
import type {
  SearchClientOptions,
  SearchCustomFieldFormatter,
  SearchLocaleData,
} from '@vuepress/search-helper/client'

declare const __ORAMA_CUSTOM_FIELDS__: Record<
  string,
  SearchCustomFieldFormatter
>
declare const __ORAMA_OPTIONS__: SearchClientOptions
declare const __ORAMA_LOCALES__: ExactLocaleConfig<SearchLocaleData>

/** Formatters of the custom fields. 自定义字段的格式化配置。 */
export const customFieldConfig = __ORAMA_CUSTOM_FIELDS__

/** Options of the search client. 搜索客户端的选项。 */
export const options = __ORAMA_OPTIONS__

/** Locales of the search box. 搜索框的多语言配置。 */
export const locales = __ORAMA_LOCALES__
