import { addViteSsrNoExternal } from '@vuepress/helper'
import type { Plugin } from 'vuepress/core'
import { path } from 'vuepress/utils'

import type {
  SharePluginOptions,
  ShareServiceOptions,
} from '../shared/index.js'
import { AVAILABLE_SERVICES, getShareServices } from './services/index.js'

const PLUGIN_NAME = '@vuepress/plugin-share'

const __dirname = import.meta.dirname

/**
 * Get all share services available to the client
 *
 * Every built-in service is included, so that a component can select any of
 * them, while the configured services only decide the default buttons.
 *
 * 获取客户端可用的所有分享服务
 *
 * 所有内置服务都会被包含，以便组件选择任意一个，而配置的服务只决定默认按钮。
 *
 * @param options - Plugin options / 插件配置
 * @returns All available share services / 所有可用的分享服务
 */
const getAllShareServices = (
  options: SharePluginOptions,
): ShareServiceOptions[] => {
  const services = new Map<string, ShareServiceOptions>()

  for (const service of getShareServices({
    services: AVAILABLE_SERVICES,
    xUserName: options.xUserName,
  }))
    services.set(service.name, service)

  for (const service of getShareServices(options))
    services.set(service.name, service)

  return [...services.values()]
}

/**
 * VuePress share plugin
 *
 * It registers the global `Share` component and provides the configured share
 * services to it.
 *
 * VuePress 分享插件
 *
 * 它会注册全局 `Share` 组件，并向组件提供配置好的分享服务。
 *
 * @example
 *   import { sharePlugin } from '@vuepress/plugin-share'
 *
 *   export default {
 *     plugins: [
 *       sharePlugin({
 *         services: ['x', 'qq', 'weibo'],
 *       }),
 *     ],
 *   }
 *
 * @param options - Plugin options / 插件配置
 * @returns VuePress plugin / VuePress 插件
 */
export const sharePlugin =
  (options: SharePluginOptions = {}): Plugin =>
  (app) => ({
    name: PLUGIN_NAME,

    define: () => ({
      __SHARE_DEFAULT_SERVICES__: getShareServices(options).map(
        ({ name }) => name,
      ),
      __SHARE_SERVICES__: getAllShareServices(options),
    }),

    extendsBundlerOptions: (bundlerOptions: unknown) => {
      addViteSsrNoExternal(bundlerOptions, app, '@vuepress/helper')
    },

    clientConfigFile: path.resolve(__dirname, '../client/config.js'),
  })
