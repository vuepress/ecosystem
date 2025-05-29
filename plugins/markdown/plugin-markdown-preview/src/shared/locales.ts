import type { ExactLocaleConfig } from '@vuepress/helper'

export interface MarkdownPreviewPluginLocaleData {
  /**
   * Show code button text
   */
  show: string

  /**
   * Hide code button text
   */
  hide: string
}

export type MarkdownPreviewPluginLocaleConfig =
  ExactLocaleConfig<MarkdownPreviewPluginLocaleData>
