import { extractInfo, icon, stringifyAttrs } from '@mdit/plugin-icon'
import { addCustomElement, addViteSsrNoExternal } from '@vuepress/helper'
import type { Plugin } from 'vuepress/core'

import { getAssetsType } from './getAssetsType.js'
import type { IconPluginOptions } from './options.js'
import { prepareConfigFile } from './prepareConfigFile.js'
import { PLUGIN_NAME } from './utils.js'

export const iconPlugin = (options: IconPluginOptions = {}): Plugin => {
  const iconType = options.type ?? getAssetsType(options)

  return {
    name: PLUGIN_NAME,

    extendsBundlerOptions: (bundlerOptions, app): void => {
      addViteSsrNoExternal(bundlerOptions, app, '@vuepress/helper')

      if (iconType === 'iconify')
        addCustomElement(bundlerOptions, app, 'iconify-icon')
    },

    extendsMarkdown: (md): void => {
      if (options.markdown !== false) {
        md.use(icon, {
          render: (raw) => {
            const { attrs, content, color, size } = extractInfo({
              content: raw,
            })

            if (color && !attrs.color) attrs.color = color
            if (size && !attrs.size) attrs.size = size

            return `<${options.component ?? 'VPIcon'} icon="${content}"${stringifyAttrs(attrs)} />`
          },
        })
      }
    },

    clientConfigFile: (app) => prepareConfigFile(app, options, iconType),
  }
}
