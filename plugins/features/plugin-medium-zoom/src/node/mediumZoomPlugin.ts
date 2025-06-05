import type { Plugin } from 'vuepress/core'
import { getDirname, path } from 'vuepress/utils'
import type { MediumZoomPluginOptions } from './options.js'

const __dirname = import.meta.dirname || getDirname(import.meta.url)

/**
 * VuePress plugin - medium-zoom
 *
 * VuePress 插件 - medium-zoom
 *
 * @param options - Plugin options / 插件配置项
 */
export const mediumZoomPlugin = ({
  selector = '[vp-content] > img, [vp-content] :not(a) > img',
  zoomOptions = {},
}: MediumZoomPluginOptions = {}): Plugin => ({
  name: '@vuepress/plugin-medium-zoom',

  clientConfigFile: path.resolve(__dirname, '../client/config.js'),

  define: {
    __MZ_SELECTOR__: selector,
    __MZ_ZOOM_OPTIONS__: zoomOptions,
  },
})
