import type { Page } from 'vuepress'
import type { WatermarkOptions as _WatermarkRawOptions } from 'watermark-js-plus/dist/types/src/types/index.js'

export type WatermarkOptions = Partial<_WatermarkRawOptions>

type WatermarkRawOptions = Partial<
  Omit<
    _WatermarkRawOptions,
    | 'onSuccess'
    | 'onBeforeDestroy'
    | 'onDestroyed'
    | 'extraDrawFunc'
    | 'onObserveError'
    | 'parent'
  >
> & {
  /**
   * Watermark parent selector
   */
  parent?: 'body' | (string & { __z_ignore?: never })
}

export interface WatermarkPluginOptions {
  /**
   * Enabled global watermark
   * @default true
   */
  global?: boolean
  /**
   * Page filter
   * @default []
   */
  pageFilter?: (page: Page) => boolean

  /**
   * Delay time when global watermark is not enabled
   * @default 500
   */
  delay?: number

  watermarkOptions?: WatermarkRawOptions
}
