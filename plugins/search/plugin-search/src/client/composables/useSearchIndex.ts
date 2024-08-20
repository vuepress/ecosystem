import { SEARCH_INDEX } from '@internal/searchIndex'
import type { Ref } from 'vue'
import { ref } from 'vue'
import type { SearchIndex } from '../../shared/index.js'

export type SearchIndexRef = Ref<SearchIndex>

export const searchIndex = ref(SEARCH_INDEX)

export const useSearchIndex = (): SearchIndexRef => searchIndex

if (__VUEPRESS_DEV__ && (import.meta.webpackHot || import.meta.hot)) {
  __VUE_HMR_RUNTIME__.updateSearchIndex = (data: SearchIndex) => {
    searchIndex.value = data
  }
}
