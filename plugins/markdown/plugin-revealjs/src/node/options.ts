import type { RevealJsTheme } from '../shared/index.js'

/**
 * Built-in reveal.js plugin names
 *
 * reveal.js 内置插件名称
 */
export type RevealJsPlugin = 'highlight' | 'math' | 'notes' | 'search' | 'zoom'

/**
 * reveal.js plugin options
 *
 * reveal.js 插件选项
 */
export interface RevealJsPluginOptions {
  /**
   * Reveal.js plugins to enable
   *
   * 要启用的 Reveal.js 插件
   *
   * @default []
   */
  plugins?: RevealJsPlugin[]

  /**
   * Reveal.js themes to enable
   *
   * 要启用的 Reveal.js 主题
   *
   * @default ["auto"]
   */
  themes?: RevealJsTheme[]

  /**
   * Slide layout component name
   *
   * 幻灯片布局组件名称
   *
   * @default 'SlidePage'
   */
  layout?: string | false
}
