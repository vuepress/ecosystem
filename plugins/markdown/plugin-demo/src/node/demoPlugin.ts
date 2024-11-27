import type { Plugin } from 'vuepress/core'
import { getDirname, path } from 'vuepress/utils'

import { markdownDemo, normalDemo, reactDemo, vueDemo } from './demo.js'
import type { DemoPluginOptions } from './options.js'

const PLUGIN_NAME = '@vuepress/plugin-demo'

const __dirname = getDirname(import.meta.url)

export const demoPlugin = ({
  delay = 500,
  normal = true,
  vue = false,
  react = false,
  markdown = false,
  libs = {},
  ...options
}: DemoPluginOptions): Plugin => {
  if (!normal && !vue && !react && !markdown)
    return {
      name: PLUGIN_NAME,
    }

  return {
    name: PLUGIN_NAME,

    define: {
      __DEMO_DELAY__: delay,
      __DEMO_OPTIONS__: options,
      __DEMO_BABEL_LINK__:
        libs.babel ?? 'https://unpkg.com/@babel/standalone@7/babel.min.js',
      __DEMO_VUE_LINK__:
        libs.vue ?? 'https://unpkg.com/vue@3/dist/vue.global.prod.js',
      __DEMO_REACT_LINK__:
        libs.react ?? 'https://unpkg.com/react@18/umd/react.production.min.js',
      __DEMO_REACT_DOM_LINK__:
        libs.reactDOM ??
        'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
    },

    extendsMarkdown: (md) => {
      if (normal) md.use(normalDemo)
      if (vue) md.use(vueDemo)
      if (react) md.use(reactDemo)
      if (markdown) md.use(markdownDemo)
    },

    clientConfigFile: path.resolve(__dirname, '../client/config.js'),
  }
}
