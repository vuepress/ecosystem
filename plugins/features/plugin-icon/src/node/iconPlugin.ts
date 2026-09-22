import { extractInfo, icon, stringifyAttrs } from '@mdit/plugin-icon'
import { addCustomElement, addViteSsrNoExternal } from '@vuepress/helper'
import type { Plugin } from 'vuepress/core'

import { getAssetsType } from './getAssetsType.js'
import { getFontAwesomePackages } from './getFontAwesomeOffline.js'
import { ICONIFY_ICON } from './getIconifyOffline.js'
import { resolveOffline } from './offline.js'
import type { IconPluginOptions } from './options.js'
import { prepareConfigFile } from './prepareConfigFile.js'
import { prepareFontAwesomeEntry } from './prepareFontAwesomeEntry.js'
import { prepareIconifyEntry } from './prepareIconifyEntry.js'
import { logger, PLUGIN_NAME } from './utils.js'

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
  const { offline } = options
  const iconType = options.type ?? getAssetsType(options)
  const offlineOptions = offline ? resolveOffline(iconType, offline) : null

  if (!offlineOptions && options.scan) {
    logger.warn(
      'The `scan` option is ignored, as the offline mode is not enabled.',
    )
  }

  return {
    name: PLUGIN_NAME,

    extendsBundlerOptions: (bundlerOptions, app) => {
      addViteSsrNoExternal(bundlerOptions, app, [
        '@vuepress/helper',
        ...(offlineOptions?.type === 'fontawesome'
          ? getFontAwesomePackages(true)
          : []),
        ...(offlineOptions?.type === 'iconify' ? [ICONIFY_ICON] : []),
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

    onPrepared: offlineOptions
      ? async (app) => {
          await (offlineOptions.type === 'fontawesome'
            ? prepareFontAwesomeEntry(app, options, offlineOptions.all)
            : prepareIconifyEntry(app, options))
        }
      : undefined,

    clientConfigFile: (app) => prepareConfigFile(app, options, iconType),
  }
}
