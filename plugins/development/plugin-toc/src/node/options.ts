import type { GetHeadersOptions } from '@vuepress/helper'
import type { TocPropsOptions } from '../shared/index.js'

/**
 * Options for @vuepress/plugin-toc
 */
export interface TocPluginOptions {
  /**
   * Specify the name of the TOC component
   *
   * @default 'Toc'
   */
  componentName?: string

  /**
   * Default header options
   */
  headerOptions?: GetHeadersOptions

  /**
   * Default props options
   */
  propsOptions?: Partial<TocPropsOptions>

  // FIXME: Remove in stable
  /**
   * @deprecated use `propsOptions` instead
   */
  defaultPropsOptions?: Partial<TocPropsOptions>
}
