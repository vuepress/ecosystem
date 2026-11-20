import type { MarkdownItAttrsOptions } from '@mdit/plugin-attrs'
import type { MarkdownItStylizeConfig } from '@mdit/plugin-stylize'

export type * from '@mdit/plugin-attrs'
export type * from '@mdit/plugin-stylize'

/**
 * Style of the window container
 *
 * 窗口容器的样式
 */
export type MarkdownStylizeWindowStyle = 'mac' | 'windows'

export interface MarkdownStylizePluginOptions {
  /**
   * Whether to enable align support
   *
   * 是否启用自定义对齐支持。
   *
   * @default false
   */
  align?: boolean

  /**
   * Whether to enable attr support
   *
   * 是否启用属性支持。
   *
   * @default false
   */
  attrs?: MarkdownItAttrsOptions | boolean

  /**
   * Whether to enable layout support
   *
   * 是否启用布局支持。
   *
   * @default false
   */
  layout?: boolean

  /**
   * Whether to enable superscript format support
   *
   * 是否启用上角标格式支持。
   *
   * @default false
   */
  sup?: boolean

  /**
   * Whether to enable subscript format support
   *
   * 是否启用下角标格式支持。
   *
   * @default false
   */
  sub?: boolean

  /**
   * Whether to enable mark format support
   *
   * 是否启用标注支持。
   *
   * @default false
   */
  mark?: boolean

  /**
   * Whether to enable spoiler support
   *
   * 是否启用剧透支持。
   *
   * @default false
   */
  spoiler?: boolean

  /**
   * Whether to enable steps support
   *
   * 是否启用步骤支持。
   *
   * @default false
   */
  steps?: boolean

  /**
   * Whether to enable window container support
   *
   * Set to `'mac'` or `'windows'` to specify the default window style.
   *
   * 是否启用窗口容器支持。
   *
   * 设置为 `'mac'` 或 `'windows'` 可指定默认窗口样式。
   *
   * @default false
   */
  window?: MarkdownStylizeWindowStyle | boolean

  /**
   * Customizing token stylize
   *
   * 自定义标记样式。
   */
  custom?: MarkdownItStylizeConfig[]
}
