import type { LocaleConfig, LocaleData } from 'vuepress/shared'

/**
 * Theme data with locale support
 *
 * 支持多语言的主题数据
 */
export type ThemeData<T extends LocaleData = LocaleData> = T & {
  /**
   * Locale configurations
   *
   * 多语言配置
   */
  locales?: LocaleConfig<T>
}
