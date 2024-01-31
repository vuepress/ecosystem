import type { DeflateOptions } from 'fflate'
import { strFromU8, strToU8, unzlibSync, zlibSync } from 'fflate/browser'

declare const __VUEPRESS_SSR__: boolean

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

export const decodeData = (base64: string): string => {
  console.log(base64)

  const binary = __VUEPRESS_SSR__
    ? Buffer.from(base64, 'base64').toString('binary')
    : atob(base64)

  return strFromU8(unzlibSync(strToU8(binary, true)))
}
