import type { ReadingTime } from '../shared/index.js'

/**
 * Extract Latin words from content
 *
 * 从内容中提取拉丁文字
 *
 * @param content - Content to extract words from
 * @returns Matched words or null
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
 * @param content - Content to extract Chinese characters from
 * @returns Matched Chinese characters or null
 */
const getChinese = (content: string): RegExpMatchArray | null =>
  content.match(/[\u4E00-\u9FD5]/gu)

/**
 * Get word number of given string
 *
 * 获取给定字符串的字数
 *
 * @example
 *   getWordNumber('Hello world') // 2
 *   getWordNumber('你好世界') // 4
 *
 * @param content - Content to count words
 * @returns Word count
 */
export const getWordNumber = (content: string): number =>
  (getWords(content)?.reduce(
    (accumulator, word) =>
      accumulator + (word.trim() === '' ? 0 : word.trim().split(/\s+/u).length),
    0,
  ) ?? 0) + (getChinese(content)?.length ?? 0)

/**
 * Get reading time info
 *
 * 获取阅读时间信息
 *
 * @example
 *   getReadingTime('Hello world', 300)
 *   // { minutes: 0.01, words: 2 }
 *
 * @default wordsPerMinute 300
 * @param content - Content to calculate reading time
 * @param wordsPerMinute - Reading speed in words per minute
 * @returns Reading time information
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
