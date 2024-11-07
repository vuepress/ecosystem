import type {
  SlimSearchCustomFieldFormatter,
  SlimSearchKeyOptions,
  SlimSearchLocaleConfig,
} from '../shared/index.js'

type SlimSearchClientCustomFiledConfig = Record<
  string,
  SlimSearchCustomFieldFormatter
>

declare const SLIMSEARCH_ENABLE_AUTO_SUGGESTIONS: boolean
declare const SLIMSEARCH_CUSTOM_FIELDS: SlimSearchClientCustomFiledConfig
declare const SLIMSEARCH_OPTIONS: {
  searchDelay: number
  suggestDelay: number
  queryHistoryCount: number
  resultHistoryCount: number
  hotKeys: SlimSearchKeyOptions[]
  worker: string
}
declare const SLIMSEARCH_LOCALES: SlimSearchLocaleConfig

export const searchProOptions = SLIMSEARCH_OPTIONS

export const enableAutoSuggestions = SLIMSEARCH_ENABLE_AUTO_SUGGESTIONS
export const searchProClientCustomFiledConfig = SLIMSEARCH_CUSTOM_FIELDS
export const searchProHotKeys = searchProOptions.hotKeys
export const searchProLocales = SLIMSEARCH_LOCALES
