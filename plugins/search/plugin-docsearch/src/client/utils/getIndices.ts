import type { DocSearchIndex } from '@docsearch/react'
import { isString } from 'vuepress/shared'

import { getFacetFiltersWithLang } from './getFacetFilters.js'

/**
 * Get indices with lang facet filters
 *
 * 获取带语言过滤条件的索引
 *
 * @param indices - DocSearch indices / DocSearch 索引
 * @param lang - Current language / 当前语言
 * @returns Indices with lang facet filters / 带语言过滤条件的索引
 */
export const getIndices = (
  indices: (DocSearchIndex | string)[],
  lang: string,
): DocSearchIndex[] =>
  indices.map((item) => {
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
