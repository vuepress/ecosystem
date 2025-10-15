import type { DocSearchIndex } from '@docsearch/react'
import { isString } from 'vuepress/shared'
import type { DocSearchOptions } from '../../shared/index.js'
import { getFacetFilters } from './getFacetFilters.js'

export const getIndices = (
  options: DocSearchOptions,
  lang: string,
): DocSearchIndex[] => {
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  const { indices, indexName, searchParameters } = options

  return (
    indices ?? [
      {
        name: indexName ?? '',
        searchParameters,
      },
    ]
  ).map((item) => {
    if (isString(item)) return { name: item, searchParameters }

    const { searchParameters: indexSearchParameters, ...rest } = item

    return {
      ...rest,
      searchParameters: {
        ...indexSearchParameters,
        facetFilters: getFacetFilters(
          lang,
          indexSearchParameters?.facetFilters,
        ),
      },
    }
  })
}
