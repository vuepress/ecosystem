import type { WalineInitOptions, WalineLocale } from '@waline/client'
import type { BaseCommentPluginOptions } from './base.js'

export type WalineLocaleData = Partial<WalineLocale>

export interface WalineOptions
  extends BaseCommentPluginOptions,
    Omit<WalineInitOptions, 'comment' | 'el' | 'locale'> {
  /**
   * Whether enable page views count by default
   *
   * 是否启用访问量
   *
   * @default true
   */
  pageview?: boolean
}
