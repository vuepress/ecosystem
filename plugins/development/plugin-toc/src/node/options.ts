import type { GetHeadersOptions } from '@vuepress/helper'
import type { TocRenderOptions } from '../shared/index.js'

/**
 * Options for `@vuepress/plugin-toc`
 *
 * `@vuepress/plugin-toc` 的选项
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
   * Default headers options
   *
   * 默认的标题选项
   *
   * @default {}
   */
  headersOptions?: GetHeadersOptions

  /**
   * Default render options
   *
   * 默认的渲染选项
   *
   * @default {}
   */
  renderOptions?: TocRenderOptions

  // TODO: Remove in stable
  /**
   * @deprecated use `headersOptions` instead
   */
  headerOptions?: GetHeadersOptions
  /**
   * @deprecated use `renderOptions` instead
   */
  defaultPropsOptions?: TocRenderOptions
  /**
   * @deprecated use `renderOptions` instead
   */
  propsOptions?: TocRenderOptions
}
