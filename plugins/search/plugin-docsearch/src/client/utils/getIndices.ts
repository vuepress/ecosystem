import type { DocSearchIndex } from '@docsearch/react'
import { isString } from 'vuepress/shared'
import type { DocSearchOptions } from '../../shared/index.js'
import { getFacetFiltersWithLang } from './getFacetFilters.js'

export const getIndices = (
  {
    indices,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    indexName,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    searchParameters,
  }: Pick<DocSearchOptions, 'indexName' | 'indices' | 'searchParameters'>,
  lang: string,
): DocSearchIndex[] =>
  (
    indices ?? [
      {
        name: indexName ?? '',
        searchParameters,
      },
    ]
  )
    // oxlint-disable-next-line oxc/no-map-spread
    .map((item) => {
      if (isString(item)) {
        return {
          name: item,
          searchParameters: {
            facetFilters: `lang:${lang}`,
          },
        }
      }

      const { searchParameters: indexSearchParameters, ...rest } = item

      return {
        ...rest,
        searchParameters: {
          ...indexSearchParameters,
          facetFilters: getFacetFiltersWithLang(
            lang,
            indexSearchParameters?.facetFilters,
          ),
        },
      }
    })
