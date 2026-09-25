import { create, load, save } from '@orama/orama'
import type { RawData, Tokenizer } from '@orama/orama'
import { decodeData, encodeData } from '@vuepress/helper/shared'

import { SCHEMA } from './data.js'
import type { SearchIndex } from './data.js'
import type { SearchTokenizer } from './tokenizer.js'
import { createTokenizer } from './tokenizer.js'

export interface CreateIndexOptions {
  /**
   * Custom tokenizer factory
   *
   * When not provided, an out-of-the-box tokenizer is created for the given
   * language, see `createTokenizer`.
   *
   * A custom tokenizer must split words the same way the `querySplitter` option
   * of the client does, otherwise the queries will not match the index.
   *
   * 自定义分词器工厂
   *
   * 未提供时，会为给定语言创建开箱即用的分词器，见 `createTokenizer`。
   *
   * 自定义分词器必须以与客户端的 `querySplitter` 选项相同的方式拆分单词，否则查询将无法匹配索引。
   */
  tokenizer?: (language: string) => Tokenizer

  /**
   * Stop-words of the language, provided by `@orama/stopwords`
   *
   * They are only used by the built-in tokenizer, which is created when no
   * custom `tokenizer` is provided.
   *
   * 语言的停用词，由 `@orama/stopwords` 提供
   *
   * 它们只会被内置分词器使用，即未提供自定义 `tokenizer` 时创建的分词器。
   */
  stopWords?: string[]
}

export interface SerializedIndex {
  /** Language of the index 索引的语言 */
  lang: string
  /** Serialized index data 序列化的索引数据 */
  data: RawData
  /**
   * Stop-words of the language
   *
   * They are embedded in the payload, so that only the languages used by the
   * site are shipped to the browser.
   *
   * 语言的停用词
   *
   * 它们被内嵌在载荷中，因此只有站点实际使用的语言会被发送到浏览器。
   */
  stopWords?: string[]
}

/**
 * Create a fresh Orama index instance, optionally restoring serialized data.
 *
 * The tokenizer is recreated from the language because it cannot be serialized.
 *
 * 创建全新的 Orama 索引实例，可选择还原序列化的数据。
 *
 * 分词器无法被序列化，因此会根据语言重新创建。
 *
 * @param lang - Language 语言
 * @param data - Serialized index data 序列化的索引数据
 * @param options - Index options 索引选项
 * @returns Orama index Orama 索引
 */
export const createIndex = (
  lang: string,
  data?: RawData | null,
  options: CreateIndexOptions = {},
): SearchIndex => {
  const index = create({
    schema: SCHEMA,
    components: {
      tokenizer: options.tokenizer
        ? options.tokenizer(lang)
        : createTokenizer(lang, options.stopWords),
    },
  })

  if (data) load(index, data)

  return index
}

/**
 * Serialize a live Orama index to JSON-serializable data, including the
 * language used to rebuild the tokenizer.
 *
 * The language must be embedded separately from `data.language` because the
 * custom tokenizer captures it when it is created; `load()` only restores the
 * `tokenizer.language` field, not the tokenizer's behavior.
 *
 * 将实时的 Orama 索引序列化为可 JSON 序列化的数据，并包含重建分词器所需的语言。
 *
 * 语言必须单独嵌入，而不是依赖 `data.language`，因为自定义分词器在创建时捕获了语言； `load()` 只会还原
 * `tokenizer.language` 字段，而不会还原分词器的行为。
 *
 * @param index - Live Orama index 实时的 Orama 索引
 * @returns Serializable data 可序列化的数据
 */
export const serializeIndex = (index: SearchIndex): SerializedIndex => {
  const { stopWords } = index.tokenizer as SearchTokenizer

  return {
    lang: index.tokenizer.language,
    data: save(index),
    // An empty list is left out, so that the payload stays small
    ...(stopWords?.length && { stopWords }),
  }
}

/**
 * Encode a live Orama index into a base64 string by compressing its serialized
 * JSON representation.
 *
 * The base64 string can be embedded in temp files or in the production worker
 * and decoded later with `decodeIndex`.
 *
 * 将实时的 Orama 索引压缩其序列化的 JSON 表示，并编码为 base64 字符串。
 *
 * 该 base64 字符串可嵌入临时文件或生产环境中的 Worker，后续可通过 `decodeIndex` 解码。
 *
 * @param index - Live Orama index 实时的 Orama 索引
 * @returns Base64-encoded index 编码后的 base64 索引
 */
export const encodeIndex = (index: SearchIndex): string =>
  encodeData(JSON.stringify(serializeIndex(index)))

/**
 * Decode a base64 string produced by `encodeIndex` back into a live Orama
 * index.
 *
 * 将 `encodeIndex` 生成的 base64 字符串解码回实时的 Orama 索引。
 *
 * @param encoded - Base64-encoded index base64 编码的索引
 * @returns Restored Orama index 还原后的 Orama 索引
 */
export const decodeIndex = (encoded: string): SearchIndex => {
  const { lang, data, stopWords } = JSON.parse(
    decodeData(encoded),
  ) as SerializedIndex

  return createIndex(lang, data, { stopWords })
}

/**
 * Read the language of an encoded index without restoring it.
 *
 * Restoring an index requires a tokenizer, which may need to be loaded first,
 * so the languages have to be read before the indexes are decoded.
 *
 * 读取编码后索引的语言，而不还原它。
 *
 * 还原索引需要分词器，而分词器可能需要先被加载，因此必须在解码索引前先读出语言。
 *
 * @param encoded - Base64-encoded index base64 编码的索引
 * @returns Language of the index 索引的语言
 */
export const getIndexLanguage = (encoded: string): string =>
  (JSON.parse(decodeData(encoded)) as SerializedIndex).lang
