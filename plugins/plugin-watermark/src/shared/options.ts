import type { WatermarkOptions as _WatermarkRawOptions } from 'watermark-js-plus/dist/types/src/types/index.js'

export type WatermarkRawOptions = Partial<_WatermarkRawOptions>

type WatermarkAttrsOptions = Omit<
  WatermarkRawOptions,
  | 'onSuccess'
  | 'onBeforeDestroy'
  | 'onDestroyed'
  | 'extraDrawFunc'
  | 'onObserveError'
  | 'parent'
> & {
  /**
   * Watermark parent selector
   *
   * 水印父元素选择器
   *
   * @default 'body'
   */
  parent?: 'body' | (string & { __z_ignore?: never })
}

export interface WatermarkPluginFrontmatter {
  watermark?: boolean | WatermarkAttrsOptions
}

export interface WatermarkOptions {
  /**
   * Enabled global watermark
   *
   * 是否启用全局水印
   *
   * @default true
   */
  global?: boolean

  /**
   * Delay for adding watermarks. In milliseconds.
   * This delay will only take effect when adding watermarks to a specific element on the page.
   * After switching routes, a delay is required before adding watermarks.
   *
   * 添加水印的延时。以毫秒为单位。
   * 该延迟仅会在添加水印到页面某个元素时生效。
   * 在切换路由后，需要延迟一段时间后才能添加水印。
   *
   * @default 500
   */
  delay?: number

  /**
   * Watermark options
   *
   * 水印配置选项
   *
   * @see [watermark-js-plus](https://zhensherlock.github.io/watermark-js-plus/config/)
   */
  watermarkOptions?: WatermarkAttrsOptions
}
