import type { MarkdownItKatexOptions } from '@mdit/plugin-katex-slim'
import type { MarkdownItMathjaxOptions } from '@mdit/plugin-mathjax-slim'

/**
 * Options for KaTeX plugin
 *
 * KaTeX 插件选项
 */
export interface MarkdownKatexPluginOptions
  extends Omit<MarkdownItKatexOptions, 'transformer'> {
  type?: 'katex'

  /**
   * Whether enable copy plugin
   *
   * 是否启用复制插件
   *
   * @default false
   */
  copy?: boolean

  /**
   * Whether enable mhchem plugin
   *
   * 是否启用 mhchem 插件
   *
   * @default false
   */
  mhchem?: boolean
}

/**
 * Options for MathJax plugin
 *
 * MathJax 插件选项
 */
export interface MarkdownMathjaxPluginOptions
  extends Omit<MarkdownItMathjaxOptions, 'transformer'> {
  type?: 'mathjax'
}

/**
 * Options for Math plugin
 *
 * 数学插件选项
 */
export type MarkdownMathPluginOptions =
  | MarkdownKatexPluginOptions
  | MarkdownMathjaxPluginOptions
