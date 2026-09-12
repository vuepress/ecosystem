import type { Plugin } from 'vuepress/core'

import { getDefine } from './getDefine.js'
import { PLUGIN_NAME } from './logger.js'
import type { MediaPluginOptions } from './options.js'
import { prepareArtPlayerEntry } from './prepareArtPlayerEntry.js'
import { prepareClientConfigFile } from './prepareClientConfigFile.js'
import { prepareVideoJsEntry } from './prepareVideoJsEntry.js'

export const mediaPlugin = (options: MediaPluginOptions = {}): Plugin => ({
  name: PLUGIN_NAME,

  clientConfigFile: (app) => prepareClientConfigFile(app, options),

  define: getDefine(options),

  onPrepared: async (app) => {
    await Promise.all([
      prepareArtPlayerEntry(app, Boolean(options.artplayer)),
      prepareVideoJsEntry(app, options),
    ])
  },
})
