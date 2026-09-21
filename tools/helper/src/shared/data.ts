import type { DeflateOptions } from 'fflate'
// The browser build of fflate is used so that this module works in Node.js,
// browsers and Web Workers alike, as only the synchronous methods are used.
import { strFromU8, strToU8, unzlibSync, zlibSync } from 'fflate/browser'

/**
 * Encode and compress data
 *
 * 编码和压缩数据
 *
 * @param data - Data to encode / 要编码的数据
 * @param level - Compression level / 压缩级别
 * @returns Base64 encoded compressed data / Base64 编码的压缩数据
 */
export const encodeData = (
  data: string,
  level: DeflateOptions['level'] = 6,
): string => {
  // zlib headers can be found at https://stackoverflow.com/a/54915442
  const zipped = zlibSync(strToU8(data), { level })

  return btoa(strFromU8(zipped, true))
}

/**
 * Decode and unzip data
 *
 * 解码和解压数据
 *
 * @param base64 - Base64 encoded data / Base64 编码的数据
 * @returns Decoded string / 解码后的字符串
 */
export const decodeData = (base64: string): string =>
  strFromU8(unzlibSync(strToU8(atob(base64), true)))
