import type { ExactLocaleConfig } from '@vuepress/helper/client'
import type {
  SlimSearchCustomFieldFormatter,
  SlimSearchKeyOptions,
  SlimSearchLocaleData,
} from '../shared/index.js'

type SlimSearchClientCustomFiledConfig = Record<
  string,
  SlimSearchCustomFieldFormatter
>

declare const __SLIMSEARCH_CUSTOM_FIELDS__: SlimSearchClientCustomFiledConfig
declare const __SLIMSEARCH_OPTIONS__: {
  searchDelay: number
  suggestDelay: number
  queryHistoryCount: number
  resultHistoryCount: number
  hotKeys: SlimSearchKeyOptions[]
  worker: string
}
declare const __SLIMSEARCH_LOCALES__: ExactLocaleConfig<SlimSearchLocaleData>

export const customFieldConfig = __SLIMSEARCH_CUSTOM_FIELDS__
export const options = __SLIMSEARCH_OPTIONS__
export const hotKeysConfig = options.hotKeys
export const locales = __SLIMSEARCH_LOCALES__
