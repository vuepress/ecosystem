import type { PageFrontmatter } from 'vuepress/shared'
import type { WatermarkOptions as _WatermarkRawOptions } from 'watermark-js-plus'

export type WatermarkPureOptions = Omit<
  Partial<_WatermarkRawOptions>,
  | 'extraDrawFunc'
  | 'onBeforeDestroy'
  | 'onDestroyed'
  | 'onObserveError'
  | 'onSuccess'
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

export interface WatermarkPluginFrontmatter extends PageFrontmatter {
  watermark?: WatermarkPureOptions | boolean
}
