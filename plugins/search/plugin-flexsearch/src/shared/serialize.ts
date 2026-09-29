import { decodeData, encodeData } from '@vuepress/helper/shared'
import { Document } from 'flexsearch'
import type { IndexOptions } from 'flexsearch'

import { INDEX_FIELDS } from './data.js'
import type { SearchIndex, SearchIndexItem } from './data.js'
import type { SearchTokenizer } from './tokenizer.js'
import { createTokenizer } from './tokenizer.js'

// The acceptable options are listed explicitly rather than omitted from
// `IndexOptions`: `encode` and `encoder` are owned by the plugin, since the
// index and the queries must be tokenized identically; `db` and `commit` make
// the index persistent, which turns `add` into an asynchronous operation;
// `resolve`, `keystore` and `fastupdate` change the shape of the results or are
// incompatible with the `export` / `import` round trip the plugin relies on to
// serialize the index; and `preset` enables `fastupdate` and `context`.
/**
 * Options for creating a FlexSearch index.
 *
 * 创建 FlexSearch 索引的选项。
 */
export type FlexSearchIndexOptions = Pick<
  IndexOptions,
  'resolution' | 'tokenize'
>

/** Serialized index of a locale. 某个语言环境的序列化索引。 */
export interface SerializedIndex {
  /** Language of the index 索引的语言 */
  lang: string
  /**
   * Exported chunks of the index
   *
   * FlexSearch exports its index as several keyed chunks, which are restored
   * one by one by `import`.
   *
   * 索引导出的分块
   *
   * FlexSearch 会将索引导出为多个带键的分块，它们会由 `import` 逐个还原。
   */
  chunks: [key: string, data: string][]
}

/** Tokenizer of each index. 每个索引的分词器。 */
const tokenizers = new WeakMap<SearchIndex, SearchTokenizer>()

/** Language of each index. 每个索引的语言。 */
const languages = new WeakMap<SearchIndex, string>()

/**
 * Get the language of an index.
 *
 * 获取索引的语言。
 *
 * @param index - FlexSearch index FlexSearch 索引
 * @returns Language of the index 索引的语言
 */
export const getIndexLanguage = (index: SearchIndex): string =>
  languages.get(index) ?? ''

/**
 * Get the tokenizer of an index.
 *
 * The queries have to be tokenized with the tokenizer of the index they are
 * matched against, so an index without a tokenizer is a bug rather than a case
 * to recover from: falling back to a fresh tokenizer would silently tokenize
 * the queries differently from the index.
 *
 * 获取索引的分词器。
 *
 * 查询必须使用其匹配的索引的分词器进行分词，因此没有分词器的索引是程序缺陷而不是需要兜底的情况：回退到新建的分词器会让查询与索引的分词方式静默地不一致。
 *
 * @param index - FlexSearch index FlexSearch 索引
 * @returns Tokenizer of the index 索引的分词器
 */
export const getIndexTokenizer = (index: SearchIndex): SearchTokenizer => {
  const tokenizer = tokenizers.get(index)

  if (!tokenizer) {
    throw new Error(
      'The index has no tokenizer. Make sure it was created with `createIndex`.',
    )
  }

  return tokenizer
}

/**
 * Create a fresh FlexSearch index, optionally restoring serialized chunks.
 *
 * The tokenizer is recreated from the language because it can not be
 * serialized.
 *
 * 创建全新的 FlexSearch 索引，可选地还原序列化的分块。
 *
 * 分词器无法被序列化，因此会根据语言重新创建。
 *
 * @param lang - Language of the index 索引的语言
 * @param chunks - Serialized chunks of the index 索引的序列化分块
 * @param options - Index options 索引选项
 * @returns FlexSearch index FlexSearch 索引
 */
export const createIndex = (
  lang: string,
  chunks?: [key: string, data: string][] | null,
  options: FlexSearchIndexOptions = {},
): SearchIndex => {
  const tokenizer = createTokenizer(lang)
  const index = new Document<SearchIndexItem>({
    document: {
      id: 'id',
      index: [...INDEX_FIELDS],
      store: true,
    },
    // Prefix search is enabled so that partial words match, e.g. `vuep`
    // matches `vuepress`
    tokenize: 'forward',
    ...options,
    encode: tokenizer,
  })

  tokenizers.set(index, tokenizer)
  languages.set(index, lang)

  if (chunks) for (const [key, data] of chunks) index.import(key, data)

  return index
}

/**
 * Export a live FlexSearch index into its serializable chunks.
 *
 * 将实时的 FlexSearch 索引导出为其可序列化的分块。
 *
 * @param index - FlexSearch index FlexSearch 索引
 * @returns Serialized index 序列化的索引
 */
export const serializeIndex = (index: SearchIndex): SerializedIndex => {
  const chunks: [string, string][] = []

  index.export((key, data) => {
    chunks.push([key, data])
  })

  return { lang: getIndexLanguage(index), chunks }
}

/**
 * Encode a live FlexSearch index into a base64 string by compressing its
 * serialized JSON representation.
 *
 * The base64 string can be embedded in temp files or in the production worker
 * and decoded later with `decodeIndex`.
 *
 * 将实时的 FlexSearch 索引压缩其序列化的 JSON 表示，并编码为 base64 字符串。
 *
 * 该 base64 字符串可嵌入临时文件或生产环境中的 Worker，后续可通过 `decodeIndex` 解码。
 *
 * @param index - FlexSearch index FlexSearch 索引
 * @returns Base64-encoded index 编码后的 base64 索引
 */
export const encodeIndex = (index: SearchIndex): string =>
  encodeData(JSON.stringify(serializeIndex(index)))

/**
 * Decode a base64 string produced by `encodeIndex` back into a live FlexSearch
 * index.
 *
 * 将 `encodeIndex` 生成的 base64 字符串解码回实时的 FlexSearch 索引。
 *
 * @param encoded - Base64-encoded index base64 编码的索引
 * @returns Restored FlexSearch index 还原后的 FlexSearch 索引
 */
export const decodeIndex = (encoded: string): SearchIndex => {
  const { lang, chunks } = JSON.parse(decodeData(encoded)) as SerializedIndex

  return createIndex(lang, chunks)
}
