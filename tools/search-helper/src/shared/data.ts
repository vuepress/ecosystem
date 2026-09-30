/**
 * Field of the page / section heading in the index.
 *
 * 索引中页面 / 段落标题的字段。
 */
export const HEADING_INDEX_ID = 'heading'

/**
 * Field of the text content in the index.
 *
 * 索引中正文内容的字段。
 */
export const TEXT_INDEX_ID = 'text'

/**
 * Field of the custom fields in the index.
 *
 * 索引中自定义字段的字段。
 */
export const CUSTOM_FIELDS_INDEX_ID = 'customFields'

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

/**
 * Character separating the page id, the kind marker and the rest of an index
 * id.
 *
 * It is the NUL character, which can never show up in an anchor: `markdown-it`
 * replaces every NUL of the source with U+FFFD before rendering it, and no HTML
 * entity can produce a NUL either. Index ids can therefore be split on it
 * without escaping anything.
 *
 * 分隔索引 id 中页面 id、种类标记与其余部分的字符。
 *
 * 它是 NUL 字符，不可能出现在锚点中：`markdown-it` 会在渲染前把源文中的每个 NUL 替换为 U+FFFD， 任何 HTML
 * 实体也无法产生 NUL。因此可以直接按它切分索引 id，无需转义任何内容。
 */
export const INDEX_ID_SEPARATOR = '\u0000'

/** Index id of a page. 页面的索引 id。 */
export type PageIndexId = `${number}`

/** Index id of a section of a page. 页面段落的索引 id。 */
export type SectionIndexId =
  `${PageIndexId}${typeof INDEX_ID_SEPARATOR}#${string}`

/** Index id of a custom field of a page. 页面自定义字段的索引 id。 */
export type CustomFieldIndexId =
  `${PageIndexId}${typeof INDEX_ID_SEPARATOR}@${number}`

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
): item is CustomFieldIndexItem => item.id.includes(`${INDEX_ID_SEPARATOR}@`)

/**
 * Whether the index item is a section of a page.
 *
 * 该索引项是否为页面的段落。
 *
 * @param item - Index item 索引项
 * @returns Whether it is a section 是否为段落
 */
export const isSectionIndexItem = (item: IndexItem): item is SectionIndexItem =>
  item.id.includes(`${INDEX_ID_SEPARATOR}#`)

/** Kind of an index id. 索引 id 的种类。 */
export type IndexIdKind = 'customField' | 'page' | 'section'

/** Parsed index id. 解析后的索引 id。 */
export interface ParsedIndexId {
  /** Id of the page 页面的 id */
  pageId: number
  /** Kind of the index id 索引 id 的种类 */
  kind: IndexIdKind
  /** Anchor of the section or index of the custom field 段落的锚点或自定义字段的索引 */
  info: string
}

/**
 * Parse the page id, the kind and the extra info out of an index id.
 *
 * An index id is either a page id (`0`), a section of a page (`0\u0000#anchor`)
 * or a custom field of a page (`0\u0000@1`), where `\u0000` is
 * `INDEX_ID_SEPARATOR`. As the separator can never appear later in the id, the
 * id can be split on it, and the kind marker is always the first character of
 * what follows it.
 *
 * 从索引 id 中解析出页面 id、种类与附加信息。
 *
 * 索引 id 可能是页面 id（`0`）、页面段落（`0\u0000#anchor`）或页面自定义字段（`0\u0000@1`）， 其中 `\u0000`
 * 是 `INDEX_ID_SEPARATOR`。由于分隔符不会出现在 id 的后半部分， 可以直接按它切分索引 id，种类标记就是其后内容的第一个字符。
 *
 * @example
 *   import { parseIndexId } from '@vuepress/search-helper/shared'
 *
 *   parseIndexId('0') // { pageId: 0, kind: 'page', info: '' }
 *   parseIndexId('0\u0000#anchor') // { pageId: 0, kind: 'section', info: 'anchor' }
 *   parseIndexId('0\u0000@1') // { pageId: 0, kind: 'customField', info: '1' }
 *
 * @param id - Index id 索引 id
 * @returns Parsed index id 解析后的索引 id
 */
export const parseIndexId = (id: string): ParsedIndexId => {
  const [pageId, rest = ''] = id.split(INDEX_ID_SEPARATOR)
  const marker = rest.charAt(0)

  return {
    pageId: Number(pageId),
    kind: marker === '#' ? 'section' : marker === '@' ? 'customField' : 'page',
    info: rest.slice(1),
  }
}
