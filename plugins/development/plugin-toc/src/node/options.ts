import type { GetHeadersOptions } from '@vuepress/helper'
import type { TocPropsOptions } from '../shared/index.js'

/**
 * Options for @vuepress/plugin-toc
 *
 * @vuepress/plugin-toc 的选项
 */
export interface TocPluginOptions {
  /**
   * Specify the name of the TOC component
   *
   * 指定目录组件的名称
   *
   * @default 'Toc'
   */
  componentName?: string

  /**
   * Default header options
   *
   * 默认的标题选项
   *
   * @default {}
   */
  headerOptions?: GetHeadersOptions

  /**
   * Default props options
   *
   * 默认的属性选项
   *
   * @default {}
   */
  propsOptions?: Partial<TocPropsOptions>

  // FIXME: Remove in stable
  /**
   * @deprecated use `propsOptions` instead
   */
  defaultPropsOptions?: Partial<TocPropsOptions>
}
