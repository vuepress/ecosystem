import type { Page } from 'vuepress'
import type { WatermarkPureOptions } from '../shared/index.js'

export interface WatermarkPluginOptions {
  /**
   * Specify which pages need to have watermarks added.
   *
   * Pages with `true` value will have watermarks added.
   *
   * 指定哪些页面需要添加水印。
   *
   * 拥有 `true` 值的页面将会被添加水印。
   *
   * @default false
   */
  enabled?: boolean | ((page: Page) => boolean)

  /**
   * Watermark options
   *
   * 水印配置选项
   *
   * @see [watermark-js-plus](https://zhensherlock.github.io/watermark-js-plus/config/)
   */
  watermarkOptions?: WatermarkPureOptions
}
