/**
 * Field of the page / section heading in the index.
 *
 * 索引中页面 / 段落标题的字段。
 */
export const HEADING_INDEX_ID = 'h'

/**
 * Field of the text content in the index.
 *
 * 索引中正文内容的字段。
 */
export const TEXT_INDEX_ID = 't'

/**
 * Field of the custom fields in the index.
 *
 * 索引中自定义字段的字段。
 */
export const CUSTOM_FIELDS_INDEX_ID = 'c'

/**
 * Properties that can be searched.
 *
 * 可供搜索的属性。
 */
export type SearchableProperty =
  | typeof CUSTOM_FIELDS_INDEX_ID
  | typeof HEADING_INDEX_ID
  | 'id'
  | typeof TEXT_INDEX_ID

/** Index id of a page. 页面的索引 id。 */
export type PageIndexId = `${number}`

/** Index id of a section of a page. 页面段落的索引 id。 */
export type SectionIndexId = `${PageIndexId}#${string}`

/** Index id of a custom field of a page. 页面自定义字段的索引 id。 */
export type CustomFieldIndexId = `${PageIndexId}@${number}`

/** Index item of a page. 页面的索引项。 */
export interface PageIndexItem {
  id: PageIndexId
  [HEADING_INDEX_ID]: string
  [TEXT_INDEX_ID]?: string[]
}

/** Index item of a section of a page. 页面段落的索引项。 */
export interface SectionIndexItem {
  id: SectionIndexId
  [HEADING_INDEX_ID]: string
  [TEXT_INDEX_ID]?: string[]
}

/** Index item of a custom field of a page. 页面自定义字段的索引项。 */
export interface CustomFieldIndexItem {
  id: CustomFieldIndexId
  [CUSTOM_FIELDS_INDEX_ID]: string[]
}

/** Index item. 索引项。 */
export type IndexItem = CustomFieldIndexItem | PageIndexItem | SectionIndexItem

/**
 * Index item as it is stored in a search engine.
 *
 * Unlike `IndexItem`, every field is optional, because a search engine returns
 * the whole stored document without knowing which kind of index item it is.
 *
 * 存储在搜索引擎中的索引项。
 *
 * 与 `IndexItem` 不同，它的每个字段都是可选的，因为搜索引擎返回的是整个存储的文档，并不知道它是哪种索引项。
 */
export interface IndexItemDocument {
  /** Index id of the item 索引项的索引 id */
  id: string
  [HEADING_INDEX_ID]?: string
  [TEXT_INDEX_ID]?: string[]
  [CUSTOM_FIELDS_INDEX_ID]?: string[]
}

/** Index items of locales. 各语言环境的索引项。 */
export type LocaleIndex = Record<string, IndexItem[]>

/** Index store of locales. 各语言环境的索引。 */
export type SearchIndexStore<T = unknown> = Record<string, T>

/**
 * Whether the index item is a custom field.
 *
 * 该索引项是否为自定义字段。
 *
 * @param item - Index item 索引项
 * @returns Whether it is a custom field 是否为自定义字段
 */
export const isCustomFieldIndexItem = (
  item: IndexItem,
): item is CustomFieldIndexItem => item.id.includes('@')

/**
 * Whether the index item is a section of a page.
 *
 * 该索引项是否为页面的段落。
 *
 * @param item - Index item 索引项
 * @returns Whether it is a section 是否为段落
 */
export const isSectionIndexItem = (item: IndexItem): item is SectionIndexItem =>
  item.id.includes('#')

/** Parsed index id. 解析后的索引 id。 */
export interface ParsedIndexId {
  /** Id of the page 页面的 id */
  pageId: number
  /** Anchor of the section or index of the custom field 段落的锚点或自定义字段的索引 */
  info: string
}

/**
 * Parse the page id and the extra info out of an index id.
 *
 * An index id is either a page id (`0`), a section of a page (`0#anchor`) or a
 * custom field of a page (`0@0`).
 *
 * 从索引 id 中解析出页面 id 与附加信息。
 *
 * 索引 id 可能是页面 id（`0`）、页面段落（`0#anchor`）或页面自定义字段（`0@0`）。
 *
 * @example
 *   import { parseIndexId } from '@vuepress/search-helper/shared'
 *
 *   parseIndexId('0#anchor') // { pageId: 0, info: 'anchor' }
 *   parseIndexId('0@1') // { pageId: 0, info: '1' }
 *
 * @param id - Index id 索引 id
 * @returns Parsed index id 解析后的索引 id
 */
export const parseIndexId = (id: string): ParsedIndexId => {
  const [pageIndex, info = ''] = id.split(/[#@]/u)

  return { pageId: Number(pageIndex), info }
}
