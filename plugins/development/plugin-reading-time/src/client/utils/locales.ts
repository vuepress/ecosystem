import type {
  ReadingTime,
  ReadingTimePluginLocaleData,
} from '../../shared/index.js'

/**
 * Get reading time locale text
 *
 * 获取阅读时间本地化文字
 *
 * @example
 *   getReadingTimeLocale(
 *     { minutes: 2.5, words: 500 },
 *     {
 *       less1Minute: 'Less than 1 min',
 *       word: '$word words',
 *       time: '$time min',
 *     },
 *   )
 *   // { time: "3 min", words: "500 words" }
 *
 * @param readingTime - Reading time data
 * @param locale - Locale config
 * @returns Localized reading time text
 */
export const getReadingTimeLocale = (
  readingTime: ReadingTime,
  locale: ReadingTimePluginLocaleData,
): { time: string; words: string } => {
  const { minutes, words } = readingTime
  const { less1Minute, word, time } = locale

  return {
    time:
      minutes < 1
        ? less1Minute
        : time.replace('$time', Math.round(minutes).toString()),
    words: word.replace('$word', words.toString()),
  }
}
