import type { FacetFilters } from 'algoliasearch'

/**
 * Get facet filters for current lang
 *
 * @param lang - Current language
 * @param rawFacetFilters - Raw facet filters from options
 * @returns Facet filters with lang filter added
 */
export const getFacetFiltersWithLang = (
  lang: string,
  rawFacetFilters: FacetFilters = [],
): FacetFilters => [
  `lang:${lang}`,
  ...((Array.isArray(rawFacetFilters)
    ? rawFacetFilters
    : [rawFacetFilters]) as string[]),
]
