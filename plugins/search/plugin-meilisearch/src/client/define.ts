type DocSearchHotKeys = string[] | false

interface Query {
  q?: string | null
}

interface Pagination {
  offset?: number
  limit?: number
}

interface Highlight {
  attributesToHighlight?: string[]
  highlightPreTag?: string
  highlightPostTag?: string
}

interface Crop {
  attributesToCrop?: string[]
  cropLength?: number
  cropMarker?: string
}

type Filter = (string[] | string)[] | string

type Locale = string

interface HybridSearch {
  embedder?: string
  semanticRatio?: number
}

const MatchingStrategies = {
  ALL: 'all',
  LAST: 'last',
  FREQUENCY: 'frequency',
} as const

type MatchingStrategies =
  (typeof MatchingStrategies)[keyof typeof MatchingStrategies]

type SearchParams = Crop &
  Highlight &
  Pagination &
  Query & {
    filter?: Filter
    sort?: string[]
    facets?: string[]
    attributesToRetrieve?: string[]
    showMatchesPosition?: boolean
    matchingStrategy?: MatchingStrategies
    hitsPerPage?: number
    page?: number
    facetName?: string
    facetQuery?: string
    vector?: number[] | null
    showRankingScore?: boolean
    showRankingScoreDetails?: boolean
    rankingScoreThreshold?: number
    attributesToSearchOn?: string[] | null
    hybrid?: HybridSearch
    distinct?: string
    retrieveVectors?: boolean
    locales?: Locale[]
  }

export interface DocSearchProps {
  host: string
  apiKey: string
  indexUid: string
  clientAgents?: string[]
  /**
   * An array of hotkeys to trigger the search modal.
   * Can be either a single character, for example `s` or `/`,
   * or a combination of modifiers and key, for example `ctrl+k`.
   *
   * Default keys are `['ctrl+k', 's', '/']`
   *
   * Set to `false` to disable default keys.
   */
  hotKeys?: DocSearchHotKeys
  translations?: DocSearchTranslations
  searchParams?: SearchParams
  environment?: typeof window
  /**
   * Duration to wait between keystores to determine whether a search should happen or not.
   * Defaults to `200`.
   *
   * Set to `false` to disable debouncing.
   *
   * This is an optimization that discards unnecessary search operations, for example,
   * if a user is typing `hello`, we skip search operations for `h`, `he`, `hel` and `hell`
   * as this usually not what the user wants to search for, and instead wait a few milliseconds until
   * the user stops typing for a brief moment, and then we do the search operation.
   * In the previous example, that would be `hello`.
   */
  debounceDuration?: number | false
}

type ButtonTranslations = Partial<{
  buttonText: string
  buttonAriaLabel: string
}>

type FooterTranslations = Partial<{
  selectText: string
  selectKeyAriaLabel: string
  navigateText: string
  navigateUpKeyAriaLabel: string
  navigateDownKeyAriaLabel: string
  closeText: string
  closeKeyAriaLabel: string
  poweredByText: string
}>

type SearchBoxTranslations = Partial<{
  searchDocsPlaceHolder: string
  resetButtonTitle: string
  resetButtonAriaLabel: string
  cancelButtonText: string
  cancelButtonAriaLabel: string
}>

type ModalTranslations = FooterTranslations &
  Partial<{
    linkToTheResultAriaLabel: string
  }> &
  SearchBoxTranslations

type DocSearchTranslations = Partial<{
  button: ButtonTranslations
  modal: ModalTranslations
}>

declare const OPTIONS: DocSearchProps

export const pluginOptions = OPTIONS
