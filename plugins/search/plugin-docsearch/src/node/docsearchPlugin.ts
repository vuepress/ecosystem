import { getFullLocaleConfig } from '@vuepress/helper'
import type { Plugin } from 'vuepress/core'
import type { DocSearchOptions } from '../shared/index.js'
import { docSearchLocaleInfo } from './locales.js'
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
  locales = {},
  ...options
}: DocSearchPluginOptions = {}): Plugin => ({
  name: PLUGIN_NAME,

  define: (app) => ({
    __DOCSEARCH_INDEX_BASE__: indexBase || app.siteData.base,
    __DOCSEARCH_OPTIONS__: {
      ...options,
      locales: getFullLocaleConfig({
        app,
        default: docSearchLocaleInfo,
        name: PLUGIN_NAME,
        config: locales,
      }),
    },
  }),

  clientConfigFile: (app) => prepareClientConfig(app, injectStyles),
})
