/**
 * Multi language config for `@vuepress/plugin-reading-time` plugin
 *
 * `@vuepress/plugin-reading-time` 插件的多语言配置
 */
export interface ReadingTimePluginLocaleData {
  /**
   * Word template, `$word` will be automatically replaced by actual words
   *
   * 字数模板，模板中 `$word` 会被自动替换为字数
   */
  word: string

  /**
   * Text for sub-minute reading time
   *
   * 阅读时间不足一分钟时的文本
   */
  subMinute: string

  /**
   * Time template
   *
   * 时间模板
   */
  time: string
}
