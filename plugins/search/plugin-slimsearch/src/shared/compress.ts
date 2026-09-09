import { gunzipSync, gzipSync } from 'fflate/browser'

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
 * Compress a JSON-serializable value into a base64 string by gzipping its JSON
 * representation.
 *
 * The base64 string can be embedded in temp files or in the production worker
 * and decoded later with `decodeJSON`.
 *
 * 将可 JSON 序列化的值通过 gzip 压缩其 JSON 表示，并编码为 base64 字符串。
 *
 * 该 base64 字符串可嵌入临时文件或生产环境中的 Worker，后续可通过 `decodeJSON` 解码。
 *
 * @param value - JSON-serializable value 可 JSON 序列化的值
 * @returns Base64-encoded value 编码后的 base64 字符串
 */
export const encodeJSON = (value: unknown): string =>
  toBase64(gzipSync(new TextEncoder().encode(JSON.stringify(value))))

/**
 * Decode a base64 string produced by `encodeJSON` back into the original value.
 *
 * 将 `encodeJSON` 生成的 base64 字符串解码回原始值。
 *
 * @param encoded - Base64-encoded value base64 编码的字符串
 * @returns The decoded value 解码后的值
 */
// oxlint-disable-next-line typescript/no-unnecessary-type-parameters
export const decodeJSON = <T>(encoded: string): T =>
  JSON.parse(new TextDecoder().decode(gunzipSync(fromBase64(encoded)))) as T
