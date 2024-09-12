import type { Plugin } from 'vuepress/core'
import type { DocsearchOptions } from '../shared/index.js'
import { prepareClientConfig } from './prepareClientConfig.js'
import { PLUGIN_NAME } from './utils.js'

/**
 * Options for @vuepress/plugin-docsearch
 */
export interface DocsearchPluginOptions extends DocsearchOptions {
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
}: DocsearchPluginOptions = {}): Plugin => ({
  name: PLUGIN_NAME,

  define: (app) => ({
    __DOCSEARCH_INDEX_BASE__: indexBase || app.options.base,
    __DOCSEARCH_OPTIONS__: options,
  }),

  clientConfigFile: (app) => prepareClientConfig(app, injectStyles),
})
