import type { DocsearchOptions } from '../../shared/index.js'

type FacetFilters =
  Required<DocsearchOptions>['searchParameters']['facetFilters']

/**
 * Get facet filters for current lang
 */
export const getFacetFilters = (
  lang: string,
  rawFacetFilters: FacetFilters = [],
): FacetFilters => [
  `lang:${lang}`,
  ...((Array.isArray(rawFacetFilters)
    ? rawFacetFilters
    : [rawFacetFilters]) as string[]),
]
