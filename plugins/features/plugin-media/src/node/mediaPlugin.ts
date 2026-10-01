import type { Plugin } from 'vuepress/core'

import { registerAdvancedLinks } from './advancedLinks.js'
import { getDefine } from './getDefine.js'
import { PLUGIN_NAME } from './logger.js'
import type { MediaPluginOptions } from './options.js'
import { prepareArtPlayerEntry } from './prepareArtPlayerEntry.js'
import { prepareClientConfigFile } from './prepareClientConfigFile.js'
import { prepareVideoJsEntry } from './prepareVideoJsEntry.js'
import { getEnabledComponents } from './utils.js'

export const mediaPlugin = (options: MediaPluginOptions = {}): Plugin => {
  // The components are resolved once, so that the client config and the link
  // syntax always agree, and a missing package is only reported once
  const components = getEnabledComponents(options)

  return {
    name: PLUGIN_NAME,

    clientConfigFile: (app) => prepareClientConfigFile(app, components),

    define: getDefine(options),

    extendsMarkdown: (md) => {
      registerAdvancedLinks(md, components)
    },

    onPrepared: async (app) => {
      await Promise.all([
        // A disabled or missing Artplayer must not be resolved, so the entry is
        // driven by the components that survived the availability check
        prepareArtPlayerEntry(app, components.includes('ArtPlayer')),
        prepareVideoJsEntry(app, options),
      ])
    },
  }
}
