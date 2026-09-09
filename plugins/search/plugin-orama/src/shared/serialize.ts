import { create, load, save } from '@orama/orama'
import type { RawData, Tokenizer } from '@orama/orama'
import { gunzipSync, gzipSync } from 'fflate/browser'

import { SCHEMA } from './data.js'
import type { SearchIndex } from './data.js'
import { createTokenizer } from './tokenizer.js'

export interface CreateIndexOptions {
  /**
   * Custom tokenizer factory
   *
   * When not provided, a tokenizer based on `Intl.Segmenter` will be created
   * for the given language.
   *
   * 自定义分词器工厂
   *
   * 未提供时，会为给定语言创建基于 `Intl.Segmenter` 的分词器。
   */
  tokenizer?: (language: string) => Tokenizer
}

export interface SerializedIndex {
  /** Language of the index 索引的语言 */
  lang: string
  /** Serialized index data 序列化的索引数据 */
  data: RawData
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
        : createTokenizer(lang),
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
export const serializeIndex = (index: SearchIndex): SerializedIndex => ({
  lang: index.tokenizer.language,
  data: save(index),
})

const toBase64 = (bytes: Uint8Array): string => {
  let binary = ''

  for (const byte of bytes) binary += String.fromCharCode(byte)

  return btoa(binary)
}

const fromBase64 = (encoded: string): Uint8Array => {
  const binary = atob(encoded)

  return Uint8Array.from(binary, (char) => char.charCodeAt(0))
}

/**
 * Encode a live Orama index into a base64 string by gzipping its serialized
 * JSON representation.
 *
 * The base64 string can be embedded in temp files or in the production worker
 * and decoded later with `decodeIndex`.
 *
 * 将实时的 Orama 索引通过 gzip 压缩其序列化的 JSON 表示，并编码为 base64 字符串。
 *
 * 该 base64 字符串可嵌入临时文件或生产环境中的 Worker，后续可通过 `decodeIndex` 解码。
 *
 * @param index - Live Orama index 实时的 Orama 索引
 * @returns Base64-encoded index 编码后的 base64 索引
 */
export const encodeIndex = (index: SearchIndex): string => {
  const bytes = new TextEncoder().encode(JSON.stringify(serializeIndex(index)))

  return toBase64(gzipSync(bytes))
}

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
  const json = new TextDecoder().decode(gunzipSync(fromBase64(encoded)))
  const { lang, data } = JSON.parse(json) as SerializedIndex

  return createIndex(lang, data)
}
