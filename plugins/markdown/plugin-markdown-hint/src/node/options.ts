import type { ExactLocaleConfig } from '@vuepress/helper'
import type { LocaleConfig } from 'vuepress/shared'

export interface MarkdownHintPluginLocaleData {
  /**
   * Default title text for important block
   *
   * 重要块的默认标题
   */
  important: string

  /**
   * Default title text for note block
   *
   * 注释块的默认标题
   */
  note: string

  /**
   * Default title text for tip block
   *
   * 提示块的默认标题
   */
  tip: string

  /**
   * Default title text for warning block
   *
   * 注意块的默认标题
   */
  warning: string

  /**
   * Default title text for caution block
   *
   * 警告块的默认标题
   */
  caution: string

  /**
   * Default title text for info block
   *
   * 信息块的默认标题
   */
  info: string

  /**
   * Default title text for details block
   *
   * 详情块的默认标题
   */
  details: string
}

export type MarkdownHintPluginLocaleConfig =
  ExactLocaleConfig<MarkdownHintPluginLocaleData>

/**
 * Markdown hint plugin configuration
 *
 * Markdown 提示插件配置
 */
export interface MarkdownHintPluginOptions {
  /**
   * Whether to enable GFM alerts
   *
   * 是否启用 GFM 警告
   *
   * @default false
   */
  alert?: boolean

  /**
   * Whether to enable hint containers including important, info, note, tip, warning, caution, details
   *
   * 是否启用提示容器，包括 important、info、note、tip、warning、caution、details
   *
   * @default true
   */
  hint?: boolean

  /**
   * Whether to inject default styles
   *
   * 是否注入默认样式
   *
   * @default true
   */
  injectStyles?: boolean

  /**
   * Locale config
   *
   * 国际化配置选项
   */
  locales?: LocaleConfig<MarkdownHintPluginLocaleData>
}
