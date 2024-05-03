import type { Plugin } from 'vuepress/core'
import { getDirname, path } from 'vuepress/utils'
import type { WatermarkPluginOptions } from '../shared/index.js'

const __dirname = getDirname(import.meta.url)

export const watermarkPlugin = ({
  pageFilter = () => true,
  ...options
}: WatermarkPluginOptions = {}): Plugin => {
  options.global ??= true

  return {
    name: '@vuepress/plugin-watermark',
    define: {
      __VUEPRESS_PLUGIN_WATERMARK_OPTIONS__: options,
    },
    clientConfigFile: path.resolve(__dirname, '../client/config.js'),
    extendsPage: (page) => {
      // When global watermark is not enabled, enable watermark for matching pages.
      if (!options.global && pageFilter) {
        const frontmatter = page.frontmatter
        if (typeof frontmatter.watermark === 'undefined' && pageFilter(page)) {
          frontmatter.watermark = true
        }
      }
    },
  }
}
