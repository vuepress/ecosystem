import { entries, fromEntries, isArray, isPlainObject } from '@vuepress/helper'
import type { ElementCompact } from 'xml-js'

/**
 * Encode CDATA
 *
 * 编码 CDATA
 *
 * @see https://stackoverflow.com/questions/223652/is-there-a-way-to-escape-a-cdata-end-token-in-xml
 *
 * @param content - Content to encode / 要编码的内容
 * @returns Encoded content / 编码后的内容
 */
export const encodeCDATA = (content: string): string =>
  content.replaceAll(']]>', ']]]]><![CDATA[>')

export const encodeXMLContent = (content: string): string =>
  content
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')

export const encodeXML = (content: ElementCompact): ElementCompact =>
  fromEntries(
    entries(content).map(([key, value]) => {
      if (key === '_attributes' && value)
        return [
          key,
          fromEntries(
            entries(value as Record<string, number | string | undefined>).map(
              ([attr, attrValue]) => [
                attr,
                attrValue ? encodeXMLContent(attrValue.toString()) : undefined,
              ],
            ),
          ),
        ]

      if (key === '_text')
        return [key, encodeXMLContent((value as number | string).toString())]
      if (key === '_cdata') return [key, encodeCDATA(value as string)]
      if (key === '_comment' || key === '_instruction') return [key, value]

      if (isArray(value))
        return [key, value.map((item) => encodeXML(item as ElementCompact))]

      if (isPlainObject(value)) return [key, encodeXML(value as ElementCompact)]

      return [key, encodeXMLContent(String(value))]
    }),
  ) satisfies ElementCompact
