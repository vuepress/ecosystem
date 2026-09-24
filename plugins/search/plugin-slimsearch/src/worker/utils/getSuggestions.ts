import { autoSuggest } from 'slimsearch'

import type { SearchIndex, WorkerSearchOptions } from '../../shared/index.js'

export const getSuggestions = (
  query: string,
  localeIndex: SearchIndex,
  searchOptions: WorkerSearchOptions = {},
): string[] => {
  const suggestions = autoSuggest(localeIndex, query, {
    fuzzy: 0.2,
    maxFuzzy: 3,
    ...searchOptions,
  }).map(({ suggestion }) => suggestion)

  // filter multi-word suggestions if query is not multi-word
  return query.includes(' ')
    ? suggestions
    : suggestions.filter((suggestion) => !suggestion.includes(' '))
}
