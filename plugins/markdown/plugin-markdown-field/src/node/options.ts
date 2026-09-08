import type { ExactLocaleConfig } from '@vuepress/helper'
import type { LocaleConfig } from 'vuepress/shared'

export interface MarkdownFieldPluginLocaleData {
  /**
   * Label text for the `default` attribute
   *
   * `default` 属性的标签文本
   */
  default: string

  /**
   * Badge text for the `required` attribute
   *
   * `required` 属性的徽章文本
   */
  required: string

  /**
   * Badge text for the `optional` attribute
   *
   * `optional` 属性的徽章文本
   */
  optional: string

  /**
   * Badge text for the `deprecated` attribute
   *
   * `deprecated` 属性的徽章文本
   */
  deprecated: string
}

export type MarkdownFieldPluginLocaleConfig =
  ExactLocaleConfig<MarkdownFieldPluginLocaleData>

/**
 * Markdown field plugin configuration
 *
 * Markdown 字段容器插件配置
 */
export interface MarkdownFieldPluginOptions {
  /**
   * Whether to enable fields
   *
   * 是否启用字段容器
   *
   * @default false
   */
  fields?: boolean

  /**
   * Locale config
   *
   * 国际化配置选项
   */
  locales?: LocaleConfig<MarkdownFieldPluginLocaleData>
}
