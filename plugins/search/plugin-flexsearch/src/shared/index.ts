export * from './data.js'
export * from './serialize.js'
export * from './tokenizer.js'
export * from '@vuepress/search-helper/shared'

// The plugin overrides these names with engine specific ones
export type { SearchIndexStore } from './data.js'
export type { WorkerMessageData, WorkerSearchOptions } from './worker.js'

// Backward compatible aliases of the shared types
export type {
  SearchCustomFieldFormatter as FlexSearchCustomFieldFormatter,
  SearchLocaleData as FlexSearchLocaleData,
  SearchSortStrategy as FlexSearchSortStrategy,
} from '@vuepress/search-helper/shared'
