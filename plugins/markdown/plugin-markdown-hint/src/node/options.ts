import type { ExactLocaleConfig } from '@vuepress/helper'
import type { LocaleConfig } from 'vuepress/shared'

export interface MarkdownHintPluginLocaleData {
  /**
   * Default Title text for important block
   *
   * 重要块的默认标题
   */
  important: string

  /**
   * Default Title text for note block
   *
   * 注释块的默认标题
   */
  note: string

  /**
   * Default Title text for tip block
   *
   * 提示块的默认标题
   */
  tip: string

  /**
   * Default Title text for warning block
   *
   * 注意块的默认标题
   */
  warning: string

  /**
   * Default Title text for danger block
   *
   * 警告块的默认标题
   */
  caution: string

  /**
   * Default Title text for info block
   *
   * 信息块的默认标题
   */
  info: string

  /**
   * Default Title text for details block
   *
   * 详情块的默认标题
   */
  details: string
}

export type MarkdownHintPluginLocaleConfig =
  ExactLocaleConfig<MarkdownHintPluginLocaleData>

/**
 * md-enhance plugin configuration
 */
export interface MarkdownHintPluginOptions {
  /**
   * Wether enable gfm alerts
   *
   * 是否启用 gfm 警告
   *
   * @default false
   */
  alert?: boolean

  /**
   * Whether to enable hint container including
   *
   * - important
   * - info
   * - note
   * - tip
   * - warning
   * - caution
   * - details
   *
   * 是否启用提示容器
   *
   * - important
   * - info
   * - note
   * - tip
   * - warning
   * - caution
   * - details
   *
   * @default true
   */
  hint?: boolean

  /**
   * Locale config
   *
   * 国际化配置选项
   */
  locales?: LocaleConfig<MarkdownHintPluginLocaleData>
}
