import type { ReadingTime } from '../shared/index.js'

/**
 * Extract Latin words from content
 *
 * 从内容中提取拉丁文字
 *
 * @param content - content to extract words from
 * @returns matched words or null
 */
const getWords = (content: string): RegExpMatchArray | null =>
  // \u00C0-\u024F are Latin Supplement letters, maybe used in language like french
  // \u0400-\u04FF are Cyrillic letters, used in russian
  // . @ / are added to ensure email and urls are not splitted
  content.match(/[\w\d\s\u00C0-\u024F\u0400-\u04FF.@/]+/giu)

/**
 * Extract Chinese Characters from content
 *
 * 从内容中提取中文字符
 *
 * @param content - content to extract Chinese characters from
 * @returns matched Chinese characters or null
 */
const getChinese = (content: string): RegExpMatchArray | null =>
  content.match(/[\u4E00-\u9FD5]/gu)

/**
 * Get word number of given string
 *
 * 获取给定字符串的字数
 *
 * @param content - content to count words
 * @returns word count
 *
 * @example
 * ```ts
 * getWordNumber('Hello world') // 2
 * getWordNumber('你好世界') // 4
 * ```
 */
export const getWordNumber = (content: string): number =>
  (getWords(content)?.reduce<number>(
    (accumulator, word) =>
      accumulator + (word.trim() === '' ? 0 : word.trim().split(/\s+/u).length),
    0,
  ) ?? 0) + (getChinese(content)?.length ?? 0)

/**
 * Get reading time info
 *
 * 获取阅读时间信息
 *
 * @param content - content to calculate reading time
 * @param wordsPerMinute - reading speed in words per minute
 * @returns reading time information
 *
 * @default wordsPerMinute 300
 *
 * @example
 * ```ts
 * getReadingTime('Hello world', 300)
 * // { minutes: 0.01, words: 2 }
 * ```
 */
export const getReadingTime = (
  content: string,
  wordsPerMinute = 300,
): ReadingTime => {
  const words = getWordNumber(content || '')

  return {
    minutes: Math.round((words / wordsPerMinute) * 100) / 100,
    words,
  }
}
