export * from '@vuepress/search-helper/client'

// The shared code is server and worker only, so only its types are exposed
//
// The engine specific ones override the ones of the helper
export type {
  SearchIndex,
  SearchIndexStore,
  WorkerMessageData,
  WorkerSearchOptions,
} from '../shared/index.js'
