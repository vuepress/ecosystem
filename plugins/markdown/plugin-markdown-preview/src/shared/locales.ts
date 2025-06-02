import type { ExactLocaleConfig } from '@vuepress/helper'

export interface MarkdownPreviewPluginLocaleData {
  /**
   * toggle code button text
   */
  toggle: string
}

export type MarkdownPreviewPluginLocaleConfig =
  ExactLocaleConfig<MarkdownPreviewPluginLocaleData>
