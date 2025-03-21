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
   * Text for less than one minute
   *
   * 小于一分钟文字
   */
  less1Minute: string

  /**
   * Time template
   *
   * 时间模板
   */
  time: string
}
