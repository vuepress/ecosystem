import type { LocaleConfig } from 'vuepress'
import type { MarkdownPreviewPluginLocaleData } from '../shared/index.js'

export interface MarkdownPreviewPluginOptions {
  /**
   * Localization config for preview component
   *
   * 预览组件的本地化配置
   */
  locales?: LocaleConfig<MarkdownPreviewPluginLocaleData>
}
