import { addCustomElement, addViteSsrNoExternal } from '@vuepress/helper'
import type { Plugin } from 'vuepress/core'

import type { IconPluginOptions } from './options.js'
import { prepareConfigFile } from './prepareConfigFile.js'
import { PLUGIN_NAME, getIconInfo } from './utils.js'

export const iconPlugin = ({
  assets = 'iconify',
  prefix,
}: IconPluginOptions = {}): Plugin => {
  const { iconType, iconPrefix } = getIconInfo(assets, prefix)

  return {
    name: PLUGIN_NAME,

    extendsBundlerOptions: (bundlerOptions, app): void => {
      addViteSsrNoExternal(bundlerOptions, app, '@vuepress/helper')

      if (iconType === 'iconify')
        addCustomElement(bundlerOptions, app, 'iconify-icon')
    },

    clientConfigFile: (app) =>
      prepareConfigFile(app, iconType, iconPrefix, assets),
  }
}
