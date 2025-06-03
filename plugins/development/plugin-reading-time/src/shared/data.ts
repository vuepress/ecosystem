/**
 * Reading time information
 *
 * 阅读时间信息
 */
export interface ReadingTime {
  /**
   * Expected reading time in minutes
   *
   * 期望的阅读时间（分钟）
   */
  minutes: number

  /**
   * Words count of current page
   *
   * 当前页的字数
   */
  words: number
}

/**
 * Reading time plugin page data
 *
 * 阅读时间插件页面数据
 */
export interface ReadingTimePluginPageData {
  readingTime: ReadingTime
}
