export type Word = string | [tag: string, content: string]

export interface TitleMatchedItem {
  type: 'title'
  id: number
  display: Word[][]
}

export interface HeadingMatchedItem {
  type: 'heading'
  id: number
  anchor: string
  display: Word[][]
}

export interface ContentMatchedItem {
  type: 'text'
  id: number
  header?: string
  anchor?: string
  display: Word[][]
}

export interface CustomMatchedItem {
  type: 'customField'
  id: number
  index: string
  display: Word[][]
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
