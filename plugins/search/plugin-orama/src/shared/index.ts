export * from './data.js'
export * from './language.js'
export * from './serialize.js'
export * from './tokenizer.js'
export * from '@vuepress/search-helper/shared'

// The plugin overrides these names with engine specific ones
export type { SearchIndexStore } from './data.js'
export type { WorkerMessageData, WorkerSearchOptions } from './worker.js'

// Backward compatible aliases of the shared types
export type {
  SearchCustomFieldFormatter as OramaCustomFieldFormatter,
  SearchLocaleData as OramaLocaleData,
  SearchSortStrategy as OramaSortStrategy,
} from '@vuepress/search-helper/shared'
