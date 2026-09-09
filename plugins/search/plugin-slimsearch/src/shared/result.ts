export interface MatchedContent {
  /** The snippet text (original case preserved) */
  text: string
  /**
   * Flat list of highlight ranges: [start0, end0, start1, end1, ...] into
   * `text`
   */
  highlights: number[]
}

export interface TitleMatchedItem {
  type: 'title'
  id: number
  display: MatchedContent[]
}

export interface HeadingMatchedItem {
  type: 'heading'
  id: number
  anchor: string
  display: MatchedContent[]
}

export interface ContentMatchedItem {
  type: 'text'
  id: number
  header?: string
  anchor?: string
  display: MatchedContent[]
}

export interface CustomMatchedItem {
  type: 'customField'
  id: number
  index: string
  display: MatchedContent[]
}

export type MatchedItem =
  | ContentMatchedItem
  | CustomMatchedItem
  | HeadingMatchedItem
  | TitleMatchedItem

export interface SearchResult {
  title: string
  contents: MatchedItem[]
}

export interface QueryResult {
  suggestions: string[]
  results: SearchResult[]
}
