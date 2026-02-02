import type { Plugin } from 'vuepress/core'
import { getDirname, path } from 'vuepress/utils'
import type { TocPluginOptions } from './options.js'

const __dirname = import.meta.dirname || getDirname(import.meta.url)

/**
 * TOC plugin
 *
 * 目录插件
 *
 * @param options - Plugin options / 插件配置
 * @default {}
 * @example
 * ```ts
 * import { tocPlugin } from '@vuepress/plugin-toc'
 *
 * export default {
 *   plugins: [
 *     tocPlugin({
 *       componentName: 'Toc',
 *       headersOptions: {
 *         level: [2, 4]
 *       },
 *       renderOptions: {
 *         containerClass: 'my-toc',
 *         linkClass: 'my-toc-link'
 *       }
 *     })
 *   ]
 * }
 * ```
 */
export const tocPlugin = ({
  componentName = 'Toc',
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  headerOptions = {},
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  defaultPropsOptions,
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  propsOptions = {},
  headersOptions = headerOptions,
  renderOptions = defaultPropsOptions ?? propsOptions,
}: TocPluginOptions = {}): Plugin =>
  ({
    name: '@vuepress/plugin-toc',

    clientConfigFile: path.resolve(__dirname, '../client/config.js'),

    define: {
      __TOC_COMPONENT_NAME__: componentName,
      __TOC_HEADERS_OPTIONS__: headersOptions,
      __TOC_RENDER_OPTIONS__: renderOptions,
    },
  })
