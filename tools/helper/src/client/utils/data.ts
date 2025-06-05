import type { DeflateOptions } from 'fflate'
import { strFromU8, strToU8, unzlibSync, zlibSync } from 'fflate/browser'

declare const __VUEPRESS_SSR__: boolean

/**
 * Encode and compress data
 *
 * 编码和压缩数据
 *
 * @param data - Data to encode / 要编码的数据
 * @param level - Compression level / 压缩级别
 *
 * @returns Base64 encoded compressed data / Base64 编码的压缩数据
 */
export const encodeData = (
  data: string,
  level: DeflateOptions['level'] = 6,
): string => {
  const buffer = strToU8(data)
  // zlib headers can be found at https://stackoverflow.com/a/54915442
  const zipped = zlibSync(buffer, { level })
  const binary = strFromU8(zipped, true)

  return __VUEPRESS_SSR__
    ? Buffer.from(binary, 'binary').toString('base64')
    : btoa(binary)
}

/**
 * Decode and unzip data
 *
 * 解码和解压数据
 *
 * @param base64 - Base64 encoded data / Base64 编码的数据
 *
 * @returns Decoded string / 解码后的字符串
 */
export const decodeData = (base64: string): string => {
  const binary = __VUEPRESS_SSR__
    ? Buffer.from(base64, 'base64').toString('binary')
    : atob(base64)

  return strFromU8(unzlibSync(strToU8(binary, true)))
}
