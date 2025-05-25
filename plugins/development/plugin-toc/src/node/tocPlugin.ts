import type { Plugin } from 'vuepress/core'
import { getDirname, path } from 'vuepress/utils'
import type { TocPluginOptions } from './options.js'

const __dirname = import.meta.dirname || getDirname(import.meta.url)

export const tocPlugin = ({
  componentName = 'Toc',
  headerOptions = {},
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  defaultPropsOptions = {},
  propsOptions = defaultPropsOptions,
}: TocPluginOptions = {}): Plugin => ({
  name: '@vuepress/plugin-toc',

  clientConfigFile: path.resolve(__dirname, '../client/config.js'),

  define: {
    __TOC_COMPONENT_NAME__: componentName,
    __TOC_HEADERS_OPTIONS__: headerOptions,
    __TOC_PROPS_OPTIONS__: propsOptions,
  },
})
