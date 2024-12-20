import type { Plugin } from 'vuepress/core'
import type { DocSearchOptions } from '../shared/index.js'
import { prepareClientConfig } from './prepareClientConfig.js'
import { PLUGIN_NAME } from './utils.js'

/**
 * Options for @vuepress/plugin-docsearch
 */
export interface DocSearchPluginOptions extends DocSearchOptions {
  /**
   * Base path of the search index
   */
  indexBase?: string

  /**
   * Whether to inject docsearch default styles
   */
  injectStyles?: boolean
}

export const docsearchPlugin = ({
  injectStyles = true,
  indexBase,
  ...options
}: DocSearchPluginOptions = {}): Plugin => ({
  name: PLUGIN_NAME,

  define: (app) => ({
    __DOCSEARCH_INDEX_BASE__: indexBase || app.siteData.base,
    __DOCSEARCH_OPTIONS__: options,
  }),

  clientConfigFile: (app) => prepareClientConfig(app, injectStyles),
})
