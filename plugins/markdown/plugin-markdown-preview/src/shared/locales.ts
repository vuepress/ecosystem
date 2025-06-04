import type { ExactLocaleConfig } from '@vuepress/helper'

export interface MarkdownPreviewPluginLocaleData {
  /**
   * Toggle code button text
   *
   * 切换代码按钮文字
   */
  toggle: string
}

export type MarkdownPreviewPluginLocaleConfig =
  ExactLocaleConfig<MarkdownPreviewPluginLocaleData>
