import type { Plugin } from 'vuepress/core'
import { getDirname, path } from 'vuepress/utils'

const __dirname = import.meta.dirname || getDirname(import.meta.url)

/**
 * NProgress plugin for VuePress
 *
 * VuePress 的 NProgress 插件
 *
 * @example
 * ```ts
 * import { nprogressPlugin } from '@vuepress/plugin-nprogress'
 *
 * export default {
 *   plugins: [nprogressPlugin()],
 * }
 * ```
 */
export const nprogressPlugin = (): Plugin => ({
  name: '@vuepress/plugin-nprogress',

  clientConfigFile: path.resolve(__dirname, '../client/config.js'),
})
