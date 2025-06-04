import type { Plugin } from 'vuepress/core'
import { getDirname, path } from 'vuepress/utils'
import type { ThemeData } from '../shared/index.js'
import { prepareThemeData } from './prepareThemeData.js'

const __dirname = import.meta.dirname || getDirname(import.meta.url)

/**
 * Options of @vuepress/plugin-theme-data
 *
 * @vuepress/plugin-theme-data 的选项
 */
export interface ThemeDataPluginOptions {
  /**
   * Theme data to be used in client side
   *
   * 要在客户端使用的主题数据
   */
  themeData: ThemeData
}

/**
 * Theme data plugin
 *
 * 主题数据插件
 *
 * @param options - Plugin options / 插件选项
 * @returns VuePress plugin / VuePress 插件
 */
export const themeDataPlugin = ({
  themeData,
}: ThemeDataPluginOptions): Plugin => ({
  name: '@vuepress/plugin-theme-data',

  clientConfigFile: path.resolve(__dirname, '../client/config.js'),

  onPrepared: (app) => prepareThemeData(app, themeData),
})
