import type { App, LocaleConfig } from 'vuepress/core'
import type {
  RedirectBehaviorOptions,
  RedirectPluginLocaleData,
} from '../../shared/index.js'

export interface RedirectPluginOptions extends RedirectBehaviorOptions {
  /**
   * Redirect mapping
   *
   * 重定向映射
   */
  config?: Record<string, string> | ((app: App) => Record<string, string>)

  /**
   * Whether switch locales
   *
   * 是否启用重定向语言
   */
  switchLocale?: 'direct' | 'modal'

  /**
   * Locale language config
   *
   * 多语言语言配置
   */
  localeConfig?: Record<string, string[] | string>

  /**
   * Locales config
   *
   * 多语言选项
   */
  locales?: LocaleConfig<RedirectPluginLocaleData>
}
