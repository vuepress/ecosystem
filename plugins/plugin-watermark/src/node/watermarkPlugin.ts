import type { Page, Plugin } from 'vuepress/core'
import { getDirname, path } from 'vuepress/utils'
import type { WatermarkOptions } from '../shared/index.js'
import { logger, PLUGIN_NAME } from './utils.js'

const __dirname = getDirname(import.meta.url)

export interface WatermarkPluginOptions extends WatermarkOptions {
  /**
   * When `global` is set to `false`, Specify which pages need to have watermarks added,
   * pages that return `true` will have watermarks added.
   *
   * 当 `global` 为 `false` 时，
   * 指定哪些页面需要添加水印，返回 `true` 的页面将会被添加水印。
   *
   * @default () => true
   */
  filter?: (page: Page) => boolean
}

export const watermarkPlugin =
  ({ filter = () => true, ...options }: WatermarkPluginOptions = {}): Plugin =>
  (app) => {
    options.global ??= true

    if (app.env.isDebug) logger.info('Options:', options)

    return {
      name: PLUGIN_NAME,

      clientConfigFile: path.resolve(__dirname, '../client/config.js'),

      define: {
        __WATERMARK_OPTIONS__: options,
      },

      extendsPage: (page) => {
        // When global watermark is not enabled, enable watermark for matching pages.
        if (!options.global) {
          const frontmatter = page.frontmatter
          if (typeof frontmatter.watermark === 'undefined' && filter(page)) {
            frontmatter.watermark = true
          }
        }
      },
    }
  }
