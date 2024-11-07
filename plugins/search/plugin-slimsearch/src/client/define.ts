import type {
  SlimSearchCustomFieldFormatter,
  SlimSearchKeyOptions,
  SlimSearchLocaleConfig,
} from '../shared/index.js'

type SlimSearchClientCustomFiledConfig = Record<
  string,
  SlimSearchCustomFieldFormatter
>

declare const __SLIMSEARCH_AUTO_SUGGESTIONS__: boolean
declare const __SLIMSEARCH_CUSTOM_FIELDS__: SlimSearchClientCustomFiledConfig
declare const __SLIMSEARCH_OPTIONS__: {
  searchDelay: number
  suggestDelay: number
  queryHistoryCount: number
  resultHistoryCount: number
  hotKeys: SlimSearchKeyOptions[]
  worker: string
}
declare const __SLIMSEARCH_LOCALES__: SlimSearchLocaleConfig

export const searchProOptions = __SLIMSEARCH_OPTIONS__

export const enableAutoSuggestions = __SLIMSEARCH_AUTO_SUGGESTIONS__
export const searchProClientCustomFiledConfig = __SLIMSEARCH_CUSTOM_FIELDS__
export const searchProHotKeys = searchProOptions.hotKeys
export const searchProLocales = __SLIMSEARCH_LOCALES__
