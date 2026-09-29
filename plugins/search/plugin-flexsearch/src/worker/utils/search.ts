import type {
  IndexItemDocument,
  SearchableProperty,
} from '@vuepress/search-helper/shared'

import {
  FIELD_BOOST,
  INDEX_FIELDS,
  getIndexTokenizer,
} from '../../shared/index.js'
import type { SearchIndex, WorkerSearchOptions } from '../../shared/index.js'

/** A hit of a single term in a locale index. 某个词条在语言环境索引中的命中项。 */
export interface TermHit {
  /** Index id of the hit 命中项的索引 id */
  id: string
  /** Relevance score of the hit 命中项的相关度分数 */
  score: number
}

/** A hit returned by the plugin, with its restored document. 插件返回的命中项及其还原后的文档。 */
export interface FlexSearchHit extends TermHit {
  /** Document of the hit 命中项的文档 */
  document: IndexItemDocument
}

/** Result of a searched field. 某个被搜索字段的结果。 */
interface FlexSearchFieldResult {
  field?: string
  result: (number | string)[]
}

/**
 * A FlexSearch document search.
 *
 * FlexSearch declares a deprecated `(query, limit, options)` overload that the
 * plugin never uses, and its own typing can not express a dynamic list of
 * fields, so the search is typed by this interface instead.
 *
 * FlexSearch 的文档搜索。
 *
 * FlexSearch 声明了插件不会使用的、已废弃的 `(query, limit, options)`
 * 重载，且其自身的类型无法表达动态的字段列表，因此改为使用此接口描述搜索。
 */
interface FlexSearchIndex {
  search: (
    query: string,
    options: Record<string, unknown>,
  ) => FlexSearchFieldResult[]
}

/**
 * Resolve the fields to search in.
 *
 * Only the fields of the index are accepted: FlexSearch throws when it is asked
 * to search a field it does not have, which rejects the request of the worker
 * and leaves the search box loading forever.
 *
 * 解析需要搜索的字段。
 *
 * 只接受索引中存在的字段：让 FlexSearch 搜索它没有的字段会抛错，从而拒绝工作线程的请求并让搜索框一直处于加载状态。
 *
 * @param properties - Properties to search in 需要搜索的属性
 * @returns Fields to search in 需要搜索的字段
 */
export const resolveFields = (
  properties?: '*' | readonly SearchableProperty[],
): string[] =>
  properties && properties !== '*'
    ? INDEX_FIELDS.filter((field) => properties.includes(field))
    : [...INDEX_FIELDS]

/** Context of the search of a term. 搜索单个词条的上下文。 */
interface SearchTermContext {
  /** Locale search index 语言搜索索引 */
  localeIndex: SearchIndex
  /** Fields to search in 需要搜索的字段 */
  fields: string[]
  /** Boost of each field 各字段的权重 */
  boost: Record<string, number>
  /** Search options passed to FlexSearch 传递给 FlexSearch 的搜索选项 */
  options: Record<string, unknown>
}

/**
 * Count used to fetch every hit of a term.
 *
 * A term must not be truncated: FlexSearch ranks it against the boost and the
 * position of the term, so the only document that matches another term of a
 * query can sit outside of the first hits of a very common term, and requesting
 * a bounded count would drop it from the results.
 *
 * 用于取回某个词条全部命中项的数量。
 *
 * 词条不能被截断：FlexSearch
 * 会按词条的权重与位置对其排名，因此一个很常见的词条的前若干个命中项之外，可能就坐着唯一匹配查询中另一个词条的文档，请求一个有界的数量就会把它从结果中丢掉。
 */
const ALL_HITS = Infinity

/**
 * Search a single term in the given fields of a locale index.
 *
 * Only the index ids and their score are collected: FlexSearch does not score
 * its results, so the score of a hit is derived from the boost of the field
 * that matched it and from its rank in the result of that field — the first
 * match of the custom fields scores `4`, while the second match of the text
 * content scores `0.5`. Restoring the documents is left to the caller, since
 * enriching every hit of a common term costs much more than the search itself.
 *
 * The hits of a document in different fields are merged, keeping its highest
 * score, so that a document matching both a heading and some content is
 * returned once.
 *
 * 在语言环境索引的给定字段中搜索单个词条。
 *
 * 只收集索引 id 及其分数：FlexSearch 不会为其结果评分，因此命中项的分数由其命中的字段的权重以及它在 该字段结果中的排名推导 ——
 * 自定义字段的第一个匹配项得分为 `4`，而正文的第二个匹配项得分为 `0.5`。 文档的还原交给调用方，因为为一个很常见的词条的每个命中项都做
 * enrich 比搜索本身代价高得多。
 *
 * 同一文档在不同字段中的命中项会被合并并保留其最高分，因此同时命中标题与正文的文档只会返回一次。
 *
 * @param context - Context of the search 搜索的上下文
 * @param term - Term to search for 需要搜索的词条
 * @returns Score of the hit of every index id 每个索引 id 的命中分数
 */
const searchTerm = (
  { localeIndex, fields, boost, options }: SearchTermContext,
  term: string,
): Map<string, number> => {
  // The search is called with the index as its receiver, because it relies on
  // `this`
  const { search } = localeIndex as unknown as FlexSearchIndex
  const fieldResults = search.call(localeIndex, term, {
    ...options,
    index: fields,
    limit: ALL_HITS,
    enrich: false,
  })

  const hits = new Map<string, number>()

  for (const { field, result } of fieldResults) {
    if (!field) continue

    const fieldBoost = boost[field] ?? 1

    result.forEach((id, rank) => {
      const key = String(id)
      const score = fieldBoost / (rank + 1)
      const previous = hits.get(key)

      if (previous === undefined || previous < score) hits.set(key, score)
    })
  }

  return hits
}

/**
 * Search a locale index and return the index ids of the hits, without restoring
 * their documents.
 *
 * 搜索某个语言环境的索引并返回命中项的索引 id，不还原它们的文档。
 *
 * @param localeIndex - Locale search index 语言搜索索引
 * @param query - Search query 搜索词
 * @param searchOptions - Search options 搜索选项
 * @returns Hits sorted by relevance 按相关度排序的命中项
 */
const searchIndexIds = (
  localeIndex: SearchIndex,
  query: string,
  searchOptions: WorkerSearchOptions = {},
): TermHit[] => {
  const {
    boost = FIELD_BOOST,
    limit = 100,
    offset: rawOffset = 0,
    properties,
    suggest = false,
    ...rest
  } = searchOptions
  const fields = resolveFields(properties)
  // A negative offset would slice the results from their end
  const offset = Math.max(0, rawOffset)

  if (!fields.length || limit <= 0) return []

  const terms = getIndexTokenizer(localeIndex)(query)

  if (!terms.length) return []

  const context: SearchTermContext = {
    localeIndex,
    fields,
    boost,
    options: rest,
  }
  // A term that is not required only contributes to the score of a result
  const requiredCount = suggest ? terms.length - 1 : terms.length
  // Every term is searched completely: a truncated set would drop the documents
  // that rank beyond the `limit` of a common term, and the optional term also
  // has to contribute its score to the documents outside of the first page
  const hitsByTerm = terms.map((term) => searchTerm(context, term))
  const requiredHits = hitsByTerm.slice(0, requiredCount)
  const optionalHits = hitsByTerm.slice(requiredCount)
  // Start from the smallest set of required hits, so that the intersection
  // iterates over as few candidates as possible. It falls back to the optional
  // term when no term is required, which happens when `suggest` is enabled and
  // the query is a single term.
  const candidates = requiredHits.reduce(
    (smallest, hits) => (hits.size < smallest.size ? hits : smallest),
    requiredHits[0] ?? optionalHits[0] ?? new Map(),
  )
  const allHits = [...requiredHits, ...optionalHits]

  return [...candidates]
    .filter(([id]) => requiredHits.every((hits) => hits.has(id)))
    .map(([id]) => ({
      id,
      score: allHits.reduce((total, hits) => total + (hits.get(id) ?? 0), 0),
    }))
    .sort((hitA, hitB) => hitB.score - hitA.score)
    .slice(offset, offset + limit)
}

/**
 * Search a locale index.
 *
 * The query is split into terms with the tokenizer of the index, and every term
 * is searched on its own, so that an indexed part of a page matches as soon as
 * all the terms are found in it — in any of its fields. FlexSearch only
 * requires the terms of a query to appear in the same field, which would not
 * match a query combining a word of a section heading with a word of the
 * section content.
 *
 * When `suggest` is enabled, the last term only contributes to the score of the
 * results, so a query that does not match anything still returns the parts
 * matching its previous terms. Every term is searched completely, so `limit`
 * and `offset` are applied to the merged results by the plugin itself: they are
 * the options of the plugin, not the per-field options of FlexSearch.
 *
 * 搜索某个语言环境的索引。
 *
 * 查询会先用索引的分词器拆分为词条，再逐个搜索，因此只要页面的某个已索引部分中能找到全部词条（无论它们在该部分的哪个字段）就会被匹配。FlexSearch
 * 只要求一个查询的词条出现在同一个字段中，这会使「段落标题中的一个词 + 段落正文中的一个词」这样的查询无法匹配。
 *
 * 启用 `suggest` 时，最后一个词条只参与结果评分，因此一个完全无法匹配的查询仍会返回匹配其前面词条的部分。 每个词条都会被完整搜索，`limit`
 * 与 `offset` 因此由插件在合并后的结果上生效：它们是插件的选项，而非 FlexSearch 的逐字段选项。
 *
 * @param localeIndex - Locale search index 语言搜索索引
 * @param query - Search query 搜索词
 * @param searchOptions - Search options 搜索选项
 * @returns Hits sorted by relevance 按相关度排序的命中项
 */
export const searchIndex = (
  localeIndex: SearchIndex,
  query: string,
  searchOptions: WorkerSearchOptions = {},
): FlexSearchHit[] =>
  searchIndexIds(localeIndex, query, searchOptions).flatMap(({ id, score }) => {
    // The stored document is only restored for the hits that are returned
    const document = localeIndex.get(id)

    return document ? [{ id, document, score }] : []
  })
