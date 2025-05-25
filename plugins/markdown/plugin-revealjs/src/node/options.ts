import type { RevealJsTheme } from '../shared/index.js'

export type RevealJsPlugin = 'highlight' | 'math' | 'notes' | 'search' | 'zoom'

/**
 * reveal.js plugin options
 */
export interface RevealJsPluginOptions {
  /**
   * Reveal.js plugins
   *
   * 幻灯片插件
   *
   * @default []
   */
  plugins?: RevealJsPlugin[]

  /**
   * Reveal.js themes
   *
   * 幻灯片主题
   *
   * @default ["auto"]
   */
  themes?: RevealJsTheme[]

  /**
   * Slide layout name
   *
   * 幻灯片布局名称
   *
   * @default 'SlidePage'
   */
  layout?: string | false
}
