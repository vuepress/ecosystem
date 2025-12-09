import type { TransformerCompactLineOption } from '@shikijs/transformers'
import { Logger } from '@vuepress/helper'
import { customAlphabet } from 'nanoid'

const VUE_RE = /-vue$/

export const TWOSLASH_RE = /\btwoslash\b/

export const PLUGIN_NAME = '@vuepress/plugin-shiki'

export const logger = new Logger(PLUGIN_NAME)

export const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz', 10)

/**
 * Resolve language from code fence info string
 *
 * 从代码围栏信息字符串中解析语言
 *
 * @param info - Code fence info string / 代码围栏信息字符串
 *
 * @returns Resolved language / 解析的语言
 */
export const resolveLanguage = (info: string): string =>
  info
    .match(/^([^ :[{]+)/)?.[1]
    ?.replace(VUE_RE, '')
    .toLowerCase() ?? ''

/**
 * Convert attributes to line options
 *
 * 将属性转换为行选项
 *
 * @description 2 steps:
 * 1. convert attrs into line numbers:
 *    {4,7-13,16,23-27,40} -> [4,7,8,9,10,11,12,13,16,23,24,25,26,27,40]
 * 2. convert line numbers into line options:
 *    [{ line: number, classes: string[] }]
 *
 * 转换分为两步：
 * 1. 将属性转换为行号数组
 * 2. 将行号数组转换为行选项
 *
 * @param attrs - Attributes string / 属性字符串
 *
 * @returns Line options array / 行选项数组
 */
export const attrsToLines = (attrs: string): TransformerCompactLineOption[] => {
  const match = attrs.match(/\s+([\d,-]+)\s*$/)
  const attrsContent = match ? match[1] : ''
  const result: number[] = []

  if (!attrsContent) {
    return []
  }

  attrsContent
    .split(',')
    .map((lineNumberConfig) =>
      lineNumberConfig.split('-').map((lineNumber) => parseInt(lineNumber, 10)),
    )
    .forEach(([start, end]) => {
      if (start && end) {
        result.push(
          ...Array.from({ length: end - start + 1 }, (_, i) => start + i),
        )
      } else {
        result.push(start)
      }
    })

  return result.map((line) => ({
    line,
    classes: ['highlighted'],
  }))
}
