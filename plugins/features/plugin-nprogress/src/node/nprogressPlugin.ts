import type { Plugin } from 'vuepress/core'
import { path } from 'vuepress/utils'

const __dirname = import.meta.dirname

/**
 * NProgress plugin for VuePress
 *
 * VuePress 的 NProgress 插件
 *
 * @example
 *   import { nprogressPlugin } from '@vuepress/plugin-nprogress'
 *
 *   export default {
 *     plugins: [nprogressPlugin()],
 *   }
 */
export const nprogressPlugin = (): Plugin => ({
  name: '@vuepress/plugin-nprogress',

  clientConfigFile: path.resolve(__dirname, '../client/config.js'),
})
