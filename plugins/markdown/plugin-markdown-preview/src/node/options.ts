import type { LocaleConfig } from 'vuepress'
import type { MarkdownPreviewPluginLocaleData } from '../shared/index.js'

export interface MarkdownPreviewPluginOptions {
  /**
   * Localization config
   *
   * 本地化配置
   */
  locales?: LocaleConfig<MarkdownPreviewPluginLocaleData>
}
