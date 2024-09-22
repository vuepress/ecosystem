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

  /**
   * The delay of rendering slides, in ms
   *
   * If the theme you are using has a switching animation, it is recommended to configure this option to `Switch animation duration + 200`
   *
   * 渲染幻灯片延时，单位 ms
   *
   * 如果你使用的主题有切换动画，建议配置此选项为 `切换动画时长 + 200`
   *
   * @default 800
   */
  delay?: number
}
