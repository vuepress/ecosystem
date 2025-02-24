import type { GetHeadersOptions } from '@vuepress/helper'
import type { Plugin } from 'vuepress/core'
import { getDirname, path } from 'vuepress/utils'
import type { TocPropsOptions } from '../shared/index.js'

const __dirname = import.meta.dirname || getDirname(import.meta.url)

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

export const tocPlugin = ({
  componentName = 'Toc',
  headerOptions = {},
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  defaultPropsOptions = {},
  propsOptions = defaultPropsOptions,
}: TocPluginOptions = {}): Plugin => ({
  name: '@vuepress/plugin-toc',

  clientConfigFile: path.resolve(__dirname, '../client/config.js'),

  define: {
    __TOC_COMPONENT_NAME__: componentName,
    __TOC_HEADERS_OPTIONS__: headerOptions,
    __TOC_PROPS_OPTIONS__: propsOptions,
  },
})
