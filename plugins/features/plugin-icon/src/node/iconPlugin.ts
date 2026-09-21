import { extractInfo, icon, stringifyAttrs } from '@mdit/plugin-icon'
import { addCustomElement, addViteSsrNoExternal } from '@vuepress/helper'
import type { Plugin } from 'vuepress/core'

import { getAssetsType } from './getAssetsType.js'
import { getFontAwesomePackages } from './getFontAwesomeOffline.js'
import type { IconPluginOptions } from './options.js'
import { prepareConfigFile } from './prepareConfigFile.js'
import { prepareFontAwesomeEntry } from './prepareFontAwesomeEntry.js'
import { PLUGIN_NAME } from './utils.js'

/**
 * Icon plugin
 *
 * 图标插件
 *
 * @example
 *   import { iconPlugin } from '@vuepress/plugin-icon'
 *
 *   export default {
 *     plugins: [
 *       iconPlugin({
 *         assets: 'iconify',
 *         prefix: 'mdi:',
 *         component: 'VPIcon',
 *       }),
 *     ],
 *   }
 */
export const iconPlugin = (options: IconPluginOptions = {}): Plugin => {
  const { fontawesome } = options
  const iconType =
    options.type ?? (fontawesome ? 'fontawesome' : getAssetsType(options))

  return {
    name: PLUGIN_NAME,

    extendsBundlerOptions: (bundlerOptions, app) => {
      addViteSsrNoExternal(bundlerOptions, app, [
        '@vuepress/helper',
        ...getFontAwesomePackages(fontawesome),
      ])

      if (iconType === 'iconify')
        addCustomElement(bundlerOptions, app, 'iconify-icon')
    },

    extendsMarkdown: (md) => {
      if (options.markdown ?? true) {
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

    onPrepared: fontawesome
      ? async (app) => {
          await prepareFontAwesomeEntry(app, options)
        }
      : undefined,

    clientConfigFile: (app) => prepareConfigFile(app, options, iconType),
  }
}
