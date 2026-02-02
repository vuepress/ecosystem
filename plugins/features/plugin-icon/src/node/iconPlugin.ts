import { extractInfo, icon, stringifyAttrs } from '@mdit/plugin-icon'
import { addCustomElement, addViteSsrNoExternal } from '@vuepress/helper'
import type { Plugin } from 'vuepress/core'

import { getAssetsType } from './getAssetsType.js'
import type { IconPluginOptions } from './options.js'
import { prepareConfigFile } from './prepareConfigFile.js'
import { PLUGIN_NAME } from './utils.js'

/**
 * Icon plugin
 *
 * 图标插件
 *
 * @param options - Plugin options / 插件选项
 * @returns VuePress plugin / VuePress 插件
 *
 * @example
 * ```ts
 * import { iconPlugin } from '@vuepress/plugin-icon'
 *
 * export default {
 *   plugins: [
 *     iconPlugin({
 *       assets: 'iconify',
 *       prefix: 'mdi:',
 *       component: 'VPIcon'
 *     })
 *   ]
 * }
 * ```
 */
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
      if (options.markdown ?? true) {
        md.use(icon, {
          render: (raw) => {
            const { attrs, content, color, size } = extractInfo({
              content: raw,
            })

            if (color && !attrs.color) attrs.color = color
            // oxlint-disable-next-line unicorn/explicit-length-check
            if (size && !attrs.size) attrs.size = size

            return `<${options.component ?? 'VPIcon'} icon="${content}"${stringifyAttrs(attrs)} />`
          },
        })
      }
    },

    clientConfigFile: (app) => prepareConfigFile(app, options, iconType),
  }
}
